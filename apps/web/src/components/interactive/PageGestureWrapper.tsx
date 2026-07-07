"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState, useRef } from "react";

interface PageGestureWrapperProps {
  children: ReactNode;
  nextPage?: string;
  previousPage?: string;
  enableBackGesture?: boolean;
}

export default function PageGestureWrapper({
  children,
  nextPage,
  previousPage,
  enableBackGesture = true,
}: PageGestureWrapperProps) {
  const router = useRouter();
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
      isFromEdge.current = e.touches[0].clientX < 50;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();

      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;
      const deltaTime = touchEndTime - touchStartTime.current;

      const velocity = Math.abs(deltaX) / deltaTime;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(deltaX) < Math.abs(deltaY)) return;

      const threshold = 80;
      const velocityThreshold = 0.5;

      // Swipe right (back) - only from left edge
      if (
        enableBackGesture &&
        deltaX > threshold &&
        velocity > velocityThreshold &&
        isFromEdge.current
      ) {
        if ("vibrate" in navigator) {
          navigator.vibrate(30);
        }
        if (previousPage) {
          router.push(previousPage);
        } else {
          router.back();
        }
        return;
      }

      // Swipe left (next page)
      if (
        nextPage &&
        deltaX < -threshold &&
        velocity > velocityThreshold &&
        !isFromEdge.current
      ) {
        if ("vibrate" in navigator) {
          navigator.vibrate(30);
        }
        router.push(nextPage);
        return;
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
  }, [isMobile, nextPage, previousPage, enableBackGesture, router]);

  return <div className="min-h-screen">{children}</div>;
}
