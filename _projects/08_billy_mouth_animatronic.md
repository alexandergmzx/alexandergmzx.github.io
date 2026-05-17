---
layout: page
title: "Billy Mouth — animatronic text-to-speech"
description: Self text-to-speech-to-movements system driving an animatronic
img: assets/img/8.jpg
importance: 8
category: personal
---

A weekend-scale personal project (October 2025): take arbitrary text input, synthesize the audio, then drive the mouth servos of an animatronic so the lip movements line up with the phonemes.

The chain is text → TTS → audio buffer + phoneme timing → servo commands. The interesting part is in the timing alignment and in the small kinematic model for the jaw — close enough to look right, simple enough to run on commodity hardware.

> Replace `assets/img/8.jpg` with a photo or video frame of Billy in action.
