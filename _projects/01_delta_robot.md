---
layout: page
title: Delta robot parallel manipulator
description: 3-DOF parallel manipulator simulated in ROS 2 Jazzy with RViz and a browser dashboard
img: assets/img/Delta_robot.png
importance: 1
category: academic
---

Started at the RWTH International Academy summer school **[Robot Operating Systems Essentials](https://www.academy.rwth-aachen.de/en/programs/short-courses/detail/summer-school-robot-operating-systems-essentials)** (28 July – 10 August 2025), academically conducted by the [Institute of Mechanism Theory, Machine Dynamics and Robotics (IGMR)](https://www.igmr.rwth-aachen.de/) of RWTH Aachen University with Universal Robots as industry partner. Every participant assembles a delta robot kit, takes it home, and programs it with Arduino and ROS 2. The delta robot is a 3-degree-of-freedom parallel mechanism — three motors at the base move a shared end-effector through coordinated arc trajectories.

{% include figure.liquid loading="eager" path="assets/img/Delta_robot.png" class="img-fluid rounded z-depth-1" zoomable=true alt="RViz visualization of the 3-DOF delta robot, with red, green, and blue world-frame axes above the three actuated arms and the shared end-effector platform" caption="The delta robot in RViz: three actuated arms driving a shared end-effector, with the RGB world-frame axes overhead. The URDF and meshes are the course kit's CAD (IGMR, RWTH Aachen University)." %}

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

**What the course provided, and what I built.** The kit came with its CAD (URDF and STL meshes), an RViz configuration, ROS 2 XML launch files, and skeletons of the ROS 2 nodes — including the direct kinematics — as exercises to complete. That material belongs to RWTH International Academy / IGMR and stays in the repository with attribution only (see its [NOTICE](https://github.com/alexandergmzx/Delta_ROS2/blob/main/NOTICE)). On top of it I wrote the **inverse-kinematics solution** (with Armando) and completed the IK service, joint-state publisher, trajectory action server, and pseudo-Arduino emulator. In 2026 the workspace grew into [**Delta_ROS2**](https://github.com/alexandergmzx/Delta_ROS2): a **ROS 2 Jazzy** migration from Humble, a **FastAPI + React browser dashboard** for live state, waypoint sequences, and demo presets, a fix to the course's forward kinematics, a CAD-to-glTF pipeline, and the browser-only simulator linked above. RViz remains the full ROS visualization path.

Revived in 2026 after Armando nudged me back to it. **Armando Rodriguez** ([@armandorodb](https://github.com/armandorodb)), robotics engineer at Universidad de Monterrey and my teammate on the course, co-wrote the inverse kinematics and, in 2026, the TypeScript IK port and the forward-kinematics fix.

*Robot CAD, URDF, and ROS 2 exercise scaffold: course material of [RWTH International Academy gGmbH](https://www.academy.rwth-aachen.de/en/programs/short-courses/detail/summer-school-robot-operating-systems-essentials) and [IGMR, RWTH Aachen University](https://www.igmr.rwth-aachen.de/) (all rights reserved), reproduced with attribution for this non-commercial portfolio. Dashboard, simulator, and migration code: MIT, [Delta_ROS2](https://github.com/alexandergmzx/Delta_ROS2).*
