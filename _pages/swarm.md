---
layout: page
title: swarm
permalink: /swarm/
description: The SWARM ground station's Overview, playing back a recorded run — the instrument itself, not a picture of it.
nav: false
nav_order: 8
_styles: >
  /* The floating back-to-top button is 40 px at z-index 10, 30 px from the
     bottom-right corner of the VIEWPORT — which on this page lands inside the
     frame, on the console's own "Open full screen" link. Hidden here, as on
     /spectral/, and on no other page; the fixed navbar is still the way back up. */
  #back-to-top { display: none; }

  /* The 1 px border is part of a contract, not decoration: this column is
     $max-content-width 930px, Bootstrap 4.6.2 spends 15 px of gutter on each
     side, and the border comes out of a border-box — so the frame's own
     viewport is 898 px. The Overview's phone breakpoint is 700 px
     (overview.css and useMediaQuery('(max-width: 700px)') in the swarm
     repository), so 898 clears it with 198 px of margin and keeps the map and
     the 260 px inspector in two columns. Moving max_width in _config.yml below
     872 px breaks /spectral/ first; below 732 px it would render the Overview's
     phone layout on a laptop, and nothing in any repository goes red.
     (swarm, ADR 0040; ground-station/README.md, "Overview and the recorded demo".) */
  .sw-frame {
    display: block;
    width: 100%;
    border: 1px solid var(--global-divider-color);
    border-radius: 10px;
    background: var(--global-card-bg-color);
  }

  /* 1210 px is MEASURED, not assumed: at an 898 px column the desktop
     Overview is approximately 1205 px of content (swarm, map-ui row 18), and
     the bundle sends no resize message — unlike the Delta simulator there is
     no postMessage height bridge on this page — so this number is the only
     thing between the reader and a footer that clips into an inner scrollbar.
     It is written in two repositories and moves only in coordinated commits,
     one per repository, each naming the other. */
  .sw-frame--overview { height: 1210px; }

  /* Below 732 px of viewport (700 + 2×15 gutter + 2×1 border) the frame is
     narrower than the Overview's phone breakpoint: the inspector drops under
     the map, the eight roster cards stack one per row, and the content gets
     TALLER, not shorter. 2160 px was measured headless at a 358 px frame —
     a 390 px phone — with this recording; a too-tall frame shows a blank strip
     under the console, a too-short one scrolls inside. Trim it only after
     measuring again (MANUAL.md, "The Swarm tab"). Between 733 and 871 px the
     desktop layout persists in a narrower column and may scroll inside the
     frame, which the contract allows. */
  @media (max-width: 732px) {
    .sw-frame--overview { height: 2160px; }
  }
---

**SWARM** is a source-localization research project: a fleet of small LoRa sensor nodes that measure
PM2.5, CO₂ and temperature, a receiver on USB, and a ground station that keeps the observations, draws
the network that carried them, and estimates where a pollution source might be. This page is the
station's front door — the **Overview** — the same instrument an operator sees, playing back a
recorded run.

Three questions over one map. **Observations** — what does each node observe? Numbered pins identify
the sensors; the inspector shows readings, units, freshness and position quality. **Network** — how do
readings reach the station? Only links that were actually observed are drawn. **Source estimate** —
where might the source be? The map shades the posterior and names only the marks it draws: a posterior
with nothing usable draws nothing, and a collapsed one reads _spread below one grid cell_ with the
over-confidence caveat, never as a zero-error result.

**What plays here is a recorded synthetic-plume experiment, not a field deployment.** The sensor frames
were generated for the Madrid test site; the estimator and the persistence path were the real
ground-station pipeline; every value and estimate on screen is the station's own output, packaged into a
fixture together with the hashes of the code that produced it, and replayed frame by frame. Nothing is
recomputed in your browser, and nothing here talks to a server — the recording, the basemap and the
fonts are all served from this site. Localization accuracy and node autonomy are research targets of
the project, not results shown here.

<div class="text-center my-3">
  <a
    class="btn btn-outline-primary"
    role="button"
    href="{{ '/assets/swarm/index.html' | relative_url }}?demo=1"
  >
    <i class="fa-solid fa-expand"></i> Open the Overview full screen
  </a>
</div>

<p class="text-center">
  On a phone, <a href="{{ '/assets/swarm/index.html' | relative_url }}?demo=1">open it full screen</a>
  rather than using the frame below.
</p>

<iframe
  class="sw-frame sw-frame--overview"
  src="{{ '/assets/swarm/index.html' | relative_url }}?embed=1"
  title="SWARM Overview — recorded simulation"
  loading="lazy"
></iframe>

Select a numbered node on the map or in the roster and the inspector follows it; **Replay from start**
walks the eighteen recorded snapshots at the speed you choose. The **ES / EN** switch in the console
header changes the language of the instrument, and the choice is remembered on this site. The map
follows your device's light or dark setting, not this site's toggle — the Overview is built for a
laptop in the field, and there it has no host page to ask.

## What you are looking at

{% include figure.liquid loading="lazy" path="assets/img/swarm-overview-embed-898.png" class="img-fluid rounded z-depth-1" zoomable=true alt="The SWARM Overview console as embedded on this page, 898 pixels wide: the Observations tab, a dark OpenStreetMap basemap of Puerta del Sol in Madrid with eight numbered node pins clustered on the square, the inspector for Node 01 to the right with PM2.5, CO2, temperature, humidity, pressure and gas-resistance readings, a replay scrubber, a roster of eight sensor nodes in two columns, and a footer stating that this is a recorded synthetic-plume experiment." caption="The embed at its contract width of 898 px. Map and inspector share a row; the roster of eight nodes sits below; the footer states what the data is. The whole console is 1205 px tall here, which is where the frame's 1210 px comes from." %}

{% include figure.liquid loading="lazy" path="assets/img/swarm-overview-1280.png" class="img-fluid rounded z-depth-1" zoomable=true alt="The full-screen Overview at 1280 pixels: the research eyebrow and the title Environmental observations, connected, two lines of introduction stating that localization accuracy and node autonomy are research targets rather than results, and below them the same console with the map and the Node 01 inspector." caption="The full-screen page an operator opens. The introduction above the console says the same thing the footer inside it does: research targets are not results." %}

## The station behind it

The ground station is a Python service with a browser dashboard, built to run on a laptop with no
network beyond the receiver on its USB port: the basemap is a bounded PMTiles extract of OpenStreetMap
read from a single file, and the map fonts and sprites travel with the build, so the same bundle that
runs in the field runs here. The recording was verified against the database it came from before it
was packaged — every packaged response equals a re-query of that database — and the fixture names the
Git revision and the SHA-256 of the six source files whose behaviour it depends on.

_Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors, under the ODbL; the
basemap is built with Protomaps, and the labels are set in Noto Sans. The full third-party notices
travel inside the bundle at [map-assets/NOTICE.md]({{ '/assets/swarm/map-assets/NOTICE.md' | relative_url }}).
The dashboard itself is part of the SWARM project and is MIT-licensed; the project's code is in a
private research repository for now, so what is public is this page, the recording and the instrument
that plays it._
