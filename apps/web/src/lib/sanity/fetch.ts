import type { QueryParams } from "@sanity/client";
import { unstable_cache } from "next/cache";
import { sanityClient } from "./client";

const DEFAULT_REVALIDATE_SECONDS = 60;

function getRevalidateSeconds() {
  const configured = Number(process.env.SANITY_CACHE_REVALIDATE_SECONDS);

  return Number.isFinite(configured) && configured > 0
    ? configured
    : DEFAULT_REVALIDATE_SECONDS;
}

interface FetchOptions {
  params?: QueryParams;
  tags?: string[];
}

export async function fetchSanity<T>(
  query: string,
  { params = {}, tags = [] }: FetchOptions = {},
): Promise<T | null> {
  if (!sanityClient) return null;
  const client = sanityClient;

  const fetcher = () => client.fetch<T>(query, params, { cache: "no-store" });

  try {
    // If not in production, or if SANITY_REVALIDATE_SECRET is not configured for webhooks,
    // fetch fresh data on every request to avoid stale content.
    if (process.env.NODE_ENV !== "production" || !process.env.SANITY_REVALIDATE_SECRET) {
      return await fetcher();
    }

    if (tags.length === 0) {
      return await fetcher();
    }

    return await unstable_cache(fetcher, [query, JSON.stringify(params)], {
      tags,
      revalidate: getRevalidateSeconds(),
    })();
  } catch (error) {
    console.error("Sanity fetch failed; using static fallback.", error);
    return null;
  }
}
