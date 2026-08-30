import { cn } from "@/lib/utils";
import appConfig from "@/app.config";

/**
 * Pixmint logomark — a camera aperture whose blades open into a spark/highlight.
 * A studio lens that "mints" a shot. Fuchsia gradient on a deep plum chip.
 */
export function LogoMark({ className }: { className?: string }) {
  const blades = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label={appConfig.name}>
      <defs>
        <linearGradient id="pm-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a1330" />
          <stop offset="1" stopColor="#1c1230" />
        </linearGradient>
        <linearGradient id="pm-iris" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff86c8" />
          <stop offset="0.5" stopColor="#f23ca0" />
          <stop offset="1" stopColor="#c01f8a" />
        </linearGradient>
        <radialGradient id="pm-spark" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#ffd7ef" />
          <stop offset="1" stopColor="#ff86c8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#pm-chip)" />
      <rect width="40" height="40" rx="11" fill="#fff" opacity="0.05" />
      <g transform="translate(20 20)">
        {blades.map((deg) => (
          <path
            key={deg}
            d="M0 -11.2 L4.9 -7.2 L1.4 -2.6 Z"
            fill="url(#pm-iris)"
            opacity={0.92}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="11.2" fill="none" stroke="url(#pm-iris)" strokeWidth="1.6" opacity="0.55" />
        <circle r="6.6" fill="url(#pm-spark)" />
        <circle r="3" fill="#fff" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  withWordmark = true,
  onDark = false,
}: {
  className?: string;
  withWordmark?: boolean;
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8 shrink-0 drop-shadow-sm" />
      {withWordmark && (
        <span
          className={cn(
            "font-display text-lg font-semibold tracking-tight",
            onDark ? "text-sidebar-foreground" : "text-foreground",
          )}
        >
          {appConfig.name}
        </span>
      )}
    </span>
  );
}
