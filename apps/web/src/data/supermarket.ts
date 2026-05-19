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
    subtitle: "Свежи продукти за дома и семейството",
    description:
      "Хранителни стоки, месо, млечни продукти, напитки и основни покупки за всеки ден",
  },
  categories: {
    title: "Категории продукти",
    subtitle: "Основните хранителни продукти са подредени по лесни категории",
    items: [
      {
        name: "Плодове и зеленчуци",
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
        name: "Месо и колбаси",
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
        name: "Млечни продукти",
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
        name: "Хлебни изделия",
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
        name: "Консерви и подправки",
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
    title: "Защо клиентите идват при нас",
    items: [
      {
        icon: "✓",
        title: "Свежи продукти",
        desc: "Плодове, зеленчуци и месо, които се зареждат редовно",
      },
      {
        icon: "€",
        title: "Добри цени",
        desc: "Практичен избор за ежедневната семейна кошница",
      },
      {
        icon: "♥",
        title: "Любезно обслужване",
        desc: "Екипът помага, когато търсите нещо конкретно",
      },
    ],
  },
};
