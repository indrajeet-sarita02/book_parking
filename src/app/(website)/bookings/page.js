'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/data-table';
import { Pagination } from '@/components/shared/pagination';
import { api } from '@/lib/api/client';
import { formatCurrency, formatDate } from '@/lib/utils';

const statusBadge = {
  pending: 'warning', confirmed: 'info', checked_in: 'indigo',
  checked_out: 'purple', completed: 'success', cancelled: 'destructive',
};

const columns = [
  { key: 'booking_number', label: 'Booking ID' },
  {
    key: 'location', label: 'Location',
    render: (row) => row.Location?.name || 'N/A',
  },
  {
    key: 'date', label: 'Date',
    render: (row) => row.date ? formatDate(row.date) : 'N/A',
  },
  {
    key: 'total_amount', label: 'Amount',
    render: (row) => formatCurrency(row.total_amount),
  },
  {
    key: 'booking_status', label: 'Status',
    render: (row) => <Badge variant={statusBadge[row.booking_status] || 'info'}>{row.booking_status}</Badge>,
  },
];

export default function MyBookingsPage() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/bookings');
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/bookings?page=${page}&limit=10`);
        setBookings(res.data || []);
        setTotalPages(res.pagination?.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (isAuthenticated) load();
  }, [page, isAuthenticated]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader title="My Bookings" description="View and manage your bookings" />
      <DataTable columns={columns} data={bookings} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
