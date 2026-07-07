import type { QueryParams } from "@sanity/client";
import { sanityClient } from "./client";

const DEFAULT_FETCH_TIMEOUT_MS = 10_000;

function getFetchTimeoutMs() {
  const configured = Number(process.env.SANITY_FETCH_TIMEOUT_MS);

  return Number.isFinite(configured) && configured > 0
    ? configured
    : DEFAULT_FETCH_TIMEOUT_MS;
}

interface FetchOptions {
  params?: QueryParams;
  // Kept for caller compatibility; Sanity reads are intentionally uncached.
  tags?: string[];
}

export async function fetchSanity<T>(
  query: string,
  { params = {} }: FetchOptions = {},
): Promise<T | null> {
  if (!sanityClient) return null;
  const client = sanityClient;

  try {
    return await client.fetch<T>(query, params, {
      cache: "no-store",
      timeout: getFetchTimeoutMs(),
    });
  } catch (error) {
    console.error("Sanity fetch failed; using static fallback.", error);
    return null;
  }
}
