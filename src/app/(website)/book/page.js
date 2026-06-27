'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';

export default function BookPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const slotId = searchParams.get('slot_id');
  const locationId = searchParams.get('location_id');

  const [slot, setSlot] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    vehicle_number: '',
    vehicle_type: 'car',
    date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    end_time: '10:00',
  });

  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push(`/login?redirect=/book?slot_id=${slotId}&location_id=${locationId}`);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    async function load() {
      try {
        if (slotId) {
          const slotRes = await api.get(`/slots/${slotId}`);
          setSlot(slotRes.data);
          if (slotRes.data?.vehicle_type) {
            setForm(f => ({ ...f, vehicle_type: slotRes.data.vehicle_type }));
          }
        }
        if (locationId) {
          const locRes = await api.get(`/locations/${locationId}`);
          setLocation(locRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slotId || locationId) load();
  }, [slotId, locationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = {
        location_id: parseInt(locationId),
        slot_id: parseInt(slotId),
        vehicle_number: form.vehicle_number,
        vehicle_type: form.vehicle_type,
        date: form.date,
        start_time: form.start_time,
        end_time: form.end_time,
      };
      const res = await api.post('/bookings', body);
      router.push(`/bookings?success=${res.data?.booking_number || ''}`);
    } catch (err) {
      alert(err.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Book Parking Slot</h1>
      <p className="text-muted-foreground mb-6">Fill in the details to reserve your spot</p>

      {location && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="font-medium">{location.name}</p>
          <p className="text-sm text-muted-foreground">{location.city}, {location.state}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {slot && (
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <div>
                  <p className="font-medium">Slot {slot.slot_number}</p>
                  <p className="text-sm text-muted-foreground capitalize">{slot.vehicle_type}</p>
                </div>
                <p className="text-lg font-bold text-primary">{formatCurrency(slot.price_per_hour)}/hr</p>
              </div>
            )}

            <Input
              label="Vehicle Number"
              placeholder="MH01AB1234"
              value={form.vehicle_number}
              onChange={(e) => setForm({ ...form, vehicle_number: e.target.value })}
              required
            />

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Vehicle Type</label>
              <select
                value={form.vehicle_type}
                onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
                className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {['car', 'bike', 'auto', 'bus', 'truck', 'ev'].map(vt => (
                  <option key={vt} value={vt} className="capitalize">{vt}</option>
                ))}
              </select>
            </div>

            <Input
              label="Date"
              type="date"
              min={today}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="time"
                value={form.start_time}
                onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                required
              />
              <Input
                label="End Time"
                type="time"
                value={form.end_time}
                onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                required
              />
            </div>

            <Button type="submit" loading={submitting} className="w-full" size="lg">
              Confirm Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
