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
  { key: 'email', label: 'Email' },
  { key: 'mobile', label: 'Mobile' },
  {
    key: 'role', label: 'Role',
    render: (row) => (
      <Badge variant={row.role === 'super_admin' ? 'info' : row.role === 'admin' ? 'success' : row.role === 'staff' ? 'warning' : 'secondary'}>
        {row.role?.replace('_', ' ')}
      </Badge>
    ),
  },
  {
    key: 'status', label: 'Status',
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'destructive'}>
        {row.status}
      </Badge>
    ),
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get(`/users?page=${page}&limit=10&search=${debouncedSearch}`);
        setUsers(res.data);
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
        title="Users"
        description="Manage all users"
        actions={
          <Link href="/admin/users/add">
            <Button>+ Add User</Button>
          </Link>
        }
      />

      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email..." />
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
      />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
