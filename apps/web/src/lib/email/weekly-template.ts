import type { WeeklyPromotion } from "@/data/weekly-promotions";

const storeNames: Record<string, string> = {
  supermarket: "Супермаркет",
  industrial: "Домашни потреби",
  construction: "Строителство",
};

export function renderWeeklyEmailHtml(
  promos: WeeklyPromotion[],
  storeFilter: string,
): string {
  const storeLabel =
    storeFilter === "all" ? "Всички обекти" : storeNames[storeFilter] ?? storeFilter;

  const promoCards = promos
    .map((promo) => {
      const storeName = storeNames[promo.store] ?? promo.store;
      const discountBadge =
        promo.discount && promo.discount > 0
          ? `<span style="background:#dc2626;color:white;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;display:inline-block;margin-bottom:8px;">-${promo.discount}%</span>`
          : "";

      const imageHtml = promo.image
        ? `<img src="${promo.image}" alt="${promo.title}" style="width:100%;height:180px;object-fit:cover;border-radius:12px;margin-bottom:12px;" />`
        : "";

      const termsHtml =
        promo.terms && promo.terms.length > 0
          ? `<ul style="margin:8px 0 0 0;padding-left:16px;font-size:12px;color:#6b7280;">
              ${promo.terms.map((t) => `<li>${t}</li>`).join("")}
             </ul>`
          : "";

      return `
        <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:16px;margin-bottom:16px;">
          ${imageHtml}
          <div style="margin-bottom:4px;font-size:12px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${storeName} — ${promo.category}</div>
          ${discountBadge}
          <h3 style="margin:4px 0 8px 0;font-size:18px;color:#111111;">${promo.title}</h3>
          <p style="margin:0 0 8px 0;font-size:14px;color:#4b5563;line-height:1.5;">${promo.description}</p>
          <p style="margin:0;font-size:12px;color:#9ca3af;">Валидна: ${promo.validFrom} – ${promo.validTo}</p>
          ${termsHtml}
        </div>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Седмични оферти — MERTMAX</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background:#dc2626;padding:24px 32px;border-radius:16px 16px 0 0;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;">Седмични оферти — MERTMAX</h1>
              <p style="margin:8px 0 0 0;color:rgba(255,255,255,0.85);font-size:14px;">${storeLabel}</p>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;padding:24px 32px;">
              <p style="margin:0 0 20px 0;font-size:14px;color:#374151;">
                Здравейте! Ето актуалните седмични оферти от МЕРТМАКС:
              </p>
              ${promoCards}
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;border-radius:0 0 16px 16px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:12px;color:#6b7280;">
                МЕРТМАКС ЕООД — с. Самуил, област Разград
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Ако не желаете да получавате този бюлетин, моля отговорете на този имейл.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
