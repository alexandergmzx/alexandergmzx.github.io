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
- [6. Blog posts](#6-blog-posts)
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
| Add a blog post                        | new file in [`_posts/`](_posts/) — `YYYY-MM-DD-slug.md`                                                   |
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

latest_posts: # latest blog posts strip
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
- **Hide the latest posts strip:** `latest_posts: enabled: false`
- **Hide the social icons:** `social: false`
- **New profile photo:** drop the new image in `assets/img/`, change `profile.image:`

### Bio writing tips

The body is rendered between the news/posts blocks. Keep it tight — the page is
primarily a launch pad to projects, CV, blog. Use markdown links to direct
visitors to where they should go next.

---

## 4. Navigation menu

### Current navbar order

1. **Projects** (`_pages/projects.md`, `nav_order: 1`)
2. **Teaching** (`_pages/teaching.md`, `nav_order: 2`)
3. **Blog** (`_pages/blog.md`, `nav_order: 3`)
4. **Bookshelf** (`_pages/books.md`, `nav_order: 4`)
5. **Vision & Venture** (`_pages/vision.md`, `nav_order: 5`)
6. **more ▾** (`_pages/dropdown.md`, `nav_order: 6`) — contains CV, Repositories

### Show or hide a page in the navbar

Edit the page's front matter:

```yaml
nav: true       # appears
nav: false      # hidden (page is still reachable by direct URL)
nav_order: 3    # position from left (lower number = further left)
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

## 6. Blog posts

### Adding a post

Helper: `python3 _scripts/new_page.py` → pick `2) post`.

Manual: create `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
layout: post
title: "Post title"
date: 2026-05-17
description: 1-line summary for the listing page and SEO
categories: embedded robotics # space-separated tags, single word each
related_posts: false # disable auto "related posts" at the bottom
---
# Post body

Markdown. Use `code blocks`, [links](https://example.com), images
(`![alt](/assets/img/file.jpg)`), etc.
```

### When to use a blog post

Long-form: tutorials, project deep-dives, commentary on industry news,
opinion pieces. Anything more than a paragraph or that has a thesis to argue.

For short personal milestones, use [news](#7-news-short-milestones) instead.

### Categories

Categories show as filter chips on the `/blog/` page. Use single words, lowercase.
Common ones for this site: `embedded`, `robotics`, `cv`, `firmware`, `tooling`.

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

If a news item needs more than ~3 lines or argues a point, make it a blog post
([section 6](#6-blog-posts)) and add a news item that links to the post.

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
2. post → `_posts/`
3. news → `_news/`
4. book → `_books/`
5. teaching → `_teachings/`
6. page → `_pages/`

Answer the prompts. The script generates a file with correct front matter,
slugifies the title for the filename, and prints the resulting path. The body
contains `<!-- TODO: write content here -->` so you can grep for un-finished pages.

If a file with the same name already exists, the script asks before overwriting.

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
title: "My: Cool Site"          # colon inside title needs quoting
description: "A & B"             # ampersand also fine quoted
title: Just a normal title       # no special chars, no quote needed
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

If you write `{{ }}` or `{% %}` in a blog post, Liquid will try to evaluate it.
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
