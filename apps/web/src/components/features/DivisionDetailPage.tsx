"use client";

import { useState, useMemo } from "react";
import type { CSSProperties } from "react";
import type { DivisionPageModel } from "@/lib/cms/divisions";
import type { StoreCommerceModel } from "@/lib/cms/store-commerce";
import type { DivisionOfferings } from "@/data/offerings";
import type { WeeklyPromotion } from "@/data/weekly-promotions";
import type { MonthlyPromotion } from "@/data/monthly-promotions";
import type { StoreArticle } from "@/data/blog";
import { FAQSection } from "@/components/features/FAQSection";
import { StoreInfo } from "@/components/features/StoreInfo";
import { OfferingsSection } from "@/components/features/OfferingsSection";
import { UnifiedPromotionsSection } from "@/components/features/UnifiedPromotionsSection";
import { StoreBlogSection } from "@/components/features/StoreBlogSection";
import { NewsletterSubscribe } from "@/components/features/NewsletterSubscribe";
import SingleStoreMapClient from "@/components/features/SingleStoreMapClient";
import { getStoreStatus } from "@/lib/stores";
import { motion, AnimatePresence } from "framer-motion";
import {
  Milk,
  Apple,
  Sparkles,
  Coffee,
  Utensils,
  Shirt,
  Flower2,
  Box,
  Paintbrush,
  Layers,
  Droplets,
  Home,
  ShoppingBag,
  Search,
  X,
  Check,
  Copy,
} from "lucide-react";

type AccentStyle = CSSProperties & {
  "--theme-accent"?: string;
  "--diagonal-color"?: string;
};

interface DivisionDetailPageProps {
  page: DivisionPageModel;
  commerce?: StoreCommerceModel;
  offerings?: DivisionOfferings;
  weeklyPromotions?: WeeklyPromotion[];
  monthlyPromotions?: MonthlyPromotion[];
  articles?: StoreArticle[];
}

function getCategoryIcon(code: string) {
  const mapping: Record<string, any> = {
    "МЛ": Milk,
    "ПЛ": Apple,
    "ДМ": Sparkles,
    "НП": Coffee,
    "КХ": Utensils,
    "ТК": Shirt,
    "КО": Flower2,
    "ДР": Box,
    "БО": Paintbrush,
    "СМ": Layers,
    "ВК": Droplets,
    "ДВ": Home,
  };
  return mapping[code] || ShoppingBag;
}

