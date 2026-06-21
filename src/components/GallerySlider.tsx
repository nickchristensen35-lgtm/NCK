'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import Lightbox from '@/components/Lightbox';

const IMAGES = [
  { src: '/images/IMG_6374.jpg',                    alt: 'Commercial kitchen space' },
  { src: '/images/IMG_6366.jpg',                    alt: 'Kitchen equipment overview' },
  { src: '/images/IMG_6351.jpg',                    alt: 'Prep area and bench space' },
  { src: '/images/IMG_6335.jpg',                    alt: 'Professional kitchen setup' },
  { src: '/images/PHOTO-2023-02-19-10-57-27.jpg',   alt: 'Kitchen in action' },
  { src: '/images/PHOTO-2023-02-19-10-57-27 2.jpg', alt: 'Baking and prep' },
  { src: '/images/PHOTO-2023-02-24-19-19-55.jpg',   alt: 'Food production' },
  { src: '/images/PHOTO-2023-03-01-11-19-23.jpg',   alt: 'Kitchen detail' },
  { src: '/images/PHOTO-2023-01-28-21-23-33.jpg',   alt: 'Evening kitchen session' },
  { src: '/images/PHOTO-2023-01-28-21-27-18.jpg',   alt: 'Kitchen workspace' },
  { src: '/images/PHOTO-2023-01-28-21-27-56.jpg',   alt: 'Equipment close-up' },
  { src: '/images/PHOTO-2023-01-28-21-28-37.jpg',   alt: 'Prep station' },
  { src: '/images/PHOTO-2023-01-28-21-30-14.jpg',   alt: 'Storage and facilities' },
  { src: '/images/PHOTO-2023-01-28-21-30-57.jpg',   alt: 'Kitchen overview' },
  { src: '/images/PHOTO-2023-01-28-21-31-34.jpg',   alt: 'Professional equipment' },
  { src: '/images/PHOTO-2023-01-28-21-32-31.jpg',   alt: 'Norwood kitchen facilities' },
  { src: '/images/Sam @ bratt pan.jpeg',             alt: 'Using the bratt pan' },
  { src: '/images/Commercial kitchen.jpeg',          alt: 'Commercial kitchen' },
];

const CARD_W = 320;
const CARD_H = 256;
const GAP = 16;
const STEP = CARD_W + GAP;

export default function GallerySlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const x = useMotionValue(0);

  const maxIndex = Math.max(0, IMAGES.length - perView);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(i, IMAGES.length - perView));
    setIndex(clamped);
    animate(x, -clamped * STEP, { type: 'spring', stiffness: 300, damping: 35, mass: 0.8 });
  }, [x, perView]);

  useEffect(() => {
    goTo(Math.min(index, IMAGES.length - perView));
  }, [perView]); // eslint-disable-line

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex(prev => {
        const next = prev >= IMAGES.length - perView ? 0 : prev + 1;
        animate(x, -next * STEP, { type: 'spring', stiffness: 300, damping: 35, mass: 0.8 });
        return next;
      });
    }, 2000);
    return () => clearInterval(t);
  }, [paused, perView, x]);

  const onDragEnd = useCallback(() => {
    const snapped = Math.round(-x.get() / STEP);
    goTo(snapped);
  }, [x, goTo]);

  const trackWidth = IMAGES.length * STEP - GAP;
  const viewWidth  = perView * STEP - GAP;

  return (
    <>
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          style={{ x, width: trackWidth, display: 'flex', gap: GAP }}
          drag="x"
          dragConstraints={{ left: -(trackWidth - viewWidth), right: 0 }}
          dragElastic={0.08}
          onDragEnd={onDragEnd}
          className="cursor-grab active:cursor-grabbing select-none"
        >
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-md group cursor-pointer"
              style={{ width: CARD_W, height: CARD_H }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                sizes="320px"
                draggable={false}
              />
              {/* Hover hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={IMAGES}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
