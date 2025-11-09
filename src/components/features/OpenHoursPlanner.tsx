"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card } from "../ui/card";
import storesData from "@/data/stores.json";

const daysOfWeek = [
  { key: "monday", label: "Понеделник", short: "Пон" },
  { key: "tuesday", label: "Вторник", short: "Вто" },
  { key: "wednesday", label: "Сряда", short: "Сря" },
  { key: "thursday", label: "Четвъртък", short: "Чет" },
  { key: "friday", label: "Петък", short: "Пет" },
  { key: "saturday", label: "Събота", short: "Съб" },
  { key: "sunday", label: "Неделя", short: "Нед" },
];

interface StoreHours {
  open: string;
  close: string;
  closed: boolean;
}

export function OpenHoursPlanner() {
  const [selectedDay, setSelectedDay] = useState<string>("monday");

  const handleDaySelect = (dayKey: string) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(20);
    }
    setSelectedDay(dayKey);
  };

  const selectedDayLabel =
    daysOfWeek.find((d) => d.key === selectedDay)?.label || "";

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Какво работи утре?
        </h3>
      </div>

      {/* Day selector */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {daysOfWeek.map((day, index) => {
          const isSelected = day.key === selectedDay;
          return (
            <motion.button
              key={day.key}
              onClick={() => handleDaySelect(day.key)}
              className={`p-3 rounded-lg text-center transition-colors ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="text-xs font-medium">{day.short}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected day label */}
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-4"
      >
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {selectedDayLabel}
        </h4>
      </motion.div>

      {/* Store hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {storesData.stores.map((store, index) => {
          const hours = store.hours[
            selectedDay as keyof typeof store.hours
          ] as StoreHours;

          return (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {store.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {store.address}
                    </p>
                  </div>
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                </div>

                {hours.closed ? (
                  <div className="mt-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm font-medium">
                    Затворено
                  </div>
                ) : (
                  <div className="mt-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm font-medium">
                    {hours.open} - {hours.close}
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
