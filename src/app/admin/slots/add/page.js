'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api/client';
import { useToast } from '@/components/ui/toast';

export default function AddSlotPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    location_id: '', slot_number: '', floor: 'Ground', vehicle_type: 'car', price_per_hour: '',
  });

  useEffect(() => {
    api.get('/locations?limit=100').then((res) => {
      setLocations(res.data);
      if (res.data.length > 0) setForm((f) => ({ ...f, location_id: res.data[0].id }));
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/slots', {
        ...form,
        location_id: Number(form.location_id),
        price_per_hour: Number(form.price_per_hour),
      });
      addToast('Slot created successfully', 'success');
      router.push('/admin/slots');
    } catch (err) {
      setError(err.message || 'Failed to create slot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Add Slot" description="Add a new parking slot" />
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>}
            <div className="space-y-1">
              <label className="text-sm font-medium">Location</label>
              <select value={form.location_id} onChange={(e) => setForm({ ...form, location_id: e.target.value })} className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select location</option>
                {locations.map((loc) => <option key={loc.id} value={loc.id}>{loc.name} — {loc.city}</option>)}
              </select>
            </div>
            <Input label="Slot Number" placeholder="e.g. C5 or B12" value={form.slot_number} onChange={(e) => setForm({ ...form, slot_number: e.target.value })} required />
            <Input label="Floor" value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} />
            <div className="space-y-1">
              <label className="text-sm font-medium">Vehicle Type</label>
              <select value={form.vehicle_type} onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })} className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {['car', 'bike', 'auto', 'bus', 'truck', 'ev'].map((vt) => <option key={vt} value={vt} className="capitalize">{vt}</option>)}
              </select>
            </div>
            <Input label="Price per Hour (₹)" type="number" min="1" step="0.01" placeholder="50" value={form.price_per_hour} onChange={(e) => setForm({ ...form, price_per_hour: e.target.value })} required />
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={loading}>Create Slot</Button>
              <Link href="/admin/slots"><Button type="button" variant="outline">Cancel</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
