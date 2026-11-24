# Brand assets on the website

## Sources

The four supplied images are kept unchanged in `brand-source/`. Every web asset below was
extracted from them by script. Nothing was redrawn, traced or regenerated.

## Assets in `public/brand/`

| File | What it is | Where it's used | How it was made |
| --- | --- | --- | --- |
| `orbit-logo-light.(png\|webp)` | **A. Primary light-background horizontal logo**: flat ring + near-black wordmark, transparent | Header, footer | The "Flat logo" tile on the brand sheet, separated from its black background by colour-to-alpha (keeps anti-aliasing). Wordmark refilled with near-black `#0d0d12` using its original alpha. Ring: outer glow removed outside the ring band, and the white glint highlight tinted to the ring's own colour at that angle so it doesn't vanish on white. |
| `orbit-logo-dark.(png\|webp)` | **B. Dark-background horizontal logo**: original flat ring + white wordmark, transparent | Available for dark placements | Same tile, colour-to-alpha only; ring kept exactly as supplied, glint included. |
| `orbit-icon-flat.(png\|webp)` | **C. Flat icon, for light surfaces** | Small UI placements | Ring from (A). |
| `orbit-icon-flat-on-dark.(png\|webp)` | **C. Flat icon, original** | Dark surfaces | Ring from (B). |
| `orbit-icon-glow.(png\|webp)` | **D. Glowing icon**, transparent | Dark promotional contexts only | Ring from the supplied horizontal logo, colour-to-alpha against its background, glow preserved. |
| `orbit-app-icon-ring.png` | Ring-only dark app icon | Source for the favicon | "App icon / dark" tile on the brand sheet, cropped, corners made transparent. |
| `orbit-app-icon-256.(png\|webp)`, `-180.png` | Dark app icon with wordmark | Page heroes, social card, Apple touch icon | Supplied app-icon image, cropped to its rounded square. |
| `orbit-primary-*.webp` | Primary logo on black | Not placed | Resized from the supplied primary logo. |

**E. Web icons** (`src/app/`): `favicon.ico` (16/32/48) and `icon.png` use the ring-only dark app
icon, because the wordmark inside the other app icon is unreadable at 16px. `apple-icon.png`
uses the app icon with the wordmark.

All were checked on white, off-white, near-black and deep-violet surfaces, and at header
(30px tall, 1x and 2x) and favicon (16/32/48px) sizes.

## Limitations: please supply vector or high-res masters

- The flat logo on the brand sheet is only about **150px tall**. That's enough for the header
  and footer on high-density screens, but not for large uses such as a 400px logo on a slide.
  Supply an SVG, or a transparent PNG at least 1000px wide, for (A), (B) and (C).
- The light-surface version needed two small adjustments to work on white: removing the outer
  glow (which the brief asks for) and tinting the white glint. Please confirm these are
  acceptable, or supply the intended light-background artwork.
- No SVGs were produced: tracing the raster would be a recreation, not the official artwork.

## Colour

Accent `#7b35e8` was sampled from the violet at the base of the logo ring and darkened
slightly so white button text passes WCAG AA (5.9:1). Ring ends `#b04cf4` and `#6351f8` are used
only for the thin rule under the closing "Just Tell Orbit.". Please confirm against official hex values.

## Type

Satoshi (Fontshare, ITF Free Font License) from `public/fonts/fonts/`. The site loads only the
two variable files (woff2, with woff as a fallback), which cover weights 300–900, upright and
italic. See `public/fonts/README.md`.
