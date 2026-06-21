'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, CheckCircle, MapPin, Calculator, Play,
  ChevronDown, Users, Star, ArrowRight, Menu, X,
} from 'lucide-react';

interface DropdownItem {
  icon: React.ElementType;
  label: string;
  desc: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const NAV: NavItem[] = [
  { label: 'Home', href: '/#home' },
  {
    label: 'Services',
    href: '/#services',
    dropdown: [
      { icon: Clock,        label: 'Flexible Kitchen Hire',  desc: 'Book by the hour — no lock-in contracts',      href: '/#services' },
      { icon: CheckCircle, label: 'Equipment & Facilities', desc: 'Commercial-grade gear, all included',           href: '/#services' },
      { icon: Calculator,  label: 'Pricing Guide',          desc: 'Transparent rates from $45/hr + GST',          href: '/pricing' },
      { icon: ArrowRight,  label: 'How It Works',           desc: 'Book, arrive, create — three simple steps',    href: '/#how-it-works' },
    ],
  },
  { label: 'Gallery', href: '/#gallery' },
  {
    label: 'About',
    href: '/#about',
    dropdown: [
      { icon: Users, label: 'Meet the Team',  desc: 'Georgie & Louise, co-founders',              href: '/#about' },
      { icon: Star,  label: 'Reviews',        desc: '5★ on Google from real clients',             href: '/#testimonials' },
      { icon: Play,  label: 'Virtual Tour',   desc: 'Explore the space in 3D',                   href: 'https://my.matterport.com/show/?m=NYMyUQ42dtt&sr=.1.,07&ss=7', external: true },
      { icon: MapPin, label: 'Get Directions', desc: '59 Queen St, Norwood SA 5067',              href: 'https://www.google.com/maps?rlz=1C5GCEM_enAU1105AU1106&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBBzE5NGowajSoAgCwAgE&um=1&ie=UTF-8&fb=1&gl=au&sa=X&geocode=KdsFlA_7ybBqMcLuasoA6XDw&daddr=59+Queen+St,+Norwood+SA+5067', external: true },
    ],
  },
  { label: 'Contact', href: '/#contact' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, x: -6 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.18 } }),
};

const mobileMenuVariants = {
  hidden:  { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, height: 0, transition: { duration: 0.18 } },
};

export default function SiteHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  // 'top' = white nav at page top, 'video' = transparent over hero, 'scrolled' = white past hero
  const [navState, setNavState] = useState<'top' | 'video' | 'scrolled'>('top');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroEl = document.getElementById('home');
      const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : window.innerHeight;

      if (y < 80) {
        setNavState('top');
      } else if (y < heroBottom - 64) {
        setNavState('video');
      } else {
        setNavState('scrolled');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDropdown = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      navState === 'video'
        ? 'bg-transparent border-b border-transparent shadow-none'
        : 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/#home" className="flex-shrink-0">
            <Image
              src="/images/Norwood Commercial Kitchen Logo.png"
              alt="Norwood Commercial Kitchen"
              width={120} height={48}
              className="object-contain h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown ? openDropdown(item.label) : undefined}
                onMouseLeave={() => item.dropdown ? scheduleClose() : undefined}
              >
                {/* Nav link */}
                <a
                  href={item.href}
                  className={`group relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    navState === 'video' ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <motion.span
                      animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </motion.span>
                  )}
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0.5 left-3 right-3 h-px bg-red-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </a>

                {/* Dropdown panel */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 origin-top"
                    >
                      {/* Arrow pointer */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />

                      {item.dropdown.map((d, i) => {
                        const Icon = d.icon;
                        const isExternal = d.external;
                        const Comp = isExternal ? 'a' : Link;
                        const props = isExternal
                          ? { href: d.href, target: '_blank', rel: 'noopener noreferrer' }
                          : { href: d.href };
                        return (
                          <motion.div
                            key={d.label}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Comp
                              {...(props as any)}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 group transition-colors duration-150"
                            >
                              <div className="mt-0.5 w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors">
                                <Icon className="w-4 h-4 text-red-600" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{d.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{d.desc}</p>
                              </div>
                            </Comp>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className={`hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg active:scale-[0.97] transition-all duration-150 ${
                navState === 'video'
                  ? 'bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-sm'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Book Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors active:scale-95 ${
                navState === 'video' ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        {item.label}
                        <motion.span animate={{ rotate: mobileExpanded === item.label ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4 opacity-60" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3"
                          >
                            {item.dropdown.map((d) => {
                              const Icon = d.icon;
                              return (
                                <a
                                  key={d.label}
                                  href={d.href}
                                  target={d.external ? '_blank' : undefined}
                                  rel={d.external ? 'noopener noreferrer' : undefined}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                  <Icon className="w-4 h-4 text-red-500 flex-shrink-0" />
                                  {d.label}
                                </a>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <a
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 py-3 bg-red-600 text-white text-sm font-semibold text-center rounded-xl hover:bg-red-700 transition-colors"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
