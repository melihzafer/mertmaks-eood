"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Percent } from "lucide-react";
import type { WeeklyPromotion } from "@/data/weekly-promotions";
import type { MonthlyPromotion } from "@/data/monthly-promotions";
import type { BrochureShareItem } from "@/lib/brochure";
import { BrochureShareButton } from "@/components/features/brochure-sharing/BrochureShareButton";

function PromoImage({ item }: { item: BrochureShareItem }) {
  const [error, setError] = useState(false);

  if (item.imageUrl && !error) {
    return (
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-2" style={{ opacity: 0.7 }}>
      <Percent size={40} style={{ color: item.accentColor }} />
      <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg)", textAlign: "center", paddingInline: "12px" }}>
        {item.category ?? "MERTMAX"}
      </span>
    </div>
  );
}

interface UnifiedPromotionsSectionProps {
  weeklyPromotions: WeeklyPromotion[];
  monthlyPromotions: MonthlyPromotion[];
  brochurePromotions: BrochureShareItem[];
  brochureProducts: BrochureShareItem[];
  accentColor?: string;
}

export function UnifiedPromotionsSection({
  weeklyPromotions,
  monthlyPromotions,
  brochurePromotions,
  brochureProducts, // Explicitly ignored/removed per user request
  accentColor = "#E53E3E",
}: UnifiedPromotionsSectionProps) {
  // Map weekly promotions to BrochureShareItem format
  const weeklyItems: BrochureShareItem[] = weeklyPromotions.map((promo) => ({
    id: promo.id,
    kind: "promotion" as const,
    title: promo.title,
    description: promo.description,
    label: promo.discount ? `-${promo.discount}%` : undefined,
    category: promo.promoType === "custom" ? undefined : (promo.category || "Седмична оферта"),
    storeName: "Супермаркет МЕРТМАКС",
    storeSlug: promo.store,
    accentColor: accentColor,
    imageUrl: promo.image,
    validFrom: promo.validFrom,
    validTo: promo.validTo,
    canonicalUrl: `/${promo.store}`,
    terms: promo.terms,
    promoType: promo.promoType,
    oldPrice: promo.oldPrice,
    newPrice: promo.newPrice,
    showPrice: promo.showPrice,
  }));

  // Map monthly promotions to BrochureShareItem format
  const monthlyItems: BrochureShareItem[] = monthlyPromotions.map((promo) => ({
    id: promo.id,
    kind: "promotion" as const,
    title: promo.title,
    description: promo.description,
    label: promo.discount ? `-${promo.discount}%` : undefined,
    category: promo.promoType === "custom" ? undefined : (promo.category || "Месечна оферта"),
    storeName: "Супермаркет МЕРТМАКС",
    storeSlug: promo.store,
    accentColor: accentColor,
    imageUrl: promo.image,
    validFrom: promo.validFrom,
    validTo: promo.validTo,
    canonicalUrl: `/${promo.store}`,
    terms: promo.terms,
    promoType: promo.promoType,
    oldPrice: promo.oldPrice,
    newPrice: promo.newPrice,
    showPrice: promo.showPrice,
  }));

  // Map brochure promotions to ensure category exists
  const brochureItems: BrochureShareItem[] = brochurePromotions.map((promo) => ({
    ...promo,
    category: promo.promoType === "custom" ? undefined : (promo.category || "Брошура"),
  }));

  // Combine weekly, monthly, and brochure promotions into one list, deduplicating by ID
  const seenIds = new Set<string>();
  const allPromotions: BrochureShareItem[] = [];

  for (const item of [...weeklyItems, ...monthlyItems, ...brochureItems]) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      allPromotions.push(item);
    }
  }

  if (allPromotions.length === 0) return null;

  return (
    <section className="section-tight rule">
      <div className="container">
        <div className="indexed-head-compact">
          <div className="eyebrow">01 / Актуално</div>
          <h2>Промоции и оферти</h2>
          <p className="lead">
            Седмични, месечни и актуални предложения за този обект.
          </p>
        </div>

        <div className={`promo-grid ${allPromotions.length < 3 ? `promo-grid-cols-${allPromotions.length}` : ""}`}>
          {allPromotions.map((item, index) => (
            <motion.article
              key={item.id}
              className="promo-card"
              style={{ "--card-color": item.accentColor } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <div className="promo-top" />
              <div className="promo-image relative overflow-hidden flex items-center justify-center">
                <PromoImage item={item} />
              </div>
              <div className="promo-content">
                <div className="flex items-center justify-between gap-2 flex-wrap" style={{ marginBottom: "6px" }}>
                  {item.category && <span className="promo-badge">{item.category}</span>}
                  {item.showPrice !== "hide" && (item.newPrice || item.oldPrice) ? (
                    <div className="price-container flex items-center gap-1.5 font-bold">
                      {item.oldPrice && <span className="old-price line-through text-xs text-neutral-400 font-medium">{item.oldPrice}</span>}
                      {item.newPrice && <span className="price font-black text-red-600">{item.newPrice}</span>}
                    </div>
                  ) : (
                    item.label && <span className="price">{item.label}</span>
                  )}
                </div>
                <h3 className="line-clamp-2">{item.title}</h3>
                {item.description && <p className="line-clamp-2">{item.description}</p>}
                
                <div className="promo-card-footer">
                  <span className="promo-card-date">
                    {item.validFrom && item.validTo ? `${item.validFrom} – ${item.validTo}` : "Актуална оферта"}
                  </span>
                  <BrochureShareButton item={item} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
