import { defineField, defineType, type StringRule } from "sanity";

const storeTypes = [
  { title: "Супермаркет", value: "supermarket" },
  { title: "Домашни потреби", value: "industrial" },
  { title: "Строителство", value: "construction" },
  { title: "Ресторант", value: "restaurant" },
];

const weekdays = [
  ["monday", "Понеделник"],
  ["tuesday", "Вторник"],
  ["wednesday", "Сряда"],
  ["thursday", "Четвъртък"],
  ["friday", "Петък"],
  ["saturday", "Събота"],
  ["sunday", "Неделя"],
];

const requiredString = (Rule: StringRule) => Rule.required();
const optionalTime = (Rule: StringRule) =>
  Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
    name: "час",
    invert: false,
  }).error("Използвайте формат HH:MM, например 08:30.");
const optionalPhone = (Rule: StringRule) =>
  Rule.regex(/^\+?[0-9\s().-]{7,24}$/).warning(
    "Проверете телефона. Пример: +359 89 476 6273.",
  );
const optionalColor = (Rule: StringRule) =>
  Rule.regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i).warning(
    "Използвайте HEX цвят, например #E53E3E.",
  );

export const link = defineType({
  name: "link",
  title: "Връзка",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Етикет",
      type: "string",
      validation: requiredString,
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: requiredString,
    }),
  ],
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO заглавие", type: "string" }),
    defineField({
      name: "description",
      title: "SEO описание",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Социална снимка",
      type: "imageWithAlt",
    }),
  ],
});

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Снимка",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Алтернативен текст",
      type: "string",
      validation: requiredString,
    }),
  ],
});

export const hourRange = defineType({
  name: "hourRange",
  title: "Работно време за ден",
  type: "object",
  fields: [
    defineField({
      name: "closed",
      title: "Затворено",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "open",
      title: "Отваря",
      type: "string",
      initialValue: "08:00",
      validation: optionalTime,
    }),
    defineField({
      name: "close",
      title: "Затваря",
      type: "string",
      initialValue: "18:00",
      validation: optionalTime,
    }),
  ],
  preview: {
    select: { closed: "closed", open: "open", close: "close" },
    prepare({ closed, open, close }) {
      return {
        title: closed ? "Затворено" : `${open ?? "--:--"} - ${close ?? "--:--"}`,
      };
    },
  },
});

export const weeklyHours = defineType({
  name: "weeklyHours",
  title: "Седмично работно време",
  type: "object",
  fields: weekdays.map(([name, title]) =>
    defineField({
      name,
      title,
      type: "hourRange",
    }),
  ),
});

export const pageCard = defineType({
  name: "pageCard",
  title: "Карта",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Заглавие", type: "string" }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "Икона / кратък код", type: "string" }),
    defineField({
      name: "items",
      title: "Елементи",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "wide", title: "Широка карта", type: "boolean" }),
    defineField({ name: "image", title: "Снимка", type: "imageWithAlt" }),
  ],
});

export const featureItem = defineType({
  name: "featureItem",
  title: "Акцент",
  type: "object",
  fields: [
    defineField({ name: "index", title: "Номер", type: "string" }),
    defineField({ name: "title", title: "Заглавие", type: "string" }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 3 }),
  ],
});

export const statItem = defineType({
  name: "statItem",
  title: "Статистика",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Стойност", type: "number" }),
    defineField({ name: "suffix", title: "Суфикс", type: "string" }),
    defineField({ name: "label", title: "Етикет", type: "string" }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Настройки на сайта",
  type: "document",
  fields: [
    defineField({ name: "brandName", title: "Име на бранда", type: "string" }),
    defineField({ name: "legalForm", title: "Правна форма", type: "string" }),
    defineField({ name: "tagline", title: "Слоган", type: "string" }),
    defineField({ name: "footerText", title: "Текст във футъра", type: "text", rows: 3 }),
    defineField({ name: "location", title: "Локация", type: "string" }),
    defineField({ name: "hoursSummary", title: "Кратко работно време", type: "string" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Настройки на сайта" }) },
});

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Навигация",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Етикет", type: "string", validation: requiredString }),
    defineField({ name: "href", title: "URL", type: "string", validation: requiredString }),
    defineField({
      name: "placement",
      title: "Място",
      type: "string",
      options: {
        list: [
          { title: "Основна навигация", value: "main" },
          { title: "Мобилна навигация", value: "mobile" },
          { title: "Меню магазини", value: "stores" },
          { title: "Футър", value: "footer" },
          { title: "Търсене", value: "search" },
        ],
      },
    }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 2 }),
    defineField({ name: "accent", title: "Цвят", type: "string" }),
    defineField({ name: "order", title: "Подредба", type: "number", initialValue: 0 }),
    defineField({ name: "visible", title: "Видимо", type: "boolean", initialValue: true }),
  ],
});

