export const brand = {
  name: "МЕРТМАКС",
  legalForm: "ЕООД",
  tagline: "Сърцето на Самуил",
  footerText:
    "Сърцето на Самуил — магазини, услуги и ресторант за местната общност.",
  location: "с. Самуил, област Разград",
  hours: "Отворено 7 дни в седмицата",
};

export const accents = {
  supermarket: "#E53E3E",
  supermarketAccent: "#DD6B20",
  industrial: "#D53F8C",
  industrialAccent: "#805AD5",
  construction: "#3182CE",
  constructionAccent: "#D69E2E",
  restaurant: "#C05621",
  restaurantAccent: "#ED8936",
};

export const searchLinks = [
  { href: "/supermarket", label: "Хранителни стоки" },
  { href: "/construction", label: "Строителни материали" },
  { href: "/restaurant", label: "Ресторант Делиорман" },
  { href: "/contact", label: "Адрес в Самуил" },
];

export const mobileLinks = [
  { href: "/", label: "Начало" },
  { href: "/supermarket", label: "Супермаркет" },
  { href: "/industrial", label: "Индустриален" },
  { href: "/construction", label: "Строителство" },
  { href: "/restaurant", label: "Ресторант" },
  { href: "/contact", label: "Контакти" },
];

export const footerLinks = [
  { href: "/supermarket", label: "Супермаркет", color: accents.supermarket },
  { href: "/industrial", label: "Индустриален", color: accents.industrial },
  { href: "/construction", label: "Строителство", color: accents.construction },
  { href: "/restaurant", label: "Ресторант", color: accents.restaurant },
];

export const homePage = {
  hero: {
    eyebrow: brand.tagline,
    title: "МЕРТМАКС — Сърцето на Самуил",
    lead: "Три магазина под един покрив. Всичко, от което се нуждаете — от ежедневни покупки до строителни решения и топла храна в Делиорман.",
    primaryCta: { href: "/contact", label: "Намери ни" },
    secondaryCta: { href: "#stores", label: "Разгледай магазините" },
  },
  stripes: [
    {
      href: "/supermarket",
      color: accents.supermarket,
      index: "01",
      title: "Супермаркет",
      label: "ежедневно",
    },
    {
      href: "/industrial",
      color: accents.industrial,
      index: "02",
      title: "Индустриален",
      label: "инструменти",
    },
    {
      href: "/construction",
      color: accents.construction,
      index: "03",
      title: "Строителство",
      label: "материали",
    },
    {
      href: "/restaurant",
      color: accents.restaurant,
      index: "04",
      title: "Делиорман",
      label: "кухня",
    },
  ],
  stats: [
    { value: 3, suffix: "", label: "магазина" },
    { value: 20, suffix: "+", label: "години" },
    { value: 100, suffix: "+", label: "марки" },
    { value: 7, suffix: "", label: "дни" },
  ],
  divisions: [
    {
      href: "/supermarket",
      color: accents.supermarket,
      index: "01",
      visual: "Пазар",
      title: "Супермаркет",
      description: "Ежедневни продукти, свежи стоки и познати марки за дома.",
    },
    {
      href: "/industrial",
      color: accents.industrial,
      index: "02",
      visual: "Машини",
      title: "Индустриален",
      description:
        "Инструменти, крепежи и консумативи за работа без прекъсване.",
    },
    {
      href: "/construction",
      color: accents.construction,
      index: "03",
      visual: "Обект",
      title: "Строителство",
      description: "Материали, бои и решения за ремонти, майстори и строежи.",
    },
    {
      href: "/restaurant",
      color: accents.restaurant,
      index: "04",
      visual: "Делиорман",
      title: "Ресторант",
      description:
        "Топла кухня, семейни срещи и познат вкус в центъра на Самуил.",
    },
  ],
  promotions: [
    {
      category: "food",
      color: accents.supermarket,
      label: "седмична оферта",
      visual: "Свежи продукти",
      title: "Основни продукти",
      description: "Подбрани артикули за семейната трапеза.",
    },
    {
      category: "tools",
      color: accents.industrial,
      label: "ново",
      visual: "Работилница",
      title: "Комплект инструменти",
      description: "Практичен избор за дома и професионалисти.",
    },
    {
      category: "home",
      color: accents.construction,
      label: "сезонно",
      visual: "Ремонт",
      title: "Бои и материали",
      description: "Решения за освежаване преди новия сезон.",
    },
  ],
  cta: {
    eyebrow: "Самуил, Разград",
    title: "Местен център за покупки, работа и срещи.",
    description:
      "МЕРТМАКС събира най-нужното за селото в ясно разпознаваеми цветни пространства.",
  },
};

