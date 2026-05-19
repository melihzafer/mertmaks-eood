import { ContactPageClient } from "./ContactPageClient";
import { getContactPageModel } from "@/lib/cms/contact";

export default async function ContactPage() {
  const model = await getContactPageModel();

  return <ContactPageClient {...model} />;
}
