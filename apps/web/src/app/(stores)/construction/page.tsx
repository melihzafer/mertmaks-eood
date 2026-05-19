import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";
import { getStoreCommerceModel } from "@/lib/cms/store-commerce";

export default async function ConstructionPage() {
  const [page, commerce] = await Promise.all([
    getDivisionPageModel("construction"),
    getStoreCommerceModel("construction"),
  ]);

  return <DivisionDetailPage page={page} commerce={commerce} />;
}
