---
layout: page
title: swarm
permalink: /swarm/
description: Follow a guided, recorded SWARM experiment in central Monterrey, from background readings to a possible pollution-source location.
nav: false
nav_order: 8
---

## Can small sensors help find a pollution source?

**SWARM** is my research prototype for investigating this question. It connects sensor nodes, wireless observations and a local ground station that stores readings and computes a provisional source estimate.

The guided example follows **nine fictional sensors and one simulated receiver in central Monterrey**: first background readings, then a hypothetical event, then the station’s estimate. Reveal the known simulated source to compare it with the result. Each chapter explains one step, and technical details remain available on request.

<p class="my-4">
  <a class="btn btn-primary" href="{{ '/assets/swarm/index.html' | relative_url }}">Explore the guided Monterrey experiment →</a>
</p>

**Recorded simulation, not field measurements.** The generator and estimator share a simplified model family. This example demonstrates the software pipeline; it does not validate urban localization accuracy or attribute emissions to a real facility. Model uncertainty and grid spacing are explained alongside the result.

## What exists today

- **Measured hardware:** the 3 September 2026 bench log records 10/10 link-test frames received from each of two satellite boards at desk range. It establishes a bench radio link, not field range or sensor calibration.
- **Implemented software:** frame decoding, observation storage, provisional source estimation and the browser dashboard. The recording passes through that pipeline.
- **Proposed research:** calibrate sensors, compare estimation methods with baselines, and evaluate localization error in independent controlled and field trials. The 50 m localization and four-hour autonomy figures remain research targets.

I am seeking master’s supervision to turn this prototype into a validated, reproducible source-localization method.

<details markdown="1">
<summary>Explore sensor details and technical notes</summary>

The [detailed sensor Overview]({{ '/assets/swarm/index.html' | relative_url }}#/overview?demo=1) shows the same nine-sensor experiment with additional readings and inspection controls. The guided presentation is the default whenever you open the public demo.

The public bundle includes one recorded local experiment, its basemap, and a city-context map. It requires no running ground-station server. Readings remain available while maps load, and failed downloads can be retried. Packaged estimator outputs are checked against the retained recording database.

Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL. [Third-party notices]({{ '/assets/swarm/map-assets/NOTICE.md' | relative_url }}).

</details>
