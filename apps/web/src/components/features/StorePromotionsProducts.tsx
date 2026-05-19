import type { CSSProperties } from "react";
import type { BrochureShareItem } from "@/lib/brochure";
import { BrochureShareButton } from "@/components/features/brochure-sharing/BrochureShareButton";

type CardColorStyle = CSSProperties & {
  "--card-color"?: string;
};

interface StorePromotionsProductsProps {
  title?: string;
  description?: string;
  promotions: BrochureShareItem[];
  products: BrochureShareItem[];
}

export function StorePromotionsProducts({
  title = "Промоции и продукти",
  description = "Актуални предложения и препоръчани артикули за този обект.",
  promotions,
  products,
}: StorePromotionsProductsProps) {
  const items = [...promotions, ...products];

  if (items.length === 0) return null;

  return (
    <section className="section-tight">
      <div className="container">
        <div className="indexed-head">
          <div className="big-index">05</div>
          <div>
            <div className="eyebrow">Актуално</div>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
          </div>
        </div>

        <div className="promo-grid">
          {items.map((item) => (
            <article
              key={`${item.kind}-${item.id}`}
              className="promo-card"
              style={{ "--card-color": item.accentColor } as CardColorStyle}
            >
              <div className="promo-top" />
              <div className="promo-image">{item.category ?? item.storeName ?? "MERTMAX"}</div>
              <div className="promo-content">
                {item.label && <span className="price">{item.label}</span>}
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                <BrochureShareButton item={item} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
