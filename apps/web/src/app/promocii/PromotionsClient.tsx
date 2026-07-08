"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Search, X, Calendar, ChevronRight, Compass, Info, Check, Copy } from "lucide-react";
import { BrochureShareButton } from "@/components/features/brochure-sharing/BrochureShareButton";
import { accents } from "@/data/redesign-content";

export interface PromotionItem {
  id: string;
  title: string;
  description: string;
  label?: string;
  discount?: number;
  promoType?: string;
  oldPrice?: string;
  newPrice?: string;
  showPrice?: string;
  validFrom?: string;
  validTo?: string;
  terms: string[];
  imageUrl?: string;
  storeName: string;
  storeSlug: string;
  storePhone?: string;
  storeHours?: any;
  categoryName: string;
  accentColor: string;
  kind: "promotion";
  canonicalUrl: string;
}

interface PromotionsClientProps {
  promotions: PromotionItem[];
}

export function PromotionsClient({ promotions }: PromotionsClientProps) {
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePromo, setActivePromo] = useState<PromotionItem | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Business mappings for UI
  const storeTypes = [
    { title: "Всички", value: "all" },
    { title: "Супермаркет", value: "supermarket" },
    { title: "Домашни потреби", value: "industrial" },
    { title: "Строителство", value: "construction" },
    { title: "Ресторант Делиорман", value: "restaurant" },
  ];

  // Filter promotions
  const filteredPromotions = useMemo(() => {
    return promotions.filter((promo) => {
      const matchesStore = selectedStore === "all" || promo.storeSlug === selectedStore;
      
      const matchesCategory = selectedCategory === "all" || promo.categoryName === selectedCategory;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        promo.title.toLowerCase().includes(query) ||
        promo.description.toLowerCase().includes(query) ||
        promo.categoryName.toLowerCase().includes(query) ||
        promo.storeName.toLowerCase().includes(query);

      return matchesStore && matchesCategory && matchesSearch;
    });
  }, [promotions, selectedStore, selectedCategory, searchQuery]);

  // Compute categories dynamically based on selected store
  const availableCategories = useMemo(() => {
    const list = new Set<string>();
    promotions.forEach((promo) => {
      if (selectedStore === "all" || promo.storeSlug === selectedStore) {
        if (promo.categoryName) {
          list.add(promo.categoryName);
        }
      }
    });
    return Array.from(list);
  }, [promotions, selectedStore]);

  // Reset category filter if it becomes unavailable
  useEffect(() => {
    if (selectedCategory !== "all" && !availableCategories.includes(selectedCategory)) {
      setSelectedCategory("all");
    }
  }, [availableCategories, selectedCategory]);

  const handleCopyCode = (title: string) => {
    navigator.clipboard.writeText(title).then(() => {
      setCopiedItem(title);
      setTimeout(() => setCopiedItem(null), 2000);
    });
  };

  return (
    <div className="space-y-8">
      {/* Filters Area */}
      <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Потърсете оферта..."
              className="block w-full pl-10 pr-10 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Business Selectors */}
          <div className="md:col-span-8 flex flex-wrap gap-2 text-xs font-bold">
            {storeTypes.map((store) => (
              <button
                key={store.value}
                type="button"
                onClick={() => setSelectedStore(store.value)}
                className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                  selectedStore === store.value
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-200"
                }`}
              >
                {store.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        {availableCategories.length > 0 && (
          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-400 font-bold mr-2 uppercase tracking-wider text-[10px]">Категория:</span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg border transition-all font-semibold cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200"
              }`}
            >
              Всички категории
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all font-semibold cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promo) => (
          <article
            key={promo.id}
            className="bg-white border border-neutral-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Image Header */}
              <div className="aspect-[4/3] relative bg-neutral-50 flex items-center justify-center overflow-hidden">
                {promo.imageUrl ? (
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-3xl font-black text-neutral-300 uppercase tracking-widest">{promo.categoryName}</div>
                )}
                {promo.label && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                    {promo.label}
                  </div>
                )}
                <div
                  className="absolute bottom-3 left-3 bg-[#1A1A1A]/85 backdrop-blur-sm border border-neutral-800 text-[10px] font-bold text-white tracking-wide uppercase px-2.5 py-0.5 rounded"
                  style={{ borderLeftColor: promo.accentColor, borderLeftWidth: "3px" }}
                >
                  {promo.storeName}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  <span>{promo.categoryName}</span>
                  {promo.promoType && (
                    <>
                      <span>•</span>
                      <span>
                        {promo.promoType === "weekly" ? "Седмична" : promo.promoType === "monthly" ? "Месечна" : "Оферта"}
                      </span>
                    </>
                  )}
                </div>

                {promo.showPrice !== "hide" && (promo.newPrice || promo.oldPrice) ? (
                  <div className="flex items-baseline gap-2">
                    {promo.newPrice && <span className="text-2xl font-black text-red-600">{promo.newPrice}</span>}
                    {promo.oldPrice && <span className="text-sm font-semibold line-through text-neutral-400">{promo.oldPrice}</span>}
                  </div>
                ) : (
                  promo.label && <span className="inline-block text-xs font-bold bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-lg">{promo.label}</span>
                )}

                <h3 className="font-extrabold text-lg text-neutral-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                  {promo.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed font-medium">
                  {promo.description}
                </p>
              </div>
            </div>

            {/* Card Action footer */}
            <div className="p-6 pt-0 space-y-3">
              {promo.validTo && (
                <div className="text-[10px] text-neutral-400 font-bold border-t border-neutral-100 pt-3 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Валидна до: {promo.validTo}</span>
                </div>
              )}

              <div className="grid grid-cols-12 gap-2">
                <button
                  onClick={() => setActivePromo(promo)}
                  className="col-span-9 text-center py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Виж офертата</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="col-span-3 flex justify-center items-center bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl overflow-hidden">
                  <BrochureShareButton item={promo} />
                </div>
              </div>
            </div>
          </article>
        ))}

        {filteredPromotions.length === 0 && (
          <div className="col-span-full bg-white border border-dashed border-neutral-300 rounded-3xl p-16 text-center space-y-4">
            <Info className="h-10 w-10 text-neutral-400 mx-auto" />
            <h3 className="font-extrabold text-neutral-800 text-lg">Няма намерени оферти</h3>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Не открихме активни промоции, отговарящи на избраните филтри или дума за търсене.
            </p>
            <button
              onClick={() => {
                setSelectedStore("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="btn bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Изчисти филтрите
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal Overlay */}
      {activePromo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-neutral-200 max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header Close button */}
            <button
              onClick={() => setActivePromo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm border border-neutral-200 text-neutral-700 hover:text-neutral-900 rounded-full flex items-center justify-center shadow transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content Scroll Area */}
            <div className="overflow-y-auto flex-1">
              {/* Modal Image */}
              <div className="aspect-[16/10] relative bg-neutral-100 overflow-hidden">
                {activePromo.imageUrl ? (
                  <img
                    src={activePromo.imageUrl}
                    alt={activePromo.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300 font-black text-4xl">{activePromo.categoryName}</div>
                )}
                {activePromo.label && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                    {activePromo.label}
                  </div>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-red-600">
                    <span>{activePromo.storeName}</span>
                    <span>•</span>
                    <span>{activePromo.categoryName}</span>
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900 leading-tight">
                    {activePromo.title}
                  </h2>

                  {/* Price Block */}
                  {activePromo.showPrice !== "hide" && (activePromo.newPrice || activePromo.oldPrice) && (
                    <div className="flex items-baseline gap-3 bg-white p-4 border border-neutral-200/60 rounded-2xl">
                      <div>
                        <span className="block text-[10px] text-neutral-400 font-bold uppercase">Промо цена</span>
                        <span className="text-3xl font-black text-red-600">{activePromo.newPrice}</span>
                      </div>
                      {activePromo.oldPrice && (
                        <div className="border-l border-neutral-200 pl-4">
                          <span className="block text-[10px] text-neutral-400 font-bold uppercase">Стара цена</span>
                          <span className="text-lg font-semibold line-through text-neutral-400">{activePromo.oldPrice}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Описание на офертата</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    {activePromo.description}
                  </p>
                </div>

                {/* Validity and Location details */}
                <div className="bg-white border border-neutral-200/60 rounded-2xl p-4 space-y-3 text-xs text-neutral-500 font-semibold">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-neutral-400 shrink-0" />
                    <span>
                      Период на валидност:{" "}
                      <strong className="text-neutral-900 font-bold">
                        {activePromo.validFrom} - {activePromo.validTo}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-neutral-400 shrink-0" />
                    <span>Обект: <strong className="text-neutral-900 font-bold">{activePromo.storeName}</strong></span>
                  </div>
                </div>

                {/* Terms and conditions */}
                {activePromo.terms.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Условия на промоцията</h4>
                    <ul className="space-y-1.5">
                      {activePromo.terms.map((term, index) => (
                        <li key={index} className="flex gap-2 text-xs text-neutral-500 font-medium">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-6 bg-neutral-50 border-t border-neutral-200/60 flex flex-col sm:flex-row gap-3">
              {activePromo.storePhone && (
                <a
                  href={`tel:${activePromo.storePhone}`}
                  className="flex-1 text-center py-3 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4 text-neutral-400" />
                  <span>Обади се в обекта</span>
                </a>
              )}
              <Link
                href={`/${activePromo.storeSlug}`}
                onClick={() => setActivePromo(null)}
                className="flex-1 text-center py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Compass className="h-4 w-4" />
                <span>Как да стигна</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
