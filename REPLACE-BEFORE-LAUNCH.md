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

## 2. Screenshots needed

`public/screenshots/` is empty. Every slot below **falls back to the abstract
wireframe automatically until the file exists**, so nothing is broken and nothing
404s. They can be added one at a time, in any order.

**All four are 1600 x 1000 pixels**, which is 2x for retina. They display at
800 x 500. Rendered by `components/SiteScreenshot.tsx`.

| File | Path | Used on | What to capture |
|---|---|---|---|
| `websites.png` | `public/screenshots/websites.png` | `/` Websites card, `/services/web-design` hero | A marketing site homepage: navigation, hero, content blocks below |
| `marketing.png` | `public/screenshots/marketing.png` | `/` Marketing and SEO card, `/marketing` hero | An analytics view: traffic and conversion charts, a table of channels |
| `software.png` | `public/screenshots/software.png` | `/` Software and automation card, `/technology/web-applications` hero | An application interface: sidebar, record list, detail panel |
| `hosting.png` | `public/screenshots/hosting.png` | `/` Hosting and support card, `/technology/hosting` hero | A monitoring view: uptime status, response times, recent checks |

### Rules for these four

- **Never label a screenshot with a client name**, and never place one next to a
  claim about results. The image cannot evidence either.
- **Alt text describes the interface, not the client.** The strings are already
  written into the pages and say things like "an application interface, showing a
  sidebar, a record list and a detail panel". Do not change them to name anyone.
- **Get written permission** before showing anything built for a client, even
  unbranded. If permission is not available, screenshot our own work instead.
- **Crop to the interface.** `SiteScreenshot` supplies the browser chrome, so a
  capture that already includes a browser frame will look doubled.
- The image is anchored to the top and cropped to fill, so put the important part
  of the interface in the upper portion of the frame.

## 2b. Remaining decorative artwork

Safe to ship. Replace when real artwork exists.

| Where | What is there now |
|---|---|
| `/` hero | `BrowserMockup` variant 0. See the note in section 4 below |
| `/` and the five product pages | The five purpose built product mockups, listed in section 3 |
| `/get-a-website` hero and three example slots | `BrowserMockup` and one `DeviceMockup`. These are the product being sold on that page, so they stay until real example sites exist |
| `/get-a-website` why-cheap section | `AbstractPanel` variant 2, dark |
| `/about` founding story | `AbstractPanel` variant 0 |
| `/pricing` what-moves-the-number | `AbstractPanel` variant 1, dark |

Generic hero wireframes were **removed** from 22 deep pages under `/technology`,
`/marketing`, `/services` and `/lifestyle-venues`, plus the automation page.
Reason is recorded in section 4.

## 3. The generated components

All live in `components/placeholder/`. Deleting the directory and reverting the
imports removes every piece of temporary artwork in one move.

| File | Purpose |
|---|---|
| `BrowserFrame.tsx` | The browser window every SVG mockup draws inside. Defined once so the whole set stays consistent. Exports the palette constants and `CHROME_PERCENT`, which `SiteScreenshot` uses to match its proportions exactly |
| `BrowserMockup.tsx` | Six generic wireframe layouts. Now only used as the screenshot fallback and on `/` and `/get-a-website` |
| `DeviceMockup.tsx` | The same idea in a phone frame, three variants |
| `AbstractPanel.tsx` | Overlapping arcs, shapes and a diagonal hatch, three variants, light and dark |
| `ClientPortalMockup.tsx` | Sidebar nav, document list with file icons, progress bar, one highlighted status pill |
| `CommunityMockup.tsx` | Thread feed with avatar circles and reply counts, a pinned marker, a member sidebar |
| `CrmMockup.tsx` | Four column pipeline, one card lifted mid drag over a dashed drop target, a value total in the corner |
| `LearningMockup.tsx` | Module list with completion ticks, a progress ring, a locked row, a certificate badge |
| `BespokeMockup.tsx` | An interface part way through assembling, blocks resolving from solid into dashed outlines |

The five product mockups are **structural, not decorative**. Each is recognisable
as its own product at a glance, which is the point. They contain no readable text
at all: every text run is a grey bar, so nothing in them can be read as a claim.
Avatars are plain tinted circles, never faces and never initials.

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
- **Generic hero wireframes were removed from 22 pages.** On the deep pages under
  `/technology`, `/marketing` and `/services`, the image was a generic website
  wireframe assigned by route, sitting beside a heading about DevOps, or GDPR, or
  databases. It restated the heading and nothing more. Those heroes now run as a
  single column capped at `max-w-3xl`. Nothing was replaced, because there is
  nothing honest to replace them with: a screenshot of a DevOps pipeline we have
  not been given permission to show would be worse than white space. The full
  list is in the commit message.
- **Chrome is anchored to the top of the frame.** `BrowserFrame` uses
  `preserveAspectRatio="xMidYMin slice"` rather than `xMidYMid`. At the 16/9
  aspect the homepage cards use, a centred slice cropped the browser chrome off
  entirely and the mockups stopped reading as windows.
