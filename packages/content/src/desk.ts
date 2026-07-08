import {
  CogIcon,
  DocumentsIcon,
  EnvelopeIcon,
  HelpCircleIcon,
  HomeIcon,
  InboxIcon,
  LaunchIcon,
  MenuIcon,
  PackageIcon,
  PinIcon,
  TagIcon,
  TagsIcon,
  ThLargeIcon,
  ThumbsUpIcon,
  UsersIcon,
} from "@sanity/icons";
import type { ComponentType } from "react";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

const singleton = (
  S: StructureBuilder,
  type: string,
  title: string,
  icon: ComponentType,
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title));

const promotionsForStore = (
  S: StructureBuilder,
  title: string,
  storeId: string,
) =>
  S.listItem()
    .title(title)
    .icon(TagIcon)
    .schemaType("promotion")
    .child(
      S.documentList()
        .title(title)
        .schemaType("promotion")
        .filter('_type == "promotion" && store._ref == $storeId')
        .params({ storeId }),
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MERTMAX съдържание")
    .items([
      // Текстовете и настройките на самите страници на сайта (уникален документ за всяка).
      S.listItem()
        .title("Основни страници")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Основни страници")
            .items([
              singleton(S, "siteSettings", "Настройки на сайта (лого, слоган, футър)", CogIcon),
              singleton(S, "homePage", "Начална страница", HomeIcon),
              singleton(S, "contactPage", "Контакти", EnvelopeIcon),
              singleton(S, "restaurantPage", "Ресторант Делиорман", LaunchIcon),
            ]),
        ),
      // Магазините като локации + витринните им страници + какво се продава в тях.
      S.listItem()
        .title("Обекти, категории и продукти")
        .icon(ThLargeIcon)
        .child(
          S.list()
            .title("Обекти, категории и продукти")
            .items([
              S.documentTypeListItem("store")
                .title("Обекти (адреси, часове, контакти)")
                .icon(PinIcon),
              S.documentTypeListItem("divisionPage")
                .title("Съдържание на страниците на обектите")
                .icon(ThLargeIcon),
              S.documentTypeListItem("category").title("Категории").icon(TagIcon),
              S.documentTypeListItem("product")
                .title("Продукти / услуги")
                .icon(PackageIcon),
            ]),
        ),
      // Едни и същи промоции, разделени по обект — това е само филтър, документите са в общ тип "promotion".
      S.listItem()
        .title("Промоции по обект")
        .icon(TagsIcon)
        .child(
          S.list()
            .title("Промоции по обект")
            .items([
              promotionsForStore(S, "Промоции · Супермаркет", "store-supermarket"),
              promotionsForStore(S, "Промоции · Домашни потреби", "store-industrial"),
              promotionsForStore(S, "Промоции · Строителен", "store-construction"),
              promotionsForStore(S, "Промоции · Ресторант", "store-restaurant"),
            ]),
        ),
      S.listItem()
        .title("Навигация, FAQ и статии")
        .icon(MenuIcon)
        .child(
          S.list()
            .title("Навигация, FAQ и статии")
            .items([
              S.documentTypeListItem("navigationItem")
                .title("Навигация (менюта на сайта)")
                .icon(MenuIcon),
              S.documentTypeListItem("faq")
                .title("Въпроси и отговори (FAQ)")
                .icon(HelpCircleIcon),
              S.documentTypeListItem("storeArticle")
                .title("Статии / новини")
                .icon(DocumentsIcon),
            ]),
        ),
      S.divider(),
      // Входящи данни от посетители на сайта — само за преглед/обработка, не редактируемо съдържание.
      S.listItem()
        .title("Съобщения от потребители")
        .icon(InboxIcon)
        .child(
          S.list()
            .title("Съобщения от потребители")
            .items([
              S.documentTypeListItem("contactSubmission")
                .title("Контактни съобщения (форма)")
                .icon(EnvelopeIcon),
              S.documentTypeListItem("feedbackSubmission")
                .title("Обратна връзка (отзиви)")
                .icon(ThumbsUpIcon),
              S.documentTypeListItem("newsletterSubscriber")
                .title("Абонати за бюлетин")
                .icon(UsersIcon),
            ]),
        ),
    ]);
