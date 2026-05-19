"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Phone, Clock } from "lucide-react";
import type { Store } from "@/lib/stores";

// Dynamically import Leaflet to avoid SSR issues
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-gray-400">Loading map...</div>
    </div>
  ),
});

interface StoreMapProps {
  stores: Store[];
  height?: string;
}

export function StoreMap({ stores, height = "500px" }: StoreMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-full rounded-xl bg-gray-100 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-gray-400">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LeafletMap stores={stores} height={height} />

      {/* Store List */}
      <div className="grid md:grid-cols-3 gap-4">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-lg p-4 border shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">{store.name}</h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  {store.address}, {store.city}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a
                  href={"tel:" + store.phone}
                  className="hover:text-red-600 transition-colors"
                >
                  {store.phone}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  Понеделник: {store.hours.monday.open} -{" "}
                  {store.hours.monday.close}
                </span>
              </div>
            </div>

            <a
              href={
                "https://www.google.com/maps/dir//" +
                store.coordinates.lat +
                "," +
                store.coordinates.lng
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Вземи маршрут {">"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
