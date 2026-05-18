import type { SVGProps } from "react";

export function ArrowGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="ar-arrow-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e2e2" />
        </linearGradient>
        <filter id="ar-arrow-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter="url(#ar-arrow-shadow)">
        <path
          d="M50 6 L86 76 L50 60 L14 76 Z"
          fill="url(#ar-arrow-fill)"
          stroke="#1a1a1a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
