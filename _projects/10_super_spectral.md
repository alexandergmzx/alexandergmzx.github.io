---
layout: page
title: Super Spectral — wrist-worn singing-voice analyzer
description: An ESP32-S3 smartwatch that analyzes the singing voice, and the browser analyzer that grew out of its research document
img: assets/img/super_spectral.png
importance: 1 # Delta robot is also 1; ordering between equals is Jekyll's file order
category: academic
github: https://github.com/alexandergmzx/superspectral
---

**Super Spectral** is a wrist-worn singing-voice spectral analyzer built on the [LilyGO T-Watch S3](https://github.com/Xinyuan-LilyGO/TTGO_TWatch_Library) — an ESP32-S3 with a single PDM MEMS microphone and a 240×240 display. The research question is narrow on purpose: can a watch on a singer's wrist estimate the fundamental frequency of a sung note to within ±20 cents, draw a spectrogram fast enough to be a mirror rather than a report, and run for three hours on its own battery — with every real-time computation happening on the device itself?

The project is being built the slow way. Before any feature firmware exists there is a proposal with a frozen research question, a bibliography of every datasheet and paper it stands on, [architecture decision records](https://github.com/alexandergmzx/superspectral/tree/main/docs/adr) for each non-trivial choice, and a validation plan in which every number has an external anchor and a stated uncertainty. Nothing is claimed that has not been measured, and unsettled values carry a `(prov.)` tag until an experiment removes it.

<div class="text-center my-3">
  <a
    class="btn btn-outline-primary"
    role="button"
    href="https://github.com/alexandergmzx/superspectral"
    target="_blank"
    rel="external nofollow noopener"
  >
    <i class="fa-brands fa-github"></i> View the code on GitHub
  </a>
  <a
    class="btn btn-outline-primary"
    role="button"
    href="{{ '/projects/10_super_spectral/live/' | relative_url }}"
  >
    <i class="fa-solid fa-wave-square"></i> Launch the live analyzer
  </a>
</div>

## The two halves

The **watch** is the live-capture and real-time-display front end: PDM capture on I2S, a fixed-point-free float FFT on core 1, a spectrogram waterfall and a time-domain pitch estimate, all on-device. A **Linux host** does the offline science on recorded takes — Praat-grade formants, long-term average spectra, alignment against a reference recording. Files are the only contract between them; there is no live link, by design, because a live link would make the laptop part of a claim that is supposed to be about the watch.

## The browser analyzer

The founding research document for this project specified a browser-native analyzer first, and that analyzer is the second half's user interface: **it runs entirely in your browser** — `getUserMedia` into an `AudioWorklet`, the transform in a Worker, the waterfall on a canvas. No audio leaves the machine, and there is no backend in the live path.

It is also an instrument in its own right. The same six analysis presets the watch uses are loaded here byte-for-byte, and the TypeScript implementation of the FFT conventions is held against the Python reference implementation on a committed set of synthetic test signals: across nineteen synthetic spectra the worst disagreement measured so far is **1.9 × 10⁻⁵ dB**, on the bins the tolerance table covers. What the browser shows and what the offline analysis computes are the same numbers, from two independent implementations.

Its latency and refresh rate are **measured, never claimed**, and they say nothing about the watch — a laptop is not a wrist.

{% include figure.liquid loading="lazy" path="assets/img/super_spectral_reference.png" class="img-fluid rounded z-depth-1" zoomable=true alt="The analyzer in Perform with a captured reference note: a readout bar reading A3, 220.13 Hz, in tune, with a needle centred on a cents meter; the pitch trace running along a hatched in-tune lane; and the cividis waterfall below with the reference marked on it" caption="Perform, with a reference note captured from the voice. The readout bar at the top stays there whatever else moves; the hatched lane through the middle of the pitch trace is the in-tune band, set here to ±10 cents. The pitch estimator is held to Praat on synthetic goldens to a median of about one cent." %}

_The analyzer is under active development. It has three displays — **Perform** for singing, **Study** for the spectrum and its harmonics, and **Tune**, one big readout with a needle and a hold — over one measurement; a file can be the source instead of the microphone, with a loop you set by ear and a stretch that turns that loop into a drone at the same pitch. Ring/twang and formant overlays follow._
