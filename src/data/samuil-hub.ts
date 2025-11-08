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
      "От близо 20 години MERTMAX е неразделна част от общността в Самуил. Нашата мисия е да обслужваме местните семейства и бизнеси с качество, надеждност и топло отношение.",
  },
  timeline: {
    icon: Calendar,
    title: "Нашата История",
    subtitle: "Проследете пътуването на MERTMAX през годините",
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
        description: "Откриваме второ направление - строителни материали",
        image: "/images/timeline/2010.jpg",
      },
      {
        year: "2015",
        title: "Модернизация",
        description: "Обновяваме магазините и въвеждаме нови технологии",
        image: "/images/timeline/2015.jpg",
      },
      {
        year: "2020",
        title: "Промишлен Отдел",
        description: "Добавяме промишлени стоки към нашата гама",
        image: "/images/timeline/2020.jpg",
      },
      {
        year: "2024",
        title: "Дигитална Трансформация",
        description: "Стартираме нашата онлайн платформа и модерен уебсайт",
        image: "/images/timeline/2024.jpg",
      },
    ],
  },
  team: {
    icon: Users,
    title: "Нашият Екип",
    subtitle: "Запознайте се с хората, които правят MERTMAX специално място",
    members: [
      {
        name: "Мерт Максимов",
        role: "Основател & Управител",
        image: "/images/team/mert.jpg",
        quote: "Нашата мисия е да обслужваме общността с качество и сърце",
        color: "#3B82F6",
      },
      {
        name: "Елена Петрова",
        role: "Мениджър Строителство",
        image: "/images/team/elena.jpg",
        quote: "Всеки клиент заслужава най-добрите материали",
        color: "#EC4899",
      },
      {
        name: "Георги Иванов",
        role: "Мениджър Промишлени Стоки",
        image: "/images/team/georgi.jpg",
        quote: "Качеството е в детайлите",
        color: "#8B5CF6",
      },
      {
        name: "Мария Димитрова",
        role: "Мениджър Супермаркет",
        image: "/images/team/maria.jpg",
        quote: "Свежестта и качеството са нашият приоритет",
        color: "#EF4444",
      },
    ],
  },
  values: {
    icon: Award,
    title: "Нашите Ценности",
    subtitle: "Принципите, които ни водят всеки ден",
    items: [
      {
        icon: "🤝",
        title: "Общност",
        desc: "Ние сме част от Самуил и работим за благото на нашата общност",
      },
      {
        icon: "✨",
        title: "Качество",
        desc: "Предлагаме само продукти, които бихме използвали в собствените си домове",
      },
      {
        icon: "💚",
        title: "Доверие",
        desc: "Изграждаме дългосрочни отношения, базирани на честност и надеждност",
      },
    ],
  },
};
