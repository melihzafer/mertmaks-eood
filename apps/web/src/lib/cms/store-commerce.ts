import commerceData from "@/data/store-commerce.json";
import { accents } from "@/data/redesign-content";
import { getStore, getStoreTodayIsoDate, type Store } from "@/lib/stores";
import { sanityImageUrl, getFallbackImage } from "@/lib/sanity/image";
import { fetchSanity } from "@/lib/sanity/fetch";
import type { BrochureShareItem } from "@/lib/brochure";
import {
  contentTags,
  faqQuery,
  storeCommercePageQuery,
} from "@mertmaks/content/queries";
import { formatPrice } from "@/lib/utils";

type StoreSlug = "supermarket" | "industrial" | "construction" | "restaurant";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  keywords: string[];
  link: string;
}

export interface StoreCommerceModel {
  store: Store;
  promotions: BrochureShareItem[];
  products: BrochureShareItem[];
  faqs: FAQItem[];
}

interface SanitySlug {
  current?: string;
}

interface SanityStore {
  _id?: string;
  name?: string;
  slug?: SanitySlug;
  type?: StoreSlug;
  address?: string;
  city?: string;
  region?: string;
  phone?: string;
  email?: string;
  coordinates?: { lat?: number; lng?: number };
  hours?: Store["hours"];
  features?: string[];
  accent?: string;
}

interface SanityCategory {
  title?: string;
  slug?: SanitySlug;
}

interface SanityCommerceItem {
  _id?: string;
  title?: string;
  description?: string;
  label?: string;
  discount?: number;
  promoType?: string;
  oldPrice?: string;
  newPrice?: string;
  showPrice?: string;
  validFrom?: string;
  validTo?: string;
  terms?: string[];
  image?: unknown;
  shareTitle?: string;
  shareDescription?: string;
  shareImage?: unknown;
  brochureAccent?: string;
  offerLabel?: string;
  store?: SanityStore;
  category?: SanityCategory;
}

interface SanityFaq {
  _id?: string;
  question?: string;
  answer?: string;
  category?: string;
  keywords?: string[];
  link?: string;
}

interface SanityStoreCommerceResponse {
  store?: SanityStore | null;
  promotions?: SanityCommerceItem[];
  products?: SanityCommerceItem[];
  faqs?: SanityFaq[];
}

const storeAccentBySlug: Record<StoreSlug, string> = {
  supermarket: accents.supermarket,
  industrial: accents.industrial,
  construction: accents.construction,
  restaurant: accents.restaurant,
};

const legacyTypeBySlug: Record<StoreSlug, Store["type"]> = {
  supermarket: "grocery",
  industrial: "industrial",
  construction: "construction",
  restaurant: "restaurant",
};

function imageUrl(source: unknown) {
  if (!source) return undefined;

  try {
    return sanityImageUrl(source)?.width(1200).height(900).fit("crop").url() ?? undefined;
  } catch {
    return undefined;
  }
}

function fallbackStore(slug: StoreSlug): Store {
  const store = getStore(slug);
  if (!store) throw new Error(`Missing static fallback store for ${slug}`);
  return store;
}

function mapStore(slug: StoreSlug, store?: SanityStore | null): Store {
  const fallback = fallbackStore(slug);

  if (!store) return fallback;

  return {
    ...fallback,
    id: store.slug?.current ?? fallback.id,
    name: store.name ?? fallback.name,
    type: store.type ? legacyTypeBySlug[store.type] : fallback.type,
    address: store.address ?? fallback.address,
    city: store.city ?? fallback.city,
    region: store.region ?? fallback.region,
    phone: store.phone ?? fallback.phone,
    email: store.email ?? fallback.email,
    coordinates: {
      lat: store.coordinates?.lat ?? fallback.coordinates.lat,
      lng: store.coordinates?.lng ?? fallback.coordinates.lng,
    },
    hours: store.hours ?? fallback.hours,
    features: store.features?.length ? store.features : fallback.features,
  };
}

