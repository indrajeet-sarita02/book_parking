import Link from 'next/link';
import { Button } from '@/components/ui/button';

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'support@parkingbook.com', action: 'mailto:support@parkingbook.com' },
  { icon: '📞', label: 'Phone', value: '+91 1800-123-4567', action: 'tel:+9118001234567' },
  { icon: '📍', label: 'Office', value: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051' },
  { icon: '🕐', label: 'Hours', value: 'Mon - Sat: 9:00 AM - 8:00 PM' },
];

const faqs = [
  { q: 'How do I book a parking slot?', a: 'Simply search for your desired location, select a slot, choose your time, and complete payment. You\'ll receive a QR code for entry.' },
  { q: 'Can I cancel my booking?', a: 'Yes, you can cancel up to 1 hour before the start time for a full refund. Late cancellations may incur a charge.' },
  { q: 'What payment methods are accepted?', a: 'We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), and net banking.' },
  { q: 'Is my vehicle insured?', a: 'All our partner locations have 24/7 CCTV surveillance and security personnel. We recommend checking individual location details.' },
  { q: 'How do I get a refund?', a: 'Refunds are processed within 5-7 business days to your original payment method.' },
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question or need help? We&apos;re here for you 24/7.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {contactInfo.map((info) => (
          <a
            key={info.label}
            href={info.action}
            className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
          >
            <span className="text-3xl block mb-3">{info.icon}</span>
            <h3 className="font-semibold mb-1">{info.label}</h3>
            <p className="text-sm text-muted-foreground">{info.value}</p>
          </a>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">First Name</label>
                <input className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder="John" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <input className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input type="email" className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" placeholder="john@example.com" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent min-h-[120px]" placeholder="How can we help you?" />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="rounded-lg border border-border bg-card">
                <summary className="p-4 font-medium cursor-pointer hover:bg-muted/50 rounded-lg">{faq.q}</summary>
                <p className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
