import { cache } from "react";
import type { DivisionPageKey } from "@/data/redesign-content";
import { divisionPages } from "@/data/redesign-content";
import { divisionPageByStoreQuery, contentTags } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";
import type { SeoInput } from "@/lib/seo";

export type DivisionPageModel = (typeof divisionPages)[DivisionPageKey] & {
  seo?: SeoInput;
};

interface SanityDivisionPage {
  heroIndex?: string;
  title?: string;
  description?: string;
  introEyebrow?: string;
  introTitle?: string;
  cards?: Array<{
    title?: string;
    description?: string;
    icon?: string;
    items?: string[];
    wide?: boolean;
  }>;
  features?: Array<{
    index?: string;
    title?: string;
    description?: string;
  }>;
  seo?: SeoInput;
}

function mapSanityDivisionPage(
  key: DivisionPageKey,
  page?: SanityDivisionPage | null,
): DivisionPageModel {
  const fallback = divisionPages[key];

  if (!page) return fallback;

  return {
    ...fallback,
    heroIndex: page.heroIndex ?? fallback.heroIndex,
    title: page.title ?? fallback.title,
    description: page.description ?? fallback.description,
    ...(("intro" in fallback || page.introEyebrow || page.introTitle) && {
      intro: {
        index: "intro" in fallback ? fallback.intro?.index ?? "01" : "01",
        eyebrow:
          page.introEyebrow ??
          ("intro" in fallback ? fallback.intro?.eyebrow : undefined) ??
          "Категории",
        title:
          page.introTitle ??
          ("intro" in fallback ? fallback.intro?.title : undefined) ??
          fallback.title,
      },
    }),
    cards:
      page.cards?.length
        ? page.cards.map((card, index) => ({
            wide: card.wide,
            icon: card.icon ?? fallback.cards[index]?.icon ?? "",
            title: card.title ?? fallback.cards[index]?.title ?? "",
            items: card.items?.length
              ? card.items
              : fallback.cards[index]?.items ?? [],
          }))
        : fallback.cards,
    features:
      page.features?.length
        ? page.features.map((feature, index) => ({
            index: feature.index ?? fallback.features[index]?.index ?? `${index + 1}`.padStart(2, "0"),
            title: feature.title ?? fallback.features[index]?.title ?? "",
            description:
              feature.description ?? fallback.features[index]?.description ?? "",
          }))
        : fallback.features,
    seo: page.seo,
  } as DivisionPageModel;
}

export const getDivisionPageModel = cache(
  async (key: DivisionPageKey): Promise<DivisionPageModel> => {
    const page = await fetchSanity<SanityDivisionPage>(divisionPageByStoreQuery, {
      params: { slug: key },
      tags: [contentTags.divisions, `division:${key}`],
    });

    return mapSanityDivisionPage(key, page);
  },
);
