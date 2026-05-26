import type { CSSProperties } from "react";
import { FAQSection } from "@/components/features/FAQSection";
import { StoreInfo } from "@/components/features/StoreInfo";
import { StorePromotionsProducts } from "@/components/features/StorePromotionsProducts";
import { getRestaurantPageModel } from "@/lib/cms/restaurant";
import { getStoreCommerceModel } from "@/lib/cms/store-commerce";
import SingleStoreMapClient from "@/components/features/SingleStoreMapClient";

type CardColorStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--card-color"?: string;
};

export default async function RestaurantPage() {
  const [restaurantPage, commerce] = await Promise.all([
    getRestaurantPageModel(),
    getStoreCommerceModel("restaurant"),
  ]);

  return (
    <main style={{ "--theme-accent": restaurantPage.accent } as CardColorStyle}>
      <section className="division-hero">
        <div className="container">
          <div className="eyebrow" style={{ color: "#F7F5F2" }}>
            {restaurantPage.heroIndex}
          </div>
          <h1 style={{ color: "#F7F5F2" }}>{restaurantPage.title}</h1>
          <p style={{ color: "#F7F5F2" }}>{restaurantPage.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="indexed-head-compact">
            <div className="eyebrow">01 / Меню акценти</div>
            <h2>Познати вкусове, поднесени спокойно.</h2>
          </div>

          <div className="promo-grid">
            {restaurantPage.promos.map((promo) => (
              <article
                key={promo.title}
                className="promo-card"
                style={{ "--card-color": promo.color } as CardColorStyle}
              >
                <div className="promo-top" />
                <div className="promo-image">{promo.visual}</div>
                <div className="promo-content">
                  <h3>{promo.title}</h3>
                  <p>{promo.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight rule">
        <div className="container">
          <div className="store-commerce-grid">
            <div className="store-commerce-left">
              <div className="indexed-head-compact" style={{ marginBottom: "24px" }}>
                <div className="eyebrow">Контакт и работно време</div>
                <h2>Проверете Делиорман преди посещение.</h2>
                <p className="lead">
                  Телефонът и часовете са видими тук, а собственикът може да ги променя
                  директно от Sanity.
                </p>
              </div>
              <div className="leaflet-frame" style={{ height: "450px", minHeight: "400px" }}>
                <SingleStoreMapClient stores={[commerce.store]} height="100%" />
              </div>
            </div>
            <StoreInfo store={commerce.store} />
          </div>
        </div>
      </section>

      <StorePromotionsProducts
        title="Меню предложения и услуги"
        description="Актуални предложения от ресторанта, готови за споделяне като брошура."
        promotions={commerce.promotions}
        products={commerce.products}
      />

      <FAQSection faqs={commerce.faqs} />
    </main>
  );
}
