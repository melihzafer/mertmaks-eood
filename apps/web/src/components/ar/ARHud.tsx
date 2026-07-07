"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findUsStrings } from "@/data/find-us-strings";
import { formatDistance } from "@/lib/bearing";

interface Props {
  storeName: string;
  distanceM: number | null;
  accuracyM: number | null;
  calibrating: boolean;
  arrived: boolean;
  onBack: () => void;
}

export function ARHud({
  storeName,
  distanceM,
  accuracyM,
  calibrating,
  arrived,
  onBack,
}: Props) {
  const distLabel = distanceM != null ? formatDistance(distanceM) : "—";
  const accuracyWarn = accuracyM != null && accuracyM > 50;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 text-white">
      <div className="pointer-events-auto flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={onBack}
          className="min-h-11 min-w-11 bg-black/55 text-white backdrop-blur hover:bg-black/70"
          aria-label={findUsStrings.backToMap}
        >
          <ArrowLeft className="size-5" />
          <span className="hidden sm:inline">{findUsStrings.backToMap}</span>
        </Button>

        {calibrating && (
          <div className="rounded-full bg-amber-500/85 px-3 py-1.5 text-xs font-semibold shadow ar-calibrating-pulse">
            {findUsStrings.calibrating}
          </div>
        )}
      </div>

      <div className="pointer-events-auto rounded-2xl bg-black/65 px-4 py-3 backdrop-blur">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white/80">{storeName}</p>
            <p className="mt-0.5 text-3xl font-bold leading-none tabular-nums">
              {arrived ? findUsStrings.arrived : distLabel}
            </p>
          </div>
          <div className="text-right text-[11px] uppercase tracking-wider text-white/70">
            {accuracyM != null ? (
              <span className={accuracyWarn ? "text-amber-300" : ""}>
                ±{Math.round(accuracyM)} м
              </span>
            ) : null}
            {accuracyWarn && (
              <p className="mt-1 text-amber-300">{findUsStrings.accuracyLow}</p>
            )}
          </div>
        </div>
        {!arrived && !calibrating && (
          <p className="mt-2 text-xs text-white/70">{findUsStrings.pointPhone}</p>
        )}
      </div>
    </div>
  );
}
