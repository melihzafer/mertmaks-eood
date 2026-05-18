"use client";

import { Component, type ReactNode, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Crosshair, MapPin, Navigation, Sparkles } from "lucide-react";
import { StoreList } from "./StoreList";
import { findUsStrings } from "@/data/find-us-strings";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useNearestStore } from "@/hooks/useNearestStore";
import type { FinderStore } from "@/lib/stores";

const StorePickerMap = dynamic(() => import("./StorePickerMap"), {
  ssr: false,
  loading: () => (
    <div className="finder-map-loading">Зареждане на картата…</div>
  ),
});

interface Props {
  stores: FinderStore[];
  onStart: (store: FinderStore) => void;
}

class ErrorCatcher extends Component<{ children: ReactNode; onError: () => void }> {
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.props.children;
  }
}

export function StorePicker({ stores, onStart }: Props) {
  const geo = useGeolocation({ enabled: true });
  const userPoint =
    geo.status === "granted" ? { lat: geo.lat, lng: geo.lng } : null;

  const ranked = useNearestStore(stores, userPoint);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapError, setMapError] = useState(false);

  const selected = ranked.find((s) => s.id === selectedId) ?? null;
  const hasGeo = geo.status === "granted";

  const useNearest = () => {
    if (ranked.length === 0) return;
    const nearest = ranked[0];
    setSelectedId(nearest.id);
    onStart(nearest);
  };

  return (
    <section className="finder-page">
      <div className="finder-container container">
        <header className="finder-header">
          <Link href="/" className="finder-back" aria-label={findUsStrings.back}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>{findUsStrings.back}</span>
          </Link>
          <p className="finder-eyebrow eyebrow">
            <MapPin className="size-3.5" aria-hidden="true" />
            {findUsStrings.pageTitle}
          </p>
          <h1 className="finder-heading">{findUsStrings.pickerHeading}</h1>
          <p className="finder-sub">{findUsStrings.pickerSubheading}</p>
        </header>

        <div className="finder-layout">
          <div className="finder-map-col">
            <div className="finder-map-panel">
              {mapError ? (
                <div className="finder-map-error">
                  {findUsStrings.mapUnavailable}
                </div>
              ) : (
                <ErrorCatcher onError={() => setMapError(true)}>
                  <StorePickerMap
                    stores={stores}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    userLat={userPoint?.lat ?? null}
                    userLng={userPoint?.lng ?? null}
                  />
                </ErrorCatcher>
              )}
            </div>
            <div className="finder-geo-status" data-state={geo.status}>
              <Navigation className="size-3.5" aria-hidden="true" />
              {hasGeo
                ? "Локацията е активна"
                : geo.status === "denied"
                  ? "Локацията е изключена"
                  : "Изчакване на локация…"}
            </div>
          </div>

          <div className="finder-list-col">
            <div className="finder-list-head">
              <span className="finder-list-count">
                {ranked.length} {ranked.length === 1 ? "обект" : "обекта"}
              </span>
              {selected ? (
                <span className="finder-list-selected">
                  Избран: <strong>{selected.name}</strong>
                </span>
              ) : (
                <span className="finder-list-selected muted">
                  Изберете обект от списъка
                </span>
              )}
            </div>
            <StoreList
              stores={ranked}
              selectedId={selectedId}
              onSelect={setSelectedId}
              hasGeo={hasGeo}
            />
            <div className="finder-actions">
              <button
                type="button"
                className="btn"
                onClick={useNearest}
                disabled={!hasGeo || ranked.length === 0}
              >
                <Crosshair className="size-4" aria-hidden="true" />
                {findUsStrings.useNearest}
              </button>
              <button
                type="button"
                className="btn primary"
                disabled={!selected}
                onClick={() => selected && onStart(selected)}
              >
                <Sparkles className="size-4" aria-hidden="true" />
                {findUsStrings.startARNavigation}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
