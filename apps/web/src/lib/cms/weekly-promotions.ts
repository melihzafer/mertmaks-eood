import type { WeeklyPromotion } from "@/data/weekly-promotions";
import { fetchSanity } from "@/lib/sanity/fetch";
import { sanityImageUrl, getFallbackImage } from "@/lib/sanity/image";
import {
  contentTags,
  weeklyPromotionsQuery,
} from "@mertmaks/content/queries";

type StoreSlug = "supermarket" | "industrial" | "construction";

interface SanityWeeklyPromotion {
  _id?: string;
  title?: string;
  description?: string;
  label?: string;
  discount?: number;
  validFrom?: string;
  validTo?: string;
  terms?: string[];
  image?: unknown;
  store?: { slug?: { current?: string }; name?: string };
  category?: { title?: string };
}

function imageUrl(source: unknown) {
  if (!source) return undefined;
  try {
    return (
      sanityImageUrl(source)?.width(800).height(600).fit("crop").url() ??
      undefined
    );
  } catch {
    return undefined;
  }
}

function mapWeeklyPromotion(item: SanityWeeklyPromotion): WeeklyPromotion {
  const storeSlug = (item.store?.slug?.current ?? "supermarket") as StoreSlug;
  const categoryTitle = item.category?.title ?? "Общо";
  return {
    id: item._id ?? `cms-weekly-${storeSlug}`,
    title: item.title ?? "Седмична оферта",
    description: item.description ?? "",
    store: storeSlug,
    category: categoryTitle,
    discount: item.discount,
    validFrom: item.validFrom ?? new Date().toISOString().slice(0, 10),
    validTo: item.validTo ?? new Date().toISOString().slice(0, 10),
    active: true,
    image: imageUrl(item.image) || getFallbackImage(storeSlug, categoryTitle),
    terms: item.terms,
  };
}

export async function getWeeklyPromotions(
  slug: StoreSlug,
): Promise<WeeklyPromotion[]> {
  const today = new Date().toISOString().slice(0, 10);

  const items = await fetchSanity<SanityWeeklyPromotion[]>(
    weeklyPromotionsQuery,
    {
      params: { slug, today },
      tags: [contentTags.weeklyPromotions, `weekly-promotions:${slug}`],
    },
  );

  if (items && items.length > 0) {
    return items.map(mapWeeklyPromotion);
  }

  return [];
}
