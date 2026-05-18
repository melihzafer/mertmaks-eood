"use client";

import { ArrowGlyph } from "./icons/ArrowGlyph";

interface Props {
  rotation: number;
  arrived?: boolean;
  calibrating?: boolean;
}

export function ARArrow({ rotation, arrived = false, calibrating = false }: Props) {
  return (
    <div
      className="pointer-events-none absolute inset-0 grid place-items-center"
      aria-hidden="true"
    >
      <div
        className={[
          "ar-arrow-wrapper",
          arrived ? "ar-arrow-arrived" : "",
          calibrating ? "ar-arrow-calibrating" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          width: "min(70vw, 320px)",
          height: "min(70vw, 320px)",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 180ms linear, opacity 220ms ease",
          opacity: arrived ? 0.25 : 1,
          willChange: "transform",
        }}
      >
        <ArrowGlyph width="100%" height="100%" />
      </div>
    </div>
  );
}
