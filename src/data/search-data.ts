export const searchData = {
  products: [
    {
      id: 'product-1',
      name: "Свежи Плодове и Зеленчуци",
      category: "Супермаркет",
      keywords: ["ябълки", "круши", "домати", "краставици", "морков", "зеленчуци", "плодове"],
      store: "grocery" as const,
      color: "#E53E3E",
      link: "/supermarket"
    },
    {
      id: 'product-2',
      name: "Мляко и Млечни Продукти",
      category: "Супермаркет",
      keywords: ["мляко", "сирене", "кашкавал", "йогурт", "масло"],
      store: "grocery" as const,
      color: "#E53E3E",
      link: "/supermarket"
    },
    {
      id: 'product-3',
      name: "Месо и Месни Продукти",
      category: "Супермаркет",
      keywords: ["свинско", "телешко", "пилешко", "колбаси", "наденици"],
      store: "grocery" as const,
      color: "#E53E3E",
      link: "/supermarket"
    },
    {
      id: 'product-4',
      name: "Хляб и Тестени Изделия",
      category: "Супермаркет",
      keywords: ["хляб", "кифли", "макарони", "спагети", "баница"],
      store: "grocery" as const,
      color: "#E53E3E",
      link: "/supermarket"
    },
    {
      id: 'product-5',
      name: "Бормашини и Инструменти",
      category: "Промишлени Стоки",
      keywords: ["бормашина", "винтоверт", "триони", "чукове", "инструменти"],
      store: "industrial" as const,
      color: "#D53F8C",
      link: "/industrial"
    },
    {
      id: 'product-6',
      name: "Електрически Уреди",
      category: "Промишлени Стоки",
      keywords: ["ютии", "прахосмукачки", "миксери", "електроуреди"],
      store: "industrial" as const,
      color: "#D53F8C",
      link: "/industrial"
    },
    {
      id: 'product-7',
      name: "Крепежни Елементи",
      category: "Промишлени Стоки",
      keywords: ["винтове", "гайки", "болтове", "дюбели", "крепеж"],
      store: "industrial" as const,
      color: "#D53F8C",
      link: "/industrial"
    },
    {
      id: 'product-8',
      name: "Осветление и Електрика",
      category: "Промишлени Стоки",
      keywords: ["лампи", "led", "ключове", "контакти", "кабели"],
      store: "industrial" as const,
      color: "#D53F8C",
      link: "/industrial"
    },
    {
      id: 'product-9',
      name: "Тухли и Блокчета",
      category: "Строителство",
      keywords: ["тухли", "блокове", "газобетон", "керемиди"],
      store: "construction" as const,
      color: "#3182CE",
      link: "/construction"
    },
    {
      id: 'product-10',
      name: "Циментови Материали",
      category: "Строителство",
      keywords: ["цимент", "варова", "гипс", "мазилка"],
      store: "construction" as const,
      color: "#3182CE",
      link: "/construction"
    },
    {
      id: 'product-11',
      name: "Бои и Лакове",
      category: "Строителство",
      keywords: ["боя", "латекс", "лак", "грунд", "мазилка"],
      store: "construction" as const,
      color: "#3182CE",
      link: "/construction"
    },
    {
      id: 'product-12',
      name: "Изолационни Материали",
      category: "Строителство",
      keywords: ["стиропор", "минерална вата", "изолация", "топлоизолация"],
      store: "construction" as const,
      color: "#3182CE",
      link: "/construction"
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      name: "Какви са работните часове?",
      question: "Какви са работните часове?",
      answer: "Всички магазини работят от Понеделник до Неделя, 8:00 - 20:00.",
      category: "FAQ",
      keywords: ["часове", "работно време", "график", "отворено", "затворено"],
      store: "grocery" as const,
      link: "/"
    },
    {
      id: 'faq-2',
      name: "Имате ли доставка?",
      question: "Имате ли доставка?",
      answer: "Да, предлагаме доставка за строителни материали при поръчка над 100 лв.",
      category: "FAQ",
      keywords: ["доставка", "куриер", "транспорт", "довеждане"],
      store: "construction" as const,
      link: "/construction"
    },
    {
      id: 'faq-3',
      name: "Приемате ли карти?",
      question: "Приемате ли карти?",
      answer: "Да, приемаме всички видове кредитни и дебитни карти.",
      category: "FAQ",
      keywords: ["карти", "плащане", "visa", "mastercard", "банкова карта"],
      store: "grocery" as const,
      link: "/"
    },
    {
      id: 'faq-4',
      name: "Имате ли паркинг?",
      question: "Имате ли паркинг?",
      answer: "Да, всички магазини разполагат с безплатен паркинг за клиенти.",
      category: "FAQ",
      keywords: ["паркинг", "място за паркиране", "кола", "автомобил"],
      store: "grocery" as const,
      link: "/"
    },
    {
      id: 'faq-5',
      name: "Къде се намирате?",
      question: "Къде се намирате?",
      answer: "Всички наши магазини се намират в с. Самуил, обл. Разград. Вижте точни адреси на страницата Контакти.",
      category: "FAQ",
      keywords: ["адрес", "местоположение", "къде", "намират", "самуил"],
      store: "grocery" as const,
      link: "/"
    },
    {
      id: 'faq-6',
      name: "Имате ли промоции?",
      question: "Имате ли промоции?",
      answer: "Да, проверявайте нашите седмични промоции на началната страница.",
      category: "FAQ",
      keywords: ["промоции", "отстъпки", "намаления", "оферти", "разпродажба"],
      store: "grocery" as const,
      link: "/"
    }
  ]
};

// Flatten the data for Fuse.js
export const flatSearchData = [
  ...searchData.products,
  ...searchData.faqs
];
