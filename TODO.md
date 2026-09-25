# Portfolio design To-Do

## Academic engineering direction

Deferred from the Delta robot showcase refresh. The audience is university
admissions reviewers and engineering faculty; the aim is to make the work easy to
understand, explore, and assess.

- [ ] Establish consistent typography, spacing, and a restrained academic engineering
      palette, using the Delta showcase as a starting reference.
- [ ] Review light and dark themes together, including the header identity and accent
      colors, so projects feel part of the same portfolio.
- [ ] Give each project a clear introduction: the problem, the engineering approach,
      and a useful demonstration or result.
- [ ] Make individual contributions, collaborations, and supporting evidence easy
      to find without overstating outcomes.
- [ ] Coordinate project imagery, captions, and interactive demonstrations.
- [ ] Simplify navigation for first-time university visitors while retaining the
      garden and other personal sections.
- [ ] Review mobile layouts, keyboard access, contrast, focus indicators, and motion
      preferences across the site.

The current implementation covers the Delta simulator and its dedicated page.
Broader portfolio changes are a separate task.

## Profile alignment follow-ups (September 2026)

Left open after the CV, homepage and Vision were aligned with the LinkedIn
working document (commits d22d34f, 6d972b5, 7bc07d8). Alex writes the personal
prose himself: agents may suggest structure or edits, never replacement text.

- [ ] Vision prose (`_pages/vision.md`): Alex rewrites the opening paragraphs in
      his own voice. The Maker journey table and the Values grid are current.
- [ ] Homepage intro line (`_pages/about.md`, `<p class="intro-lead">`): Alex
      replaces "I build software that has to answer to hardware."
- [ ] CV PDF: paste the updated CV into the Google Doc, export it, and overwrite
      `assets/pdf/alexander_gomez_cv.pdf`. `_data/cv.yml` is the reference text.
- [ ] LinkedIn document: drop "in Germany" from the headline and About; RWTH
      dates are 28 July to 10 August 2025 (not June); fish_brain runs on an
      Arduino UNO R4 (next iteration: Arduino UNO Q).
- [ ] fish_brain README says ESP32-S3 firmware; align it with the UNO R4 / UNO Q
      story, or tell the site which is right.
- [ ] Missing facts for the CV: exact title of the FreeRTOS course on Udemy
      (then add it under Certificates), and the start year of yahboomcar-ros2.
- [ ] Fleet page (`_projects/12_parcel_sortation_fleet.md`): add an image and a
      repo link once the Isaac Sim simulation has something to show. It can join
      `_data/featured_projects.yml` only once it has an `img`.
- [ ] `_design/academic-editorial/` (untracked mockup) still says
      "DXC Technology (Luxoft)"; update or delete it.

Standing rules for these pages: no em dashes; every number carries a status
(measured, simulated, target); no client names at the current employer; say
"master's", never "master's in Germany". Run `npx prettier . --write` before
every commit, or the Prettier workflow fails.
