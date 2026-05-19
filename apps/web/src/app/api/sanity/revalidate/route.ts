import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { contentTags } from "@mertmaks/content/queries";
import { sanityRevalidateSecret } from "@/lib/sanity/env";

const allowedTags = new Set<string>(Object.values(contentTags));

const tagsByDocumentType: Record<string, string[]> = {
  siteSettings: [contentTags.siteSettings],
  navigationItem: [contentTags.navigation],
  store: [
    contentTags.stores,
    contentTags.contact,
    contentTags.divisions,
    contentTags.home,
    contentTags.promotions,
    contentTags.products,
  ],
  homePage: [contentTags.home],
  contactPage: [contentTags.contact],
  restaurantPage: [contentTags.restaurant],
  divisionPage: [contentTags.divisions],
  promotion: [contentTags.promotions, contentTags.home],
  product: [contentTags.products],
  category: [contentTags.products, contentTags.promotions, contentTags.home],
  faq: [contentTags.faqs],
};

export async function POST(request: Request) {
  const secret = request.headers.get("x-sanity-secret");

  if (!sanityRevalidateSecret || secret !== sanityRevalidateSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    tags?: string[];
    tag?: string;
    _type?: string;
  };
  const requestedTags =
    body.tags ??
    (body.tag ? [body.tag] : body._type ? tagsByDocumentType[body._type] : []);
  const tags = requestedTags.filter((tag) => allowedTags.has(tag));

  if (tags.length === 0) {
    return NextResponse.json(
      { error: "No valid revalidation tags provided" },
      { status: 400 },
    );
  }

  tags.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({ revalidated: true, tags });
}
