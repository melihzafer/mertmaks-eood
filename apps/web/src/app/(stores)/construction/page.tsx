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
  const page = await getDivisionPageModel("construction");

  return buildMetadata({
    path: "/construction",
    seo: page.seo,
    fallbackTitle: page.title || "Строителен магазин МЕРТМАКС",
    fallbackDescription:
      page.description ||
      "Строителни материали, инструменти и консултации в МЕРТМАКС, с. Самуил.",
  });
}

export default async function ConstructionPage() {
  const [page, commerce, offerings, weeklyPromos, monthlyPromos, articles] =
    await Promise.all([
      getDivisionPageModel("construction"),
      getStoreCommerceModel("construction"),
      getOfferings("construction"),
      getWeeklyPromotions("construction"),
      getMonthlyPromotions("construction"),
      getStoreArticles("construction", 3),
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(commerce.store, "/construction")),
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
