'use client';
import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api/client';
import { formatCurrency, formatDate, formatTime } from '@/lib/utils';

const statCards = [
  { key: 'totalUsers', label: 'Total Users', icon: '👥', color: 'bg-blue-500' },
  { key: 'todayBookings', label: "Today's Bookings", icon: '📅', color: 'bg-green-500' },
  { key: 'pendingBookings', label: 'Pending Bookings', icon: '⏳', color: 'bg-yellow-500' },
  { key: 'confirmedBookings', label: 'Confirmed', icon: '✅', color: 'bg-indigo-500' },
  { key: 'revenueThisMonth', label: 'Revenue (Month)', icon: '💰', color: 'bg-emerald-500', isCurrency: true },
  { key: 'availableSlots', label: 'Available Slots', icon: '🟢', color: 'bg-teal-500' },
  { key: 'occupiedSlots', label: 'Occupied', icon: '🔴', color: 'bg-red-500' },
  { key: 'utilization', label: 'Utilization', icon: '📊', color: 'bg-purple-500', suffix: '%' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/reports/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your parking system" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const value = stats?.[card.key];
          return (
            <Card key={card.key}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{card.icon}</span>
                  <div className={`w-2 h-2 rounded-full ${card.color}`} />
                </div>
                <p className="text-2xl font-bold">
                  {loading ? <span className="animate-pulse">--</span> :
                    card.isCurrency ? formatCurrency(value) :
                    `${value || 0}${card.suffix || ''}`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">PBK{String(i).padStart(4, '0')}</p>
                      <p className="text-xs text-muted-foreground">Sample booking</p>
                    </div>
                    <Badge variant="info">Pending</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Slot Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : stats ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Available</span>
                    <span className="font-medium">{stats.availableSlots} slots</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${stats.availableSlots + stats.occupiedSlots > 0
                        ? (stats.availableSlots / (stats.availableSlots + stats.occupiedSlots)) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Occupied</span>
                    <span className="font-medium">{stats.occupiedSlots} slots</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${stats.availableSlots + stats.occupiedSlots > 0
                        ? (stats.occupiedSlots / (stats.availableSlots + stats.occupiedSlots)) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Overall utilization: <span className="font-semibold">{stats.utilization}%</span>
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
