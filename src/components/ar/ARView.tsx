"use client";

import { useEffect, useMemo, useRef } from "react";
import { ARArrow } from "./ARArrow";
import { ARHud } from "./ARHud";
import { useCameraStream } from "@/hooks/useCameraStream";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";
import {
  arrowRotationDeg,
  bearingDeg,
  distanceMeters,
  type LatLng,
} from "@/lib/bearing";
import type { FinderStore } from "@/lib/stores";

interface Props {
  store: FinderStore;
  onBack: () => void;
  onCameraDenied: () => void;
  onGeoDenied: () => void;
}

const ARRIVAL_THRESHOLD_M = 5;

export function ARView({ store, onBack, onCameraDenied, onGeoDenied }: Props) {
  const camera = useCameraStream();
  const geolocation = useGeolocation({ enabled: true });
  const orientation = useDeviceOrientation(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    void camera.start();
    return camera.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (camera.state.status !== "active" || !videoRef.current) return;
    const video = videoRef.current;
    video.srcObject = camera.state.stream;
    void video.play().catch(() => {});
    return () => {
      video.srcObject = null;
    };
  }, [camera.state]);

  useEffect(() => {
    if (camera.state.status === "denied" || camera.state.status === "unsupported") {
      onCameraDenied();
    }
  }, [camera.state.status, onCameraDenied]);

  useEffect(() => {
    if (geolocation.status === "denied" || geolocation.status === "unsupported") {
      onGeoDenied();
    }
  }, [geolocation.status, onGeoDenied]);

  const target = useMemo<LatLng>(
    () => ({ lat: store.lat, lng: store.lng }),
    [store.lat, store.lng],
  );

  const user: LatLng | null =
    geolocation.status === "granted"
      ? { lat: geolocation.lat, lng: geolocation.lng }
      : null;

  const distanceM = user ? distanceMeters(user, target) : null;
  const bearing = user ? bearingDeg(user, target) : 0;
  const heading = orientation.state.status === "granted" ? orientation.state.heading : 0;
  const rotation = user ? arrowRotationDeg(bearing, heading) : 0;

  const calibrating =
    orientation.state.status === "calibrating" ||
    orientation.state.status === "needs-permission" ||
    orientation.state.status === "idle";

  const arrived = distanceM != null && distanceM <= ARRIVAL_THRESHOLD_M;

  return (
    <div className="ar-view fixed inset-0 bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted
        autoPlay
      />
      <ARArrow rotation={rotation} arrived={arrived} calibrating={calibrating} />
      <ARHud
        storeName={store.name}
        distanceM={distanceM}
        accuracyM={geolocation.status === "granted" ? geolocation.accuracy : null}
        calibrating={calibrating}
        arrived={arrived}
        onBack={onBack}
      />
    </div>
  );
}
