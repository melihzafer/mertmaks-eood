// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scan } from "lucide-react";
import ARHeadUpDisplay from "./ARHeadUpDisplay";
import storesData from "@/data/stores.json";

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
  const [isMobile, setIsMobile] = useState(false);
  const [isARActive, setIsARActive] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // In development/test, allow desktop for testing features (remove < 768 limit for product mode)
      if (mode === "product") {
        setIsMobile(true);
      } else {
        setIsMobile(window.innerWidth < 768);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mode]);

  const handleARClick = () => {
    // Haptic feedback
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
    setIsARActive(true);
  };

  const handleClose = () => {
    setIsARActive(false);
  };

  if (!isMobile) return null;

  return (
    <>
      {/* AR Button */}
      <motion.button
        onClick={handleARClick}
        className="fixed bottom-24 right-6 z-40 flex items-center space-x-2 px-6 py-4 bg-linear-to-r from-blue-600 via-pink-500 to-red-600 text-white rounded-full shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Scan size={24} />
        <span className="font-bold">
          {mode === "navigation" ? "AR MAP" : "3D VIEW"}
        </span>
      </motion.button>

      {/* AR Experience */}
      {isARActive && (
        <div className="fixed inset-0 z-50 bg-black">
          {mode === "navigation" ? (
            <ARHeadUpDisplay
              stores={storesData.stores.map((store) => ({
                id: store.id,
                name: store.name,
                coordinates: store.coordinates,
                address: store.address
              }))}
              onClose={handleClose}
            />
          ) : (
            <>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
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
                    👋 View in your space
                  </div>
                </model-viewer>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
