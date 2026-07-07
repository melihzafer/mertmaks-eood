import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { escapeHtml } from "@/lib/html";
import {
  canWriteSanity,
  saveFeedbackSubmission,
} from "@/lib/sanity/submissions";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  category: z.enum(["service", "products", "website", "other"]),
  comment: z.string().max(500).optional(),
});

const categoryNames = {
  service: "Обслужване",
  products: "Продукти",
  website: "Уебсайт",
  other: "Друго",
};

const ratingEmojis = ["😡", "😞", "😐", "😊", "🤩"];

const rateLimit = new Map<string, { count: number; resetTime: number }>();
let lastPrune = 0;

function pruneRateLimit(now: number) {
  if (now - lastPrune < 300000) return;
  lastPrune = now;

  rateLimit.forEach((limit, ip) => {
    if (now > limit.resetTime) rateLimit.delete(ip);
  });
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  pruneRateLimit(now);
  const limit = rateLimit.get(ip);
  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (limit.count >= 3) return false;
  limit.count++;
  return true;
}

function getSourcePath(request: NextRequest) {
  const referer = request.headers.get("referer");
  if (!referer) return undefined;

  try {
    return new URL(referer).pathname;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Твърде много заявки. Моля, опитайте след минута.",
        },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Невалиден JSON payload." },
        { status: 400 },
      );
    }

    const validatedData = feedbackSchema.parse(body);
    const safeComment = validatedData.comment
      ? escapeHtml(validatedData.comment)
      : undefined;
    const safeIp = escapeHtml(ip);

    if (canWriteSanity()) {
      try {
        await saveFeedbackSubmission({
          ...validatedData,
          path: getSourcePath(request),
          userAgent: request.headers.get("user-agent") ?? undefined,
        });
      } catch (error) {
        console.error("Sanity feedback submission write failed.", error);
        return NextResponse.json(
          {
            success: false,
            error: "Грешка при записване. Моля, опитайте отново.",
          },
          { status: 500 },
        );
      }
    } else if (!resend && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          error: "Формата не е конфигурирана за запис.",
        },
        { status: 503 },
      );
    }

    if (!resend) {
      return NextResponse.json({
        success: true,
        message: "Благодарим ви за обратната връзка!",
      });
    }

    const stars = "⭐".repeat(validatedData.rating);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "МЕРТМАКС ЕООД <onboarding@resend.dev>", // Update this when you verify your domain
      to: [process.env.RECIPIENT_EMAIL || "your-email@example.com"],
      subject: `Нова обратна връзка ${ratingEmojis[validatedData.rating - 1]} (${validatedData.rating}/5)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">Нова обратна връзка от клиент</h2>
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; margin: 20px 0; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">${ratingEmojis[validatedData.rating - 1]}</div>
            <div style="font-size: 32px; color: white; margin-bottom: 5px;">${stars}</div>
            <div style="font-size: 18px; color: rgba(255,255,255,0.9);">${validatedData.rating} от 5 звезди</div>
          </div>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Категория:</strong> ${categoryNames[validatedData.category]}</p>
          </div>
          ${
            validatedData.comment
              ? `
          <div style="background: white; padding: 20px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
            <h3 style="margin-top: 0;">Коментар:</h3>
            <p style="line-height: 1.6;">${safeComment}</p>
          </div>
          `
              : '<p style="color: #6b7280; font-style: italic;">Без коментар</p>'
          }
          <p style="color: #6b7280; font-size: 12px;">
            Получено на: ${new Date().toLocaleString("bg-BG")}<br>
            IP адрес: ${safeIp}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Грешка при изпращане. Моля, опитайте отново.",
        },
        { status: 500 }
      );
    }

    console.log("Feedback submission notification sent.", { id: data?.id });

    return NextResponse.json({
      success: true,
      message: "Благодарим ви за обратната връзка!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Невалидни данни",
          details: error.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }
    console.error("Feedback form error:", error);
    return NextResponse.json(
      { success: false, error: "Възникна грешка. Моля, опитайте отново." },
      { status: 500 }
    );
  }
}
