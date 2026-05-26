import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";
import { getStoreCommerceModel } from "@/lib/cms/store-commerce";
import { getOfferings } from "@/lib/cms/offerings";
import { getWeeklyPromotions } from "@/lib/cms/weekly-promotions";
import { getMonthlyPromotions } from "@/lib/cms/monthly-promotions";
import { getStoreArticles } from "@/lib/cms/blog";

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
    <DivisionDetailPage
      page={page}
      commerce={commerce}
      offerings={offerings}
      weeklyPromotions={weeklyPromos}
      monthlyPromotions={monthlyPromos}
      articles={articles}
    />
  );
}
