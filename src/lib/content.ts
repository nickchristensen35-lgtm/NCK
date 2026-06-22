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
  faq_1_q: string; faq_1_a: string;
  faq_2_q: string; faq_2_a: string;
  faq_3_q: string; faq_3_a: string;
  faq_4_q: string; faq_4_a: string;
  faq_5_q: string; faq_5_a: string;
  faq_6_q: string; faq_6_a: string;
  faq_7_q: string; faq_7_a: string;
  faq_8_q: string; faq_8_a: string;
  faq_9_q: string; faq_9_a: string;
}

export const DEFAULTS: SiteContent = {
  hero_label: 'Commercial Kitchen Hire · Adelaide, SA',
  hero_headline: 'Build your wildly successful food business',
  hero_subtitle: "Adelaide's premier commercial kitchen hire — fully equipped, council-approved, and ready when you are. No lock-in contracts. No overheads.",
  hero_stat1_value: '$45', hero_stat1_label: 'Kitchen hire rate',
  hero_stat2_value: '24/7', hero_stat2_label: 'Access during sessions',
  hero_stat3_value: 'Min 3hr', hero_stat3_label: 'No lock-in contracts',
  hero_stat4_value: '100%', hero_stat4_label: 'Council-approved',
  contact_georgie: '0475 517 995',
  contact_louise: '0412 300 490',
  contact_email: 'hello@norwoodcommercialkitchen.com.au',
  contact_address: '59 Queen Street',
  contact_suburb: 'Norwood, South Australia 5067',
  pricing_rate: '$45',
  pricing_minimum: '3 hours',
  pricing_note: 'No lock-in contracts. Book casually or lock in a weekly slot.',
  about_tagline: "Adelaide's most flexible commercial kitchen",
  about_body: "Norwood Commercial Kitchen is a fully licensed, council-approved commercial kitchen hire facility located in the heart of Norwood. Whether you're a caterer, baker, food truck operator or small-batch producer, we have everything you need to grow your food business.",
  faq_1_q: 'Can I take a tour of the kitchen?',
  faq_1_a: 'Please see our NCK virtual tour! Due to resource restraints, we refer our customers to the virtual tour in the first instance. When you have a well-developed business plan and are closer to making a booking, we will organise an on-site tour. An induction will be provided.',
  faq_2_q: 'What equipment is available?',
  faq_2_a: 'Ovens: UNOX 5-tray Combi Oven (self-cleaning), MOFFAT Turbofan (4 bakery tray capacity), Gas oven (900mm). Large Equipment: 50L Bratt pan, 6 gas burners, Planetary mixer. Other: Blast Chiller/Freezer, Commercial dishwasher, Walk-in coolroom, Freezer storage, Cleaning chemicals, Gastronorm trays, bakery trays, silver bowls and utensils, approx. 15 metres of stainless steel benches, microwave, kettle.',
  faq_3_q: 'Can I bring my own equipment?',
  faq_3_a: 'Benchtop equipment (e.g. fryer, food processor) can be used in the kitchen. Please consult with us for any other equipment. Please bring your own utensils, bowls, chopping boards, knives, dishwashing detergents, cleaning cloths and tea towels etc.',
  faq_4_q: 'Can I store items in the kitchen?',
  faq_4_a: 'Storage (at no additional charge) is available in the coolroom in association with a rental event. Long-term and regular customers may utilise the shelves in our storage area. We recommend storing items in locked storage tubs.',
  faq_5_q: 'How do I book, what days are available and what is the cost?',
  faq_5_a: 'Booking availability is on most days, although Fridays and Saturdays are the busiest. Email hello@norwoodcommercialkitchen.com.au with your booking request — bookings are confirmed after payment is made. Cost is approx. $45/hr +GST for a casual booking. We have a 3-hour minimum and a $200 refundable bond.',
  faq_6_q: 'Can my customers pick up food from NCK during my booking?',
  faq_6_a: 'Yes, this model works well!',
  faq_7_q: 'How do I get access to the kitchen?',
  faq_7_a: 'After payment of the bond, we will provide access to the kitchen. The kitchen can be booked and accessed 24/7.',
  faq_8_q: 'Do I have to clean the kitchen?',
  faq_8_a: 'Customers must clean all areas used in the kitchen, including sweeping and mopping the floors, and leave it in a state suitable for the next rental booking. Cleaning must be completed within the rental period.',
  faq_9_q: 'What do I need to start my food business?',
  faq_9_a: "There are no requirements other than paying your invoice to book NCK. However, it is important to complete a Notification of Food Business (free, and can save you from fines). Georgie is a food scientist who specialises in label compliance — questions about nutrition panels, ingredients, allergens and more are very welcome!",
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
