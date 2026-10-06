# Masuyo redesign report

## Status

**Complete,** with one thing I could not do from the build environment: send a real email through the live form. Everything is built, tested and on the `redesign-oct-2026` branch. `main` is untouched, so nothing is live until you merge.

The most important item left under Needs Cameron is **one real test of the live form** on the deployed site. The privacy policy has been corrected.

## What changed

| Page or system | What changed |
| --- | --- |
| Brand foundations | Albert Sans, the six brand colours, the type scale, buttons, links, cards, pills, the highlighter and all twelve pen marks, built from the guidelines |
| Navigation and footer | Six links and "Start a project"; petrol over a petrol hero, mist once scrolled; full screen mobile menu; deep footer with the tagline |
| Logo and icons | Wordmark and monogram rebuilt from Albert Sans outlines and matched to the guide; twelve icons redrawn as SVG; three spot illustrations; favicon, app icon and a new share card |
| Home | Rebuilt to the spec, with the enquiry journey, before and after, and Masuyo's own CRM as recent work |
| Websites, Systems, Care | Rebuilt to the spec, each with its diagrams, questions and the closing band |
| Pricing | Rebuilt, with the website estimator; every price comes from one file |
| Start a project (`/start`) | New form page replacing Contact and the old estimator page |
| Approach (`/approach`) | Replaces About, with a map of the North West and the tagline as its closing line |
| Work (`/work`) | New; shows only real work, which today is Masuyo's own CRM |
| Frozen Computers case study | Built at `/work/frozen-computers` but unpublished: not linked, not indexed, not in the sitemap |
| Resources | One searchable hub replacing Blog, Guides, Glossary and FAQ; all nine articles migrated at their old slugs |
| Web design in Preston | Rewritten to the spec at the same URL |
| Sector pages | New: `/trades`, `/repair-and-retail`, `/clinics`, `/professional-services` |
| Brand page (`/brand`) | New media pack with every logo, the monogram, colours, type, icons and boilerplate to download or copy |
| Contact form | Server action, Resend to hello@, copy to the visitor, Formspree fallback, honeypot and time check |
| CIC and lifestyle venue pages | Kept and restyled, words unchanged, taken out of the nav and footer |
| Privacy and terms | Restyled with a contents list; "digital agency" now "technology company"; text otherwise unchanged |
| 404 page | New, from the spec |
| Redirects | 52 permanent redirects; every old URL lands on the page that now covers it |
| SEO | Spec titles and descriptions, canonicals, Open Graph, Organization data, a new sitemap, `/llms.txt` |
| Removed | Every old page, unused components and data, the unused Sanity setup, the Geist font and eight unused packages |
| Tests | 218 automated tests: form, routes, redirects, content, accessibility, keyboard, brand rules and performance |

## Decisions I made

Where the brief, the guide and the spec were unclear or disagreed, this is what I chose and why.

**Brand and visuals**

- **The wordmark and monogram are measured from the guide.** The wordmark is Albert Sans Extra Bold with the guide's minus 4% tracking (measured on the cover); my monogram matches the guide's tile to within anti-aliased edges.
- **Section title dots are aqua on light grounds,** as every title in the guide shows. A dot is not text, a button or a background, so it does not break the aqua rule.
- **Filled pill tags are petrol on light grounds.** The guide shows an aqua pill on paper, but the brief allows only two aqua exceptions, so aqua pills appear on petrol only.
- **Aqua stays off light grounds in every diagram.** Light diagrams use petrol lines and highlight with a petrol fill or the highlighter.
- **Illustrations come in light and dark versions.** "Going live" sits on aqua in the guide, which would be an aqua background on a mist page.
- **The footer is deep, not petrol,** so it does not merge with the petrol closing band above it.
- **The nav is petrol over a petrol hero** and mist once you scroll past it, so the two read as one band, as the guide's website mock up shows.
- **Section headings are 48px on desktop and 32px on phones,** using both of the guide's heading sizes. Hero headlines beside a picture are set at 72px, the bottom of the display range, so they stay on two or three lines.
- **Questions keep their question mark** rather than taking the dot.
- **Icons use the guide's stated 2.4 line,** not the heavier look of the blurry raster icons in the PDF.
- **The share card is the guide's cover** at 1200 by 630, as a static image with outlined type.

**Copy and facts**

