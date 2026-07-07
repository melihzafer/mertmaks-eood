"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LIVE_ENDPOINT = "/api/sanity/live";
const REFRESH_DEBOUNCE_MS = 150;

export function SanityLiveRefresh() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || !("EventSource" in window)) {
      return;
    }

    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    let reportedError = false;
    const source = new EventSource(LIVE_ENDPOINT);

    const scheduleRefresh = () => {
      if (refreshTimer) clearTimeout(refreshTimer);

      refreshTimer = setTimeout(() => {
        router.refresh();
      }, REFRESH_DEBOUNCE_MS);
    };

    const reportConnectionIssue = () => {
      if (reportedError) return;
      reportedError = true;
      console.warn("Sanity live refresh connection is not available.");
    };

    source.addEventListener("mutation", scheduleRefresh);
    source.addEventListener("error", reportConnectionIssue);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      source.removeEventListener("mutation", scheduleRefresh);
      source.removeEventListener("error", reportConnectionIssue);
      source.close();
    };
  }, [router]);

  return null;
}
