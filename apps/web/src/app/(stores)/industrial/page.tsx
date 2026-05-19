import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";
import { getStoreCommerceModel } from "@/lib/cms/store-commerce";

export default async function IndustrialPage() {
  const [page, commerce] = await Promise.all([
    getDivisionPageModel("industrial"),
    getStoreCommerceModel("industrial"),
  ]);

  return <DivisionDetailPage page={page} commerce={commerce} />;
}
