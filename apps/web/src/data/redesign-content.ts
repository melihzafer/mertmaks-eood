import { accents } from "./brand-colors";

export { accents };

export const brand = {
  name: "МЕРТМАКС",
  legalForm: "ЕООД",
  tagline: "Сърцето на Самуил",
  footerText: "Магазини, услуги и ресторант за хората в Самуил.",
  location: "с. Самуил, област Разград",
  hours: "Отворено 7 дни в седмицата",
};

export const searchLinks = [
  { href: "/supermarket", label: "Хранителни стоки" },
  { href: "/construction", label: "Строителни материали" },
  { href: "/restaurant", label: "Ресторант Делиорман" },
  { href: "/contact", label: "Адрес в Самуил" },
];

export const storesMenuLinks = [
  {
    href: "/supermarket",
    label: "Супермаркет",
    description: "Храна, напитки и неща за всеки ден",
    color: accents.supermarket,
  },
  {
    href: "/industrial",
    label: "Домашни потреби",
    description: "Посуда, текстил, козметика и дребни полезни стоки",
    color: accents.industrial,
  },
  {
    href: "/construction",
    label: "Строителство",
    description: "Материали за ремонт, двор и малък обект",
    color: accents.construction,
  },
  {
    href: "/restaurant",
    label: "Ресторант Делиорман",
    description: "Готвена храна, скара и място за сядане",
    color: accents.restaurant,
  },
];

export const searchPanelCopy = {
  title: "Търсене",
  placeholder: "Потърсете продукт, магазин или въпрос",
  closeLabel: "Затвори търсене",
  emptyHint: "Бързи връзки",
  noResults: 'Няма резултати за "{query}"',
  resultsHint: "Натиснете Enter за първия резултат",
};

export const mobileLinks = [
  { href: "/", label: "Начало" },
  { href: "/supermarket", label: "Супермаркет" },
  { href: "/industrial", label: "Домашни" },
  { href: "/construction", label: "Строителство" },
  { href: "/restaurant", label: "Ресторант" },
  { href: "/contact", label: "Контакти" },
];

export const footerLinks = [
  { href: "/supermarket", label: "Супермаркет", color: accents.supermarket },
  { href: "/industrial", label: "Домашни потреби", color: accents.industrial },
  { href: "/construction", label: "Строителство", color: accents.construction },
  { href: "/restaurant", label: "Ресторант", color: accents.restaurant },
];

export const homePage = {
  hero: {
    eyebrow: brand.tagline,
    title: "МЕРТМАКС, сърцето на Самуил",
    lead: "На едно място са супермаркетът, домашните потреби, строителният магазин и Делиорман. Минавате, вземате нужното и продължавате деня си.",
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
      title: "Домашни потреби",
      label: "нехранителни",
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
      description: "Храна, напитки и познати марки за ежедневното пазаруване.",
    },
    {
      href: "/industrial",
      color: accents.industrial,
      index: "02",
      visual: "За дома",
      title: "Домашни потреби",
      description:
        "Посуда, текстил, козметика и малки неща, които често трябват у дома.",
    },
    {
      href: "/construction",
      color: accents.construction,
      index: "03",
      visual: "Обект",
      title: "Строителство",
      description: "Материали, бои и инструменти за ремонт, двор и строеж.",
    },
    {
      href: "/restaurant",
      color: accents.restaurant,
      index: "04",
      visual: "Делиорман",
      title: "Ресторант",
      description:
        "Готвена храна, обедно меню и спокойно място в центъра на Самуил.",
    },
  ],
  promotions: [
    {
      category: "food",
      color: accents.supermarket,
      label: "седмична оферта",
      visual: "Свежи продукти",
      title: "Основни продукти",
      description: "Нещата, които най-често влизат в семейната кошница.",
    },
    {
      category: "home",
      color: accents.industrial,
      label: "за дома",
      visual: "Домашни потреби",
      title: "Посуда и дребни стоки",
      description: "Практични покупки за кухнята, банята и шкафа с резерви.",
    },
    {
      category: "home",
      color: accents.construction,
      label: "сезонно",
      visual: "Ремонт",
      title: "Бои и материали",
      description: "Бои, консумативи и материали за отлагания малък ремонт.",
    },
  ],
  cta: {
    eyebrow: "Самуил, Разград",
    title: "Място за покупки, работа и срещи в Самуил.",
    description:
      "МЕРТМАКС събира най-нужното за селото в няколко лесни за разпознаване обекта.",
    cards: [
      {
        href: "/supermarket",
        color: accents.supermarket,
        label: "Супермаркет",
        meta: "ежедневни покупки",
      },
      {
        href: "/industrial",
        color: accents.industrial,
        label: "Домашни потреби",
        meta: "нехранителни стоки",
      },
      {
        href: "/construction",
        color: accents.construction,
        label: "Строителство",
        meta: "материали и бои",
      },
      {
        href: "/restaurant",
        color: accents.restaurant,
        label: "Делиорман",
        meta: "ресторант и кухня",
      },
    ],
  },
};

