import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function sanityImageUrl(source: unknown) {
  if (!builder || !source) return null;

  return builder.image(source);
}
