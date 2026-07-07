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
  const page = await getDivisionPageModel("industrial");

  return buildMetadata({
    path: "/industrial",
    seo: page.seo,
    fallbackTitle: page.title || "Домашни потреби МЕРТМАКС",
    fallbackDescription:
      page.description ||
      "Домашни потреби, текстил и кухненски принадлежности в МЕРТМАКС, с. Самуил.",
  });
}

export default async function IndustrialPage() {
  const [page, commerce, offerings, weeklyPromos, monthlyPromos, articles] =
    await Promise.all([
      getDivisionPageModel("industrial"),
      getStoreCommerceModel("industrial"),
      getOfferings("industrial"),
      getWeeklyPromotions("industrial"),
      getMonthlyPromotions("industrial"),
      getStoreArticles("industrial", 3),
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(commerce.store, "/industrial")),
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
