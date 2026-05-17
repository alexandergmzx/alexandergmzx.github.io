---
layout: page
title: Delta robot parallel manipulator
description: 3-DOF parallel manipulator with ROS2 Jazzy and real-time motion control
img: assets/img/1.jpg
importance: 1
category: academic
---

Built during the **RWTH Aachen & Universal Robots Executive Certificate** program (July 2025). The delta robot is a 3-degree-of-freedom parallel mechanism — three motors at the base move a shared end-effector through coordinated arc trajectories.

I programmed the microcontroller and the ROS2 Jazzy node that drives it, implementing both **forward and inverse kinematics** so the end-effector can be commanded in either joint space or Cartesian space. Coordinated multi-axis motion is handled with real-time control loops timed to the motor dynamics.
