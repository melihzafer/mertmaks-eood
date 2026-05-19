import type { QueryParams } from "@sanity/client";
import { unstable_cache } from "next/cache";
import { sanityClient } from "./client";

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

  const fetcher = () => client.fetch<T>(query, params);

  try {
    if (tags.length === 0) {
      return await fetcher();
    }

    return await unstable_cache(fetcher, [query, JSON.stringify(params)], {
      tags,
    })();
  } catch (error) {
    console.error("Sanity fetch failed; using static fallback.", error);
    return null;
  }
}
