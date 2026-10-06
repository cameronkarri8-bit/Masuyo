# Masuyo redesign report

Status: in progress. This file is completed in Phase 10 and becomes the pull request description.

## What changed

- **Design system.** Albert Sans via next/font (Geist removed from the layout). The six brand colours, the type scale as fluid clamps, radii and motion in `tailwind.config.ts`. Base components: buttons (primary and secondary, light and dark grounds), text link, section title with the dot, eyebrow, card, tag pill, highlighter, all twelve pen marks, section grounds, entrance motion, accordion and checklist.
- **Navigation.** Six links and one button, fixed at 72px, with the hand drawn underline on the current page and a full screen mobile panel (focus trapped, closes on Escape, returns focus).
- **Footer and closing band** rebuilt from the copy spec.
- **Home, Websites, Systems, Care, Pricing, Approach, Work** rebuilt from the copy spec, section by section, with the diagrams drawn in the brand pen line: the enquiry journey, before and after, the booking flow, the enquiry flow, the timeline bar, the pipeline board, five interface sketches, the build loop, the Care cycle and a map of the North West.
- **Website estimator** on Pricing, with every figure from `lib/pricing.ts` and a range that can never leave the published website range (tested across all 383 combinations of choices). It hands its choices to the start form.
- **Frozen Computers case study** built at `/work/frozen-computers` from `lib/work.ts` with `published: false`: not linked anywhere, `noindex`, out of the sitemap. Location, result and quote are left out while empty.
- **Resources** replaces the blog, guides, glossary and FAQ: a hub with instant search, category chips and the glossary as a chip, all kept in the address bar so a filtered view can be shared; an article template with the short answer box, a contents list that follows the reader, a "Jump to" list on phones, the inline prompt after the second section, questions people also ask, related reading, Article, FAQPage and BreadcrumbList data, a per-article share card and an RSS feed. All nine articles migrated (seven guides, the blog post and the hard coded tech solutions page), each still at its old slug under `/resources`.
- **Web design in Preston** rewritten to the spec at its existing URL, with a stylised map of Central Lancashire.
- **Four sector pages** (`/trades`, `/repair-and-retail`, `/clinics`, `/professional-services`) from one template: a phone drawing of the form a customer fills in, the problem in three lines, the six stage lifecycle, what we build, who we work with and questions. The proof section is left out until there is a real project in each sector.
- **CIC and lifestyle venue pages** restyled to the brand with their words unchanged, and out of the navigation and footer.
- **Brand assets.** Wordmark and monogram SVGs in every version the guide shows, PNG exports at three sizes each with transparent backgrounds, `icon.svg`, a 16 and 32px `favicon.ico`, a 180px apple touch icon, and a new share card that follows the guide's cover. All twelve icons redrawn as SVG from page 6 (light and on-petrol versions), the three spot illustrations from page 7, and a shared hand drawn pen kit for diagrams. The guidelines PDF is published at `/brand/masuyo-brand-guidelines.pdf`.

## Decisions I made

