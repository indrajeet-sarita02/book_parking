'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';

export default function ParkingSearchPage() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city') || '';

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState(cityParam);
  const [activeVehicleType, setActiveVehicleType] = useState('all');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const url = `/locations?limit=50${searchCity ? `&search=${searchCity}` : ''}&status=active`;
        const res = await api.get(url);
        setLocations(res.data || []);
        if (res.data?.length > 0 && !selectedLocation) {
          setSelectedLocation(res.data[0]);
        }
      } catch (err) {
        console.error('Failed to load locations:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchCity]);

  useEffect(() => {
    if (!selectedLocation) return;
    async function loadSlots() {
      try {
        const res = await api.get(`/slots/available?location_id=${selectedLocation.id}&limit=100&status=available`);
        setSlots(res.data || []);
      } catch (err) {
        console.error('Failed to load slots:', err);
      }
    }
    loadSlots();
  }, [selectedLocation]);

  const filteredSlots = activeVehicleType === 'all'
    ? slots
    : slots.filter(s => s.vehicle_type === activeVehicleType);

  const vehicleTypes = [...new Set(slots.map(s => s.vehicle_type))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Parking</h1>
        <p className="text-muted-foreground">Search for available parking slots in your city</p>
      </div>

      <div className="flex gap-3 mb-8">
        <input
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Search by city or location name..."
          className="flex-1 h-12 rounded-xl border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <Button size="lg" onClick={() => setSearchCity(searchCity)}>🔍 Search</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="font-semibold mb-3">Locations</h2>
          {loading ? (
            <div className="space-y-2">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-16 rounded-lg" />)}
            </div>
          ) : locations.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground border border-border rounded-lg">
              <p className="text-3xl mb-2">📍</p>
              <p>No locations found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedLocation?.id === loc.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <p className="font-medium">{loc.name}</p>
                  <p className="text-xs text-muted-foreground">{loc.city}, {loc.state}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="success">{loc.total_slots || 0} slots</Badge>
                    {loc.opening_time && (
                      <span className="text-[10px] text-muted-foreground">
                        {loc.opening_time?.substring(0,5)} - {loc.closing_time?.substring(0,5)}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedLocation && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">
                  Available Slots — {selectedLocation.name}
                </h2>
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveVehicleType('all')}
                    className={`px-3 py-1 rounded-full text-xs ${
                      activeVehicleType === 'all' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >All</button>
                  {vehicleTypes.map(vt => (
                    <button
                      key={vt}
                      onClick={() => setActiveVehicleType(vt)}
                      className={`px-3 py-1 rounded-full text-xs capitalize ${
                        activeVehicleType === vt ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}
                    >{vt}</button>
                  ))}
                </div>
              </div>

              {filteredSlots.length === 0 ? (
                <div className="text-center p-12 text-muted-foreground border border-border rounded-lg">
                  <p className="text-4xl mb-3">🅿️</p>
                  <p className="font-medium">No available slots</p>
                  <p className="text-sm mt-1">Try a different location or vehicle type</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredSlots.map((slot) => (
                    <Card key={slot.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg">🟢</span>
                          <Badge variant="success">Available</Badge>
                        </div>
                        <p className="font-bold text-lg">{slot.slot_number}</p>
                        <p className="text-xs text-muted-foreground capitalize">{slot.vehicle_type} slot</p>
                        <p className="text-sm font-medium text-primary mt-1">{formatCurrency(slot.price_per_hour)}/hr</p>
                        <Link href={`/book?slot_id=${slot.id}&location_id=${selectedLocation.id}`}>
                          <Button size="sm" className="w-full mt-3">Book Now</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
