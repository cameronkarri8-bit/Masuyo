# Masuyo redesign report

Status: in progress. This file is completed in Phase 10 and becomes the pull request description.

## What changed

- **Design system.** Albert Sans via next/font (Geist removed from the layout). The six brand colours, the type scale as fluid clamps, radii and motion in `tailwind.config.ts`. Base components: buttons (primary and secondary, light and dark grounds), text link, section title with the dot, eyebrow, card, tag pill, highlighter, all twelve pen marks, section grounds, entrance motion, accordion and checklist.
- **Navigation.** Six links and one button, fixed at 72px, with the hand drawn underline on the current page and a full screen mobile panel (focus trapped, closes on Escape, returns focus).
- **Footer and closing band** rebuilt from the copy spec.
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
- **The protected routes inherit Albert Sans automatically.** They set `font-family: var(--font-geist)` inline. Rather than edit them, `--font-geist` now resolves to Albert Sans, so they pick up the new face with no change to their code.

## Needs Cameron

(filled in as each phase lands)

## Values to confirm

(filled in when `lib/pricing.ts` is rewritten)

## Test results

(filled in by Phases 7 and 9)

## Open issues

None yet.

## How to preview

(filled in at the end)
