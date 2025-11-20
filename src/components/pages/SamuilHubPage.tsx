"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Heart,
  Users,
  Award,
  Calendar,
  Handshake,
  Sparkles,
  Shield,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Card } from "../ui/card";

// Mock timeline data
const timeline = [
  {
    year: "2005",
    title: "Началото",
    description: "Откриване на първия магазин в Самуил - хранителна търговия",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop",
  },
  {
    year: "2010",
    title: "Разширение",
    description: "Отваряме втори магазин за промишлени стоки",
    image:
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&h=400&fit=crop",
  },
  {
    year: "2015",
    title: "Строителни Материали",
    description:
      "Навлизаме в сектора на строителството с нов специализиран магазин",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
  },
  {
    year: "2020",
    title: "Модернизация",
    description: "Обновяваме всички магазини с модерно оборудване",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  },
  {
    year: "2024",
    title: "Дигитална Трансформация",
    description: "Стартираме новия ни онлайн портал за по-добро обслужване",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
];

// Mock team data
const team = [
  {
    name: "Мери Тодорова",
    role: "Управител",
    quote: "Нашата мисия е да обслужваме общността с качество и сърце.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
    color: "#E53E3E",
  },
  {
    name: "Максим Петров",
    role: "Мениджър Строителство",
    quote: "Всеки проект заслужава най-добрите материали.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    color: "#3182CE",
  },
  {
    name: "Татяна Георгиева",
    role: "Мениджър Супермаркет",
    quote: "Свежестта и качеството са нашият приоритет.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    color: "#E53E3E",
  },
  {
    name: "Максим Иванов",
    role: "Мениджър Промишлени Стоки",
    quote: "Разнообразието и достъпността правят разликата.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    color: "#D53F8C",
  },
];

export function SamuilHubPage() {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isTimelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)]"
    >
      {/* Hero Section */}
      <section
        className="relative bg-linear-to-br from-blue-50 via-pink-50 to-red-50 py-24 overflow-hidden"
        ref={heroRef}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isHeroInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-8"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-br from-blue-600 via-pink-500 to-red-600 shadow-2xl">
                <Heart className="text-white" size={48} />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Сърцето на Самуил
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              От близо 20 години MERTMAX е неразделна част от общността в
              Самуил. Нашата мисия е да обслужваме местните семейства и бизнеси
              с качество, надеждност и топло отношение.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-24 bg-white" ref={timelineRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Calendar className="text-blue-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Нашата История
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Проследете пътуването на MERTMAX през годините
            </p>
          </motion.div>

          {/* Horizontal scrolling timeline */}
          <div className="relative">
            <div className="flex overflow-x-auto pb-8 space-x-8 snap-x snap-mandatory scrollbar-hide">
              {timeline.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: 50 }}
                  animate={
                    isTimelineInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: 50 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="shrink-0 w-80 snap-center"
                >
                  <Card className="overflow-hidden border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
                        <span className="font-bold text-lg">{event.year}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Gallery */}
      <section
        className="py-24 bg-linear-to-br from-gray-50 to-white"
        ref={teamRef}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Users className="text-pink-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Нашият Екип
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Запознайте се с хората, които правят MERTMAX специално място
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <Card className="overflow-hidden border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 relative">
                  <div className="relative h-72 overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Overlay with quote on hover */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center p-6 text-center"
                      style={{ backgroundColor: `${member.color}F0` }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white font-medium italic leading-relaxed">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    </motion.div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="font-medium" style={{ color: member.color }}>
                      {member.role}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-900" ref={valuesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Award className="text-yellow-400" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Нашите Ценности
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Принципите, които ни водят всеки ден
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: Handshake,
                title: "Общност",
                desc: "Ние сме част от Самуил и работим за благото на нашата общност",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Sparkles,
                title: "Качество",
                desc: "Предлагаме само продукти, които бихме използвали в собствените си домове",
                color: "from-pink-500 to-pink-600",
              },
              {
                icon: Shield,
                title: "Доверие",
                desc: "Изграждаме дългосрочни отношения, базирани на честност и надеждност",
                color: "from-red-500 to-red-600",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card className="text-center p-8 bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br ${value.color} flex items-center justify-center shadow-xl`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <value.icon
                      className="text-white"
                      size={36}
                      strokeWidth={2}
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {value.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {value.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <TrendingUp className="text-blue-600" size={32} />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  В Цифри
                </h2>
              </div>
              <p className="text-xl text-gray-600">
                Нашият принос към общността в Самуил
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "20+", label: "Години опит", icon: Calendar },
                { number: "4", label: "Магазина", icon: MapPin },
                { number: "10000+", label: "Доволни клиенти", icon: Users },
                { number: "5000+", label: "Продукта", icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center p-8 border-2 hover:border-blue-600 hover:shadow-xl transition-all duration-300">
                    <stat.icon
                      className="mx-auto mb-4 text-blue-600"
                      size={40}
                    />
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-linear-to-br from-blue-600 via-pink-500 to-red-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готови да ни посетите?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Заповядайте в нашите магазини в Самуил или се свържете с нас
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <MapPin size={24} />
                Вижте адресите
              </a>
              <a
                href="tel:+359123456789"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Phone size={24} />
                Обадете се
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
