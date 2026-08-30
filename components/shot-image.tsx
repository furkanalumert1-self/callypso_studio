/**
 * ShotImage — a tasteful, gallery-like "studio shot" placeholder. It stands in
 * for an AI-generated product photo in demo mode: a soft gradient scene backdrop
 * (parameterised by hue + scene preset), a subtle prop/surface motif, and the
 * product rendered as an emoji "subject" sitting on a surface with a soft shadow.
 *
 * It is deliberately NOT a photorealistic fake — it reads as curated studio art.
 * Wire fal.ai (run /setup) to replace these with real renders.
 */
import type { CSSProperties } from "react";

export type ScenePreset = "studio" | "marble" | "outdoor" | "lifestyle" | "gradient" | "linen";

/** A small visual recipe per scene: backdrop stops + surface tint + props. */
function recipe(scene: ScenePreset, hue: string) {
  switch (scene) {
    case "studio":
      return { top: `oklch(96% 0.03 ${hue})`, bot: `oklch(89% 0.06 ${hue})`, floor: `oklch(82% 0.05 ${hue})`, sweep: true };
    case "marble":
      return { top: `oklch(97% 0.012 250)`, bot: `oklch(92% 0.02 250)`, floor: `oklch(88% 0.015 250)`, veins: true };
    case "outdoor":
      return { top: `oklch(90% 0.07 ${hue})`, bot: `oklch(84% 0.1 ${hue})`, floor: `oklch(70% 0.11 145)`, sun: true };
    case "lifestyle":
      return { top: `oklch(94% 0.05 ${hue})`, bot: `oklch(88% 0.09 ${hue})`, floor: `oklch(74% 0.08 60)`, table: true };
    case "linen":
      return { top: `oklch(95% 0.03 75)`, bot: `oklch(90% 0.05 75)`, floor: `oklch(85% 0.05 75)`, weave: true };
    case "gradient":
    default:
      return { top: `oklch(82% 0.16 ${hue})`, bot: `oklch(66% 0.2 ${Number(hue) + 18})`, floor: `oklch(60% 0.18 ${Number(hue) + 30})`, glow: true };
  }
}

export function ShotImage({
  scene = "studio",
  hue = "345",
  emoji = "🧴",
  className,
  style,
}: {
  scene?: ScenePreset;
  hue?: string;
  emoji?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const r = recipe(scene, hue);
  const id = `${scene}-${hue}`;

  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", ...style }}>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={r.top} />
            <stop offset="1" stopColor={r.bot} />
          </linearGradient>
          <radialGradient id={`vig-${id}`} cx="0.5" cy="0.42" r="0.7">
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#1a0c20" stopOpacity="0.18" />
          </radialGradient>
          <radialGradient id={`spot-${id}`} cx="0.5" cy="0.32" r="0.5">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* backdrop */}
        <rect width="400" height="300" fill={`url(#bg-${id})`} />
        {/* studio sweep / floor */}
        <path d="M0 196 Q200 168 400 196 V300 H0 Z" fill={r.floor} opacity="0.85" />
        {r.sweep && <ellipse cx="200" cy="196" rx="260" ry="42" fill="#fff" opacity="0.18" />}
        {/* top key-light spot */}
        <rect width="400" height="300" fill={`url(#spot-${id})`} />

        {/* scene-specific props */}
        {r.veins && (
          <g stroke="oklch(78% 0.02 250)" strokeWidth="1.4" opacity="0.55" fill="none">
            <path d="M30 70 Q90 50 150 95 T280 80" />
            <path d="M250 40 Q300 90 360 60" />
            <path d="M60 240 Q140 210 230 250" />
          </g>
        )}
        {r.sun && <circle cx="320" cy="64" r="46" fill="#fff3cf" opacity="0.8" />}
        {r.table && <rect x="0" y="190" width="400" height="14" fill={`oklch(58% 0.09 40)`} opacity="0.7" />}
        {r.weave && (
          <g stroke="oklch(82% 0.04 75)" strokeWidth="1" opacity="0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={210 + i * 10} x2="400" y2={210 + i * 10} />
            ))}
          </g>
        )}
        {r.glow && <circle cx="200" cy="130" r="120" fill="#fff" opacity="0.12" className="glow-pulse" />}

        {/* contact shadow under the subject */}
        <ellipse cx="200" cy="206" rx="70" ry="14" fill="#000" opacity="0.16" />

        {/* the "subject" — product emoji, the lit hero of the shot. Rendered as
            SVG text so it scales naturally with the viewBox. */}
        <text
          x="200"
          y="150"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="120"
          style={{ filter: "drop-shadow(0 8px 16px rgba(20,8,30,0.3))" }}
        >
          {emoji}
        </text>

        <rect width="400" height="300" fill={`url(#vig-${id})`} />
      </svg>
    </div>
  );
}
