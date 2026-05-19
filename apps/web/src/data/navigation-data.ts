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
  { href: "/industrial", label: "Домашни потреби" },
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
    label: "Домашни потреби",
    color: "#D53F8C",
  },
  {
    href: "/construction",
    label: "Строителство",
    color: "#2563EB",
  },
  {
    href: "/restaurant",
    label: "Ресторант Делиорман",
    color: "#8B4513",
  },
  {
    href: "/about",
    label: "За нас",
    color: "#000000",
  },
  {
    href: "/contact",
    label: "Контакти",
    color: "#000000",
  },
];
