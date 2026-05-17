---
layout: page
title: Furuta self-balancing pendulum
description: PID-stabilized inverted pendulum on Arduino
img: assets/img/4.jpg
importance: 4
category: academic
---

The Furuta pendulum is a rotary-arm inverted pendulum — the canonical "balance an unstable system from sensor feedback" control problem. Built August to December 2019.

I designed and implemented the full system: **Arduino-based microcontroller firmware**, **rotary encoders** for joint-position feedback, a **PWM-driven DC motor** for the actuated horizontal arm, and **PID gains** tuned to keep the upright pendulum stable against disturbance.
