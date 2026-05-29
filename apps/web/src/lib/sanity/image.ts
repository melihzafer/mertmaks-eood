import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function sanityImageUrl(source: unknown) {
  if (!builder || !source) return null;

  return builder.image(source);
}

export function getFallbackImage(storeSlug: string, categoryName?: string): string {
  const cat = categoryName?.toLowerCase() || "";
  
  if (storeSlug === "supermarket") {
    if (cat.includes("напит")) return "/images/products/beverages.png";
    if (cat.includes("млеч")) return "/images/products/dairy.png";
    return "/images/products/fruits_veg.png";
  }
  if (storeSlug === "construction") {
    if (cat.includes("боя") || cat.includes("покрит")) return "/images/products/paints.png";
    if (cat.includes("смес") || cat.includes("цимент")) return "/images/products/mixes.png";
    return "/images/products/tools.png";
  }
  if (storeSlug === "industrial") {
    if (cat.includes("посуд") || cat.includes("кухн")) return "/images/products/kitchenware.png";
    if (cat.includes("текст")) return "/images/products/textiles.png";
    return "/images/products/cosmetics.png";
  }
  if (storeSlug === "restaurant") {
    if (cat.includes("грид") || cat.includes("скар")) return "/images/products/grill.png";
    if (cat.includes("кетър") || cat.includes("събит")) return "/images/products/catering.png";
    return "/images/products/lunch.png";
  }
  return "/images/products/fruits_veg.png";
}
