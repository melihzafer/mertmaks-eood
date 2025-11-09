'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ShoppingCart, Building2, HardHat, UtensilsCrossed } from 'lucide-react';
import { useState, useRef } from 'react';

interface DivisionCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  iconName: 'ShoppingCart' | 'Building2' | 'HardHat' | 'UtensilsCrossed';
  accentColor: 'grocery' | 'industrial' | 'construction' | 'restaurant';
}

export function DivisionCard({
  title,
  description,
  image,
  href,
  iconName,
  accentColor,
}: DivisionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [performanceMode] = useState<'high' | 'low'>('high'); // Simplified - will implement detection later
  const cardRef = useRef<HTMLDivElement>(null);

  // Map icon name to component
  const iconMap = {
    ShoppingCart,
    Building2,
    HardHat,
    UtensilsCrossed,
  };
  const Icon = iconMap[iconName];

  // Motion values for 3D rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for rotation (only in high-performance mode)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const colorConfig = {
    grocery: {
      solid: 'var(--color-grocery)',
      gradient: 'radial-gradient(circle at center, rgba(229, 62, 62, 0.15) 0%, transparent 70%)',
    },
    industrial: {
      solid: 'var(--color-industrial)',
      gradient: 'radial-gradient(circle at center, rgba(213, 63, 140, 0.15) 0%, transparent 70%)',
    },
    construction: {
      solid: 'var(--color-construction)',
      gradient: 'radial-gradient(circle at center, rgba(49, 130, 206, 0.15) 0%, transparent 70%)',
    },
    restaurant: {
      solid: '#F59E0B',
      gradient: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
    },
  };

  const config = colorConfig[accentColor];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || performanceMode === 'low') return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: '1000px' }}>
      <Link href={href} className="block group relative">
        {/* Color Bleed Effect - Enhanced with 3D feel */}
        <motion.div
          className="absolute inset-0 -z-10 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.5 : 0.8,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: config.gradient }}
        />

        <motion.div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: performanceMode === 'high' && isHovered ? rotateX : 0,
            rotateY: performanceMode === 'high' && isHovered ? rotateY : 0,
            transformStyle: performanceMode === 'high' ? 'preserve-3d' : undefined,
          }}
          whileHover={{ 
            scale: 1.03,
            y: -8,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
          transition={{ duration: performanceMode === 'high' ? 0.4 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ transform: 'translateZ(20px)' }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{ backgroundColor: config.solid }}
            />
          </div>

          {/* Content */}
          <div className="p-8" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center space-x-4 mb-4">
              <motion.div 
                className="p-3 rounded-xl"
                style={{ 
                  backgroundColor: config.solid,
                  transform: 'translateZ(40px)',
                }}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="text-white" size={28} />
              </motion.div>
              <h3 className="text-2xl font-semibold" style={{ color: config.solid }}>
                {title}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-medium" style={{ color: config.solid }}>
                Разгледай
              </span>
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={20} style={{ color: config.solid }} />
              </motion.div>
            </motion.div>
          </div>

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            }}
          />
        </motion.div>
      </Link>
    </div>
  );
}

