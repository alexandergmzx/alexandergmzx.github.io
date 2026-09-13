---
layout: default
title: Delta robot parallel manipulator
description: 3-DOF parallel manipulator simulated in ROS 2 Jazzy with RViz and a browser dashboard
img: assets/img/Delta_robot.png
importance: 1
category: academic
---

<div class="academic-project">
<nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="{{ '/' | relative_url }}">Home</a> &nbsp; / &nbsp; <a href="{{ '/projects/' | relative_url }}">Projects</a> &nbsp; / &nbsp; Delta robot
      </nav>
      <header class="project-heading">
        <p class="eyebrow">Robotics · Academic project</p>
        <h1>Delta robot<br />parallel manipulator</h1>
        <p class="lead">
          A three-degree-of-freedom parallel robot, explored through ROS 2, inverse kinematics, and an interactive browser simulator.
        </p>
      </header>
      <dl class="project-facts">
        <div>
          <dt>Context</dt>
          <dd>RWTH summer school, 2025</dd>
        </div>
        <div>
          <dt>Methods &amp; tools</dt>
          <dd>ROS 2 Jazzy · C++ · Python · React</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>Browser simulator available</dd>
        </div>
      </dl>
      <figure class="project-figure">
        <div class="figure-mat">
          <img
            src="{{ 'assets/img/Delta_robot.png' | relative_url }}"
            width="750"
            height="583"
            alt="RViz visualization of the delta robot, showing three actuated arms, the shared end-effector platform, and red, green, and blue world-frame axes"
          />
        </div>
        <figcaption>
          <span class="eyebrow">Figure 01</span> &nbsp; The delta robot in RViz. Robot CAD and URDF: course material of RWTH International Academy /
          IGMR, RWTH Aachen University.
        </figcaption>
      </figure>
      <nav class="project-actions" aria-label="Project resources">
        <a class="button primary" href="{{ '/projects/01_delta_robot/sim/' | relative_url }}"
          >Explore the simulator <span aria-hidden="true">↗</span></a
        ><a class="button" href="https://github.com/alexandergmzx/Delta_ROS2">Source code <span aria-hidden="true">↗</span></a>
      </nav>
      <section class="project-section" aria-labelledby="overview">
        <h2 id="overview">The mechanism</h2>
        <div>
          <p>
            Three motors at the base position a shared end-effector through coordinated arm trajectories. The project connects the robot’s geometry to
            working software: inverse kinematics, joint-state publishing, and trajectory execution.
          </p>
          <p>
            It began at the
            <a href="https://www.academy.rwth-aachen.de/en/programs/short-courses/detail/summer-school-robot-operating-systems-essentials"
              >Robot Operating Systems Essentials</a
            >
            summer school (28 July–10 August 2025), offered by RWTH International Academy and academically conducted by
            <a href="https://www.igmr.rwth-aachen.de/">IGMR, RWTH Aachen University</a>, with Universal Robots as industry partner.
          </p>
        </div>
      </section>
      <section class="project-section" aria-labelledby="contributions">
        <h2 id="contributions">My contribution</h2>
        <div>
          <ul>
            <li>
              Co-wrote the inverse-kinematics solution with Armando Rodriguez and completed the IK service, joint-state publisher, trajectory action
              server, and pseudo-Arduino emulator.
            </li>
            <li>
              Migrated the workspace from ROS 2 Humble to Jazzy, and built a FastAPI + React dashboard for live state, waypoint sequences, and demo
              presets.
            </li>
            <li>
              Added the CAD-to-glTF pipeline and browser-only simulator. Armando also co-wrote the TypeScript inverse-kinematics port and the
              forward-kinematics fix.
            </li>
          </ul>
        </div>
      </section>
      <section class="project-section" aria-labelledby="provided">
        <h2 id="provided">Course foundation</h2>
        <div>
          <p>
            The kit supplied CAD models, URDF and STL meshes, an RViz configuration, ROS 2 launch files, and node scaffolds—including direct
            kinematics—as exercises to complete. These materials belong to RWTH International Academy / IGMR.
          </p>
          <p>The browser simulator makes the mechanism accessible without a local ROS installation. RViz remains the full ROS visualization path.</p>
        </div>
      </section>
      <section class="project-section" aria-labelledby="credits">
        <h2 id="credits">Collaboration<br />&amp; attribution</h2>
        <div>
          <p>
            Built with <a href="https://github.com/armandorodb">Armando Rodriguez</a>, robotics engineer at Universidad de Monterrey and my teammate
            on the course, who encouraged the project’s return in 2026.
          </p>
          <p class="credit">
            Robot CAD, URDF, and ROS 2 exercise scaffold: course material of RWTH International Academy gGmbH and IGMR, RWTH Aachen University (all
            rights reserved), reproduced with attribution for this non-commercial portfolio. Dashboard, simulator, and migration code: MIT. See the
            project’s <a href="https://github.com/alexandergmzx/Delta_ROS2/blob/main/NOTICE">NOTICE</a> for provenance and terms.
          </p>
        </div>
      </section>
</div>
