// Home goods / non-food store page data

import {
  Home,
  Shirt,
  Sparkles,
  NotebookPen,
  CookingPot,
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

export interface IndustrialPageData {
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

export const industrialPage: IndustrialPageData = {
  hero: {
    icon: Home,
    title: "Домашни потреби MERTMAX",
    subtitle: "Нехранителни стоки за дома и ежедневието",
    description:
      "Посуда, текстил, козметика, канцелария и дребни полезни стоки на достъпни цени",
  },
  categories: {
    title: "Категории продукти",
    subtitle: "Открийте практични нехранителни стоки за всяка стая и задача",
    items: [
      {
        name: "Кухня и посуда",
        icon: CookingPot,
        items: [
          "Чаши и чинии",
          "Прибори и купи",
          "Кутии за съхранение",
          "Кухненски аксесоари",
          "Ежедневни консумативи",
        ],
      },
      {
        name: "Дом и организация",
        icon: Home,
        items: [
          "Кутии и кошници",
          "Закачалки и органайзери",
          "Почистващи аксесоари",
          "Декорация",
          "Сезонни артикули",
        ],
      },
      {
        name: "Текстил",
        icon: Shirt,
        items: [
          "Спално бельо",
          "Хавлиени изделия",
          "Завеси и пердета",
          "Килими",
          "Домашен текстил",
        ],
      },
      {
        name: "Козметика и парфюмерия",
        icon: Sparkles,
        items: [
          "Хигиенни продукти",
          "Парфюмерия",
          "Аксесоари",
          "Грижа за дома",
          "Дребна козметика",
        ],
      },
      {
        name: "Канцелария",
        icon: NotebookPen,
        items: [
          "Тетрадки и химикали",
          "Хартия и папки",
          "Училищни аксесоари",
          "Лепила и ножици",
          "Малки офис нужди",
        ],
      },
      {
        name: "Дребни стоки",
        icon: Package,
        items: [
          "Полезни находки",
          "Сезонни продукти",
          "Малки подаръци",
          "Аксесоари за ежедневието",
          "Домашни потреби",
        ],
      },
    ],
  },
  features: {
    title: "Защо клиентите се връщат",
    items: [
      {
        icon: "⭐",
        title: "Много избор",
        desc: "Практични продукти за дома, събрани на едно място",
      },
      {
        icon: "✓",
        title: "Достъпни покупки",
        desc: "Подходящо за ежедневни нехранителни нужди",
      },
      {
        icon: "💡",
        title: "Лесно ориентиране",
        desc: "Категории по реална нужда, не по складова логика",
      },
    ],
  },
};
