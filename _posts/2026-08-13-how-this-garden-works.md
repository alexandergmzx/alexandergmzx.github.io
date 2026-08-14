---
layout: post
title: "How this garden works"
date: 2026-08-13 10:00:00-0600
description: Why this section is a garden instead of a blog, what the beds and the badges mean, and how the notes here are meant to be read.
tags: meta gardening
categories: misc
maturity: evergreen
related_posts: false
giscus_comments: true
toc:
  beginning: true
---

A blog is a stream. You publish a post, it scrolls away, and the version you shipped on a Tuesday is the version that stands forever. That works for announcements. It works badly for the things I actually want to keep here: a poem that is not finished, a grammar pattern I half understand, an argument I am still losing to myself.

So this is a garden instead. Notes get planted small and are tended when I have something to add. Nothing here claims to be finished, and the ones that are finished say so.

## The beds

Every note grows in exactly one bed, and the strip at the top of the garden switches between them.

**tech** is the engineering work — embedded systems, robotics, the things that cost me an afternoon and should not cost me another one. **poetry** is verse. **music** is songs I have covered. **language** is what I am learning in Spanish, English, German, and whatever comes next. **philosophy** is the longer arguments. **misc** is everything that refuses to sit in the other five, including this note.

Tags cut across the beds. A note about the rhythm of a German poem is tagged `german` whether it grew in the language bed or the poetry one, and the tag page collects both.

## The badges

Next to a note's title there is a small badge saying how grown it is. It is the most useful thing on the page, because it tells you how much to trust what you are reading.

A **seedling** was just planted. It is rough, probably incomplete, and quite likely wrong in places — I put it up because writing it down badly beats not writing it down. A **budding** note has been back a few times; the idea holds, the edges do not. An **evergreen** note has been tended often enough that I am willing to stand behind it. This one is evergreen.

Notes move between stages in one direction, slowly, and a seedling that never becomes anything is allowed to stay a seedling.

## Planted and tended

Dates here work differently than on a blog. **Planted** is when a note first went up. **Last tended** is the last time I touched it and thought it was better afterwards. A note from two years ago that was tended last week is more current than one planted last month and abandoned — the dates are there so you can tell which is which.

## How verse is set

Poems keep their line breaks exactly as typed, which sounds obvious and is not. Markdown collapses a single newline into a space, so a stanza pasted into an ordinary paragraph comes out as one long run-on line — which is why so many sites resort to trailing double-spaces or raw `<br>` tags to hold verse together.

The apparition of these faces in the crowd;
Petals on a wet, black bough.
{: .poem}

<div style="text-align: right; margin-top: -1rem; font-size: 0.85rem; opacity: 0.7">— Ezra Pound, <em>In a Station of the Metro</em> (1913)</div>

The stanza above is marked with `{: .poem}` on the line immediately after it. That one marker gives it the serif face, the roomier leading, the stem down the left, and the preserved line breaks. Ordinary prose needs nothing and behaves normally.

## The rest of the machinery

Song covers embed from YouTube through a small include that takes the bare video id, sizes the player from CSS so it fills the column at the right shape, and loads it from the no-cookie domain so nothing is set on you until you press play.

Comments are on, behind a button. Nothing is requested from a third party — no frame, no script, no cookie — until you ask for the thread. If you never click, the page never talks to anyone but this site.

Animated GIFs are served as they are rather than through the image pipeline that generates responsive WebP for the photographs, because resizing an animated GIF without coalescing its frames first is a reliable way to turn it into a still.

## Where to start

If you came for the engineering, the [tech bed](/garden/category/tech/) is the one you want. If you came for something else, the strip at the top of [the garden](/garden/) is the whole map.

Nothing here is finished. That is the point.
