import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { FAQSection } from "@/components/features/FAQSection";
import { StoreInfo } from "@/components/features/StoreInfo";
import { StorePromotionsProducts } from "@/components/features/StorePromotionsProducts";
import { getRestaurantPageModel } from "@/lib/cms/restaurant";
import { getStoreCommerceModel } from "@/lib/cms/store-commerce";
import SingleStoreMapClient from "@/components/features/SingleStoreMapClient";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";

type CardColorStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--card-color"?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const restaurantPage = await getRestaurantPageModel();

  return buildMetadata({
    path: "/restaurant",
    seo: restaurantPage.seo,
    fallbackTitle: restaurantPage.title || "Ресторант Делиорман",
    fallbackDescription:
      restaurantPage.description ||
      "Ресторант Делиорман в Самуил - меню, резервации и работно време.",
  });
}

export default async function RestaurantPage() {
  const [restaurantPage, commerce] = await Promise.all([
    getRestaurantPageModel(),
    getStoreCommerceModel("restaurant"),
  ]);
  const actionLinks = [
    { href: restaurantPage.menuUrl, label: "Вижте меню" },
    { href: restaurantPage.reservationUrl, label: "Резервация" },
    { href: restaurantPage.sourceUrl, label: "Официален сайт" },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href));
  const restaurantStore = {
    ...commerce.store,
    address: restaurantPage.address ?? commerce.store.address,
    phone: restaurantPage.phone ?? commerce.store.phone,
    email: restaurantPage.email ?? commerce.store.email,
  };

  return (
    <main style={{ "--theme-accent": restaurantPage.accent } as CardColorStyle}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(restaurantStore, "/restaurant")),
        }}
      />
      <section className="division-hero">
        {restaurantPage.image && (
          <div
            className="division-hero-image"
            style={{ backgroundImage: `url(${restaurantPage.image})` }}
          />
        )}
        <div className="container">
          <div className="eyebrow" style={{ color: "#F7F5F2" }}>
            {restaurantPage.heroIndex}
          </div>
          <h1 style={{ color: "#F7F5F2" }}>{restaurantPage.title}</h1>
          <p style={{ color: "#F7F5F2" }}>{restaurantPage.description}</p>
          {actionLinks.length > 0 && (
            <div className="cluster">
              {actionLinks.map((link, index) => (
                <a
                  key={link.href}
                  className={index === 0 ? "btn primary" : "btn"}
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
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
                  {restaurantPage.about ??
                    "Телефонът и часовете са видими тук, а собственикът може да ги променя директно от Sanity."}
                </p>
              </div>
              <div className="leaflet-frame" style={{ height: "450px", minHeight: "400px" }}>
                <SingleStoreMapClient stores={[restaurantStore]} height="100%" />
              </div>
            </div>
            <StoreInfo store={restaurantStore} />
          </div>
        </div>
      </section>

      {restaurantPage.gallery.length > 0 && (
        <section className="section-tight">
          <div className="container">
            <div className="indexed-head-compact">
              <div className="eyebrow">Галерия</div>
              <h2>Актуални снимки от ресторанта.</h2>
            </div>
            <div className="promo-grid">
              {restaurantPage.gallery.map((image) => (
                <article key={image.url} className="promo-card">
                  <div className="promo-image relative overflow-hidden flex items-center justify-center">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      style={{
                        objectFit: "cover",
                        borderRadius: "inherit",
                      }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

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
