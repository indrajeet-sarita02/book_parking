'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/data-table';
import { Pagination } from '@/components/shared/pagination';
import { SearchInput } from '@/components/shared/search-input';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api/client';
import { useDebounce } from '@/hooks/use-debounce';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'total_slots', label: 'Slots' },
  {
    key: 'status', label: 'Status',
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'destructive'}>{row.status}</Badge>
    ),
  },
];

export default function AdminLocationsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get(`/locations?page=${page}&limit=10&search=${debouncedSearch}`);
        setData(res.data);
        setTotalPages(res.pagination?.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, debouncedSearch]);

  return (
    <div>
      <PageHeader
        title="Locations"
        description="Manage parking locations"
        actions={
          <Link href="/admin/locations/add">
            <Button>+ Add Location</Button>
          </Link>
        }
      />

      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, city..." />
      </div>

      <DataTable columns={columns} data={data} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
