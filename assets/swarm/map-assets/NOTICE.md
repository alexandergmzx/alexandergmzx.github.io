# map-assets — vendored third-party notices

Static assets the ground-station map loads instead of a CDN, so the vector
basemap renders with the laptop's WAN off (offline-first, T1 of the map plan).
Everything here is a verbatim copy; regenerate by re-downloading the paths below.

Vendored from [protomaps/basemaps-assets](https://github.com/protomaps/basemaps-assets)
at commit `028c18f713baecad011301ff7a69acc39bcc2ae7` (2025-10-31), via
`https://raw.githubusercontent.com/protomaps/basemaps-assets/<commit>/<path>`.

| Path | Origin | Licence |
|------|--------|---------|
| `fonts/Noto Sans Regular/{0-255,256-511}.pbf` | `fonts/Noto Sans Regular/` — SDF glyph PBFs built with [maplibre/font-maker](https://github.com/maplibre/font-maker) from Noto Sans, © 2022 The Noto Project Authors | [SIL Open Font License 1.1](https://openfontlicense.org/) (`fonts/OFL.txt` upstream) |
| `fonts/Noto Sans Medium/{0-255,256-511}.pbf` | same | SIL OFL 1.1 |
| `fonts/Noto Sans Italic/{0-255,256-511}.pbf` | same | SIL OFL 1.1 |
| `sprites/v4/{light,light@2x,dark,dark@2x}.{json,png}` | `sprites/v4/` — spritesheets built with [spreet](https://github.com/flother/spreet); icons derived from [tangrams/icons](https://github.com/tangrams/icons) | [MIT](https://github.com/tangrams/icons/blob/master/LICENSE.md) (tangrams/icons derivative) |

Related, not vendored here:

| Component | Where | Licence / obligation |
|-----------|-------|----------------------|
| Map data (`datasets/geo/<site>/basemap.pmtiles`) | Protomaps daily build `20260912.pmtiles`, derived from OpenStreetMap and Natural Earth | [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/) — the map must show "© OpenStreetMap contributors" (the style's attribution control does this; do not hide it) |
| Map data in the recorded demo (`demo/basemap.pmtiles`, emitted by `npm run build:demo`) | a build-time copy of `datasets/geo/madrid/basemap.pmtiles`, never tracked twice | ODbL 1.0 — the © OpenStreetMap contributors control stays visible in the embed and in any screenshot |
| Basemap style (`@protomaps/basemaps` 5.7.2, npm) | node_modules, bundled by Vite | [BSD-3-Clause](https://github.com/protomaps/basemaps/blob/main/LICENSE) |
| MapLibre GL JS, pmtiles (npm) | node_modules, bundled by Vite | BSD-3-Clause; BSD-3-Clause |

Scope of the glyph set: only ranges `0-255` and `256-511` per fontstack (Basic
Latin, Latin-1 Supplement, Latin Extended-A/B — enough for Spanish and English
labels). A label outside those ranges requests `/map-assets/fonts/<stack>/<range>.pbf`,
gets a 404 and renders without that glyph; add the range from upstream if a
site ever needs it. The style also names `Noto Sans Devanagari Regular v1` inside
a `case` expression for Devanagari-script labels; neither site has any, so it is
not vendored.

## Fonts (`fonts/`, outside map-assets)

| Asset | Origin | Licence |
|---|---|---|
| `fonts/eb-garamond/EBGaramond-Regular.woff2` (the walkthrough's headings) | EB Garamond Regular, © 2017 The EB Garamond Project Authors, via Google Fonts; subset to Latin and converted to WOFF2 with fontTools (recipe and digests in `fonts/eb-garamond/SOURCE.md`) | [SIL OFL 1.1](../fonts/eb-garamond/OFL.txt); no Reserved Font Name |

## Known gaps

- `@protomaps/basemaps` 5.7.2 references a sprite named `townhall` that neither the vendored
  sheets nor the upstream `basemaps-assets` main branch contain (checked 2026-09-12); MapLibre
  logs one "image not found" warning per style load and draws no icon for town halls. Harmless.
- Glyph ranges vendored: 0–255, 256–511, 768–1023 (Greek: the Δφ badge), 8192–8447 (typographic quotes), 8704–8959 (the typographic minus) and 9984–10239 (Dingbats: a ❤ in a shop name near Sol) for
  Noto Sans Regular / Medium / Italic. Any other range 404s and falls back to local rendering.
