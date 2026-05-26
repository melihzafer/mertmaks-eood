import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

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
    const body = await request.json();
    const validatedData = subscribeSchema.parse(body);

    const subscribers = await getSubscribers();

    const exists = subscribers.some(
      (s) => s.email.toLowerCase() === validatedData.email.toLowerCase() && s.active
    );

    if (exists) {
      return NextResponse.json(
        { success: false, error: "Този имейл вече е абониран." },
        { status: 409 }
      );
    }

    const newSubscriber: Subscriber = {
      email: validatedData.email.toLowerCase(),
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
