"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";
import type { Store } from "@/lib/stores";
import {
  getStoreStatus,
  calculateDistance,
  formatDistance,
} from "@/lib/location";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

interface SmartStoreMapProps {
  stores: Store[];
  height?: string;
}

// Custom marker component with status badge
function createCustomIcon(store: Store): DivIcon {
  const status = getStoreStatus(store);

  const iconMarkup = renderToStaticMarkup(
    <div className="relative">
      <div className="w-10 h-10 bg-red-600 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
        <MapPin className="w-6 h-6 text-white" />
      </div>
      <div
        className={`absolute -top-2 -right-2 ${status.statusColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap`}
      >
        {status.status === "open"
          ? "●"
          : status.status === "closing-soon"
            ? "◐"
            : "○"}
      </div>
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: "custom-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

// Component to handle user location marker
function UserLocationMarker({
  position,
}: {
  position: [number, number] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 });
    }
  }, [position, map]);

  if (!position) return null;

  const userIcon = L.divIcon({
    html: renderToStaticMarkup(
      <div className="relative">
        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
        <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping" />
      </div>
    ),
    className: "user-location-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  return <Marker position={position} icon={userIcon} />;
}

export default function SmartStoreMap({
  stores,
  height = "500px",
}: SmartStoreMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Calculate center and zoom to fit all stores
  const lats = stores.map((s) => s.coordinates.lat);
  const lngs = stores.map((s) => s.coordinates.lng);
  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

  const handleGetLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Вашият браузър не поддържа геолокация");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation([userLat, userLng]);

        // Calculate distances to all stores
        const newDistances: Record<string, number> = {};
        stores.forEach((store) => {
          newDistances[store.id] = calculateDistance(
            userLat,
            userLng,
            store.coordinates.lat,
            store.coordinates.lng
          );
        });
        setDistances(newDistances);
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMsg = "Грешка при получаване на локация";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Достъпът до локация е отказан";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Информацията за локация не е налична";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "Времето за получаване на локация изтече";
        }
        setLocationError(errorMsg);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Distance Calculator Button */}
      <div className="bg-white rounded-xl p-6 shadow-md border">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-red-600" />
              Калкулатор на разстояние
            </h3>
            <p className="text-sm text-gray-600">
              Използвайте GPS-а си, за да видите колко сте далеч от нашите
              магазини
            </p>
          </div>
          <Button
            onClick={handleGetLocation}
            disabled={isLoadingLocation}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoadingLocation ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Зареждане...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Провери разстоянието
              </>
            )}
          </Button>
        </div>

        {/* Location Error */}
        {locationError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {locationError}
          </div>
        )}

        {/* Distance Results */}
        {Object.keys(distances).length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {stores.map((store) => (
              <div
                key={store.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="font-semibold text-sm mb-1">{store.name}</div>
                <div className="text-2xl font-bold text-red-600">
                  {formatDistance(distances[store.id])}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  от вашата локация
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div
        className="rounded-xl overflow-hidden border shadow-md"
        style={{ height }}
      >
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Store Markers with Status */}
          {stores.map((store) => {
            const status = getStoreStatus(store);
            return (
              <Marker
                key={store.id}
                position={[store.coordinates.lat, store.coordinates.lng]}
                icon={createCustomIcon(store)}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-base mb-2">
                      {store.name}
                    </h3>

                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-semibold mb-3 ${status.statusColor}`}
                    >
                      {status.statusText}
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      {store.address}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Тел:{" "}
                      <a
                        href={"tel:" + store.phone}
                        className="text-red-600 hover:underline"
                      >
                        {store.phone}
                      </a>
                    </p>

                    {/* Distance if available */}
                    {distances[store.id] && (
                      <div className="mb-3 p-2 bg-blue-50 rounded text-sm">
                        <span className="font-semibold text-blue-700">
                          {formatDistance(distances[store.id])}
                        </span>
                        <span className="text-blue-600"> от вас</span>
                      </div>
                    )}

                    <a
                      href={`https://www.google.com/maps/dir//${store.coordinates.lat},${store.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Получи указания →
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* User Location Marker */}
          <UserLocationMarker position={userLocation} />
        </MapContainer>
      </div>
    </div>
  );
}

