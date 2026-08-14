#!/usr/bin/env python3
"""
Interactive generator for al-folio content pages.
Creates correctly structured markdown files with YAML front matter.

Usage: python3 _scripts/new_page.py
"""

import os
import re
import sys
from datetime import date
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = REPO_ROOT / "_templates"

DEFAULT_BODY = "\n<!-- TODO: write content here -->\n"

TYPES = {
    "1": "project",
    "2": "post",
    "3": "news",
    "4": "book",
    "5": "teaching",
    "6": "page",
}

MENU = """
Content type:
  1) project      → _projects/
  2) garden note  → _posts/
  3) news         → _news/
  4) book         → _books/
  5) teaching     → _teachings/
  6) page         → _pages/
"""

# The garden beds. A note belongs to exactly one. Keep in sync with
# display_categories in _config.yml — this is the only place to edit here.
POST_CATEGORIES = ["tech", "poetry", "music", "language", "philosophy", "misc"]

# Note type menu → (label, template name in _templates/, category).
# A template of None means "blank": ask for the category instead.
POST_TYPES = {
    "1": ("poem", "poem", "poetry"),
    "2": ("song cover", "cover", "music"),
    "3": ("language note", "language", "language"),
    "4": ("essay", "essay", "philosophy"),
    "5": ("quick thought", "thought", "misc"),
    "6": ("tech note", "tech", "tech"),
    "7": ("blank", None, None),
}

POST_TYPE_MENU = "\nNote type:\n" + "".join(
    f"  {key}) {label:<14}→ {category or 'pick a category'}\n" for key, (label, _tpl, category) in sorted(POST_TYPES.items())
)


def ask(prompt, default=None):
    suffix = f" [{default}]" if default is not None else ""
    value = input(f"{prompt}{suffix}: ").strip()
    return value if value else default


def slugify(text):
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return text.strip("-")


def confirm_overwrite(path):
    if path.exists():
        answer = input(f"  {path} already exists. Overwrite? [y/N]: ").strip().lower()
        return answer == "y"
    return True


def next_project_importance():
    projects_dir = REPO_ROOT / "_projects"
    existing = sorted(projects_dir.glob("*.md"))
    if not existing:
        return 1
    nums = []
    for f in existing:
        m = re.match(r"^(\d+)", f.name)
        if m:
            nums.append(int(m.group(1)))
    return (max(nums) + 1) if nums else 1


def build_project():
    title = ask("Title")
    description = ask("Description (one line)")
    print("Category: 1) academic  2) professional  3) personal")
    cat_choice = ask("Category", "1")
    category = {"1": "academic", "2": "professional", "3": "personal"}.get(cat_choice, "academic")
    default_imp = next_project_importance()
    importance = ask("Importance (integer, lower = more prominent)", str(default_imp))
    img = ask("Image filename in assets/img/ (leave blank to skip)", "")

    slug = slugify(title)
    imp_str = str(importance).zfill(2)
    path = REPO_ROOT / "_projects" / f"{imp_str}_{slug}.md"

    img_line = f'img: assets/img/{img}\n' if img else ""
    front_matter = (
        f"---\n"
        f"layout: page\n"
        f"title: \"{title}\"\n"
        f"description: {description}\n"
        f"{img_line}"
        f"importance: {importance}\n"
        f"category: {category}\n"
        f"---\n"
    ) + DEFAULT_BODY
    return path, front_matter


def fill_template(name, tokens):
    """Render _templates/<name>.md, substituting __TOKEN__ placeholders.

    Front-matter lines whose whole value is an empty token (e.g. no description)
    are dropped instead of being emitted with nothing after the colon.
    Returns None if the template file is missing, so callers can fall back.
    """
    template = TEMPLATES_DIR / f"{name}.md"
    if not template.is_file():
        return None

    text = template.read_text(encoding="utf-8")
    for token, value in tokens.items():
        if value:
            text = text.replace(token, value)
        else:
            text = re.sub(r"(?m)^[\w-]+:[ \t]*" + re.escape(token) + r"[ \t]*\n", "", text)
            text = text.replace(token, "")
    return text


def generic_post(title, today, description, tags, category):
    """Fallback front matter used for blank notes and missing templates."""
    desc_line = f"description: {description}\n" if description else ""
    tags_line = f"tags: {tags}\n" if tags else ""
    return (
        f"---\n"
        f"layout: post\n"
        f"title: \"{title}\"\n"
        f"date: {today}\n"
        f"{desc_line}"
        f"{tags_line}"
        f"categories: {category}\n"
        f"maturity: seedling\n"
        f"related_posts: false\n"
        f"giscus_comments: true\n"
        f"---\n"
    ) + DEFAULT_BODY


