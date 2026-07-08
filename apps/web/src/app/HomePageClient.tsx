"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { CSSProperties } from "react";
import { accents } from "@/data/redesign-content";
import type { HomePageModel } from "@/lib/cms/home";
import { BrochureShareButton } from "@/components/features/brochure-sharing/BrochureShareButton";
import { Phone, MapPin, Clock, ArrowRight, Star, ShieldCheck, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import type { Store } from "@/lib/stores";
import { getStoreStatus } from "@/lib/stores";
import SingleStoreMapClient from "@/components/features/SingleStoreMapClient";
import { contactInfo } from "@/data/company-data";

interface HomePageClientProps {
  homePage: HomePageModel;
  stores: Store[];
}

export function HomePageClient({ homePage, stores }: HomePageClientProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visiblePromotions = useMemo(() => {
    return activeFilter === "all"
      ? homePage.promotions.slice(0, 4)
      : homePage.promotions.filter((promo) => promo.category === activeFilter).slice(0, 4);
  }, [homePage.promotions, activeFilter]);

  const businessCardsData = [
    {
      id: "supermarket",
      title: "Супермаркет",
      description: "Храна, напитки, свежи продукти и познати марки за ежедневното пазаруване.",
      label: "Супермаркет / Храни",
      color: accents.supermarket,
      image: "/images/supermarket.png",
      href: "/supermarket",
    },
    {
      id: "industrial",
      title: "Домашни потреби",
      description: "Посуда, текстил, козметика, кухненски стоки и малки полезни неща за дома.",
      label: "Домакинство / Нехранителни стоки",
      color: accents.industrial,
      image: "/images/industrial.png",
      href: "/industrial",
    },
    {
      id: "construction",
      title: "Строителство",
      description: "Материали, бои, инструменти и решения за ремонт, двор и малък обект.",
      label: "Строителни материали / Ремонт",
      color: accents.construction,
      image: "/images/construction.png",
      href: "/construction",
    },
    {
      id: "restaurant",
      title: "Ресторант Делиорман",
      description: "Готвена храна, обедно меню, скара и спокойно място за сядане.",
      label: "Ресторант / Топла кухня",
      color: accents.restaurant,
      image: "/images/restaurant.png",
      href: "/restaurant",
    },
  ];

  // Helper to get store status message on client side
  const getStatusLabel = (storeId: string) => {
    const store = stores.find((s) => s.id === storeId);
    if (!store) return "Затворено днес";
    const status = getStoreStatus(store);
    return status.isOpen ? status.message : "Затворено в момента";
  };

  const getPhoneLabel = (storeId: string) => {
    const store = stores.find((s) => s.id === storeId);
    return store ? store.phone : "+359 89 476 6273";
  };

  return (
    <main className="bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-[#FAF6F0] border-b border-neutral-100 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-red-100">
              <Star className="h-3 w-3 fill-red-600" />
              <span>Добре дошли в МЕРТМАКС</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
              МЕРТМАКС — <span className="text-red-600">всичко необходимо</span> на едно място
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-medium">
              Супермаркет, стоки за дома, строителни материали и ресторант Делиорман — четири обекта за ежедневните нужди в Самуил.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#stores" className="btn bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-600/10 hover:shadow-red-600/20 text-center transition-all flex items-center justify-center gap-2">
                <span>Разгледай обектите</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link href="/contact" className="btn border border-neutral-300 hover:bg-neutral-100/50 bg-white/50 text-neutral-800 font-bold px-8 py-4 rounded-xl text-center transition-all flex items-center justify-center gap-2">
                <span>Намери ни</span>
                <MapPin className="h-5 w-5" />
              </Link>
            </div>

            {/* Trust Status Row */}
            <div className="pt-8 border-t border-neutral-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-neutral-100 rounded-lg text-red-600 font-black text-lg">3</div>
                <div className="text-xs text-neutral-500 font-bold leading-tight">магазина на разположение</div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-neutral-100 rounded-lg text-red-600 font-black text-lg">20+</div>
                <div className="text-xs text-neutral-500 font-bold leading-tight">години опит и доверие</div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-neutral-100 rounded-lg text-red-600 font-black text-lg">100+</div>
                <div className="text-xs text-neutral-500 font-bold leading-tight">марки с гарантиран произход</div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-neutral-100 rounded-lg text-red-600 font-black text-lg">7</div>
                <div className="text-xs text-neutral-500 font-bold leading-tight">дни в седмицата отворено</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[400px] aspect-square bg-gradient-to-tr from-red-600 to-amber-500 rounded-[40px] shadow-2xl p-1 transform rotate-2">
              <div className="w-full h-full bg-[#FAF8F5] rounded-[38px] p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
                    <span className="font-bold text-xs uppercase tracking-wider text-neutral-400">Нашите Обекти</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-red-50/50 hover:bg-red-50 rounded-xl transition-all border border-red-100/50">
                      <span className="font-bold text-sm text-red-700">Супермаркет</span>
                      <ChevronRight className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-pink-50/50 hover:bg-pink-50 rounded-xl transition-all border border-pink-100/50">
                      <span className="font-bold text-sm text-pink-700">Домашни потреби</span>
                      <ChevronRight className="h-4 w-4 text-pink-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-all border border-blue-100/50">
                      <span className="font-bold text-sm text-blue-700">Строителство</span>
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50/50 hover:bg-amber-50 rounded-xl transition-all border border-amber-100/50">
                      <span className="font-bold text-sm text-amber-700">Ресторант Делиорман</span>
                      <ChevronRight className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <Clock className="h-5 w-5 text-neutral-400" />
                  <div className="text-xs text-neutral-600 font-semibold leading-normal">
                    Работно време за пазаруване:<br/>
                    <strong className="text-neutral-900 font-bold">Всеки ден от 08:00 до 20:00</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Cards Section */}
      <section className="py-20" id="stores">
        <div className="container mx-auto max-w-6xl px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-red-600 bg-red-50 border border-red-100/50 px-3 py-1 rounded-full font-bold">Обекти в Самуил</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
              Четири силни посоки. Едно местно име.
            </h2>
            <p className="text-neutral-500 font-medium">
              Изберете конкретен обект, за да разгледате текущите оферти, асортимента от продукти, контактната форма и специфичното работно време.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessCardsData.map((card) => (
              <div key={card.id} className="bg-white border border-neutral-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="aspect-[4/3] relative overflow-hidden bg-neutral-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-neutral-200 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full text-neutral-700">
                      {card.label}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-red-600 transition-colors">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="flex flex-col gap-2 pt-3 border-t border-neutral-100 text-xs text-neutral-500 font-semibold">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                      <span>{getStatusLabel(card.id)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                      <a href={`tel:${getPhoneLabel(card.id)}`} className="hover:text-red-600 transition-colors">
                        {getPhoneLabel(card.id)}
                      </a>
                    </div>
                  </div>
                  <Link
                    href={card.href}
                    className="w-full text-center py-3 bg-neutral-50 hover:bg-neutral-900 hover:text-white border border-neutral-200 group-hover:border-neutral-900 rounded-xl font-bold text-sm text-neutral-700 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Разгледай</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Promotions */}
      {homePage.promotions.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-transparent to-[#F2EFEA] border-t border-neutral-200/40">
          <div className="container mx-auto max-w-6xl px-4 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-red-600 bg-red-50 border border-red-100/50 px-3 py-1 rounded-full font-bold">Актуални оферти</span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
                  Акценти тази седмица
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {[
                  ["all", "Всички"],
                  ["food", "Храни"],
                  ["tools", "Инструменти"],
                  ["home", "Дом"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    className={`px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm border ${
                      activeFilter === value
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200"
                    }`}
                    onClick={() => setActiveFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visiblePromotions.map((promo) => (
                <article
                  key={promo.id}
                  className="bg-white border border-neutral-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] relative bg-neutral-50 flex items-center justify-center overflow-hidden">
                      {promo.imageUrl ? (
                        <img
                          src={promo.imageUrl}
                          alt={promo.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl font-black text-neutral-300 uppercase tracking-widest">{promo.visual}</div>
                      )}
                      {promo.label && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                          {promo.label}
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-[#1A1A1A]/85 backdrop-blur-sm border border-neutral-800 text-[9px] font-bold text-white tracking-wide uppercase px-2 py-0.5 rounded">
                        {promo.storeName ?? "Оферта"}
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      {promo.showPrice !== "hide" && (promo.newPrice || promo.oldPrice) ? (
                        <div className="flex items-baseline gap-2">
                          {promo.newPrice && <span className="text-xl font-black text-red-600">{promo.newPrice}</span>}
                          {promo.oldPrice && <span className="text-sm font-semibold line-through text-neutral-400">{promo.oldPrice}</span>}
                        </div>
                      ) : (
                        promo.label && <span className="inline-block text-xs font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">{promo.label}</span>
                      )}
                      <h3 className="font-bold text-base text-neutral-900 line-clamp-1">{promo.title}</h3>
                      <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-medium">{promo.description}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-3">
                    {promo.validTo && (
                      <div className="text-[10px] text-neutral-400 font-bold border-t border-neutral-100 pt-3">
                        Валидна до: {promo.validTo}
                      </div>
                    )}
                    <div className="grid grid-cols-12 gap-2">
                      <Link
                        href={promo.canonicalUrl || `/${promo.storeSlug || "supermarket"}`}
                        className="col-span-8 text-center py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Виж офертата</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                      <div className="col-span-4 flex justify-center items-center bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg overflow-hidden">
                        <BrochureShareButton item={promo} />
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {visiblePromotions.length === 0 && (
                <div className="col-span-full bg-white/50 border border-dashed border-neutral-300 rounded-3xl p-12 text-center">
                  <p className="text-neutral-500 font-semibold mb-4">В момента няма активни промоции в тази категория.</p>
                  <button onClick={() => setActiveFilter("all")} className="btn bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors">
                    Покажи всички
                  </button>
                </div>
              )}
            </div>

            <div className="text-center pt-4">
              <Link href="/promocii" className="btn bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 text-neutral-800 font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-sm flex inline-flex items-center gap-2">
                <span>Виж всички промоции</span>
                <ArrowRight className="h-4 w-4 text-neutral-500" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why MERTMAKS */}
      <section className="py-20 border-t border-neutral-200/40">
        <div className="container mx-auto max-w-6xl px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-red-600 bg-red-50 border border-red-100/50 px-3 py-1 rounded-full font-bold">Нашите Ценности</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
              Защо да изберете МЕРТМАКС?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 border border-neutral-200/50 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-lg text-neutral-900">Местен бизнес с познато име</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Служим на общността в Самуил вече над 20 години. Разбираме и подкрепяме местните домакинства и нужди.
              </p>
            </div>

            <div className="bg-white p-8 border border-neutral-200/50 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-lg text-neutral-900">Четири обекта за различни нужди</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Супермаркет, домакински стоки, строителни материали и топла кухня на едно удобно място. Пести време и усилия.
              </p>
            </div>

            <div className="bg-white p-8 border border-neutral-200/50 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-lg text-neutral-900">Удобна локация в Самуил</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Всички наши обекти са разположени в центъра на селото, лесно достъпни и с паркоместа за вашето улеснение.
              </p>
            </div>

            <div className="bg-white p-8 border border-neutral-200/50 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-lg text-neutral-900">Редовно обновявани предложения</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Седмични и месечни оферти на избрани стоки, пресни продукти всеки ден и разнообразно обедно меню в ресторанта.
              </p>
            </div>

            <div className="bg-white p-8 border border-neutral-200/50 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-lg text-neutral-900">Лесен контакт и ясна информация</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Предлагаме директни телефони за всеки обект, актуално работно време и точни адреси в Google Maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact and Maps Location Block */}
      <section className="py-20 bg-white border-t border-neutral-200/60">
        <div className="container mx-auto max-w-6xl px-4 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-red-600 bg-red-50 border border-red-100/50 px-3 py-1 rounded-full font-bold">Къде се намираме</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                  Удобно и лесно в центъра на Самуил
                </h2>
                <p className="text-neutral-500 leading-relaxed font-medium">
                  Обектите ни се намират близо един до друг в с. Самуил. Може да ни посетите лично или да се свържете директно по телефона.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-[#FAF8F5] border border-neutral-100 rounded-2xl">
                  <MapPin className="h-6 w-6 text-red-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-800 text-sm">Централен адрес</h4>
                    <p className="text-sm text-neutral-500 font-medium">ул. Хаджи Димитър 6, с. Самуил, обл. Разград</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-[#FAF8F5] border border-neutral-100 rounded-2xl">
                  <Phone className="h-6 w-6 text-red-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-800 text-sm">Телефон за общи въпроси</h4>
                    <a href={`tel:${contactInfo.phone.main}`} className="text-sm text-red-600 font-bold hover:underline">
                      {contactInfo.phone.display}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-[#FAF8F5] border border-neutral-100 rounded-2xl">
                  <Clock className="h-6 w-6 text-red-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-800 text-sm">Работно време</h4>
                    <p className="text-sm text-neutral-500 font-medium">Всеки ден от 08:00 до 20:00 часа (без почивен ден)</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=43.513983,26.741417`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center sm:inline-flex gap-2 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Отвори в Google Maps</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-[450px] relative rounded-3xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50">
              <SingleStoreMapClient stores={stores} height="100%" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
