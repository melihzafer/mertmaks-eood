import type { Metadata, Viewport } from "next";
import { Geologica, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ARButtonLoader } from "../components/layout/ARButtonLoader";
import { FeedbackWidget } from "@/components/features/FeedbackWidget";
import { SanityLiveRefresh } from "@/components/theme/SanityLiveRefresh";
import { ServiceWorkerProvider } from "../components/theme/ServiceWorkerProvider";
import { Toaster } from "@/components/ui/sonner";
import "./global.css";
import "./common.scss";
import { getLayoutContent } from "@/lib/cms/layout";
import { getSearchIndex } from "@/lib/cms/search";
import { SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

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

const DEFAULT_TITLE = "МЕРТМАКС ЕООД – Търговия на дребно в Самуил";
const DEFAULT_DESCRIPTION =
  "Вашият доверен партньор в Самуил и Разград - супермаркет, домашни потреби, строителен магазин и ресторант";

export async function generateMetadata(): Promise<Metadata> {
  const layoutContent = await getLayoutContent();
  const title = layoutContent.seo?.title || DEFAULT_TITLE;
  const description = layoutContent.seo?.description || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${layoutContent.brand.name}`,
    },
    description,
    keywords: [
      "Самуил",
      "Разград",
      "супермаркет",
      "строителство",
      "домашни потреби",
    ],
    manifest: "/manifest.json",
    alternates: { canonical: "/" },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icons/mmaks-short.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      ],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Мертмакс",
    },
    other: {
      "model:poster": "/icons/icon-512x512.png",
    },
    robots: layoutContent.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "bg_BG",
      url: "/",
      siteName: layoutContent.brand.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchItems, layoutContent] = await Promise.all([
    getSearchIndex(),
    getLayoutContent(),
  ]);

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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationJsonLd({
                brandName: layoutContent.brand.name,
                tagline: layoutContent.brand.tagline,
                location: layoutContent.brand.location,
              }),
            ),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd({ brandName: layoutContent.brand.name })),
          }}
        />
        <ServiceWorkerProvider />
        <SanityLiveRefresh />
        <Header
          searchItems={searchItems}
          mainLinks={layoutContent.mainLinks}
          mobileLinks={layoutContent.mobileLinks}
          storeLinks={layoutContent.storeLinks}
          searchLinks={layoutContent.searchLinks}
        />
        {children}
        <Toaster />
        <FeedbackWidget />
        <ARButtonLoader />
        <Footer
          brand={layoutContent.brand}
          footerLinks={layoutContent.footerLinks}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
