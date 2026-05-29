import type { MonthlyPromotion } from "@/data/monthly-promotions";
import { getMonthlyPromotionsForStore } from "@/data/monthly-promotions";
import { fetchSanity } from "@/lib/sanity/fetch";
import { sanityImageUrl, getFallbackImage } from "@/lib/sanity/image";
import {
  contentTags,
  monthlyPromotionsQuery,
} from "@mertmaks/content/queries";

type StoreSlug = "supermarket" | "industrial" | "construction";

interface SanityMonthlyPromotion {
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

function mapMonthlyPromotion(item: SanityMonthlyPromotion): MonthlyPromotion {
  const storeSlug = (item.store?.slug?.current ?? "supermarket") as StoreSlug;
  const categoryTitle = item.category?.title ?? "Общо";
  return {
    id: item._id ?? `cms-monthly-${storeSlug}`,
    title: item.title ?? "Месечна оферта",
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

export async function getMonthlyPromotions(
  slug: StoreSlug,
): Promise<MonthlyPromotion[]> {
  const today = new Date().toISOString().slice(0, 10);

  const items = await fetchSanity<SanityMonthlyPromotion[]>(
    monthlyPromotionsQuery,
    {
      params: { slug, today },
      tags: [contentTags.monthlyPromotions, `monthly-promotions:${slug}`],
    },
  );

  if (items && items.length > 0) {
    return items.map(mapMonthlyPromotion);
  }

  return getMonthlyPromotionsForStore(slug);
}
