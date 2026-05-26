import type { DivisionOfferings } from "@/data/offerings";
import { getOfferingsForStore } from "@/data/offerings";

type StoreSlug = "supermarket" | "industrial" | "construction";

export async function getOfferings(
  slug: StoreSlug,
): Promise<DivisionOfferings | undefined> {
  // In the future, this could fetch from Sanity CMS.
  // For now, static fallback is sufficient.
  return getOfferingsForStore(slug);
}
