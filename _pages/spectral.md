---
layout: page
title: spectral
permalink: /spectral/
description: A singing-voice spectral analyzer that runs in your browser, and the wrist-worn instrument it was built for.
nav: true
nav_order: 4
_styles: >
  /* The floating back-to-top button is 40 px at z-index 10, 30 px from the
     bottom-right corner of the VIEWPORT — which on this page is exactly where
     the analyzer's transport cluster and its sheet toggle sit inside a frame.
     There are two frames here, so it can land on either. Hidden on this page
     and no other; the fixed navbar is still the way back up. */
  #back-to-top { display: none; }

  /* BOTH FRAMES. The 1 px border is part of a contract, not decoration:
     this column is $max-content-width 930px, Bootstrap 4.6.2 spends 15 px of
     gutter on each side, and the border comes out of a border-box — so the
     frame's own viewport is 898 px. The analyzer's layout breakpoint is 840 px
     specifically so that clears it with 58 px of margin. Moving max_width in
     _config.yml below 872 px silently renders the phone layout on a laptop.
     (superspectral, ADR 0024 decisions 2 and 10.) */
  .ss-frame {
    display: block;
    width: 100%;
    border: 1px solid var(--global-divider-color);
    border-radius: 10px;
    background: var(--global-card-bg-color);
  }

  /* THE ANALYZER. min(88vh, 1000px) floored at 620 px, which on a border-box
     element leaves 618 px of frame viewport — the budget every pane in the
     analyzer's own stylesheet was measured against. This number is written in
     two repositories and moves only in coordinated commits, one per repository,
     each naming the other. */
  .ss-frame--analyzer {
    height: min(88vh, 1000px);
    min-height: 620px;
  }

  /* THE TUNER CARD. Same bundle, same origin, ?mode=tune, a shorter frame.
     Tune drops both canvases and collapses the glance bar to one row, so it
     does not need the analyzer's budget — but the shell CLIPS rather than
     scrolls, which means a frame a few pixels too short silently removes the
     Hold button and the damping line, the two things that make the reading
     honest. Nothing in either repository fails when that happens.

     500 px is MEASURED, not assumed. Swept in Chrome at an 898 px column, the
     eight rows of #tuner clip nothing down to 460 px and the note and the Hold
     button start clipping at 440. So 460 is the floor and 500 carries 40 px
     over it — the margin a font fallback or a longer damping string can eat
     without the reader ever seeing that something went missing.

     Do not read the slack inside the frame as headroom: the note is
     clamp(3rem, 16vh, 9rem), so the content GROWS into a taller frame and the
     gap at each end stays 11 px whatever the height. The floor is the only
     number that means anything, and it has to be swept for, not eyeballed.
     The walk is in MANUAL.md, "The Spectral tab". */
  .ss-frame--tuner { height: 500px; }

  /* Below 872 px of viewport (840 + 2×15 gutter + 2×1 border) the frame has
     dropped under the analyzer's breakpoint, the control rail becomes a row of
     its own instead of a side column, and Tune needs the full budget back. */
  @media (max-width: 871px) {
    .ss-frame--tuner {
      height: min(88vh, 1000px);
      min-height: 620px;
    }
  }
---

**[Super Spectral]({{ '/projects/10_super_spectral/' | relative_url }})** is a wrist-worn singing-voice
spectral analyzer being built on an ESP32-S3 smartwatch. This page is its other half: the browser
analyzer its founding research document specified first, which grew into an instrument in its own right.

It runs **entirely in this browser** — the microphone stream goes into an `AudioWorklet`, the transform
runs in a Worker, the spectrum is drawn on a canvas and the waterfall on a WebGL history ring. **No audio
leaves your machine** and there is no backend in the live path. Your browser will ask for microphone
permission the first time you press **Start capture**, in whichever of the two frames below you press it.

## A tuner, to start with

<iframe
  class="ss-frame ss-frame--tuner"
  src="{{ '/assets/superspectral/index.html' | relative_url }}?mode=tune"
  title="Super Spectral — tuner"
  loading="lazy"
  allow="microphone"
></iframe>