- **ESLint had no config, so `npm run lint` could never pass.** `next lint` stopped at an interactive "how would you like to configure ESLint" prompt. I added `.eslintrc.json` extending `next/core-web-vitals`, the Next default. It found one pre-existing error (an unescaped apostrophe on a page this redesign deletes), which I fixed so every phase starts green.
- **Source documents are stored in the repo** at `docs/redesign/`, so the build can be resumed from the repository alone. Nothing in `docs/` is served by the site.
- **Section title dots are aqua on light grounds.** The brief says aqua never appears as text, buttons or backgrounds on light grounds. Every section title in the brand guide ("Who we are.", "Logo.", "Our services.") ends in an aqua dot on mist. A dot is none of the three forbidden things, and the guide shows it on every page, so the full stop at the end of a section title is aqua. The wordmark's own dot follows its separate rule: petrol on light grounds.
- **Pill tags on light grounds are petrol, not aqua.** Page 10 of the guide shows an aqua "Fixed price" pill on a paper panel, but the brief lists only two exceptions to the aqua rule (icon fill and the highlighter), and the brief outranks the guide. So the filled pill is aqua with deep text on petrol grounds, and petrol with paper text on light grounds. The outlined pill is unchanged.
- **The proposal and concept routes keep their existing logo.** They import `LogoFullWhite`, which the brief puts out of scope. The new site uses a new wordmark component, and `LogoFullWhite` stays exactly as it was so nothing about a page a client is reading changes.
- **The wordmark is measured from the guide, not set by eye.** It is Albert Sans Extra Bold with the font's own kerning plus minus 4% tracking. On the cover every glyph sits exactly 0.04 em further left than the font alone would place it, which is the display tracking from the type page. The monogram tile was measured from a 600 dpi render of page 3 (glyph size, position, baseline and corner radius); my rendering differs from the guide's by 0.37% of pixels, all of them anti-aliased edges.
- **The footer is deep, not petrol.** The copy spec asks for a petrol footer and a petrol closing band directly above it. Two petrol bands back to back read as one shapeless block, so the footer uses deep, the brand's other dark ground.
- **Section headings use both brand sizes.** The guide has a 48px "heading" and a 32px "section title". Section H2s are 48px on desktop and step down fluidly to 32px on a phone, so both sizes are used where the guide uses them.
- **Questions keep their question mark.** The brief asks every section title to end with a full stop, but several spec headings are questions ("Off the shelf or custom?", "What is slowing the business down?"). A question cannot end in a full stop, so those keep the question mark and the brand dot is not added.
- **The nav turns petrol over a petrol hero.** The spec describes a white nav with a line under it once the page scrolls. The guide puts hero areas on petrol and shows the nav sitting inside the petrol hero. So the nav is mist with a hairline once scrolled, and petrol while it sits over a petrol hero, so the two read as one band. Both states use IntersectionObserver, not a scroll listener.
- **Brand body styles apply to the new site only.** The proposal pages were built against the old white ground and 16px text, and switching the whole site to mist changed the ground around the Diogenes proposal. The brand defaults now apply wherever the site nav renders (detected with CSS `:has()`, no script), and the protected routes keep the old ground. Verified against a build of `main`: the proposals and the concept page are structurally identical, and the only change is the typeface.
- **Icons follow the written rule of a 2.4 line.** The icons in the PDF are small rasters whose soft edges make the line look a touch heavier. I kept the guide's stated 2.4 on the 48 grid rather than matching the blur. Each icon has the off register aqua fill, one detail (the cursor, the notification, the glint, the heart and so on) that drops away below 24px, and a fixed tilt between two and four degrees, baked into the SVG so the downloads are tilted too.
- **Illustrations come in a light and a dark version.** The guide shows "Going live" on an aqua card. An aqua panel on a mist page would be an aqua background on a light ground, which the brief rules out, so each illustration draws in petrol on light grounds and in paper on petrol grounds instead. Anything drawn on the aqua screen inside a drawing is deep, which the guide rates 11:1 on aqua.
- **The share card is a static PNG, not generated at request time.** It is the guide's cover adapted to 1200 by 630: the wordmark large, a pen circle around the dot with an arrow, the tagline with the highlighter on "once.". Every word is outlined, so it renders the same everywhere.
- **The apple touch icon is square, with no corner radius.** iOS rounds the corners itself, and any transparency in that file renders as black.
- **"Most chosen" became "Recommended".** The spec labels Care Plus "Most chosen", which is a claim about what clients pick. With no data behind it, it would be an invented fact, so the label says "Recommended". It is one word in `lib/pricing.ts` if it becomes true.
- **Aqua stays off light grounds in every diagram.** The spec asks for aqua connectors and highlights in several light diagrams. Following the brief, light diagrams use petrol lines and highlight with a petrol fill or the highlighter, and aqua appears only in diagrams drawn on petrol (the home hero, the booking flow, the timeline, the map).
- **Home "Recent work" uses the in house fallback.** The Frozen Computers feature waits for launch and approval, so the section shows Masuyo's own CRM, labelled "Built in house", with a pen drawing of a pipeline board. It is clearly a drawing, not a mocked screenshot, and shows no names.
- **The Masuyo card on Work links to Systems.** The spec says every card is a link, but there is no case study page for the in house CRM, so the card goes to the "Built in house" section of the Systems page.
- **Approach uses the "At the desk" illustration** in place of the photo, and the "[number] years" sentence now reads "I've spent years in digital marketing and web development".
- **Hero layout.** Heroes with a picture beside them set the headline at 72px, the bottom of the guide's display range, so it stays on two or three lines next to the visual; the words take about 55% of the width, as the spec asks.
- **Phone versions of three diagrams.** Before and after has a portrait layout for phones so labels never shrink below a readable size, the Care cycle becomes a list ending in a loop arrow, and the Systems comparison table becomes one small comparison per row, because a sideways scrolling table hid the column that matters.
- **Copy I added only where the spec left a gap.** Two lines of interface text the spec does not give: the group label on the before and after toggle (read by screen readers only) and "All work" as the link at the foot of a case study. Everything else visitors read is the spec's wording.
- **Article edits were removals, never additions.** Following the brief and the spec's "no source, no statistic" rule, I removed: the "aesthetics clinics" client claim; the CIC guide's £4,500 "Impact Programme" price, which nothing else on the site publishes (the £1,750 Impact Site stays because the CIC page publishes it); an FAQ whose whole answer was an unsourced conversion rate; the unsourced "five to ten hours a week", "roughly 7% according to multiple studies" and "within five minutes" figures in the tech solutions article; and two unsourced figures in the glossary. Where an article said "see our pricing page", it now states the published prices from `lib/pricing.ts`. "Actually" and "properly" were lifted out, as the spec's writing rules ask. Only the virtual marketing article lacked a short answer box, and it already had a "The short answer" section, which moved into the box.
- **One factual correction.** The glossary still named First Input Delay as a Core Web Vital. Google replaced it with Interaction to Next Paint in March 2024, so the definition now says that.
- **Articles carry the byline the spec asks for.** The meta line reads "By Cameron Karri · Updated [date] · [x] min read", and the Article schema names Cameron as the author with Masuyo as publisher. An earlier change had removed bylines; the new spec puts them back.
- **The nine old checklist pages under /resources were retired, not migrated.** They were bullet lists rather than articles, mostly on subjects outside the new positioning (cash flow, business structure, social media calendars). Each redirects to the guide covering the same ground, or to the hub, so nothing that ranked returns a 404.
- **Old FAQ answers.** Two answers that are still true moved onto the Websites page (built from scratch rather than templates; reviewing the site before launch). The rest described the old offer (a £249 starter site delivered in 7 days, paid ads, marketing retainers) or are already answered by the new pages, so they were not carried over.
- **The glossary links only where an article explains the term.** Eleven of the 32 terms link to an article, using the article's own title as the link text; the rest are definitions only.
- **CIC and lifestyle venue pages are left out of the sitemap** along with the proposals, the concept and the unpublished case study. They still work, but they are out of the navigation pending your decision, so the sitemap does not promote them.
- **Copy I wrote for three sector pages.** The spec writes trades in full but gives only the heading and six lifecycle stages for repair and retail, clinics and professional services. I wrote the rest of those three pages in the spec's voice, building each line from things the site already says (bookings, supplier stock feeds, reminders, portals, invoicing) and adding no prices, figures or client claims. Every question's answer restates an answer from another page. The trades questions and answers also needed writing, as the spec gives one example question; they follow the same rule. Listed under Needs Cameron for a read.
- **"Who we work with" on the three written sector pages lists kinds of business, not clients.** It describes who the pages are for, in the same form as the spec's trades list.
- **CIC page fixes, words otherwise unchanged.** The hero photo slot was a visible placeholder with a shot brief printed in it, so it now shows "The shop on the corner" illustration. The statistics counted up on scroll, and the spec says nothing counts, so they are static, still with the regulator's report named as the source. The "See a live example" button pointed at a section that does not exist, so it was removed, and the share image it named did not exist, so the page uses the default card. Its "Book a 20 minute call" button follows the booking link rule: it reads "Start a project" until a calendar link is added.
- **Maps.** The North West outline is traced from about eighty known coastal and county boundary points, so it is recognisably the region; the Preston view shows the Ribble running inland to Preston. They are stylised, as the spec asks, not surveyed.
- **Start a project moved to Phase 7.** Its confirmation screen recommends two Resources articles chosen by what the visitor picked, so it is built after Resources exists, rather than hard coding article titles that would go stale.
- **The protected routes inherit Albert Sans automatically.** They set `font-family: var(--font-geist)` inline. Rather than edit them, `--font-geist` now resolves to Albert Sans, so they pick up the new face with no change to their code.

