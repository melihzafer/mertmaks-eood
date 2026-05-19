import { DivisionDetailPage } from "@/components/features/DivisionDetailPage";
import { getDivisionPageModel } from "@/lib/cms/divisions";

export default async function IndustrialPage() {
  const page = await getDivisionPageModel("industrial");

  return <DivisionDetailPage page={page} />;
}
