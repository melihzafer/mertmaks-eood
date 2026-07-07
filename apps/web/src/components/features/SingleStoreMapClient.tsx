"use client";

import dynamic from "next/dynamic";
import type { Store } from "@/lib/stores";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="leaflet-loading" aria-hidden="true" style={{ height: "100%", minHeight: "400px", display: "grid", placeItems: "center", background: "var(--surface-soft)", borderRadius: "18px", color: "var(--text-muted)" }}>
      Зареждане на картата…
    </div>
  ),
});

interface SingleStoreMapClientProps {
  stores: Store[];
  height?: string;
}

export default function SingleStoreMapClient({ stores, height = "100%" }: SingleStoreMapClientProps) {
  return <LeafletMap stores={stores} height={height} />;
}
