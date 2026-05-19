import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";
import { getStoreCommerceModel } from "@/lib/cms/store-commerce";

export default async function SupermarketPage() {
  const [page, commerce] = await Promise.all([
    getDivisionPageModel("supermarket"),
    getStoreCommerceModel("supermarket"),
  ]);

  return <DivisionDetailPage page={page} commerce={commerce} />;
}
