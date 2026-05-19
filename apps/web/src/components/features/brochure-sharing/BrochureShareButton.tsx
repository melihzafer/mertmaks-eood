"use client";

import { useMemo, useState } from "react";
import { Copy, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { BrochureDesignState, BrochureShareItem } from "@/lib/brochure";
import { sanitizeCanonicalPath, sanitizeHexColor } from "@/lib/brochure";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { renderBrochureToBlob } from "./brochure-renderer";

interface BrochureShareButtonProps {
  item: BrochureShareItem;
  triggerLabel?: string;
}

const backgroundLabels = {
  light: "Светъл",
  dark: "Тъмен",
  brand: "Бранд фон",
} as const;

const templateLabels = {
  square: "Квадрат",
  story: "Story",
  landscape: "Широк",
} as const;

function absoluteShareUrl(path: string) {
  const safePath = sanitizeCanonicalPath(path);
  if (typeof window === "undefined") return safePath;
  return new URL(safePath, window.location.origin).toString();
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function socialTargets(item: BrochureShareItem, headline: string) {
  const url = absoluteShareUrl(item.canonicalUrl);
  const text = `${headline} - MERTMAX`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  return [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: "Viber",
      href: `viber://forward?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
  ];
}

export function BrochureShareButton({
  item,
  triggerLabel = "Сподели",
}: BrochureShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [design, setDesign] = useState<BrochureDesignState>(() => ({
    template: "square",
    headline: item.title,
    note: item.description ?? "",
    accentColor: sanitizeHexColor(item.accentColor),
    background: "light",
    showContact: true,
    showValidity: true,
  }));
  const targets = useMemo(() => socialTargets(item, design.headline), [design.headline, item]);

  async function createBrochureBlob() {
    setIsExporting(true);
    try {
      const result = await renderBrochureToBlob(item, design);
      result.warnings.forEach((warning) => toast.warning(warning));
      return result.blob;
    } finally {
      setIsExporting(false);
    }
  }

  async function handleDownload() {
    try {
      const blob = await createBrochureBlob();
      downloadBlob(blob, `${item.id}-brochure.png`);
      toast.success("Брошурата е готова за изтегляне.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Неуспешно изтегляне.");
    }
  }

  async function handleNativeShare() {
    try {
      const shareUrl = absoluteShareUrl(item.canonicalUrl);
      const blob = await createBrochureBlob();
      const file = new File([blob], `${item.id}-brochure.png`, { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: design.headline,
          text: design.note,
          files: [file],
        });
        return;
      }

      if (navigator.share) {
        toast.info("Браузърът не приема PNG файл за директно споделяне. Споделяме линк.");
        await navigator.share({
          title: design.headline,
          text: design.note,
          url: shareUrl,
        });
        return;
      }

      downloadBlob(blob, `${item.id}-brochure.png`);
      toast.info("Браузърът не поддържа директно споделяне. Изтеглихме PNG файл.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error(error instanceof Error ? error.message : "Споделянето не успя.");
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(absoluteShareUrl(item.canonicalUrl));
      toast.success("Връзката е копирана.");
    } catch {
      toast.error("Не успяхме да копираме връзката.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="brochure-trigger" type="button" variant="outline" size="sm">
          <Share2 aria-hidden="true" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="brochure-dialog">
        <DialogHeader>
          <DialogTitle>Брошура за споделяне</DialogTitle>
          <DialogDescription>
            Настройте визията, изтеглете PNG или споделете директно от устройството.
          </DialogDescription>
        </DialogHeader>

        <div className="brochure-editor">
          <div className="brochure-preview-wrap">
            <div
              className={`brochure-preview ${design.background}`}
              style={
                { "--brochure-accent": sanitizeHexColor(design.accentColor) } as React.CSSProperties
              }
            >
              <div className="brochure-preview-top" />
              <div className="brochure-preview-image">{item.category ?? "MERTMAX"}</div>
              <span>{item.label ?? item.category ?? "предложение"}</span>
              <h3>{design.headline}</h3>
              {design.note && <p>{design.note}</p>}
              <footer>
                <b>{item.storeName ?? "MERTMAX"}</b>
                {design.showContact && item.storePhone && <small>{item.storePhone}</small>}
              </footer>
            </div>
          </div>

          <div className="brochure-controls">
            <div className="brochure-field">
              <Label htmlFor={`headline-${item.id}`}>Заглавие</Label>
              <Input
                id={`headline-${item.id}`}
                value={design.headline}
                onChange={(event) =>
                  setDesign((current) => ({ ...current, headline: event.target.value }))
                }
              />
            </div>

            <div className="brochure-field">
              <Label htmlFor={`note-${item.id}`}>Кратък текст</Label>
              <Textarea
                id={`note-${item.id}`}
                value={design.note}
                rows={3}
                onChange={(event) =>
                  setDesign((current) => ({ ...current, note: event.target.value }))
                }
              />
            </div>

            <div className="brochure-row">
              <div className="brochure-field">
                <Label>Формат</Label>
                <Select
                  value={design.template}
                  onValueChange={(value: BrochureDesignState["template"]) =>
                    setDesign((current) => ({ ...current, template: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(templateLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="brochure-field">
                <Label>Фон</Label>
                <Select
                  value={design.background}
                  onValueChange={(value: BrochureDesignState["background"]) =>
                    setDesign((current) => ({ ...current, background: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(backgroundLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="brochure-field">
              <Label htmlFor={`accent-${item.id}`}>Акцентен цвят</Label>
              <Input
                id={`accent-${item.id}`}
                type="color"
                value={design.accentColor}
                onChange={(event) =>
                  setDesign((current) => ({
                    ...current,
                    accentColor: sanitizeHexColor(event.target.value),
                  }))
                }
              />
            </div>

            <div className="brochure-switch">
              <Label htmlFor={`contact-${item.id}`}>Покажи телефон</Label>
              <Switch
                id={`contact-${item.id}`}
                checked={design.showContact}
                onCheckedChange={(checked) =>
                  setDesign((current) => ({ ...current, showContact: checked }))
                }
              />
            </div>

            <div className="brochure-switch">
              <Label htmlFor={`validity-${item.id}`}>Покажи валидност</Label>
              <Switch
                id={`validity-${item.id}`}
                checked={design.showValidity}
                onCheckedChange={(checked) =>
                  setDesign((current) => ({ ...current, showValidity: checked }))
                }
              />
            </div>
          </div>
        </div>

        <div className="brochure-actions">
          <Button type="button" onClick={handleNativeShare} disabled={isExporting}>
            <Share2 aria-hidden="true" />
            {isExporting ? "Генериране..." : "Сподели"}
          </Button>
          <Button type="button" variant="outline" onClick={handleDownload} disabled={isExporting}>
            <Download aria-hidden="true" />
            Изтегли PNG
          </Button>
          <Button type="button" variant="ghost" onClick={handleCopyLink}>
            <Copy aria-hidden="true" />
            Копирай линк
          </Button>
        </div>

        <div className="social-shortcuts" aria-label="Бързо споделяне в социални мрежи">
          {targets.map((target) => (
            <a key={target.label} href={target.href} target="_blank" rel="noopener noreferrer">
              {target.label}
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
