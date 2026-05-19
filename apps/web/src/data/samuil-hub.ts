// Samuil Hub Page Data

import { Heart, Calendar, Users, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  quote: string;
  color: string;
}

export interface Value {
  icon: string;
  title: string;
  desc: string;
}

export interface SamuilHubPageData {
  hero: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  timeline: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    events: TimelineEvent[];
  };
  team: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  values: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    items: Value[];
  };
}

export const samuilHubPage: SamuilHubPageData = {
  hero: {
    icon: Heart,
    title: "Сърцето на Самуил",
    description:
      "От близо 20 години MERTMAX е част от ежедневието в Самуил. Работим за местните семейства и бизнеси с коректност, постоянство и човешко отношение.",
  },
  timeline: {
    icon: Calendar,
    title: "Нашата история",
    subtitle: "Как MERTMAX се промени през годините",
    events: [
      {
        year: "2005",
        title: "Основаване",
        description:
          "MERTMAX започва като малък семеен магазин в центъра на Самуил",
        image: "/images/timeline/2005.jpg",
      },
      {
        year: "2010",
        title: "Разширяване",
        description: "Добавяме направление за строителни материали",
        image: "/images/timeline/2010.jpg",
      },
      {
        year: "2015",
        title: "Модернизация",
        description:
          "Обновяваме магазините и въвеждаме по-практични решения за обслужване",
        image: "/images/timeline/2015.jpg",
      },
      {
        year: "2020",
        title: "Домашни потреби",
        description: "Добавяме посуда, текстил и дребни артикули за дома",
        image: "/images/timeline/2020.jpg",
      },
      {
        year: "2024",
        title: "Нов уебсайт",
        description:
          "Пускаме онлайн присъствие с информация за обектите и услугите",
        image: "/images/timeline/2024.jpg",
      },
    ],
  },
  team: {
    icon: Users,
    title: "Нашият екип",
    subtitle: "Хората, които посрещат клиентите всеки ден",
    members: [
      {
        name: "Мерт Максимов",
        role: "Основател & Управител",
        image: "/images/team/mert.jpg",
        quote: "Искаме хората да намират нужното близо до дома",
        color: "#3B82F6",
      },
      {
        name: "Елена Петрова",
        role: "Мениджър строителство",
        image: "/images/team/elena.jpg",
        quote: "Клиентът трябва да си тръгне с точния материал",
        color: "#EC4899",
      },
      {
        name: "Георги Иванов",
        role: "Мениджър Домашни потреби",
        image: "/images/team/georgi.jpg",
        quote: "Малките неща за дома често спестяват най-много време",
        color: "#8B5CF6",
      },
      {
        name: "Мария Димитрова",
        role: "Мениджър супермаркет",
        image: "/images/team/maria.jpg",
        quote: "Свежите продукти се познават още от щанда",
        color: "#EF4444",
      },
    ],
  },
  values: {
    icon: Award,
    title: "Нашите ценности",
    subtitle: "Как работим всеки ден",
    items: [
      {
        icon: "🤝",
        title: "Общност",
        desc: "Ние сме част от Самуил и работим за хората тук",
      },
      {
        icon: "✨",
        title: "Качество",
        desc: "Избираме продукти, които бихме взели и за собствените си домове",
      },
      {
        icon: "💚",
        title: "Доверие",
        desc: "Държим на честно отношение и постоянство",
      },
    ],
  },
};
