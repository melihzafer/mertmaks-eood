/**
 * Timeline Data
 * Company history and milestone events
 */

import {
  Store,
  Building2,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2005",
    title: "Начало",
    description:
      "MERTMAX отваря като малък семеен магазин в центъра на Самуил с лично отношение към клиентите.",
    icon: Store,
    color: "#E53E3E",
  },
  {
    year: "2010",
    title: "Повече стоки за дома",
    description:
      "Добавихме домашни потреби, текстил, посуда и дребни нехранителни стоки за ежедневните нужди в Самуил.",
    icon: Building2,
    color: "#D53F8C",
  },
  {
    year: "2015",
    title: "Строителна база",
    description:
      "Отваряме специализиран магазин за строителни материали, за да могат майстори и домакинства да пазаруват по-близо.",
    icon: Building2,
    color: "#2563EB",
  },
  {
    year: "2018",
    title: "Над 100 работни места",
    description:
      "Създадени са над 100 работни места за хора от Самуил и региона.",
    icon: Users,
    color: "#38A169",
  },
  {
    year: "2020",
    title: "Модернизация",
    description:
      "Обновяваме обектите с по-добро оборудване и по-удобно обслужване.",
    icon: TrendingUp,
    color: "#F687B3",
  },
  {
    year: "2023",
    title: "Награда за принос",
    description:
      "Получаваме общинска награда за принос към икономическото развитие на региона и социална отговорност.",
    icon: Award,
    color: "#DD6B20",
  },
  {
    year: "2025",
    title: "Продължаваме заедно",
    description:
      "Продължаваме да развиваме обектите около нуждите на местните хора.",
    icon: Sparkles,
    color: "#0BC5EA",
  },
];
