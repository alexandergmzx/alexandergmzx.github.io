---
layout: page
title: Delta robot parallel manipulator
description: 3-DOF parallel manipulator simulated in ROS 2 Jazzy with RViz and a browser dashboard
img: assets/img/Delta_robot.png
importance: 1
category: academic
---

Built during the **RWTH Aachen & Universal Robots Executive Certificate** program (July 2025). The delta robot is a 3-degree-of-freedom parallel mechanism — three motors at the base move a shared end-effector through coordinated arc trajectories.

{% include figure.liquid loading="eager" path="assets/img/Delta_robot.png" class="img-fluid rounded z-depth-1" zoomable=true alt="RViz visualization of the 3-DOF delta robot, with red, green, and blue world-frame axes above the three actuated arms and the shared end-effector platform" caption="The delta robot in RViz: three actuated arms driving a shared end-effector, with the RGB world-frame axes overhead." %}

<div class="text-center my-3">
  <a
    class="btn btn-outline-primary"
    role="button"
    href="https://github.com/alexandergmzx/Delta_ROS2"
    target="_blank"
    rel="external nofollow noopener"
  >
    <i class="fa-brands fa-github"></i> View the code on GitHub
  </a>
  <a
    class="btn btn-outline-primary"
    role="button"
    href="{{ '/projects/01_delta_robot/sim/' | relative_url }}"
  >
    <i class="fa-solid fa-cube"></i> Launch the interactive simulator
  </a>
</div>

The project has since grown into [**Delta_ROS2**](https://github.com/alexandergmzx/Delta_ROS2), a full **ROS 2 Jazzy** simulation workspace. It implements both **forward and inverse kinematics** — the end-effector can be commanded in joint space or Cartesian space — and drives the mechanism through coordinated arc trajectories. The stack is split into clean packages: a `description` package (URDF, meshes, RViz, launch files), a `serial` package exposing an inverse-kinematics service, joint-state publisher, trajectory action server, and a pseudo-Arduino emulator that stands in for the firmware, and a `ui` package — a **FastAPI + React browser dashboard** for live state, waypoint sequences, and demo presets. RViz remains the full ROS visualization path.

Revived in 2026 after Armando nudged me back to it. The delta-robot physics, the inverse-kinematics math, and the Arduino firmware / pseudo-Arduino emulation were developed together with **Armando Rodriguez** ([@armandorodb](https://github.com/armandorodb)), robotics engineer.
