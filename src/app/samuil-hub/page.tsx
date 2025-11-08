"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { samuilHubPage } from "@/data/samuil-hub";

const { hero, timeline, team, values } = samuilHubPage;
const HeroIcon = hero.icon;
const TimelineIcon = timeline.icon;
const TeamIcon = team.icon;
const ValuesIcon = values.icon;

export default function SamuilHubPage() {
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
                <hero.icon className="text-white" size={48} />
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
              {hero.title}
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
              {hero.description}
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
              <timeline.icon className="text-blue-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                {timeline.title}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {timeline.subtitle}
            </p>
          </motion.div>

          {/* Horizontal scrolling timeline */}
          <div className="relative">
            <div className="flex overflow-x-auto pb-8 space-x-8 snap-x snap-mandatory scrollbar-hide">
              {timeline.events.map((event, index) => (
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
              <team.icon className="text-pink-600" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                {team.title}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {team.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {team.members.map((member, index) => (
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
              <values.icon className="text-yellow-400" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {values.title}
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {values.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {values.items.map((value, index) => (
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
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br from-blue-600 via-pink-500 to-red-600 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-4xl">{value.icon}</span>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {value.title}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
