'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const x = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [visible, mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      aria-hidden
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.09) 0%, transparent 70%)',
        filter: 'blur(8px)',
        willChange: 'transform',
      }}
    />
  );
}