export function DivisionDetailPage({
  page,
  commerce,
  offerings,
  weeklyPromotions = [],
  monthlyPromotions = [],
  articles = [],
}: DivisionDetailPageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const style = {
    "--theme-accent": page.accent,
    "--diagonal-color": "diagonal" in page ? page.diagonal : page.accent,
  } as AccentStyle;

  // Detect which division we are in based on accent color or page content
  const isSupermarket = page.accent === "#E53E3E" || page.heroIndex?.includes("Супермаркет");
  const isConstruction = page.accent === "#2563EB" || page.heroIndex?.includes("Строител");
  const isIndustrial = page.accent === "#D53F8C" || page.heroIndex?.includes("Домашни");

  const quickSuggestions = useMemo(() => {
    if (isSupermarket) return ["мляко", "кашкавал", "хляб", "пресен", "ядки"];
    if (isConstruction) return ["боя", "лепило", "тръби", "гипс", "инструменти"];
    if (isIndustrial) return ["чаши", "кърпи", "козметика", "посуда", "сапун"];
    return [];
  }, [isSupermarket, isConstruction, isIndustrial]);

  const handleItemClick = (item: string) => {
    navigator.clipboard.writeText(item).then(() => {
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    });
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return { cards: page.cards || [], isSearching: false, totalCount: 0 };
    }
    const query = searchQuery.toLowerCase().trim();
    const resultCards: typeof page.cards = [];
    let matchCount = 0;

    (page.cards || []).forEach((card) => {
      const cardTitleMatch = card.title?.toLowerCase().includes(query);
      const matchingItems = card.items?.filter((item) =>
        item.toLowerCase().includes(query)
      ) || [];

      if (cardTitleMatch || matchingItems.length > 0) {
        resultCards.push({
          ...card,
          items: matchingItems.length > 0 ? matchingItems : card.items,
        });
        matchCount += matchingItems.length || card.items?.length || 0;
      }
    });

    return { cards: resultCards, isSearching: true, totalCount: matchCount };
  }, [page.cards, searchQuery]);

  return (
    <main style={style}>
      <section className="division-hero">
        {"diagonal" in page && <div className="diagonal" />}
        {"image" in page && page.image && (
          <div
            className="division-hero-image"
            style={{ backgroundImage: `url(${page.image})` }}
          />
        )}
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--surface)" }}>
            {page.heroIndex}
          </div>
          <h1 style={{ color: "var(--surface)" }}>{page.title}</h1>
          <p style={{ color: "var(--muted-on-dark)" }}>{page.description}</p>
          
          {/* Action CTAs */}
          <div className="cluster mt-6 flex flex-wrap gap-4">
            {isSupermarket && (
              <a href="#promotions" className="btn primary" style={{ backgroundColor: page.accent, border: "none" }}>
                Виж седмични оферти
              </a>
            )}
            {isConstruction && (
              <a href="#contact" className="btn primary" style={{ backgroundColor: page.accent, border: "none" }}>
                Попитай за наличност
              </a>
            )}
            {isIndustrial && (
              <a href="#categories" className="btn primary" style={{ backgroundColor: page.accent, border: "none" }}>
                Разгледай категории
              </a>
            )}
            {commerce?.store.phone && (
              <a href={`tel:${commerce.store.phone}`} className="btn" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
                Обади се: {commerce.store.phone}
              </a>
            )}
            <a
              href={commerce?.store.coordinates ? `https://www.google.com/maps/dir/?api=1&destination=${commerce.store.coordinates.lat},${commerce.store.coordinates.lng}` : `https://www.google.com/maps/dir/?api=1&destination=43.513983,26.741417`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
            >
              Как да стигна
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-6 bg-white border-b border-neutral-200/60 shadow-sm relative z-10 text-neutral-800">
        <div className="container max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/50 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Статус</span>
            <span className="text-sm font-extrabold text-neutral-800 mt-2 truncate flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${commerce?.store ? getStoreStatus(commerce.store).isOpen ? 'bg-emerald-500' : 'bg-red-500' : 'bg-neutral-300'}`} />
              {commerce?.store ? getStoreStatus(commerce.store).message : 'Проверка на статус'}
            </span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/50 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Адрес в Самуил</span>
            <span className="text-sm font-extrabold text-neutral-800 mt-2 truncate">
              {commerce?.store.address ?? 'ул. Хаджи Димитър 6'}
            </span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/50 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Телефон</span>
            {commerce?.store.phone ? (
              <a href={`tel:${commerce.store.phone}`} className="text-sm font-extrabold text-red-600 mt-2 hover:underline truncate">
                {commerce.store.phone}
              </a>
            ) : (
              <span className="text-sm font-extrabold text-neutral-800 mt-2 truncate">+359 89 476 6273</span>
            )}
          </div>

          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/50 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Работно време</span>
            <span className="text-sm font-extrabold text-neutral-800 mt-2 truncate">
              Пон-Нед: 8:00 - 20:00
            </span>
          </div>
        </div>
      </section>

      <UnifiedPromotionsSection
        weeklyPromotions={weeklyPromotions}
        monthlyPromotions={monthlyPromotions}
        brochurePromotions={commerce?.promotions ?? []}
        brochureProducts={commerce?.products ?? []}
        accentColor={page.accent}
      />

      <section id="categories" className="section bg-slate-50/50 dark:bg-slate-900/10 py-12 md:py-16">
        <div className="container max-w-6xl mx-auto px-4">
          {"intro" in page && page.intro && (
            <div className="indexed-head-compact text-center mb-10">
              <div className="eyebrow text-xs font-mono uppercase tracking-wider text-[var(--theme-accent)] bg-[color:var(--theme-accent)]/10 px-3 py-1 rounded-full inline-block">
                {page.intro.index} / {page.intro.eyebrow}
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-3">
                {page.intro.title}
              </h2>
            </div>
          )}

          {/* Interactive Search Bar */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Потърсете продукт или категория стоки..."
                className="block w-full pl-11 pr-12 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-accent)] focus:border-transparent transition-all shadow-sm text-base"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : null}
            </div>

            {/* Quick Suggestions */}
            {quickSuggestions.length > 0 && !searchQuery && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
                <span className="text-slate-400 font-medium">Бързо търсене:</span>
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:border-[color:var(--theme-accent)] hover:text-[color:var(--theme-accent)] transition-all cursor-pointer shadow-sm font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Explorer Layout */}
          {!filteredData.isSearching ? (
            /* Tabbed Interface for default view */
            <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-900/50 rounded-3xl p-4 md:p-6 border border-slate-100 dark:border-slate-800/80 shadow-md">
              {/* Category tabs list */}
              <div className="w-full md:w-5/12 lg:w-4/12 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scrollbar-none snap-x border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 md:pr-4">
                {(page.cards || []).map((card, idx) => {
                  const IconComponent = getCategoryIcon(card.icon || "");
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={card.title}
                      onClick={() => setActiveTab(idx)}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all duration-200 snap-center shrink-0 cursor-pointer w-auto md:w-full ${
                        isActive
                          ? "bg-[color:var(--theme-accent)] text-white shadow-lg shadow-[color:var(--theme-accent)]/20 translate-x-1"
                          : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl shrink-0 transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white dark:bg-slate-800 text-[color:var(--theme-accent)] shadow-sm"
                        }`}
                      >
                        <IconComponent className="h-5 w-5 stroke-[2.5]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm md:text-base tracking-tight truncate leading-tight">
                          {card.title}
                        </span>
                        <span
                          className={`text-xs mt-0.5 font-mono ${
                            isActive ? "text-white/80" : "text-slate-400"
                          }`}
                        >
                          {card.items?.length || 0} {card.items?.length === 1 ? 'артикул' : 'артикула'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Category items pane */}
              <div className="w-full md:w-7/12 lg:w-8/12 md:pl-4 min-h-[300px] flex flex-col">
                <AnimatePresence mode="wait">
                  {(page.cards || []).map((card, idx) => {
                    if (idx !== activeTab) return null;
                    const IconComponent = getCategoryIcon(card.icon || "");
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-[color:var(--theme-accent)]/10 text-[color:var(--theme-accent)] rounded-2xl">
                              <IconComponent className="h-6 w-6 stroke-[2.5]" />
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight">
                                {card.title}
                              </h3>
                              <p className="text-sm text-slate-400 mt-0.5 font-medium">
                                Кликнете върху артикул, за да го копирате бързо
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {(card.items || []).map((item) => {
                              const isCopied = copiedItem === item;
                              return (
                                <button
                                  key={item}
                                  onClick={() => handleItemClick(item)}
                                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-sm font-medium transition-all group relative cursor-pointer ${
                                    isCopied
                                      ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 animate-pulse"
                                      : "bg-slate-50 hover:bg-white dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-100 hover:border-slate-200 dark:border-transparent dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:shadow-sm"
                                  }`}
                                >
                                  <span className="pr-4 truncate">{item}</span>
                                  <div className="shrink-0 flex items-center justify-center">
                                    {isCopied ? (
                                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500 transition-colors" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Store Context Box */}
                        <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 rounded-2xl flex items-center gap-3 text-xs text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <span>Наличност за физическия ни магазин в Самуил. Посетете ни на място, за да разгледате пълния асортимент.</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Search results view */
            <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-5 md:p-8 border border-slate-100 dark:border-slate-800/80 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                    Резултати от търсенето
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Намерени {filteredData.totalCount} {filteredData.totalCount === 1 ? 'артикул' : 'артикула'} за &ldquo;{searchQuery}&rdquo;
                  </p>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-[color:var(--theme-accent)] hover:opacity-85 transition-all cursor-pointer px-3 py-1.5 bg-[color:var(--theme-accent)]/10 rounded-lg"
                >
                  Изчисти търсенето
                </button>
              </div>

              {filteredData.cards.length > 0 ? (
                <div className="space-y-6">
                  {filteredData.cards.map((card) => {
                    const IconComponent = getCategoryIcon(card.icon || "");
                    return (
                      <div key={card.title} className="border-b border-slate-100/50 dark:border-slate-800/30 last:border-b-0 pb-6 last:pb-0">
                        <div className="flex items-center gap-2 mb-3">
                          <IconComponent className="h-4.5 w-4.5 text-[color:var(--theme-accent)]" />
                          <span className="font-semibold text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-wider">
                            {card.title}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {(card.items || []).map((item) => {
                            const isCopied = copiedItem === item;
                            return (
                              <button
                                key={item}
                                onClick={() => handleItemClick(item)}
                                className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-sm font-medium transition-all group relative cursor-pointer ${
                                  isCopied
                                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 animate-pulse"
                                    : "bg-slate-50 hover:bg-white dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-100 hover:border-slate-200 dark:border-transparent dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:shadow-sm"
                                }`}
                              >
                                <span className="pr-4 truncate">{item}</span>
                                <div className="shrink-0 flex items-center justify-center">
                                  {isCopied ? (
                                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500 transition-colors" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty state for search query */
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-white text-base">
                    Няма намерени съвпадения
                  </h4>
                  <p className="text-sm text-slate-400 max-w-xs mx-auto mt-1.5">
                    Не открихме продукти или категории, съответстващи на &ldquo;{searchQuery}&rdquo;. Опитайте с друга дума.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {offerings && <OfferingsSection offerings={offerings} />}

      {commerce && (
        <section className="section-tight rule">
          <div className="container">
            <div className="store-commerce-grid">
              <div className="store-commerce-left">
                <div className="indexed-head-compact" style={{ marginBottom: "24px" }}>
                  <div className="eyebrow">Контакт и работно време</div>
                  <h2>Проверете обекта преди посещение.</h2>
                  <p className="lead">
                    Телефонът, адресът и часовете са отделни за всеки магазин и могат да се
                    обновяват от Sanity.
                  </p>
                </div>
                <div className="leaflet-frame" style={{ height: "450px", minHeight: "400px" }}>
                  <SingleStoreMapClient stores={[commerce.store]} height="100%" />
                </div>
              </div>
              <StoreInfo store={commerce.store} />
            </div>
          </div>
        </section>
      )}

      <StoreBlogSection articles={articles} accentColor={page.accent} />

      {commerce && <FAQSection faqs={commerce.faqs} />}

      <NewsletterSubscribe accentColor={page.accent} />

      <section className="feature-strip">
        <div className="features">
          {page.features.map((feature) => (
            <div className="feature" key={feature.index}>
              <b>{feature.index}</b>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

