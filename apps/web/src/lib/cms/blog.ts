import type { StoreArticle } from "@/data/blog";
import { getArticlesForStore } from "@/data/blog";
import { fetchSanity } from "@/lib/sanity/fetch";
import { sanityImageUrl } from "@/lib/sanity/image";
import {
  contentTags,
  storeArticlesQuery,
} from "@mertmaks/content/queries";

type StoreSlug = "supermarket" | "industrial" | "construction";

interface SanityStoreArticle {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  body?: string;
  publishedAt?: string;
  image?: unknown;
  store?: { slug?: { current?: string } };
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

function mapStoreArticle(item: SanityStoreArticle): StoreArticle {
  const storeSlug = (item.store?.slug?.current ?? "supermarket") as StoreSlug;
  return {
    id: item._id ?? `cms-article-${storeSlug}`,
    slug: item.slug?.current ?? storeSlug,
    title: item.title ?? "Статия",
    excerpt: item.excerpt ?? "",
    body: item.body ?? "",
    store: storeSlug,
    publishedAt: item.publishedAt ?? new Date().toISOString().slice(0, 10),
    image: imageUrl(item.image),
  };
}

export async function getStoreArticles(
  slug: StoreSlug,
  limit = 3,
): Promise<StoreArticle[]> {
  const items = await fetchSanity<SanityStoreArticle[]>(storeArticlesQuery, {
    params: { slug, limit },
    tags: [contentTags.storeArticles, `store-articles:${slug}`],
  });

  if (items && items.length > 0) {
    return items.map(mapStoreArticle);
  }

  return getArticlesForStore(slug, limit);
}
