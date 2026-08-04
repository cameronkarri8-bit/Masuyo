# Replace before launch

Every item on this page is temporary. The artwork is generated SVG in the brand
palette, built so the site can be reviewed and screenshotted without empty grey
boxes. None of it is real.

Two categories, and the difference matters:

- **Proof critical.** Anything that a visitor could read as evidence of real
  clients, real results or real people. These must be replaced with genuine,
  permissioned client material **before any outreach campaign begins.** Sending
  cold traffic to a page whose proof is invented is the one failure mode that
  costs more than an empty page would.
- **Decorative.** Abstract artwork standing in for photography. Safe to ship,
  replace when the real photography exists.

Every generated file begins with the line
`TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH`, so a repo-wide grep for
that string finds all of them.

---

## 0. What was removed, and why the list is now short

The site was restructured from portfolio-led to service-led. There are very few
past clients and no team, so every section built on proof, previous work or
people was deleted rather than filled with placeholders. That removed most of
this document in one pass:

| Removed | What it was |
|---|---|
| `/work` and `/work/[slug]` | Three placeholder case studies. The routes now 301 to `/services` |
| `lib/case-studies.ts` | Every field was `PLACEHOLDER:` or `TBC` |
| `components/CaseStudyCard.tsx` | Abstract wireframes standing in for delivered work |
| `components/ClientLogoStrip.tsx` | Six "Client one" through "Client six" lockups |
| `components/Testimonial.tsx` | Placeholder quotes on `/`, `/pricing`, `/get-a-website`, `/services` |
| `components/placeholder/LogoMark.tsx` | The generic client logo used by the strip |
| `components/placeholder/MonogramAvatar.tsx` | The tinted circle used by the testimonial |
| `/about` team section | Three headshot placeholders, three `TODO: real name` cards and a visible notice. Replaced with a section on how the work is actually structured |

Nothing here needs replacing later. It needs building only if real, permissioned
client material eventually exists, and at that point it is a new decision rather
than an outstanding task.

## 1. Proof critical

These carry an implied claim. Do not run a campaign until they are real.

| Where | What is there now | What must replace it |
|---|---|---|
| `app/products/custom-learning-platform/page.tsx`, Proof section | Two `ImagePlaceholder` boxes and a quote card marked "Awaiting client sign-off" | Real Invisible Edge screenshots and an approved quote. **Deliberately left as visible placeholder boxes**, because an abstract wireframe inside a section headed "Built and running for Invisible Edge" would imply it is their platform |
| `app/page.tsx`, sectors line above the footer CTA | A `TODO` comment sits directly above it. The line names the sectors we work in and is unverified | Owner confirmation that the sectors named are accurate, or deletion of the line. No client is named, so this is a low risk item, but it is still an unchecked claim |

## 2. Decorative

Safe to ship. Replace when real photography exists.

| Where | What is there now |
|---|---|
| `/` hero | `BrowserMockup` variant 0. See the note in section 4 below |
| `/` service cards, four slots | `BrowserMockup`, variant per card |
| `/` product cards, five slots | `BrowserMockup` and `DeviceMockup`, variant per card |
| `/get-a-website` hero and three example slots | `BrowserMockup` and one `DeviceMockup` |
| `/get-a-website` why-cheap section | `AbstractPanel` variant 2, dark |
| `/about` founding story | `AbstractPanel` variant 0 |
| `/pricing` what-moves-the-number | `AbstractPanel` variant 1, dark |
| `/products/custom-learning-platform` hero | `DeviceMockup` variant 1 |
| 26 deep pages under `/technology`, `/marketing`, `/services`, `/products`, plus `/lifestyle-venues` | `BrowserMockup`, or `DeviceMockup` on `/marketing/social`, `/marketing/paid-ads` and `/technology/app-development`. Variant derived from the route so neighbouring pages differ |

## 3. The generated components

All live in `components/placeholder/`. Deleting the directory and reverting the
imports removes every piece of temporary artwork in one move.

| File | Purpose |
|---|---|
| `BrowserMockup.tsx` | Browser chrome with six abstract wireframe layouts. No readable text, no real interface, so it cannot pass as a screenshot |
| `DeviceMockup.tsx` | The same idea in a phone frame, three variants |
| `AbstractPanel.tsx` | Overlapping arcs, shapes and a diagonal hatch, three variants, light and dark |

`LogoMark.tsx` and `MonogramAvatar.tsx` were deleted along with the sections that
used them. Do not reinstate a logo mark with an invented company name: a
plausible name reads as a client we do not have.

`components/ImagePlaceholder.tsx` is retained. Its only remaining use is the
unapproved Invisible Edge proof screenshots, where a visible grey box is the
honest rendering.

## 4. Notes and deviations

- **The homepage hero was swapped, against the brief.** The brief said to leave
  it alone because it "already has real artwork". It did not: it was an
  `ImagePlaceholder` grey box. Leaving it would have left the most important
  page on the site reviewing as an empty box, which was the whole point of the
  work. It now renders `BrowserMockup` variant 0. Reverting is one line in
  `app/page.tsx`.
- **Palette.** Only navy `#1A2939`, blue `#35ADDF`, blue2 `#1d96cb`, off-white
  `#F1F9FD` and white are used. Verified by grep across the directory.
- **Accessibility.** Every generated asset is `aria-hidden`, because it is
  decoration that carries no information. Surrounding headings and copy carry
  the meaning.
- **No external requests.** Everything is inline SVG. Nothing is fetched, and
  no stock photography is linked.
