'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/shared/data-table';
import { Pagination } from '@/components/shared/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api/client';
import { formatCurrency, formatDate } from '@/lib/utils';

const statusBadge = {
  pending: 'warning', confirmed: 'info', checked_in: 'indigo',
  checked_out: 'purple', completed: 'success', cancelled: 'destructive', refunded: 'secondary',
};

const tabs = [
  { key: '', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'checked_in', label: 'Checked In' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const columns = [
  { key: 'booking_number', label: 'Booking ID' },
  {
    key: 'user', label: 'Customer',
    render: (row) => row.User?.name || 'N/A',
  },
  {
    key: 'location', label: 'Location',
    render: (row) => row.Location?.name || 'N/A',
  },
  {
    key: 'booking_status', label: 'Status',
    render: (row) => <Badge variant={statusBadge[row.booking_status] || 'info'}>{row.booking_status}</Badge>,
  },
  {
    key: 'total_amount', label: 'Amount',
    render: (row) => formatCurrency(row.total_amount),
  },
  {
    key: 'date', label: 'Date',
    render: (row) => row.date ? formatDate(row.date) : 'N/A',
  },
];

export default function AdminBookingsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusTab, setStatusTab] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const url = `/bookings?page=${page}&limit=10${statusTab ? `&status=${statusTab}` : ''}`;
        const res = await api.get(url);
        setData(res.data);
        setTotalPages(res.pagination?.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, statusTab]);

  return (
    <div>
      <PageHeader title="Bookings" description="Manage all bookings" />

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setStatusTab(tab.key); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              statusTab === tab.key
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={data} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
