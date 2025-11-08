// Construction Store Page Data

import { HardHat, Hammer, PaintBucket, Drill, Ruler, Box } from "lucide-react";
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

export interface ConstructionPageData {
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
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

export const constructionPage: ConstructionPageData = {
  hero: {
    icon: HardHat,
    title: "Строителство MERTMAX",
    subtitle: "Професионални решения за всеки строителен проект",
    description:
      "Висококачествени строителни материали, инструменти и всичко необходимо за вашия проект",
  },
  categories: {
    title: "Категории Продукти",
    subtitle:
      "Открийте нашата професионална гама от строителни материали и инструменти",
    items: [
      {
        name: "Строителни Материали",
        icon: Box,
        items: [
          "Циментови разтвори",
          "Мазилки и шпакловки",
          "Тухли и блокове",
          "Арматура и мрежи",
          "Изолационни материали",
        ],
      },
      {
        name: "Инструменти",
        icon: Hammer,
        items: [
          "Професионални инструменти",
          "Ръчни инструменти",
          "Измервателни уреди",
          "Абразивни материали",
          "Принадлежности",
        ],
      },
      {
        name: "Бои и Лакове",
        icon: PaintBucket,
        items: [
          "Фасадни бои",
          "Интериорни бои",
          "Лакове и грундове",
          "Бои за дърво и метал",
          "Четки и валяци",
        ],
      },
      {
        name: "Дърводелски Материали",
        icon: Ruler,
        items: [
          "Дървен материал",
          "ПДЧ и МДФ",
          "Фазер",
          "Първази и лайсни",
          "Дърводелски инструменти",
        ],
      },
      {
        name: "Електро и ВиК",
        icon: Drill,
        items: [
          "Тръби и фитинги",
          "Електрически материали",
          "Кабели и проводници",
          "Смесители и санитария",
          "Отоплителни системи",
        ],
      },
      {
        name: "Покривни Материали",
        icon: HardHat,
        items: [
          "Керемиди",
          "Хидроизолация",
          "Улуци и водосточни",
          "Термоизолация",
          "Покривни елементи",
        ],
      },
    ],
  },
  features: {
    title: "Защо Професионалистите Ни Избират",
    items: [
      {
        icon: "🏗️",
        title: "Професионално Качество",
        desc: "Материали от водещи европейски производители",
      },
      {
        icon: "📦",
        title: "Големи Количества",
        desc: "Специални цени за фирми и обемни поръчки",
      },
      {
        icon: "🚚",
        title: "Доставка",
        desc: "Безплатна доставка за големи поръчки в региона",
      },
    ],
  },
  cta: {
    title: "Специални Оферти за Фирми",
    description:
      "Предлагаме индивидуални условия за строителни фирми и занаятчии. Свържете се с нас за повече информация.",
    buttonText: "Свържете Се с Нас",
    buttonLink: "/contact",
  },
};
