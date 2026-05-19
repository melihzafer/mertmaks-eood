import type { BrochureDesignState, BrochureShareItem } from "@/lib/brochure";
import { isAllowedBrochureImageUrl, sanitizeHexColor } from "@/lib/brochure";

const templateSizes = {
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
  landscape: { width: 1200, height: 675 },
} as const;

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Неуспешно генериране на PNG."));
      }
    }, "image/png");
  });
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width <= maxWidth) {
      line = testLine;
      continue;
    }

    if (line) lines.push(line);
    line = word;
    if (lines.length === maxLines - 1) break;
  }

  if (line && lines.length < maxLines) lines.push(line);

  lines.forEach((textLine, index) => {
    context.fillText(textLine, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
}

async function loadImage(url?: string) {
  if (!url || !isAllowedBrochureImageUrl(url)) return null;

  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) return null;

  const blob = await response.blob();
  if ("createImageBitmap" in window) {
    return createImageBitmap(blob);
  }

  const objectUrl = URL.createObjectURL(blob);
  const image = new Image();
  image.decoding = "async";
  image.src = objectUrl;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Снимката не може да се зареди."));
  });
  URL.revokeObjectURL(objectUrl);

  return image;
}

function roundedRectPath(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const roundRect = (
    context as CanvasRenderingContext2D & {
      roundRect?: (
        x: number,
        y: number,
        width: number,
        height: number,
        radii?: number,
      ) => void;
    }
  ).roundRect;

  if (typeof roundRect === "function") {
    roundRect.call(context, x, y, width, height, radius);
    return;
  }

  const r = Math.min(radius, width / 2, height / 2);
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: CanvasImageSource,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const sourceWidth =
    "naturalWidth" in image ? image.naturalWidth : "width" in image ? Number(image.width) : width;
  const sourceHeight =
    "naturalHeight" in image
      ? image.naturalHeight
      : "height" in image
        ? Number(image.height)
        : height;
  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const scaledWidth = sourceWidth * scale;
  const scaledHeight = sourceHeight * scale;
  const sx = (width - scaledWidth) / 2;
  const sy = (height - scaledHeight) / 2;

  context.save();
  context.beginPath();
  roundedRectPath(context, x, y, width, height, 36);
  context.clip();
  context.drawImage(image, x + sx, y + sy, scaledWidth, scaledHeight);
  context.restore();
}

function drawBackground(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  design: BrochureDesignState,
) {
  const accentColor = sanitizeHexColor(design.accentColor);

  if (design.background === "dark") {
    context.fillStyle = "#111111";
    context.fillRect(0, 0, width, height);
    return;
  }

  if (design.background === "brand") {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, accentColor);
    gradient.addColorStop(1, "#111111");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    return;
  }

  context.fillStyle = "#F7F5F2";
  context.fillRect(0, 0, width, height);
}

export async function renderBrochureToBlob(
  item: BrochureShareItem,
  design: BrochureDesignState,
) {
  const size = templateSizes[design.template];
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const warnings: string[] = [];
  const accentColor = sanitizeHexColor(design.accentColor);

  if (!context) {
    throw new Error("Браузърът не поддържа canvas export.");
  }

  canvas.width = size.width;
  canvas.height = size.height;

  drawBackground(context, size.width, size.height, design);

  const isLight = design.background === "light";
  const foreground = isLight ? "#111111" : "#F7F5F2";
  const muted = isLight ? "#4A4A4A" : "#E7DED2";
  const pad = Math.round(size.width * 0.075);
  const topBand = Math.max(34, Math.round(size.height * 0.035));

  context.fillStyle = accentColor;
  context.fillRect(0, 0, size.width, topBand);

  const imageHeight =
    design.template === "story"
      ? Math.round(size.height * 0.34)
      : design.template === "landscape"
        ? Math.round(size.height * 0.42)
        : Math.round(size.height * 0.36);
  const imageTop = pad + topBand;

  try {
    const image = await loadImage(item.imageUrl);
    if (image) {
      drawImageCover(context, image, pad, imageTop, size.width - pad * 2, imageHeight);
      if ("close" in image) image.close();
    } else {
      if (item.imageUrl) warnings.push("Снимката не беше включена в PNG файла.");
    }
  } catch {
    warnings.push("Снимката не беше включена в PNG файла.");
  }

  if (warnings.length) {
    context.fillStyle = accentColor;
    context.globalAlpha = 0.18;
    context.fillRect(pad, imageTop, size.width - pad * 2, imageHeight);
    context.globalAlpha = 1;
    context.fillStyle = foreground;
    context.font = `700 ${Math.round(size.width * 0.045)}px Manrope, Arial, sans-serif`;
    context.fillText("MERTMAX", pad + 36, imageTop + imageHeight / 2);
  }

  let y = imageTop + imageHeight + Math.round(size.height * 0.06);
  context.fillStyle = accentColor;
  context.font = `800 ${Math.round(size.width * 0.036)}px Manrope, Arial, sans-serif`;
  context.fillText(item.label ?? item.category ?? "предложение", pad, y);

  y += Math.round(size.height * 0.07);
  context.fillStyle = foreground;
  context.font = `900 ${Math.round(size.width * 0.074)}px Geologica, Manrope, Arial, sans-serif`;
  y = drawWrappedText(context, design.headline, pad, y, size.width - pad * 2, Math.round(size.width * 0.082), 3);

  if (design.note) {
    y += Math.round(size.height * 0.035);
    context.fillStyle = muted;
    context.font = `500 ${Math.round(size.width * 0.037)}px Manrope, Arial, sans-serif`;
    y = drawWrappedText(context, design.note, pad, y, size.width - pad * 2, Math.round(size.width * 0.05), 3);
  }

  const footerY = size.height - pad * 1.45;
  context.fillStyle = accentColor;
  context.fillRect(pad, footerY - 20, size.width - pad * 2, 4);

  context.fillStyle = foreground;
  context.font = `800 ${Math.round(size.width * 0.032)}px Manrope, Arial, sans-serif`;
  context.fillText(item.storeName ?? "MERTMAX", pad, footerY + 34);

  const footerParts: string[] = [];
  if (design.showContact && item.storePhone) footerParts.push(item.storePhone);
  if (design.showValidity && item.validTo) footerParts.push(`Валидно до ${item.validTo}`);
  if (footerParts.length) {
    context.fillStyle = muted;
    context.font = `500 ${Math.round(size.width * 0.026)}px Manrope, Arial, sans-serif`;
    context.fillText(footerParts.join("  |  "), pad, footerY + 76);
  }

  return {
    blob: await toBlob(canvas),
    warnings,
  };
}
