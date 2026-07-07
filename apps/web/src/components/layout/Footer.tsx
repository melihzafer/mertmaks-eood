import Link from "next/link";
import type { CSSProperties } from "react";
import {
  brand as staticBrand,
  footerLinks as staticFooterLinks,
} from "@/data/redesign-content";
import type { LayoutBrand, LayoutLink } from "@/lib/cms/layout";
import { getRouteAccent } from "@/lib/route-accent";
import { Logo } from "@/components/layout/Logo";

type CardColorStyle = CSSProperties & {
  "--card-color"?: string;
};

interface FooterProps {
  brand?: LayoutBrand;
  footerLinks?: LayoutLink[];
}

export function Footer({
  brand = staticBrand,
  footerLinks = staticFooterLinks,
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="inline-block mb-2">
            <Logo variant="long" />
          </Link>
          <p>{brand.footerText}</p>
        </div>
        <div>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              className="dot-link"
              href={link.href}
              data-wipe
              data-color={link.color || getRouteAccent(link.href)}
              style={
                {
                  "--card-color": link.color || getRouteAccent(link.href),
                } as CardColorStyle
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <p>{brand.location}</p>
          <p>{brand.hours}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {brand.name} {brand.legalForm}
        </span>
      </div>
    </footer>
  );
}
