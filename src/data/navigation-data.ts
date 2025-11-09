/**
 * Navigation Data
 * Centralized navigation links, menu items, and routing data
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface QuickLink extends NavLink {
  color?: string;
}

// Main navigation menu
export const mainNavLinks: NavLink[] = [
  { href: "/", label: "Начало" },
  { href: "/supermarket", label: "Хранителен" },
  { href: "/industrial", label: "Индустриален" },
  { href: "/construction", label: "Строителен" },
  { href: "/restaurant", label: "Ресторант" },
  { href: "/contact", label: "Контакти" },
];

// Footer quick links with color accents
export const footerQuickLinks: QuickLink[] = [
  {
    href: "/supermarket",
    label: "Супермаркет",
    color: "#E53E3E",
  },
  {
    href: "/industrial",
    label: "Промишлени Стоки",
    color: "#D53F8C",
  },
  {
    href: "/construction",
    label: "Строителство",
    color: "#3182CE",
  },
  {
    href: "/restaurant",
    label: "Ресторант Делиорман",
    color: "#F59E0B",
  },
  {
    href: "/about",
    label: "За Нас",
    color: "#000000",
  },
  {
    href: "/contact",
    label: "Контакти",
    color: "#000000",
  },
];