export const divisionPages = {
  supermarket: {
    accent: accents.supermarket,
    heroIndex: "01 / Супермаркет",
    title: "Всичко за ежедневната трапеза.",
    description:
      "Свежи продукти, основни хранителни стоки, напитки и домашни потреби — подредени бързо, ясно и близо до хората в Самуил.",
    intro: {
      index: "01",
      eyebrow: "Категории",
      title: "Пазаруване без обикаляне.",
    },
    cards: [
      {
        wide: true,
        icon: "МЛ",
        title: "Млечни и пресни",
        items: [
          "Мляко, сирена, кашкавал",
          "Яйца и охладени продукти",
          "Ежедневно зареждане",
        ],
      },
      {
        icon: "ПЛ",
        title: "Плодове и зеленчуци",
        items: ["Сезонни артикули", "Местни предпочитания"],
      },
      {
        icon: "ДМ",
        title: "Домашни потреби",
        items: ["Почистващи", "Кухненски консумативи"],
      },
      {
        wide: true,
        icon: "НП",
        title: "Напитки и пакетирани стоки",
        items: ["Основни марки", "Сладки, солени, кафе", "Семейни опаковки"],
      },
    ],
    features: [
      {
        index: "01",
        title: "Бърза покупка",
        description: "Ясни зони и кратък път за ежедневни нужди.",
      },
      {
        index: "02",
        title: "Познати марки",
        description: "Асортимент, който местните клиенти търсят редовно.",
      },
      {
        index: "03",
        title: "7 дни",
        description: "Удобство за работни дни, уикенди и празници.",
      },
    ],
  },
  industrial: {
    accent: accents.industrial,
    heroIndex: "02 / Индустриален",
    title: "Инструменти и консумативи за работа.",
    description:
      "От крепежи до техника — индустриалният магазин помага на майстори, земеделци и домакинства да завършат задачата навреме.",
    cards: [
      {
        wide: true,
        icon: "ИН",
        title: "Ръчни инструменти",
        items: [
          "Ключове, клещи, отвертки",
          "Измерване и маркиране",
          "Практични комплекти",
        ],
      },
      { icon: "КР", title: "Крепежи", items: ["Винтове", "Дюбели", "Скоби"] },
      {
        icon: "ЕЛ",
        title: "Електро",
        items: ["Кабели", "Ключове", "Осветление"],
      },
      {
        wide: true,
        icon: "ЗА",
        title: "Защита и консумативи",
        items: [
          "Ръкавици и очила",
          "Лепила, силикони, масла",
          "Бързо допълване за обекта",
        ],
      },
    ],
    features: [
      {
        index: "01",
        title: "За майстори",
        description: "Артикули за ремонт, сервиз и работилница.",
      },
      {
        index: "02",
        title: "На място",
        description: "Нужните дреболии са близо, без път до града.",
      },
      {
        index: "03",
        title: "Ясна подредба",
        description: "Категории по задача, не по складова логика.",
      },
    ],
  },
  construction: {
    accent: accents.construction,
    diagonal: accents.constructionAccent,
    heroIndex: "03 / Строителство",
    title: "Силен син магазин за сериозни ремонти.",
    description:
      "Материали, бои, сухи смеси и строителни решения за дома, двора и обекта — с жълт safety акцент за бързо ориентиране.",
    cards: [
      {
        wide: true,
        icon: "БО",
        title: "Бои и покрития",
        items: [
          "Интериорни и фасадни бои",
          "Грундове и лакове",
          "Инструменти за боядисване",
        ],
      },
      {
        icon: "СМ",
        title: "Сухи смеси",
        items: ["Лепила", "Шпакловки", "Замазки"],
      },
      { icon: "ВК", title: "ВиК", items: ["Тръби", "Фитинги", "Уплътнения"] },
      {
        wide: true,
        icon: "ДВ",
        title: "Дом и двор",
        items: ["Градински материали", "Дребен ремонт", "Сезонни решения"],
      },
    ],
    features: [
      {
        index: "01",
        title: "Материали",
        description: "Подбрани основни продукти за ремонт без излишен избор.",
      },
      {
        index: "02",
        title: "Съвет",
        description: "Ориентиране по задача и нужните допълнения към нея.",
      },
      {
        index: "03",
        title: "Готовност",
        description: "Бързо вземане на пропуснати материали от обекта.",
      },
    ],
  },
};

