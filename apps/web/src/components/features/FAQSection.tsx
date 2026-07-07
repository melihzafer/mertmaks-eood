"use client";

import type { FAQItem } from "@/lib/cms/store-commerce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
}

export function FAQSection({
  faqs,
  title = "Често задавани въпроси",
  description = "Кратки отговори за посещение, промоции, контакти и поръчки.",
}: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="section-tight rule">
      <div className="container faq-layout">
        <div>
          <div className="eyebrow">ЧЗВ</div>
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>

        <Accordion className="faq-list" type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem className="faq-item" key={faq.id} value={faq.id}>
              <AccordionTrigger className="faq-question">
                <span>
                  {faq.category && <small>{faq.category}</small>}
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="faq-answer">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
