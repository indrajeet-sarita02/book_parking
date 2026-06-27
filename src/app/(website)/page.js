import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find & Book Parking in India
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Park your vehicle safely at any location across India. Book in advance, skip the hassle.
          </p>

          <div className="max-w-xl mx-auto">
            <div className="flex gap-2 bg-white rounded-xl p-1">
              <input
                placeholder="Search by city, location..."
                className="flex-1 h-12 px-4 text-foreground bg-transparent border-0 focus:outline-none"
              />
              <Link href="/parking">
                <Button size="lg" className="h-12 px-6">🔍 Search</Button>
              </Link>
            </div>
          </div>

          <div className="flex gap-3 justify-center mt-6 text-sm text-white/70">
            <span>Popular:</span>
            {['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai'].map((city) => (
              <Link key={city} href={`/parking?city=${city}`} className="hover:text-white underline underline-offset-2">
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">Vehicle Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🚗', label: 'Car', price: '₹50/hr' },
            { icon: '🏍️', label: 'Bike', price: '₹20/hr' },
            { icon: '🚌', label: 'Bus', price: '₹80/hr' },
            { icon: '🔌', label: 'EV', price: '₹40/hr' },
          ].map((v) => (
            <div key={v.label} className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
              <span className="text-4xl block mb-2">{v.icon}</span>
              <h3 className="font-semibold">{v.label}</h3>
              <p className="text-sm text-muted-foreground">{v.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '🔍', title: 'Search', desc: 'Find parking locations near your destination' },
              { step: '2', icon: '📅', title: 'Book', desc: 'Select your slot, date, and time' },
              { step: '3', icon: '🅿️', title: 'Park & Pay', desc: 'Show QR code at entry and pay online' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Ready to Park?</h2>
          <p className="text-muted-foreground mt-2">Join thousands of happy customers</p>
        </div>
        <div className="text-center">
          <Link href="/register">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
