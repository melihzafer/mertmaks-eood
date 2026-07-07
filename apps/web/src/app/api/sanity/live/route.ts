import { sanityClient } from "@/lib/sanity/client";

const LIVE_DOCUMENT_TYPES = [
  "siteSettings",
  "navigationItem",
  "store",
  "category",
  "product",
  "promotion",
  "homePage",
  "divisionPage",
  "contactPage",
  "restaurantPage",
  "faq",
  "storeArticle",
  "newsletterSubscriber",
  "contactSubmission",
  "feedbackSubmission",
];

const LIVE_QUERY = `*[_type in ${JSON.stringify(LIVE_DOCUMENT_TYPES)}]`;
const HEARTBEAT_MS = 25_000;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function encodeEvent(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function GET(request: Request) {
  const client = sanityClient;

  if (!client) {
    return new Response(null, { status: 204 });
  }

  const encoder = new TextEncoder();
  let cleanup = () => {};

  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      let heartbeat: ReturnType<typeof setInterval> | undefined;
      let subscription: { unsubscribe: () => void } | undefined;

      const enqueue = (chunk: string) => {
        if (!closed) controller.enqueue(encoder.encode(chunk));
      };

      const cleanupResources = () => {
        if (closed) return;
        closed = true;
        if (heartbeat) clearInterval(heartbeat);
        subscription?.unsubscribe();
      };

      const close = () => {
        cleanupResources();
        try {
          controller.close();
        } catch {
          // The stream can already be closed when the client disconnects.
        }
      };

      cleanup = cleanupResources;
      request.signal.addEventListener("abort", close, { once: true });

      enqueue(": connected\n\n");
      heartbeat = setInterval(() => {
        enqueue(`: heartbeat ${Date.now()}\n\n`);
      }, HEARTBEAT_MS);

      subscription = client
        .listen(
          LIVE_QUERY,
          {},
          {
            events: ["mutation"],
            includeMutations: false,
            includeResult: false,
            tag: "website-live-refresh",
            visibility: "query",
          },
        )
        .subscribe({
          next: () => {
            enqueue(encodeEvent("mutation", { updatedAt: Date.now() }));
          },
          error: (error) => {
            console.error("Sanity live listener failed.", error);
            enqueue(encodeEvent("error", { message: "Sanity listener failed" }));
            close();
          },
        });
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream; charset=utf-8",
      "X-Accel-Buffering": "no",
    },
  });
}
