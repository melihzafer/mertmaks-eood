import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, X, Navigation, MapPin } from 'lucide-react';

export function WebARButton() {
  const [isMobile, setIsMobile] = useState(false);
  const [isARActive, setIsARActive] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleARClick = () => {
    setIsARActive(true);
    
    // Mock AR experience - in production this would use WebXR or AR.js
    // For now, we'll simulate the experience
    setTimeout(() => {
      setIsARActive(false);
    }, 5000);
  };

  if (!isMobile) return null;

  return (
    <>
      {/* AR Button */}
      <motion.button
        onClick={handleARClick}
        className="fixed bottom-24 right-6 z-40 flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 via-pink-500 to-red-600 text-white rounded-full shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Scan size={24} />
        <span className="font-bold">AR MODE</span>
      </motion.button>

      {/* AR Experience Modal */}
      <AnimatePresence>
        {isARActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Camera View Simulation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 opacity-80" />
            
            {/* AR Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mb-8"
              >
                <div className="relative">
                  <motion.div
                    className="w-32 h-32 rounded-full border-4 border-white/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Navigation size={48} className="text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center px-8"
              >
                <h2 className="text-2xl font-bold mb-4">Търсене на магазини...</h2>
                <p className="text-white/80 mb-6">
                  Насочете камерата си към улицата за AR навигация
                </p>

                {/* Mock AR Pins */}
                <div className="flex justify-center space-x-4 mb-8">
                  {[
                    { name: 'Супермаркет', distance: '150m', color: '#E53E3E' },
                    { name: 'Промишлени', distance: '200m', color: '#D53F8C' },
                    { name: 'Строителство', distance: '180m', color: '#3182CE' },
                  ].map((store, index) => (
                    <motion.div
                      key={store.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.2 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl mb-2"
                        style={{ backgroundColor: store.color }}
                      >
                        <MapPin size={28} />
                      </div>
                      <span className="text-xs font-medium">{store.name}</span>
                      <span className="text-xs text-white/60">{store.distance}</span>
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm text-white/60 italic">
                  Demo режим - WebAR изисква достъп до камерата
                </p>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={() => setIsARActive(false)}
                className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-md rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
