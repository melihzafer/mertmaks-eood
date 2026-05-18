/**
 * Store-specific Content Data
 * Store information for contact page and store-specific details
 */

import { ShoppingCart, Wrench, HardHat, type LucideIcon } from "lucide-react";

export interface StoreContact {
  name: string;
  icon: LucideIcon;
  color: string;
  address: string;
  phone: string;
  hours: string;
  email: string;
  position: { top: string; left: string };
  openTime: number;
  closeTime: number;
}

export const storeContacts: StoreContact[] = [
  {
    name: "Супермаркет MERTMAX",
    icon: ShoppingCart,
    color: "#E53E3E",
    address: "ул. Главна 1, с. Самуил, обл. Разград",
    phone: "+359 XXX XXX 001",
    hours: "Понеделник - Неделя: 8:00 - 20:00",
    email: "supermarket@mertmax.bg",
    position: { top: "40%", left: "35%" },
    openTime: 8,
    closeTime: 20,
  },
  {
    name: "Домашни потреби MERTMAX",
    icon: Wrench,
    color: "#D53F8C",
    address: "ул. Главна 2, с. Самуил, обл. Разград",
    phone: "+359 XXX XXX 002",
    hours: "Понеделник - Неделя: 8:00 - 20:00",
    email: "industrial@mertmax.bg",
    position: { top: "50%", left: "50%" },
    openTime: 8,
    closeTime: 20,
  },
  {
    name: "Строителство MERTMAX",
    icon: HardHat,
    color: "#2563EB",
    address: "ул. Главна 3, с. Самуил, обл. Разград",
    phone: "+359 XXX XXX 003",
    hours: "Понеделник - Неделя: 8:00 - 20:00",
    email: "construction@mertmax.bg",
    position: { top: "45%", left: "65%" },
    openTime: 8,
    closeTime: 20,
  },
];
