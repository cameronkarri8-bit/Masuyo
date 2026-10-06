# Redesign progress

Branch: `redesign-oct-2026`. Never pushed to `main`, never merged. Coolify deploys
`main` automatically, so a half built site must not reach it.

Source documents, kept in the repo so a restarted session can re-read them:

- `docs/redesign/masuyo-website-copy-spec.md` (words, structure, behaviour)
- `docs/redesign/masuyo-brand-guidelines.pdf` (everything visual, 10 pages)

If a session restarts: read this file and `git log --oneline`, then continue from
the first phase that is not `done`. Do not redo finished work.

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Orientation, branch, baseline checks | done |
| 1 | Design system, base components, nav, footer, closing band | done |
| 2 | Brand assets: wordmark, monogram, PNGs, favicons, OG image, icons, illustrations, diagrams | done (page diagrams are drawn in Phase 3 with the pen kit, next to the pages that use them) |
| 3 | Core pages: home, websites, systems, care, pricing and estimator, start, approach, work, case study | done, except /start, which moved to Phase 7 (its confirmation screen recommends Resources articles, so it is built after Phase 4) |
| 4 | Resources hub, article template, article migration | done |
| 5 | Landing pages: Preston, four sectors, CIC and lifestyle venues restyle | done (venue form moves to the server action in Phase 7) |
| 6 | Brand page and asset zip | done |
| 7 | Start page and form UI, server action, Resend, Formspree fallback, spam protection, tests | done (live send not possible from this environment: no key, and formspree.io and api.resend.com are blocked) |
| 8 | Redirects, SEO, sitemap, robots, llms.txt, 404, cleanup | done |
| 9 | Quality pass: Playwright, content, axe, keyboard, brand, visual, performance | not started |
| 10 | Report and pull request | not started |

## Checks each phase must pass before its commit

`npm run build`, `npm run lint`, `npx tsc --noEmit`. From Phase 7 also `npm test`
(Vitest) and `npx playwright test` (needs a build; set PLAYWRIGHT_CHROMIUM_PATH
here to /opt/pw-browsers/chromium-1194/chrome-linux/chrome).

## Notes for a restarted session

- The branch has no upstream. Always push with `git push -u origin redesign-oct-2026`.
- Protected routes, do not edit: `/diogenes-proposal`, `/northcote-proposal`,
  `/frozen-computers`, `lib/proposals.ts`, `components/proposal/*`,
  `components/frozen/*`. They depend on `var(--font-geist)`, `LogoFullWhite`,
  `RevealAnimation`, the `.reveal` classes and the `.dgp-*` and `.fc-*` CSS
  blocks in `globals.css`, all of which must survive the redesign.
- Wordmark and monogram SVGs were generated in Phase 1 (the nav needs them) by
  `scripts/brand/build_logo.py`. Phase 2 adds the PNG exports, favicons, OG
  image, icons and illustrations.
- Brand asset pipeline: `python3 -I scripts/brand/build_logo.py`,
  `build_icons.py` and `build_og.py` write SVGs and TS modules (needs
  `pip install fonttools uharfbuzz`); `npm run brand:png` renders every PNG,
  the favicons and the share card from those SVGs with resvg; `npm run
  brand:zip` packages the downloads.
- `lib/brand/pen.ts` is the hand drawn kit for illustrations and diagrams.
- QA helpers live outside the repo in the session scratchpad. A reference build
  of `main` can be served on :3001 from a git worktree for before and after
  comparisons of the protected routes.
- `api.resend.com` and `formspree.io` are blocked by this environment's network
  policy, and no `RESEND_API_KEY` is set here, so the live email test cannot run
  from the build environment.
