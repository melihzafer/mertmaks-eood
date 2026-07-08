"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Percent } from "lucide-react";
import type { BrochureShareItem } from "@/lib/brochure";
import { BrochureShareButton } from "@/components/features/brochure-sharing/BrochureShareButton";

type CardColorStyle = CSSProperties & {
  "--card-color"?: string;
};

function OfferImage({ item }: { item: BrochureShareItem }) {
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
      <span
        style={{
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg)",
          textAlign: "center",
          paddingInline: "12px",
        }}
      >
        {item.category ?? item.storeName ?? "MERTMAX"}
      </span>
    </div>
  );
}

function OfferCard({ item, index }: { item: BrochureShareItem; index: number }) {
  return (
    <motion.article
      className="promo-card"
      style={{ "--card-color": item.accentColor } as CardColorStyle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <div className="promo-top" />
      <div className="promo-image relative overflow-hidden flex items-center justify-center">
        <OfferImage item={item} />
      </div>
      <div className="promo-content">
        <div className="flex items-center justify-between gap-2 flex-wrap" style={{ marginBottom: "6px" }}>
          {item.category && <span className="promo-badge">{item.category}</span>}
          {item.showPrice !== "hide" && (item.newPrice || item.oldPrice) ? (
            <div className="price-container flex items-center gap-1.5 font-bold">
              {item.oldPrice && (
                <span className="old-price line-through text-xs text-neutral-400 font-medium">
                  {item.oldPrice}
                </span>
              )}
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
            {item.validFrom && item.validTo
              ? `${item.validFrom} – ${item.validTo}`
              : item.kind === "product"
                ? "В наличност"
                : "Актуална оферта"}
          </span>
          <BrochureShareButton item={item} />
        </div>
      </div>
    </motion.article>
  );
}

type OfferTab = "promotions" | "products";

interface OffersGridProps {
  promotions: BrochureShareItem[];
  products: BrochureShareItem[];
  promotionsLabel?: string;
  productsLabel?: string;
}

export function OffersGrid({
  promotions,
  products,
  promotionsLabel = "Промоции",
  productsLabel = "Продукти",
}: OffersGridProps) {
  const hasPromotions = promotions.length > 0;
  const hasProducts = products.length > 0;
  const [tab, setTab] = useState<OfferTab>(hasPromotions ? "promotions" : "products");

  if (!hasPromotions && !hasProducts) return null;

  const showTabs = hasPromotions && hasProducts;
  const activeItems = !showTabs ? (hasPromotions ? promotions : products) : tab === "promotions" ? promotions : products;

  return (
    <>
      {showTabs && (
        <div className="filter-row offer-tabs" role="tablist" aria-label={`${promotionsLabel} / ${productsLabel}`}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "promotions"}
            className={`filter ${tab === "promotions" ? "active" : ""}`}
            onClick={() => setTab("promotions")}
          >
            {promotionsLabel} · {promotions.length}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "products"}
            className={`filter ${tab === "products" ? "active" : ""}`}
            onClick={() => setTab("products")}
          >
            {productsLabel} · {products.length}
          </button>
        </div>
      )}

      <div className={`promo-grid ${activeItems.length < 3 ? `promo-grid-cols-${activeItems.length}` : ""}`}>
        {activeItems.map((item, index) => (
          <OfferCard key={`${item.kind}-${item.id}`} item={item} index={index} />
        ))}
      </div>
    </>
  );
}
