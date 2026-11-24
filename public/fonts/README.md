# Fonts

The site is designed for **Satoshi** (Indian Type Foundry, distributed via Fontshare
under the ITF Free Font License, which permits commercial web use). Before launch:

1. Download Satoshi from https://www.fontshare.com/fonts/satoshi
2. Copy `Satoshi-Variable.woff2` and `Satoshi-VariableItalic.woff2` into this folder.
3. Keep a copy of the license file from the download alongside them.

Until the files are present, the `@font-face` rules in `src/app/globals.css` fail
quietly and the system sans-serif stack is used.
