"use client";

import { useCallback, useEffect, useState } from "react";
import { ARErrorBoundary } from "./ARErrorBoundary";
import { ARPreflight } from "./ARPreflight";
import { ARView } from "./ARView";
import { FallbackInsecure } from "./FallbackInsecure";
import { FallbackMapOnly } from "./FallbackMapOnly";
import { FallbackNoGeo } from "./FallbackNoGeo";
import { StorePicker } from "./StorePicker";
import { isSecureForAR } from "@/lib/secureContext";
import type { FinderStore } from "@/lib/stores";

type Phase = "picking" | "preflight" | "ar" | "no-camera" | "no-geo" | "insecure";

interface Props {
  stores: FinderStore[];
}

export function FindUsClient({ stores }: Props) {
  const [phase, setPhase] = useState<Phase>("picking");
  const [selected, setSelected] = useState<FinderStore | null>(null);

  useEffect(() => {
    if (!isSecureForAR()) setPhase("insecure");
  }, []);

  const handleStart = useCallback((store: FinderStore) => {
    setSelected(store);
    setPhase("preflight");
  }, []);

  const handlePreflightReady = useCallback(() => setPhase("ar"), []);
  const backToPicker = useCallback(() => setPhase("picking"), []);
  const onCameraDenied = useCallback(() => setPhase("no-camera"), []);
  const onGeoDenied = useCallback(() => setPhase("no-geo"), []);

  if (phase === "insecure") return <FallbackInsecure />;

  if (phase === "no-camera" && selected) {
    return <FallbackMapOnly store={selected} onBack={backToPicker} />;
  }
  if (phase === "no-geo" && selected) {
    return <FallbackNoGeo store={selected} onBack={backToPicker} />;
  }

  if (phase === "preflight" && selected) {
    return (
      <ARErrorBoundary onReset={backToPicker}>
        <ARPreflight
          onReady={handlePreflightReady}
          onCameraDenied={onCameraDenied}
          onGeoDenied={onGeoDenied}
          onCancel={backToPicker}
        />
      </ARErrorBoundary>
    );
  }

  if (phase === "ar" && selected) {
    return (
      <ARErrorBoundary onReset={backToPicker}>
        <ARView
          store={selected}
          onBack={backToPicker}
          onCameraDenied={onCameraDenied}
          onGeoDenied={onGeoDenied}
        />
      </ARErrorBoundary>
    );
  }

  return <StorePicker stores={stores} onStart={handleStart} />;
}
