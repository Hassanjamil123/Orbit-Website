# Brand usage on the website

## Logo files

The founders supplied four raster files, kept unchanged in `brand-source/`:

| Original | What it is |
| --- | --- |
| `orbit-app-icon-dark.original.png` | App icon: rounded square, glowing ring, "Orbit" inside |
| `orbit-primary-logo.original.png` | Primary logo on black, ring with "Orbit" inside |
| `orbit-horizontal-logo.original.png` | Horizontal logo (ring + wordmark) on near-black, with a menu glyph at left |
| `orbit-brand-sheet.original.png` | Presentation sheet of all variants (not used directly) |

Web files in `public/brand/` and `src/app/` are **crops and resizes only**. Nothing has been
redrawn, recolored or regenerated:

- `orbit-horizontal-dark-*.webp/png`: the horizontal logo cropped to ring + wordmark (the menu
  glyph is UI, not part of the logo), keeping its own dark background. Used in the header
  (36px tall) and footer (44px), with rounded corners.
- `orbit-app-icon-*`: the app icon cropped to its rounded square; the black outside the corners
  is made transparent. Used in page heroes, the social card, and as the favicon
  (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`).
- `orbit-primary-*.webp`: resized primary logo, available but not currently placed.

## Why the logo sits on a dark tile

Every supplied file is artwork on a dark background, and the glow only reads on dark. The
site's backgrounds are white as the brief requires, so the header and footer show the
horizontal logo as its own dark tile rather than stripping its background, which would change
the design.

**Needed from the brand owner:** the "Inverse" and "Flat" variants shown on the brand sheet as
transparent SVG or high-resolution PNG files. With an inverse (dark-on-light) horizontal logo, the
header can drop the dark tile. These variants can't be taken from the sheet: they're too small
there, and extracting them would mean redrawing them.

## Color

The accent `#7b35e8` was sampled from the violet at the base of the logo ring (`#7935dd`–`#883aef`),
then adjusted slightly so white button text on it passes WCAG AA (5.9:1). The two ends of the
logo ring, `#b04cf4` (magenta) and `#6351f8` (blue-violet), are used only for the thin rule under
"Just Tell Orbit." and the answers-to-outcomes line. **Please confirm or replace these with the official hex values.**

## Type

The site is set in Satoshi when its files are in `public/fonts/` (see the README there), with a
system sans-serif fallback. Its look was checked only with the fallback font.

## Tagline

"Just Tell Orbit." appears in: the homepage hero (brand line), the "Just tell Orbit what you
need." section, the closing call to action on every marketing page, the footer, and the default
page title, description and social card.
