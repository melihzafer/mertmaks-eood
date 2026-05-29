// Weekly promotions static fallback data
// In production, these are fetched from Sanity CMS

export interface WeeklyPromotion {
  id: string;
  title: string;
  description: string;
  store: "supermarket" | "construction" | "industrial";
  category?: string;
  discount?: number;
  validFrom: string;
  validTo: string;
  active: boolean;
  image?: string;
  terms?: string[];
}

export const weeklyPromotions: WeeklyPromotion[] = [
  {
    id: "weekly-super-001",
    title: "Седмична оферта — напитки",
    description: "Вода, сокове и безалкохолни напитки с отстъпка за семейната покупка.",
    store: "supermarket",
    discount: 20,
    validFrom: "2026-05-01",
    validTo: "2026-08-31",
    active: true,
    image: "/images/products/beverages.png",
    terms: ["Валидно само в супермаркета", "Не се комбинира с други промоции", "Офертата важи до изчерпване на количествата"],
  },
  {
    id: "weekly-super-002",
    title: "Пресни плодове и зеленчуци",
    description: "Свежи продукти за трапезата, подбрани според сезона.",
    store: "supermarket",
    discount: 15,
    validFrom: "2026-05-01",
    validTo: "2026-07-31",
    active: true,
    image: "/images/products/fruits_veg.png",
    terms: ["Свежестта се проверява всеки ден", "Асортиментът се сменя според сезона"],
  },
  {
    id: "weekly-cons-001",
    title: "Инструменти за дребен ремонт",
    description: "Практични инструменти с намаление тази седмица.",
    store: "construction",
    discount: 10,
    validFrom: "2026-05-01",
    validTo: "2026-08-31",
    active: true,
    image: "/images/products/tools.png",
    terms: ["Консултация при избор", "Гаранцията зависи от продукта"],
  },
  {
    id: "weekly-ind-001",
    title: "Посуда за кухнята",
    description: "Подбрани чаши, чинии и дребни стоки с отстъпка.",
    store: "industrial",
    discount: 15,
    validFrom: "2026-05-01",
    validTo: "2026-09-30",
    active: true,
    image: "/images/products/kitchenware.png",
    terms: ["Важи за избрани артикули", "Количество според наличността"],
  },
];

export function getWeeklyPromotionsForStore(
  slug: string,
): WeeklyPromotion[] {
  const today = new Date().toISOString().slice(0, 10);
  return weeklyPromotions.filter(
    (p) =>
      p.store === slug &&
      p.active &&
      p.validFrom <= today &&
      p.validTo >= today,
  );
}