This is the whole analyzer opened in **Tune**: one note, one cents figure, one needle, because you can
only look at one thing at a time. The small line under the number is the **measured** reading — never
smoothed, never held — and the damping applied to the needle prints its own time constant beside it, so
you always know how much of what you are seeing is filtering. **Hold** freezes the reading after a phrase.

Tune is a display _mode_, not a second application: this card and the analyzer below are the same bundle,
the same capture chain and the same stored preferences. Opening this card in Tune is a fact about this
page view and is never remembered — but pressing _Perform_ or _Study_ inside it is an explicit choice,
and that one is, from the next page load onward.

## The analyzer

<p class="text-center">
  <strong><a href="{{ '/assets/superspectral/index.html' | relative_url }}">Open it full screen</a></strong> —
  on a phone, do that rather than using the frame below.
</p>

<iframe
  class="ss-frame ss-frame--analyzer"
  src="{{ '/assets/superspectral/index.html' | relative_url }}"
  title="Super Spectral — live voice analyzer"
  loading="lazy"
  allow="microphone"
></iframe>

**Three displays, one measurement.** The control is at the top of the readout bar, where nothing can hide
it. **Perform** is the singer's screen — pitch in cents against time, over the spectrogram. **Study** is
the instrument's — the spectrum with its harmonics labelled. **Tune** is the one you can look at while
singing: the canvases give way to a single readout, note over cents over a needle, because you can only
look at one thing at a time. Every mode reads the same frame from the same estimator; Tune adds a display
filter and prints its own time constant under the number, so you always know how much of what you are
seeing is smoothing.

**Capture a note, then reach it.** Hold a note for half a second and press _Capture reference_: the
analyzer keeps its pitch and its spectrum, draws the spectrum as a dotted ghost, and from then on tells
you — in words, and with a needle on a cents bar — whether the note you are singing now is _in tune_,
_flat_ or _sharp_ against it. Pitch decides; the ghost is there so you can see how close the timbre is.
Or just type the note you are aiming at. The reference stays in your browser and survives a reload —
and because both frames on this page are the same application on the same origin, a reference captured
in one is there in the other the next time it loads.

**Or practise against a recording.** Load an audio file and it becomes the source, through the same
worklet and the same Worker as the microphone — with a player bar, a loop you set with **A** and **B**
and can see drawn on the seek track, and a **stretch** slider that re-renders the loop up to 32× slower
**at the same pitch**: a held drone you can tune to and sing over. A stretched loop is labelled _derived_
everywhere it is named, because it is a resynthesis and not the recording.

The controls fold away — on a laptop the column collapses to a strip, on a phone it is a sheet you pull
up — and the readout bar at the top never moves, whatever else does.

The analyzer follows this site's light/dark setting. Latency and refresh rate here are **measured, never
claimed**, and they are properties of your browser and this machine — they say nothing about the watch,
which does its own real-time work on its own silicon.

## The instrument behind it

The six analysis presets loaded here are the same files the watch firmware loads, embedded byte-for-byte
and hashed in the browser so the digest you see can be compared against the repository. Across nineteen
synthetic spectra the worst disagreement between this TypeScript implementation and the Python reference
is **1.9 × 10⁻⁵ dB**, and the pitch estimator is held to Praat on the same goldens to a worst median of
1.03 cents.

<div class="text-center my-3">
  <a
    class="btn btn-outline-primary"
    role="button"
    href="{{ '/projects/10_super_spectral/' | relative_url }}"
  >
    <i class="fa-solid fa-microchip"></i> The watch, and how it is being built
  </a>
  <a
    class="btn btn-outline-primary"
    role="button"
    href="https://github.com/alexandergmzx/superspectral"
    target="_blank"
    rel="external nofollow noopener"
  >
    <i class="fa-brands fa-github"></i> View the code on GitHub
  </a>
</div>

_The analyzer is under active development. Ring/twang and formant overlays follow. It is
[GPL-3.0-or-later]({{ '/assets/superspectral/LICENSE.md' | relative_url }}) — this site is MIT, but the
analyzer is the user interface of a GPL program and carries that program's licence._
