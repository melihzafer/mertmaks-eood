import type { CSSProperties } from "react";
import type { DivisionPageKey } from "@/data/redesign-content";
import { divisionPages } from "@/data/redesign-content";

type AccentStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--diagonal-color"?: string;
};

interface DivisionDetailPageProps {
  pageKey: DivisionPageKey;
}

export function DivisionDetailPage({ pageKey }: DivisionDetailPageProps) {
  const page = divisionPages[pageKey];
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

      <section className="section">
        <div className="container">
          {"intro" in page && page.intro && (
            <div className="indexed-head">
              <div className="big-index">{page.intro.index}</div>
              <div>
                <div className="eyebrow">{page.intro.eyebrow}</div>
                <h2>{page.intro.title}</h2>
              </div>
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
