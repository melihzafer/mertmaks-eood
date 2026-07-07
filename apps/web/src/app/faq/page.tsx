import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { FAQSection } from "@/components/features/FAQSection";
import { getFaqItems } from "@/lib/cms/store-commerce";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { accents } from "@/data/redesign-content";

export function generateMetadata(): Metadata {
  return buildMetadata({
    path: "/faq",
    fallbackTitle: "Често задавани въпроси",
    fallbackDescription:
      "Отговори за работно време, телефони, промоции, споделяне и поръчки в МЕРТМАКС.",
  });
}

export default async function FAQPage() {
  const faqs = await getFaqItems();

  return (
    <main
      style={{ "--theme-accent": accents.supermarketAccent } as CSSProperties}
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageJsonLd(faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))),
          ),
        }}
      />
      <section className="division-hero">
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--surface)" }}>
            ЧЗВ
          </div>
          <h1 style={{ color: "var(--surface)" }}>Често задавани въпроси</h1>
          <p style={{ color: "var(--surface)" }}>
            Отговори за работно време, телефони, промоции, споделяне и поръчки.
          </p>
        </div>
      </section>

      <FAQSection
        faqs={faqs}
        title="Въпроси от клиентите"
        description="Съдържанието идва от Sanity, а при липса на връзка се използват локалните начални стойности."
      />
    </main>
  );
}
