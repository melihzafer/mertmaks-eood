import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";

export default async function SupermarketPage() {
  const page = await getDivisionPageModel("supermarket");

  return <DivisionDetailPage page={page} />;
}
