import { Tag, TrendingDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DivisionCard } from "../interactive/DivisionCard";
import { Card } from "../ui/card";
import {
  heroContent,
  divisions,
  promotions,
  ctaContent,
} from "@/data/home-content";
import { uiTexts } from "@/data/ui-texts";
import { companyInfo } from "@/data/company-data";

export function HomePage() {
  const divisionsRef = useRef(null);
  const promotionsRef = useRef(null);
  const ctaRef = useRef(null);
  const isDivisionsInView = useInView(divisionsRef, {
    once: true,
    margin: "-100px",
  });
  const isPromotionsInView = useInView(promotionsRef, {
    once: true,
    margin: "-100px",
  });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)]"
    >
      {/* Hero Section - "Living Wallpaper" */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1762439181518-15f8e01012a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXRhaWwlMjBzdG9yZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjU0MDAwMnww&ixlib=rb-4.1.0&q=80&w=1080)",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <motion.div
              className="flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-br from-blue-600 via-pink-500 to-red-600 shadow-2xl"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-5xl text-white font-bold">M</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            {heroContent.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Три магазина под един покрив - хранителни стоки, промишлени продукти
            и строителни материали
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="#divisions"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-lg font-semibold text-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                Разгледай Магазините
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Divisions Section - "Prism Cards" */}
      <section
        id="divisions"
        className="py-24 container mx-auto px-4"
        ref={divisionsRef}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={
            isDivisionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {uiTexts.sections.ourStores}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Изберете магазина, който отговаря на вашите нужди
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {divisions.map((division, index) => (
            <motion.div
              key={division.href}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isDivisionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <DivisionCard {...division} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Promotions Feed */}
      <section
        className="py-24 bg-linear-to-br from-gray-50 to-white"
        ref={promotionsRef}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isPromotionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Tag className="text-red-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                {uiTexts.sections.promotions}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Не пропускайте специалните ни оферти тази седмица
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isPromotionsInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card
                  className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 group"
                  style={{ borderColor: `${promo.color}20` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                      <div className="flex items-center space-x-1">
                        <TrendingDown
                          size={16}
                          style={{ color: promo.color }}
                        />
                        <span
                          className="font-semibold text-sm"
                          style={{ color: promo.color }}
                        >
                          ПРОМО
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div
                      className="text-xs font-medium mb-2"
                      style={{ color: promo.color }}
                    >
                      {promo.store}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {promo.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{promo.description}</p>
                    <div className="flex items-baseline space-x-2">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: promo.color }}
                      >
                        {promo.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {promo.originalPrice}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24" ref={ctaRef}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {ctaContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            {ctaContent.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href={ctaContent.buttonHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-lg font-semibold text-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {ctaContent.buttonText}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

