import { HardHat, Hammer, PaintBucket, Ruler, Drill, Box } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "../ui/card";

const categories = [
  {
    name: "Строителни Материали",
    icon: Box,
    items: ["Цимент", "Варовик", "Тухли", "Блокове"],
  },
  {
    name: "Инструменти",
    icon: Hammer,
    items: ["Ръчни инструменти", "Електроинструменти", "Скелета", "Стълби"],
  },
  {
    name: "Бои и Лакове",
    icon: PaintBucket,
    items: ["Фасадни бои", "Интериорни бои", "Лакове", "Грундове"],
  },
  {
    name: "Дърводелски Материали",
    icon: Ruler,
    items: ["Дървен материал", "ПДЧ", "Шперплат", "Греди"],
  },
  {
    name: "Електро и ВиК",
    icon: Drill,
    items: ["Електроматериали", "Тръби", "Фитинги", "Санитария"],
  },
  {
    name: "Покривни Материали",
    icon: HardHat,
    items: ["Керемиди", "Хидроизолация", "Улуци", "Обшивки"],
  },
];

export function ConstructionPage() {
  const categoriesRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const isCategoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });
  const isFeaturesInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Color Wipe Transition */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          background: "linear-gradient(135deg, #3182CE 0%, #D69E2E 100%)",
          transformOrigin: "left",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[calc(100vh-4rem)]"
      >
        {/* Hero Section - Blue & Yellow Theme */}
        <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-50 py-24 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                "radial-gradient(circle, #3182CE 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center mb-8"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#3182CE] to-[#D69E2E] shadow-2xl">
                  <HardHat className="text-white" size={48} />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl md:text-6xl font-bold text-[#3182CE] mb-6"
              >
                Строителство MERTMAX
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-2xl text-blue-800 mb-4"
              >
                Професионални решения за всеки строителен проект
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-lg text-blue-700"
              >
                Висококачествени строителни материали, инструменти и всичко
                необходимо за вашия проект
              </motion.p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 container mx-auto px-4" ref={categoriesRef}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isCategoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Категории Продукти
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Открийте нашата професионална гама от строителни материали и
              инструменти
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isCategoriesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card className="p-8 border-2 border-blue-100 hover:border-[#3182CE] transition-all duration-300 hover:shadow-xl group">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div
                      className="p-4 rounded-xl bg-blue-50 group-hover:bg-[#3182CE] transition-colors duration-300"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <category.icon
                        className="text-[#3182CE] group-hover:text-white transition-colors duration-300"
                        size={28}
                      />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#3182CE]">
                      {category.name}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <motion.li
                        key={item}
                        className="flex items-center text-gray-600"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#3182CE] mr-3" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section
          className="bg-gradient-to-br from-blue-50 to-yellow-50 py-24"
          ref={featuresRef}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isFeaturesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center text-4xl md:text-5xl font-bold text-[#3182CE] mb-16"
              >
                Защо Професионалистите Ни Избират
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    icon: "🏗️",
                    title: "Професионално Качество",
                    desc: "Материали от водещи европейски производители",
                  },
                  {
                    icon: "📦",
                    title: "Големи Количества",
                    desc: "Специални цени за фирми и обемни поръчки",
                  },
                  {
                    icon: "🚚",
                    title: "Доставка",
                    desc: "Безплатна доставка за големи поръчки в региона",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      isFeaturesInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 50 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-center"
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#3182CE] to-[#D69E2E] flex items-center justify-center shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-4xl text-white">
                        {feature.icon}
                      </span>
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#3182CE]">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA for Business */}
        <section className="py-24 container mx-auto px-4" ref={ctaRef}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto bg-gradient-to-r from-[#3182CE] to-[#D69E2E] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Специални Оферти за Фирми
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Предлагаме индивидуални условия за строителни фирми и занаятчии.
              Свържете се с нас за повече информация.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-lg font-semibold text-[#3182CE] shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              Свържете Се с Нас
            </motion.a>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
}
