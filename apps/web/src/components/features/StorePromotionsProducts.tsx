"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Percent } from "lucide-react";
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
        {item.category ?? item.storeName ?? "MERTMAX"}
      </span>
    </div>
  );
}

type CardColorStyle = CSSProperties & {
  "--card-color"?: string;
};

interface StorePromotionsProductsProps {
  title?: string;
  description?: string;
  promotions: BrochureShareItem[];
  products?: BrochureShareItem[]; // Ignored/excluded per user request
}

export function StorePromotionsProducts({
  title = "Промоции и оферти",
  description = "Актуални предложения и препоръчани артикули за този обект.",
  promotions,
}: StorePromotionsProductsProps) {
  if (promotions.length === 0) return null;

  return (
    <section className="section-tight">
      <div className="container">
        <div className="indexed-head-compact">
          <div className="eyebrow">02 / Актуално</div>
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>

        <div className={`promo-grid ${promotions.length < 3 ? `promo-grid-cols-${promotions.length}` : ""}`}>
          {promotions.map((item) => (
            <article
              key={`${item.kind}-${item.id}`}
              className="promo-card"
              style={{ "--card-color": item.accentColor } as CardColorStyle}
            >
              <div className="promo-top" />
              <div className="promo-image relative overflow-hidden flex items-center justify-center">
                <PromoImage item={item} />
              </div>
              <div className="promo-content">
                <div className="flex items-center justify-between gap-2 flex-wrap" style={{ marginBottom: "6px" }}>
                  {item.category && <span className="promo-badge">{item.category}</span>}
                  {item.label && <span className="price">{item.label}</span>}
                </div>
                <h3>{item.title}</h3>
                {item.description && <p className="line-clamp-2">{item.description}</p>}
                
                <div className="promo-card-footer">
                  <span className="promo-card-date">
                    {item.validFrom && item.validTo ? `${item.validFrom} – ${item.validTo}` : "Актуална оферта"}
                  </span>
                  <BrochureShareButton item={item} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
