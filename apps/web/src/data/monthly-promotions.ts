// Monthly promotions static fallback data
// In production, these are fetched from Sanity CMS

export interface MonthlyPromotion {
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

export const monthlyPromotions: MonthlyPromotion[] = [
  {
    id: "monthly-super-001",
    title: "Млечни продукти — месечна оферта",
    description: "Мляко, сирена, кашкавал и яйца с намаление през целия месец.",
    store: "supermarket",
    discount: 10,
    validFrom: "2026-05-01",
    validTo: "2026-05-31",
    active: true,
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=600&fit=crop",
    terms: ["Валидно през май", "Не се комбинира с други промоции"],
  },
  {
    id: "monthly-cons-001",
    title: "Бои и покрития — майска кампания",
    description: "Фасадни и интериорни бои, грундове и аксесоари с отстъпка.",
    store: "construction",
    discount: 25,
    validFrom: "2026-05-01",
    validTo: "2026-05-31",
    active: true,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=600&fit=crop",
    terms: ["Валидно за избрани марки", "Цветовете се уточняват на място"],
  },
  {
    id: "monthly-ind-001",
    title: "Текстил за дома — май",
    description: "Кърпи, спално бельо и домашен текстил с намаление.",
    store: "industrial",
    discount: 20,
    validFrom: "2026-05-01",
    validTo: "2026-05-31",
    active: true,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6a?w=800&h=600&fit=crop",
    terms: ["Важи за наличните цветове и размери", "Не се комбинира с други промоции"],
  },
];

export function getMonthlyPromotionsForStore(
  slug: string,
): MonthlyPromotion[] {
  const today = new Date().toISOString().slice(0, 10);
  return monthlyPromotions.filter(
    (p) =>
      p.store === slug &&
      p.active &&
      p.validFrom <= today &&
      p.validTo >= today,
  );
}
