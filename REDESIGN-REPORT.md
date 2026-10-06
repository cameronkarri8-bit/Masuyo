# Masuyo redesign report

Status: in progress. This file is completed in Phase 10 and becomes the pull request description.

## What changed

(filled in as each phase lands)

## Decisions I made

- **ESLint had no config, so `npm run lint` could never pass.** `next lint` stopped at an interactive "how would you like to configure ESLint" prompt. I added `.eslintrc.json` extending `next/core-web-vitals`, the Next default. It found one pre-existing error (an unescaped apostrophe on a page this redesign deletes), which I fixed so every phase starts green.
- **Source documents are stored in the repo** at `docs/redesign/`, so the build can be resumed from the repository alone. Nothing in `docs/` is served by the site.
- **Section title dots are aqua on light grounds.** The brief says aqua never appears as text, buttons or backgrounds on light grounds. Every section title in the brand guide ("Who we are.", "Logo.", "Our services.") ends in an aqua dot on mist. A dot is none of the three forbidden things, and the guide shows it on every page, so the full stop at the end of a section title is aqua. The wordmark's own dot follows its separate rule: petrol on light grounds.
- **Pill tags on light grounds are petrol, not aqua.** Page 10 of the guide shows an aqua "Fixed price" pill on a paper panel, but the brief lists only two exceptions to the aqua rule (icon fill and the highlighter), and the brief outranks the guide. So the filled pill is aqua with deep text on petrol grounds, and petrol with paper text on light grounds. The outlined pill is unchanged.
- **The proposal and concept routes keep their existing logo.** They import `LogoFullWhite`, which the brief puts out of scope. The new site uses a new wordmark component, and `LogoFullWhite` stays exactly as it was so nothing about a page a client is reading changes.
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
