'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Building2, HardHat, ArrowRight, type LucideIcon } from 'lucide-react';
import styles from '@/app/styles/PrismCard.module.scss';

type AccentColor = 'grocery' | 'industrial' | 'construction';
type IconName = 'ShoppingCart' | 'Building2' | 'HardHat';

interface PrismCardProps {
  title: string;
  description: string;
  iconName: IconName;
  accent: AccentColor;
  href: string;
  label?: string;
}

const iconMap: Record<IconName, LucideIcon> = {
  ShoppingCart,
  Building2,
  HardHat,
};

/**
 * PrismCard - Advanced 3D card component with holographic gradients
 * 
 * Features:
 * - SCSS module for complex gradient layering
 * - Holographic shimmer effect on hover
 * - Accent color glow matching division brand
 * - Smooth spring animations via Framer Motion
 * - Perspective depth with translateY + scale
 */
export function PrismCard({ 
  title, 
  description, 
  iconName, 
  accent, 
  href,
  label = 'Разгледай повече'
}: PrismCardProps) {
  const Icon = iconMap[iconName];
  
  return (
    <Link href={href} className="block h-full">
      <motion.article
        className={styles.prismCard}
        data-accent={accent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      >
        <div className={styles.prismCardContent}>
          <div className={styles.prismCardIcon}>
            <Icon />
          </div>
          
          <h3 className={styles.prismCardTitle}>{title}</h3>
          
          <p className={styles.prismCardDescription}>{description}</p>
          
          <div className={styles.prismCardFooter}>
            <span>{label}</span>
            <ArrowRight />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