- **"Most chosen" became "Recommended"** on Care Plus, because "most chosen" is a claim with no data behind it yet. It is one word in `lib/pricing.ts`.
- **I wrote copy for three sector pages.** The spec gives only the heading and lifecycle stages for repair and retail, clinics and professional services. I built every other line from things the site already says, with no prices, figures or client claims. Every answer to a sector question restates an answer from another page.
- **I wrote three form error messages** the spec does not give (business name, needs, team size) in its "say what to do" style.
- **Article edits were removals, never additions:** the "aesthetics clinics" client claim, the unsourced £4,500 CIC price, an FAQ whose whole answer was an unsourced conversion rate, and unsourced figures in the tech article and glossary. "See our pricing page" lines now state the published prices.
- **One factual correction:** the glossary named First Input Delay as a Core Web Vital; Google replaced it with Interaction to Next Paint in March 2024.
- **Articles carry the byline the spec asks for** ("By Cameron Karri"), with Cameron as author in the article schema.
- **Two old FAQ answers that are still true moved onto Websites.** The rest described the old offer (a £249 starter site, paid ads, retainers) or are answered by the new pages.
- **The Approach "[number] years" sentence** now reads "I've spent years in digital marketing and web development".
- **Brackets were never published.** Location, measured result and quote are simply omitted from the case study while empty.

**Pages and structure**

- **Home "Recent work" uses the spec's fallback,** Masuyo's own CRM, shown as a pen drawing of a pipeline board rather than a mocked screenshot.
- **The Masuyo card on Work links to the Systems page,** because there is no case study page for the in house CRM.
- **The nine old checklist pages under `/resources` were retired, not migrated.** They were bullet lists, mostly off the new positioning; each redirects to the closest guide or the hub.
- **CIC page:** a visible photo placeholder became an illustration, counting stats became static (the spec says nothing counts), and a button to a section that did not exist was removed.
- **CIC and lifestyle venue pages are out of the sitemap** as well as the nav, pending your decision.
- **`/llms.txt` is generated** from the price list and article list instead of being a static file, so it can never quote an old price. The old one still said "Websites from £249".
- **Organization data says Leyland, Lancashire,** as the spec does; the old schema said Hertford.
- **Start a project was built in Phase 7,** after Resources, because its confirmation screen recommends articles.

**Forms**

- **No time on page means a visible "That didn't send",** not a silent drop, so a real person without JavaScript is never quietly lost. Bots (honeypot filled, or sent too fast) are dropped silently, as asked.
- **The visitor's copy is best effort:** if the brief reaches hello@ but the copy fails, the visitor still sees the confirmation.
- **Browser tests use a mock outbox** switched on only by `FORMS_TRANSPORT=mock`, so tests never send anything.

**Engineering**

- **The proposal and concept routes are untouched.** They keep their old logo, white ground and 16px text, and pick up Albert Sans automatically. Checked against a build of `main` at every stage: structurally identical.
- **ESLint had no config,** so `npm run lint` could never pass. I added the standard Next config and fixed the one error it found.
- **Source documents are stored in `docs/redesign/`,** so the work can be resumed from the repository alone. Nothing there is served.

## Needs Cameron

- [x] **Privacy policy corrected.** It now says the site uses Umami, which sets no cookies; Google Analytics and analytics cookies are gone; and contact forms are sent by Resend with Formspree as a backup. The only cookies mentioned are the essential ones that keep you signed in to a password protected client page. The rest of the wording is unchanged and the date is now 6 October 2026. The terms still describe the old services in places and are worth a read.
- [ ] **Test the live form once deployed.** In Coolify, open the site's Environment Variables and check `RESEND_API_KEY` is set (the same key the Diogenes questionnaire uses). Submit the form at `/start` with your own email address. hello@masuyodigital.com should receive "New brief: ...", and your address "Your brief is with us". If Resend is not set up, the brief arrives through Formspree instead: check form xlgpogqk in the Formspree dashboard.
- [ ] **Confirm the prices and timelines** in the table below. To change one, edit `lib/pricing.ts` in GitHub; the whole site updates from that one file.
- [ ] **Read the copy I wrote** for `/repair-and-retail`, `/clinics` and `/professional-services`, and the trades questions. All of it is in `lib/content/sectors.ts`.
- [ ] **Decide on the market price figures in two guides.** "How much does a website cost in the UK?" and "What is a website care plan?" quote market bands (including £25 to £60 a month for brochure site care, below your £190 Care). They have no external source, which the spec's article rules ask for. I kept them because the articles do not work without them.
- [ ] **Send a photo of yourself** for the Approach page. Until then it shows the "At the desk" illustration.
- [ ] **Send a real screenshot of the Masuyo CRM** to replace the pipeline drawing on Home, Systems and Work.
- [ ] **Frozen Computers case study:** once the project is live and Nathan approves the page, send me the location, a measured result and an approved quote (or leave any of them out), and set `published: true` in `lib/work.ts`. That adds it to Work, the sitemap and search, and the home page can then feature it.
- [ ] **Booking link:** when you have a calendar, put its address in `BOOKING_URL` in `lib/site.ts`. "Book a 20 minute call" then appears on Start a project and the CIC page.
- [ ] **Decide on `/industries/community-interest-companies` and `/lifestyle-venues`.** Both still work and their forms send, but they are out of the nav, the footer and the sitemap.
- [ ] **Care Plus label:** if it really is the most chosen plan, change "Recommended" back to "Most chosen" in `lib/pricing.ts`.
- [ ] **Email signature:** the images in `public/email/` are the old logo and were left alone as asked. New logos are on `/brand` if you want to update your signature.
- [ ] **Social profiles:** add them to `sameAs` in `app/layout.tsx` when they exist, so search engines connect them to Masuyo.
- [ ] **Optional tidy in Coolify:** the `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` build arguments are no longer used and can be deleted.
- [ ] **Review and merge** the pull request on GitHub when you are happy. Coolify deploys `main`, so merging is what puts the new site live.

