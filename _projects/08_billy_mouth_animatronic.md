---
layout: page
title: "fish_brain: an animatronic Big Mouth Billy Bass that talks"
description: Animatronic Big Mouth Billy Bass driven from a Python host over serial to an Arduino, with text-to-speech
img: assets/img/8.jpg
importance: 8
category: personal
github: https://github.com/alexandergmzx/fish_brain
---

A personal project begun in October 2025: a Big Mouth Billy Bass that speaks. A Python host on a laptop does the thinking and the talking. It renders the text to speech, plays the audio, and streams motor commands timed to it. An Arduino UNO R4 drives the fish's motors as a mechanical slave over serial.

In its conversational mode you push to talk, the host transcribes you locally, a language model writes the reply, and the fish speaks it.

The next iteration moves onto the Arduino UNO Q, with the loudspeaker and the controls on the board and no laptop in the loop. That version is in progress.

Source: **[github.com/alexandergmzx/fish_brain](https://github.com/alexandergmzx/fish_brain)**
