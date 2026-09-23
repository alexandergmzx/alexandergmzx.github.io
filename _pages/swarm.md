---
layout: page
title: swarm
permalink: /swarm/
description: A six-step walkthrough from Monterrey's monitoring network and a documented 2023 record to a simulated SWARM investigation with eight sensors.
nav: false
nav_order: 8
---

## Can low-cost sensors help find where pollution comes from?

**SWARM** is my research prototype for investigating this question. It connects sensor nodes, wireless observations and a local ground station that stores readings and computes a provisional source estimate.

The walkthrough has six steps. It starts from **Nuevo León's SIMA network** of 15 fixed stations, which measure hourly across the metropolitan area, and from a **documented 2023 record** at Ternium's Planta Guerrero in San Nicolás de los Garza: PROFEPA's inspection visits in February 2023, press reports and replies. None of those records measures how much was emitted, or what. From step 3 on it is a **simulation**: eight sensors carried on foot around the plant coordinate, placed one wave at a time among the sites the station expects to be most informative, and a final step that says whether the evidence supports a source, is insufficient, or disagrees with the model.

<p class="my-4">
  <a class="btn btn-primary" href="{{ '/assets/swarm/index.html' | relative_url }}">Open the walkthrough →</a>
</p>

**Recorded simulation, not field measurements.** No SWARM sensor was deployed in 2023. The simulated source is drawn at random inside the search area and says nothing about any real emission point; the readings come from the same simplified plume and noise model the estimator assumes. The walkthrough shows the result of its one recorded episode, whatever it is, next to an evaluation over 20 simulated episodes per configuration with thresholds fixed beforehand, in which computed placement did not measurably beat a fixed spread-out layout. In simulation, a failure is close to decisive; a success is necessary but not sufficient evidence for the field.

## What exists today

- **Measured hardware:** the 3 September 2026 bench log records 10/10 link-test frames received from each of two satellite boards at desk range. It establishes a bench radio link, not field range or sensor calibration.
- **Implemented software:** frame decoding, observation storage, provisional source estimation and the browser dashboard. The recorded episode passes through that pipeline.
- **Proposed research:** calibrate sensors against reference instruments, run controlled releases with known positions, and evaluate localization error in independent trials, with an honest record of where the method fails. The 50 m localization and four-hour autonomy figures remain research targets.

I am seeking master’s supervision to turn this prototype into a validated, reproducible source-localization method.

<details markdown="1">
<summary>Explore sensor details and technical notes</summary>

The [detailed sensor Overview]({{ '/assets/swarm/index.html' | relative_url }}#/overview?demo=1) shows a separate recorded simulation with nine fictional sensors in central Monterrey, with additional readings and inspection controls. The walkthrough is the default whenever you open the public demo.

The public bundle includes two recordings and three map archives. It requires no running ground-station server. Text and readings remain available while maps load, and failed downloads can be retried. Packaged estimator outputs are checked against the retained recording databases. Each step of the 2023 chronology links its public source.

Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL. Weather data by [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0), NOAA HRRR model. [Third-party notices]({{ '/assets/swarm/map-assets/NOTICE.md' | relative_url }}).

</details>
