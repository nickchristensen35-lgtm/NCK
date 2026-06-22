import type { Metadata } from 'next';
import { CheckCircle, ChevronRight, Phone, Mail } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import { InstagramIcon, FacebookIcon } from '@/components/SocialIcons';

export const metadata: Metadata = {
  title: 'Pricing — Commercial Kitchen Hire from $45/hr',
  description: 'Commercial kitchen hire in Norwood, Adelaide from $45/hr + GST. Minimum 3-hour booking. No lock-in contracts, no hidden fees. All equipment included — UNOX combi oven, bratt pan, blast chiller, walk-in coolroom and more.',
  alternates: {
    canonical: 'https://norwoodcommercialkitchen.com.au/pricing',
  },
  openGraph: {
    title: 'Commercial Kitchen Hire Pricing Adelaide | From $45/hr',
    description: 'Hire a fully equipped commercial kitchen in Norwood from $45/hr. All equipment included, no lock-in contracts, 24/7 access.',
    url: 'https://norwoodcommercialkitchen.com.au/pricing',
  },
};

const INCLUDED = [
  '5-tray UNOX combi oven',
  "Baker's oven",
  '50L bratt pan',
  '6-burner range + 900mm gas oven',
  'Planetary mixer',
  'Pass-through dishwasher',
  'Walk-in cool room',
  'Blast chiller / freezer',
  '~15m bench space',
  'Dry storage',
  'WiFi',
  'Front-fence advertising',
  '5 onsite parking spaces',
  'Council-approved facility',
  'Food Safety compliance support',
  'Notification of Food Business guidance',
];

const FAQS = [
  {
    q: 'Is there a minimum booking?',
    a: 'Yes — the minimum session is 3 hours. This applies to all bookings at any time of day.',
  },
  {
    q: 'How do I book?',
    a: 'Email or call Georgie or Louise with your preferred date and time. Your session is confirmed once payment is received.',
  },
  {
    q: 'Are there lock-in contracts?',
    a: 'None. Book casually whenever you need the kitchen, or lock in a regular weekly slot — the choice is yours.',
  },
  {
    q: 'Do I need a food business notification?',
    a: "If you're producing food to sell, SA law requires a Notification of Food Business with your local council. We can guide you through this process.",
  },
  {
    q: 'Can I store my ingredients or products here?',
    a: 'Yes — dry storage and cool room / blast chiller storage can be arranged. Speak to Georgie or Louise about your needs.',
  },
  {
    q: 'Is the kitchen available 24/7?',
    a: 'Yes. Once booked, you have access during your session at any time of day or night.',
  },
];

export default function PricingPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
            Transparent Pricing
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.05]">
            Simple, honest rates.<br />
            <span className="text-red-600">No surprises.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Everything included in your hourly rate — no hidden equipment fees, no lock-in contracts, no overheads.
          </p>
        </div>
      </section>

      {/* Pricing card */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Rate card */}
            <div className="bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <p className="text-red-400 font-semibold text-xs tracking-[0.2em] uppercase mb-5">Kitchen Hire Rate</p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-7xl font-extrabold tracking-tight">$45</span>
                <span className="text-xl text-gray-400 mb-3">/ hr</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">+ GST · 3 hour minimum booking</p>

              <ul className="space-y-2 mb-10">
                {[
                  'All equipment included',
                  '24 / 7 access to your session',
                  'No lock-in contracts',
                  'Council-approved & licensed',
                  'Parking & loading access',
                  'Front-fence advertising space',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="/#contact"
                className="inline-flex items-center gap-2 w-full justify-center py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all text-sm tracking-wide"
              >
                Book Your Session <ChevronRight className="w-4 h-4" />
              </a>

              <p className="text-center text-gray-500 text-xs mt-4">
                Sessions confirmed once payment is received
              </p>
            </div>

            {/* What's included */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Everything included</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Every piece of equipment is included in your hourly rate. Just bring your ingredients and your creativity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {INCLUDED.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-cream rounded-2xl p-5">
                <p className="text-sm font-semibold text-gray-900 mb-1">Need regular access?</p>
                <p className="text-sm text-gray-500">
                  Lock in a weekly recurring slot for priority scheduling. Get in touch to discuss regular arrangements.
                </p>
                <a href="/#contact" className="inline-flex items-center gap-1 text-sm text-red-600 font-semibold mt-3 hover:text-red-700 transition-colors">
                  Get in touch <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Pricing FAQs</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl p-6 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-2 text-sm">{f.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">
            Contact Georgie or Louise to book your first session or ask any questions about the facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0475517995" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors text-sm">
              <Phone className="w-4 h-4" /> Call Georgie
            </a>
            <a href="mailto:hello@norwoodcommercialkitchen.com.au" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-white hover:text-white transition-colors text-sm">
              <Mail className="w-4 h-4" /> Send an Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; 2026 Norwood Commercial Kitchen · 59 Queen Street, Norwood SA 5067</p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/norwoodcommercialkitchen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/102043932657134"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-[#1877F2] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
