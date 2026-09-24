---
layout: page
title: SWARM — a low-cost real-time monitoring network
description: Low-cost environmental nodes on a shared radio schedule and a local ground station, shown through a seven-step walkthrough of a simulated response
img: assets/img/swarm_walkthrough.png
importance: 0 # listed first among academic projects (Delta robot and Super Spectral are 1)
category: academic
---

**SWARM** is my research prototype in real-time monitoring and communication. Each node carries a particle sensor, a CO₂ sensor and an environment sensor. It is designed to send one compact frame every five seconds in its own slot of a shared radio schedule to a local ground station, which stores the readings and computes a provisional source estimate. The question it asks: can a low-cost real-time network keep a station informed fast enough to guide a response?

The project is built the slow way. A proposal fixed the research question before any code; architectural choices are recorded as decision records; every figure the public page prints is traced to its source and recomputed from the recording; and the simulation study behind the walkthrough was pre-registered, with its thresholds fixed on separate episodes before the evaluation ran.

<div class="text-center my-3">
  <a class="btn btn-outline-primary" role="button" href="{{ '/assets/swarm/index.html' | relative_url }}">
    <i class="fa-solid fa-route"></i> Open the walkthrough
  </a>
  <a class="btn btn-outline-primary" role="button" href="{{ '/swarm/' | relative_url }}">
    <i class="fa-solid fa-circle-info"></i> About the walkthrough
  </a>
</div>

## What is measured, and what is simulated

- **Measured hardware:** the 3 September 2026 bench log records 10/10 link-test frames received from each of two satellite boards at desk range. It establishes a bench radio link, not a shared schedule, field range or sensor calibration.
- **Implemented software:** frame decoding, observation storage, provisional source estimation and the browser dashboard. The recorded episode passes through that pipeline.
- **Simulated:** fourteen nodes on a quarter-second schedule are the next step of the project's plan, beyond the ten-board fleet planned for mid-October; the schedule is simulated. The source is synthetic and says nothing about any real emission point, and its emission rate is the simulated source's rate.

## The walkthrough

Seven steps run from Nuevo León's SIMA network and a documented 2023 record at Ternium's Planta Guerrero to a simulated response: how readings travel from fourteen nodes to one station, how the nodes are deployed and relocated, and where the source is, whether the evidence supports it and how much it emits, set beside the 2023 record without any verdict.

In the pre-registered evaluation, without added stress, computed placement with optional relocation ended with a supported location in 18 of 20 simulated episodes; the 90 % region contained the source in 14 of them and the rate interval in 17. A fixed spread-out layout of the same nodes did about as well, and under light wind or a varying background the station reported model disagreement instead of a location. In simulation, a failure is close to decisive; a success is necessary but not sufficient evidence for the field.

It has a page of its own — [swarm]({{ '/swarm/' | relative_url }}) — and a separate [detailed node Overview]({{ '/assets/swarm/index.html' | relative_url }}#/overview?demo=1).

{% include figure.liquid loading="lazy" path="assets/img/swarm_walkthrough_step5.png" class="img-fluid rounded z-depth-1" zoomable=true alt="Step 5 of the walkthrough, Deploy the nodes: on the left, the step's text on node 1's site, each wave's sites and when readings count; on the right, a street map around the plant with fourteen numbered nodes coloured by wave, the dashed search area and plant outline, the candidate sites as hollow circles, and a violet shading with a ring around the model's estimate" caption="Step 5, deploying the nodes: a recorded simulation with a synthetic source. Nodes are coloured by the wave that carried them out; the shading is where the model would place a source if there is one, and the ring is its 90 % region, drawn only for a supported state." %}

_The research I propose next measures the monitoring layer on the bench with the boards on hand: frames lost at each distance, how closely nodes keep their slots in a shared schedule, and the time from a reading to an alert. Field trials with reference instruments belong with a group that has them, and the 50 m localization and four-hour autonomy figures remain research targets._
