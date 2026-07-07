import { cache } from "react";
import { restaurantPage as staticRestaurantPage } from "@/data/redesign-content";
import { contentTags, restaurantPageQuery } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";
import { sanityImageUrl } from "@/lib/sanity/image";
import type { SeoInput } from "@/lib/seo";

export type RestaurantPageModel = typeof staticRestaurantPage & {
  about?: string;
  sourceUrl?: string;
  menuUrl?: string;
  reservationUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  gallery: Array<{
    url: string;
    alt: string;
  }>;
  seo?: SeoInput;
};

interface SanityRestaurantPage {
  title?: string;
  description?: string;
  sourceUrl?: string;
  menuUrl?: string;
  reservationUrl?: string;
  about?: string;
  phone?: string;
  email?: string;
  address?: string;
  gallery?: Array<{
    alt?: string;
  }>;
  promos?: Array<{
    icon?: string;
    title?: string;
    description?: string;
  }>;
  seo?: SeoInput;
}

function mapGallery(gallery?: SanityRestaurantPage["gallery"]) {
  return (
    gallery
      ?.map((image, index) => {
        const url = sanityImageUrl(image)?.width(1000).height(750).fit("crop").url();
        if (!url) return null;

        return {
          url,
          alt: image.alt ?? `Ресторант Делиорман ${index + 1}`,
        };
      })
      .filter((image): image is { url: string; alt: string } => Boolean(image)) ?? []
  );
}

function mapRestaurantPage(
  page?: SanityRestaurantPage | null,
): RestaurantPageModel {
  if (!page) {
    return {
      ...staticRestaurantPage,
      gallery: [],
    };
  }

  return {
    ...staticRestaurantPage,
    title: page.title ?? staticRestaurantPage.title,
    description: page.description ?? staticRestaurantPage.description,
    about: page.about,
    sourceUrl: page.sourceUrl,
    menuUrl: page.menuUrl,
    reservationUrl: page.reservationUrl,
    phone: page.phone,
    email: page.email,
    address: page.address,
    gallery: mapGallery(page.gallery),
    seo: page.seo,
    promos:
      page.promos?.length
        ? page.promos.map((promo, index) => ({
            color: staticRestaurantPage.promos[index]?.color ?? staticRestaurantPage.accent,
            visual: promo.icon ?? staticRestaurantPage.promos[index]?.visual ?? "",
            title: promo.title ?? staticRestaurantPage.promos[index]?.title ?? "",
            description:
              promo.description ??
              staticRestaurantPage.promos[index]?.description ??
              "",
          }))
        : staticRestaurantPage.promos,
  };
}

export const getRestaurantPageModel = cache(async (): Promise<RestaurantPageModel> => {
  const page = await fetchSanity<SanityRestaurantPage>(restaurantPageQuery, {
    tags: [contentTags.restaurant],
  });

  return mapRestaurantPage(page);
});
