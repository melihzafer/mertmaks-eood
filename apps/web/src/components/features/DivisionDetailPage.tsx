import type { CSSProperties } from "react";
import type { DivisionPageModel } from "@/lib/cms/divisions";
import type { StoreCommerceModel } from "@/lib/cms/store-commerce";
import type { DivisionOfferings } from "@/data/offerings";
import type { WeeklyPromotion } from "@/data/weekly-promotions";
import type { MonthlyPromotion } from "@/data/monthly-promotions";
import type { StoreArticle } from "@/data/blog";
import { FAQSection } from "@/components/features/FAQSection";
import { StoreInfo } from "@/components/features/StoreInfo";
import { OfferingsSection } from "@/components/features/OfferingsSection";
import { UnifiedPromotionsSection } from "@/components/features/UnifiedPromotionsSection";
import { StoreBlogSection } from "@/components/features/StoreBlogSection";
import { NewsletterSubscribe } from "@/components/features/NewsletterSubscribe";
import SingleStoreMapClient from "@/components/features/SingleStoreMapClient";

type AccentStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--diagonal-color"?: string;
};

interface DivisionDetailPageProps {
  page: DivisionPageModel;
  commerce?: StoreCommerceModel;
  offerings?: DivisionOfferings;
  weeklyPromotions?: WeeklyPromotion[];
  monthlyPromotions?: MonthlyPromotion[];
  articles?: StoreArticle[];
}

export function DivisionDetailPage({
  page,
  commerce,
  offerings,
  weeklyPromotions = [],
  monthlyPromotions = [],
  articles = [],
}: DivisionDetailPageProps) {
  const style = {
    "--theme-accent": page.accent,
    "--diagonal-color": "diagonal" in page ? page.diagonal : page.accent,
  } as AccentStyle;

  return (
    <main style={style}>
      <section className="division-hero">
        {"diagonal" in page && <div className="diagonal" />}
        <div className="container">
          <div className="eyebrow" style={{ color: "white" }}>
            {page.heroIndex}
          </div>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
      </section>

      <UnifiedPromotionsSection
        weeklyPromotions={weeklyPromotions}
        monthlyPromotions={monthlyPromotions}
        brochurePromotions={commerce?.promotions ?? []}
        brochureProducts={commerce?.products ?? []}
        accentColor={page.accent}
      />

      <section className="section">
        <div className="container">
          {"intro" in page && page.intro && (
            <div className="indexed-head-compact">
              <div className="eyebrow">{page.intro.index} / {page.intro.eyebrow}</div>
              <h2>{page.intro.title}</h2>
            </div>
          )}

          <div className="bento">
            {page.cards.map((card) => (
              <article
                key={card.title}
                className={`bento-card ${"wide" in card && card.wide ? "wide" : ""}`}
              >
                <div className="icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <ul className="item-list">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {offerings && <OfferingsSection offerings={offerings} />}

      {commerce && (
        <section className="section-tight rule">
          <div className="container">
            <div className="store-commerce-grid">
              <div className="store-commerce-left">
                <div className="indexed-head-compact" style={{ marginBottom: "24px" }}>
                  <div className="eyebrow">Контакт и работно време</div>
                  <h2>Проверете обекта преди посещение.</h2>
                  <p className="lead">
                    Телефонът, адресът и часовете са отделни за всеки магазин и могат да се
                    обновяват от Sanity.
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
      )}

      <StoreBlogSection articles={articles} accentColor={page.accent} />

      {commerce && <FAQSection faqs={commerce.faqs} />}

      <NewsletterSubscribe accentColor={page.accent} />

      <section className="feature-strip">
        <div className="features">
          {page.features.map((feature) => (
            <div className="feature" key={feature.index}>
              <b>{feature.index}</b>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
