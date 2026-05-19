import { HomePageClient } from "./HomePageClient";
import { getHomePageModel } from "@/lib/cms/home";

export default async function HomePage() {
  const homePage = await getHomePageModel();

  return <HomePageClient homePage={homePage} />;
}
