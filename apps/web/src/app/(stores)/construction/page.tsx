import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";

export default async function ConstructionPage() {
  const page = await getDivisionPageModel("construction");

  return <DivisionDetailPage page={page} />;
}
