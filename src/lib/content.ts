import { redis } from './redis';

const REDIS_KEY = 'nck:content';

export interface SiteContent {
  hero_label: string;
  hero_headline: string;
  hero_subtitle: string;
  hero_stat1_value: string;
  hero_stat1_label: string;
  hero_stat2_value: string;
  hero_stat2_label: string;
  hero_stat3_value: string;
  hero_stat3_label: string;
  hero_stat4_value: string;
  hero_stat4_label: string;
  contact_georgie: string;
  contact_louise: string;
  contact_email: string;
  contact_address: string;
  contact_suburb: string;
  pricing_rate: string;
  pricing_minimum: string;
  pricing_note: string;
  about_tagline: string;
  about_body: string;
  faq_1_q: string;
  faq_1_a: string;
  faq_2_q: string;
  faq_2_a: string;
  faq_3_q: string;
  faq_3_a: string;
  faq_4_q: string;
  faq_4_a: string;
}

export const DEFAULTS: SiteContent = {
  hero_label: 'Commercial Kitchen Hire · Adelaide, SA',
  hero_headline: 'Build your wildly successful food business',
  hero_subtitle: "Adelaide's premier commercial kitchen hire — fully equipped, council-approved, and ready when you are. No lock-in contracts. No overheads.",
  hero_stat1_value: '$45',
  hero_stat1_label: 'Kitchen hire rate',
  hero_stat2_value: '24/7',
  hero_stat2_label: 'Access during sessions',
  hero_stat3_value: 'Min 3hr',
  hero_stat3_label: 'No lock-in contracts',
  hero_stat4_value: '100%',
  hero_stat4_label: 'Council-approved',
  contact_georgie: '0475 517 995',
  contact_louise: '0412 300 490',
  contact_email: 'hello@norwoodcommercialkitchen.com.au',
  contact_address: '59 Queen Street',
  contact_suburb: 'Norwood, South Australia 5067',
  pricing_rate: '$45',
  pricing_minimum: '3 hours',
  pricing_note: 'No lock-in contracts. Book casually or lock in a weekly slot.',
  about_tagline: "Adelaide's most flexible commercial kitchen",
  about_body: 'Norwood Commercial Kitchen is a fully licensed, council-approved commercial kitchen hire facility located in the heart of Norwood. Whether you\'re a caterer, baker, food truck operator or small-batch producer, we have everything you need to grow your food business.',
  faq_1_q: 'How do I book a session?',
  faq_1_a: 'Contact Georgie on 0475 517 995 or Louise on 0412 300 490. You can also email hello@norwoodcommercialkitchen.com.au. Sessions are confirmed once payment is received.',
  faq_2_q: 'What is included in the hire rate?',
  faq_2_a: 'All commercial equipment is included — UNOX combi oven, bratt pan, 6-burner range, planetary mixer, pass-through dishwasher, walk-in cool room, blast chiller, bench space, dry storage and WiFi.',
  faq_3_q: 'Is there a minimum booking period?',
  faq_3_a: 'Yes, the minimum booking is 3 hours at $45/hr + GST. There are no lock-in contracts so you can book casually or secure a regular weekly slot.',
  faq_4_q: 'Do you offer 24/7 access?',
  faq_4_a: 'Yes — you have 24/7 access during your booked sessions. We also have 5 onsite parking spaces and loading access for your convenience.',
};

export async function getContent(): Promise<SiteContent> {
  try {
    const stored = await redis.get<Partial<SiteContent>>(REDIS_KEY);
    return { ...DEFAULTS, ...(stored ?? {}) };
  } catch {
    return DEFAULTS;
  }
}

export async function setContent(updates: Partial<SiteContent>): Promise<void> {
  const current = await getContent();
  await redis.set(REDIS_KEY, { ...current, ...updates });
}
