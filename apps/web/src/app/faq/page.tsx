import { FAQSection } from "@/components/features/FAQSection";
import { getFaqItems } from "@/lib/cms/store-commerce";

export default async function FAQPage() {
  const faqs = await getFaqItems();

  return (
    <main>
      <section className="division-hero">
        <div className="container">
          <div className="eyebrow" style={{ color: "#F7F5F2" }}>
            FAQ
          </div>
          <h1 style={{ color: "#F7F5F2" }}>Често задавани въпроси</h1>
          <p style={{ color: "#F7F5F2" }}>
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
