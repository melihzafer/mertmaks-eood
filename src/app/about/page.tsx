"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, type LucideIcon } from "lucide-react";
import { timelineEvents, type TimelineEvent } from "@/data/timeline-data";
import { uiTexts } from "@/data/ui-texts";
import { companyInfo } from "@/data/company-data";

function TimelineItem({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = event.icon;

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex items-center"
    >
      {/* Timeline line connector */}
      <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-200 -z-10" />

      {/* Content */}
      <div
        className={`w-full md:w-5/12 ${isEven ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-xl border-2"
          style={{ borderColor: `${event.color}20` }}
          whileHover={{
            scale: 1.02,
            boxShadow: `0 20px 40px ${event.color}20`,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`flex items-start gap-4 ${isEven ? "md:flex-row-reverse md:text-right" : ""}`}
          >
            <motion.div
              className="p-4 rounded-2xl shrink-0"
              style={{ backgroundColor: event.color }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>

            <div className="flex-1">
              <motion.div
                className="inline-block px-4 py-1 rounded-full mb-3 font-bold text-white text-sm"
                style={{ backgroundColor: event.color }}
              >
                {event.year}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {event.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
        style={{ backgroundColor: event.color }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.4,
          type: "spring",
          stiffness: 200,
        }}
      />
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-linear-to-br from-blue-50 via-pink-50 to-red-50 py-24 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="text-sm font-semibold text-gray-700">
                  с. Самуил, обл. Разград
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              Нашата История
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed"
            >
              От скромно начало до водещ търговски център в региона. Открийте
              как любовта към общността ни доведе до успеха.
            </motion.p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 -z-10" />
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Пътят Ни Към Успеха
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Всеки етап от нашето развитие е белязан с отдаденост към
                качеството и грижа за хората от Самуил
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative space-y-12">
              {timelineEvents.map((event, index) => (
                <TimelineItem key={event.year} event={event} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center bg-linear-to-br from-red-600 to-pink-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Бъдете Част от Нашата История
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Вашето доверие е нашата най-голяма награда
            </p>
            <motion.a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Свържете се с нас
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

