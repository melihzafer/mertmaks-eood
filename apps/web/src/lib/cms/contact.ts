import { cache } from "react";
import { contactPage as staticContactPage, brand as staticBrand } from "@/data/redesign-content";
import storesData from "@/data/stores.json";
import type { Store } from "@/lib/stores";
import { contactPageQuery, contentTags } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";
import type { SeoInput } from "@/lib/seo";

type StaticContactPage = typeof staticContactPage;
type StaticBrand = typeof staticBrand;

interface SanityContactPage {
  heroEyebrow?: string;
  heroTitle?: string;
  heroLead?: string;
  topics?: string[];
  mapTitle?: string;
  mapDescription?: string;
  seo?: SeoInput;
}

interface SanityStore {
  name?: string;
  slug?: { current?: string };
  type?: "supermarket" | "industrial" | "construction" | "restaurant";
  address?: string;
  city?: string;
  region?: string;
  phone?: string;
  email?: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  hours?: Store["hours"];
  features?: string[];
}

interface SanityContactPayload {
  settings?: {
    brandName?: string;
    legalForm?: string;
    tagline?: string;
    footerText?: string;
    location?: string;
    hoursSummary?: string;
  } | null;
  page?: SanityContactPage | null;
  stores?: SanityStore[] | null;
}

export interface ContactPageModel {
  brand: StaticBrand;
  contactPage: StaticContactPage;
  mapTitle: string;
  mapDescription: string;
  stores: Store[];
  seo?: SeoInput;
}

const staticStores = storesData.stores as Store[];

function toStoreType(type: SanityStore["type"]): Store["type"] {
  if (type === "supermarket") return "grocery";
  return type ?? "grocery";
}

function mapSanityStore(store: SanityStore): Store | null {
  const id = store.slug?.current ?? store.type;
  const fallback = staticStores.find((item) => item.id === id);

  if (!id || !store.name || !store.coordinates?.lat || !store.coordinates.lng) {
    console.warn("Skipping incomplete Sanity store document", { id, name: store.name });
    return null;
  }

  return {
    id,
    name: store.name,
    type: toStoreType(store.type),
    address: store.address ?? fallback?.address ?? "",
    city: store.city ?? fallback?.city ?? "",
    region: store.region ?? fallback?.region ?? "",
    phone: store.phone ?? fallback?.phone ?? "",
    email: store.email ?? fallback?.email ?? "",
    coordinates: {
      lat: store.coordinates.lat,
      lng: store.coordinates.lng,
    },
    hours: store.hours ?? fallback?.hours ?? staticStores[0].hours,
    features: store.features ?? fallback?.features ?? [],
  };
}

function mergeStores(cmsStores: Store[] = []) {
  if (cmsStores.length === 0) return staticStores;

  const storesById = new Map(staticStores.map((store) => [store.id, store]));

  cmsStores.forEach((store) => {
    storesById.set(store.id, {
      ...storesById.get(store.id),
      ...store,
    });
  });

  return Array.from(storesById.values());
}

function mergeContactPage(page?: SanityContactPage | null): StaticContactPage {
  if (!page) return staticContactPage;

  return {
    ...staticContactPage,
    hero: {
      eyebrow: page.heroEyebrow ?? staticContactPage.hero.eyebrow,
      title: page.heroTitle ?? staticContactPage.hero.title,
      lead: page.heroLead ?? staticContactPage.hero.lead,
    },
    topics: page.topics?.length ? page.topics : staticContactPage.topics,
  };
}

function mergeBrand(settings?: SanityContactPayload["settings"]): StaticBrand {
  return {
    ...staticBrand,
    name: settings?.brandName ?? staticBrand.name,
    legalForm: settings?.legalForm ?? staticBrand.legalForm,
    tagline: settings?.tagline ?? staticBrand.tagline,
    footerText: settings?.footerText ?? staticBrand.footerText,
    location: settings?.location ?? staticBrand.location,
    hours: settings?.hoursSummary ?? staticBrand.hours,
  };
}

export const getContactPageModel = cache(async (): Promise<ContactPageModel> => {
  const payload = await fetchSanity<SanityContactPayload>(contactPageQuery, {
    tags: [contentTags.contact, contentTags.stores],
  });

  const cmsStores = payload?.stores
    ?.map(mapSanityStore)
    .filter((store): store is Store => Boolean(store));

  return {
    brand: mergeBrand(payload?.settings),
    contactPage: mergeContactPage(payload?.page),
    mapTitle: payload?.page?.mapTitle ?? "с. Самуил, област Разград",
    mapDescription:
      payload?.page?.mapDescription ??
      "Централна точка за ежедневни покупки, ремонтни материали, домашни потреби и топла храна.",
    stores: mergeStores(cmsStores),
    seo: payload?.page?.seo,
  };
});
