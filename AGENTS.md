# Agent Guidelines for al-folio

A simple, clean, and responsive Jekyll theme for academics.

## Quick Links by Role

- **Are you a coding agent?** → Read [`.github/copilot-instructions.md`](.github/copilot-instructions.md) first (tech stack, build, CI/CD, common pitfalls & solutions)
- **Customizing the site?** → See [`.github/agents/customize.agent.md`](.github/agents/customize.agent.md)
- **Writing documentation?** → See [`.github/agents/docs.agent.md`](.github/agents/docs.agent.md)
- **Need setup/deployment help?** → [INSTALL.md](INSTALL.md)
- **Troubleshooting & FAQ?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Customization & theming?** → [CUSTOMIZE.md](CUSTOMIZE.md)
- **Quick 5-min start?** → [QUICKSTART.md](QUICKSTART.md)
- **Open to-dos for this site?** → [TODO.md](TODO.md) (read it at the start of a session; check items off as they are done)
- **Owner's editing manual?** → [MANUAL.md](MANUAL.md)

## Essential Commands

### Local Development (Docker)

The recommended approach is using Docker.

```bash
# Initial setup & start dev server
docker compose pull && docker compose up
# Site runs at http://localhost:8080

# Rebuild after changing dependencies or Dockerfile
docker compose up --build

# Stop containers and free port 8080
docker compose down
```

### Pre-Commit Checklist

Before every commit, you **must** run these steps:

1.  **Format Code:**
    ```bash
    # (First time only)
    npm install --save-dev prettier @shopify/prettier-plugin-liquid
    # Format all files
    npx prettier . --write
    ```
2.  **Build Locally & Verify:**

    ```bash
    # Rebuild the site
    docker compose up --build

    # Verify by visiting http://localhost:8080.
    # Check navigation, pages, images, and dark mode.
    ```

## CI Workflows: What Fails and Why

These workflows emailed the owner with failures for months. Keep them green:

- **Prettier code formatter** (`.github/workflows/prettier.yml`) runs `npx prettier . --check` on every push to `main`. Any unformatted file in the push fails it. Before every commit, run `npm ci` once (the versions CI pins in `package-lock.json`), then `npx prettier . --write`. Confirm with `npx prettier . --check`, which must print "All matched files use Prettier code style!".
- **Lighthouse Badger** (`.github/workflows/lighthouse-badger.yml`) is manual-only on purpose. It needs a `LIGHTHOUSE_BADGER_TOKEN` secret (a personal access token), which is not configured, so every automatic run failed at checkout. Its `URLS` and `REPO_BRANCH` still point at the al-folio template (`alshedivat.github.io/al-folio/`, branch `master`). A manual run fails until both are changed to this site and `main`. Do not uncomment `page_build:` or `schedule:` until the secret exists.
- **Render a CV** (`.github/workflows/render-cv.yml`) is manual-only on purpose. The CV PDF is a Google Docs export, and `_data/cv.yml` carries keys RenderCV rejects (`label`, `summary`, `address`), so the old push trigger failed on every CV edit. Do not restore the `push:` trigger.
- **Check for broken links** is skipped on this fork (it is gated to `alshedivat/al-folio`). **Check for broken links on site** runs lychee offline after each deploy and checks internal links only. A typo in an internal path such as `/projects/<slug>/` fails it.

After a push, check the runs with `gh run list --limit 10`.

## Critical Configuration

When modifying `_config.yml`, these **must be updated together**:

- **Personal site:** `url: https://username.github.io` + `baseurl:` (empty)
- **Project site:** `url: https://username.github.io` + `baseurl: /repo-name/`
- **YAML errors:** Quote strings with special characters: `title: "My: Cool Site"`

## Development Workflow

- **Git & Commits:** For commit message format and Git practices, see [.github/GIT_WORKFLOW.md](.github/GIT_WORKFLOW.md).
- **Code-Specific Instructions:** Consult the relevant instruction file for your code type.

| File Type                                     | Instruction File                                                                                |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Markdown content (`_posts/`, `_pages/`, etc.) | [markdown-content.instructions.md](.github/instructions/markdown-content.instructions.md)       |
| YAML config (`_config.yml`, `_data/`)         | [yaml-configuration.instructions.md](.github/instructions/yaml-configuration.instructions.md)   |
| BibTeX (`_bibliography/`)                     | [bibtex-bibliography.instructions.md](.github/instructions/bibtex-bibliography.instructions.md) |
| Liquid templates (`_includes/`, `_layouts/`)  | [liquid-templates.instructions.md](.github/instructions/liquid-templates.instructions.md)       |
| JavaScript (`_scripts/`)                      | [javascript-scripts.instructions.md](.github/instructions/javascript-scripts.instructions.md)   |

## Common Issues

For troubleshooting, see:

- [Common Pitfalls & Workarounds](.github/copilot-instructions.md#common-pitfalls--workarounds) in copilot-instructions.md
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions
- [GitHub Issues](https://github.com/alshedivat/al-folio/issues) to search for your specific problem.