## Needs Cameron

- [ ] **Read the copy I wrote for `/repair-and-retail`, `/clinics` and `/professional-services`**, and the trades questions and answers. It is all in one file, `lib/content/sectors.ts`, which can be edited in GitHub (open the file, press the pencil icon, commit).
- [ ] **Decide on the market price figures in two guides.** "How much does a website cost in the UK?" quotes market price bands, and "What is a website care plan?" quotes typical monthly care costs (including £25 to £60 a month for a brochure site, below your £190 Care price). They are framed as what you see in quotes clients bring, but they have no external source, which the spec's article rules ask for. I kept them because the articles do not work without them. To change them, edit `content/resources/website-cost-uk.mdx` and `content/resources/website-care-plans.mdx` in GitHub (open the file, press the pencil icon, commit).

## Values to confirm

All in `lib/pricing.ts`, the single place every price and timeline on the site comes from.

| Value | Where it shows |
| --- | --- |
| Websites £1,500 to £4,000 | Websites, Pricing, estimator, start form budget options |
| Systems from £3,000 | Systems, Pricing |
| Care £190 a month, Care Plus £290 a month | Care, Pricing, Websites, estimator |
| Systems Care "Agreed per system" | Care |
| Websites live in two to six weeks | Websites |
| Payment: "A deposit to begin each phase, the balance when you sign it off." | Pricing |
| Care allowances written neutrally: "Small content changes", "Monthly improvement time" | Care |
| Notice period written as "Plans run month to month." | Care |
| Discovery "credited against the build if you go ahead" (no figure) | Systems |

Estimator ranges (low to high, added together, then held inside £1,500 to £4,000 with at least £300 between the ends):

| Choice | Adds |
| --- | --- |
| Up to 5 pages | £1,500 to £1,900 |
| 6 to 12 pages | £1,900 to £2,600 |
| 13 pages or more | £2,600 to £3,200 |
| Take bookings | £150 to £250 |
| Collect quote requests | £100 to £150 |
| Sell products | £300 to £450 |
| Show live stock | £200 to £300 |
| Publish news or guides | £50 to £100 |
| We would like help with the words | £150 to £250 |

The smallest site comes out at £1,500 to £1,900; everything selected comes out at £3,550 to £4,000.

## Test results

(filled in by Phases 7 and 9)

## Open issues

None yet.

## How to preview

(filled in at the end)
