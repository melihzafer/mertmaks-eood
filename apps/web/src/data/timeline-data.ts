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
    title: "Начало на мечтата",
    description:
      "MERTMAX откри врати като малък семеен магазин в сърцето на Самуил. С фокус върху качеството и лично отношение към всеки клиент.",
    icon: Store,
    color: "#E53E3E",
  },
  {
    year: "2010",
    title: "Разширение на услугите",
    description:
      "Добавихме домашни потреби, текстил, посуда и дребни нехранителни стоки за ежедневните нужди в Самуил.",
    icon: Building2,
    color: "#D53F8C",
  },
  {
    year: "2015",
    title: "Строителна база",
    description:
      "Отворихме специализиран магазин за строителни материали, давайки възможност на местните строители да намират всичко на едно място.",
    icon: Building2,
    color: "#2563EB",
  },
  {
    year: "2018",
    title: "Над 100 работни места",
    description:
      "Гордо обявихме, че сме създали над 100 работни места за хора от Самуил и региона, ставайки един от най-големите работодатели.",
    icon: Users,
    color: "#38A169",
  },
  {
    year: "2020",
    title: "Модернизация",
    description:
      "Обновихме всички наши обекти с модерно оборудване и внедрихме нови технологии за по-добро обслужване.",
    icon: TrendingUp,
    color: "#F687B3",
  },
  {
    year: "2023",
    title: "Награда за принос",
    description:
      "Получихме общинска награда за принос към икономическото развитие на региона и социална отговорност.",
    icon: Award,
    color: "#DD6B20",
  },
  {
    year: "2025",
    title: "Бъдеще заедно",
    description:
      "Продължаваме да растем и да служим на нашата общност, като градим мостове между традицията и иновацията.",
    icon: Sparkles,
    color: "#0BC5EA",
  },
];
