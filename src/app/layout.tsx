import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageTransition } from "../components/layout/PageTransition";
import { GestureWrapper } from "../components/interactive/GestureWrapper";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { ThemeToggle } from "../components/theme/ThemeToggle";
import { ServiceWorkerProvider } from "../components/theme/ServiceWorkerProvider";
import "./global.css";
import "./common.scss";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MERTMAX EOOD - Сърцето на Самуил",
  description:
    "Вашият доверен партньор в Самуил и Разград - Супермаркет, Промишлени Стоки и Строителство",
  keywords: [
    "Самуил",
    "Разград",
    "супермаркет",
    "строителство",
    "промишлени стоки",
  ],
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E53E3E" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Мертмакс",
  },
  openGraph: {
    title: "MERTMAX EOOD - Сърцето на Самуил",
    description: "Три магазина под един покрив",
    type: "website",
    locale: "bg_BG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ServiceWorkerProvider />
          <Header />
          <GestureWrapper>
            <PageTransition>
              <main className="min-h-screen">{children}</main>
            </PageTransition>
          </GestureWrapper>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
