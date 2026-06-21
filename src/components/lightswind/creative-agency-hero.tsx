'use client';

import React from 'react';
import { Play, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreativeAgencyHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* Full-screen background video — plays once, holds last frame */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <video
          autoPlay
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.6)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          <source src="/videos/hero-kitchen.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlay — darker left for text, lighter right */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.18) 100%)',
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-between max-w-7xl mx-auto w-full px-6 lg:px-10 pt-24 pb-10" style={{ zIndex: 3 }}>

        {/* Hero copy */}
        <div className="flex-1 flex flex-col justify-center max-w-xl lg:max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-red-400 font-semibold text-xs tracking-[0.22em] uppercase mb-5"
          >
            Commercial Kitchen Hire · Adelaide, SA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            Build your wildly<br />
            <span className="text-red-400">successful</span><br />
            food business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/65 text-sm sm:text-base leading-relaxed mb-8 max-w-md"
          >
            Adelaide&apos;s premier commercial kitchen hire — fully equipped, council-approved, and ready when you are. No lock-in contracts. No overheads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 active:scale-[0.97] transition-all text-sm shadow-lg shadow-red-900/40"
            >
              Book a Session <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="https://my.matterport.com/show/?m=NYMyUQ42dtt&sr=.1.,07&ss=7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 active:scale-[0.97] transition-all text-sm backdrop-blur-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Virtual Tour
            </a>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            href="https://www.google.com/maps?rlz=1C5GCEM_enAU1105AU1106&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBBzE5NGowajSoAgCwAgE&um=1&ie=UTF-8&fb=1&gl=au&sa=X&geocode=KdsFlA_7ybBqMcLuasoA6XDw&daddr=59+Queen+St,+Norwood+SA+5067"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-white/40 hover:text-white/70 text-xs transition-colors w-fit"
          >
            <MapPin className="w-3 h-3" />
            59 Queen Street, Norwood SA
          </motion.a>
        </div>

        {/* Stats bar at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-white/15 mt-8"
        >
          {[
            { value: '$45', unit: '/hr + GST', label: 'Kitchen hire rate' },
            { value: '24/7', unit: '', label: 'Access during sessions' },
            { value: 'Min 3hr', unit: '', label: 'No lock-in contracts' },
            { value: '100%', unit: '', label: 'Council-approved' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <p className="text-white font-extrabold text-xl sm:text-2xl leading-none">
                {stat.value}<span className="text-white/50 text-sm font-normal">{stat.unit}</span>
              </p>
              <p className="text-white/45 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
