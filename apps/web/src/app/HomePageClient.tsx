"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";
import { accents } from "@/data/redesign-content";
import type { HomePageModel } from "@/lib/cms/home";
import { BrochureShareButton } from "@/components/features/brochure-sharing/BrochureShareButton";

type CardColorStyle = CSSProperties & {
  "--card-color"?: string;
  "--shape"?: string;
  background?: string;
};

interface HomePageClientProps {
  homePage: HomePageModel;
}

export function HomePageClient({ homePage }: HomePageClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const visiblePromotions =
    activeFilter === "all"
      ? homePage.promotions
      : homePage.promotions.filter((promo) => promo.category === activeFilter);

  return (
    <main style={{ "--theme-accent": accents.supermarket } as CSSProperties}>
      <section className="hero-home">
        <div className="hero-copy fade-up visible">
          <div className="eyebrow">{homePage.hero.eyebrow}</div>
          <h1>{homePage.hero.title}</h1>
          <p className="lead">{homePage.hero.lead}</p>
          <div className="cluster">
            <Link
              className="btn primary"
              href={homePage.hero.primaryCta.href}
              data-wipe
              data-color={accents.supermarket}
            >
              {homePage.hero.primaryCta.label}
            </Link>
            <Link className="btn" href={homePage.hero.secondaryCta.href}>
              {homePage.hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="division-stripes">
          {homePage.stripes.map((stripe) => (
            <Link
              key={stripe.href}
              className="stripe"
              href={stripe.href}
              data-wipe
              data-color={stripe.color}
              data-index={stripe.index}
              style={{ "--card-color": stripe.color } as CardColorStyle}
            >
              <strong>{stripe.title}</strong>
              <span>{stripe.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="stats-band">
        <div className="stats">
          {homePage.stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <b data-count={stat.value} data-suffix={stat.suffix}>
                {`${stat.value}${stat.suffix}`}
              </b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="stores">
        <div className="container">
          <div className="indexed-head">
            <div className="big-index">01</div>
            <div>
              <div className="eyebrow">Нашите магазини</div>
              <h2>Четири силни посоки. Едно местно име.</h2>
            </div>
          </div>

          <div className="division-grid">
            {homePage.divisions.map((division) => (
              <Link
                key={division.href}
                className="division-card fade-up visible"
                href={division.href}
                data-wipe
                data-color={division.color}
                style={{ "--card-color": division.color } as CardColorStyle}
              >
                <div className="visual">
                  <span>{division.visual}</span>
                </div>
                <div className="card-body">
                  <div className="num">{division.index}</div>
                  <h3>{division.title}</h3>
                  <p>{division.description}</p>
                  <b>Разгледай →</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {homePage.promotions.length > 0 && (
        <section className="section-tight">
          <div className="container">
            <div className="promo-toolbar">
              <div>
                <div className="eyebrow">Live promotions</div>
                <h2>Акценти тази седмица</h2>
              </div>
              <div className="filter-row" data-filter-group>
                {[
                  ["all", "Всички"],
                  ["food", "Храни"],
                  ["tools", "Инструменти"],
                  ["home", "Дом"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    className={`filter ${activeFilter === value ? "active" : ""}`}
                    type="button"
                    data-filter={value}
                    onClick={() => setActiveFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="promo-grid">
              {visiblePromotions.map((promo) => (
                <article
                  key={promo.title}
                  className="promo-card"
                  data-category={promo.category}
                  style={{ "--card-color": promo.color } as CardColorStyle}
                >
                  <div className="promo-top" />
                  <div className="promo-image relative overflow-hidden flex items-center justify-center">
                    {promo.imageUrl ? (
                      <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "inherit",
                        }}
                      />
                    ) : (
                      promo.visual
                    )}
                  </div>
                  <div className="promo-content">
                    {promo.showPrice !== "hide" && (promo.newPrice || promo.oldPrice) ? (
                      <div className="price-container flex items-center gap-1.5 font-bold mb-2">
                        {promo.oldPrice && <span className="old-price line-through text-xs text-neutral-400 font-medium">{promo.oldPrice}</span>}
                        {promo.newPrice && <span className="price font-black text-red-600">{promo.newPrice}</span>}
                      </div>
                    ) : (
                      promo.label && <span className="price">{promo.label}</span>
                    )}
                    <h3>{promo.title}</h3>
                    <p>{promo.description}</p>
                    <BrochureShareButton item={promo} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-dark section">
        <div className="cta-box">
          <div className="stack">
            <div className="eyebrow">{homePage.cta.eyebrow}</div>
            <h2>{homePage.cta.title}</h2>
            <p>{homePage.cta.description}</p>
          </div>
          <div className="shape-stack">
            {homePage.cta.cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="shape-card"
                data-wipe
                data-color={card.color}
                style={{ "--shape": card.color, "--card-color": card.color } as CardColorStyle}
              >
                <span className="shape-card-label">{card.label}</span>
                <span className="shape-card-meta">{card.meta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