export const store = defineType({
  name: "store",
  title: "Обект",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Име", type: "string", validation: requiredString }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({
      name: "type",
      title: "Тип",
      type: "string",
      options: { list: storeTypes },
      validation: requiredString,
    }),
    defineField({ name: "address", title: "Адрес", type: "string" }),
    defineField({ name: "city", title: "Населено място", type: "string" }),
    defineField({ name: "region", title: "Област", type: "string" }),
    defineField({ name: "phone", title: "Телефон", type: "string", validation: optionalPhone }),
    defineField({ name: "email", title: "Имейл", type: "string" }),
    defineField({ name: "coordinates", title: "Координати", type: "geopoint" }),
    defineField({ name: "hours", title: "Работно време", type: "weeklyHours" }),
    defineField({ name: "features", title: "Характеристики", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "accent", title: "Акцентен цвят", type: "string" }),
    defineField({ name: "image", title: "Снимка", type: "imageWithAlt" }),
  ],
});

export const category = defineType({
  name: "category",
  title: "Категория",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Име", type: "string", validation: requiredString }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "store",
      title: "Обект",
      type: "reference",
      to: [{ type: "store" }],
    }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 3 }),
    defineField({ name: "keywords", title: "Ключови думи", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Подредба", type: "number", initialValue: 0 }),
    defineField({ name: "visible", title: "Видима", type: "boolean", initialValue: true }),
  ],
});

