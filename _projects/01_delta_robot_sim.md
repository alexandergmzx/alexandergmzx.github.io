---
layout: page
title: Delta robot — interactive simulator
description: The Delta_ROS2 dashboard running entirely in your browser — no ROS, no backend.
img: assets/img/Delta_robot.png
permalink: /projects/01_delta_robot/sim/
---

This is the real [Delta_ROS2]({{ '/projects/01_delta_robot/' | relative_url }}) dashboard, rebuilt to run **entirely in your browser**: the inverse kinematics are a TypeScript port of the robot's C++ solver, and motion is simulated client-side with the same trajectory interpolation the ROS action server uses. Drag the sliders to set an X/Y/Z target, **Check** its reachability, **Move** to it, or run one of the demo sequences.

<iframe
  src="{{ '/assets/delta_sim/index.html' | relative_url }}"
  title="Delta robot interactive simulator"
  loading="lazy"
  style="width: 100%; height: min(85vh, 950px); min-height: 560px; border: 1px solid rgba(128, 128, 128, 0.25); border-radius: 10px; background: #f8fafc;"
></iframe>

<p class="text-center mt-2">
  <a href="{{ '/assets/delta_sim/index.html' | relative_url }}">Open full screen</a>
</p>

The same React app drives the real robot stack when served by its FastAPI/ROS 2 backend — this page simply swaps the backend for an in-browser engine. The delta-robot physics and inverse-kinematics math were developed together with **Armando Rodriguez** ([@armandorodb](https://github.com/armandorodb)).
