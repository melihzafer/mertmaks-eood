import { accents } from "@/data/brand-colors";

export function getRouteAccent(pathname: string) {
  if (pathname.startsWith("/industrial")) return accents.industrial;
  if (pathname.startsWith("/construction")) return accents.construction;
  if (pathname.startsWith("/restaurant")) return accents.restaurant;
  if (pathname.startsWith("/samuil-hub") || pathname.startsWith("/about")) {
    return accents.supermarketAccent;
  }

  return accents.supermarket;
}
