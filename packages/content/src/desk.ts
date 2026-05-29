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
      S.listItem()
        .title("Промоции Супермаркет")
        .schemaType("promotion")
        .child(
          S.documentList()
            .title("Промоции Супермаркет")
            .schemaType("promotion")
            .filter('_type == "promotion" && store._ref == "store-supermarket"')
        ),
      S.listItem()
        .title("Промоции Домашни потреби")
        .schemaType("promotion")
        .child(
          S.documentList()
            .title("Промоции Домашни потреби")
            .schemaType("promotion")
            .filter('_type == "promotion" && store._ref == "store-industrial"')
        ),
      S.listItem()
        .title("Промоции Строителен")
        .schemaType("promotion")
        .child(
          S.documentList()
            .title("Промоции Строителен")
            .schemaType("promotion")
            .filter('_type == "promotion" && store._ref == "store-construction"')
        ),
      S.listItem()
        .title("Промоции Ресторант")
        .schemaType("promotion")
        .child(
          S.documentList()
            .title("Промоции Ресторант")
            .schemaType("promotion")
            .filter('_type == "promotion" && store._ref == "store-restaurant"')
        ),
      S.documentTypeListItem("navigationItem").title("Навигация"),
      S.documentTypeListItem("faq").title("FAQ"),
    ]);
