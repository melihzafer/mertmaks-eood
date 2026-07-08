import type { SanityClient, SanityDocumentLike } from "sanity";

interface ProductionUrlContext {
  getClient: (options: { apiVersion: string }) => SanityClient;
  document: SanityDocumentLike;
}

const STORE_ROUTE: Record<string, string> = {
  supermarket: "/supermarket",
  construction: "/construction",
  industrial: "/industrial",
  restaurant: "/restaurant",
};

async function storeRoute(client: SanityClient, storeRef: string | undefined) {
  if (!storeRef) return undefined;
  const storeType = await client.fetch<string | null>(`*[_id == $id][0].type`, {
    id: storeRef,
  });
  return storeType ? STORE_ROUTE[storeType] : undefined;
}

/**
 * Resolves the "Преглед в сайта" link shown in the Studio document pane, so
 * editors can jump straight from a document to the page it actually renders on.
 */
export function resolveProductionUrl(baseUrl: string) {
  return async (
    _prev: string | undefined,
    context: ProductionUrlContext,
  ): Promise<string | undefined> => {
    const doc = context.document as SanityDocumentLike & {
      type?: string;
      store?: { _ref?: string };
    };

    switch (doc._type) {
      case "siteSettings":
      case "homePage":
      case "navigationItem":
        return baseUrl;
      case "contactPage":
        return `${baseUrl}/contact`;
      case "restaurantPage":
        return `${baseUrl}/restaurant`;
      case "faq":
        return `${baseUrl}/faq`;
      case "store": {
        const route = doc.type ? STORE_ROUTE[doc.type] : undefined;
        return route ? `${baseUrl}${route}` : undefined;
      }
      case "divisionPage":
      case "category":
      case "product":
      case "promotion":
      case "storeArticle": {
        const client = context.getClient({ apiVersion: "2025-01-01" });
        const route = await storeRoute(client, doc.store?._ref);
        return route ? `${baseUrl}${route}` : undefined;
      }
      default:
        return undefined;
    }
  };
}
