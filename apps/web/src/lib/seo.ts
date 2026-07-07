import type { Metadata } from "next";
import { sanityImageUrl } from "@/lib/sanity/image";
import type { Store } from "@/lib/stores";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://mertmax.bg"
).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = "/icons/icon-512x512.png";

export interface SeoImage {
  alt?: string;
  asset?: unknown;
}

export interface SeoInput {
  title?: string;
  description?: string;
  image?: SeoImage | null;
  noIndex?: boolean;
}

function resolveOgImage(image?: SeoImage | null): string {
  if (!image) return DEFAULT_OG_IMAGE;
  const url = sanityImageUrl(image)?.width(1200).height(630).fit("crop").url();
  return url ?? DEFAULT_OG_IMAGE;
}

interface BuildMetadataArgs {
  path: string;
  seo?: SeoInput | null;
  fallbackTitle: string;
  fallbackDescription: string;
  siteName?: string;
}

export function buildMetadata({
  path,
  seo,
  fallbackTitle,
  fallbackDescription,
  siteName = "МЕРТМАКС",
}: BuildMetadataArgs): Metadata {
  const title = seo?.title || fallbackTitle;
  const description = seo?.description || fallbackDescription;
  const canonical = path === "/" ? "/" : path;
  const ogImage = resolveOgImage(seo?.image);

  return {
    title,
    description,
    alternates: { canonical },
    robots: seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: "bg_BG",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: seo?.image?.alt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd(settings: {
  brandName?: string;
  tagline?: string;
  location?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.brandName || "МЕРТМАКС",
    slogan: settings.tagline,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512x512.png`,
    address: settings.location,
  };
}

export function websiteJsonLd(settings: { brandName?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.brandName || "МЕРТМАКС",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/find-us?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

const dayLabels: Record<string, string> = {
  monday: "Mo",
  tuesday: "Tu",
  wednesday: "We",
  thursday: "Th",
  friday: "Fr",
  saturday: "Sa",
  sunday: "Su",
};

function openingHoursSpecification(hours: Store["hours"]) {
  if (!hours) return undefined;

  return Object.entries(hours)
    .filter(([, range]) => range && !range.closed)
    .map(([day, range]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayLabels[day] ?? day,
      opens: range?.open,
      closes: range?.close,
    }));
}

export function localBusinessJsonLd(store: Store, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: store.name,
    url: `${SITE_URL}${path}`,
    telephone: store.phone,
    email: store.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address,
      addressLocality: store.city,
      addressRegion: store.region,
      addressCountry: "BG",
    },
    geo: store.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: store.coordinates.lat,
          longitude: store.coordinates.lng,
        }
      : undefined,
    openingHoursSpecification: openingHoursSpecification(store.hours),
  };
}

export interface FaqJsonLdItem {
  question: string;
  answer: string;
}

export function faqPageJsonLd(faqs: FaqJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
