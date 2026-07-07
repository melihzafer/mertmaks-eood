import { flatSearchData } from "@/data/search-data";
import { contentTags, searchIndexQuery } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";
import { getRouteAccent } from "@/lib/route-accent";

export interface SearchItem {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  store: "grocery" | "industrial" | "construction" | "restaurant";
  color?: string;
  link: string;
  question?: string;
  answer?: string;
}

interface SanitySearchIndex {
  products?: Array<{
    _id?: string;
    title?: string;
    keywords?: string[];
    category?: string;
    store?: "supermarket" | "industrial" | "construction" | "restaurant";
    link?: string;
  }>;
  faqs?: Array<{
    _id?: string;
    question?: string;
    answer?: string;
    category?: string;
    keywords?: string[];
    link?: string;
  }>;
}

function toLegacyStore(store?: string): SearchItem["store"] {
  if (store === "industrial") return "industrial";
  if (store === "construction") return "construction";
  if (store === "restaurant") return "restaurant";
  return "grocery";
}

function mapSearchIndex(index?: SanitySearchIndex | null): SearchItem[] {
  if (!index) return flatSearchData as SearchItem[];

  const products = index.products?.map((product, i) => {
    const link = product.link ?? (product.store ? `/${product.store}` : "/");

    return {
      id: product._id ?? `cms-product-${i}`,
      name: product.title ?? "Продукт",
      category: product.category ?? "Продукти",
      keywords: product.keywords ?? [],
      store: toLegacyStore(product.store),
      color: getRouteAccent(link),
      link,
    };
  });

  const faqs = index.faqs?.map((faq, i) => ({
    id: faq._id ?? `cms-faq-${i}`,
    name: faq.question ?? "Въпрос",
    question: faq.question ?? "Въпрос",
    answer: faq.answer ?? "",
    category: faq.category ?? "FAQ",
    keywords: faq.keywords ?? [],
    store: "grocery" as const,
    link: faq.link ?? "/",
  }));

  const records = [...(products ?? []), ...(faqs ?? [])];

  return records.length ? records : (flatSearchData as SearchItem[]);
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  const index = await fetchSanity<SanitySearchIndex>(searchIndexQuery, {
    tags: [contentTags.products, contentTags.faqs],
  });

  return mapSearchIndex(index);
}
