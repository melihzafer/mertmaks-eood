import type { ReactNode } from "react";

export const metadata = {
  title: "Намери магазин — МЕРТМАКС",
};

export default function FindUsLayout({ children }: { children: ReactNode }) {
  return <div className="find-us-shell min-h-[100dvh] bg-background">{children}</div>;
}
