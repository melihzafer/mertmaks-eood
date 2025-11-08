import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PageTransition } from '../components/PageTransition';
import { GestureWrapper } from '../components/GestureWrapper';
import './global.css';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MERTMAX EOOD - Сърцето на Самуил',
  description: 'Вашият доверен партньор в Самуил и Разград - Супермаркет, Промишлени Стоки и Строителство',
  keywords: ['Самуил', 'Разград', 'супермаркет', 'строителство', 'промишлени стоки'],
  openGraph: {
    title: 'MERTMAX EOOD - Сърцето на Самуил',
    description: 'Три магазина под един покрив',
    type: 'website',
    locale: 'bg_BG',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={inter.variable}>
      <body 
        className={`${inter.className} antialiased bg-gray-50 text-gray-900`}
        suppressHydrationWarning
      >
        <Header />
        <GestureWrapper>
          <PageTransition>
            <main className="min-h-screen">
              {children}
            </main>
          </PageTransition>
        </GestureWrapper>
        <Footer />
      </body>
    </html>
  );
}
