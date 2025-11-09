"use client";

import { useRouter } from "next/navigation";
import { motion, PanInfo } from "framer-motion";
import { ReactNode } from "react";

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

  const handlePanEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 100;
    const velocityThreshold = 500;

    // Swipe right (back)
    if (
      enableBackGesture &&
      info.offset.x > swipeThreshold &&
      info.velocity.x > velocityThreshold &&
      info.point.x < 50 // Only from left edge
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
      info.offset.x < -swipeThreshold &&
      info.velocity.x < -velocityThreshold
    ) {
      if ("vibrate" in navigator) {
        navigator.vibrate(30);
      }
      router.push(nextPage);
      return;
    }
  };

  return (
    <motion.div
      onPanEnd={handlePanEnd}
      className="min-h-screen"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
    >
      {children}
    </motion.div>
  );
}
