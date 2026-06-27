'use client';
import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

const pricingPlans = [
  { id: 1, name: 'Car', vehicleType: 'car', basePrice: 50, peakPrice: 80, nightPrice: 30, monthlyPass: 1200, active: true },
  { id: 2, name: 'Bike', vehicleType: 'bike', basePrice: 20, peakPrice: 35, nightPrice: 10, monthlyPass: 500, active: true },
  { id: 3, name: 'Bus', vehicleType: 'bus', basePrice: 80, peakPrice: 120, nightPrice: 50, monthlyPass: 2000, active: true },
  { id: 4, name: 'Truck', vehicleType: 'truck', basePrice: 100, peakPrice: 150, nightPrice: 60, monthlyPass: 2500, active: false },
  { id: 5, name: 'EV', vehicleType: 'ev', basePrice: 40, peakPrice: 60, nightPrice: 25, monthlyPass: 1000, active: true },
  { id: 6, name: 'Auto', vehicleType: 'auto', basePrice: 15, peakPrice: 25, nightPrice: 8, monthlyPass: 400, active: true },
];

const peakHours = [
  { day: 'Mon-Fri', hours: '09:00 - 11:00, 17:00 - 20:00' },
  { day: 'Sat', hours: '10:00 - 14:00, 16:00 - 21:00' },
  { day: 'Sun', hours: '12:00 - 18:00' },
];

export default function AdminPricingPage() {
  const [plans] = useState(pricingPlans);

  return (
    <div>
      <PageHeader title="Pricing" description="Manage parking pricing plans" />

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {peakHours.map((item) => (
                <div key={item.day} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="font-medium">{item.day}</span>
                  <span className="text-sm text-muted-foreground">{item.hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discount Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-medium">Early Bird (before 8 AM)</span>
                <Badge variant="success">15% off</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-medium">Night Owl (after 10 PM)</span>
                <Badge variant="info">20% off</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-medium">Weekly Pass</span>
                <Badge variant="warning">10% off</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-medium">Monthly Pass</span>
                <Badge variant="indigo">25% off</Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Referral Discount</span>
                <Badge variant="purple">₹100 off</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Pricing</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left p-3 font-medium text-muted-foreground">Vehicle</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Base Rate</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Peak Rate</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Night Rate</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Monthly Pass</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3 font-medium">{plan.name}</td>
                    <td className="p-3">{formatCurrency(plan.basePrice)}/hr</td>
                    <td className="p-3">{formatCurrency(plan.peakPrice)}/hr</td>
                    <td className="p-3">{formatCurrency(plan.nightPrice)}/hr</td>
                    <td className="p-3">{formatCurrency(plan.monthlyPass)}</td>
                    <td className="p-3">
                      <Badge variant={plan.active ? 'success' : 'secondary'}>
                        {plan.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Button variant="outline" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
