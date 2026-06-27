'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api/client';
import { useToast } from '@/components/ui/toast';
import { STATES_OF_INDIA } from '@/lib/constants';

export default function AddLocationPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', address: '', city: '', state: '', opening_time: '06:00', closing_time: '23:00', total_slots: 20,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/locations', { ...form, total_slots: Number(form.total_slots) });
      addToast('Location created successfully', 'success');
      router.push('/admin/locations');
    } catch (err) {
      setError(err.message || 'Failed to create location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Add Location" description="Add a new parking location" />
      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>}
            <Input label="Location Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            <div className="space-y-1">
              <label className="text-sm font-medium">State</label>
              <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Select state</option>
                {STATES_OF_INDIA.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Opening Time" type="time" value={form.opening_time} onChange={(e) => setForm({ ...form, opening_time: e.target.value })} />
              <Input label="Closing Time" type="time" value={form.closing_time} onChange={(e) => setForm({ ...form, closing_time: e.target.value })} />
            </div>
            <Input label="Total Slots" type="number" min="1" value={form.total_slots} onChange={(e) => setForm({ ...form, total_slots: e.target.value })} />
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={loading}>Create Location</Button>
              <Link href="/admin/locations"><Button type="button" variant="outline">Cancel</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
