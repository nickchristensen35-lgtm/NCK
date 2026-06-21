'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronRight, MapPin } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgCursorRef = useRef<HTMLDivElement>(null);
  const txtCursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (imgCursorRef.current) imgCursorRef.current.style.transform = `translate(${x * 18}px, ${y * 10}px)`;
      if (txtCursorRef.current) txtCursorRef.current.style.transform = `translate(${-x * 5}px, ${-y * 3}px)`;
      rafRef.current = null;
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (imgCursorRef.current) imgCursorRef.current.style.transform = 'translate(0px, 0px)';
    if (txtCursorRef.current) txtCursorRef.current.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="bg-cream relative overflow-hidden min-h-[88vh] flex items-center"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Full-bleed image — right half, desktop only */}
      <div
        ref={imgCursorRef}
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%]"
        style={{ transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Scroll parallax on inner wrapper */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.06}px) scale(1.08)` }}
        >
          <Image
            src="/images/PHOTO-2023-01-28-21-27-18.jpg"
            alt="Commercial kitchen hire Adelaide — Norwood Commercial Kitchen interior"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
        {/* Gradient blend: cream → transparent, left edge only */}
        <div
          className="absolute inset-y-0 left-0 w-40 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #FAF7F2 0%, transparent 100%)' }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="lg:w-[47%]">
          <div
            ref={txtCursorRef}
            style={{ transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <p className="text-red-600 font-semibold text-xs tracking-[0.2em] uppercase mb-5">
              Commercial Kitchen Hire · Adelaide, SA
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.04] tracking-tight mb-6">
              Build your wildly{' '}
              <span className="text-red-600">successful food</span>{' '}
              business
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-500 mb-8 max-w-lg leading-relaxed">
              Adelaide&apos;s premier commercial kitchen hire — fully equipped, council-approved, and ready when you are.
              No lock-in contracts. No overheads. Just your craft and everything you need to grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm tracking-wide"
              >
                Book a Session <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 text-sm tracking-wide"
              >
                See Pricing &amp; Equipment
              </a>
            </div>
            <a
              href="https://www.google.com/maps?rlz=1C5GCEM_enAU1105AU1106&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBBzE5NGowajSoAgCwAgE&um=1&ie=UTF-8&fb=1&gl=au&sa=X&geocode=KdsFlA_7ybBqMcLuasoA6XDw&daddr=59+Queen+St,+Norwood+SA+5067"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
              59 Queen Street, Norwood SA — Get Directions
            </a>
          </div>
        </div>

        {/* Mobile image — shown below text on smaller screens */}
        <div className="lg:hidden mt-10 relative rounded-2xl overflow-hidden aspect-[4/3]">
          <Image
            src="/images/PHOTO-2023-01-28-21-27-18.jpg"
            alt="Commercial kitchen hire Adelaide — Norwood Commercial Kitchen interior"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
