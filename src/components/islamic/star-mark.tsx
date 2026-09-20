"use client";

import { cn } from "@/lib/utils";

interface StarMarkProps {
  className?: string;
  showGold?: boolean;
}

/**
 * Eight-pointed star (Khatim Sulayman) — the brand mark of Islam24x7.
 * Two overlapping squares rotated 45°, rendered as crisp SVG.
 */
export function StarMark({ className, showGold = true }: StarMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("inline-block", className)}
      role="img"
      aria-label="Islam24x7 star mark"
    >
      {/* Outer star — emerald */}
      <rect
        x="10"
        y="10"
        width="28"
        height="28"
        rx="3"
        transform="rotate(0 24 24)"
        className="fill-emerald"
        opacity="0.92"
      />
      {/* Inner star — gold */}
      {showGold && (
        <rect
          x="14"
          y="14"
          width="20"
          height="20"
          rx="2"
          transform="rotate(45 24 24)"
          className="fill-gold"
          opacity="0.95"
        />
      )}
      {/* Center dot */}
      <circle cx="24" cy="24" r="3" className="fill-background" />
      <circle cx="24" cy="24" r="1.5" className="fill-gold" />
    </svg>
  );
}

/** Decorative Islamic geometric divider with repeating eight-pointed stars. */
export function StarDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2 py-3", className)}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
      <StarMark className="h-5 w-5" />
      <StarMark className="h-3 w-3 opacity-60" />
      <StarMark className="h-5 w-5" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}

/** Subtle background lattice of eight-pointed stars. */
export function StarLattice({ className }: { className?: string }) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full opacity-[0.04]", className)}
      aria-hidden
    >
      <defs>
        <pattern
          id="star-pattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g transform="translate(30 30)">
            <rect
              x="-12"
              y="-12"
              width="24"
              height="24"
              rx="2"
              transform="rotate(0)"
              className="fill-emerald"
            />
            <rect
              x="-9"
              y="-9"
              width="18"
              height="18"
              rx="1.5"
              transform="rotate(45)"
              className="fill-gold"
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#star-pattern)" />
    </svg>
  );
}
