import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { accents, aboutPage } from "@/data/redesign-content";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

type CardColorStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--card-color"?: string;
};

export function generateMetadata(): Metadata {
  return buildMetadata({
    path: "/about",
    fallbackTitle: aboutPage.title || "За нас — МЕРТМАКС",
    fallbackDescription:
      aboutPage.lead ||
      "Историята на МЕРТМАКС в село Самуил — от малък семеен магазин до три обекта под един покрив.",
  });
}

export default function AboutPage() {
  return (
    <main
      style={{ "--theme-accent": accents.supermarketAccent } as CardColorStyle}
    >
      {/* ── Hero ── */}
      <section className="section timeline-wrap">
        <div className="year-bg">2005</div>
        <div
          className="container stack"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="eyebrow">{aboutPage.eyebrow}</div>
          <h1>{aboutPage.title}</h1>
          <p className="lead" style={{ maxWidth: "820px" }}>
            {aboutPage.lead}
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-band">
        <div className="stats">
          {aboutPage.stats.map((stat) => (
            <div key={stat.label} className="stat">
              <b>
                {stat.value}
                {stat.suffix}
              </b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Нашата история (timeline) ── */}
      <section className="section">
        <div className="container stack">
          <div className="indexed-head-compact" style={{ maxWidth: "680px" }}>
            <div
              className="eyebrow"
              style={
                {
                  "--accent-on-bg": `color-mix(in srgb, ${accents.supermarketAccent} 45%, #111111)`,
                } as CSSProperties
              }
            >
              НАШАТА ИСТОРИЯ
            </div>
            <h2>Пътят от 2005 до днес.</h2>
            <p
              className="lead"
              style={{
                fontSize: "clamp(16px, 1.3vw, 19px)",
                color: "var(--body)",
              }}
            >
              От малък семеен магазин до четири обекта, които работят за хората в
              Самуил всеки ден.
            </p>
          </div>

          <div className="timeline" style={{ marginTop: "32px" }}>
            {aboutPage.events.map((event) => (
              <article
                key={event.title}
                className="event"
                style={{ "--card-color": event.color } as CardColorStyle}
              >
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ценности ── */}
      <section
        className="section"
        style={{ background: "var(--surface-soft)" }}
      >
        <div className="container">
          <div className="indexed-head-compact">
            <div className="eyebrow">ЦЕННОСТИ</div>
            <h2>Как работим всеки ден.</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "var(--grid-gap)",
              marginTop: "var(--block-gap)",
            }}
          >
            {aboutPage.values.map((value) => (
              <article
                key={value.title}
                className="bento-card"
                style={
                  {
                    "--accent-solid": accents.supermarketAccent,
                    "--accent-on-bg": `color-mix(in srgb, ${accents.supermarketAccent} 45%, #111111)`,
                    "--accent-soft": `color-mix(in srgb, ${accents.supermarketAccent} 11%, var(--surface))`,
                    minHeight: "auto",
                  } as CardColorStyle
                }
              >
                <div className="icon" style={{ width: 44, height: 44 }}>
                  <span style={{ fontSize: 22, lineHeight: 1 }}>
                    {value.icon}
                  </span>
                </div>
                <h3
                  style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
                >
                  {value.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                  {value.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="section-tight">
        <div className="container">
          <div className="quote">{aboutPage.quote}</div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="section"
        style={{
          background: "var(--fg)",
          color: "var(--surface)",
        }}
      >
        <div
          className="container stack"
          style={{ gap: "28px", maxWidth: "680px" }}
        >
          <div className="eyebrow" style={{ color: "var(--subtle-on-dark)" }}>
            СВЪРЖЕТЕ СЕ С НАС
          </div>
          <h2
            style={{
              color: "var(--surface)",
              fontSize: "clamp(34px, 5vw, 64px)",
            }}
          >
            Елате на място или ни пишете.
          </h2>
          <p style={{ color: "var(--muted-on-dark)" }}>
            Четирите ни обекта са в центъра на Самуил, на няколко минути един от
            друг. Ще ви посрещнем всеки ден от седмицата.
          </p>
          <div className="cluster">
            <Link href="/contact" className="btn color">
              Намерете ни
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/faq"
              className="btn"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "var(--surface)",
              }}
            >
              Често задавани въпроси
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
