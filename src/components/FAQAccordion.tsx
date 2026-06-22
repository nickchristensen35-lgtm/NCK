'use client';

import { useState } from 'react';
import { SiteContent, DEFAULTS } from '@/lib/content';

interface Props {
  content?: Partial<SiteContent>;
}

export default function FAQAccordion({ content = {} }: Props) {
  const c = { ...DEFAULTS, ...content };
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: c.faq_1_q, a: c.faq_1_a },
    { q: c.faq_2_q, a: c.faq_2_a },
    { q: c.faq_3_q, a: c.faq_3_a },
    { q: c.faq_4_q, a: c.faq_4_a },
    { q: c.faq_5_q, a: c.faq_5_a },
    { q: c.faq_6_q, a: c.faq_6_a },
    { q: c.faq_7_q, a: c.faq_7_a },
    { q: c.faq_8_q, a: c.faq_8_a },
    { q: c.faq_9_q, a: c.faq_9_a },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-red-50 transition-colors duration-200 cursor-pointer"
          >
            <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
            <svg
              className={`w-5 h-5 text-red-600 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 pt-1 bg-white">
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
