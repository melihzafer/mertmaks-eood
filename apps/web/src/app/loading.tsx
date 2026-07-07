import type { CSSProperties } from "react";
import { accents } from "@/data/redesign-content";

export default function Loading() {
  return (
    <main style={{ "--theme-accent": accents.supermarket } as CSSProperties}>
      {/* Hero Skeleton */}
      <section className="hero-home" style={{ borderBottom: "none" }}>
        <div className="hero-copy" style={{ gap: 20 }}>
          <div
            style={{
              width: 120,
              height: 14,
              borderRadius: 999,
              background: "var(--ui-border)",
            }}
          />
          <div
            style={{
              width: "80%",
              height: 60,
              borderRadius: 12,
              background: "var(--ui-border)",
            }}
          />
          <div
            style={{
              width: "55%",
              height: 22,
              borderRadius: 8,
              background: "var(--ui-border)",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 8,
            }}
          >
            <div
              style={{
                width: 140,
                height: 48,
                borderRadius: 999,
                background: "var(--ui-border)",
              }}
            />
            <div
              style={{
                width: 180,
                height: 48,
                borderRadius: 999,
                background: "var(--ui-border)",
              }}
            />
          </div>
        </div>
        <div
          className="division-stripes"
          style={{ borderLeft: "none", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "none" }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                minHeight: 140,
                borderBottom: "1px solid var(--ui-border)",
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Band Skeleton */}
      <section className="stats-band" style={{ opacity: 0.5 }}>
        <div className="stats">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat">
              <div
                style={{
                  width: "60%",
                  height: 48,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.12)",
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
