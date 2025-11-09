"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scan } from "lucide-react";
import { WebARFinder } from "./WebARFinder";
import storesData from "@/data/stores.json";

export function WebARButton() {
  const [isMobile, setIsMobile] = useState(false);
  const [isARActive, setIsARActive] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        <span className="font-bold">AR MODE</span>
      </motion.button>

      {/* AR Experience */}
      {isARActive && (
        <WebARFinder
          stores={storesData.stores.map((store) => ({
            id: store.id,
            name: store.name,
            coordinates: store.coordinates,
          }))}
          onClose={handleClose}
        />
      )}
    </>
  );
}
