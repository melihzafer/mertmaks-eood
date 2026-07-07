import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price string to ensure it ends with the Euro symbol (€)
 * or replaces legacy BGN/Lev currency indicators with € (e.g. "1.99 лв" -> "1.99 €").
 */
export function formatPrice(price: string | undefined): string | undefined {
  if (!price) return price;

  let formatted = price.trim();

  // If it already has € or EUR, return it
  if (formatted.includes("€") || formatted.includes("EUR")) {
    return formatted;
  }

  // Replace Bulgarian Lev / BGN symbols with Euro
  const levRegex = /(?:лв\.?|lv\.?|bgn)/gi;
  if (levRegex.test(formatted)) {
    formatted = formatted.replace(levRegex, "€");
    // Ensure there's a space before €
    formatted = formatted.replace(/(\d)€/g, "$1 €");
    return formatted;
  }

  // If it has a unit slash, e.g. "1.99/кг" or "1.99 / кг"
  if (formatted.includes("/")) {
    const parts = formatted.split("/");
    const pricePart = parts[0].trim();
    if (/^\d+(?:[.,]\d+)?$/.test(pricePart)) {
      return `${pricePart} €/${parts.slice(1).join("/")}`;
    }
  }

  // If it's a plain number
  if (/^\d+(?:[.,]\d+)?$/.test(formatted)) {
    return `${formatted} €`;
  }

  return formatted;
}

