"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Haptic feedback with stronger pulse
    if ("vibrate" in navigator) {
      navigator.vibrate([30, 50, 30]);
    }

    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-24 left-6 z-40 p-4 bg-background border-2 border-border rounded-full shadow-2xl overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: isDark
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Icon container with improved animations */}
      <div className="relative w-6 h-6">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Moon className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Sun className="w-6 h-6 text-orange-500 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
