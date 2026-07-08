import { cache } from "react";
import {
  brand as staticBrand,
  footerLinks as staticFooterLinks,
  mobileLinks as staticMobileLinks,
  searchLinks as staticSearchLinks,
  storesMenuLinks as staticStoresMenuLinks,
} from "@/data/redesign-content";
import { contentTags, navigationQuery, siteSettingsQuery } from "@mertmaks/content/queries";
import { fetchSanity } from "@/lib/sanity/fetch";
import { getRouteAccent } from "@/lib/route-accent";
import type { SeoInput } from "@/lib/seo";

export type LayoutBrand = typeof staticBrand;

export interface LayoutLink {
  href: string;
  label: string;
  description?: string;
  color?: string;
}

export interface LayoutContent {
  brand: LayoutBrand;
  mainLinks: LayoutLink[];
  mobileLinks: LayoutLink[];
  storeLinks: LayoutLink[];
  footerLinks: LayoutLink[];
  searchLinks: LayoutLink[];
  seo?: SeoInput;
}

interface SanitySiteSettings {
  brandName?: string;
  legalForm?: string;
  tagline?: string;
  footerText?: string;
  location?: string;
  hoursSummary?: string;
  seo?: SeoInput;
}

interface SanityNavigationItem {
  label?: string;
  href?: string;
  placement?: "main" | "mobile" | "stores" | "footer" | "search";
  description?: string;
  accent?: string;
}

const staticMainLinks: LayoutLink[] = [
  { href: "/", label: "Начало" },
  { href: "/promocii", label: "Промоции" },
  { href: "/about", label: "За нас" },
  { href: "/contact", label: "Контакти" },
];

function mapNavigationItem(item: SanityNavigationItem): LayoutLink | null {
  if (!item.href || !item.label) return null;

  return {
    href: item.href,
    label: item.label,
    description: item.description,
    color: item.accent || getRouteAccent(item.href),
  };
}

function linksForPlacement(
  items: SanityNavigationItem[] | undefined,
  placement: SanityNavigationItem["placement"],
  fallback: LayoutLink[],
) {
  const links =
    items
      ?.filter((item) => item.placement === placement)
      .map(mapNavigationItem)
      .filter((item): item is LayoutLink => Boolean(item)) ?? [];

  return links.length ? links : fallback;
}

function mergeBrand(settings?: SanitySiteSettings | null): LayoutBrand {
  return {
    ...staticBrand,
    name: settings?.brandName ?? staticBrand.name,
    legalForm: settings?.legalForm ?? staticBrand.legalForm,
    tagline: settings?.tagline ?? staticBrand.tagline,
    footerText: settings?.footerText ?? staticBrand.footerText,
    location: settings?.location ?? staticBrand.location,
    hours: settings?.hoursSummary ?? staticBrand.hours,
  };
}

export const getLayoutContent = cache(async (): Promise<LayoutContent> => {
  const [settings, navigation] = await Promise.all([
    fetchSanity<SanitySiteSettings>(siteSettingsQuery, {
      tags: [contentTags.siteSettings],
    }),
    fetchSanity<SanityNavigationItem[]>(navigationQuery, {
      tags: [contentTags.navigation],
    }),
  ]);

  return {
    brand: mergeBrand(settings),
    mainLinks: linksForPlacement(navigation ?? undefined, "main", staticMainLinks),
    mobileLinks: linksForPlacement(navigation ?? undefined, "mobile", staticMobileLinks),
    storeLinks: linksForPlacement(
      navigation ?? undefined,
      "stores",
      staticStoresMenuLinks,
    ),
    footerLinks: linksForPlacement(navigation ?? undefined, "footer", staticFooterLinks),
    searchLinks: linksForPlacement(navigation ?? undefined, "search", staticSearchLinks),
    seo: settings?.seo,
  };
});