## Values to confirm

Everything lives in `lib/pricing.ts`.

| Value | Where it shows |
| --- | --- |
| Websites £1,500 to £4,000 | Websites, Pricing, estimator, start form budget options |
| Systems from £3,000 | Systems, Pricing |
| Care £190 a month, Care Plus £290 a month | Care, Pricing, Websites, estimator |
| Systems Care "Agreed per system" | Care |
| Websites live in two to six weeks | Websites, trades questions |
| Payment: "A deposit to begin each phase, the balance when you sign it off." | Pricing |
| Care allowances written neutrally: "Small content changes", "Monthly improvement time" | Care |
| Notice period written as "Plans run month to month." | Care |
| Discovery "credited against the build if you go ahead" (no figure) | Systems |

Estimator ranges, added together and then held inside £1,500 to £4,000 with at least £300 between the ends (tested across all 383 combinations):

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

**All 218 automated tests pass** (`npm test`, then `npx playwright test` after `npm run build`). Build, lint and type checks pass.

| Suite | Tests | What it proves |
| --- | --- | --- |
| Form, server action (Vitest) | 17 | Sends to hello@ with the visitor as reply to and every field; copy to the visitor; the spec's error messages; honeypot and too fast submissions dropped; Resend failure falls back to Formspree; both failing shows "That didn't send" |
| Form, in a browser | 6 | Fill and send shows the confirmation in place; errors with focus on the first; estimator prefill; venue form; the real fallback and failure paths |
| Routes and redirects | 37 | Every page 200; every sitemap entry 200; all 52 redirects 301 to the exact target; proposals and the concept still render |
| Content rules | 31 | No long dashes, placeholders, £249 or £349, VAT wording, "seamless" or "best in class" anywhere: visible text, hidden answers, metadata, alt text, structured data, llms.txt, the feed |
| Accessibility (axe) | 60 | Every page at 1440px and 390px, WCAG 2.2 AA: no serious or critical issues |
| Keyboard | 7 | Skip link, nav, mobile menu, accordions, estimator, checklist and the whole form without a mouse |
| Brand rules | 30 | No letter spacing outside display type; aqua never text or a fill on a light ground; sentence case; the dot on section titles; at most two pen marks per section |
| Performance | 30 | Layout shift under 0.05 on every page; no image outside next/image; fonts self hosted |

Every page was also reviewed by eye at 390px and 1440px against the guide, and the issues found were fixed.

**Live email test: not sent.** There is no `RESEND_API_KEY` in the build environment, and the environment's network policy blocks both `api.resend.com` and `formspree.io`. I tried one live POST to Formspree with the message "Test submission from the redesign build. Safe to delete." and it was refused before it left (the gateway answered 403). No email was delivered by me. The live check is the second item under Needs Cameron. If you want the build environment to be able to send in future, add those two hosts under Network access, Allowed domains, in the cloud environment's settings.

## Open issues

None. Nothing was left unsolved after two attempts. The only item I could not complete is the live email test above, which needs either the deployed site or a change to the build environment's network settings.

## How to preview

I can see no preview deployment for this branch. Two ways to see it before merging:

- **Coolify preview deployments:** in Coolify, open the site's application, then Preview Deployments, and enable them for pull requests. The pull request for this branch then gets its own preview address, and `RESEND_API_KEY` can be set for previews so the form test can run there.
- **A temporary Coolify resource:** add a new application from the same GitHub repository, set the branch to `redesign-oct-2026`, copy the environment variables across, and deploy. Delete it once you have merged.
