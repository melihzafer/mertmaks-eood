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
    subtitle: "Материали и инструменти за ремонт и строеж",
    description:
      "Строителни материали, бои, инструменти и консумативи за работа у дома или на обект",
  },
  categories: {
    title: "Категории продукти",
    subtitle: "Основните материали и инструменти са събрани на едно място",
    items: [
      {
        name: "Строителни материали",
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
          "Инструменти за майстори",
          "Ръчни инструменти",
          "Измервателни уреди",
          "Абразивни материали",
          "Принадлежности",
        ],
      },
      {
        name: "Бои и лакове",
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
        name: "Дърводелски материали",
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
        name: "Покривни материали",
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
    title: "Защо майсторите се връщат",
    items: [
      {
        icon: "🏗️",
        title: "Надеждни материали",
        desc: "Подбрани продукти за ремонт, строеж и поддръжка",
      },
      {
        icon: "📦",
        title: "По-големи количества",
        desc: "Условия за фирми и обемни поръчки",
      },
      {
        icon: "🚚",
        title: "Доставка",
        desc: "Доставка за големи поръчки в региона",
      },
    ],
  },
  cta: {
    title: "Условия за фирми и майстори",
    description:
      "За строителни фирми и майстори можем да уточним условия според обема и нужните материали.",
    buttonText: "Свържете се с нас",
    buttonLink: "/contact",
  },
};
