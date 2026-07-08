import type { BrochureShareItem } from "@/lib/brochure";
import { OffersGrid } from "@/components/features/OffersGrid";

interface StorePromotionsProductsProps {
  title?: string;
  description?: string;
  promotions: BrochureShareItem[];
  products?: BrochureShareItem[];
}

export function StorePromotionsProducts({
  title = "Промоции и оферти",
  description = "Актуални предложения и препоръчани артикули за този обект.",
  promotions,
  products = [],
}: StorePromotionsProductsProps) {
  if (promotions.length === 0 && products.length === 0) return null;

  return (
    <section className="section-tight">
      <div className="container">
        <div className="indexed-head-compact">
          <div className="eyebrow">02 / Актуално</div>
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>

        <OffersGrid promotions={promotions} products={products} productsLabel="Меню и услуги" />
      </div>
    </section>
  );
}
