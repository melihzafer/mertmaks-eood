"use client";

import { MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findUsStrings } from "@/data/find-us-strings";
import type { FinderStore } from "@/lib/stores";

interface Props {
  store: FinderStore;
  onBack: () => void;
}

export function FallbackNoGeo({ store, onBack }: Props) {
  const directionsHref = `https://www.openstreetmap.org/directions?to=${store.lat}%2C${store.lng}`;
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-4 py-10">
      <Card className="p-6 text-center">
        <MapPinOff className="mx-auto size-10 text-rose-600" />
        <h1 className="mt-3 text-xl font-bold">{findUsStrings.noGeoHeading}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{findUsStrings.noGeoBody}</p>
        <div className="mt-5 flex flex-col gap-2">
          <Button asChild size="lg" className="min-h-11">
            <a href={directionsHref} target="_blank" rel="noopener noreferrer">
              {findUsStrings.openDirections}
            </a>
          </Button>
          <Button variant="outline" size="lg" className="min-h-11" onClick={onBack}>
            {findUsStrings.backToMap}
          </Button>
        </div>
      </Card>
    </div>
  );
}
