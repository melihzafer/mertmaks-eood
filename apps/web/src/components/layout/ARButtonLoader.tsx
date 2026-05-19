"use client";

import dynamic from "next/dynamic";

const WebARButton = dynamic(
  () =>
    import("@/components/interactive/WebARButton").then((m) => ({
      default: m.WebARButton,
    })),
  { ssr: false },
);

export function ARButtonLoader() {
  return <WebARButton mode="navigation" />;
}
