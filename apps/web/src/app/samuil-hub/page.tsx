import type { CSSProperties } from "react";
import { accents, samuilHubPage } from "@/data/redesign-content";

type CardColorStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--card-color"?: string;
};

export default function SamuilHubPage() {
  return (
    <main
      style={{ "--theme-accent": accents.supermarketAccent } as CardColorStyle}
    >
      <section className="section timeline-wrap">
        <div className="year-bg">2005</div>
        <div
          className="container stack"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="eyebrow">{samuilHubPage.eyebrow}</div>
          <h1>{samuilHubPage.title}</h1>
          <p className="lead">{samuilHubPage.lead}</p>
          <div className="timeline">
            {samuilHubPage.events.map((event) => (
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

      <section className="section-tight">
        <div className="container">
          <div className="quote">{samuilHubPage.quote}</div>
        </div>
      </section>
    </main>
  );
}
