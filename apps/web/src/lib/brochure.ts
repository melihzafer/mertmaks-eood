export type BrochureItemKind = "promotion" | "product";

export interface BrochureShareItem {
  id: string;
  kind: BrochureItemKind;
  title: string;
  description?: string;
  label?: string;
  category?: string;
  storeName?: string;
  storeSlug?: string;
  storePhone?: string;
  accentColor: string;
  imageUrl?: string;
  validFrom?: string;
  validTo?: string;
  canonicalUrl: string;
  terms?: string[];
  promoType?: string;
  oldPrice?: string;
  newPrice?: string;
  showPrice?: string;
}

export type BrochureTemplate = "square" | "story" | "landscape";
export type BrochureBackground = "light" | "dark" | "brand";

const allowedImageHosts = new Set(["cdn.sanity.io", "images.unsplash.com"]);
const fallbackAccent = "#E53E3E";

export interface BrochureDesignState {
  template: BrochureTemplate;
  headline: string;
  note: string;
  accentColor: string;
  background: BrochureBackground;
  showContact: boolean;
  showValidity: boolean;
}

export function sanitizeHexColor(value?: string) {
  return value && /^#[0-9a-f]{6}$/i.test(value) ? value : fallbackAccent;
}

export function sanitizeCanonicalPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export function isAllowedBrochureImageUrl(value?: string) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && allowedImageHosts.has(url.hostname);
  } catch {
    return false;
  }
}
