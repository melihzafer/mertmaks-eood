import { motion } from 'framer-motion';
import { ShoppingCart, Wrench, HardHat } from 'lucide-react';

interface AnimatedIconProps {
  type: 'grocery' | 'industrial' | 'construction';
  size?: number;
  className?: string;
}

export function AnimatedIcon({ type, size = 48, className = '' }: AnimatedIconProps) {
  const iconConfig = {
    grocery: {
      Icon: ShoppingCart,
      color: '#E53E3E',
      animation: {
        y: [0, -4, 0],
        rotate: [0, -2, 2, 0],
      },
    },
    industrial: {
      Icon: Wrench,
      color: '#D53F8C',
      animation: {
        rotate: [0, -15, 15, 0],
      },
    },
    construction: {
      Icon: HardHat,
      color: '#2563EB',
      animation: {
        y: [0, -3, 0],
        x: [0, 2, -2, 0],
      },
    },
  };

  const config = iconConfig[type];
  const Icon = config.Icon;

  return (
    <motion.div
      className={className}
      animate={config.animation}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Icon size={size} style={{ color: config.color }} />
    </motion.div>
  );
}

// Pulsing loader component
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <motion.div
        className="w-3 h-3 rounded-full bg-[#E53E3E]"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0,
        }}
      />
      <motion.div
        className="w-3 h-3 rounded-full bg-[#D53F8C]"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-3 h-3 rounded-full bg-[#2563EB]"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
    </div>
  );
}

// Breathing apple animation for grocery
export function BreathingApple() {
  return (
    <motion.div
      className="text-6xl"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      🍎
    </motion.div>
  );
}

// Spinning gear for industrial
export function SpinningGear() {
  return (
    <motion.div
      className="text-6xl"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      ⚙️
    </motion.div>
  );
}

// Tapping hammer for construction
export function TappingHammer() {
  return (
    <motion.div
      className="text-6xl"
      animate={{
        rotate: [0, -20, 0],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      🔨
    </motion.div>
  );
}

