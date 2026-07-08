"use client";

import type { WeeklyPromotion } from "@/data/weekly-promotions";
import type { MonthlyPromotion } from "@/data/monthly-promotions";
import type { BrochureShareItem } from "@/lib/brochure";
import { OffersGrid } from "@/components/features/OffersGrid";

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
  brochureProducts,
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

  if (allPromotions.length === 0 && brochureProducts.length === 0) return null;

  return (
    <section id="promotions" className="section-tight rule">
      <div className="container">
        <div className="indexed-head-compact">
          <div className="eyebrow">01 / Актуално</div>
          <h2>Промоции и продукти</h2>
          <p className="lead">Актуални предложения, продукти и услуги за този обект.</p>
        </div>

        <OffersGrid promotions={allPromotions} products={brochureProducts} />
      </div>
    </section>
  );
}
