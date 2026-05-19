import { restaurantPage as staticRestaurantPage } from "@/data/redesign-content";
import { contentTags, restaurantPageQuery } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";

export type RestaurantPageModel = typeof staticRestaurantPage;

interface SanityRestaurantPage {
  title?: string;
  description?: string;
  promos?: Array<{
    icon?: string;
    title?: string;
    description?: string;
  }>;
}

function mapRestaurantPage(
  page?: SanityRestaurantPage | null,
): RestaurantPageModel {
  if (!page) return staticRestaurantPage;

  return {
    ...staticRestaurantPage,
    title: page.title ?? staticRestaurantPage.title,
    description: page.description ?? staticRestaurantPage.description,
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

export async function getRestaurantPageModel(): Promise<RestaurantPageModel> {
  const page = await fetchSanity<SanityRestaurantPage>(restaurantPageQuery, {
    tags: [contentTags.restaurant],
  });

  return mapRestaurantPage(page);
}