function mapCmsItem(
  item: SanityCommerceItem,
  fallbackStoreValue: Store,
  kind: BrochureShareItem["kind"],
  index: number,
): BrochureShareItem {
  const storeSlug = (item.store?.slug?.current ?? fallbackStoreValue.id) as StoreSlug;
  const title = item.shareTitle ?? item.title ?? "Предложение";
  const label =
    item.label ??
    item.offerLabel ??
    (item.discount ? `${item.discount}% отстъпка` : undefined);

  return {
    id: item._id ?? `${kind}-${storeSlug}-${index}`,
    kind,
    title,
    description: item.shareDescription ?? item.description,
    label,
    category: item.category?.title,
    storeName: item.store?.name ?? fallbackStoreValue.name,
    storeSlug,
    storePhone: item.store?.phone ?? fallbackStoreValue.phone,
    accentColor:
      item.brochureAccent ??
      item.store?.accent ??
      storeAccentBySlug[storeSlug] ??
      storeAccentBySlug.supermarket,
    imageUrl: imageUrl(item.shareImage ?? item.image) || getFallbackImage(storeSlug, item.category?.title),
    validFrom: item.validFrom,
    validTo: item.validTo,
    canonicalUrl: `/${storeSlug}`,
    terms: item.terms ?? [],
    promoType: item.promoType,
    oldPrice: formatPrice(item.oldPrice),
    newPrice: formatPrice(item.newPrice),
    showPrice: item.showPrice,
  };
}

function mapStaticProduct(
  product: (typeof commerceData.products)[number],
  store: Store,
): BrochureShareItem {
  const storeSlug = product.store as StoreSlug;

  return {
    id: `static-${product.id}`,
    kind: "product",
    title: product.title,
    description: product.description,
    label: product.offerLabel,
    category: product.category,
    storeName: store.name,
    storeSlug,
    storePhone: store.phone,
    accentColor: storeAccentBySlug[storeSlug],
    imageUrl: (product as any).imageUrl,
    canonicalUrl: `/${storeSlug}`,
    terms: [],
  };
}

function mapFaq(faq: SanityFaq, index: number): FAQItem {
  return {
    id: faq._id ?? `cms-faq-${index}`,
    question: faq.question ?? "Въпрос",
    answer: faq.answer ?? "",
    category: faq.category,
    keywords: faq.keywords ?? [],
    link: faq.link ?? "/",
  };
}

function staticFaqs(slug?: StoreSlug): FAQItem[] {
  return commerceData.faqs
    .filter((faq) => !slug || faq.link === "/" || faq.link === `/${slug}` || faq.link === "/contact")
    .map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      keywords: faq.keywords,
      link: faq.link,
    }));
}

function staticProductsForStore(slug: StoreSlug, store: Store): BrochureShareItem[] {
  return commerceData.products
    .filter((product) => product.store === slug && product.visible && product.featured)
    .map((product) => mapStaticProduct(product, store));
}

export async function getStoreCommerceModel(
  slug: StoreSlug,
): Promise<StoreCommerceModel> {
  const today = getStoreTodayIsoDate();
  const data = await fetchSanity<SanityStoreCommerceResponse>(storeCommercePageQuery, {
    params: { slug, today },
    tags: [
      contentTags.stores,
      contentTags.divisions,
      contentTags.promotions,
      contentTags.products,
      contentTags.faqs,
    ],
  });

  const store = mapStore(slug, data?.store);
  const promotions =
    data?.promotions?.map((promotion, index) =>
      mapCmsItem(promotion, store, "promotion", index),
    ) ?? [];
  const cmsProducts =
    data?.products?.map((product, index) => mapCmsItem(product, store, "product", index)) ??
    [];
  const products = cmsProducts.length ? cmsProducts : staticProductsForStore(slug, store);
  const faqs = data?.faqs?.length ? data.faqs.map(mapFaq) : staticFaqs(slug);

  return {
    store,
    promotions,
    products,
    faqs,
  };
}

export async function getFaqItems(): Promise<FAQItem[]> {
  const faqs = await fetchSanity<SanityFaq[]>(faqQuery, {
    tags: [contentTags.faqs],
  });

  return faqs?.length ? faqs.map(mapFaq) : staticFaqs();
}
