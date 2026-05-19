// Supermarket Page Data

import {
  ShoppingCart,
  Apple,
  Beef,
  Milk,
  Sandwich,
  Coffee,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Category {
  name: string;
  icon: LucideIcon;
  items: string[];
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface SupermarketPageData {
  hero: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    description: string;
  };
  categories: {
    title: string;
    subtitle: string;
    items: Category[];
  };
  features: {
    title: string;
    items: Feature[];
  };
}

export const supermarketPage: SupermarketPageData = {
  hero: {
    icon: ShoppingCart,
    title: "Супермаркет MERTMAX",
    subtitle: "Свежи и качествени продукти за вашето семейство",
    description:
      "Ежедневни доставки на свежи хранителни стоки, месо, млечни продукти и много други",
  },
  categories: {
    title: "Категории Продукти",
    subtitle: "Открийте нашата широка гама от качествени хранителни продукти",
    items: [
      {
        name: "Плодове и Зеленчуци",
        icon: Apple,
        items: [
          "Свежи плодове",
          "Сезонни зеленчуци",
          "Органични продукти",
          "Екзотични плодове",
          "Ядки и сушени плодове",
        ],
      },
      {
        name: "Месо и Колбаси",
        icon: Beef,
        items: [
          "Прясно месо",
          "Месни деликатеси",
          "Традиционни колбаси",
          "Пилешко месо",
          "Риба и морски дарове",
        ],
      },
      {
        name: "Млечни Продукти",
        icon: Milk,
        items: [
          "Мляко и кисело мляко",
          "Сирена",
          "Кашкавал",
          "Масло",
          "Извара и млечни десерти",
        ],
      },
      {
        name: "Хлебни Изделия",
        icon: Sandwich,
        items: [
          "Пресен хляб",
          "Пити и баници",
          "Козунаци",
          "Сухи закуски",
          "Кексове и бисквити",
        ],
      },
      {
        name: "Напитки",
        icon: Coffee,
        items: [
          "Безалкохолни напитки",
          "Минерална вода",
          "Сокове",
          "Кафе и чай",
          "Енергийни напитки",
        ],
      },
      {
        name: "Консерви и Подправки",
        icon: Package,
        items: [
          "Консервирани продукти",
          "Зехтин и олио",
          "Подправки",
          "Сосове и дресинги",
          "Макаронени изделия",
        ],
      },
    ],
  },
  features: {
    title: "Защо Да Изберете Нас",
    items: [
      {
        icon: "✓",
        title: "Свежи Продукти",
        desc: "Ежедневни доставки на свежи плодове, зеленчуци и месо",
      },
      {
        icon: "€",
        title: "Конкурентни Цени",
        desc: "Отлично съотношение качество-цена",
      },
      {
        icon: "♥",
        title: "Любезно Обслужване",
        desc: "Нашият екип винаги е готов да ви помогне",
      },
    ],
  },
};
