// Industrial Store Page Data

import { Wrench, Zap, Home, Shirt, Hammer, Lightbulb } from "lucide-react";
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
    icon: Wrench,
    title: "Промишлени Стоки MERTMAX",
    subtitle: "Всичко необходимо за дома и градината",
    description:
      "Разнообразна гама от промишлени продукти, инструменти и битови стоки за всяка нужда",
  },
  categories: {
    title: "Категории Продукти",
    subtitle: "Открийте нашата широка гама от промишлени стоки и инструменти",
    items: [
      {
        name: "Електроуреди",
        icon: Zap,
        items: [
          "Прахосмукачки",
          "Перални машини",
          "Хладилници",
          "Готварски уреди",
          "Климатици",
        ],
      },
      {
        name: "Дом и Градина",
        icon: Home,
        items: [
          "Градински инструменти",
          "Поливни системи",
          "Градинска мебел",
          "Обзавеждане",
          "Декорация",
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
        name: "Инструменти",
        icon: Hammer,
        items: [
          "Електроинструменти",
          "Градински машини",
          "Ръчни инструменти",
          "Резервни части",
          "Акумулаторни машини",
        ],
      },
      {
        name: "Осветление",
        icon: Lightbulb,
        items: [
          "LED осветление",
          "Лампи и абажури",
          "Външно осветление",
          "Осветителни тела",
          "Крушки и аксесоари",
        ],
      },
      {
        name: "Хигиенни и Почистващи",
        icon: Home,
        items: [
          "Препарати за почистване",
          "Хигиенни продукти",
          "Торби и чували",
          "Аксесоари за почистване",
          "Професионални препарати",
        ],
      },
    ],
  },
  features: {
    title: "Нашите Предимства",
    items: [
      {
        icon: "⭐",
        title: "Голямо Разнообразие",
        desc: "Хиляди продукти за всяка нужда на едно място",
      },
      {
        icon: "✓",
        title: "Качествени Продукти",
        desc: "Работим само с доказани производители",
      },
      {
        icon: "💡",
        title: "Експертни Съвети",
        desc: "Нашите специалисти са винаги на разположение",
      },
    ],
  },
};
