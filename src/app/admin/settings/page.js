'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    appName: 'ParkingBook',
    supportEmail: 'support@parkingbook.com',
    supportPhone: '+91 1800-123-4567',
    defaultCurrency: 'INR',
    timezone: 'Asia/Kolkata',
    taxRate: '18',
    maxBookingHours: '24',
    advanceBookingDays: '30',
    cancellationPolicy: 'Free cancellation up to 1 hour before start time. 50% charge after that.',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="System configuration"
        actions={
          <Button onClick={handleSave}>
            {saved ? '✓ Saved' : 'Save Changes'}
          </Button>
        }
      />

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Application Name" value={settings.appName} onChange={(e) => handleChange('appName', e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Support Email" type="email" value={settings.supportEmail} onChange={(e) => handleChange('supportEmail', e.target.value)} />
              <Input label="Support Phone" value={settings.supportPhone} onChange={(e) => handleChange('supportPhone', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Default Currency" value={settings.defaultCurrency} onChange={(e) => handleChange('defaultCurrency', e.target.value)} />
              <Input label="Timezone" value={settings.timezone} onChange={(e) => handleChange('timezone', e.target.value)} />
            </div>
            <Input label="Tax Rate (%)" type="number" value={settings.taxRate} onChange={(e) => handleChange('taxRate', e.target.value)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Max Booking Hours" type="number" value={settings.maxBookingHours} onChange={(e) => handleChange('maxBookingHours', e.target.value)} />
              <Input label="Advance Booking (Days)" type="number" value={settings.advanceBookingDays} onChange={(e) => handleChange('advanceBookingDays', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Cancellation Policy</label>
              <textarea
                className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent min-h-[80px]"
                value={settings.cancellationPolicy}
                onChange={(e) => handleChange('cancellationPolicy', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Gateway</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Razorpay Key ID" type="password" value="rzp_live_****************" disabled />
              <Input label="Razorpay Key Secret" type="password" value="••••••••••••••••" disabled />
            </div>
            <p className="text-xs text-muted-foreground">Contact your administrator to update payment gateway credentials.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
