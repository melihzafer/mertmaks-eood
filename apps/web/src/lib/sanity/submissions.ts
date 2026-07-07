import { createHash } from "node:crypto";
import { newsletterSubscribersQuery } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";
import { sanityWriteClient } from "@/lib/sanity/write";

type StoreInterest = "all" | "supermarket" | "industrial" | "construction";

export interface NewsletterSubscriber {
  email: string;
  store: StoreInterest;
  subscribedAt: string;
  active: boolean;
}

interface ContactSubmissionInput {
  name: string;
  email?: string;
  phone?: string;
  store?: string;
  topic?: string;
  message: string;
  path?: string;
  userAgent?: string;
}

interface FeedbackSubmissionInput {
  rating: number;
  category: "service" | "products" | "website" | "other";
  comment?: string;
  path?: string;
  userAgent?: string;
}

function subscriberId(email: string) {
  const digest = createHash("sha256").update(email.toLowerCase()).digest("hex");
  return `newsletterSubscriber-${digest.slice(0, 32)}`;
}

export function canWriteSanity() {
  return Boolean(sanityWriteClient);
}

export async function getSanityNewsletterSubscribers() {
  const subscribers = await fetchSanity<NewsletterSubscriber[]>(
    newsletterSubscribersQuery,
  );

  return subscribers ?? null;
}

export async function upsertNewsletterSubscriber(
  input: Pick<NewsletterSubscriber, "email" | "store">,
) {
  const client = sanityWriteClient;
  if (!client) return null;

  const email = input.email.toLowerCase();
  const id = subscriberId(email);
  const existing = await client.fetch<NewsletterSubscriber | null>(
    '*[_id == $id][0]{email, store, subscribedAt, active}',
    { id },
    { cache: "no-store", timeout: 10_000 },
  );

  if (existing?.active) {
    return { status: "exists" as const, subscriber: existing };
  }

  const subscribedAt = new Date().toISOString();
  const subscriber: NewsletterSubscriber = {
    email,
    store: input.store,
    subscribedAt,
    active: true,
  };

  if (existing) {
    const updated = await client
      .patch(id)
      .set({ ...subscriber, source: "website" })
      .commit<NewsletterSubscriber>({ returnDocuments: true });

    return { status: "reactivated" as const, subscriber: updated };
  }

  await client.create({
    _id: id,
    _type: "newsletterSubscriber",
    ...subscriber,
    source: "website",
  });

  return { status: "created" as const, subscriber };
}

export async function saveContactSubmission(input: ContactSubmissionInput) {
  const client = sanityWriteClient;
  if (!client) return null;

  return client.create({
    _type: "contactSubmission",
    ...input,
    status: "new",
    submittedAt: new Date().toISOString(),
    source: "website",
  });
}

export async function saveFeedbackSubmission(input: FeedbackSubmissionInput) {
  const client = sanityWriteClient;
  if (!client) return null;

  return client.create({
    _type: "feedbackSubmission",
    ...input,
    status: "new",
    submittedAt: new Date().toISOString(),
    source: "website",
  });
}

