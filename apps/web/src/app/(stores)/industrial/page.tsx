import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";
import { getStoreCommerceModel } from "@/lib/cms/store-commerce";
import { getOfferings } from "@/lib/cms/offerings";
import { getWeeklyPromotions } from "@/lib/cms/weekly-promotions";
import { getMonthlyPromotions } from "@/lib/cms/monthly-promotions";
import { getStoreArticles } from "@/lib/cms/blog";

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
