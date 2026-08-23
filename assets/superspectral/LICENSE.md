<!--
SPDX-FileCopyrightText: 2026 Alexander Gomez
SPDX-License-Identifier: GPL-3.0-or-later
-->

# Super Spectral — the web application

This directory is a **generated build**, not source. It is produced by:

```
git clone https://github.com/alexandergmzx/superspectral.git
cd superspectral/host/web && git checkout web-app
npm run build:site      # -> dist-site/
```

and copied wholesale into the hosting site by `npm run sync:site`. Nothing here
is hand-edited, and anything added to the destination directory by hand is
destroyed by the next sync — which is why this file lives in `host/web/public/`
upstream rather than beside the build output.

## Licence

**GPL-3.0-or-later.** The Super Spectral repository is Apache-2.0 by default, but
`host/` — including this web application's TypeScript, CSS and HTML — is a
GPL-3.0-or-later island, because the Linux companion imports parselmouth/Praat
(GPLv3) in-process and a permissive licence cannot do that. The web application is
the user interface of that same program (ADR 0021), so it carries the same licence.

Full text: [`host/LICENSE`](https://github.com/alexandergmzx/superspectral/blob/main/host/LICENSE).
The split is recorded in [ADR 0004](https://github.com/alexandergmzx/superspectral/blob/main/docs/adr/0004-split-licensing.md)
and stated in [`NOTICE`](https://github.com/alexandergmzx/superspectral/blob/main/NOTICE).

The bundle's npm dependencies are permissive-only (MIT, ISC, 0BSD, BSD-2/3-Clause,
Apache-2.0, CC0-1.0, Unlicense, BlueOak-1.0.0, Python-2.0, Zlib, CC-BY-4.0); AGPL is
forbidden, enforced by a fail-closed CI licence gate over `package-lock.json`.

## Privacy

The analyzer runs entirely in the browser: `getUserMedia` into an `AudioWorklet`,
the transform in a Worker, the drawing on a canvas. There is no backend in the
live path and no audio leaves the machine.
