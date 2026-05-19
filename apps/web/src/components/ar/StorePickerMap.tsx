"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { FinderStore } from "@/lib/stores";

interface Props {
  stores: FinderStore[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  userLat?: number | null;
  userLng?: number | null;
}

const BRAND_RED = "#b32b2b";

function makePinIcon(color: string, selected: boolean): L.DivIcon {
  const size = selected ? 36 : 28;
  const html = `<div style="width:${size}px;height:${size}px;border-radius:999px;background:${color};border:3px solid #fff;box-shadow:0 6px 14px rgba(0,0,0,0.28);transform:translate(-50%,-50%);"></div>`;
  return L.divIcon({
    className: "ar-pin",
    html,
    iconSize: [size, size],
    iconAnchor: [0, 0],
  });
}

const userIcon = L.divIcon({
  className: "ar-user-pin",
  html: `<div style="width:18px;height:18px;border-radius:999px;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 6px rgba(37,99,235,0.25);transform:translate(-50%,-50%);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [0, 0],
});

function FitToPoints({ points }: { points: Array<[number, number]> }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 15);
      return;
    }
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
  }, [map, points]);
  return null;
}

export default function StorePickerMap({
  stores,
  selectedId,
  onSelect,
  userLat,
  userLng,
}: Props) {
  const points = useMemo<Array<[number, number]>>(
    () => stores.map((s) => [s.lat, s.lng] as [number, number]),
    [stores],
  );
  const center = useMemo<[number, number]>(() => {
    if (points.length === 0) return [42.7, 25.5];
    const lat = points.reduce((s, [la]) => s + la, 0) / points.length;
    const lng = points.reduce((s, [, lo]) => s + lo, 0) / points.length;
    return [lat, lng];
  }, [points]);

  const allPoints = useMemo<Array<[number, number]>>(() => {
    if (userLat != null && userLng != null) return [...points, [userLat, userLng]];
    return points;
  }, [points, userLat, userLng]);

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToPoints points={allPoints} />
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={makePinIcon(BRAND_RED, store.id === selectedId)}
          eventHandlers={{ click: () => onSelect(store.id) }}
        />
      ))}
      {userLat != null && userLng != null && (
        <Marker position={[userLat, userLng]} icon={userIcon} interactive={false} />
      )}
    </MapContainer>
  );
}
