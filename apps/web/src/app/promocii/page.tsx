import type { Metadata } from "next";
import { fetchSanity } from "@/lib/sanity/fetch";
import { allPromotionsQuery, contentTags } from "@mertmaks/content/queries";
import { sanityImageUrl } from "@/lib/sanity/image";
import { formatPrice } from "@/lib/utils";
import { accents } from "@/data/redesign-content";
import { buildMetadata } from "@/lib/seo";
import { PromotionsClient } from "./PromotionsClient";
import type { PromotionItem } from "./PromotionsClient";

export const dynamic = "force-dynamic";

interface SanityPromotion {
  _id: string;
  title: string;
  description?: string;
  label?: string;
  discount?: number;
  promoType?: string;
  oldPrice?: string;
  newPrice?: string;
  showPrice?: string;
  validFrom?: string;
  validTo?: string;
  terms?: string[];
  image?: any;
  shareTitle?: string;
  shareDescription?: string;
  shareImage?: any;
  brochureAccent?: string;
  store?: {
    name?: string;
    slug?: { current?: string };
    type?: string;
    accent?: string;
    phone?: string;
    email?: string;
    hours?: any;
  };
  category?: {
    title?: string;
    slug?: { current?: string };
  };
}

const colorByStoreType: Record<string, string> = {
  supermarket: accents.supermarket,
  industrial: accents.industrial,
  construction: accents.construction,
  restaurant: accents.restaurant,
};

function mapSanityPromotion(item: SanityPromotion, index: number): PromotionItem {
  const storeType = item.store?.type || "supermarket";
  const storeSlug = item.store?.slug?.current || storeType;
  
  const imageUrl = sanityImageUrl(item.shareImage ?? item.image)
    ?.width(1000)
    .height(750)
    .fit("crop")
    .url() ?? undefined;

  return {
    id: item._id ?? `promocii-item-${index}`,
    title: item.shareTitle ?? item.title ?? "Промоция",
    description: item.shareDescription ?? item.description ?? "",
    label: item.label ?? (item.discount ? `${item.discount}% отстъпка` : undefined),
    discount: item.discount,
    promoType: item.promoType,
    oldPrice: formatPrice(item.oldPrice),
    newPrice: formatPrice(item.newPrice),
    showPrice: item.showPrice,
    validFrom: item.validFrom,
    validTo: item.validTo,
    terms: item.terms ?? [],
    imageUrl,
    storeName: item.store?.name ?? "Обект",
    storeSlug,
    storePhone: item.store?.phone,
    storeHours: item.store?.hours,
    categoryName: item.category?.title ?? "Общи",
    accentColor: item.brochureAccent ?? item.store?.accent ?? colorByStoreType[storeType] ?? accents.supermarket,
    kind: "promotion" as const,
    canonicalUrl: `/${storeSlug}`,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/promocii",
    fallbackTitle: "Актуални промоции и оферти – МЕРТМАКС",
    fallbackDescription:
      "Разгледайте всички актуални промоции, седмични намаления и оферти от Супермаркет, Домашни потреби, Строителни материали и ресторант Делиорман в Самуил.",
  });
}

export default async function PromociiPage() {
  const today = new Date().toISOString().slice(0, 10);
  
  const sanityPromos = await fetchSanity<SanityPromotion[]>(allPromotionsQuery, {
    params: { today },
    tags: [contentTags.promotions],
  });

  const promotions = (sanityPromos ?? []).map((item, index) => mapSanityPromotion(item, index));

  return (
    <main className="bg-[#FAF8F5] min-h-screen py-16 md:py-24 text-[#1A1A1A]">
      <div className="container mx-auto max-w-6xl px-4 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-red-600 bg-red-50 border border-red-100/50 px-3 py-1 rounded-full font-bold">
            Спестете с МЕРТМАКС
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
            Актуални Промоции & Оферти
          </h1>
          <p className="text-lg text-neutral-500 font-medium">
            Разгледайте всички текущи намаления, оферти и специални предложения за всички наши обекти в с. Самуил.
          </p>
        </div>

        <PromotionsClient promotions={promotions} />
      </div>
    </main>
  );
}
