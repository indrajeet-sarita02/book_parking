'use client';
import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';

const sampleRevenueData = [
  { month: 'Jan', revenue: 45000, bookings: 120 },
  { month: 'Feb', revenue: 52000, bookings: 145 },
  { month: 'Mar', revenue: 48000, bookings: 132 },
  { month: 'Apr', revenue: 61000, bookings: 168 },
  { month: 'May', revenue: 58000, bookings: 155 },
  { month: 'Jun', revenue: 72000, bookings: 190 },
];

export default function AdminReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/reports/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load reports:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const maxRevenue = Math.max(...sampleRevenueData.map(d => d.revenue));
  const maxBookings = Math.max(...sampleRevenueData.map(d => d.bookings));

  return (
    <div>
      <PageHeader title="Reports" description="Analytics and insights" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: stats?.revenueThisMonth, isCurrency: true, color: 'bg-emerald-500' },
          { label: 'Total Bookings', value: stats?.confirmedBookings + stats?.pendingBookings, color: 'bg-blue-500' },
          { label: 'Active Users', value: stats?.totalUsers, color: 'bg-purple-500' },
          { label: 'Utilization', value: stats?.utilization, suffix: '%', color: 'bg-amber-500' },
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className={`w-2 h-2 rounded-full ${item.color} mb-2`} />
              <p className="text-2xl font-bold">
                {loading ? <span className="animate-pulse">--</span> :
                  item.isCurrency ? formatCurrency(item.value) :
                  `${item.value || 0}${item.suffix || ''}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {sampleRevenueData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">{formatCurrency(d.revenue)}</span>
                  <div
                    className="w-full bg-primary/80 rounded-t"
                    style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {sampleRevenueData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">{d.bookings}</span>
                  <div
                    className="w-full bg-blue-500/80 rounded-t"
                    style={{ height: `${(d.bookings / maxBookings) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
