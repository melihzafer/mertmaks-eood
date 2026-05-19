import { accents, homePage as staticHomePage } from "@/data/redesign-content";
import { contentTags, featuredPromotionsQuery, homePageQuery } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";

export type HomePageModel = typeof staticHomePage;

interface SanityHomePage {
  heroEyebrow?: string;
  heroTitle?: string;
  heroLead?: string;
  primaryCta?: { label?: string; href?: string };
  secondaryCta?: { label?: string; href?: string };
  stats?: HomePageModel["stats"];
  ctaTitle?: string;
  ctaDescription?: string;
}

interface SanityPromotion {
  title?: string;
  description?: string;
  label?: string;
  discount?: number;
  store?: {
    type?: "supermarket" | "industrial" | "construction" | "restaurant";
    accent?: string;
  };
  category?: {
    title?: string;
  };
}

const colorByStoreType = {
  supermarket: accents.supermarket,
  industrial: accents.industrial,
  construction: accents.construction,
  restaurant: accents.restaurant,
};

const categoryByStoreType = {
  supermarket: "food",
  industrial: "home",
  construction: "tools",
  restaurant: "food",
};

function mapPromotion(promotion: SanityPromotion, index: number) {
  const fallback = staticHomePage.promotions[index] ?? staticHomePage.promotions[0];
  const storeType = promotion.store?.type;

  return {
    category: storeType ? categoryByStoreType[storeType] : fallback.category,
    color:
      promotion.store?.accent ??
      (storeType ? colorByStoreType[storeType] : undefined) ??
      fallback.color,
    label:
      promotion.label ??
      (promotion.discount ? `${promotion.discount}% отстъпка` : undefined) ??
      fallback.label,
    visual: promotion.category?.title ?? fallback.visual,
    title: promotion.title ?? fallback.title,
    description: promotion.description ?? fallback.description,
  };
}

function mergeHomePage(
  page?: SanityHomePage | null,
  promotions?: SanityPromotion[] | null,
): HomePageModel {
  return {
    ...staticHomePage,
    hero: {
      eyebrow: page?.heroEyebrow ?? staticHomePage.hero.eyebrow,
      title: page?.heroTitle ?? staticHomePage.hero.title,
      lead: page?.heroLead ?? staticHomePage.hero.lead,
      primaryCta: {
        label: page?.primaryCta?.label ?? staticHomePage.hero.primaryCta.label,
        href: page?.primaryCta?.href ?? staticHomePage.hero.primaryCta.href,
      },
      secondaryCta: {
        label:
          page?.secondaryCta?.label ?? staticHomePage.hero.secondaryCta.label,
        href: page?.secondaryCta?.href ?? staticHomePage.hero.secondaryCta.href,
      },
    },
    stats: page?.stats?.length ? page.stats : staticHomePage.stats,
    promotions: promotions?.length
      ? promotions.map(mapPromotion)
      : staticHomePage.promotions,
    cta: {
      ...staticHomePage.cta,
      title: page?.ctaTitle ?? staticHomePage.cta.title,
      description: page?.ctaDescription ?? staticHomePage.cta.description,
    },
  };
}

export async function getHomePageModel(): Promise<HomePageModel> {
  const today = new Date().toISOString().slice(0, 10);
  const [page, promotions] = await Promise.all([
    fetchSanity<SanityHomePage>(homePageQuery, {
      tags: [contentTags.home, contentTags.promotions],
    }),
    fetchSanity<SanityPromotion[]>(featuredPromotionsQuery, {
      params: { today },
      tags: [contentTags.promotions],
    }),
  ]);

  return mergeHomePage(page, promotions);
}
