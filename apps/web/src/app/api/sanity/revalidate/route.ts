import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { contentTags } from "@mertmaks/content/queries";
import { sanityRevalidateSecret } from "@/lib/sanity/env";

const allowedTags = new Set<string>(Object.values(contentTags));
export const runtime = "nodejs";

function hasValidSecret(secret: string | null) {
  if (!sanityRevalidateSecret || !secret) return false;

  const provided = Buffer.from(secret);
  const expected = Buffer.from(sanityRevalidateSecret);

  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

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
  promotion: [contentTags.promotions, contentTags.home, contentTags.divisions],
  product: [
    contentTags.products,
    contentTags.promotions,
    contentTags.home,
    contentTags.divisions,
  ],
  category: [contentTags.products, contentTags.promotions, contentTags.home],
  faq: [contentTags.faqs, contentTags.divisions, contentTags.contact],
};

export async function POST(request: Request) {
  const secret = request.headers.get("x-sanity-secret");

  if (!hasValidSecret(secret)) {
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
