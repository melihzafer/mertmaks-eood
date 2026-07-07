"use client";

import { motion } from "framer-motion";
import {
  Truck,
  CreditCard,
  Tag,
  Phone,
  Clock,
  Shield,
  Sparkles,
  PackageCheck,
} from "lucide-react";
import type { DivisionOfferings, OfferingIconName } from "@/data/offerings";

const iconMap: Record<OfferingIconName, React.ComponentType<{ className?: string }>> = {
  truck: Truck,
  "credit-card": CreditCard,
  tag: Tag,
  phone: Phone,
  clock: Clock,
  shield: Shield,
  sparkles: Sparkles,
  "package-check": PackageCheck,
};

interface OfferingsSectionProps {
  offerings: DivisionOfferings;
}

export function OfferingsSection({ offerings }: OfferingsSectionProps) {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="indexed-head-compact">
          <div className="eyebrow">03 / Услуги</div>
          <h2>{offerings.title}</h2>
          <p className="lead">{offerings.subtitle}</p>
        </div>

        <div className="services-grid">
          {offerings.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.article
                key={item.title}
                className="bento-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <div className="icon">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
