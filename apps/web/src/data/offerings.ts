// Offerings data — what each store division offers (services, conveniences, guarantees)

export type OfferingIconName =
  | "truck"
  | "credit-card"
  | "tag"
  | "phone"
  | "clock"
  | "shield"
  | "sparkles"
  | "package-check";

export interface OfferingItem {
  icon: OfferingIconName;
  title: string;
  description: string;
}

export interface DivisionOfferings {
  title: string;
  subtitle: string;
  items: OfferingItem[];
}

export const divisionOfferings: Record<string, DivisionOfferings> = {
  supermarket: {
    title: "Какво предлагаме",
    subtitle: "Услуги и удобства в супермаркета",
    items: [
      {
        icon: "clock",
        title: "Работно време 7 дни",
        description: "Отворено всеки ден с удобни часове — рано сутрин до вечер.",
      },
      {
        icon: "tag",
        title: "Седмични и месечни промоции",
        description: "Редовни оферти на основни продукти, обявявани предварително.",
      },
      {
        icon: "credit-card",
        title: "Плащане с карта",
        description: "Безналично плащане на място за бързо и удобно пазаруване.",
      },
      {
        icon: "phone",
        title: "Предварително запитване",
        description: "Обадете се, за да проверите наличността на конкретен продукт.",
      },
    ],
  },
  construction: {
    title: "Какво предлагаме",
    subtitle: "Услуги и удобства в строителния магазин",
    items: [
      {
        icon: "truck",
        title: "Доставка за обекта",
        description: "Доставка на строителни материали в района по уговорка.",
      },
      {
        icon: "tag",
        title: "Отстъпки за обем",
        description: "По-добри цени при по-големи поръчки за фирми и майстори.",
      },
      {
        icon: "shield",
        title: "Консултация при избор",
        description: "Съвет за подходящите материали според обекта и бюджета.",
      },
      {
        icon: "package-check",
        title: "Проверка на наличност",
        description: "Запитване по телефона преди да пътувате за по-големи количества.",
      },
    ],
  },
  industrial: {
    title: "Какво предлагаме",
    subtitle: "Услуги и удобства в магазина за домашни потреби",
    items: [
      {
        icon: "sparkles",
        title: "Разнообразен избор",
        description: "Посуда, текстил, козметика и канцелария на едно място.",
      },
      {
        icon: "tag",
        title: "Сезонни намаления",
        description: "Месечни промоции на практични стоки за дома.",
      },
      {
        icon: "credit-card",
        title: "Плащане на място",
        description: "Карта и брой за бързи ежедневни покупки.",
      },
      {
        icon: "phone",
        title: "Запитване за наличност",
        description: "Обадете се, за да проверите дали желаният артикул е в магазина.",
      },
    ],
  },
};

export function getOfferingsForStore(slug: string): DivisionOfferings | undefined {
  return divisionOfferings[slug];
}