export const divisionPages = {
  supermarket: {
    accent: accents.supermarket,
    heroIndex: "01 / Супермаркет",
    title: "Всичко за ежедневната трапеза.",
    description:
      "Свежи продукти, основни хранителни стоки, напитки и домашни потреби, подредени така, че да не губите време.",
    intro: {
      index: "01",
      eyebrow: "Категории",
      title: "Пазаруване без излишно обикаляне.",
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
        description: "Ясни зони и кратък път до нещата за деня.",
      },
      {
        index: "02",
        title: "Познати марки",
        description: "Асортимент с продукти, които клиентите търсят редовно.",
      },
      {
        index: "03",
        title: "7 дни",
        description:
          "Работно време, което покрива делници, уикенди и празници.",
      },
    ],
  },
  industrial: {
    accent: accents.industrial,
    diagonal: accents.industrialAccent,
    heroIndex: "02 / Домашни потреби",
    title: "Нехранителни стоки за дома и всеки ден.",
    description:
      "Магазин за домашни потреби с посуда, текстил, козметика, канцелария и дребни практични стоки на нормални цени.",
    cards: [
      {
        wide: true,
        icon: "КХ",
        title: "Кухня и посуда",
        items: [
          "Чаши, чинии и прибори",
          "Кутии, купи и органайзери",
          "Ежедневни консумативи",
        ],
      },
      {
        icon: "ТК",
        title: "Текстил",
        items: ["Кърпи", "Спално бельо", "Домашен текстил"],
      },
      {
        icon: "КО",
        title: "Козметика",
        items: ["Парфюмерия", "Хигиена", "Аксесоари"],
      },
      {
        wide: true,
        icon: "ДР",
        title: "Дребни стоки",
        items: [
          "Канцеларски материали",
          "Сезонни артикули",
          "Полезни неща за дома",
        ],
      },
    ],
    features: [
      {
        index: "01",
        title: "Много категории",
        description:
          "От кухнята до банята, подредено така, че да изберете бързо.",
      },
      {
        index: "02",
        title: "Достъпни находки",
        description: "Практични нехранителни стоки, без да пътувате до града.",
      },
      {
        index: "03",
        title: "Всекидневни нужди",
        description:
          "Малки покупки, които обикновено липсват точно когато потрябват.",
      },
    ],
  },
  construction: {
    accent: accents.construction,
    diagonal: accents.constructionAccent,
    heroIndex: "03 / Строителен магазин",
    title: "Магазин за ремонт, двор и строеж.",
    description:
      "Строителни материали, бои, инструменти, ВиК, електро и сезонни стоки за дома, двора и обекта.",
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
        description:
          "Основни продукти за ремонт, без рафтове, които само объркват.",
      },
      {
        index: "02",
        title: "Съвет",
        description:
          "Помощ при избора на материалите и дребните допълнения към тях.",
      },
      {
        index: "03",
        title: "Готовност",
        description:
          "Удобно място да вземете това, което е липсвало на обекта.",
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
    "Делиорман е ресторантът към МЕРТМАКС, подходящ за обяд, семейна вечеря или кратка среща в центъра на Самуил.",
  promos: [
    {
      color: accents.restaurant,
      visual: "Топла витрина",
      title: "Домашни ястия",
      description: "Готвено меню с предложения според сезона.",
    },
    {
      color: accents.restaurantAccent,
      visual: "Скара",
      title: "Скара и гарнитури",
      description: "Лесен избор, когато искате нещо топло без чакане.",
    },
    {
      color: accents.restaurantYellow,
      visual: "Салати",
      title: "Свежи салати",
      description: "Свежо допълнение към основното меню.",
    },
  ],
};

export const contactPage = {
  hero: {
    eyebrow: "Контакти",
    title: "Лесно ще ни намерите в Самуил.",
    lead: "Пишете ни, обадете се или минете през центъра. Магазините и ресторантът са близо един до друг, така че можете да свършите повече с едно посещение.",
  },
  stores: [
    {
      href: "/supermarket",
      color: accents.supermarket,
      index: "01",
      title: "Супермаркет",
      description: "Храна, напитки и стоки за ежедневното пазаруване.",
    },
    {
      href: "/industrial",
      color: accents.industrial,
      index: "02",
      title: "Домашни потреби",
      description: "Посуда, текстил, козметика и дребни полезни стоки.",
    },
    {
      href: "/construction",
      color: accents.construction,
      index: "03",
      title: "Строителство",
      description: "Материали за ремонт, поддръжка и работа на обект.",
    },
    {
      href: "/restaurant",
      color: accents.restaurant,
      index: "04",
      title: "Ресторант Делиорман",
      description: "Готвена храна, обедно меню и място за сядане.",
    },
  ],
  topics: [
    "Супермаркет",
    "Домашни потреби",
    "Строителство",
    "Ресторант Делиорман",
    "Общ въпрос",
  ],
};

export const samuilHubPage = {
  eyebrow: "История / Самуил Hub",
  title: "Местен бизнес с няколко ясни посоки.",
  lead: "МЕРТМАКС расте около нещата, които в Самуил трябват всеки ден: храна, домашни потреби, строителни материали и място за срещи.",
  events: [
    {
      color: accents.supermarket,
      title: "2005",
      description:
        "Първите ежедневни покупки и началото на по-познатото местно присъствие.",
    },
    {
      color: accents.industrial,
      title: "Разширяване",
      description:
        "Към хранителните стоки се добавят посуда, текстил и дребни потреби за дома.",
    },
    {
      color: accents.construction,
      title: "Строителна посока",
      description: "Материали за домове, дворове и малки обекти в района.",
    },
    {
      color: accents.restaurant,
      title: "Делиорман",
      description:
        "Ресторантът добавя място за сядане, храна и срещи след пазаруването.",
    },
  ],
  quote:
    '"Сърцето на Самуил" не е слоган за витрина. Това е обещание магазините да са близо до деня на хората.',
};
