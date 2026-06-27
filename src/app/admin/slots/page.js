'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';

export default function AdminSlotsPage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    async function loadLocations() {
      try {
        const res = await api.get('/locations?limit=100');
        setLocations(res.data);
        if (res.data.length > 0) setSelectedLocation(res.data[0].id);
      } catch (err) {
        console.error(err);
      }
    }
    loadLocations();
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;
    async function load() {
      setLoading(true);
      try {
        const res = await api.get(`/slots?location_id=${selectedLocation}&limit=100`);
        setSlots(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedLocation]);

  const statusVariant = (status) => ({
    available: 'success',
    occupied: 'destructive',
    reserved: 'warning',
    maintenance: 'secondary',
  }[status] || 'secondary');

  const statusEmoji = (status) => ({
    available: '🟢',
    occupied: '🔴',
    reserved: '🟡',
    maintenance: '⚪',
  }[status] || '⚪');

  return (
    <div>
      <PageHeader
        title="Parking Slots"
        description="Manage slots across locations"
        actions={
          <Link href="/admin/slots/add">
            <Button>+ Add Slot</Button>
          </Link>
        }
      />

      <div className="mb-6">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="h-10 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Select location</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.name} — {loc.city}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {['car', 'bike'].map((type) => {
            const filtered = slots.filter(s => s.vehicle_type === type);
            if (filtered.length === 0) return null;
            return (
              <div key={type}>
                <h3 className="font-semibold mb-3 capitalize">{type} Slots</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {filtered.map((slot) => (
                    <Card key={slot.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3 text-center">
                        <p className="text-lg">{statusEmoji(slot.status)}</p>
                        <p className="font-bold">{slot.slot_number}</p>
                        <p className="text-xs text-muted-foreground">{formatCurrency(slot.price_per_hour)}/hr</p>
                        <Badge variant={statusVariant(slot.status)} className="mt-1 text-[10px]">
                          {slot.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
