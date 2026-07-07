import type { Metadata } from "next";
import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";
import { getStoreCommerceModel } from "@/lib/cms/store-commerce";
import { getOfferings } from "@/lib/cms/offerings";
import { getWeeklyPromotions } from "@/lib/cms/weekly-promotions";
import { getMonthlyPromotions } from "@/lib/cms/monthly-promotions";
import { getStoreArticles } from "@/lib/cms/blog";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDivisionPageModel("supermarket");

  return buildMetadata({
    path: "/supermarket",
    seo: page.seo,
    fallbackTitle: page.title || "Супермаркет МЕРТМАКС",
    fallbackDescription:
      page.description ||
      "Супермаркет МЕРТМАКС в Самуил - хранителни стоки, ежедневни промоции и работно време.",
  });
}

export default async function SupermarketPage() {
  const [page, commerce, offerings, weeklyPromos, monthlyPromos, articles] =
    await Promise.all([
      getDivisionPageModel("supermarket"),
      getStoreCommerceModel("supermarket"),
      getOfferings("supermarket"),
      getWeeklyPromotions("supermarket"),
      getMonthlyPromotions("supermarket"),
      getStoreArticles("supermarket", 3),
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(commerce.store, "/supermarket")),
        }}
      />
      <DivisionDetailPage
        page={page}
        commerce={commerce}
        offerings={offerings}
        weeklyPromotions={weeklyPromos}
        monthlyPromotions={monthlyPromos}
        articles={articles}
      />
    </>
  );
}
