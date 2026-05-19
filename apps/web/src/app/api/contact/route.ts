import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { escapeHtml } from "@/lib/html";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const contactSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа"),
  email: z.string().email("Невалиден имейл адрес"),
  phone: z.string().min(10, "Невалиден телефонен номер").optional(),
  store: z.enum(["grocery", "industrial", "construction"]).optional(),
  message: z.string().min(10, "Съобщението трябва да е поне 10 символа"),
});

const storeNames = {
  grocery: "Хранителен магазин",
  industrial: "Домашни потреби",
  construction: "Строителен магазин",
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

    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    const safeName = escapeHtml(validatedData.name);
    const safeEmail = escapeHtml(validatedData.email);
    const safePhone = validatedData.phone ? escapeHtml(validatedData.phone) : undefined;
    const safeMessage = escapeHtml(validatedData.message);
    const safeIp = escapeHtml(ip);

    // If no Resend API key, just log to console
    if (!resend) {
      console.log(
        "Contact form submission (no email sent - missing RESEND_API_KEY):",
        validatedData
      );
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
            <p><strong>Имейл:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${safePhone ? `<p><strong>Телефон:</strong> ${safePhone}</p>` : ""}
            ${validatedData.store ? `<p><strong>Магазин:</strong> ${storeNames[validatedData.store]}</p>` : ""}
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

    console.log("Contact form submission sent via email:", data);

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
