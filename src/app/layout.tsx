import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageTransition } from "../components/layout/PageTransition";
import { GestureWrapper } from "../components/interactive/GestureWrapper";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { ThemeToggle } from "../components/theme/ThemeToggle";
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

