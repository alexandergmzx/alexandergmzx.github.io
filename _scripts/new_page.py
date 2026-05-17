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
  1) project   → _projects/
  2) post      → _posts/
  3) news      → _news/
  4) book      → _books/
  5) teaching  → _teachings/
  6) page      → _pages/
"""


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
    )
    return path, front_matter


def build_post():
    title = ask("Title")
    description = ask("Description (optional)", "")
    categories = ask("Categories (space-separated, optional)", "")
    today = date.today().isoformat()

    slug = slugify(title)
    path = REPO_ROOT / "_posts" / f"{today}-{slug}.md"

    desc_line = f"description: {description}\n" if description else ""
    cat_line = f"categories: {categories}\n" if categories else ""
    front_matter = (
        f"---\n"
        f"layout: post\n"
        f"title: \"{title}\"\n"
        f"date: {today}\n"
        f"{desc_line}"
        f"{cat_line}"
        f"related_posts: false\n"
        f"---\n"
    )
    return path, front_matter


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
    )
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
    )
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
    )
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
    )
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
    path, front_matter = BUILDERS[content_type]()

    if not confirm_overwrite(path):
        print("Aborted.")
        sys.exit(0)

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(front_matter + "\n<!-- TODO: write content here -->\n", encoding="utf-8")

    print(f"\nCreated: {path.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
