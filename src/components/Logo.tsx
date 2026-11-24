import Image from "next/image";

/*
 * The official Orbit logo, from the artwork supplied by the founders
 * (brand-source/*.original.png). These files are crops and resizes only —
 * never redraw or recolor them. Replace with vector/transparent masters
 * when they are available.
 */

const HORIZONTAL = { src: "/brand/orbit-horizontal-dark-160.webp", w: 404, h: 160 };

/** Horizontal logo (ring + wordmark) on its own dark artwork background. */
export function LogoHorizontal({ height = 36, className = "" }: { height?: number; className?: string }) {
  const width = Math.round((HORIZONTAL.w / HORIZONTAL.h) * height);
  return (
    <Image
      src={HORIZONTAL.src}
      alt="Orbit"
      width={width}
      height={height}
      priority
      className={`block rounded-[10px] ${className}`}
      style={{ width, height }}
    />
  );
}

/** App icon (rounded square), used where the logo stands alone. */
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
