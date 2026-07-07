import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";
import {
  canWriteSanity,
  upsertNewsletterSubscriber,
} from "@/lib/sanity/submissions";

const subscribeSchema = z.object({
  email: z.string().email("Невалиден имейл адрес"),
  store: z.enum(["all", "supermarket", "industrial", "construction"]).default("all"),
});

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

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.writeFile(
    subscribersPath,
    JSON.stringify({ subscribers }, null, 2),
    "utf-8"
  );
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Невалиден JSON payload." },
        { status: 400 },
      );
    }

    const validatedData = subscribeSchema.parse(body);
    const email = validatedData.email.toLowerCase();

    if (canWriteSanity()) {
      try {
        const result = await upsertNewsletterSubscriber({
          email,
          store: validatedData.store,
        });

        if (result?.status === "exists") {
          return NextResponse.json(
            { success: false, error: "Този имейл вече е абониран." },
            { status: 409 },
          );
        }

        return NextResponse.json({
          success: true,
          message: "Благодарим! Абонирахте се успешно.",
        });
      } catch (error) {
        console.error("Sanity newsletter subscribe write failed.", error);
        return NextResponse.json(
          { success: false, error: "Грешка при записване. Моля, опитайте отново." },
          { status: 500 },
        );
      }
    } else if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          error: "Абонаментите не са конфигурирани. Моля, опитайте по-късно.",
        },
        { status: 503 },
      );
    }

    const subscribers = await getSubscribers();

    const exists = subscribers.some(
      (s) => s.email.toLowerCase() === email && s.active
    );

    if (exists) {
      return NextResponse.json(
        { success: false, error: "Този имейл вече е абониран." },
        { status: 409 }
      );
    }

    const newSubscriber: Subscriber = {
      email,
      store: validatedData.store,
      subscribedAt: new Date().toISOString(),
      active: true,
    };

    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);

    return NextResponse.json({
      success: true,
      message: "Благодарим! Абонирахте се успешно.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0]?.message ?? "Невалидни данни" },
        { status: 400 }
      );
    }
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Възникна грешка. Моля, опитайте отново." },
      { status: 500 }
    );
  }
}
