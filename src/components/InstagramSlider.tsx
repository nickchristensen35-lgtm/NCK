'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import { Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { InstagramIcon } from '@/components/SocialIcons';

const POSTS = [
  {
    src: '/images/PHOTO-2023-01-28-21-27-18.jpg',
    caption: 'Ready for your next big idea 🍳 #commercialkitchen #Adelaide #foodbusiness',
    likes: 47, comments: 8,
  },
  {
    src: '/images/PHOTO-2023-01-28-21-28-37.jpg',
    caption: 'Commercial-grade equipment included in every booking 💪 #kitchenhire #norwood',
    likes: 63, comments: 12,
  },
  {
    src: '/images/PHOTO-2023-02-19-10-57-27.jpg',
    caption: 'Another amazing session in the kitchen 👩‍🍳 #foodentrepreneur #SAeats',
    likes: 91, comments: 19,
  },
  {
    src: '/images/PHOTO-2023-03-01-11-19-23.jpg',
    caption: 'Baking up something special 🍞 #baker #Adelaide #commercialkitchenhire',
    likes: 74, comments: 11,
  },
  {
    src: '/images/PHOTO-2023-02-24-19-19-55.jpg',
    caption: 'From kitchen to market — we make it possible 🛒 #marketstall #foodbiz',
    likes: 58, comments: 9,
  },
  {
    src: '/images/Sam @ bratt pan.jpeg',
    caption: 'Sam working the bratt pan like a pro 🔥 #norwood #kitchenlife',
    likes: 112, comments: 24,
  },
  {
    src: '/images/PHOTO-2023-02-19-10-57-27 2.jpg',
    caption: 'Great community of food creators right here in Adelaide 🌟 #foodcommunity',
    likes: 83, comments: 15,
  },
  {
    src: '/images/PHOTO-2023-01-28-21-30-14.jpg',
    caption: 'Purpose-built for your food business 📍 59 Queen St, Norwood SA',
    likes: 55, comments: 7,
  },
];

const CARD = 300;
const GAP  = 16;
const STEP  = CARD + GAP;

export default function InstagramSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const maxIndex = POSTS.length - visibleCount;

  /* Responsive visible count */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(i, POSTS.length - visibleCount));
    setIndex(clamped);
    animate(x, -clamped * STEP, { type: 'spring', stiffness: 300, damping: 35, mass: 0.8 });
  }, [x, visibleCount]);

  /* Re-clamp when visibleCount changes */
  useEffect(() => {
    goTo(Math.min(index, POSTS.length - visibleCount));
  }, [visibleCount]); // eslint-disable-line

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex(prev => {
        const next = prev >= POSTS.length - visibleCount ? 0 : prev + 1;
        animate(x, -next * STEP, { type: 'spring', stiffness: 300, damping: 35, mass: 0.8 });
        return next;
      });
    }, 2000);
    return () => clearInterval(t);
  }, [paused, visibleCount, x]);

  /* Drag end — snap to nearest */
  const onDragEnd = useCallback(() => {
    const current = x.get();
    const snapped = Math.round(-current / STEP);
    goTo(snapped);
  }, [x, goTo]);

  const trackWidth = POSTS.length * STEP - GAP;
  const viewWidth  = visibleCount * STEP - GAP;

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Drag track */}
      <motion.div
        ref={trackRef}
        style={{ x, width: trackWidth, display: 'flex', gap: GAP }}
        drag="x"
        dragConstraints={{ left: -(trackWidth - viewWidth), right: 0 }}
        dragElastic={0.08}
        onDragEnd={onDragEnd}
        className="cursor-grab active:cursor-grabbing select-none"
      >
        {POSTS.map((post, i) => (
          <motion.a
            key={i}
            href="https://www.instagram.com/norwoodcommercialkitchen"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex-shrink-0 rounded-2xl overflow-hidden group"
            style={{ width: CARD, height: CARD }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={post.src}
              alt={post.caption}
              fill
              className="object-cover pointer-events-none"
              sizes="300px"
              draggable={false}
            />

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50 flex flex-col justify-between p-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <InstagramIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white text-xs font-semibold">norwoodcommercialkitchen</span>
              </div>

              {/* Caption + stats */}
              <div>
                <p className="text-white text-xs leading-snug mb-3 line-clamp-2">{post.caption}</p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-white text-xs">
                    <Heart className="w-3.5 h-3.5 fill-white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-white text-xs">
                    <MessageCircle className="w-3.5 h-3.5 fill-white" /> {post.comments}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-red-600' : 'w-1.5 bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex gap-2">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index >= maxIndex}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
