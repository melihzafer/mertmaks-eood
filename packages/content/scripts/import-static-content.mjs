import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;
const apiVersion = process.env.SANITY_API_VERSION || "2026-05-19";

if (!projectId || !token) {
  console.error(
    "Missing SANITY_PROJECT_ID/SANITY_STUDIO_PROJECT_ID or SANITY_API_TOKEN/SANITY_WRITE_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion,
  useCdn: false,
});

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..", "..");
const dataDir = path.join(repoRoot, "apps", "web", "src", "data");

const storeTypeByLegacyType = {
  grocery: "supermarket",
  industrial: "industrial",
  construction: "construction",
  restaurant: "restaurant",
};

function slugify(value) {
  return value
    .toLocaleLowerCase("bg-BG")
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function categoryId(storeId, category) {
  const encoded = Buffer.from(category || "uncategorized", "utf8")
    .toString("base64url")
    .slice(0, 48);

  return `category-${storeId}-${encoded}`;
}

async function readJson(fileName) {
  const text = await readFile(path.join(dataDir, fileName), "utf8");
  return JSON.parse(text);
}

async function readJsonl(fileName) {
  const text = await readFile(path.join(dataDir, fileName), "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function storeDocument(store) {
  const id = store.id;

  return {
    _id: `store-${id}`,
    _type: "store",
    name: store.name,
    slug: { _type: "slug", current: id },
    type: storeTypeByLegacyType[store.type] ?? store.type,
    address: store.address,
    city: store.city,
    region: store.region,
    phone: store.phone,
    email: store.email,
    coordinates: {
      _type: "geopoint",
      lat: store.coordinates.lat,
      lng: store.coordinates.lng,
    },
    hours: store.hours,
    features: store.features,
  };
}

function categoryDocument(promotion) {
  return {
    _id: categoryId(promotion.store, promotion.category),
    _type: "category",
    title: promotion.category,
    slug: {
      _type: "slug",
      current: slugify(promotion.category),
    },
    store: {
      _type: "reference",
      _ref: `store-${promotion.store}`,
    },
    visible: true,
  };
}

function promotionDocument(promotion) {
  return {
    _id: `promotion-${promotion.id}`,
    _type: "promotion",
    title: promotion.title,
    description: promotion.description,
    store: {
      _type: "reference",
      _ref: `store-${promotion.store}`,
    },
    category: {
      _type: "reference",
      _ref: categoryId(promotion.store, promotion.category),
    },
    label:
      promotion.discount > 0
        ? `${promotion.discount}% отстъпка`
        : promotion.category,
    discount: promotion.discount,
    validFrom: promotion.validFrom,
    validTo: promotion.validTo,
    active: promotion.active,
    featured: promotion.featured,
    terms: promotion.terms,
    order: 0,
  };
}

async function main() {
  const [{ stores }, promotions] = await Promise.all([
    readJson("stores.json"),
    readJsonl("promotions.jsonl"),
  ]);

  const documents = [
    ...stores.map(storeDocument),
    ...promotions.map(categoryDocument),
    ...promotions.map(promotionDocument),
  ];

  const uniqueDocuments = Array.from(
    new Map(documents.map((document) => [document._id, document])).values(),
  );

  const transaction = uniqueDocuments.reduce(
    (current, document) => current.createOrReplace(document),
    client.transaction(),
  );

  await transaction.commit();

  console.log(`Imported ${uniqueDocuments.length} Sanity documents into ${dataset}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
