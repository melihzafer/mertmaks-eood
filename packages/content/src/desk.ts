import type { StructureBuilder, StructureResolver } from "sanity/structure";

const singleton = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MERTMAX съдържание")
    .items([
      singleton(S, "siteSettings", "Настройки на сайта"),
      singleton(S, "homePage", "Начална страница"),
      singleton(S, "contactPage", "Контакти"),
      singleton(S, "restaurantPage", "Ресторант"),
      S.divider(),
      S.documentTypeListItem("store").title("Обекти"),
      S.documentTypeListItem("divisionPage").title("Страници на обекти"),
      S.documentTypeListItem("category").title("Категории"),
      S.documentTypeListItem("product").title("Продукти / услуги"),
      S.documentTypeListItem("promotion").title("Промоции"),
      S.documentTypeListItem("navigationItem").title("Навигация"),
      S.documentTypeListItem("faq").title("FAQ"),
    ]);
