import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/find-us",
  fallbackTitle: "Намери магазин",
  fallbackDescription:
    "Намерете най-близкия обект на МЕРТМАКС в Самуил - супермаркет, строителен магазин, домашни потреби и ресторант.",
});

export default function FindUsLayout({ children }: { children: ReactNode }) {
  return <div className="find-us-shell min-h-[100dvh] bg-background">{children}</div>;
}