export const product = defineType({
  name: "product",
  title: "Продукт / услуга",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Име", type: "string", validation: requiredString }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 4 }),
    defineField({
      name: "store",
      title: "Обект",
      type: "reference",
      to: [{ type: "store" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "category", title: "Категория", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "image", title: "Основна снимка", type: "imageWithAlt" }),
    defineField({ name: "gallery", title: "Галерия", type: "array", of: [{ type: "imageWithAlt" }] }),
    defineField({ name: "keywords", title: "Ключови думи за търсене", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "offerLabel", title: "Етикет / цена за показване", type: "string" }),
    defineField({ name: "shareTitle", title: "Заглавие за споделяне", type: "string" }),
    defineField({
      name: "shareDescription",
      title: "Описание за брошура",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "shareImage", title: "Снимка за брошура", type: "imageWithAlt" }),
    defineField({
      name: "brochureAccent",
      title: "Цвят за брошура",
      type: "string",
      validation: optionalColor,
    }),
    defineField({ name: "featured", title: "Препоръчан", type: "boolean", initialValue: false }),
    defineField({ name: "visible", title: "Видим", type: "boolean", initialValue: true }),
  ],
});

export const promotion = defineType({
  name: "promotion",
  title: "Промоция",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Заглавие", type: "string", validation: requiredString }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 3 }),
    defineField({
      name: "promoType",
      title: "Тип промоция",
      type: "string",
      options: {
        list: [
          { title: "Седмична оферта", value: "weekly" },
          { title: "Месечна оферта", value: "monthly" },
          { title: "Друга / Специфична", value: "custom" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "weekly",
    }),
    defineField({
      name: "store",
      title: "Обект",
      type: "reference",
      to: [{ type: "store" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "category", title: "Категория", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "products", title: "Свързани продукти", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] }),
    defineField({ name: "label", title: "Етикет", type: "string" }),
    defineField({ name: "discount", title: "Отстъпка %", type: "number" }),
    defineField({
      name: "oldPrice",
      title: "Стара цена",
      type: "string",
      description: "Пример: 2.50 € или 2.50",
    }),
    defineField({
      name: "newPrice",
      title: "Нова цена",
      type: "string",
      description: "Пример: 1.99 € или 1.99",
    }),
    defineField({
      name: "showPrice",
      title: "Показване на цена",
      type: "string",
      options: {
        list: [
          { title: "Покажи цена", value: "show" },
          { title: "Скрий цена", value: "hide" },
        ],
        layout: "radio",
      },
      initialValue: "show",
    }),
    defineField({ name: "validFrom", title: "Валидна от", type: "date" }),
    defineField({ name: "validTo", title: "Валидна до", type: "date" }),
    defineField({ name: "active", title: "Активна", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "На начална страница", type: "boolean", initialValue: false }),
    defineField({ name: "image", title: "Снимка", type: "imageWithAlt" }),
    defineField({ name: "shareTitle", title: "Заглавие за споделяне", type: "string" }),
    defineField({
      name: "shareDescription",
      title: "Описание за брошура",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "shareImage", title: "Снимка за брошура", type: "imageWithAlt" }),
    defineField({
      name: "brochureAccent",
      title: "Цвят за брошура",
      type: "string",
      validation: optionalColor,
    }),
    defineField({ name: "terms", title: "Условия", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Подредба", type: "number", initialValue: 0 }),
  ],
  validation: (Rule) =>
    Rule.custom((promotion) => {
      if (
        promotion &&
        typeof promotion === "object" &&
        "validFrom" in promotion &&
        "validTo" in promotion &&
        promotion.validFrom &&
        promotion.validTo &&
        String(promotion.validFrom) > String(promotion.validTo)
      ) {
        return "Крайната дата трябва да е след началната.";
      }

      return true;
    }),
  preview: {
    select: { title: "title", active: "active", validTo: "validTo", promoType: "promoType" },
    prepare({ title, active, validTo, promoType }) {
      const typeLabel =
        promoType === "monthly"
          ? "Месечна"
          : promoType === "custom"
          ? "Друга"
          : "Седмична";
      return {
        title,
        subtitle: `${typeLabel} | ${active ? "Активна" : "Скрита"}${validTo ? ` до ${validTo}` : ""}`,
      };
    },
  },
});

export const homePage = defineType({
  name: "homePage",
  title: "Начална страница",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero малък текст", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero заглавие", type: "string" }),
    defineField({ name: "heroLead", title: "Hero описание", type: "text", rows: 3 }),
    defineField({ name: "primaryCta", title: "Основен бутон", type: "link" }),
    defineField({ name: "secondaryCta", title: "Втори бутон", type: "link" }),
    defineField({ name: "stats", title: "Статистики", type: "array", of: [{ type: "statItem" }] }),
    defineField({ name: "divisionCards", title: "Карти на обекти", type: "array", of: [{ type: "pageCard" }] }),
    defineField({ name: "featuredPromotions", title: "Промоции на начална", type: "array", of: [{ type: "reference", to: [{ type: "promotion" }] }] }),
    defineField({ name: "ctaTitle", title: "CTA заглавие", type: "string" }),
    defineField({ name: "ctaDescription", title: "CTA описание", type: "text", rows: 3 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Начална страница" }) },
});

export const divisionPage = defineType({
  name: "divisionPage",
  title: "Страница на обект",
  type: "document",
  fields: [
    defineField({ name: "store", title: "Обект", type: "reference", to: [{ type: "store" }] }),
    defineField({ name: "heroIndex", title: "Hero индекс", type: "string" }),
    defineField({ name: "title", title: "Заглавие", type: "string", validation: requiredString }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 4 }),
    defineField({ name: "introEyebrow", title: "Intro малък текст", type: "string" }),
    defineField({ name: "introTitle", title: "Intro заглавие", type: "string" }),
    defineField({ name: "cards", title: "Карти / категории", type: "array", of: [{ type: "pageCard" }] }),
    defineField({ name: "features", title: "Акценти", type: "array", of: [{ type: "featureItem" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Контакти",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero малък текст", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero заглавие", type: "string" }),
    defineField({ name: "heroLead", title: "Hero описание", type: "text", rows: 3 }),
    defineField({ name: "topics", title: "Теми за форма", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "mapTitle", title: "Заглавие за карта", type: "string" }),
    defineField({ name: "mapDescription", title: "Описание за карта", type: "text", rows: 3 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Контакти" }) },
});

export const restaurantPage = defineType({
  name: "restaurantPage",
  title: "Ресторант",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Заглавие", type: "string" }),
    defineField({ name: "description", title: "Описание", type: "text", rows: 3 }),
    defineField({ name: "sourceUrl", title: "Официален сайт", type: "url" }),
    defineField({ name: "menuUrl", title: "Меню", type: "url" }),
    defineField({ name: "reservationUrl", title: "Резервации", type: "url" }),
    defineField({ name: "logo", title: "Лого", type: "imageWithAlt" }),
    defineField({ name: "about", title: "За ресторанта", type: "text", rows: 5 }),
    defineField({ name: "phone", title: "Телефон", type: "string" }),
    defineField({ name: "email", title: "Имейл", type: "string" }),
    defineField({ name: "address", title: "Адрес", type: "string" }),
    defineField({ name: "promos", title: "Акценти", type: "array", of: [{ type: "pageCard" }] }),
    defineField({ name: "gallery", title: "Галерия", type: "array", of: [{ type: "imageWithAlt" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Ресторант Делиорман" }) },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Въпрос", type: "string", validation: requiredString }),
    defineField({ name: "answer", title: "Отговор", type: "text", rows: 4 }),
    defineField({ name: "category", title: "Категория", type: "string" }),
    defineField({ name: "keywords", title: "Ключови думи", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "link", title: "Връзка", type: "string" }),
    defineField({ name: "order", title: "Подредба", type: "number", initialValue: 0 }),
    defineField({ name: "visible", title: "Видим", type: "boolean", initialValue: true }),
  ],
});

export const schemaTypes = [
  link,
  seo,
  imageWithAlt,
  hourRange,
  weeklyHours,
  pageCard,
  featureItem,
  statItem,
  siteSettings,
  navigationItem,
  store,
  category,
  product,
  promotion,
  homePage,
  divisionPage,
  contactPage,
  restaurantPage,
  faq,
];
