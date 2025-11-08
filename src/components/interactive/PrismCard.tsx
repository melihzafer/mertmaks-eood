"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  Building2,
  HardHat,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/PrismCard.module.scss";

type AccentColor = "grocery" | "industrial" | "construction";
type IconName = "ShoppingCart" | "Building2" | "HardHat";

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
 * PrismCard - Advanced 3D card component with holographic gradients and motion
 *
 * Features:
 * - SCSS module for complex gradient layering
 * - Holographic shimmer effect on hover
 * - Device Orientation API for mobile gyroscope tilt
 * - Mouse tracking for desktop 3D effect
 * - Smooth spring animations via Framer Motion
 * - Perspective depth with translateY + scale
 */
export function PrismCard({
  title,
  description,
  iconName,
  accent,
  href,
  label = "Разгледай повече",
}: PrismCardProps) {
  const Icon = iconMap[iconName];
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D transform
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  // Spring physics for smooth motion
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(motionY, [-0.5, 0.5], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(motionX, [-0.5, 0.5], [-10, 10]),
    springConfig
  );

  const [isDeviceOrientation, setIsDeviceOrientation] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Check for device orientation support
  useEffect(() => {
    const hasOrientation =
      typeof window !== "undefined" && "DeviceOrientationEvent" in window;
    setIsDeviceOrientation(
      hasOrientation && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    );
  }, []);

  // Request permission for iOS 13+ device orientation
  useEffect(() => {
    if (!isDeviceOrientation) return;

    const requestPermission = async () => {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        try {
          const permission = await (
            DeviceOrientationEvent as any
          ).requestPermission();
          setPermissionGranted(permission === "granted");
        } catch (error) {
          console.log("Device orientation permission denied");
        }
      } else {
        // Non-iOS devices don't need permission
        setPermissionGranted(true);
      }
    };

    requestPermission();
  }, [isDeviceOrientation]);

  // Device Orientation listener for mobile
  useEffect(() => {
    if (!isDeviceOrientation || !permissionGranted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        // Beta: front-to-back tilt (-180 to 180)
        // Gamma: left-to-right tilt (-90 to 90)
        // Normalize to -0.5 to 0.5 range
        const normalizedBeta = Math.max(-0.5, Math.min(0.5, event.beta / 180));
        const normalizedGamma = Math.max(-0.5, Math.min(0.5, event.gamma / 90));

        motionX.set(normalizedGamma);
        motionY.set(normalizedBeta);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [isDeviceOrientation, permissionGranted, motionX, motionY]);

  // Mouse tracking for desktop
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDeviceOrientation || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate relative position (-0.5 to 0.5)
    const relativeX = (event.clientX - centerX) / (rect.width / 2);
    const relativeY = (event.clientY - centerY) / (rect.height / 2);

    motionX.set(relativeX * 0.5);
    motionY.set(relativeY * 0.5);
  };

  const handleMouseLeave = () => {
    if (isDeviceOrientation) return;
    motionX.set(0);
    motionY.set(0);
  };

  return (
    <Link href={href} className="block h-full">
      <motion.article
        ref={cardRef}
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
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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

