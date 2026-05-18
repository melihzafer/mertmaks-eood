"use client";

import { useEffect, useRef, useState } from "react";

export type GeolocationState =
  | { status: "idle" }
  | { status: "unsupported" }
  | { status: "pending" }
  | {
      status: "granted";
      lat: number;
      lng: number;
      accuracy: number;
      heading: number | null;
      timestamp: number;
    }
  | { status: "denied"; error: string };

interface Options {
  enabled?: boolean;
  highAccuracy?: boolean;
}

/**
 * Subscribes to `navigator.geolocation.watchPosition` while `enabled` is true.
 * Returns a discriminated-union state and clears the watcher on unmount or
 * when disabled.
 */
export function useGeolocation(options: Options = {}): GeolocationState {
  const { enabled = true, highAccuracy = true } = options;
  const [state, setState] = useState<GeolocationState>({ status: "idle" });
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({ status: "unsupported" });
      return;
    }

    setState({ status: "pending" });

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          status: "granted",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          timestamp: position.timestamp,
        });
      },
      (err) => {
        setState({ status: "denied", error: err.message });
      },
      {
        enableHighAccuracy: highAccuracy,
        maximumAge: 5_000,
        timeout: 15_000,
      },
    );
    watchIdRef.current = id;

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [enabled, highAccuracy]);

  return state;
}
