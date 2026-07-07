// @ts-nocheck
"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navigation, Scan } from "lucide-react";
import { getRouteAccent } from "@/lib/route-accent";

interface WebARButtonProps {
  mode?: "navigation" | "product";
  modelSrc?: string;
  poster?: string;
}

export function WebARButton({
  mode = "navigation",
  modelSrc,
  poster,
}: WebARButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isARActive, setIsARActive] = useState(false);
  const accent = getRouteAccent(pathname ?? "/");

  // Contact and finder pages already provide dedicated location CTAs.
  if (pathname.startsWith("/find-us") || pathname.startsWith("/contact")) {
    return null;
  }

  if (mode === "navigation") {
    return (
      <motion.button
        onClick={() => {
          if ("vibrate" in navigator) navigator.vibrate(50);
          router.push("/find-us");
        }}
        className="floating-ar-trigger"
        style={{ "--theme-accent": accent }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        aria-label="Намери магазин с AR навигация"
      >
        <span className="floating-ar-trigger-icon" aria-hidden="true">
          <Navigation size={18} />
        </span>
        <span>Намери ни</span>
      </motion.button>
    );
  }

  // Product mode — inline model-viewer AR
  return (
    <>
      <motion.button
        onClick={() => {
          if ("vibrate" in navigator) navigator.vibrate(50);
          setIsARActive(true);
        }}
        className="floating-ar-trigger"
        style={{ "--theme-accent": accent }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        aria-label="Виж продукт в 3D"
      >
        <span className="floating-ar-trigger-icon" aria-hidden="true">
          <Scan size={18} />
        </span>
        <span>3D ПРЕГЛЕД</span>
      </motion.button>
 
      {isARActive && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setIsARActive(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
            aria-label="Затвори"
          >
            <Scan size={24} className="rotate-45" />
          </button>
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            {/* @ts-ignore - model-viewer custom element */}
            <model-viewer
              src={modelSrc || "https://modelviewer.dev/shared-assets/models/Astronaut.glb"}
              poster={poster}
              alt="3D Product"
              scale="1 1 1"
              camera-controls
              auto-rotate
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-placement="floor"
              shadow-intensity="1"
              style={{ width: "100%", height: "100%" }}
            >
              <div slot="ar-button" className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full font-bold shadow-lg cursor-pointer">
                👋 Виж в твоя дом
              </div>
            </model-viewer>
          </div>
        </div>
      )}
    </>
  );
}
