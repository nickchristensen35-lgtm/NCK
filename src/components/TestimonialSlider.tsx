'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Sam',
    initial: 'S',
    color: 'bg-red-600',
    role: 'Kitchen client',
    quote:
      'I was one of the first to use this kitchen, and what a great setup! All brand new and top quality equipment. Georgie and Louise are super friendly and very accommodating. I will be back.',
  },
  {
    name: 'Shannon',
    initial: 'Sh',
    color: 'bg-orange-500',
    role: 'Kitchen client',
    quote:
      'Fantastic new kitchen, plenty of space & owners Georgie & Louise are supportive, flexible & knowledgeable. The perfect space to launch your food business!',
  },
  {
    name: 'Lizzy',
    initial: 'L',
    color: 'bg-amber-600',
    role: 'Kitchen client',
    quote:
      'Just did a walk through of the Norwood Commercial Kitchen which has nearly finished construction. WOW!!! The facilities are top notch, can\'t wait to get in here.',
  },
  {
    name: 'Diana',
    initial: 'D',
    color: 'bg-rose-600',
    role: 'Kitchen client',
    quote:
      'Great space to cook, bake and make big production! All equipment is high quality and hours are very flexible.',
  },
  {
    name: 'Ksenija',
    initial: 'K',
    color: 'bg-red-700',
    role: 'Program facilitator',
    quote:
      'NCK have been incredibly supportive and flexible. The 24/7 access and top quality facilities has enabled them to prepare and store their food products as if it were their own home kitchen — with the added bonus of commercial level equipment. For anyone looking to start or scale their food business, I can not recommend NCK enough!',
  },
];

const STARS = (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <svg key={n} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 18 17">
        <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" />
      </svg>
    ))}
  </div>
);

const CARD_W = 360;
const GAP = 32;
const STEP = CARD_W + GAP;

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);
  const x = useMotionValue(0);

  const maxIndex = Math.max(0, REVIEWS.length - perView);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w < 768 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, REVIEWS.length - perView));
      setIndex(clamped);
      animate(x, -clamped * STEP, { type: 'spring', stiffness: 280, damping: 32, mass: 0.9 });
    },
    [x, perView]
  );

  useEffect(() => {
    goTo(Math.min(index, REVIEWS.length - perView));
  }, [perView]); // eslint-disable-line

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((prev) => {
        const next = prev >= REVIEWS.length - perView ? 0 : prev + 1;
        animate(x, -next * STEP, { type: 'spring', stiffness: 280, damping: 32, mass: 0.9 });
        return next;
      });
    }, 2000);
    return () => clearInterval(t);
  }, [paused, perView, x]);

  const onDragEnd = useCallback(() => {
    const snapped = Math.round(-x.get() / STEP);
    goTo(snapped);
  }, [x, goTo]);

  const trackWidth = REVIEWS.length * STEP - GAP;
  const viewWidth = perView * STEP - GAP;

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        style={{ x, width: trackWidth, display: 'flex', gap: GAP }}
        drag="x"
        dragConstraints={{ left: -(trackWidth - viewWidth), right: 0 }}
        dragElastic={0.06}
        onDragEnd={onDragEnd}
        className="cursor-grab active:cursor-grabbing select-none"
      >
        {REVIEWS.map((r, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex flex-col bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-400 hover:shadow-md transition-all duration-300 group"
            style={{ width: CARD_W }}
          >
            {/* Stars + rating */}
            <div className="flex items-center gap-2 mb-5">
              {STARS}
              <span className="text-sm font-semibold text-red-600 ml-1">5.0</span>
            </div>

            {/* Quote */}
            <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6 group-hover:text-gray-800 transition-colors duration-300">
              &ldquo;{r.quote}&rdquo;
            </p>

            {/* Reviewer */}
            <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
              <div
                className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
              >
                {r.initial}
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-sm">{r.name}</p>
                <p className="text-gray-400 text-xs">{r.role}</p>
              </div>
              {/* Google badge */}
              <div className="ml-auto">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-red-600' : 'w-4 bg-gray-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
