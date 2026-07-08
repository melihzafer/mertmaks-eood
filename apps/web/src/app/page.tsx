import type { Metadata } from "next";
import { HomePageClient } from "./HomePageClient";
import { getHomePageModel } from "@/lib/cms/home";
import { buildMetadata } from "@/lib/seo";
import { getStores } from "@/lib/stores";

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePageModel();

  return buildMetadata({
    path: "/",
    seo: homePage.seo,
    fallbackTitle: "МЕРТМАКС ЕООД – Търговия на дребно в Самуил",
    fallbackDescription:
      "Супермаркет, строителен магазин, домашни потреби и ресторант на едно място в с. Самуил, област Разград.",
  });
}

export default async function HomePage() {
  const [homePage, stores] = await Promise.all([
    getHomePageModel(),
    Promise.resolve(getStores()),
  ]);

  return <HomePageClient homePage={homePage} stores={stores} />;
}
