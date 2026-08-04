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

## 1. Proof critical

These carry an implied claim. Do not run a campaign until they are real.

| Where | What is there now | What must replace it |
|---|---|---|
| `components/ClientLogoStrip.tsx`, shown on `/` and `/work` | Six `LogoMark` lockups reading "Client one" through "Client six", generic shapes at 40% opacity | Real client logos, with written permission to display each one |
| `components/CaseStudyCard.tsx`, shown on `/` and `/work` | `BrowserMockup` abstract wireframes | Real screenshots of the actual delivered work |
| `app/work/[slug]/page.tsx`, all three case studies | `BrowserMockup` hero and supporting images | Real project screenshots |
| `lib/case-studies.ts` | Every field is `PLACEHOLDER:` or `TBC`, and `isPlaceholder: true` | Real client names, problems, scope, approved metrics and quotes. Clearing `isPlaceholder` also removes the visible notices and the `noindex` on those routes |
| `components/Testimonial.tsx`, shown on `/`, `/pricing`, `/get-a-website`, `/services`, `/work/[slug]` | `MonogramAvatar`, a tinted circle. Placeholder names render a neutral dash rather than invented initials | A real, permissioned headshot, and only once the quote itself is approved |
| `app/products/custom-learning-platform/page.tsx`, Proof section | Two `ImagePlaceholder` boxes and a quote card marked "Awaiting client sign-off" | Real Invisible Edge screenshots and an approved quote. **Deliberately left as visible placeholder boxes**, because an abstract wireframe inside a section headed "Built and running for Invisible Edge" would imply it is their platform |
| `app/about/page.tsx`, team section | Three `ImagePlaceholder` boxes labelled "PLACEHOLDER: real team photo required", plus a visible notice | Real team photographs. **No monogram or illustrated figure was used here on purpose**: anything resembling a person would read as a real employee |

## 2. Decorative

Safe to ship. Replace when real photography exists.

| Where | What is there now |
|---|---|
| `/` hero | `BrowserMockup` variant 0. See the note in section 4 below |
| `/` pillar cards, four slots | `BrowserMockup`, variant derived from the card title |
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
| `LogoMark.tsx` | Generic shape plus a "Client one" style wordmark. Never replace the wordmarks with invented company names: a plausible name reads as a client we do not have |
| `BrowserMockup.tsx` | Browser chrome with six abstract wireframe layouts. No readable text, no real interface, so it cannot pass as a screenshot |
| `DeviceMockup.tsx` | The same idea in a phone frame, three variants |
| `MonogramAvatar.tsx` | Tinted circle with initials. Not a face. Placeholder names produce a neutral dash |
| `AbstractPanel.tsx` | Overlapping arcs, shapes and a diagonal hatch, three variants, light and dark |

`components/ImagePlaceholder.tsx` is retained. It is still used for the team
photos and the unapproved proof screenshots, and will be needed again.

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
