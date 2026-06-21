'use client';

import { useState } from 'react';

const faqs = [
  {
    q: "Can I take a tour of the kitchen?",
    a: "Please see our NCK virtual tour! Due to resource restraints, we refer our customers to the virtual tour in the first instance. When you have a well-developed business plan and are closer to making a booking, we will organise an on-site tour. An induction will be provided.",
  },
  {
    q: "What equipment is available?",
    a: "Ovens: UNOX 5-tray Combi Oven (self-cleaning), MOFFAT Turbofan (4 bakery tray capacity), Gas oven (900mm). Large Equipment: 50L Bratt pan, 6 gas burners, Planetary mixer. Other: Blast Chiller/Freezer (including bakery setting), Commercial dishwasher, Walk-in coolroom, Freezer storage on day of cooking, Cleaning chemicals and food grade sanitizer, Gastronorm GN1/1 trays, bakery trays, silver bowls and utensils, approx. 15 metres of stainless steel benches, microwave, kettle.",
  },
  {
    q: "Can I bring my own equipment?",
    a: "Benchtop equipment (e.g. fryer, food processor) can be used in the kitchen. Please consult with us for any other equipment. Please bring your own utensils, bowls, chopping boards, knives, dishwashing detergents, cleaning cloths and tea towels etc.",
  },
  {
    q: "Can I store items in the kitchen?",
    a: "Storage (at no additional charge) is available in the coolroom in association with a rental event — e.g. drop off ingredients on Thursday, cook at NCK on Friday, collect items Saturday morning. Long-term and regular customers may utilise the shelves in our storage area. We recommend storing items in locked storage tubs (e.g. Bunnings tubs + a padlock).",
  },
  {
    q: "How do I book, what days are available and what is the cost?",
    a: "Booking availability is on most days, although Fridays and Saturdays are the busiest. You will have the kitchen exclusively during your booked time. Email hello@norwoodcommercialkitchen.com.au with your booking request — bookings are confirmed after payment is made. Cost is approx. $45/hr +GST for a casual booking (1–3 cooks). We have a 3-hour minimum and a $200 refundable bond. This is inclusive of utilities, cleaning chemicals and equipment use.",
  },
  {
    q: "Can my customers pick up food from NCK during my booking?",
    a: "Yes, this model works well!",
  },
  {
    q: "How do I get access to the kitchen?",
    a: "After payment of the bond, we will provide access to the kitchen. The kitchen can be booked and accessed 24/7.",
  },
  {
    q: "Do I have to clean the kitchen?",
    a: "Customers must clean all areas used in the kitchen, including sweeping and mopping the floors, and leave it in a state suitable for the next rental booking. Cleaning must be completed within the rental period.",
  },
  {
    q: "What do I need to start my food business?",
    a: "There are no requirements other than paying your invoice to book NCK. However, it is important to complete a Notification of Food Business (free, and can save you from fines). This connects you with an Environmental Health Officer at the council. You may also need insurance, and can register your business and get an ABN. Georgie is a food scientist who specialises in label compliance — questions about nutrition panels, ingredients, allergens and more are very welcome!",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

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
