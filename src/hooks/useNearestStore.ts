"use client";

import { useMemo } from "react";
import { distanceMeters, type LatLng } from "@/lib/bearing";
import type { FinderStore } from "@/lib/stores";

export interface RankedStore extends FinderStore {
  distanceM: number;
}

/**
 * Returns `stores` annotated with distance from `from` and sorted ascending.
 * If `from` is null, returns the stores in their original order with `Infinity`.
 */
export function useNearestStore(
  stores: FinderStore[],
  from: LatLng | null,
): RankedStore[] {
  return useMemo(() => {
    const ranked = stores.map<RankedStore>((store) => ({
      ...store,
      distanceM: from ? distanceMeters(from, { lat: store.lat, lng: store.lng }) : Infinity,
    }));
    if (from) ranked.sort((a, b) => a.distanceM - b.distanceM);
    return ranked;
  }, [stores, from]);
}
