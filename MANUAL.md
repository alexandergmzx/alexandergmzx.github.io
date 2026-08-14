# al-folio Editing Manual — Alexander Gomez

A practical reference for editing this personal portfolio without needing to ask
an LLM for every change. Every section starts with the **file you edit**, then a
**copy-paste snippet** of the actual pattern, then notes on what each piece does.

## Index

- [0. Quick reference — file map](#0-quick-reference--file-map)
- [1. Local development & deploy workflow](#1-local-development--deploy-workflow)
- [2. Site identity (title, name, favicon, logo)](#2-site-identity-title-name-favicon-logo)
- [3. About page (homepage)](#3-about-page-homepage)
- [4. Navigation menu](#4-navigation-menu)
- [5. Projects](#5-projects)
- [6. The garden (notes)](#6-the-garden-notes)
- [7. News (short milestones)](#7-news-short-milestones)
- [8. CV (rendercv format)](#8-cv-rendercv-format)
- [9. Bookshelf](#9-bookshelf)
- [10. Teaching page](#10-teaching-page)
- [11. Vision & Venture page](#11-vision--venture-page)
- [12. Theme color (embedded green)](#12-theme-color-embedded-green)
- [13. Typography and layout (text size, fonts, spacing)](#13-typography-and-layout-text-size-fonts-spacing)
- [14. Social links](#14-social-links)
- [15. Repositories page](#15-repositories-page)
- [16. The `new_page.py` helper](#16-the-new_pagepy-helper)
- [17. Code formatting (Prettier)](#17-code-formatting-prettier)
- [18. Common gotchas](#18-common-gotchas)
- [19. When something breaks the build](#19-when-something-breaks-the-build)

---

## 0. Quick reference — file map

| You want to change...                  | File                                                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Site title in browser tab / meta tags  | [`_config.yml`](_config.yml) — `title:`                                                                   |
| Your name, favicon, logo               | [`_config.yml`](_config.yml) — `first_name:`, `last_name:`, `icon:`, `navbar_logo:`                       |
| Homepage bio text                      | [`_pages/about.md`](_pages/about.md) — body below front matter                                            |
| Homepage sidebar info (location etc.)  | [`_pages/about.md`](_pages/about.md) — `profile.more_info`                                                |
| Profile photo                          | `assets/img/alex_madera.png` (replace file); path in [`_pages/about.md`](_pages/about.md) `profile.image` |
| Navbar items (order, show/hide)        | front matter of each `_pages/*.md` — `nav:` and `nav_order:`                                              |
| Hardcoded "about" link in navbar       | [`_config.yml`](_config.yml) — `navbar_about:` (true/false)                                               |
| The "more" dropdown contents           | [`_pages/dropdown.md`](_pages/dropdown.md)                                                                |
| Add a new project                      | new file in [`_projects/`](_projects/)                                                                    |
| Project categories                     | [`_pages/projects.md`](_pages/projects.md) — `display_categories:`                                        |
| Add a garden note                      | new file in [`_posts/`](_posts/) — `YYYY-MM-DD-slug.md`, scaffolded from [`_templates/`](_templates/)     |
| Garden categories (the six beds)       | [`_config.yml`](_config.yml) — `display_categories:`                                                      |
| Add a news item                        | new file in [`_news/`](_news/)                                                                            |
| CV content                             | [`_data/cv.yml`](_data/cv.yml)                                                                            |
| Downloadable CV PDF                    | replace `assets/pdf/alexander_gomez_cv.pdf`                                                               |
| Social icons (email, github, linkedin) | [`_data/socials.yml`](_data/socials.yml)                                                                  |
| GitHub repo stats on `/repositories`   | [`_data/repositories.yml`](_data/repositories.yml)                                                        |
| Theme color (accent green)             | [`_sass/_variables.scss`](_sass/_variables.scss) and [`_sass/_themes.scss`](_sass/_themes.scss)           |
| Footer text                            | [`_config.yml`](_config.yml) — `footer_text:`                                                             |

---

## 1. Local development & deploy workflow

### Start the dev server

```bash
bundle exec jekyll serve --host 0.0.0.0 --port 8080 --livereload
```

Open `http://localhost:8080`. The `--livereload` flag rebuilds on file save.

### Format before committing

Prettier runs in CI on every push and will fail the build if anything is mis-formatted.
Run this before `git commit`:

```bash
npx prettier . --write
```

### Push to deploy

```bash
git add <files>
git commit -m "Short imperative description"
git push origin main
```

The `Deploy site` GitHub Action runs automatically, builds the site with
`JEKYLL_ENV=production`, and force-pushes the result to the `gh-pages` branch.
GitHub Pages serves from `gh-pages`. Total time: ~2 minutes after `git push`.

### Watching deploy status

`https://github.com/alexandergmzx/alexandergmzx.github.io/actions` — the
**Deploy site** workflow is the one that matters. **Prettier** running and
**Lighthouse** failures don't block the site itself, only signal hygiene issues.

---

## 2. Site identity (title, name, favicon, logo)

### File: [`_config.yml`](_config.yml) (top of file)

```yaml
title: Alexander Gomez # browser tab title and meta tags
first_name: Jesus Alexander # used in citations / scholar matching
middle_name:
last_name: Gomez Gomez # used in citations / scholar matching
navbar_logo: alx-gomez-logo.png # PNG/SVG in assets/img/ — shows instead of name in navbar
icon: favicon_alx.png # PNG/SVG in assets/img/ — browser favicon
```

### Replacing the logo

1. Drop the new image into [`assets/img/`](assets/img/) (e.g., `alx-gomez-logo-v2.png`).
2. Update `navbar_logo:` in [`_config.yml`](_config.yml).
3. Adjust the height in [`_includes/header.liquid`](_includes/header.liquid) (search for `height="36"`)
   if the new image needs a different size. 28-40px is the sane range for a navbar.

### Replacing the favicon

Same pattern: drop in `assets/img/`, update `icon:` in `_config.yml`. SVG and PNG both work.

### Hiding the logo and showing text instead

Delete (or comment out) the `navbar_logo:` line in `_config.yml`. The navbar will
fall back to the `title:` text. To show your full name instead of the title, set
`title: blank` — al-folio then composes `first_name + middle_name + last_name`.

---

## 3. About page (homepage)

### File: [`_pages/about.md`](_pages/about.md)

```yaml
---
layout: about
title: about
permalink: /
subtitle: Embedded Systems Engineer · Robotics · Software Developer

profile:
  align: right
  image: alex_madera.png # file in assets/img/
  image_circular: false # true to crop into a circle
  more_info: >
    <p>Mexico City metro area</p>
    <p>Some other line</p>      # add as many <p>...</p> lines as you want

selected_papers: false # toggle: shows the selected={true} bib entries
social: true # toggle: shows the social icons row

announcements: # the news strip
  enabled: true
  scrollable: true # scrolls if more than 3 items
  limit: 5 # max items to render

latest_posts: # latest garden notes strip
  enabled: true
  scrollable: true
  limit: 3
---
Your bio paragraphs go here as plain markdown.
**Bold**, *italic*, [links](https://example.com), tables, lists, blockquotes — all work.
```

### Common edits

- **Change the sidebar location/info:** edit `profile.more_info`. Each `<p>` is a line.
- **Hide the news strip on home:** `announcements: enabled: false`
- **Hide the latest notes strip:** `latest_posts: enabled: false`
- **Hide the social icons:** `social: false`
- **New profile photo:** drop the new image in `assets/img/`, change `profile.image:`

### Bio writing tips

The body is rendered between the news/posts blocks. Keep it tight — the page is
primarily a launch pad to projects, CV, garden. Use markdown links to direct
visitors to where they should go next.

---

## 4. Navigation menu

### Current navbar order

1. **Projects** (`_pages/projects.md`, `nav_order: 1`)
2. **Teaching** (`_pages/teaching.md`, `nav_order: 2`)
3. **Garden** (`_pages/garden.md`, `nav_order: 3`) — the digital garden at `/garden/`
4. **Bookshelf** (`_pages/books.md`, `nav_order: 4`)
5. **Vision & Venture** (`_pages/vision.md`, `nav_order: 5`)
6. **more ▾** (`_pages/dropdown.md`, `nav_order: 6`) — contains CV, Repositories

### Show or hide a page in the navbar

Edit the page's front matter:

```yaml
nav: true # appears
nav: false # hidden (page is still reachable by direct URL)
nav_order: 3 # position from left (lower number = further left)
```

### The "About" link

al-folio hardcodes an "about" entry in the navbar. It's gated by a config flag:

```yaml
# _config.yml
navbar_about: false # true to show, false to hide
```

The site logo (top-left of every page) already links back to the homepage, so
there's no functional need for the "about" link.

### Editing the "more" dropdown

File: [`_pages/dropdown.md`](_pages/dropdown.md)

```yaml
---
layout: page
title: more # dropdown label in navbar
nav: true
nav_order: 6
dropdown: true # marks this as a dropdown, not a regular link
children:
  - title: CV
    permalink: /cv/
  - title: divider # adds a horizontal divider line
  - title: repositories
    permalink: /repositories/
  - title: External link
    permalink: https://example.com # full URL works too
---
```

### Adding a new top-level page

1. Create `_pages/newthing.md`:

   ```yaml
   ---
   layout: page
   title: new thing
   permalink: /newthing/
   description: One-line description for the page header.
   nav: true
   nav_order: 7
   ---
   Body content as markdown.
   ```

2. The page is now linked in the navbar at position 7.

Or use the helper: `python3 _scripts/new_page.py` → pick `6) page`.

---

## 5. Projects

### Adding a project

Easiest: `python3 _scripts/new_page.py` → pick `1) project`. It prompts for
everything and writes the file. See [section 16](#16-the-new_pagepy-helper).

Manual: create a new file in [`_projects/`](_projects/), name like
`NN_short-slug.md` where `NN` is the importance (zero-padded):

```yaml
---
layout: page
title: "Project name"
description: 1-line description that shows on the project card
img: assets/img/projects/myimage.jpg # drop the image in assets/img/ and link it
importance: 3 # lower number = appears earlier in the grid
category: academic # academic | professional | personal
---
Free-form markdown body. Show diagrams, code snippets, video embeds, etc.
```

### Project image conventions

- Drop images in [`assets/img/`](assets/img/).
- Reference them as `img: assets/img/filename.jpg` (no leading slash).
- Aim for ~1200×800 — al-folio auto-generates 480/800/1400 webp variants on build.
- If `img:` is omitted, the project card shows a placeholder.

### Categories and ordering

The Projects page is split into category sections in this order:

```yaml
# _pages/projects.md (front matter)
display_categories: [academic, professional, personal]
```

To add a new category, add the string to that list AND tag at least one project
with that category. To remove a category, drop it from the list (any project
files still using that category will be hidden until re-tagged or moved).

Within each category, projects sort by `importance:` ascending.

### Hiding a project temporarily

Either delete the file, OR move it to a different folder, OR set `category:`
to something not in `display_categories`. Easiest non-destructive: change
category to `draft` (not in the list, so it's filtered out).

---

## 6. The garden (notes)

The blog is a **digital garden**, served at [`/garden/`](_pages/garden.md). Notes
get _planted_, then _tended_ — a note is never "done". Each one carries a maturity
stage and can carry a last-tended date, and the expectation is that you go back and
edit it in place instead of publishing a correction.

Files still live in [`_posts/`](_posts/) as `YYYY-MM-DD-slug.md`. Note URLs are
`/garden/:year/:title/`.

### What belongs in the garden

Anything you would want to come back to: tech notes, poems, song covers, language
notes, essays, stray thoughts.

What does **not**: short dated announcements. Those are
[news](#7-news-short-milestones) — `_news/` is a separate collection that feeds the
homepage strip and is not part of the garden. Rule of thumb: if it is an
announcement that will never need tending, it's news; if you'd want to expand it in
six months, it's a note.

### Planting a note

Helper: `python3 _scripts/new_page.py` → `2) garden note` → pick a type. It asks for
title, description, note type and tags, then writes a pre-filled file into `_posts/`.
See [section 16](#16-the-new_pagepy-helper).

Manual: copy a file out of [`_templates/`](_templates/) to
`_posts/YYYY-MM-DD-slug.md` and replace the `__TITLE__`, `__DATE__`,
`__DESCRIPTION__` and `__TAGS__` placeholders. `_templates/` is invisible to Jekyll
(underscore-prefixed, not a collection, not in `include:`), so nothing you park
there can accidentally publish.

| Template                 | Category     | Comes with                                 |
| ------------------------ | ------------ | ------------------------------------------ |
| `_templates/poem.md`     | `poetry`     | two stanzas with `{: .poem}`               |
| `_templates/cover.md`    | `music`      | YouTube embed + original/translation tabs  |
| `_templates/language.md` | `language`   | toc, examples table, parallel-text tabs    |
| `_templates/essay.md`    | `philosophy` | toc + skeleton headings                    |
| `_templates/tech.md`     | `tech`       | toc + context / what I did / gotcha / refs |
| `_templates/thought.md`  | `misc`       | nothing — one to three paragraphs          |

### Front matter

```yaml
---
layout: post
title: "Note title"
date: 2026-05-17 # planted
last_modified_at: 2026-07-02 # last tended — add when you edit
description: 1-line summary for the card and SEO
tags: soldering stm32 # space-separated, free-form, 1-4
categories: tech # EXACTLY ONE, from the six
maturity: seedling # seedling | budding | evergreen
related_posts: false
giscus_comments: true
---
```

### Taxonomy: one category, a few tags

The **category** is which bed the note grows in. Exactly one per note, from this
closed set:

`tech` · `poetry` · `music` · `language` · `philosophy` · `misc`

The list lives in `display_categories:` in [`_config.yml`](_config.yml). Giving a
note two categories files it under a nested archive URL nobody links to — one,
always.

**Tags** are free-form: lowercase, single words, 1-4 per note, space-separated.
They're the fine-grained axis; the category is the coarse one. For language notes
the convention is **first tag = the language** (`tags: japanese particles`).

Renaming a category later does **not** break note URLs — the permalink is
`/garden/:year/:title/` and contains no category. It only breaks links to the
`/garden/category/<old-name>/` archive.

### Chips vs. archive pages (this used to be documented wrong)

Two different things, easy to conflate:

- **Archive pages are automatic.** `jekyll-archives` generates
  `/garden/category/<name>/` and `/garden/tag/<name>/` for every value actually used
  by at least one note. Nothing to configure.
- **Filter chips at the top of `/garden/` are not.** They render only for values
  explicitly listed in `display_categories:` / `display_tags:` in `_config.yml`.

The six categories are listed in `display_categories:`, so they all get chips.
`display_tags:` is deliberately **empty** — no tag chip row until a tag vocabulary
settles. Tag archives still exist and are still linked from each note; they're just
not advertised on the index yet. To start advertising tags, add the settled ones to
`display_tags:`.

### The beds and their artwork

Each bed can have its own backdrop photograph. Drop images into
[`assets/img/garden/`](assets/img/garden/) named after the bed — `tech.jpg`,
`poetry.jpg`, and so on — plus `garden.jpg`, which is the default used by `/garden/`
itself, the tag and year archives, and any bed with no image of its own.

Nothing breaks if an image is missing: a bed with no picture falls back to
`garden.jpg`, and if that is absent too the page renders on the plain background
rather than a broken image. So adding `garden.jpg` alone is enough to dress the whole
garden.

Icons, taglines and image paths live in [`_data/garden.yml`](_data/garden.yml) — that
is also where to point a bed at a `.png`, or reword the line under a bed's title. The
bed list itself is still `display_categories:` in `_config.yml`; `_data/garden.yml`
only decorates it.

Keep backdrops around 2000px on the long edge. They are full-bleed, so a photo
straight off a phone is several megabytes every visitor pays for. Note images belong
in `assets/img/notes/`, not here.

### Maturity and tending

| Stage       | Means                                           |
| ----------- | ----------------------------------------------- |
| `seedling`  | just planted; rough, incomplete, possibly wrong |
| `budding`   | been back at least once; it has a shape         |
| `evergreen` | settled; further edits are upkeep, not rewrites |

The tending workflow:

1. Plant everything as `seedling` — every template defaults to it.
2. When you revisit and materially change a note: edit the body, bump `maturity:`
   if it earned the bump, and set `last_modified_at: YYYY-MM-DD`.
3. Don't write a second note to correct an old one. Edit the old one. That's the
   entire point of the garden.

`last_modified_at:` is optional — without it a note shows only its planted date.

### Body conventions

**Prose wraps however you like.** Markdown reflows paragraphs, so whether you keep
a paragraph on one long line or wrap it at eighty columns makes no difference to the
output. (Prettier's `proseWrap` is left at `preserve`, so it won't rewrap anything
for you either way.)

**Verse needs `{: .poem}`.** This is the one place the rule above does not hold, and
forgetting it is the easiest mistake to make here: without the class, Markdown runs
every line of a stanza together into one paragraph. Type the lines exactly as they
should break, then put `{: .poem}` on the line immediately after the stanza — no
blank line between:

```markdown
line one
line two
{: .poem}
```

The class gives serif type, roomier line-height, a stem down the left, and — the part
that actually matters — `white-space: pre-line`, which is what holds the line breaks.
It works on any block, not just poems: lyrics quoted inside a cover note use it too.

(For the curious: Jekyll pins kramdown's `hard_wrap` to false even though this site
feeds it GFM input, so a single newline collapses to a space. Fixing that globally
would turn every wrapped line on the site into a visible break, so verse is handled
in CSS instead.)

**YouTube:**

```liquid
{% include youtube.liquid id="VIDEO_ID" title="Accessible title" caption="Optional caption" %}
```

`id` is the bare 11-character video id (`?v=` value), **not** a URL. `title` and
`caption` are optional.

**Self-hosted audio:**

```liquid
{% include audio.liquid path="assets/audio/take-3.mp3" controls=true %}
```

**Images:**

```liquid
{% include figure.liquid path="assets/img/notes/photo.jpg" class="img-fluid rounded z-depth-1" zoomable=true caption="Caption." %}
```

**GIFs** need care: the imagemagick→webp pipeline is configured to skip `.gif`, but
keep them out of the responsive resizer anyway. Use plain markdown
`![alt](/assets/img/notes/thing.gif)`, or `avoid_scaling=true` when you want a
caption:

```liquid
{% include figure.liquid path="assets/img/notes/thing.gif" avoid_scaling=true caption="Caption." %}
```

Anything longer than ~2 seconds should be an MP4 instead — smaller, and it can loop
silently:

```liquid
{% include video.liquid path="assets/video/clip.mp4" loop=true muted=true autoplay=true %}
```

**Tabs** (original vs. translation, parallel text, two ways of doing the same
thing). Requires `tabs: true` in the front matter or the JS never loads and you get
a stack of unstyled divs:

```liquid
{% tabs lyrics %}
{% tab lyrics original %}
...
{% endtab %}
{% tab lyrics english %}
...
{% endtab %}
{% endtabs %}
```

The group name (`lyrics` here) must be unique within the page.

**Table of contents** for anything long — essays, language notes, tech write-ups:

```yaml
toc:
  beginning: true
```

### Code blocks with syntax highlighting

````markdown
```cpp
int main() {
  return 0;
}
```
````

Supported languages: most things via Rouge highlighter — `bash`, `c`, `cpp`,
`python`, `yaml`, `liquid`, `html`, `scss`, etc.

### Optional front-matter switches

| Key                                 | Effect                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| `featured: true`                    | pins the note as a card at the top of `/garden/`. Needs a `description:` too. |
| `thumbnail: assets/img/notes/x.jpg` | image on the note's card in the listing                                       |
| `giscus_comments: true`             | adds the "show comments" button (see below — inert until configured)          |
| `related_posts: false`              | hides the auto related-notes strip at the bottom of the note                  |
| `_styles: >`                        | a block of CSS scoped to that one note                                        |

```yaml
_styles: >
  .my-thing { color: var(--global-theme-color); }
```

### Publishing checklist

1. Scaffold: `python3 _scripts/new_page.py` → `2) garden note` → type.
2. Write it. One long line per paragraph.
3. `npx prettier . --write`
4. `docker compose up` → `http://localhost:8080`
5. Check **the note and `/garden/`, in light AND dark mode** (theme toggle in the
   navbar): category chip, maturity badge, images, embeds, tabs if used.
6. `git add` → `git commit` → `git push origin main`. The **Deploy site** Action
   publishes in ~2 minutes.

### Not enabled yet

- **Comments (giscus) — one step left.** Discussions is enabled on the repo, and
  `repo`, `repo_id`, `category` and `category_id` are already filled in under
  `giscus:` in [`_config.yml`](_config.yml). The only thing missing is the **giscus
  GitHub App**, which has to be installed from a browser because it needs a GitHub
  sign-in: go to <https://github.com/apps/giscus>, press **Install**, choose **Only
  select repositories**, pick `alexandergmzx.github.io`, and confirm. Comments start
  working the moment that finishes — no rebuild, no config change. Until then the
  "show comments" button renders but the thread fails to load.

  Threads are filed under the **Announcements** discussion category. That is giscus's
  recommended choice: only maintainers can open threads there, so visitors cannot
  post into your Discussions directly — the app opens a thread the first time
  somebody comments on a note. Renaming that category in the GitHub UI is safe;
  `category_id:` is what actually binds, not the name.

  Threads are matched to notes by **title** (`mapping: title`, `strict: 1`), so
  renaming a note's `title:` orphans its existing comment thread.

- **Backlinks / wiki-style `[[links]]` between notes.** Deliberately not built. Link
  notes to each other with ordinary markdown links.
- **Semantic related notes.** `lsi: false` in `_config.yml`. The related-notes strip
  is date/category based, not meaning based; turning `lsi` on pulls in classifier
  gems and slows every build for little gain at this size.
- **Scheduled publishing.** The workflow exists but is disabled, parked as
  [`.github/workflows/schedule-posts.txt`](.github/workflows/schedule-posts.txt). To
  enable: rename it to `.yml` and create a `_scheduled/` directory. Files named
  `_scheduled/YYYY-MM-DD-slug.md` get moved into `_posts/` on that date and pushed.
  **Caveat before you enable it:** that push uses the default `GITHUB_TOKEN`, and
  pushes made with `GITHUB_TOKEN` do **not** trigger other workflows — so **Deploy
  site** won't fire and the note will sit on `main` unpublished until your next
  manual push. Either give the workflow a personal access token or just publish by
  hand.

---

## 7. News (short milestones)

### File: [`_news/YYYY-MM-DD-slug.md`](_news/)

```yaml
---
layout: post
title: "Short milestone title"
date: 2026-05-17
---
Body is optional. 3-5 lines max.
```

News items appear on the homepage in the announcements strip. They're for short,
dated personal updates: _"Accepted to X masters program"_, _"Released v1.0 of Y"_,
_"Speaking at Z conference"_.

If a news item needs more than ~3 lines or argues a point, make it a garden note
([section 6](#6-the-garden-notes)) and add a news item that links to the note.

News is **not** part of the garden: no category, no tags, no maturity, no comments.
It's the announcement wire; the garden is the thing being announced.

---

## 8. CV (rendercv format)

### File: [`_data/cv.yml`](_data/cv.yml)

The CV page at `/cv/` is generated from this YAML using the **rendercv** format.
Edit the structure in place — the layout reflows automatically.

```yaml
cv:
  name: Jesus Alexander Gomez Gomez
  label: Embedded Systems Engineer
  location: Mexico City metro area
  summary: One paragraph elevator pitch.

  social_networks:
    - network: GitHub
      username: alexandergmzx
    - network: LinkedIn
      username: alexandergmzx

  sections:
    Education:
      - institution: University name
        location: City, Country
        url: https://example.com
        area: Field of study
        studyType: Bachelor of Engineering
        start_date: 2014-08
        end_date: 2019-12
        highlights:
          - Bullet point 1
          - Bullet point 2

    Experience:
      - company: Company name
        position: Job title
        location: City, Country
        start_date: 2022-01
        end_date: 2024-07
        summary: One-line role summary.
        highlights:
          - Achievement bullet
          - Another achievement

    Skills:
      - name: Embedded Systems
        keywords: "RTOS development, embedded Linux, real-time systems"

    # ... Certifications, Languages, Interests
```

### Adding a section

Add a new top-level key under `sections:`. The CV layout renders each section
generically — no template changes required.

### Replacing the downloadable PDF

Drop the new PDF at `assets/pdf/alexander_gomez_cv.pdf` (overwriting the existing
file). The download link on the CV page (`cv_pdf:` in `_data/socials.yml`)
points there.

### Switching CV format

The format used is set in [`_pages/cv.md`](_pages/cv.md):

```yaml
cv_format: rendercv # or 'jsonresume'
```

`rendercv` reads from `_data/cv.yml`. `jsonresume` reads from
`assets/json/resume.json`. Don't switch unless you want to rewrite the data file.

---

## 9. Bookshelf

### File: `_books/slug.md` (one file per book)

```yaml
---
layout: book-review
title: "The Book Title"
author: Author Name
publisher: Publisher
year: 2023
rating: 8/10
img: /assets/img/book_covers/cover.jpg
---
Optional review body in markdown.
```

Drop cover images in `assets/img/book_covers/`.

Helper: `python3 _scripts/new_page.py` → pick `4) book`.

---

## 10. Teaching page

### File: [`_pages/teaching.md`](_pages/teaching.md)

Currently a stub. To populate it:

```markdown
---
layout: page
permalink: /teaching/
title: teaching
description: Workshops, mentoring, and course materials.
nav: true
nav_order: 2
---

Body content.

{% include courses.liquid %} <!-- pulls from _teachings/ collection -->
```

Add courses as files in `_teachings/`:

```yaml
---
layout: page
title: "Course name"
description: Short description
---
Course body.
```

---

## 11. Vision & Venture page

### File: [`_pages/vision.md`](_pages/vision.md)

Standard `page` layout. Edit body directly. Currently contains:

- A Vision section
- A Maker journey markdown table
- A Values one-liner

Adding new sections: just add markdown `## headers` and content. The page uses
the same `layout: page` as everything else.

---

## 12. Theme color (embedded green)

### Primary file: [`_sass/_variables.scss`](_sass/_variables.scss)

```scss
$purple-color: #2c7d3e !default; // misleading name kept from al-folio; this is the site accent
$purple-color-light: #... !default;
$purple-color-dark: #... !default;
$green-color-bright: #... !default; // dark-mode accent
```

al-folio uses `$purple-color` (yes, the variable name is misleading) as the
**light-mode** accent throughout. Change the hex to change the accent color.

### Dark-mode accent: [`_sass/_themes.scss`](_sass/_themes.scss)

```scss
html[data-theme="dark"] {
  --global-theme-color: #{v.$green-color-bright};
  --global-hover-color: #{v.$green-color-bright};
}
```

If you swap `$purple-color`, also update the dark-mode `--global-theme-color`
to the corresponding bright variant (or pick a new color and update `$green-color-bright`).

### Color naming convention

Al-folio defines color **palettes** (purple, green, red, etc.) in
`_variables.scss`, then references them in `_themes.scss` via CSS variables.
You can either change a palette's hex codes or swap which palette `_themes.scss`
references.

---

## 13. Typography and layout (text size, fonts, spacing)

### Font size base

[`_sass/_typography.scss`](_sass/_typography.scss) sets the global base. All other
sizes scale from `body { font-size: ...; }`. Change it once, the whole site adjusts.

### Headings

Same file — `h1`, `h2`, `h3` rules. Or override per-page via a `<style>` block
in the page's markdown body if you only want it on one page.

### Page width

[`_sass/_layout.scss`](_sass/_layout.scss) — the `.container` max-width controls
content width. Default is Bootstrap's standard.

### Line spacing / paragraph margins

[`_sass/_typography.scss`](_sass/_typography.scss) — `line-height`, `p` margin rules.

### Custom CSS for a single page

Add at the bottom of the page's markdown (after the front matter and content):

```html
<style>
  .my-custom-class {
    color: red;
  }
</style>
```

Wrap the relevant markdown in raw HTML if you need the class:
`<div class="my-custom-class">…</div>`.

### Changing fonts

Fonts are loaded in [`_includes/scripts.liquid`](_includes/scripts.liquid) — search
for `fonts.googleapis.com`. Swap the Google Fonts URL, then update the
`font-family` rules in `_sass/_typography.scss`.

---

## 14. Social links

### File: [`_data/socials.yml`](_data/socials.yml)

```yaml
cv_pdf: /assets/pdf/alexander_gomez_cv.pdf # CV download link
github_username: alexandergmzx # GitHub icon → github.com/alexandergmzx
linkedin_username: alexandergmzx # LinkedIn icon → linkedin.com/in/alexandergmzx
rss_icon: true # comment out to hide the RSS icon
# email: yourname@example.com                  # commented out for privacy
```

Each line maps to a social icon. Add lines from the
[jekyll-socials supported list](https://github.com/george-gca/jekyll-socials)
(twitter_username, mastodon_username, etc.) to enable more icons.

To hide an icon: comment out or delete its line.

The icons render in the order they appear in the file — reorder lines to
reorder icons.

---

## 15. Repositories page

### File: [`_data/repositories.yml`](_data/repositories.yml)

```yaml
github_users:
  - alexandergmzx # shows your GitHub profile card

repo_description_lines_max: 2

github_repos: # optional: pin specific repos
  - alexandergmzx/handmade_drivers_on_baremetal
  - alexandergmzx/some-other-project
```

The page fetches GitHub data at build time. Add a repo by adding its
`owner/name` string under `github_repos:`.

---

## 16. The `new_page.py` helper

### Usage

```bash
python3 _scripts/new_page.py
```

Pick a number:

1. project → `_projects/`
2. garden note → `_posts/`
3. news → `_news/`
4. book → `_books/`
5. teaching → `_teachings/`
6. page → `_pages/`

Answer the prompts. The script generates a file with correct front matter,
slugifies the title for the filename, and prints the resulting path. The body
contains `<!-- TODO: write content here -->` so you can grep for un-finished pages.

If a file with the same name already exists, the script asks before overwriting.

### The garden note sub-menu

Option `2` asks for title and description, then which kind of note it is:

| Choice | Note type     | Template                 | Category     |
| ------ | ------------- | ------------------------ | ------------ |
| 1      | poem          | `_templates/poem.md`     | `poetry`     |
| 2      | song cover    | `_templates/cover.md`    | `music`      |
| 3      | language note | `_templates/language.md` | `language`   |
| 4      | essay         | `_templates/essay.md`    | `philosophy` |
| 5      | quick thought | `_templates/thought.md`  | `misc`       |
| 6      | tech note     | `_templates/tech.md`     | `tech`       |
| 7      | blank         | —                        | you pick     |

The category is implied by the type — you never type it, except for `7) blank`,
which asks and re-asks until you give one of the six (see
[section 6](#6-the-garden-notes)).

Then it asks for **tags**: space-separated, lowercase, 1-4. For a language note the
prompt reminds you that the first tag is the language itself.

The script loads the matching file from [`_templates/`](_templates/), substitutes
`__TITLE__` / `__DATE__` / `__DESCRIPTION__` / `__TAGS__`, and writes the result to
`_posts/YYYY-MM-DD-slug.md`. Every template ships `maturity: seedling`,
`related_posts: false` and `giscus_comments: true`. Front-matter lines you left
blank (no description, no tags) are dropped rather than emitted empty, and a
templated note has no `<!-- TODO -->` marker — the template body _is_ the todo.

If a template file is missing, the script falls back to plain garden front matter
instead of failing.

### Editing the type list

Both lists live at the top of [`_scripts/new_page.py`](_scripts/new_page.py):
`POST_CATEGORIES` (the six, mirroring `display_categories:` in `_config.yml`) and
`POST_TYPES` (menu choice → label, template, category). Adding a note type = add a
file to `_templates/` and a row to `POST_TYPES`.

---

## 17. Code formatting (Prettier)

CI runs `npx prettier . --check` and fails the build if any file has formatting
issues. Run this before every commit:

```bash
npx prettier . --write
```

Prettier touches: `.md`, `.yml`, `.scss`, `.html`, `.liquid`, `.json`, `.js`.

Files Prettier ignores are listed in [`.prettierignore`](.prettierignore).

If you genuinely want Prettier to not touch a file or block, you can add it to
`.prettierignore` (whole file) or wrap a section with `<!-- prettier-ignore -->`
in markdown.

---

## 18. Common gotchas

### YAML strings with special characters need quotes

```yaml
title: "My: Cool Site" # colon inside title needs quoting
description: "A & B" # ampersand also fine quoted
title: Just a normal title # no special chars, no quote needed
```

### Markdown inside YAML doesn't render

```yaml
description: This **bold** won't bold # plain text only
```

If you need formatting in a description, use HTML in a multi-line `>` block:

```yaml
description: >
  This <b>bold</b> works.
```

### Image paths

```markdown
![alt](/assets/img/file.jpg) # absolute from site root — works
![alt](assets/img/file.jpg) # relative — works when called from a page
{% include figure.liquid path="assets/img/file.jpg" %} # responsive webp variants
```

Prefer the figure include for project pages — it generates responsive `<picture>`
elements that load 480/800/1400 webp variants.

### Liquid escaping in code blocks

If you write `{{ }}` or `{% %}` in a garden note, Liquid will try to evaluate it.
Wrap in `{% raw %}...{% endraw %}` to show the literal text.

### Front matter `title:` vs body `# Title`

`title:` in front matter is the page's title — used in `<title>`, navbar, social
metadata. The body usually does NOT need a `# Header 1` at the top — the layout
adds the title automatically.

### Excluding files from the build

Add to the `exclude:` list in [`_config.yml`](_config.yml). This is how `AGENTS.md`,
`CLAUDE.md`, this `MANUAL.md`, etc. stay out of the public site.

---

## 19. When something breaks the build

### Step 1: build locally and read the error

```bash
bundle exec jekyll build 2>&1 | tail -30
```

The last 30 lines usually contain the actual error. Common ones:

| Error fragment                         | Likely cause                                                        |
| -------------------------------------- | ------------------------------------------------------------------- |
| `could not find expected ':'`          | YAML front matter typo — usually a missing quote or bad indent      |
| `Liquid syntax error`                  | Mismatched `{% %}` tags or invalid Liquid filter                    |
| `Tag '%}' was not properly terminated` | Unclosed `{% if %}` or `{% for %}` block                            |
| `bibtex parse error`                   | Bad entry in [`_bibliography/papers.bib`](_bibliography/papers.bib) |
| `Imagemagick: error generating`        | Corrupt or unsupported image file                                   |

### Step 2: undo the last change

```bash
git diff                  # see what you changed
git checkout -- <file>    # discard changes to a specific file
git stash                 # park all changes, build to confirm they're the cause
```

### Step 3: bisect if needed

If the build is failing on `main` and you don't know which commit broke it:

```bash
git bisect start
git bisect bad HEAD
git bisect good <known-working-sha>
# git checks out commits one at a time; for each:
bundle exec jekyll build
git bisect good   # if it builds
git bisect bad    # if it doesn't
# eventually git tells you the first bad commit
git bisect reset
```

### Step 4: the deploy ran but the live site looks wrong

- Hard refresh: `Ctrl+Shift+R` to bypass browser cache.
- Check Actions: `https://github.com/alexandergmzx/alexandergmzx.github.io/actions`
  — confirm the **Deploy site** workflow succeeded (green check).
- GitHub Pages caches for ~5 minutes; wait, then refresh.
- View the built file on the `gh-pages` branch directly to confirm what was deployed.

---

_This file is excluded from the published site via the `exclude:` list in [`_config.yml`](_config.yml).
It lives at the repo root next to `AGENTS.md` and `CLAUDE.md`._
