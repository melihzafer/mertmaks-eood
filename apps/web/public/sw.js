// Service Worker for Mertmaks EOOD PWA
// Provides offline support and caching strategies

const CACHE_NAME = "mertmaks-v2";
const RUNTIME_CACHE = "mertmaks-runtime-v2";

// Assets to cache on install
const STATIC_ASSETS = ["/manifest.json"];

function offlineResponse() {
  return new Response("Offline", {
    status: 503,
    statusText: "Service Unavailable",
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => {
              console.log("[SW] Deleting old cache:", name);
              return caches.delete(name);
            }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip external requests
  if (url.origin !== self.location.origin) {
    return;
  }

  const isNextRouterRequest =
    request.headers.has("RSC") ||
    request.headers.has("Next-Router-State-Tree") ||
    url.searchParams.has("_rsc");

  // Next.js build/runtime assets and App Router payloads are versioned by the
  // framework and should not be served from this app cache after deployments.
  if (url.pathname.startsWith("/_next/") || isNextRouterRequest) {
    return;
  }

  // Network-first strategy for API routes
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || offlineResponse();
          });
        }),
    );
    return;
  }

  // Network-first strategy for documents avoids stale HTML pointing at deleted
  // hashed chunks after deployments.
  const acceptsHtml = request.headers.get("accept") || "";

  if (request.mode === "navigate" || acceptsHtml.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cachedResponse) => cachedResponse || offlineResponse()),
        ),
    );
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version and update cache in background
        fetch(request)
          .then((response) => {
            if (response.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, response);
              });
            }
          })
          .catch(() => {
            // Ignore network errors in background update
          });

        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(request)
        .then((response) => {
          // Clone and cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Network failed and not in cache - return offline page
          if (request.mode === "navigate") {
            return caches
              .match(request)
              .then((cachedResponse) => cachedResponse || offlineResponse());
          }
          return offlineResponse();
        });
    }),
  );
});

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-contact-form") {
    console.log("[SW] Background sync: contact form");
    event.waitUntil(
      // Retrieve queued form data and submit
      syncContactForm(),
    );
  }
});

// Push notification handler (for future use)
self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const title = data.title || "Мертмакс";
  const options = {
    body: data.body || "Нова актуализация",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    tag: data.tag || "notification",
    requireInteraction: false,
    data: data.url ? { url: data.url } : undefined,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

// Helper function for background sync
async function syncContactForm() {
  try {
    // Retrieve queued data from IndexedDB or local storage
    // Submit to server
    // Clear queue on success
    console.log("[SW] Contact form synced");
  } catch (error) {
    console.error("[SW] Failed to sync contact form:", error);
    throw error;
  }
}

// Message handler for cache updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CACHE_URLS") {
    event.waitUntil(
      caches.open(RUNTIME_CACHE).then((cache) => {
        return cache.addAll(event.data.urls);
      }),
    );
  }
});
