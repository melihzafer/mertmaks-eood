export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_API_VERSION ||
  "2026-05-19";

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

export const sanityReadToken = process.env.SANITY_API_READ_TOKEN;

export const sanityWriteToken =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN;

export const sanityRevalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

export const isSanityConfigured = Boolean(sanityProjectId && sanityDataset);

export const isSanityWriteConfigured = Boolean(
  sanityProjectId && sanityDataset && sanityWriteToken,
);