export type DivisionPageKey = keyof typeof divisionPages;

export const restaurantPage = {
  accent: accents.restaurant,
  heroIndex: "04 / Ресторант Делиорман",
  title: "Топла кухня и място за срещи.",
  description:
    "Делиорман е ресторантът към МЕРТМАКС — за обяд, семейна вечеря и бърза среща в центъра на Самуил.",
  promos: [
    {
      color: accents.restaurant,
      visual: "Топла витрина",
      title: "Домашни ястия",
      description: "Ежедневни предложения според сезона.",
    },
    {
      color: accents.restaurantAccent,
      visual: "Скара",
      title: "Скара и гарнитури",
      description: "Бърз избор за обяд или вечеря.",
    },
    {
      color: accents.restaurant,
      visual: "Салати",
      title: "Свежи салати",
      description: "Леки комбинации към основното меню.",
    },
  ],
};

export const contactPage = {
  hero: {
    eyebrow: "Контакти",
    title: "Всички пътища водят към МЕРТМАКС.",
    lead: "Пишете ни, обадете се или минете през центъра на Самуил. Магазините и ресторантът са близо един до друг, за да свършите повече с едно посещение.",
  },
  stores: [
    {
      href: "/supermarket",
      color: accents.supermarket,
      index: "01",
      title: "Супермаркет",
      description: "Ежедневни покупки, свежи продукти и стоки за дома.",
    },
    {
      href: "/industrial",
      color: accents.industrial,
      index: "02",
      title: "Индустриален магазин",
      description: "Инструменти, крепежи и консумативи за работа.",
    },
    {
      href: "/construction",
      color: accents.construction,
      index: "03",
      title: "Строителство",
      description: "Материали за ремонт, обект и поддръжка.",
    },
    {
      href: "/restaurant",
      color: accents.restaurant,
      index: "04",
      title: "Ресторант Делиорман",
      description: "Топла кухня, обедно меню и място за срещи.",
    },
  ],
  topics: [
    "Супермаркет",
    "Индустриален магазин",
    "Строителство",
    "Ресторант Делиорман",
    "Общ въпрос",
  ],
};

export const samuilHubPage = {
  eyebrow: "История / Самуил Hub",
  title: "Местен бизнес с четири цветни лица.",
  lead: "МЕРТМАКС расте около реалните нужди на селото: храна, инструменти, строителни материали и място за срещи.",
  events: [
    {
      color: accents.supermarket,
      title: "2005",
      description:
        "Начало на местното присъствие и първите ежедневни покупки за Самуил.",
    },
    {
      color: accents.industrial,
      title: "Разширяване",
      description:
        "Добавяне на индустриални артикули за работа, ремонт и земеделски нужди.",
    },
    {
      color: accents.construction,
      title: "Строителна посока",
      description:
        "Материали и решения за домове, дворове и малки обекти в района.",
    },
    {
      color: accents.restaurant,
      title: "Делиорман",
      description:
        "Ресторантът превръща комплекса в място не само за покупки, но и за срещи.",
    },
  ],
  quote:
    "„Сърцето на Самуил“ не е слоган за витрина. Това е обещание магазините да са близо до деня на хората.",
};
