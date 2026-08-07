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

## 2. Supplied photography

The homepage hero and the four service images are **supplied and live**. Nothing
is outstanding here. They are named in `lib/images.ts` and rendered through
`next/image`, with `res.cloudinary.com` allow-listed in `next.config.js`.

| Where | Source |
|---|---|
| Homepage hero, full bleed | `HERO_IMAGE` |
| `/` Websites card and `/services/web-design` hero | `SERVICE_IMAGES.websites` |
| `/` Marketing and SEO card and `/marketing` hero | `SERVICE_IMAGES.marketing` |
| `/` Software and automation card and `/technology/web-applications` hero | `SERVICE_IMAGES.software` |
| `/` Hosting and support card and `/technology/hosting` hero | `SERVICE_IMAGES.hosting` |
| `/` Client portal card and `/products/client-portal` hero | `PRODUCT_IMAGES.clientPortal` |
| `/` Community platform card and `/products/community-platform` hero | `PRODUCT_IMAGES.communityPlatform` |
| `/` CRM card and `/products/crm-lead-management` hero | `PRODUCT_IMAGES.crm` |
| `/` Something bespoke card and `/products/bespoke` hero | `PRODUCT_IMAGES.bespoke` |

`components/SiteScreenshot.tsx` and `public/screenshots/` were deleted along with
the four fallback slots they existed to cover. `ClientPortalMockup`,
`CommunityMockup`, `CrmMockup` and `BespokeMockup` went the same way once the
photographs replaced them on both the card and the product page hero. All of it
is recoverable from git history if any supplied image is later withdrawn.

### Two things still need a human eye

Both are in `lib/images.ts` and both are marked `TODO` there.

1. **`HERO_OBJECT_POSITION_MOBILE`** is the focal point for the hero below
   1024px and ships at the neutral `50% 50%`. Somebody needs to open the page on
   a phone and confirm the subject is still in frame, then adjust the second
   value. Lower percentages move the visible window towards the top of the
   photograph.
2. **The nine alt strings.** The hero is marked decorative with an empty alt,
   which is correct for a photograph sitting behind a headline that already
   states the message. The four service and four product descriptions are
   deliberately short and general because they name only the subject each file
   is named for. Anyone who
   can see the images should replace them with real descriptions. Keep them free
   of client names, results, and any reference to a team.

## 2b. Remaining decorative artwork

Safe to ship. Replace when real artwork exists.

| Where | What is there now |
|---|---|
| `/` Learning platform card and `/products/custom-learning-platform` hero | `LearningMockup`. **The one product with no supplied image.** It keeps its own generated artwork rather than borrowing another product's photograph, which would show a buyer an interface that is not the one they are being sold. Replace with a real image of the learning platform |
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
| `BrowserFrame.tsx` | The browser window every SVG mockup draws inside. Defined once so the whole set stays consistent, and exports the palette constants |
| `BrowserMockup.tsx` | Six generic wireframe layouts. Only used on `/get-a-website` now |
| `LearningMockup.tsx` | Module list with completion ticks, a progress ring, a locked row, a certificate badge. The last product mockup still in use |
| `DeviceMockup.tsx` | The same idea in a phone frame, three variants |
| `AbstractPanel.tsx` | Overlapping arcs, shapes and a diagonal hatch, three variants, light and dark |
`LearningMockup` is **structural, not decorative**. It is recognisable as a
learning platform at a glance, which is the point. It contains no readable text
at all: every text run is a grey bar, so nothing in it can be read as a claim.

`LogoMark.tsx` and `MonogramAvatar.tsx` were deleted along with the sections that
used them. Do not reinstate a logo mark with an invented company name: a
plausible name reads as a client we do not have.

`components/ImagePlaceholder.tsx` is retained. Its only remaining use is the
unapproved Invisible Edge proof screenshots, where a visible grey box is the
honest rendering.

## 4. Notes and deviations

- **The homepage hero is now supplied photography**, full bleed, with the nav
  overlaying it. The scrim that keeps the headline legible holds a fixed 0.80
  navy floor across the whole text column rather than tapering through it, which
  makes the contrast guarantee independent of the photograph. See the comment in
  `app/globals.css`. Swapping the image cannot break the contrast.
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
