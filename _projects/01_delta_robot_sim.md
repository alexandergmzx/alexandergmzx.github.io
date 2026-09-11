---
layout: page
title: Delta robot.
description: An interactive study in parallel motion.
img: assets/img/Delta_robot.png
permalink: /projects/01_delta_robot/sim/
_styles: |
  .post-header { margin-bottom: 1.25rem; }
  .post-header .post-title { font-size: clamp(2.5rem, 6vw, 3.5rem); font-weight: 500; letter-spacing: -0.055em; }
  .post-header .post-description { color: #61716d; font-size: 1rem; }
  .delta-sim-intro { max-width: 42rem; margin-bottom: 1.5rem; color: var(--global-text-color); line-height: 1.75; }
  .delta-sim-frame { display: block; width: 100%; height: 660px; border: 1px solid var(--global-divider-color); border-radius: 12px; background: #f5f5f0; }
  .delta-sim-links { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem 1.5rem; margin: 1rem 0 1.5rem; font-size: 0.85rem; }
  .delta-sim-links a, .delta-sim-credit a { color: #23685e; text-decoration: underline; text-underline-offset: 4px; }
  .delta-sim-credit { max-width: 46rem; color: #61716d; font-size: 0.85rem; line-height: 1.75; }
  html[data-theme="dark"] .post-header .post-description, html[data-theme="dark"] .delta-sim-credit { color: #b7c5c0; }
  html[data-theme="dark"] .delta-sim-links a, html[data-theme="dark"] .delta-sim-credit a { color: #a1d2bf; }
  @media (max-width: 575px) { .delta-sim-links { justify-content: flex-start; } }
---

<p class="delta-sim-intro">Three coordinated motors position one moving platform. Choose a demonstration below to explore how a parallel robot moves, then open the advanced controls to try a path of your own. The simulation runs entirely in your browser.</p>

<iframe
  id="delta-sim"
  class="delta-sim-frame"
  src="{{ '/assets/delta_sim/index.html' | relative_url }}?embed=1"
  title="Delta robot interactive simulator"
  loading="eager"
></iframe>
<script src="{{ '/assets/js/delta-sim-embed.js' | relative_url }}" defer></script>

<nav class="delta-sim-links" aria-label="Simulator resources">
  <a href="{{ '/projects/01_delta_robot/' | relative_url }}">About the project</a>
  <a href="https://github.com/alexandergmzx/Delta_ROS2">Explore the source code</a>
  <a href="{{ '/assets/delta_sim/index.html' | relative_url }}">Open full screen ↗</a>
</nav>

<p class="delta-sim-credit">Built on the Delta ROS 2 project, using the original CAD model and a browser implementation of its inverse kinematics and trajectory interpolation. The delta-robot physics, inverse-kinematics math, and firmware / pseudo-Arduino emulation were developed together with <a href="https://github.com/armandorodb">Armando Rodriguez</a>.</p>
