import Link from "next/link";
import type { CSSProperties } from "react";
import { brand, footerLinks } from "@/data/redesign-content";

type CardColorStyle = CSSProperties & {
  "--card-color"?: string;
};

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>{brand.name}</h3>
          <p>{brand.footerText}</p>
        </div>
        <div>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              className="dot-link"
              href={link.href}
              data-wipe
              data-color={link.color}
              style={{ "--card-color": link.color } as CardColorStyle}
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
        <span>Powered by Melih Hyusein</span>
      </div>
    </footer>
  );
}
