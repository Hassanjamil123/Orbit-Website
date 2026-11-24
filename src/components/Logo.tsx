import Image from "next/image";

/*
 * Official Orbit logo assets, extracted from the founders' brand sheet
 * (brand-source/). See docs/BRAND.md for exactly how each file was made.
 * Never redraw or recolor these in code.
 */

const LOGO = { w: 382, h: 149 };

/** Horizontal logo: flat ring + wordmark. "light" is for white/off-white surfaces. */
export function Logo({
  height = 30,
  surface = "light",
  priority = false,
  className = "",
}: {
  height?: number;
  surface?: "light" | "dark";
  priority?: boolean;
  className?: string;
}) {
  const width = Math.round((LOGO.w / LOGO.h) * height);
  return (
    <Image
      src={surface === "light" ? "/brand/orbit-logo-light.webp" : "/brand/orbit-logo-dark.webp"}
      alt="Orbit"
      width={width}
      height={height}
      priority={priority}
      className={`block ${className}`}
      style={{ width, height }}
    />
  );
}

/** Official dark app icon (rounded square, glowing ring and wordmark). */
export function AppIcon({ size = 64, className = "", alt = "" }: { size?: number; className?: string; alt?: string }) {
  return (
    <Image
      src="/brand/orbit-app-icon-256.webp"
      alt={alt}
      width={size}
      height={size}
      className={`block ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.225 }}
    />
  );
}

/** Flat ring only, for small placements on light surfaces. */
export function RingIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/orbit-icon-flat.webp"
      alt=""
      width={size}
      height={size}
      className={`block ${className}`}
      style={{ width: size, height: Math.round(size * (149 / 155)) }}
    />
  );
}
