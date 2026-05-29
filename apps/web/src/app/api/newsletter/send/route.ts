import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { promises as fs } from "fs";
import path from "path";
import { getWeeklyPromotions } from "@/lib/cms/weekly-promotions";
import { renderWeeklyEmailHtml } from "@/lib/email/weekly-template";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface Subscriber {
  email: string;
  store: string;
  subscribedAt: string;
  active: boolean;
}

const subscribersPath = path.join(
  process.cwd(),
  "src",
  "data",
  "newsletter-subscribers.json"
);

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(subscribersPath, "utf-8");
    return JSON.parse(data).subscribers ?? [];
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  // Simple auth via CRON_SECRET header
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscribers = await getSubscribers();
    const activeSubscribers = subscribers.filter((s) => s.active);

    if (activeSubscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Няма активни абонати.",
        sent: 0,
      });
    }

    // Fetch weekly promotions for all stores
    const storeSlugs = ["supermarket", "industrial", "construction"] as const;
    const weeklyPromosByStore: Record<string, any[]> = {};
    for (const slug of storeSlugs) {
      weeklyPromosByStore[slug] = await getWeeklyPromotions(slug);
    }

    const results: { email: string; status: string }[] = [];

    for (const subscriber of activeSubscribers) {
      const storeSlugsForSubscriber =
        subscriber.store === "all"
          ? (["supermarket", "industrial", "construction"] as const)
          : [subscriber.store as "supermarket" | "industrial" | "construction"];

      const promos = storeSlugsForSubscriber.flatMap(
        (slug) => weeklyPromosByStore[slug] ?? []
      );

      if (promos.length === 0) {
        results.push({ email: subscriber.email, status: "no-promos" });
        continue;
      }

      const html = renderWeeklyEmailHtml(promos, subscriber.store);

      if (!resend) {
        console.log(
          `Would send weekly email to ${subscriber.email} with ${promos.length} promos`
        );
        results.push({ email: subscriber.email, status: "logged-no-api-key" });
        continue;
      }

      const { error } = await resend.emails.send({
        from: "МЕРТМАКС ЕООД <onboarding@resend.dev>",
        to: [subscriber.email],
        subject: "Седмични оферти — MERTMAX",
        html,
      });

      if (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error);
        results.push({ email: subscriber.email, status: "error" });
      } else {
        results.push({ email: subscriber.email, status: "sent" });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Изпратени ${results.filter((r) => r.status === "sent").length} имейла.`,
      sent: results.filter((r) => r.status === "sent").length,
      results,
    });
  } catch (error) {
    console.error("Weekly newsletter send error:", error);
    return NextResponse.json(
      { success: false, error: "Грешка при изпращане." },
      { status: 500 }
    );
  }
}
