---
layout: page
title: swarm
permalink: /swarm/
description: A seven-step walkthrough of a low-cost real-time monitoring network, from Monterrey's regional stations and a documented 2023 record to a simulated fourteen-node response.
nav: false
nav_order: 8
---

## Can a low-cost real-time network keep a station informed fast enough to guide a response?

**SWARM** is my research prototype in real-time monitoring and communication. Each node carries a particle sensor, a CO₂ sensor and an environment sensor. It is designed to send one compact frame every five seconds in its own slot of a shared radio schedule to a local ground station, which stores the readings and computes a provisional source estimate; in the recorded simulation, the station also decides where the next nodes go.

The walkthrough has seven steps:

1. **Nuevo León's SIMA network**: 15 fixed stations that measure hourly across the metropolitan area.
2. **A documented 2023 record** at Ternium's Planta Guerrero in San Nicolás de los Garza: PROFEPA's inspection visits in February 2023, press reports and replies. None of those records measures how much was emitted, or what.
3. From here on, a **simulation**, starting with the weather and the search area.
4. **How readings travel**: fourteen nodes in a 5-second cycle, with the delay from each reading to the station.
5. **Deploying the nodes**, carried out on foot in four waves.
6. **Following the readings** as they arrive, with a possible relocation at every later phase.
7. Where the source is, whether the evidence confirms it, and how much it emits, set beside the 2023 record without any verdict.

<p class="my-4">
  <a class="btn btn-primary" href="{{ '/assets/swarm/index.html' | relative_url }}">Open the walkthrough →</a>
</p>

**Recorded simulation, not field measurements.**

- No SWARM node was deployed in 2023. The source is synthetic and says nothing about any real emission point, and its emission rate is the simulated source's rate.
- The readings come from the same simplified plume and noise model the estimator assumes.
- Fourteen nodes on a quarter-second schedule are the next step of the project's plan, beyond the ten-board fleet planned for mid-October; the schedule is simulated.
- A rule fixed before any run chose the episode shown: the median of the supported episodes of a pre-registered evaluation.
- In that evaluation, without added stress, computed placement with optional relocation ended with a supported location in 18 of 20 simulated episodes. The 90 % region contained the source in 14 of them and the rate interval in 17.
- A fixed spread-out layout of the same nodes did about as well, and under light wind or a varying background the station reported model disagreement instead of a location.
- A first version of the study, with eight nodes, ended its public episode with insufficient evidence; it stays in the record.

In simulation, a failure is close to decisive; a success is necessary but not sufficient evidence for the field.

## What exists today

- **Measured hardware:** the 3 September 2026 bench log records 10/10 link-test frames received from each of two satellite boards at desk range. It establishes a bench radio link, not a shared schedule, field range or sensor calibration.
- **Implemented software:** frame decoding, observation storage, provisional source estimation and the browser dashboard. The recorded episode passes through that pipeline.
- **Proposed research:** measure the real-time monitoring layer on the bench with the boards on hand. That means frames lost at each distance, how closely nodes keep their slots in a shared schedule, and the time from a reading to an alert. Field trials with reference instruments belong with a group that has them, and the 50 m localization and four-hour autonomy figures remain research targets.

I am seeking master’s supervision in real-time monitoring and communication systems, to turn this prototype’s monitoring layer into measured, reproducible results.

<details markdown="1">
<summary>Explore node details and technical notes</summary>

The [detailed node Overview]({{ '/assets/swarm/index.html' | relative_url }}#/overview?demo=1) shows a separate recorded simulation with nine fictional nodes in central Monterrey, with additional readings and inspection controls. The walkthrough is the default whenever you open the public demo.

The public bundle includes two recordings and three map archives. It requires no running ground-station server. Text and readings remain available while maps load, and failed downloads can be retried. Packaged estimator outputs are checked against the retained recording databases. Each step of the 2023 chronology links its public source.

Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL. Weather data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0), NOAA HRRR model. [Third-party notices]({{ '/assets/swarm/map-assets/NOTICE.md' | relative_url }}).

</details>
