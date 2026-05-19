import { contactPage as staticContactPage, brand as staticBrand } from "@/data/redesign-content";
import storesData from "@/data/stores.json";
import type { Store } from "@/lib/stores";
import { contactPageQuery, contentTags } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";

type StaticContactPage = typeof staticContactPage;
type StaticBrand = typeof staticBrand;

interface SanityContactPage {
  heroEyebrow?: string;
  heroTitle?: string;
  heroLead?: string;
  topics?: string[];
  mapTitle?: string;
  mapDescription?: string;
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
  page?: SanityContactPage | null;
  stores?: SanityStore[] | null;
}

export interface ContactPageModel {
  brand: StaticBrand;
  contactPage: StaticContactPage;
  stores: Store[];
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

export async function getContactPageModel(): Promise<ContactPageModel> {
  const payload = await fetchSanity<SanityContactPayload>(contactPageQuery, {
    tags: [contentTags.contact, contentTags.stores],
  });

  const cmsStores = payload?.stores
    ?.map(mapSanityStore)
    .filter((store): store is Store => Boolean(store));

  return {
    brand: staticBrand,
    contactPage: mergeContactPage(payload?.page),
    stores: mergeStores(cmsStores),
  };
}
