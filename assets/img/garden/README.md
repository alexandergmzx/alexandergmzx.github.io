# Garden artwork

Backdrop photographs for the garden pages. Drop your own images here and the
garden picks them up — nothing else needs editing unless you want to change
which file a bed uses, which lives in [`_data/garden.yml`](../../../_data/garden.yml).

| File             | Where it shows                                                                |
| ---------------- | ----------------------------------------------------------------------------- |
| `garden.jpg`     | `/garden/`, tag archives, year archives, and any bed with no image of its own |
| `tech.jpg`       | `/garden/category/tech/`                                                      |
| `poetry.jpg`     | `/garden/category/poetry/`                                                    |
| `music.jpg`      | `/garden/category/music/`                                                     |
| `language.jpg`   | `/garden/category/language/`                                                  |
| `philosophy.jpg` | `/garden/category/philosophy/`                                                |
| `misc.jpg`       | `/garden/category/misc/`                                                      |

Only `garden.jpg` is worth adding first — every bed falls back to it. A bed
image is an accent, not a requirement.

A few practical notes:

- **Any file missing is fine.** A bed with no image falls back to `garden.jpg`; if
  that is missing too, the page renders on the plain background instead of a
  broken image. Nothing to configure either way.
- **Size them down before committing.** These are full-bleed backdrops, so
  around 2000px on the long edge is plenty. Anything straight off a phone is
  several megabytes that every visitor downloads.
- **Busy photographs still work.** A veil sits over the image and the notes are
  listed on a translucent panel, so text stays readable — but a photo with a
  calm area in the middle will always look better than one without.
- **`.jpg` is assumed** by `_data/garden.yml`. To use a `.png` or `.webp`,
  change the `image:` path there to match.
