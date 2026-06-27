import Link from 'next/link';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '200+', label: 'Parking Locations' },
  { value: '25+', label: 'Cities Covered' },
  { value: '1M+', label: 'Bookings Completed' },
];

const team = [
  { name: 'Rajesh Kumar', role: 'CEO & Founder', avatar: 'RK' },
  { name: 'Priya Sharma', role: 'CTO', avatar: 'PS' },
  { name: 'Amit Patel', role: 'Head of Operations', avatar: 'AP' },
  { name: 'Sneha Reddy', role: 'Head of Marketing', avatar: 'SR' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ParkingBook</h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            India&apos;s leading parking booking platform making urban parking stress-free, 
            affordable, and accessible for everyone.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-card border border-border">
              <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At ParkingBook, we&apos;re on a mission to solve India&apos;s parking problems. 
              Founded in 2024, we&apos;ve grown from a small startup to India&apos;s most trusted 
              parking platform.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe that finding parking should be as easy as booking a cab. Our platform 
              connects drivers with available parking spaces in real-time, saving time, fuel, 
              and frustration.
            </p>
            <p className="text-muted-foreground">
              With advanced technology, secure payments, and 24/7 customer support, we ensure 
              a seamless parking experience across all major Indian cities.
            </p>
          </div>
          <div className="bg-muted rounded-xl p-8 text-center">
            <span className="text-6xl block mb-4">🅿️</span>
            <h3 className="text-xl font-bold mb-2">Park Smart, Drive Easy</h3>
            <p className="text-muted-foreground">Your trusted parking partner since 2024</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {team.map((member) => (
            <div key={member.name} className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary mx-auto mb-4">
                {member.avatar}
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-muted rounded-xl p-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Simplify Your Parking?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of happy customers across India.</p>
          <Link href="/register">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
