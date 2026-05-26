"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import type { WeeklyPromotion } from "@/data/weekly-promotions";
import { Badge } from "@/components/ui/badge";

interface WeeklyPromosSectionProps {
  promotions: WeeklyPromotion[];
  accentColor?: string;
}

export function WeeklyPromosSection({
  promotions,
  accentColor = "#E53E3E",
}: WeeklyPromosSectionProps) {
  if (promotions.length === 0) return null;

  return (
    <section className="section-tight rule">
      <div className="container">
        <div className="indexed-head">
          <div className="big-index">03</div>
          <div>
            <div className="eyebrow">Седмични оферти</div>
            <h2>Оферти тази седмица</h2>
            <p className="lead">
              Актуални отстъпки и промоции за текущата седмица.
            </p>
          </div>
        </div>

        <div className="promo-grid">
          {promotions.map((promo, index) => (
            <motion.article
              key={promo.id}
              className="promo-card"
              style={{ "--card-color": accentColor } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="promo-top" />
              {promo.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="promo-content">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="text-xs font-semibold"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Тази седмица
                  </Badge>
                  {promo.discount && promo.discount > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-xs font-bold bg-red-100 text-red-800"
                    >
                      -{promo.discount}%
                    </Badge>
                  )}
                </div>
                <h3>{promo.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {promo.description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Tag className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {promo.category}
                  </span>
                </div>
                {promo.terms && promo.terms.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {promo.terms.map((term) => (
                      <li
                        key={term}
                        className="text-xs text-gray-500 flex items-start gap-1"
                      >
                        <span className="text-gray-400 mt-0.5">•</span>
                        {term}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-gray-400 mt-3">
                  Валидна: {promo.validFrom} – {promo.validTo}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
