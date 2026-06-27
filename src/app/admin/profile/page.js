'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';
import { Badge } from '@/components/ui/badge';

export default function AdminProfilePage() {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', mobile: user?.mobile || '' });

  if (!user) return null;

  const roleVariant = user.role === 'super_admin' ? 'info' : user.role === 'admin' ? 'success' : 'warning';

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Manage your account"
        actions={
          <Button variant={editing ? 'primary' : 'outline'} onClick={() => editing ? handleSave() : setEditing(true)}>
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        }
      />

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={roleVariant}>{user.role?.replace('_', ' ')}</Badge>
                  {user.status && <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>{user.status}</Badge>}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <>
                <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input label="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Full Name</span>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Mobile</span>
                  <span className="text-sm font-medium">{user.mobile || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <span className="text-sm font-medium capitalize">{user.role?.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Current Password" type="password" placeholder="Enter current password" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="New Password" type="password" placeholder="Enter new password" />
              <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
            </div>
            <Button variant="outline" size="sm">Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
