"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  UtensilsCrossed,
  MapPin,
  Clock,
  Phone,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WebARButton } from "@/components/interactive/WebARButton";

export default function RestaurantPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)]"
    >
      {/* WebAR Button - Mobile Only */}
      <WebARButton />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-2xl mb-6">
                <UtensilsCrossed className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              Ресторант Делиорман
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Традиционна българска кухня с модерен усет в сърцето на Самуил
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all group"
                onClick={() =>
                  window.open("https://deliorman.vercel.app", "_blank")
                }
              >
                Посетете Сайта на Ресторанта
                <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-30" />
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  За Ресторант Делиорман
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ресторант Делиорман е част от семейството МЕРТМАКС ЕООД и
                  предлага автентична българска кухня, приготвена с любов и
                  внимание към детайла.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Нашите ястия се приготвят от свежи продукти, много от които са
                  налични в нашия супермаркет. Атмосферата е уютна и приятна,
                  идеална за семейни събирания и специални поводи.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    "🍽️ Традиционна кухня",
                    "👨‍🍳 Професионални готвачи",
                    "🌿 Свежи продукти",
                    "❤️ Семейна атмосфера",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-amber-50 rounded-full text-sm font-medium text-amber-800"
                    >
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <UtensilsCrossed className="w-32 h-32 text-amber-300" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Информация за Контакт
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Адрес",
                  content: "с. Самуил, обл. Разград",
                  color: "from-red-500 to-pink-600",
                },
                {
                  icon: Clock,
                  title: "Работно време",
                  content: "Всеки ден: 10:00 - 22:00",
                  color: "from-amber-500 to-orange-600",
                },
                {
                  icon: Phone,
                  title: "Телефон",
                  content: "За резервации",
                  color: "from-blue-500 to-purple-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg mb-6`}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.content}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Защо да изберете Делиорман?
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Автентични рецепти",
                  description:
                    "Традиционни български ястия, приготвени по стари семейни рецепти",
                  icon: "🍲",
                },
                {
                  title: "Свежи продукти",
                  description:
                    "Използваме най-качествените продукти от нашия супермаркет",
                  icon: "🥗",
                },
                {
                  title: "Уютна атмосфера",
                  description: "Приятна среда за семейни вечери и празници",
                  icon: "🏡",
                },
                {
                  title: "Професионално обслужване",
                  description:
                    "Любезен персонал и отлично качество на услугата",
                  icon: "⭐",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{feature.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Star className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Готови за незабравимо кулинарно преживяване?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Посетете нашия уебсайт за повече информация за менюто, галерия и
                резервации
              </p>
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all group"
                onClick={() =>
                  window.open("https://deliorman.vercel.app", "_blank")
                }
              >
                Към Сайта на Ресторанта
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
