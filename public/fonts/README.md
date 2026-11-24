# Fonts

`fonts/` holds the Satoshi family from Fontshare (Indian Type Foundry), licensed under the
ITF Free Font License, which allows use on websites.

The site loads only `Satoshi-Variable` and `Satoshi-VariableItalic` (woff2, with woff as a
fallback). Those two files contain every weight from Light to Black. The static files
(Light, Regular, Medium, Bold, Black and their italics, in eot/ttf/woff/woff2) are kept for
design tools and older software; loading them as well would only add download weight.

Add the licence text from the Fontshare download to this folder before launch.