def ask_post_category():
    allowed = ", ".join(POST_CATEGORIES)
    while True:
        category = (ask(f"Category ({allowed})", "misc") or "").strip().lower()
        if category in POST_CATEGORIES:
            return category
        print(f"  {category!r} is not a garden category. Pick one of: {allowed}")


def build_post():
    title = ask("Title") or "Untitled"
    description = ask("Description (optional)", "")

    print(POST_TYPE_MENU)
    type_choice = ask("Note type", "7")
    label, template, category = POST_TYPES.get(type_choice, POST_TYPES["7"])
    if category is None:
        category = ask_post_category()

    tag_hint = "first tag = the language" if template == "language" else "lowercase, single words, 1-4"
    tags = ask(f"Tags (space-separated, {tag_hint}, optional)", "")

    today = date.today().isoformat()
    slug = slugify(title)
    path = REPO_ROOT / "_posts" / f"{today}-{slug}.md"

    content = None
    if template:
        content = fill_template(
            template,
            {
                "__TITLE__": title,
                "__DATE__": today,
                "__DESCRIPTION__": description,
                "__TAGS__": tags,
            },
        )
        if content is None:
            print(f"  No _templates/{template}.md found — falling back to plain front matter.")

    if content is None:
        content = generic_post(title, today, description, tags, category)

    print(f"  {label} → categories: {category}")
    return path, content


def build_news():
    title = ask("Title")
    today = date.today().isoformat()
    news_date = ask("Date", today)

    slug = slugify(title)
    path = REPO_ROOT / "_news" / f"{news_date}-{slug}.md"

    front_matter = (
        f"---\n"
        f"layout: post\n"
        f"title: \"{title}\"\n"
        f"date: {news_date}\n"
        f"---\n"
    ) + DEFAULT_BODY
    return path, front_matter


def build_book():
    title = ask("Title")
    author = ask("Author")
    publisher = ask("Publisher", "")
    year = ask("Year", str(date.today().year))
    rating = ask("Rating (e.g. 8/10)", "")
    img = ask("Cover image filename in assets/img/book_covers/ (leave blank to skip)", "")

    slug = slugify(title)
    path = REPO_ROOT / "_books" / f"{slug}.md"

    pub_line = f"publisher: {publisher}\n" if publisher else ""
    rating_line = f"rating: {rating}\n" if rating else ""
    img_line = f"img: /assets/img/book_covers/{img}\n" if img else ""
    front_matter = (
        f"---\n"
        f"layout: book-review\n"
        f"title: \"{title}\"\n"
        f"author: {author}\n"
        f"{pub_line}"
        f"year: {year}\n"
        f"{rating_line}"
        f"{img_line}"
        f"---\n"
    ) + DEFAULT_BODY
    return path, front_matter


def build_teaching():
    title = ask("Title")
    description = ask("Description (one line)")

    slug = slugify(title)
    path = REPO_ROOT / "_teachings" / f"{slug}.md"

    front_matter = (
        f"---\n"
        f"layout: page\n"
        f"title: \"{title}\"\n"
        f"description: {description}\n"
        f"---\n"
    ) + DEFAULT_BODY
    return path, front_matter


def build_page():
    title = ask("Title")
    slug = slugify(title)
    permalink = ask("Permalink", f"/{slug}/")
    description = ask("Description (one line)", "")
    nav = ask("Show in navbar? [y/N]", "n").lower() == "y"
    nav_order = ask("Nav order (integer)", "5") if nav else None

    path = REPO_ROOT / "_pages" / f"{slug}.md"

    desc_line = f"description: {description}\n" if description else ""
    nav_line = f"nav: {'true' if nav else 'false'}\n"
    nav_order_line = f"nav_order: {nav_order}\n" if nav_order else ""
    front_matter = (
        f"---\n"
        f"layout: page\n"
        f"title: {title}\n"
        f"permalink: {permalink}\n"
        f"{desc_line}"
        f"{nav_line}"
        f"{nav_order_line}"
        f"---\n"
    ) + DEFAULT_BODY
    return path, front_matter


BUILDERS = {
    "project": build_project,
    "post": build_post,
    "news": build_news,
    "book": build_book,
    "teaching": build_teaching,
    "page": build_page,
}


def main():
    print(MENU)
    choice = ask("Choose type (1-6)").strip()
    content_type = TYPES.get(choice)
    if not content_type:
        print(f"Invalid choice: {choice!r}. Exiting.")
        sys.exit(1)

    print(f"\n--- New {content_type} ---")
    path, content = BUILDERS[content_type]()

    if not confirm_overwrite(path):
        print("Aborted.")
        sys.exit(0)

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

    print(f"\nCreated: {path.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
