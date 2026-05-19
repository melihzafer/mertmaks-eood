"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { accents } from "@/data/redesign-content";
import type { Store } from "@/lib/stores";
import type { ContactPageModel } from "@/lib/cms/contact";

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

type FormField = "name" | "phone" | "topic" | "message";

const initialForm = {
  name: "",
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
  stores,
}: ContactPageClientProps) {
  const [form, setForm] = useState(initialForm);
  const [invalidField, setInvalidField] = useState<FormField | null>(null);
  const [message, setMessage] = useState("");

  const updateField = (field: FormField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (invalidField === field) setInvalidField(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requiredFields: FormField[] = ["name", "phone", "topic", "message"];
    const firstInvalid = requiredFields.find((field) => !form[field].trim());

    if (firstInvalid) {
      setInvalidField(firstInvalid);
      setMessage("Моля, попълнете задължителните полета.");
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setInvalidField(null);
    setMessage("Съобщението е подготвено за изпращане.");
    setForm(initialForm);
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
              <h2>с. Самуил, област Разград</h2>
              <p>
                Централна точка за ежедневни покупки, ремонтни материали,
                домашни потреби и топла храна.
              </p>
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
              noValidate
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
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  aria-invalid={invalidField === "phone" ? "true" : undefined}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
                <label htmlFor="phone">Телефон</label>
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

              <button className="btn color" type="submit">
                Подгответе съобщение
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
