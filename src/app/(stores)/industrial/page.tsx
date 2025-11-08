"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { industrialPage } from "@/data/industrial";

const { hero, categories, features } = industrialPage;
const HeroIcon = hero.icon;

export default function IndustrialPage() {
  const categoriesRef = useRef(null);
  const featuresRef = useRef(null);
  const isCategoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });
  const isFeaturesInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });

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
          backgroundColor: "#D53F8C",
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
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-pink-50 via-pink-100 to-purple-50 py-24 overflow-hidden">
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
                "radial-gradient(circle, #D53F8C 1px, transparent 1px)",
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
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-br from-[#D53F8C] to-[#9F7AEA] shadow-2xl">
                  <hero.icon className="text-white" size={48} />
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
                className="text-5xl md:text-6xl font-bold text-[#D53F8C] mb-6"
              >
                Промишлени Стоки MERTMAX
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-2xl text-pink-800 mb-4"
              >
                Всичко необходимо за дома и градината
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-lg text-pink-700"
              >
                Разнообразна гама от промишлени продукти, инструменти и битови
                стоки за всяка нужда
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
              {categories.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {categories.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.items.map((category, index) => (
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
                <Card className="p-8 border-2 border-pink-100 hover:border-[#D53F8C] transition-all duration-300 hover:shadow-xl group">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div
                      className="p-4 rounded-xl bg-pink-50 group-hover:bg-[#D53F8C] transition-colors duration-300"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <category.icon
                        className="text-[#D53F8C] group-hover:text-white transition-colors duration-300"
                        size={28}
                      />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#D53F8C]">
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
                        <div className="w-2 h-2 rounded-full bg-[#D53F8C] mr-3" />
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
          className="bg-linear-to-br from-pink-50 to-purple-50 py-24"
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
                className="text-center text-4xl md:text-5xl font-bold text-[#D53F8C] mb-16"
              >
                {features.title}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {features.items.map((feature, index) => (
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
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#D53F8C] flex items-center justify-center shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-4xl text-white">
                        {feature.icon}
                      </span>
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-4 text-[#D53F8C]">
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
      </motion.div>
    </>
  );
}
