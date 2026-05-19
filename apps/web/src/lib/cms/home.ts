import { accents, homePage as staticHomePage } from "@/data/redesign-content";
import { contentTags, featuredPromotionsQuery, homePageQuery } from "@mertmaks/content/queries";
import type { BrochureShareItem } from "@/lib/brochure";
import { fetchSanity } from "@/lib/sanity/fetch";
import { sanityImageUrl } from "@/lib/sanity/image";

export type HomePromotionModel = (typeof staticHomePage.promotions)[number] &
  BrochureShareItem;
export type HomePageModel = Omit<typeof staticHomePage, "promotions"> & {
  promotions: HomePromotionModel[];
};

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
  _id?: string;
  title?: string;
  description?: string;
  label?: string;
  discount?: number;
  validFrom?: string;
  validTo?: string;
  terms?: string[];
  image?: unknown;
  shareTitle?: string;
  shareDescription?: string;
  shareImage?: unknown;
  brochureAccent?: string;
  store?: {
    name?: string;
    slug?: { current?: string };
    type?: "supermarket" | "industrial" | "construction" | "restaurant";
    accent?: string;
    phone?: string;
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
  const storeSlug = promotion.store?.slug?.current ?? storeType ?? "supermarket";
  const imageUrl =
    sanityImageUrl(promotion.shareImage ?? promotion.image)
      ?.width(1200)
      .height(900)
      .fit("crop")
      .url() ?? undefined;
  const title = promotion.shareTitle ?? promotion.title ?? fallback.title;
  const description =
    promotion.shareDescription ?? promotion.description ?? fallback.description;

  return {
    id: promotion._id ?? `home-promotion-${index}`,
    kind: "promotion" as const,
    category: storeType ? categoryByStoreType[storeType] : fallback.category,
    color:
      promotion.brochureAccent ??
      promotion.store?.accent ??
      (storeType ? colorByStoreType[storeType] : undefined) ??
      fallback.color,
    label:
      promotion.label ??
      (promotion.discount ? `${promotion.discount}% отстъпка` : undefined) ??
      fallback.label,
    visual: promotion.category?.title ?? fallback.visual,
    title,
    description,
    storeName: promotion.store?.name,
    storeSlug,
    storePhone: promotion.store?.phone,
    accentColor:
      promotion.brochureAccent ??
      promotion.store?.accent ??
      (storeType ? colorByStoreType[storeType] : undefined) ??
      fallback.color,
    imageUrl,
    validFrom: promotion.validFrom,
    validTo: promotion.validTo,
    canonicalUrl: `/${storeSlug}`,
    terms: promotion.terms ?? [],
  };
}

function mapStaticPromotion(
  promotion: (typeof staticHomePage.promotions)[number],
  index: number,
): HomePromotionModel {
  return {
    ...promotion,
    id: `static-home-promotion-${index}`,
    kind: "promotion",
    storeSlug: "/",
    accentColor: promotion.color,
    canonicalUrl: "/",
    terms: [],
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
      : staticHomePage.promotions.map(mapStaticPromotion),
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
