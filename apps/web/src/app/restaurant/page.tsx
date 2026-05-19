import type { CSSProperties } from "react";
import { accents } from "@/data/redesign-content";
import { getRestaurantPageModel } from "@/lib/cms/restaurant";

type CardColorStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--card-color"?: string;
};

export default async function RestaurantPage() {
  const restaurantPage = await getRestaurantPageModel();

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
          <div className="indexed-head">
            <div className="big-index">04</div>
            <div>
              <div className="eyebrow">Меню акценти</div>
              <h2>Познати вкусове, поднесени спокойно.</h2>
            </div>
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
        <div className="container grid-12">
          <div style={{ gridColumn: "span 5" }}>
            <h2>Работно време</h2>
            <p className="lead">
              Всеки ден, с удобно обслужване за местни гости и пътуващи.
            </p>
          </div>
          <div className="store-list" style={{ gridColumn: "span 7" }}>
            <div
              className="store-card"
              style={{ "--card-color": accents.restaurant } as CardColorStyle}
            >
              <h3>Делиорман</h3>
              <p>с. Самуил, до магазините МЕРТМАКС</p>
              <p>
                <b>Понеделник - Неделя:</b> текущо работно време на място
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
