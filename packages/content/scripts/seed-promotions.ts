import { createClient } from "@sanity/client";
import { weeklyPromotions } from "../../../apps/web/src/data/weekly-promotions";
import { monthlyPromotions } from "../../../apps/web/src/data/monthly-promotions";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "jq8t1fpl";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN or SANITY_API_TOKEN environment variable.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-05-19",
  token,
  useCdn: false,
});

// Store ID map
const storeIdMap: Record<string, string> = {
  supermarket: "store-supermarket",
  industrial: "store-industrial",
  construction: "store-construction",
  restaurant: "store-restaurant",
};

function categoryId(storeId: string, category: string) {
  const encoded = Buffer.from(category || "uncategorized", "utf8")
    .toString("base64url")
    .slice(0, 48);

  return `category-${storeId}-${encoded}`;
}

async function seed() {
  console.log("Cleaning up old weeklyPromotion and monthlyPromotion documents...");
  try {
    await client.delete({ query: '*[_type in ["weeklyPromotion", "monthlyPromotion"]]' });
    console.log("Cleanup complete.");
  } catch (err) {
    console.warn("Failed to clean up old documents (they might not exist yet):", err);
  }

  const transaction = client.transaction();

  console.log("Preparing weekly promotions...");
  for (const promo of weeklyPromotions) {
    const id = `weeklyPromotion-${promo.id ?? promo.title.replace(/\s+/g, "-").toLowerCase()}`;
    const doc: any = {
      _type: "promotion",
      _id: id,
      promoType: "weekly",
      title: promo.title,
      description: promo.description ?? "",
      validFrom: promo.validFrom,
      validTo: promo.validTo,
      active: promo.active ?? true,
      store: {
        _type: "reference",
        _ref: storeIdMap[promo.store] ?? promo.store,
      },
      terms: promo.terms ?? [],
      order: 0,
    };

    if (promo.category) {
      doc.category = {
        _type: "reference",
        _ref: categoryId(promo.store, promo.category),
      };
    }

    transaction.createOrReplace(doc);
    console.log(`- Prepared weekly promo: ${promo.title} (${id})`);
  }

  console.log("Preparing monthly promotions...");
  for (const promo of monthlyPromotions) {
    const id = `monthlyPromotion-${promo.id ?? promo.title.replace(/\s+/g, "-").toLowerCase()}`;
    const doc: any = {
      _type: "promotion",
      _id: id,
      promoType: "monthly",
      title: promo.title,
      description: promo.description ?? "",
      validFrom: promo.validFrom,
      validTo: promo.validTo,
      active: promo.active ?? true,
      store: {
        _type: "reference",
        _ref: storeIdMap[promo.store] ?? promo.store,
      },
      terms: promo.terms ?? [],
      order: 0,
    };

    if (promo.category) {
      doc.category = {
        _type: "reference",
        _ref: categoryId(promo.store, promo.category),
      };
    }

    transaction.createOrReplace(doc);
    console.log(`- Prepared monthly promo: ${promo.title} (${id})`);
  }

  console.log("Committing transaction to Sanity...");
  const result = await transaction.commit();
  console.log("Successfully seeded weekly and monthly promotions:", result);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
