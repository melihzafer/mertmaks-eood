"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface GestureWrapperProps {
  children: ReactNode;
}

const pageOrder = [
  "/",
  "/supermarket",
  "/industrial",
  "/construction",
  "/restaurant",
  "/contact",
];

export function GestureWrapper({ children }: GestureWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const isFromEdge = useRef<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();

      // Check if gesture started from left edge (for back gesture)
      isFromEdge.current = e.touches[0].clientX < 50;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();

      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;
      const deltaTime = touchEndTime - touchStartTime.current;

      // Calculate velocity
      const velocity = Math.abs(deltaX) / deltaTime;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(deltaX) < Math.abs(deltaY)) return;

      const threshold = 80;
      const velocityThreshold = 0.5;
      const currentIndex = pageOrder.indexOf(pathname);

      // Swipe right (go to previous page) - only from left edge
      if (
        deltaX > threshold &&
        velocity > velocityThreshold &&
        isFromEdge.current
      ) {
        if (currentIndex > 0) {
          if ("vibrate" in navigator) {
            navigator.vibrate(30);
          }
          router.push(pageOrder[currentIndex - 1]);
        }
      }

      // Swipe left (go to next page) - from anywhere
      if (
        deltaX < -threshold &&
        velocity > velocityThreshold &&
        !isFromEdge.current
      ) {
        if (currentIndex >= 0 && currentIndex < pageOrder.length - 1) {
          if ("vibrate" in navigator) {
            navigator.vibrate(30);
          }
          router.push(pageOrder[currentIndex + 1]);
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, pathname, router]);

  return <div className="min-h-screen">{children}</div>;
}
