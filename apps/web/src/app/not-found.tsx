import type { CSSProperties } from "react";
import Link from "next/link";
import { accents } from "@/data/redesign-content";

export default function NotFound() {
  return (
    <main
      className="page"
      style={
        {
          "--theme-accent": accents.supermarket,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60dvh",
          padding: "var(--gutter)",
          textAlign: "center",
        } as CSSProperties
      }
    >
      <div
        className="stack"
        style={{
          maxWidth: 520,
          alignItems: "center",
          gap: 28,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(80px, 18vw, 160px)",
              lineHeight: 0.8,
              letterSpacing: "-0.06em",
              color: "var(--accent-on-bg)",
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              marginTop: 8,
            }}
          >
            Страницата не е намерена
          </h1>
          <p className="lead" style={{ maxWidth: 420, margin: "12px auto 0" }}>
            Съжаляваме, но страницата, която търсите, не съществува или е била
            преместена.
          </p>
        </div>

        <div className="cluster" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn primary" data-wipe data-color={accents.supermarket}>
            Към Началото
          </Link>
          <Link href="/contact" className="btn" data-wipe data-color={accents.supermarket}>
            Свържете се с нас
          </Link>
        </div>
      </div>
    </main>
  );
}
