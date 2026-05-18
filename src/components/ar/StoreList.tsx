"use client";

import { Navigation } from "lucide-react";
import { findUsStrings } from "@/data/find-us-strings";
import { formatDistance } from "@/lib/bearing";
import type { RankedStore } from "@/hooks/useNearestStore";

interface Props {
  stores: RankedStore[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  hasGeo: boolean;
}

export function StoreList({ stores, selectedId, onSelect, hasGeo }: Props) {
  return (
    <ul className="finder-store-list" aria-label={findUsStrings.pickerHeading}>
      {stores.map((store, idx) => {
        const isSelected = store.id === selectedId;
        const isNearest = hasGeo && idx === 0;
        return (
          <li key={store.id}>
            <button
              type="button"
              onClick={() => onSelect(store.id)}
              className="finder-store-card"
              data-selected={isSelected ? "true" : "false"}
              aria-pressed={isSelected}
            >
              <span className="finder-store-icon" aria-hidden="true">
                <Navigation className="size-5" />
              </span>
              <span className="finder-store-body">
                <span className="finder-store-name">{store.name}</span>
                <span className="finder-store-address">{store.address}</span>
              </span>
              <span className="finder-store-meta">
                {hasGeo && Number.isFinite(store.distanceM) ? (
                  <span className="finder-store-distance">
                    {formatDistance(store.distanceM)}
                  </span>
                ) : null}
                {isNearest && (
                  <span className="finder-store-badge">
                    {findUsStrings.nearestLabel}
                  </span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
