/**
 * Home Page Content Data
 * Hero section, divisions, promotions, and CTA content
 */

import {
  ShoppingCart,
  Building2,
  HardHat,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export interface DivisionData {
  title: string;
  description: string;
  image: string;
  href: string;
  iconName: "ShoppingCart" | "Building2" | "HardHat" | "UtensilsCrossed";
  accentColor: "grocery" | "industrial" | "construction" | "restaurant";
}

export interface PromotionData {
  id: number;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  color: string;
  store: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  backgroundImage: string;
}

export const heroContent: HeroContent = {
  title: "MERTMAX, сърцето на Самуил",
  subtitle: "Местни магазини за ежедневието в Самуил и Разград",
  cta: {
    primary: {
      text: "Разгледайте магазините",
      href: "#divisions",
    },
    secondary: {
      text: "Свържете се с нас",
      href: "/contact",
    },
  },
  backgroundImage:
    "https://images.unsplash.com/photo-1762439181518-15f8e01012a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXRhaWwlMjBzdG9yZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjU0MDAwMnww&ixlib=rb-4.1.0&q=80&w=1080",
};

export const divisions: DivisionData[] = [
  {
    title: "Супермаркет",
    description:
      "Свежи хранителни продукти, месо, млечни стоки и всичко нужно за деня.",
    image:
      "https://images.unsplash.com/photo-1714224247661-ee250f55a842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3VwZXJtYXJrZXQlMjBmcmVzaCUyMHByb2R1Y2V8ZW58MXx8fHwxNzYyNTQwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    href: "/supermarket",
    iconName: "ShoppingCart",
    accentColor: "grocery",
  },
  {
    title: "Домашни потреби",
    description:
      "Посуда, текстил, козметика и дребни стоки, които често трябват у дома.",
    image:
      "https://images.unsplash.com/photo-1613489763341-1a3603e11d61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZ29vZHMlMjBoYXJkd2FyZSUyMHN0b3JlfGVufDF8fHx8MTc2MjU0MDAwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    href: "/industrial",
    iconName: "Building2",
    accentColor: "industrial",
  },
  {
    title: "Строителство",
    description:
      "Строителни материали, инструменти и консумативи за ремонт и обект.",
    image:
      "https://images.unsplash.com/photo-1758609554573-81474880be44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBidWlsZGluZyUyMHN1cHBsaWVzfGVufDF8fHx8MTc2MjU0MDAwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    href: "/construction",
    iconName: "HardHat",
    accentColor: "construction",
  },
  {
    title: "Ресторант",
    description: "Готвена българска кухня и спокойно място за обяд или вечеря.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nJTIwdHJhZGl0aW9uYWwlMjBidWxnYXJpYW58ZW58MXx8fHwxNzYyNTQwMDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    href: "/restaurant",
    iconName: "UtensilsCrossed",
    accentColor: "restaurant",
  },
];

// Mock promotions data. In production, this would come from Firestore.
export const promotions: PromotionData[] = [
  {
    id: 1,
    title: "Свежи плодове",
    description: "20% отстъпка на сезонни плодове",
    price: "2.99 лв/кг",
    originalPrice: "3.99 лв/кг",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
    color: "#E53E3E",
    store: "Супермаркет",
  },
  {
    id: 2,
    title: "Домашни потреби",
    description: "Подбрани дребни стоки за кухнята и дома",
    price: "79.99 лв",
    originalPrice: "99.99 лв",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
    color: "#D53F8C",
    store: "Домашни потреби",
  },
  {
    id: 3,
    title: "Боя за стени",
    description: "15% отстъпка на всички интериорни бои",
    price: "12.99 лв/л",
    originalPrice: "14.99 лв/л",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
    color: "#2563EB",
    store: "Строителство",
  },
];

export interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export const ctaContent: CTAContent = {
  title: "Елате на място или ни пишете.",
  description:
    "Посетете някой от обектите или се свържете с нас за точна информация.",
  buttonText: "Свържете се с нас",
  buttonHref: "/contact",
};
