'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

interface GestureWrapperProps {
  children: ReactNode;
}

const pageOrder = ['/', '/supermarket', '/industrial', '/construction', '/contact'];

export function GestureWrapper({ children }: GestureWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    
    // Only enable gestures on mobile
    if (!isMobile) return;
    
    const currentIndex = pageOrder.indexOf(pathname);
    
    // Swipe right (go to previous page or home)
    if (info.offset.x > threshold || velocity > 500) {
      if (currentIndex > 0) {
        router.push(pageOrder[currentIndex - 1]);
      }
    }
    
    // Swipe left (go to next page)
    if (info.offset.x < -threshold || velocity < -500) {
      if (currentIndex >= 0 && currentIndex < pageOrder.length - 1) {
        router.push(pageOrder[currentIndex + 1]);
      }
    }
    
    // Reset position
    x.set(0);
  };

  return (
    <motion.div
      drag={isMobile ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ x, opacity }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
