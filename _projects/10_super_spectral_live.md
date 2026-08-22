---
layout: page
title: Super Spectral — live analyzer
description: The Super Spectral browser analyzer, running on this machine's microphone — nothing is uploaded.
permalink: /projects/10_super_spectral/live/
---

This is the [Super Spectral]({{ '/projects/10_super_spectral/' | relative_url }}) host analyzer, the browser half of a
[wrist-worn singing-voice analyzer](https://github.com/alexandergmzx/superspectral). It runs **entirely in this browser**:
the microphone stream goes into an `AudioWorklet`, the transform runs in a Worker, the spectrum is drawn on a canvas and the waterfall on a WebGL history ring.
**No audio leaves your machine** and there is no backend in the live path.

Your browser will ask for microphone permission when you press **Start capture**. The six analysis presets are the same
files the watch firmware loads, embedded here byte-for-byte and hashed in the browser so the digest you see can be
compared against the repository.

<iframe
  src="{{ '/assets/superspectral/index.html' | relative_url }}"
  title="Super Spectral live analyzer"
  loading="lazy"
  allow="microphone"
  style="width: 100%; height: min(88vh, 1000px); min-height: 620px; border: 1px solid var(--global-divider-color); border-radius: 10px; background: var(--global-card-bg-color);"
></iframe>

<p class="text-center mt-2">
  <a href="{{ '/assets/superspectral/index.html' | relative_url }}">Open full screen</a>
</p>

**Capture a note, then reach it.** Hold a note for half a second and press _Capture reference_: the analyzer keeps its pitch and its spectrum, draws the spectrum as a dotted ghost, and from then on tells you — in words, and with a needle on a cents bar — whether the note you are singing now is _in tune_, _flat_ or _sharp_ against it. Pitch decides; the ghost is there so you can see how close the timbre is. The reference stays in your browser and survives a reload.

The analyzer follows this site's light/dark setting. Latency and refresh rate here are **measured, never claimed**, and
they are properties of your browser and this laptop — they say nothing about the watch, which does its own real-time
work on its own silicon.
