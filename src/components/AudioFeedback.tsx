import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

// Audio feedback hook
export function useAudioFeedback() {
  const [isEnabled, setIsEnabled] = useState(false);

  const playSound = (type: 'click' | 'hover' | 'success' | 'error') => {
    if (!isEnabled) return;

    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sounds for different interactions
    switch (type) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
      case 'hover':
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.05;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.03);
        break;
      case 'success':
        oscillator.frequency.value = 1000;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        setTimeout(() => {
          const osc2 = audioContext.createOscillator();
          const gain2 = audioContext.createGain();
          osc2.connect(gain2);
          gain2.connect(audioContext.destination);
          osc2.frequency.value = 1200;
          gain2.gain.value = 0.1;
          osc2.start();
          osc2.stop(audioContext.currentTime + 0.1);
        }, 100);
        break;
      case 'error':
        oscillator.frequency.value = 400;
        gainNode.gain.value = 0.15;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15);
        break;
    }
  };

  return { isEnabled, setIsEnabled, playSound };
}

// Audio toggle component
export function AudioToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Store preference in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('audioFeedback');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  const handleToggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('audioFeedback', String(newValue));

    // Play a test sound when enabled
    if (newValue) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative">
        <motion.button
          onClick={handleToggle}
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
          className={`p-4 rounded-full shadow-2xl backdrop-blur-sm transition-colors ${
            isEnabled
              ? 'bg-gradient-to-br from-blue-600 via-pink-500 to-red-600 text-white'
              : 'bg-white/90 text-gray-600 border border-gray-200'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
            >
              {isEnabled ? 'Звукът е включен' : 'Включи звука'}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
