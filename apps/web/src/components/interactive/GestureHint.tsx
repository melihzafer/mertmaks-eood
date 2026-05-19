import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function GestureHint() {
  const [showHint, setShowHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Check if user has seen the hint before
    const hasSeenHint = localStorage.getItem('hasSeenGestureHint');
    
    if (!hasSeenHint && isMobile) {
      // Show hint after 2 seconds
      const timer = setTimeout(() => {
        setShowHint(true);
        localStorage.setItem('hasSeenGestureHint', 'true');
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
          setShowHint(false);
        }, 4000);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        >
          <div className="bg-gray-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronLeft size={24} />
              </motion.div>
              
              <div className="text-center">
                <p className="font-medium mb-1">Свайпни за навигация</p>
                <p className="text-xs text-white/70">Използвай жестове за бърза навигация</p>
              </div>
              
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <ChevronRight size={24} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

