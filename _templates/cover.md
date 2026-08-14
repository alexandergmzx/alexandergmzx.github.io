---
layout: post
title: "__TITLE__"
date: __DATE__
description: __DESCRIPTION__
tags: __TAGS__
categories: music
maturity: seedling
related_posts: false
giscus_comments: true
tabs: true
---

<!-- id is the bare 11-character YouTube video id, NOT a full URL. -->

{% include youtube.liquid id="__VIDEO_ID__" title="__TITLE__" caption="" %}

{% comment %}
Self-hosted take instead of (or next to) YouTube — drop the file in assets/audio/ and uncomment:
{% include audio.liquid path="assets/audio/__FILE__.mp3" controls=true %}
{% endcomment %}

## why this one

Why this song, what tuning, what gear, what took the most takes.

## lyrics

<!-- Tab group name must be unique on the page. Quote what you need, not the whole song. -->

{% tabs lyrics %}

{% tab lyrics original %}

first line
second line
{: .poem}

{% endtab %}

{% tab lyrics translation %}

first line
second line
{: .poem}

{% endtab %}

{% endtabs %}
