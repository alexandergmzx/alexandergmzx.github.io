---
layout: page
title: Super Spectral — live analyzer
description: The Super Spectral browser analyzer, running on this machine's microphone — nothing is uploaded.
permalink: /projects/10_super_spectral/live/
_styles: >
  /* The floating back-to-top button is 40 px at z-index 10, 30 px from the
     bottom-right corner — which on this page is exactly where the analyzer's
     own controls sit inside the frame. It is hidden here and nowhere else. */
  #back-to-top { display: none; }
---

This is the [Super Spectral]({{ '/projects/10_super_spectral/' | relative_url }}) host analyzer, the browser half of a
[wrist-worn singing-voice analyzer](https://github.com/alexandergmzx/superspectral). It runs **entirely in this browser**:
the microphone stream goes into an `AudioWorklet`, the transform runs in a Worker, the spectrum is drawn on a canvas and the waterfall on a WebGL history ring.
**No audio leaves your machine** and there is no backend in the live path.

Your browser will ask for microphone permission when you press **Start capture**. The six analysis presets are the same
files the watch firmware loads, embedded here byte-for-byte and hashed in the browser so the digest you see can be
compared against the repository.

<p class="text-center">
  <strong><a href="{{ '/assets/superspectral/index.html' | relative_url }}">Open it full screen</a></strong> —
  on a phone, do that rather than using the frame below.
</p>

<iframe
  src="{{ '/assets/superspectral/index.html' | relative_url }}"
  title="Super Spectral — live voice analyzer"
  loading="lazy"
  allow="microphone"
  style="width: 100%; height: min(88vh, 1000px); min-height: 620px; border: 1px solid var(--global-divider-color); border-radius: 10px; background: var(--global-card-bg-color);"
></iframe>

**Three displays, one measurement.** The control is at the top of the readout bar, where nothing can hide it.
**Perform** is the singer's screen — pitch in cents against time, over the spectrogram. **Study** is the instrument's —
the spectrum with its harmonics labelled. **Tune** is the one you can look at while singing: the canvases give way to a
single readout, note over cents over a needle, because you can only look at one thing at a time. Every mode reads the
same frame from the same estimator; Tune adds a display filter and prints its own time constant under the number, so you
always know how much of what you are seeing is smoothing.

**Capture a note, then reach it.** Hold a note for half a second and press _Capture reference_: the analyzer keeps its
pitch and its spectrum, draws the spectrum as a dotted ghost, and from then on tells you — in words, and with a needle on
a cents bar — whether the note you are singing now is _in tune_, _flat_ or _sharp_ against it. Pitch decides; the ghost is
there so you can see how close the timbre is. Or just type the note you are aiming at. The reference stays in your
browser and survives a reload.

**Or practise against a recording.** Load an audio file and it becomes the source, through the same worklet and the same
Worker as the microphone — with a player bar, a loop you set with **A** and **B** and can see drawn on the seek track,
and a **stretch** slider that re-renders the loop up to 32× slower **at the same pitch**: a held drone you can tune to
and sing over. A stretched loop is labelled _derived_ everywhere it is named, because it is a resynthesis and not the
recording.

The controls fold away — on a laptop the column collapses to a strip, on a phone it is a sheet you pull up — and the
readout bar at the top never moves, whatever else does.

The analyzer follows this site's light/dark setting. Latency and refresh rate here are **measured, never claimed**, and
they are properties of your browser and this laptop — they say nothing about the watch, which does its own real-time
work on its own silicon.
