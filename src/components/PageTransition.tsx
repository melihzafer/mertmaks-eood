'use client';

import { motion } from 'framer-motion';
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
 * - Content renders immediately (no blocking)
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showWipe, setShowWipe] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  // Trigger wipe animation on route change
  useEffect(() => {
    if (!prefersReducedMotion) {
      setShowWipe(true);
      const timer = setTimeout(() => setShowWipe(false), 900);
      return () => clearTimeout(timer);
    }
  }, [pathname, prefersReducedMotion]);
  
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
    if (pathname.includes('/contact')) {
      return 'rgb(37, 99, 235)'; // Contact blue
    }
    return 'rgb(26, 26, 26)'; // Default dark
  };
  
  const wipeColor = getWipeColor();
  
  return (
    <>
      {/* Color wipe overlay - slides in from left, exits to right */}
      {showWipe && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            backgroundColor: wipeColor,
          }}
        />
      )}
      
      {/* Page content - renders immediately */}
      {children}
    </>
  );
}
