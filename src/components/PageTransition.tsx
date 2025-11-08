'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * PageTransition - Animated route transitions with color wipe effect
 * 
 * Features:
 * - Color wipe slide in/out based on current route
 * - Grocery routes: red wipe
 * - Industrial routes: magenta wipe
 * - Construction routes: blue wipe
 * - Default: dark gray wipe
 * - Smooth cubic-bezier easing
 * - Respects prefers-reduced-motion
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  // Determine wipe color based on route
  const getWipeColor = () => {
    if (pathname.includes('/supermarket') || pathname.includes('/grocery')) {
      return 'rgb(229, 62, 62)'; // Grocery red
    }
    if (pathname.includes('/industrial')) {
      return 'rgb(213, 63, 140)'; // Industrial magenta
    }
    if (pathname.includes('/construction')) {
      return 'rgb(49, 130, 206)'; // Construction blue
    }
    return 'rgb(26, 26, 26)'; // Default dark
  };
  
  const wipeColor = getWipeColor();

  // Reduced duration for users who prefer less motion
  const duration = prefersReducedMotion ? 0.15 : 0.4;
  const wipeDuration = prefersReducedMotion ? 0.3 : 0.9;
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Color wipe overlay - slides in from left, exits to right */}
        {!prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: wipeDuration,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              backgroundColor: wipeColor,
            }}
          />
        )}
        
        {/* Page content */}
        <motion.div
          initial={{ y: prefersReducedMotion ? 0 : 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: prefersReducedMotion ? 0 : -20, opacity: 0 }}
          transition={{
            duration: duration * 1.2,
            delay: prefersReducedMotion ? 0 : 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
