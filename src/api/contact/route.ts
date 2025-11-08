import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Името трябва да е поне 2 символа'),
  email: z.string().email('Невалиден имейл адрес'),
  phone: z.string().min(10, 'Невалиден телефонен номер').optional(),
  store: z.enum(['grocery', 'industrial', 'construction']).optional(),
  message: z.string().min(10, 'Съобщението трябва да е поне 10 символа'),
});

const rateLimit = new Map();

function checkRateLimit(ip: string) {
  const now = Date.now();
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
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ success: false, error: 'Твърде много заявки. Моля, опитайте след минута.' }, { status: 429 });
    }
    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    console.log('Contact form submission:', { ...validatedData, timestamp: new Date().toISOString(), ip });
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json({ success: true, message: 'Вашето съобщение е изпратено успешно! Ще се свържем с вас скоро.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Невалидни данни', details: error.errors.map(e => e.message) }, { status: 400 });
    }
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: 'Възникна грешка. Моля, опитайте отново.' }, { status: 500 });
  }
}