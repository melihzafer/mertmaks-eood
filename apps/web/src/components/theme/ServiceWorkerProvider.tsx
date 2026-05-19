"use client";

import { useEffect } from "react";

export function ServiceWorkerProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      const hadController = Boolean(navigator.serviceWorker.controller);
      const reloadKey = "mertmaks-dev-sw-cleanup-reloaded";
      const workerCleanup = navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(
            registrations.map((registration) => registration.unregister()),
          ),
        );

      const cacheCleanup =
        "caches" in window
          ? caches
              .keys()
              .then((cacheNames) =>
                Promise.all(
                  cacheNames
                    .filter((name) => name.startsWith("mertmaks-"))
                    .map((name) => caches.delete(name)),
                ),
              )
          : Promise.resolve([]);

      Promise.all([workerCleanup, cacheCleanup])
        .then(() => {
          if (hadController && sessionStorage.getItem(reloadKey) !== "1") {
            sessionStorage.setItem(reloadKey, "1");
            window.location.reload();
            return;
          }

          if (!hadController) {
            sessionStorage.removeItem(reloadKey);
          }
        })
        .catch((error) => {
          console.error("Service Worker cleanup failed:", error);
        });

      return;
    }

    // Register service worker
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);

        // Check for updates periodically
        setInterval(
          () => {
            registration.update();
          },
          60 * 60 * 1000,
        ); // Check every hour

        // Handle updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker available, show update notification
                if (
                  confirm("Налична е нова версия на приложението. Обнови сега?")
                ) {
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });

    // Handle controlled state changes
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    // Request persistent storage
    if ("storage" in navigator && "persist" in navigator.storage) {
      navigator.storage.persist().then((persistent) => {
        if (persistent) {
          console.log("Storage persisted");
        }
      });
    }
  }, []);

  return null;
}
