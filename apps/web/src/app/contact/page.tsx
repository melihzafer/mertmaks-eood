import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";
import { getContactPageModel } from "@/lib/cms/contact";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const model = await getContactPageModel();

  return buildMetadata({
    path: "/contact",
    seo: model.seo,
    fallbackTitle: "Контакти",
    fallbackDescription:
      "Свържете се с МЕРТМАКС - телефони, имейл и адреси на супермаркета, строителния магазин, домашни потреби и ресторанта в Самуил.",
  });
}

export default async function ContactPage() {
  const model = await getContactPageModel();

  return <ContactPageClient {...model} />;
}
