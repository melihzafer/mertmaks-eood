import { FindUsClient } from "@/components/ar/FindUsClient";
import { getStoresForFinder } from "@/lib/stores";

export default function FindUsPage() {
  const stores = getStoresForFinder();
  return <FindUsClient stores={stores} />;
}
