export default function FAQPage() {
  const faqs = [
    { q: 'How do I book a parking slot?', a: 'Search for your desired location, select an available slot, choose your time, and confirm the booking.' },
    { q: 'Can I cancel a booking?', a: 'Yes, you can cancel a booking from your bookings page. Refund eligibility depends on the cancellation policy.' },
    { q: 'What payment methods are accepted?', a: 'We accept Razorpay, credit/debit cards, UPI, net banking, and cash payments at select locations.' },
    { q: 'How do I get a refund?', a: 'Refunds are processed automatically when you cancel a eligible booking. It may take 3-5 business days to reflect.' },
    { q: 'Can I modify my booking?', a: 'Currently, modifications are not supported. Please cancel and rebook for changes.' },
    { q: 'Is my vehicle safe?', a: 'All our parking locations are secure with 24/7 CCTV surveillance and on-site staff.' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-muted-foreground mb-8">Find answers to common questions about ParkingBook</p>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="rounded-lg border border-border p-4">
            <summary className="font-medium cursor-pointer">{faq.q}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
