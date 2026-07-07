import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { escapeHtml } from "@/lib/html";
import {
  canWriteSanity,
  saveContactSubmission,
} from "@/lib/sanity/submissions";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const blankToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const contactSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа"),
  email: z.preprocess(
    blankToUndefined,
    z.string().email("Невалиден имейл адрес").optional(),
  ),
  phone: z.preprocess(
    blankToUndefined,
    z.string().min(7, "Невалиден телефонен номер").optional(),
  ),
  store: z.preprocess(
    blankToUndefined,
    z
      .enum(["grocery", "supermarket", "industrial", "construction", "restaurant"])
      .optional(),
  ),
  topic: z.preprocess(blankToUndefined, z.string().min(2).optional()),
  message: z.string().min(10, "Съобщението трябва да е поне 10 символа"),
}).refine((data) => data.email || data.phone, {
  message: "Моля, въведете имейл или телефон.",
  path: ["email"],
});

const storeNames = {
  grocery: "Хранителен магазин",
  supermarket: "Супермаркет",
  industrial: "Домашни потреби",
  construction: "Строителен магазин",
  restaurant: "Ресторант",
};

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
  if (limit.count >= 5) return false;
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

    const validatedData = contactSchema.parse(body);
    const safeName = escapeHtml(validatedData.name);
    const safeEmail = validatedData.email
      ? escapeHtml(validatedData.email)
      : undefined;
    const safePhone = validatedData.phone ? escapeHtml(validatedData.phone) : undefined;
    const safeMessage = escapeHtml(validatedData.message);
    const safeIp = escapeHtml(ip);
    const safeTopic = validatedData.topic
      ? escapeHtml(validatedData.topic)
      : undefined;

    if (canWriteSanity()) {
      try {
        await saveContactSubmission({
          ...validatedData,
          path: getSourcePath(request),
          userAgent: request.headers.get("user-agent") ?? undefined,
        });
      } catch (error) {
        console.error("Sanity contact submission write failed.", error);
        return NextResponse.json(
          {
            success: false,
            error: "Грешка при записване на съобщението. Моля, опитайте отново.",
          },
          { status: 500 },
        );
      }
    } else if (!resend && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          error: "Формата не е конфигурирана за запис. Моля, обадете се директно.",
        },
        { status: 503 },
      );
    }

    if (!resend) {
      return NextResponse.json({
        success: true,
        message:
          "Вашето съобщение е изпратено успешно! Ще се свържем с вас скоро.",
      });
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "МЕРТМАКС ЕООД <onboarding@resend.dev>", // Update this when you verify your domain
      to: [process.env.RECIPIENT_EMAIL || "your-email@example.com"],
      subject: `Ново съобщение от ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Ново контактно съобщение</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Име:</strong> ${safeName}</p>
            ${safeEmail ? `<p><strong>Имейл:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>` : ""}
            ${safePhone ? `<p><strong>Телефон:</strong> ${safePhone}</p>` : ""}
            ${validatedData.store ? `<p><strong>Магазин:</strong> ${storeNames[validatedData.store]}</p>` : ""}
            ${safeTopic ? `<p><strong>Тема:</strong> ${safeTopic}</p>` : ""}
          </div>
          <div style="background: white; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h3 style="margin-top: 0;">Съобщение:</h3>
            <p style="line-height: 1.6;">${safeMessage}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">
            Изпратено на: ${new Date().toLocaleString("bg-BG")}<br>
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
          error: "Грешка при изпращане на имейл. Моля, опитайте отново.",
        },
        { status: 500 }
      );
    }

    console.log("Contact form submission notification sent.", { id: data?.id });

    return NextResponse.json({
      success: true,
      message:
        "Вашето съобщение е изпратено успешно! Ще се свържем с вас скоро.",
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
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Възникна грешка. Моля, опитайте отново." },
      { status: 500 }
    );
  }
}
