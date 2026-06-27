import Link from 'next/link';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Hourly',
    popular: false,
    price: '₹20',
    unit: '/hr',
    desc: 'Perfect for quick stops',
    features: ['Pay only for time used', 'No commitment required', 'All locations', 'Instant booking', 'Free cancellation'],
    vehiclePrices: [
      { type: 'Bike', price: '₹20/hr' },
      { type: 'Car', price: '₹50/hr' },
      { type: 'Bus', price: '₹80/hr' },
      { type: 'EV', price: '₹40/hr' },
    ],
  },
  {
    name: 'Daily',
    popular: true,
    price: '₹199',
    unit: '/day',
    desc: 'Best for full-day parking',
    features: ['Up to 24 hours', '20% cheaper than hourly', 'All locations', 'Priority support', 'Free cancellation'],
    vehiclePrices: [
      { type: 'Bike', price: '₹99/day' },
      { type: 'Car', price: '₹199/day' },
      { type: 'Bus', price: '₹349/day' },
      { type: 'EV', price: '₹149/day' },
    ],
  },
  {
    name: 'Monthly',
    popular: false,
    price: '₹999',
    unit: '/mo',
    desc: 'For regular commuters',
    features: ['Unlimited access', '50% cheaper than daily', 'Dedicated parking spot', 'Priority support', 'Free cancellation anytime'],
    vehiclePrices: [
      { type: 'Bike', price: '₹499/mo' },
      { type: 'Car', price: '₹999/mo' },
      { type: 'Bus', price: '₹1,999/mo' },
      { type: 'EV', price: '₹799/mo' },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your needs. No hidden charges, no surprises.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border ${plan.popular ? 'border-primary shadow-lg ring-2 ring-primary' : 'border-border'} bg-card p-8 relative`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">{plan.unit}</span>
            </div>
            <div className="mb-6 space-y-2">
              {plan.vehiclePrices.map((vp) => (
                <div key={vp.type} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{vp.type}</span>
                  <span className="font-medium">{vp.price}</span>
                </div>
              ))}
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'} size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Plan?</h2>
        <p className="text-muted-foreground mb-6">Contact us for enterprise pricing, corporate accounts, and bulk discounts.</p>
        <Link href="/contact">
          <Button variant="outline" size="lg">Contact Sales</Button>
        </Link>
      </div>
    </div>
  );
}
