---
layout: page
title: Bare-metal STM32 driver development
description: Register-level GPIO, UART, and display drivers — no HAL
img: assets/img/7.jpg
importance: 7
category: personal
---

A teaching-by-doing personal project (June 2020): write the firmware drivers for an STM32 microcontroller **from scratch, without HAL libraries**, going straight from the reference manual to the registers.

Drivers built: **GPIO**, **UART**, and a **serial display**. The point was to demonstrate the layers underneath the convenience APIs — clock trees, register banks, peripheral state machines — and to keep the kind of bare-metal fluency that lets you debug at the bus level when something goes wrong.

Source: **[github.com/alexandergmzx/handmade_drivers_on_baremetal](https://github.com/alexandergmzx/handmade_drivers_on_baremetal)**
