"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { accents } from "@/data/redesign-content";
import type { Store } from "@/lib/stores";
import type { ContactPageModel } from "@/lib/cms/contact";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Името трябва да е поне 2 символа"),
  email: z.string().trim().email("Моля, въведете валиден имейл адрес"),
  phone: z
    .string()
    .trim()
    .min(6, "Телефонът трябва да е поне 6 цифри")
    .regex(
      /^[0-9+\s()/-]+$/,
      "Моля, въведете валиден телефонен номер",
    ),
  topic: z.string().trim().min(1, "Моля, изберете тема"),
  message: z
    .string()
    .trim()
    .min(10, "Съобщението трябва да е поне 10 символа"),
});

const LeafletMap = dynamic(() => import("@/components/features/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="leaflet-loading" aria-hidden="true">
      Зареждане на картата…
    </div>
  ),
});

type CardColorStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--card-color"?: string;
};

type FormField = "name" | "email" | "phone" | "topic" | "message";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
};

interface ContactPageClientProps extends ContactPageModel {
  stores: Store[];
}

export function ContactPageClient({
  brand,
  contactPage,
  mapTitle,
  mapDescription,
  stores,
}: ContactPageClientProps) {
  const [form, setForm] = useState(initialForm);
  const [invalidField, setInvalidField] = useState<FormField | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: FormField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (invalidField === field) setInvalidField(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const firstError = result.error.errors[0];
      const field = firstError.path[0] as FormField;
      setInvalidField(field);
      setMessage(firstError.message);
      document.getElementById(field)?.focus();
      return;
    }

    setInvalidField(null);
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Възникна грешка.");
      }

      setMessage(payload.message || "Съобщението е изпратено успешно.");
      setForm(initialForm);
      window.setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Възникна грешка. Моля, опитайте отново.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="page contact-page"
      style={{ "--theme-accent": accents.supermarket } as CardColorStyle}
    >
      <section className="contact-hero section-tight">
        <div className="container contact-hero-grid">
          <div className="stack fade-up visible">
            <div className="eyebrow">{contactPage.hero.eyebrow}</div>
            <h1>{contactPage.hero.title}</h1>
            <p className="lead">{contactPage.hero.lead}</p>
            <div className="contact-actions">
              <a className="btn primary" href="tel:+359000000000">
                Обадете се
              </a>
              <a className="btn" href="#contactForm">
                Изпратете запитване
              </a>
            </div>
          </div>

          <aside
            className="visit-card fade-up visible"
            aria-label="Бърза информация"
          >
            <div>
              <span>Днес</span>
              <strong>Отворено</strong>
            </div>
            <dl className="visit-card-details">
              <div>
                <dt>Адрес</dt>
                <dd>{brand.location}</dd>
              </div>
              <div>
                <dt>Работно време</dt>
                <dd>{brand.hours}</dd>
              </div>
            </dl>
            <div className="mini-rules">
              {[
                accents.supermarket,
                accents.industrial,
                accents.construction,
                accents.restaurant,
              ].map((color) => (
                <i
                  key={color}
                  style={{ "--card-color": color } as CardColorStyle}
                />
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-tight">
        <div className="container contact-mobile-flow">
          <section
            className="contact-panel map-panel-real fade-up visible"
            aria-label="Карта на Самуил"
          >
            <div className="map-content stack">
              <div className="eyebrow">Локация</div>
              <h2>{mapTitle}</h2>
              <p>{mapDescription}</p>
            </div>
            <div className="leaflet-frame">
              <LeafletMap stores={stores} height="100%" />
            </div>
          </section>

          <section
            className="contact-panel store-list fade-up visible"
            aria-label="Обекти"
          >
            <div className="panel-title">
              <div className="eyebrow">Обекти</div>
              <h2>Изберете къде искате да отидете.</h2>
            </div>

            <div className="location-card-list">
              {contactPage.stores.map((store) => (
                <Link
                  key={store.href}
                  className="location-card"
                  href={store.href}
                  data-wipe
                  data-color={store.color}
                  style={{ "--card-color": store.color } as CardColorStyle}
                >
                  <span className="location-card-index">{store.index}</span>
                  <div className="location-card-copy">
                    <h3>{store.title}</h3>
                    <p>{store.description}</p>
                  </div>
                  <span className="location-card-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="contact-panel form-card fade-up visible">
            <div className="panel-title">
              <div className="eyebrow">Запитване</div>
              <h2>Пишете ни директно.</h2>
            </div>
            <form
              className="contact-form"
              id="contactForm"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  aria-invalid={invalidField === "name" ? "true" : undefined}
                  onChange={(event) => updateField("name", event.target.value)}
                />
                <label htmlFor="name">Име</label>
              </div>

              <div className="field">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  pattern="[0-9+\s()/-]+"
                  value={form.phone}
                  aria-invalid={invalidField === "phone" ? "true" : undefined}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
                <label htmlFor="phone">Телефон</label>
              </div>

              <div className="field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  aria-invalid={invalidField === "email" ? "true" : undefined}
                  onChange={(event) => updateField("email", event.target.value)}
                />
                <label htmlFor="email">Имейл</label>
              </div>

              <div className="field">
                <select
                  id="topic"
                  name="topic"
                  required
                  value={form.topic}
                  aria-invalid={invalidField === "topic" ? "true" : undefined}
                  onChange={(event) => updateField("topic", event.target.value)}
                >
                  <option value="">Изберете тема</option>
                  {contactPage.topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
                <label htmlFor="topic">Относно</label>
              </div>

              <div className="field">
                <textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  aria-invalid={invalidField === "message" ? "true" : undefined}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                />
                <label htmlFor="message">Съобщение</label>
              </div>

              <button className="btn color" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Изпращане..." : "Изпратете съобщение"}
              </button>
              <p className="form-message" aria-live="polite">
                {message}
              </p>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
