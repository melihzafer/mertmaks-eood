import type { Metadata, Viewport } from "next";
import { Geologica, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ARButtonLoader } from "../components/layout/ARButtonLoader";
import { FeedbackWidget } from "@/components/features/FeedbackWidget";
import { ServiceWorkerProvider } from "../components/theme/ServiceWorkerProvider";
import { Toaster } from "@/components/ui/sonner";
import "./global.css";
import "./common.scss";
import { getSearchIndex } from "@/lib/cms/search";

const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geologica",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#E53E3E",
};

export const metadata: Metadata = {
  title: "MERTMAX EOOD - Сърцето на Самуил",
  description:
    "Вашият доверен партньор в Самуил и Разград - супермаркет, домашни потреби, строителен магазин и ресторант",
  keywords: [
    "Самуил",
    "Разград",
    "супермаркет",
    "строителство",
    "домашни потреби",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Мертмакс",
  },
  other: {
    "model:poster": "/icons/icon-512x512.png",
  },
  openGraph: {
    title: "MERTMAX EOOD - Сърцето на Самуил",
    description: "Три магазина под един покрив",
    type: "website",
    locale: "bg_BG",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchItems = await getSearchIndex();

  return (
    <html
      lang="bg"
      className={`${geologica.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${manrope.className} antialiased`}
        suppressHydrationWarning
      >
        <ServiceWorkerProvider />
        <Header searchItems={searchItems} />
        {children}
        <Toaster />
        <FeedbackWidget />
        <ARButtonLoader />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
