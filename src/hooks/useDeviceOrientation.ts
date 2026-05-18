"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeHeading } from "@/lib/bearing";

type IosOrientationEventCtor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

type IosOrientationEvent = DeviceOrientationEvent & {
  webkitCompassHeading?: number;
};

export type OrientationState =
  | { status: "idle" }
  | { status: "unsupported" }
  | { status: "needs-permission" }
  | { status: "denied"; error: string }
  | { status: "calibrating"; isAbsolute: boolean }
  | { status: "granted"; heading: number; isAbsolute: boolean };

export interface UseDeviceOrientation {
  state: OrientationState;
  /** iOS gesture-bound permission request. Safe to call on other platforms. */
  request: () => Promise<void>;
}

function getScreenAngle(): number {
  if (typeof window === "undefined") return 0;
  if (window.screen?.orientation?.angle != null) return window.screen.orientation.angle;
  const legacy = (window as unknown as { orientation?: number }).orientation;
  return typeof legacy === "number" ? legacy : 0;
}

function readHeading(event: IosOrientationEvent): { heading: number | null; isAbsolute: boolean } {
  if (typeof event.webkitCompassHeading === "number") {
    return { heading: normalizeHeading(event.webkitCompassHeading), isAbsolute: true };
  }
  if (event.alpha == null) {
    return { heading: null, isAbsolute: Boolean(event.absolute) };
  }
  const raw = 360 - event.alpha;
  return {
    heading: normalizeHeading(raw + getScreenAngle()),
    isAbsolute: Boolean(event.absolute),
  };
}

/**
 * Subscribes to `deviceorientationabsolute` (or `deviceorientation` fallback)
 * and exposes a normalized compass heading. iOS requires a user-gesture
 * permission request via `request()`.
 *
 * Updates are coalesced to once per animation frame to keep React renders cheap.
 */
export function useDeviceOrientation(enabled = true): UseDeviceOrientation {
  const [state, setState] = useState<OrientationState>({ status: "idle" });
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<IosOrientationEvent | null>(null);
  const isAbsoluteRef = useRef<boolean>(false);
  const lastHeadingTsRef = useRef<number>(0);

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;

    const onEvent = (event: Event) => {
      pendingRef.current = event as IosOrientationEvent;
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const ev = pendingRef.current;
        pendingRef.current = null;
        if (!ev) return;

        const { heading, isAbsolute } = readHeading(ev);
        isAbsoluteRef.current = isAbsoluteRef.current || isAbsolute;

        if (heading == null) {
          setState({ status: "calibrating", isAbsolute: isAbsoluteRef.current });
          return;
        }

        lastHeadingTsRef.current = performance.now();
        setState({
          status: "granted",
          heading,
          isAbsolute: isAbsoluteRef.current,
        });
      });
    };

    const supportsAbsolute = "ondeviceorientationabsolute" in window;
    const eventName = supportsAbsolute
      ? "deviceorientationabsolute"
      : "deviceorientation";

    window.addEventListener(eventName, onEvent as EventListener, true);
    setState((prev) =>
      prev.status === "granted" ? prev : { status: "calibrating", isAbsolute: supportsAbsolute },
    );

    // Watch for stalled compass — fall back to calibrating if no event for 3s.
    const stallTimer = window.setInterval(() => {
      if (lastHeadingTsRef.current === 0) return;
      if (performance.now() - lastHeadingTsRef.current > 3000) {
        setState({ status: "calibrating", isAbsolute: isAbsoluteRef.current });
      }
    }, 1000);

    return () => {
      window.removeEventListener(eventName, onEvent as EventListener, true);
      window.clearInterval(stallTimer);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Auto-start on platforms that don't gate behind requestPermission.
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const ctor = window.DeviceOrientationEvent as IosOrientationEventCtor | undefined;
    if (!ctor) {
      setState({ status: "unsupported" });
      return;
    }
    if (typeof ctor.requestPermission === "function") {
      setState((prev) => (prev.status === "idle" ? { status: "needs-permission" } : prev));
      return;
    }

    return startListening();
  }, [enabled, startListening]);

  const request = useCallback(async () => {
    if (typeof window === "undefined") return;
    const ctor = window.DeviceOrientationEvent as IosOrientationEventCtor | undefined;
    if (!ctor) {
      setState({ status: "unsupported" });
      return;
    }
    if (typeof ctor.requestPermission !== "function") {
      startListening();
      return;
    }
    try {
      const result = await ctor.requestPermission();
      if (result === "granted") {
        startListening();
      } else {
        setState({ status: "denied", error: "Permission denied" });
      }
    } catch (error) {
      setState({
        status: "denied",
        error: error instanceof Error ? error.message : "Permission error",
      });
    }
  }, [startListening]);

  return { state, request };
}
