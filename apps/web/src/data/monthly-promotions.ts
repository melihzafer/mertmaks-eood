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
  promoType?: string;
  oldPrice?: string;
  newPrice?: string;
  showPrice?: string;
}

export const monthlyPromotions: MonthlyPromotion[] = [
  {
    id: "monthly-super-001",
    title: "Млечни продукти — месечна оферта",
    description: "Мляко, сирена, кашкавал и яйца с намаление през целия месец.",
    store: "supermarket",
    discount: 10,
    validFrom: "2026-07-01",
    validTo: "2026-08-31",
    active: true,
    image: "/images/products/dairy.png",
    terms: ["Валидно през юли и август", "Не се комбинира с други промоции"],
  },
  {
    id: "monthly-cons-001",
    title: "Бои и покрития — лятна кампания",
    description: "Фасадни и интериорни бои, грундове и аксесоари с отстъпка.",
    store: "construction",
    discount: 25,
    validFrom: "2026-07-01",
    validTo: "2026-08-31",
    active: true,
    image: "/images/products/paints.png",
    terms: ["Валидно за избрани марки", "Цветовете се уточняват на място"],
  },
  {
    id: "monthly-ind-001",
    title: "Текстил за дома — летни оферти",
    description: "Кърпи, спално бельо и домашен текстил с намаление.",
    store: "industrial",
    discount: 20,
    validFrom: "2026-07-01",
    validTo: "2026-08-31",
    active: true,
    image: "/images/products/textiles.png",
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
