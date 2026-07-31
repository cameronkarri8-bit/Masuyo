# Masuyo Digital — Complete Codebase Reference

A single-file dump of the entire `masuyodigital.com` website build: every source
file, every configuration file, plus the architecture, routing, design system,
data layer and deployment notes needed to understand or rebuild it.

| | |
|---|---|
| **Repository** | `cameronkarri8-bit/Masuyo` |
| **Branch** | `claude/masuyodigital-full-codebase-md-acz59i` |
| **Commit** | `47f9995` (`47f999533f26a936de704a9b9f3430d6de7dcf9e`) |
| **Commit date** | 2026-06-26 |
| **Commits on branch** | 47 |
| **Files in repository** | 101 |
| **Source files reproduced in full** | 100 |
| **Total lines of source** | 14,433 |
| **Document generated** | 2026-07-31 |

### How to read this document

- **Part 1** — what the project is, the stack, the dependencies and the design system.
- **Part 2** — architecture: directory tree, full route map, data layer, components, auth, environment and deployment.
- **Part 3** — an index of every file, linking into Part 4.
- **Part 4** — the complete source of every file, in fenced code blocks, grouped by directory.

One file is referenced but not reproduced: `package-lock.json` (697 KB of
machine-generated dependency resolution). Every direct dependency and its
resolved version is tabulated below instead. Everything else in the repository —
including all configuration, dotfiles and the empty `public/.gitkeep` — appears
in full.

---

# Part 1 — Project overview

## What this is

Masuyo Digital is a UK full-service digital agency. This repository is the
agency's public marketing website: a **content-heavy, mostly-static Next.js 14
App Router site** of ~55 routes covering services, technology, marketing,
industries, products, pricing, resources, a blog, legal pages and lead-capture
forms.

The site is built around three ideas:

1. **Static-first.** Almost every page is a React Server Component with content
   written directly into the file as TSX. There is no CMS dependency for the
   marketing pages — they compile to static HTML at build time.
2. **One CMS surface.** Only the blog reads from an external CMS (Sanity), and
   even that falls back to hard-coded posts so the site never breaks if Sanity
   is unreachable.
3. **A tight design system.** A six-colour palette, two typefaces and one
   scroll-reveal primitive are applied consistently across all ~55 pages, with
   styling split between Tailwind utility classes and inline CSS custom
   properties.

Alongside the public site there is one **private, password-gated client
proposal** at `/diogenes-proposal`, which has its own chrome (no site nav or
footer), a cookie-based auth gate and a questionnaire that emails responses via
Resend.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2.5, App Router, React 18 |
| Language | TypeScript 5 (`strict: true`) |
| Styling | Tailwind CSS 3.4 + CSS custom properties in `app/globals.css` |
| Fonts | Poppins (headings, via `next/font/google`), Geist (body, via Google Fonts `@import`) |
| CMS | Sanity v3 (`next-sanity`, `@portabletext/react`) — blog only |
| Transactional email | Resend (`resend`) — proposal questionnaire only |
| Rendering | RSC by default; 14 files opt into `'use client'` |
| Revalidation | ISR at 60s on blog routes; everything else fully static |
| Images | `next/image` with remote patterns for `masuyodigital.com` and `cdn.sanity.io` |
| Build output | `output: 'standalone'` |
| Container | Multi-stage `node:20-alpine` Dockerfile, non-root runtime user |
| Linting | `eslint-config-next` |

There is **no test suite, no CI configuration and no README** in the repository.

## Dependencies

Declared in `package.json`, resolved versions taken from `package-lock.json`.

| Package | Range | Resolved |
|---|---|---|
| `@portabletext/react` | `^3.1.0` | `3.2.4` |
| `@sanity/client` | `^6.19.1` | `6.29.1` |
| `@sanity/image-url` | `^1.0.2` | `1.2.0` |
| `@types/node` | `^20` | `20.19.39` |
| `@types/react` | `^18` | `18.3.28` |
| `@types/react-dom` | `^18` | `18.3.7` |
| `autoprefixer` | `^10.0.1` | `10.5.0` |
| `eslint` | `^8` | `8.57.1` |
| `eslint-config-next` | `14.2.5` | `14.2.5` |
| `next` | `14.2.5` | `14.2.5` |
| `next-sanity` | `^9.4.2` | `9.12.3` |
| `postcss` | `^8` | `8.5.9` |
| `react` | `^18` | `18.3.1` |
| `react-dom` | `^18` | `18.3.1` |
| `resend` | `^6.14.0` | `6.14.0` |
| `sanity` | `^3.45.0` | `3.99.0` |
| `tailwindcss` | `^3.4.1` | `3.4.19` |
| `typescript` | `^5` | `5.9.3` |

## Design system

### Colour palette

Defined twice — as Tailwind theme colours in `tailwind.config.ts` and as CSS
custom properties on `:root` in `app/globals.css` — so both `bg-navy` and
`style={{ background: 'var(--navy)' }}` work. The codebase uses both, often in
the same component.

| Token | Hex | Role |
|---|---|---|
| `navy` | `#1A2939` | Primary dark — hero backgrounds, CTA bands, footer |
| `blue` | `#35ADDF` | Accent — buttons, links, highlights |
| `blue2` | `#1d96cb` | Accent hover/darker variant |
| `ink` | `#111318` | Body and heading text |
| `mid` | `#6b7280` | Secondary/muted text |
| `light` | `#f5f4f2` | Warm off-white section backgrounds |
| `border` | `#e5e3df` | Hairline borders (cards use `1px solid var(--border)`) |
| `white` | `#ffffff` | Page background |

### Typography

- **Headings** — Poppins, loaded through `next/font/google` at weights
  400/500/600/700/800, exposed as the CSS variable `--font-poppins` and the
  Tailwind family `font-poppins`. Applied globally to `h1`–`h6`.
- **Body** — Geist, loaded via a Google Fonts `@import` at the top of
  `globals.css`, set on `body` and applied inline throughout as
  `fontFamily: 'Geist, sans-serif'`.

The Tailwind type scale is **deliberately shifted up one step** from the
default for accessibility — `sm` is 16px (not 14px), `base` is 18px (not 16px),
`lg` is 20px. `xs` (12px) is reserved for decorative labels only. Body copy has
a 16px floor set on `body`.

### Reusable CSS primitives (`app/globals.css`)

| Class | Purpose |
|---|---|
| `.crosshatch-bg` | Navy background with a layered repeating-linear-gradient grid — the signature hero texture |
| `.reveal` / `.reveal.visible` | Scroll-reveal: 24px translate + fade, 0.6s ease |
| `.reveal-delay-1` … `-4` | 0.1s–0.4s stagger delays |
| `.prose-content` | Portable Text / long-form typography (h2, h3, p, ul, ol, a, blockquote) |
| `.nav-dropdown` / `.nav-dropdown-trigger` | Hover- and focus-within-driven mega-menu reveal |
| `.accordion-content` / `.open` | Max-height accordion transition (FAQ pages) |

`html { scroll-behavior: smooth }` is set globally.

---

# Part 2 — Architecture

## Directory tree

```
Masuyo/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── tech-solutions-for-small-businesses/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── diogenes-proposal/
│   │   ├── FadeIn.tsx
│   │   ├── PasswordGate.tsx
│   │   ├── ProposalContent.tsx
│   │   ├── ProposalShell.tsx
│   │   ├── QuestionnaireButton.tsx
│   │   ├── actions.ts
│   │   ├── page.tsx
│   │   └── session.ts
│   ├── faq/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── get-a-website/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── glossary/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── industries/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lifestyle-venues/
│   │   ├── VenueContactForm.tsx
│   │   └── page.tsx
│   ├── marketing/
│   │   ├── content/
│   │   │   └── page.tsx
│   │   ├── email-automation/
│   │   │   └── page.tsx
│   │   ├── lead-generation/
│   │   │   └── page.tsx
│   │   ├── paid-ads/
│   │   │   └── page.tsx
│   │   ├── seo/
│   │   │   └── page.tsx
│   │   ├── social/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── products/
│   │   ├── bespoke/
│   │   │   └── page.tsx
│   │   ├── client-portal/
│   │   │   └── page.tsx
│   │   ├── community-platform/
│   │   │   └── page.tsx
│   │   ├── crm-lead-management/
│   │   │   └── page.tsx
│   │   └── custom-learning-platform/
│   │       └── page.tsx
│   ├── resources/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   └── ResourceModal.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── services/
│   │   ├── automation/
│   │   │   └── page.tsx
│   │   ├── digital-marketing/
│   │   │   └── page.tsx
│   │   ├── hosting/
│   │   │   └── page.tsx
│   │   ├── lead-generation/
│   │   │   └── page.tsx
│   │   ├── technology-solutions/
│   │   │   └── page.tsx
│   │   ├── web-design/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── start-a-project/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── technology/
│   │   ├── ai-chatbots/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── page.tsx
│   │   ├── app-development/
│   │   │   └── page.tsx
│   │   ├── architecture/
│   │   │   └── page.tsx
│   │   ├── automation/
│   │   │   └── page.tsx
│   │   ├── community-platforms/
│   │   │   └── page.tsx
│   │   ├── crm/
│   │   │   └── page.tsx
│   │   ├── database/
│   │   │   └── page.tsx
│   │   ├── devops/
│   │   │   └── page.tsx
│   │   ├── ecommerce/
│   │   │   └── page.tsx
│   │   ├── gdpr-compliance/
│   │   │   └── page.tsx
│   │   ├── hosting/
│   │   │   └── page.tsx
│   │   ├── web-applications/
│   │   │   └── page.tsx
│   │   ├── web-development/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── robots.ts
├── components/
│   ├── CTABand.tsx
│   ├── Footer.tsx
│   ├── FooterWrapper.tsx
│   ├── LogoFull.tsx
│   ├── LogoFullWhite.tsx
│   ├── LogoIcon.tsx
│   ├── Nav.tsx
│   ├── NavWrapper.tsx
│   ├── RevealAnimation.tsx
│   └── ServiceCard.tsx
├── lib/
│   └── industries-data.ts
├── public/
│   └── .gitkeep
├── sanity/
│   ├── schema/
│   │   ├── index.ts
│   │   └── post.ts
│   ├── client.ts
│   ├── queries.ts
│   └── types.ts
├── .dockerignore
├── .env.local.example
├── .gitignore
├── Dockerfile
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Route map

All ~55 routes, produced by the App Router from `app/**/page.tsx`.

### Top level

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — the largest single page (~34 KB) |
| `/about` | `app/about/page.tsx` | |
| `/pricing` | `app/pricing/page.tsx` | |
| `/contact` | `app/contact/page.tsx` | Client component + `layout.tsx` for metadata |
| `/start-a-project` | `app/start-a-project/page.tsx` | Multi-step project brief form (~39 KB) |
| `/get-a-website` | `app/get-a-website/page.tsx` | Standalone landing page |
| `/faq` | `app/faq/page.tsx` | Accordion |
| `/glossary` | `app/glossary/page.tsx` | |
| `/resources` | `app/resources/page.tsx` | Downloadable guides with an email-gate modal |
| `/blog` | `app/blog/page.tsx` | Sanity + static fallback, ISR 60s |
| `/lifestyle-venues` | `app/lifestyle-venues/page.tsx` | Vertical landing page with its own contact form |
| `/privacy-policy`, `/terms` | | Legal |
| `/diogenes-proposal` | `app/diogenes-proposal/page.tsx` | **Password-gated**, excluded from nav, footer and robots |
| *(404)* | `app/not-found.tsx` | |

### Services — `/services/*`

`/services` plus six children: `web-design`, `digital-marketing`,
`technology-solutions`, `automation`, `lead-generation`, `hosting`.

### Technology — `/technology/*`

`/technology` plus fourteen children: `web-development`, `web-applications`,
`app-development`, `ecommerce`, `api`, `database`, `architecture`, `devops`,
`hosting`, `automation`, `ai-chatbots`, `crm`, `community-platforms`,
`gdpr-compliance`.

### Marketing — `/marketing/*`

`/marketing` plus six children: `seo`, `paid-ads`, `lead-generation`,
`email-automation`, `content`, `social`.

### Products — `/products/*`

Five product pages, no index route: `client-portal`, `crm-lead-management`,
`community-platform`, `custom-learning-platform`, `bespoke`.

### Dynamic routes

| Route | Source of params | Generation |
|---|---|---|
| `/industries/[slug]` | `lib/industries-data.ts` | `generateStaticParams()` over 13 industries; `generateMetadata()` per slug; `notFound()` on miss |
| `/blog/[slug]` | Sanity `allPostSlugsQuery` | `generateStaticParams()` + `revalidate = 60` |
| `/resources/[slug]` | `RESOURCES` array inside the page file | `generateStaticParams()` over non-premium resources |

`/blog/tech-solutions-for-small-businesses` also exists as a **hard-coded
static route** that shadows the dynamic `[slug]` route for that one post.

The 13 industry slugs: `ecommerce`, `healthcare`, `tradespeople`, `hospitality`,
`legal`, `education`, `finance`, `real-estate`, `fitness-wellness`,
`automotive`, `charity-non-profit`, `professional-services`,
`restaurants-food`.

## Rendering and data

- **Server Components by default.** Only 14 files carry `'use client'` — the nav
  and footer wrappers, `RevealAnimation`, the contact and venue forms, the
  resources modal, and the proposal components.
- **Static generation.** No page sets `export const dynamic`. Blog index and
  blog detail set `revalidate = 60` (ISR); everything else is fully static.
- **Three data sources:**
  1. **Inline TSX** — the overwhelming majority. Copy lives in the page file.
  2. **`lib/industries-data.ts`** — a typed `Industry[]` (slug, name, seoTitle,
     metaDescription, hero, problem, solutions[], benefits, cta) plus
     `getIndustryBySlug()`. Drives both `/industries` and `/industries/[slug]`.
  3. **Sanity** — blog posts only, via GROQ queries in `sanity/queries.ts`.

### Sanity layer

| File | Contents |
|---|---|
| `sanity/client.ts` | `createClient` — project ID and dataset from env, `apiVersion: '2024-01-01'`, `useCdn: true` |
| `sanity/queries.ts` | Four GROQ queries: `allPostsQuery`, `postBySlugQuery`, `latestPostsQuery` (3 most recent), `allPostSlugsQuery` |
| `sanity/schema/post.ts` | `post` document: title, slug, publishedAt, author, category, excerpt, featuredImage (hotspot + alt), body (Portable Text with h2/h3/blockquote, bold/italic/code, link annotation, inline images with alt + caption); preview shows author; ordered by `publishedAt desc` |
| `sanity/schema/index.ts` | Exports `schemaTypes = [post]` |
| `sanity/types.ts` | `SanityPost` TypeScript interface |

The Sanity client falls back to the literal string `'your-project-id'` when
`NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, and `/blog` merges in `staticPosts`,
so the blog renders even without a configured CMS.

## Shared components (`components/`)

| Component | Client? | Purpose |
|---|---|---|
| `Nav.tsx` | yes | Full desktop mega-menu + mobile drawer. The largest component (~21 KB); contains the canonical site navigation tree for services, technology, marketing, industries and products. |
| `NavWrapper.tsx` | yes | Reads `usePathname()` and renders `null` on `/diogenes-proposal*` — this is how the proposal page loses the site chrome. |
| `Footer.tsx` | — | Site footer. |
| `FooterWrapper.tsx` | yes | Same pathname suppression as `NavWrapper`. |
| `RevealAnimation.tsx` | yes | `IntersectionObserver` at `threshold: 0.1`, adds `.visible` once and unobserves. Takes `delay` 0–4 and a polymorphic `as` tag. The single animation primitive used site-wide. |
| `CTABand.tsx` | — | Navy call-to-action band with a decorative concentric-circle SVG. All four props default, so `<CTABand />` drops in anywhere. |
| `ServiceCard.tsx` | — | Bordered icon + title + description card, optional "Learn more" link. |
| `LogoFull.tsx`, `LogoFullWhite.tsx`, `LogoIcon.tsx` | — | Inline SVG brand marks (dark, light and icon-only). |

The root layout (`app/layout.tsx`) wires `NavWrapper` → `<main>{children}</main>`
→ `FooterWrapper`, sets the Poppins font variable on `<html>`, and defines the
site-wide metadata: `metadataBase`, a title template of `%s | Masuyo Digital`,
OpenGraph (`en_GB`, `/og-default.png` at 1200×630) and a
`summary_large_image` Twitter card.

## The gated proposal (`app/diogenes-proposal/`)

The one non-public area of the site, for a client named Diogenes Sun Club.

| File | Role |
|---|---|
| `page.tsx` | Reads the `dgp_session` cookie and renders either `PasswordGate` or the proposal |
| `PasswordGate.tsx` | Password form, posts to the `checkPassword` server action |
| `actions.ts` | `'use server'` — `checkPassword` and `submitQuestionnaire` |
| `session.ts` | `getSessionToken()` — HMAC-SHA256 of the constant `'dgp_session_v1'` keyed by the password |
| `ProposalShell.tsx` | Floating-panel layout with a progress-bar section nav |
| `ProposalContent.tsx` | The proposal itself — the largest file in the repo (~45 KB) |
| `QuestionnaireButton.tsx` | Sticky side tab opening a 7-question modal |
| `FadeIn.tsx` | Local reveal animation |

**Auth flow.** `checkPassword` compares the submitted value to
`DIOGENES_PROPOSAL_PASSWORD`. On success it sets `dgp_session` to the HMAC
token — `httpOnly`, `sameSite: 'strict'`, `secure` in production, 7-day
`maxAge`, scoped to `path: '/diogenes-proposal'` — then redirects. On failure
it redirects to `?err=1`. Because the token is a deterministic HMAC of the
password, a valid cookie is only forgeable by someone who already knows the
password, and rotating the password invalidates every existing session.

**Questionnaire flow.** `submitQuestionnaire` maps seven keyed answers
(`q2`–`q7`, `q9`) through a `QUESTION_LABELS` table, appends any `_detail` or
`_other` free-text, and sends a plain-text email through Resend from
`hello@masuyodigital.com` to the same address. It returns `{ ok: boolean }` and
logs Resend errors server-side rather than throwing.

The route is excluded from search engines by `app/robots.ts` and hidden from
site chrome by the two wrapper components.

## Environment variables

From `.env.local.example`:

| Variable | Required | Used by |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | for the blog | `sanity/client.ts`, Docker build arg |
| `NEXT_PUBLIC_SANITY_DATASET` | for the blog | `sanity/client.ts`, Docker build arg |
| `SANITY_API_TOKEN` | optional | Draft content (commented out in the example) |
| `DIOGENES_PROPOSAL_PASSWORD` | for `/diogenes-proposal` | `actions.ts`, `session.ts` |
| `RESEND_API_KEY` | for the questionnaire | `actions.ts` — sending domain must be verified in Resend |
| `NEXT_PUBLIC_SITE_URL` | optional | `app/robots.ts`, defaults to `https://masuyodigital.com` |

`NEXT_PUBLIC_SITE_URL` is used in code but is **not** listed in
`.env.local.example`.

## Build and deployment

```bash
npm install
npm run dev     # next dev
npm run build   # next build  → .next/standalone
npm run start   # next start
npm run lint    # next lint
```

Container build (`Dockerfile`), three stages on `node:20-alpine`:

1. **deps** — `apk add libc6-compat`, then `npm ci` from `package.json` + `package-lock.json`.
2. **builder** — copies `node_modules`, takes `NEXT_PUBLIC_SANITY_PROJECT_ID`
   and `NEXT_PUBLIC_SANITY_DATASET` as build args (they must be present at
   build time because they are inlined into the client bundle), runs
   `npm run build`.
3. **runner** — `NODE_ENV=production`, creates the `nextjs:nodejs` user
   (uid/gid 1001), copies `public/`, `.next/standalone` and `.next/static`,
   drops to the non-root user, exposes `3000`, binds `0.0.0.0`, runs
   `node server.js`.

`output: 'standalone'` in `next.config.js` is what produces the traced
`server.js` bundle the runner stage depends on.

`.dockerignore` excludes `.git`, `node_modules`, `.next` and all `.env*` files
from the build context.

## Observations

Things worth knowing before working in this codebase:

- **`app/robots.ts` advertises `/sitemap.xml`, but there is no `app/sitemap.ts`.**
  That URL currently 404s. Adding a `MetadataRoute.Sitemap` export would fix it.
- **`public/` is empty** apart from `.gitkeep`. The root layout references
  `/og-default.png` for OpenGraph and `next.config.js` whitelists
  `masuyodigital.com` as a remote image host — so social preview images and any
  other assets are expected to be served from elsewhere, not from this repo.
- **Content is duplicated across route trees.** `/services/web-design`,
  `/technology/web-development` and `/marketing/seo` overlap in subject matter;
  several sibling pages under `/technology` and `/marketing` are near-identical
  in structure at ~6.5 KB each. Changing a shared pattern means touching many
  files.
- **Styling is mixed.** Tailwind classes and inline `style={{ ... }}` with CSS
  variables are used interchangeably, sometimes on the same element. Fonts in
  particular are almost always applied inline rather than via the
  `font-poppins` / `font-geist` Tailwind families.
- **`/blog/tech-solutions-for-small-businesses` shadows the dynamic blog
  route.** If a Sanity post is ever published at that slug, the static file
  wins.
- **No tests, no CI, no README.**
- **`RevealAnimation` uses `@ts-expect-error`** for its polymorphic `as` prop —
  the one deliberate type escape hatch in the codebase.


---

# Part 3 — Full source index

Every file in the repository, in the order it appears below.


**Root configuration**

- [`.dockerignore`](#dockerignore)
- [`.env.local.example`](#envlocalexample)
- [`.gitignore`](#gitignore)
- [`Dockerfile`](#dockerfile)
- [`next.config.js`](#nextconfigjs)
- [`package-lock.json`](#package-lockjson)  *(contents omitted — see note)*
- [`package.json`](#packagejson)
- [`postcss.config.js`](#postcssconfigjs)
- [`tailwind.config.ts`](#tailwindconfigts)
- [`tsconfig.json`](#tsconfigjson)

**`lib/` — shared data modules**

- [`lib/industries-data.ts`](#libindustries-datats)

**`sanity/` — CMS client, schema and queries**

- [`sanity/client.ts`](#sanityclientts)
- [`sanity/queries.ts`](#sanityqueriests)
- [`sanity/schema/index.ts`](#sanityschemaindexts)
- [`sanity/schema/post.ts`](#sanityschemapostts)
- [`sanity/types.ts`](#sanitytypests)

**`components/` — shared React components**

- [`components/CTABand.tsx`](#componentsctabandtsx)
- [`components/Footer.tsx`](#componentsfootertsx)
- [`components/FooterWrapper.tsx`](#componentsfooterwrappertsx)
- [`components/LogoFull.tsx`](#componentslogofulltsx)
- [`components/LogoFullWhite.tsx`](#componentslogofullwhitetsx)
- [`components/LogoIcon.tsx`](#componentslogoicontsx)
- [`components/Nav.tsx`](#componentsnavtsx)
- [`components/NavWrapper.tsx`](#componentsnavwrappertsx)
- [`components/RevealAnimation.tsx`](#componentsrevealanimationtsx)
- [`components/ServiceCard.tsx`](#componentsservicecardtsx)

**`app/` — Next.js App Router (pages, layouts, route handlers)**

- [`app/globals.css`](#appglobalscss)
- [`app/icon.svg`](#appiconsvg)
- [`app/layout.tsx`](#applayouttsx)
- [`app/not-found.tsx`](#appnot-foundtsx)
- [`app/page.tsx`](#apppagetsx)
- [`app/robots.ts`](#approbotsts)
- [`app/about/page.tsx`](#appaboutpagetsx)
- [`app/blog/page.tsx`](#appblogpagetsx)
- [`app/contact/layout.tsx`](#appcontactlayouttsx)
- [`app/contact/page.tsx`](#appcontactpagetsx)
- [`app/diogenes-proposal/FadeIn.tsx`](#appdiogenes-proposalfadeintsx)
- [`app/diogenes-proposal/PasswordGate.tsx`](#appdiogenes-proposalpasswordgatetsx)
- [`app/diogenes-proposal/ProposalContent.tsx`](#appdiogenes-proposalproposalcontenttsx)
- [`app/diogenes-proposal/ProposalShell.tsx`](#appdiogenes-proposalproposalshelltsx)
- [`app/diogenes-proposal/QuestionnaireButton.tsx`](#appdiogenes-proposalquestionnairebuttontsx)
- [`app/diogenes-proposal/actions.ts`](#appdiogenes-proposalactionsts)
- [`app/diogenes-proposal/page.tsx`](#appdiogenes-proposalpagetsx)
- [`app/diogenes-proposal/session.ts`](#appdiogenes-proposalsessionts)
- [`app/faq/layout.tsx`](#appfaqlayouttsx)
- [`app/faq/page.tsx`](#appfaqpagetsx)
- [`app/get-a-website/layout.tsx`](#appget-a-websitelayouttsx)
- [`app/get-a-website/page.tsx`](#appget-a-websitepagetsx)
- [`app/glossary/layout.tsx`](#appglossarylayouttsx)
- [`app/glossary/page.tsx`](#appglossarypagetsx)
- [`app/industries/layout.tsx`](#appindustrieslayouttsx)
- [`app/industries/page.tsx`](#appindustriespagetsx)
- [`app/lifestyle-venues/VenueContactForm.tsx`](#applifestyle-venuesvenuecontactformtsx)
- [`app/lifestyle-venues/page.tsx`](#applifestyle-venuespagetsx)
- [`app/marketing/page.tsx`](#appmarketingpagetsx)
- [`app/pricing/page.tsx`](#apppricingpagetsx)
- [`app/privacy-policy/page.tsx`](#appprivacy-policypagetsx)
- [`app/resources/layout.tsx`](#appresourceslayouttsx)
- [`app/resources/page.tsx`](#appresourcespagetsx)
- [`app/services/page.tsx`](#appservicespagetsx)
- [`app/start-a-project/layout.tsx`](#appstart-a-projectlayouttsx)
- [`app/start-a-project/page.tsx`](#appstart-a-projectpagetsx)
- [`app/technology/page.tsx`](#apptechnologypagetsx)
- [`app/terms/page.tsx`](#apptermspagetsx)
- [`app/blog/[slug]/page.tsx`](#appblogslugpagetsx)
- [`app/blog/tech-solutions-for-small-businesses/page.tsx`](#appblogtech-solutions-for-small-businessespagetsx)
- [`app/industries/[slug]/page.tsx`](#appindustriesslugpagetsx)
- [`app/marketing/content/page.tsx`](#appmarketingcontentpagetsx)
- [`app/marketing/email-automation/page.tsx`](#appmarketingemail-automationpagetsx)
- [`app/marketing/lead-generation/page.tsx`](#appmarketinglead-generationpagetsx)
- [`app/marketing/paid-ads/page.tsx`](#appmarketingpaid-adspagetsx)
- [`app/marketing/seo/page.tsx`](#appmarketingseopagetsx)
- [`app/marketing/social/page.tsx`](#appmarketingsocialpagetsx)
- [`app/products/bespoke/page.tsx`](#appproductsbespokepagetsx)
- [`app/products/client-portal/page.tsx`](#appproductsclient-portalpagetsx)
- [`app/products/community-platform/page.tsx`](#appproductscommunity-platformpagetsx)
- [`app/products/crm-lead-management/page.tsx`](#appproductscrm-lead-managementpagetsx)
- [`app/products/custom-learning-platform/page.tsx`](#appproductscustom-learning-platformpagetsx)
- [`app/resources/[slug]/page.tsx`](#appresourcesslugpagetsx)
- [`app/resources/components/ResourceModal.tsx`](#appresourcescomponentsresourcemodaltsx)
- [`app/services/automation/page.tsx`](#appservicesautomationpagetsx)
- [`app/services/digital-marketing/page.tsx`](#appservicesdigital-marketingpagetsx)
- [`app/services/hosting/page.tsx`](#appserviceshostingpagetsx)
- [`app/services/lead-generation/page.tsx`](#appserviceslead-generationpagetsx)
- [`app/services/technology-solutions/page.tsx`](#appservicestechnology-solutionspagetsx)
- [`app/services/web-design/page.tsx`](#appservicesweb-designpagetsx)
- [`app/technology/ai-chatbots/page.tsx`](#apptechnologyai-chatbotspagetsx)
- [`app/technology/api/page.tsx`](#apptechnologyapipagetsx)
- [`app/technology/app-development/page.tsx`](#apptechnologyapp-developmentpagetsx)
- [`app/technology/architecture/page.tsx`](#apptechnologyarchitecturepagetsx)
- [`app/technology/automation/page.tsx`](#apptechnologyautomationpagetsx)
- [`app/technology/community-platforms/page.tsx`](#apptechnologycommunity-platformspagetsx)
- [`app/technology/crm/page.tsx`](#apptechnologycrmpagetsx)
- [`app/technology/database/page.tsx`](#apptechnologydatabasepagetsx)
- [`app/technology/devops/page.tsx`](#apptechnologydevopspagetsx)
- [`app/technology/ecommerce/page.tsx`](#apptechnologyecommercepagetsx)
- [`app/technology/gdpr-compliance/page.tsx`](#apptechnologygdpr-compliancepagetsx)
- [`app/technology/hosting/page.tsx`](#apptechnologyhostingpagetsx)
- [`app/technology/web-applications/page.tsx`](#apptechnologyweb-applicationspagetsx)
- [`app/technology/web-development/page.tsx`](#apptechnologyweb-developmentpagetsx)

**`public/` — static assets**

- [`public/.gitkeep`](#publicgitkeep)

---

# Part 4 — Complete source code


---

## Root configuration


### `.dockerignore`

<sub>12 lines</sub>

```text
.dockerignore
Dockerfile
.git
.gitignore
node_modules
.next
npm-debug.log
README.md
.env
.env.local
.env.development
.env.production
```


### `.env.local.example`

<sub>13 lines</sub>

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Optional: Sanity API token (for draft content)
# SANITY_API_TOKEN=your-sanity-api-token

# Diogenes proposal page password (protects /diogenes-proposal)
DIOGENES_PROPOSAL_PASSWORD=your-password-here

# Resend API key (for questionnaire email submission on /diogenes-proposal)
# Get your key from resend.com. The sending domain (masuyodigital.com) must be verified there.
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```


### `.gitignore`

<sub>36 lines</sub>

```gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```


### `Dockerfile`

<sub>47 lines</sub>

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```


### `next.config.js`

<sub>18 lines</sub>

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'masuyodigital.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
```


### `package-lock.json`

> **Contents omitted from this document.** `package-lock.json` is a 697 KB machine-generated file (~19,000 lines) that would more than quadruple the size of this document without adding readable information. It is committed in the repository and is regenerated by `npm install`. The resolved versions of every direct dependency are listed in *Part 1 — Dependencies* above.


### `package.json`

<sub>33 lines</sub>

```json
{
  "name": "masuyo-digital",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@portabletext/react": "^3.1.0",
    "@sanity/client": "^6.19.1",
    "@sanity/image-url": "^1.0.2",
    "next": "14.2.5",
    "next-sanity": "^9.4.2",
    "react": "^18",
    "react-dom": "^18",
    "resend": "^6.14.0",
    "sanity": "^3.45.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.5",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```


### `postcss.config.js`

<sub>6 lines</sub>

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```


### `tailwind.config.ts`

<sub>41 lines</sub>

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A2939',
        blue: '#35ADDF',
        blue2: '#1d96cb',
        ink: '#111318',
        mid: '#6b7280',
        light: '#f5f4f2',
        border: '#e5e3df',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.25rem' }],   // 12px – decorative labels only
        'sm':   ['1rem',     { lineHeight: '1.625rem' }],  // 16px (was 14px)
        'base': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px (was 16px)
        'lg':   ['1.25rem',  { lineHeight: '1.875rem' }],  // 20px (was 18px)
        'xl':   ['1.375rem', { lineHeight: '1.875rem' }],  // 22px
        '2xl':  ['1.625rem', { lineHeight: '2rem' }],      // 26px
        '3xl':  ['2rem',     { lineHeight: '2.25rem' }],   // 32px
        '4xl':  ['2.375rem', { lineHeight: '2.625rem' }],  // 38px
        '5xl':  ['3rem',     { lineHeight: '1' }],
        '6xl':  ['3.75rem',  { lineHeight: '1' }],
        '7xl':  ['4.5rem',   { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
export default config
```


### `tsconfig.json`

<sub>26 lines</sub>

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```


---

## `lib/` — shared data modules


### `lib/industries-data.ts`

<sub>161 lines</sub>

```ts
export interface Industry {
  slug: string
  name: string
  seoTitle: string
  metaDescription: string
  hero: string
  problem: string
  solutions: string[]
  benefits: string
  cta: string
}

export const industries: Industry[] = [
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    seoTitle: 'E-commerce Web Design & Digital Marketing | Masuyo Digital',
    metaDescription: 'We build high-converting e-commerce websites and run digital marketing campaigns that drive real sales. From Shopify to custom builds, we help online stores grow.',
    hero: 'Stop Losing Sales to a Website That Isn\'t Working Hard Enough',
    problem: 'Most e-commerce businesses are leaving money on the table. Slow load times, clunky checkout flows, poor mobile experience, and no real SEO strategy means traffic that never converts. You\'re paying for visitors who leave.',
    solutions: ['Custom e-commerce website design built around conversion', 'Mobile-first product pages that load fast and look sharp', 'SEO strategy targeting high-intent buying keywords', 'Paid ads (Google Shopping, Meta) managed to drive profitable sales', 'Abandoned cart and email automation to recover lost revenue', 'Analytics and reporting so you know exactly what\'s working'],
    benefits: 'More sales from the same traffic. Lower cost per acquisition. A site that works as hard as you do.',
    cta: 'Ready to grow your online store?',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    seoTitle: 'Healthcare Website Design & Digital Marketing | Masuyo Digital',
    metaDescription: 'Professional websites and digital marketing for healthcare providers, clinics, and private practices. Build trust, attract patients, and grow your practice online.',
    hero: 'Your Patients Are Searching Online. Are They Finding You?',
    problem: 'Healthcare providers rely on reputation and referrals, but increasingly patients search online first. An outdated website, no local SEO, and no clear booking journey means you\'re losing patients to competitors before they ever call.',
    solutions: ['Professional, trust-building website design for clinics and practices', 'Local SEO to rank for searches like "private GP near me" or "physio in [city]"', 'Online appointment booking integration', 'GDPR-compliant contact and enquiry forms', 'Content marketing to establish authority in your specialism', 'Google Ads for private healthcare services'],
    benefits: 'More patient enquiries. A professional online presence that builds trust before the first appointment.',
    cta: 'Let\'s grow your practice.',
  },
  {
    slug: 'tradespeople',
    name: 'Tradespeople',
    seoTitle: 'Websites & Lead Generation for Tradespeople | Masuyo Digital',
    metaDescription: 'We build websites and run lead generation campaigns for plumbers, electricians, builders, and other trades. Stop relying on word of mouth and start getting found online.',
    hero: 'Word of Mouth Is Great. A Steady Stream of Online Leads Is Better.',
    problem: 'Most tradespeople rely entirely on referrals, which means unpredictable work, slow months, and no control over your pipeline. When someone searches for a plumber, electrician, or builder in your area, you need to be the first name they see.',
    solutions: ['Fast, mobile-friendly trade websites built to convert visitors into calls', 'Local SEO to rank in Google for your trade and location', 'Google Business Profile setup and optimisation', 'Google Ads lead generation campaigns', 'Review and reputation management', 'Simple quote request forms that fill your diary'],
    benefits: 'Consistent leads every month. Less reliance on referrals. More control over your workload.',
    cta: 'Get more leads.',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    seoTitle: 'Hospitality Website Design & Digital Marketing | Masuyo Digital',
    metaDescription: 'We help hotels, B&Bs, and hospitality businesses attract more direct bookings through great website design, SEO, and digital marketing. Reduce OTA fees and own your guests.',
    hero: 'More Direct Bookings. Less Commission to OTAs.',
    problem: 'Hotels, B&Bs, and guesthouses hand over huge commission fees to Booking.com and Expedia because their own website does not convert. A poor booking experience, weak SEO, and no direct marketing strategy means you\'re dependent on platforms that eat your margin.',
    solutions: ['Hospitality website design with integrated direct booking', 'SEO to rank for location and property type searches', 'Google Ads targeting high-intent travel searches', 'Email marketing to past guests to drive repeat bookings', 'Social media content and management', 'Review strategy to build your reputation on Google and TripAdvisor'],
    benefits: 'Higher direct booking rate. Lower OTA dependence. Better margin on every stay.',
    cta: 'Start getting direct bookings.',
  },
  {
    slug: 'legal',
    name: 'Legal',
    seoTitle: 'Law Firm Website Design & Digital Marketing | Masuyo Digital',
    metaDescription: 'Professional website design and digital marketing for law firms and solicitors. Build authority, attract clients, and grow your practice with a digital presence that works.',
    hero: 'Your Clients Are Judging Your Firm Before They Pick Up the Phone.',
    problem: 'Prospective clients research law firms carefully before making contact. An outdated website, no clear practice area pages, and poor search visibility means you\'re losing high-value clients to firms that have invested in their digital presence.',
    solutions: ['Authoritative, professional website design for law firms and solicitors', 'Practice area pages optimised for high-value legal search terms', 'Local SEO for city and region-specific legal searches', 'Content marketing to establish expertise and improve rankings', 'GDPR-compliant enquiry and consultation booking forms', 'Reputation management and Google review strategy'],
    benefits: 'More qualified client enquiries. A website that reflects the quality of your practice. Better search visibility for your key services.',
    cta: 'Grow your practice online.',
  },
  {
    slug: 'education',
    name: 'Education',
    seoTitle: 'Education Website Design & Digital Marketing | Masuyo Digital',
    metaDescription: 'We build websites and run digital marketing campaigns for schools, colleges, training providers, and ed-tech businesses. Attract more students and grow enrolments.',
    hero: 'Attract More Students With a Digital Presence That Reflects Your Standard.',
    problem: 'Schools, colleges, and training providers often have outdated websites that fail to communicate their value, do not rank in search, and make it hard for prospective students to find course information or apply. In a competitive education market, your digital presence directly affects enrolment.',
    solutions: ['Modern, accessible education website design', 'Course and programme pages optimised for search', 'SEO targeting prospective student searches', 'Google and Meta Ads for enrolment campaigns', 'Automated enquiry and application workflows', 'Content marketing to build authority in your field'],
    benefits: 'More student enquiries and applications. A website that reflects the quality of your institution. Better visibility for your courses.',
    cta: 'Grow your enrolments.',
  },
  {
    slug: 'finance',
    name: 'Finance',
    seoTitle: 'Financial Services Website Design & Digital Marketing | Masuyo Digital',
    metaDescription: 'Professional websites and compliant digital marketing for financial advisers, accountants, and financial services firms. Build trust and attract high-quality clients.',
    hero: 'In Financial Services, Trust Is Everything. Your Website Needs to Reflect That.',
    problem: 'Clients choosing a financial adviser or accountant are making high-stakes decisions. A generic or outdated website undermines confidence before you\'ve even had a conversation. Poor search visibility means you\'re invisible to prospects actively looking for your services.',
    solutions: ['Professional, compliance-aware website design for financial services', 'SEO targeting high-intent financial service searches', 'Content marketing to demonstrate expertise and build trust', 'Local SEO for accountants and advisers serving specific areas', 'Lead generation campaigns with compliant ad copy', 'Secure, GDPR-compliant enquiry and consultation forms'],
    benefits: 'More qualified client enquiries. A website that builds trust from the first visit. Better visibility for your key services.',
    cta: 'Build your online presence.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    seoTitle: 'Real Estate & Property Website Design | Masuyo Digital',
    metaDescription: 'We build websites and run digital marketing for estate agents, property developers, and letting agencies. Generate more leads, sell more properties, and grow your brand.',
    hero: 'More Enquiries. More Viewings. More Completions.',
    problem: 'Estate agents and property developers compete in a crowded market where buyers and tenants start their search online. Without a fast, well-optimised website and a strong digital marketing strategy, you\'re losing leads to portals and competitors who\'ve invested in their presence.',
    solutions: ['Property website design with listing integration and search functionality', 'Local SEO to rank for area-specific property searches', 'Google and Meta Ads for buyer and tenant lead generation', 'Landing pages for new developments and off-plan sales', 'Email marketing to nurture your buyer and investor database', 'Social media content showcasing properties and local expertise'],
    benefits: 'More direct enquiries. Reduced portal dependency. A stronger brand in your local market.',
    cta: 'Generate more property leads.',
  },
  {
    slug: 'fitness-wellness',
    name: 'Fitness and Wellness',
    seoTitle: 'Fitness & Wellness Website Design & Marketing | Masuyo Digital',
    metaDescription: 'We help gyms, personal trainers, yoga studios, and wellness businesses grow online. More members, more bookings, more revenue through great digital marketing.',
    hero: 'Fill Your Classes, Grow Your Membership, Build Your Brand.',
    problem: 'Gyms, personal trainers, and wellness studios often rely on social media alone, with no real website, no SEO, and no system for converting visitors into paying members or clients. Social reach is unpredictable. A solid digital foundation is not.',
    solutions: ['Fitness and wellness website design with class booking integration', 'Local SEO to rank for gym, PT, and wellness searches in your area', 'Google and Meta Ads to drive membership sign-ups and bookings', 'Email and SMS automation to reduce churn and re-engage lapsed members', 'Social media content strategy and management', 'Landing pages for challenges, programmes, and promotions'],
    benefits: 'More members and bookings. Less reliance on social media algorithms. A digital presence that grows with your business.',
    cta: 'Grow your fitness business.',
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    seoTitle: 'Automotive Website Design & Digital Marketing | Masuyo Digital',
    metaDescription: 'We build websites and run digital marketing for car dealerships, garages, and automotive businesses. More enquiries, more bookings, more sales.',
    hero: 'More Forecourt Visits, More Service Bookings, More Sales.',
    problem: 'Automotive businesses live and die by footfall and bookings, but most are not investing in the digital channels that drive them. Poor local SEO, no paid search strategy, and a website that does not convert means you\'re leaving enquiries on the table every single day.',
    solutions: ['Automotive website design with stock listings and booking integration', 'Local SEO to rank for dealership, garage, and service searches', 'Google Ads for high-intent searches like "used cars near me" or "car service [city]"', 'Meta Ads for awareness and remarketing campaigns', 'Review strategy to build trust on Google and AutoTrader', 'Email marketing to your existing customer base for service reminders and promotions'],
    benefits: 'More qualified enquiries. Higher service booking rates. A stronger digital presence in your local market.',
    cta: 'Drive more business.',
  },
  {
    slug: 'charity-non-profit',
    name: 'Charity and Non-Profit',
    seoTitle: 'Charity & Non-Profit Website Design | Masuyo Digital',
    metaDescription: 'We build websites and digital strategies for charities and non-profits that drive donations, volunteers, and awareness. Making your mission visible online.',
    hero: 'Your Mission Deserves to Be Seen.',
    problem: 'Charities and non-profits often have limited budgets and outdated digital infrastructure that makes it hard to attract donors, volunteers, and supporters. A poorly designed website that does not tell your story clearly is costing you donations and impact.',
    solutions: ['Charity website design with donation integration and accessible design', 'SEO to increase visibility for your cause and services', 'Google Ad Grants management (up to $10,000/month in free Google Ads)', 'Content and storytelling strategy to connect with supporters', 'Email marketing for donor retention and campaign communications', 'Volunteer recruitment landing pages and forms'],
    benefits: 'More donations. More volunteers. Greater awareness of your cause. A digital presence worthy of your mission.',
    cta: 'Amplify your impact.',
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    seoTitle: 'Professional Services Website Design & Marketing | Masuyo Digital',
    metaDescription: 'We help consultants, agencies, and professional services firms build their digital presence, generate leads, and win more clients online.',
    hero: 'Win More Clients With a Digital Presence That Does the Work For You.',
    problem: 'Consultants and professional services firms often win business through relationships and referrals, but without a strong digital presence they\'re invisible to prospects who do not already know them. Your website should be your best salesperson, working around the clock.',
    solutions: ['Professional services website design that positions you as the expert', 'SEO to rank for your specialism and target market', 'Content marketing to demonstrate expertise and attract inbound leads', 'LinkedIn strategy and content for B2B lead generation', 'Lead magnet and email funnel setup', 'Case study and portfolio pages that convert visitors into enquiries'],
    benefits: 'More inbound leads. Less reliance on referrals. A digital presence that reflects the quality of your work.',
    cta: 'Start winning more clients.',
  },
  {
    slug: 'restaurants-food',
    name: 'Restaurants and Food',
    seoTitle: 'Restaurant Website Design & Digital Marketing | Masuyo Digital',
    metaDescription: 'We build websites and run digital marketing for restaurants, cafes, and food businesses. More covers, more orders, more loyal customers.',
    hero: 'More Covers, More Orders, More Loyal Customers.',
    problem: 'Restaurants and food businesses compete for attention every single day. Without a great website, strong local SEO, and an active digital presence, you\'re invisible to hungry customers searching online and losing covers to competitors who show up first.',
    solutions: ['Restaurant website design with menu, reservations, and online ordering', 'Local SEO to rank for food and cuisine searches in your area', 'Google Business Profile optimisation for map and search visibility', 'Meta Ads to promote events, offers, and new menu launches', 'Email marketing to your customer base for repeat visits', 'Review strategy to build your reputation on Google and TripAdvisor'],
    benefits: 'More reservations and orders. A stronger local presence. Customers who come back again and again.',
    cta: 'Fill more tables.',
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug)
}
```


---

## `sanity/` — CMS client, schema and queries


### `sanity/client.ts`

<sub>8 lines</sub>

```ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```


### `sanity/queries.ts`

<sub>57 lines</sub>

```ts
import { groq } from 'next-sanity'

// All posts for index page
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    author,
    category,
    excerpt,
    featuredImage {
      asset-> { url },
      alt
    }
  }
`

// Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    author,
    category,
    excerpt,
    featuredImage {
      asset-> { url },
      alt
    },
    body
  }
`

// Latest 3 posts (for sidebar or related)
export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    featuredImage {
      asset-> { url },
      alt
    }
  }
`

// All post slugs (for static generation)
export const allPostSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`
```


### `sanity/schema/index.ts`

<sub>3 lines</sub>

```ts
import post from './post'

export const schemaTypes = [post]
```


### `sanity/schema/post.ts`

<sub>133 lines</sub>

```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author ? `by ${author}` : '' }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
```


### `sanity/types.ts`

<sub>14 lines</sub>

```ts
export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  author?: string
  category?: string
  excerpt?: string
  featuredImage?: {
    asset: { url: string }
    alt?: string
  }
  body?: unknown[]
}
```


---

## `components/` — shared React components


### `components/CTABand.tsx`

<sub>61 lines</sub>

```tsx
import Link from 'next/link'
import RevealAnimation from './RevealAnimation'

interface CTABandProps {
  headline?: string
  body?: string
  buttonLabel?: string
  buttonHref?: string
}

export default function CTABand({
  headline = "Not sure where to start? That is fine.",
  body = "Most of our clients come to us with a rough idea of what they need. We help them figure out the rest.",
  buttonLabel = "Start a conversation",
  buttonHref = "/contact",
}: CTABandProps) {
  return (
    <section style={{ background: 'var(--navy)' }} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 320" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
          <circle cx="1440" cy="320" r="640" stroke="rgba(53,173,223,0.10)" strokeWidth="1" fill="none" />
          <circle cx="1440" cy="320" r="460" stroke="rgba(53,173,223,0.07)" strokeWidth="1" fill="none" />
          <circle cx="1440" cy="320" r="280" stroke="rgba(53,173,223,0.10)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="320" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
          <line x1="0" y1="80" x2="320" y2="0" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
          <circle cx="72" cy="260" r="3" fill="rgba(53,173,223,0.25)" />
          <circle cx="120" cy="220" r="2" fill="rgba(53,173,223,0.18)" />
          <circle cx="48" cy="300" r="1.5" fill="rgba(53,173,223,0.15)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <RevealAnimation>
          <h2
            className="text-3xl md:text-4xl font-semibold text-white mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {headline}
          </h2>
        </RevealAnimation>
        <RevealAnimation delay={1}>
          <p
            className="text-base mb-8 max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}
          >
            {body}
          </p>
        </RevealAnimation>
        <RevealAnimation delay={2}>
          <Link
            href={buttonHref}
            className="inline-block text-sm font-semibold text-white px-6 py-3 rounded transition-colors"
            style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
          >
            {buttonLabel}
          </Link>
        </RevealAnimation>
      </div>
    </section>
  )
}
```


### `components/Footer.tsx`

<sub>128 lines</sub>

```tsx
import Link from 'next/link'
import LogoFullWhite from '@/components/LogoFullWhite'

const serviceLinks = [
  { label: 'Web Design & Development', href: '/services/web-design' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Lead Generation', href: '/services/lead-generation' },
  { label: 'Technology Solutions', href: '/services/technology-solutions' },
  { label: 'Automation', href: '/services/automation' },
  { label: 'Hosting & Infrastructure', href: '/services/hosting' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Industries', href: '/industries' },
  { label: 'Get a Website', href: '/get-a-website' },
  { label: 'Start a Project', href: '/start-a-project' },
  { label: 'Contact', href: '/contact' },
]

const resourceLinks = [
  { label: 'Resource Hub', href: '/resources' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Glossary', href: '/glossary' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'var(--white)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <LogoFullWhite className="h-6 w-auto mb-4" />
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
              We build digital things that actually work.
            </p>
            <a
              href="mailto:hello@masuyodigital.com"
              className="text-sm transition-colors"
              style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
            >
              hello@masuyodigital.com
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Resources
            </h4>
            <ul className="flex flex-col gap-2">
              {resourceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
            &copy; {new Date().getFullYear()} Masuyo Digital. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Privacy Policy
            </Link>
            <Link href="/terms"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```


### `components/FooterWrapper.tsx`

<sub>10 lines</sub>

```tsx
'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  if (pathname.startsWith('/diogenes-proposal')) return null
  return <Footer />
}
```


### `components/LogoFull.tsx`

<sub>13 lines</sub>

```tsx
export default function LogoFull({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1041.97 161.39">
      <path fill="#1a2939" d="M121.93,158.71V56.84l-43.91,66.65h-.89L33.66,57.51v101.2H0V2.68h37l41.02,65.98L119.03,2.68h37v156.04h-34.11Z"/>
      <path fill="#1a2939" d="M422.88,160.94c-23.63,0-47.48-8.25-66.2-24.97l20.28-24.3c14.04,11.59,28.76,18.95,46.59,18.95,14.04,0,22.51-5.57,22.51-14.71v-.45c0-8.69-5.35-13.15-31.43-19.84-31.43-8.02-51.72-16.72-51.72-47.7v-.45c0-28.31,22.74-47.03,54.61-47.03,22.74,0,42.13,7.13,57.96,19.84l-17.83,25.86c-13.82-9.59-27.42-15.38-40.57-15.38s-20.06,6.02-20.06,13.6v.45c0,10.25,6.69,13.6,33.66,20.51,31.65,8.25,49.49,19.62,49.49,46.81v.45c0,30.99-23.63,48.37-57.29,48.37Z"/>
      <path fill="#1a2939" d="M575.13,161.17c-41.91,0-67.54-23.41-67.54-69.33V2.68h34.33v88.27c0,25.41,12.71,38.56,33.66,38.56s33.66-12.71,33.66-37.45V2.68h34.33v88.05c0,47.26-26.53,70.44-68.43,70.44Z"/>
      <path fill="#1a2939" d="M756.81,96.52v62.19h-34.33v-61.52L662.52,2.68h40.12l37.23,62.64,37.89-62.64h39.01l-59.96,93.85Z"/>
      <path fill="#1a2939" d="M900.59,161.39c-48.15,0-82.7-35.89-82.7-80.25v-.45c0-44.36,35-80.69,83.15-80.69s82.7,35.89,82.7,80.25v.45c0,44.36-35,80.69-83.15,80.69ZM947.85,80.69c0-26.75-19.62-49.04-47.26-49.04s-46.81,21.85-46.81,48.59v.45c0,26.75,19.62,49.04,47.26,49.04s46.81-21.84,46.81-48.59v-.45Z"/>
      <polygon fill="#1a2939" points="345.37 158.71 278.5 1.56 278.49 1.56 246.85 1.56 246.84 1.56 179.97 158.71 214.97 158.71 262.67 40.71 310.37 158.71 345.37 158.71"/>
      <circle fill="#35addf" cx="1018.23" cy="137.65" r="23.74"/>
    </svg>
  )
}
```


### `components/LogoFullWhite.tsx`

<sub>13 lines</sub>

```tsx
export default function LogoFullWhite({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1041.97 161.39">
      <path fill="#ffffff" d="M121.93,158.71V56.84l-43.91,66.65h-.89L33.66,57.51v101.2H0V2.68h37l41.02,65.98L119.03,2.68h37v156.04h-34.11Z"/>
      <path fill="#ffffff" d="M422.88,160.94c-23.63,0-47.48-8.25-66.2-24.97l20.28-24.3c14.04,11.59,28.76,18.95,46.59,18.95,14.04,0,22.51-5.57,22.51-14.71v-.45c0-8.69-5.35-13.15-31.43-19.84-31.43-8.02-51.72-16.72-51.72-47.7v-.45c0-28.31,22.74-47.03,54.61-47.03,22.74,0,42.13,7.13,57.96,19.84l-17.83,25.86c-13.82-9.59-27.42-15.38-40.57-15.38s-20.06,6.02-20.06,13.6v.45c0,10.25,6.69,13.6,33.66,20.51,31.65,8.25,49.49,19.62,49.49,46.81v.45c0,30.99-23.63,48.37-57.29,48.37Z"/>
      <path fill="#ffffff" d="M575.13,161.17c-41.91,0-67.54-23.41-67.54-69.33V2.68h34.33v88.27c0,25.41,12.71,38.56,33.66,38.56s33.66-12.71,33.66-37.45V2.68h34.33v88.05c0,47.26-26.53,70.44-68.43,70.44Z"/>
      <path fill="#ffffff" d="M756.81,96.52v62.19h-34.33v-61.52L662.52,2.68h40.12l37.23,62.64,37.89-62.64h39.01l-59.96,93.85Z"/>
      <path fill="#ffffff" d="M900.59,161.39c-48.15,0-82.7-35.89-82.7-80.25v-.45c0-44.36,35-80.69,83.15-80.69s82.7,35.89,82.7,80.25v.45c0,44.36-35,80.69-83.15,80.69ZM947.85,80.69c0-26.75-19.62-49.04-47.26-49.04s-46.81,21.85-46.81,48.59v.45c0,26.75,19.62,49.04,47.26,49.04s46.81-21.84,46.81-48.59v-.45Z"/>
      <polygon fill="#ffffff" points="345.37 158.71 278.5 1.56 278.49 1.56 246.85 1.56 246.84 1.56 179.97 158.71 214.97 158.71 262.67 40.71 310.37 158.71 345.37 158.71"/>
      <circle fill="#35addf" cx="1018.23" cy="137.65" r="23.74"/>
    </svg>
  )
}
```


### `components/LogoIcon.tsx`

<sub>8 lines</sub>

```tsx
export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 773.76 585.35">
      <path fill="#1a2939" d="M457.41,585.35V203.2l-164.74,250.03h-3.34L126.27,205.71v379.64H0V0h138.81l153.86,247.52L446.54,0h138.81v585.35h-127.94Z"/>
      <circle fill="#35addf" cx="707.82" cy="519.41" r="65.94"/>
    </svg>
  )
}
```


### `components/Nav.tsx`

<sub>457 lines</sub>

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LogoFull from '@/components/LogoFull'

const technologyGroups = [
  {
    heading: 'Build',
    items: [
      { label: 'Web Development', href: '/technology/web-development' },
      { label: 'App Development', href: '/technology/app-development' },
      { label: 'Web Applications and Portals', href: '/technology/web-applications' },
      { label: 'E-commerce Development', href: '/technology/ecommerce' },
    ],
  },
  {
    heading: 'Infrastructure and DevOps',
    items: [
      { label: 'DevOps', href: '/technology/devops' },
      { label: 'Hosting', href: '/technology/hosting' },
      { label: 'Database Design and Management', href: '/technology/database' },
      { label: 'Systems Architecture', href: '/technology/architecture' },
      { label: 'GDPR and Compliance', href: '/technology/gdpr-compliance' },
    ],
  },
  {
    heading: 'Automation and Intelligence',
    items: [
      { label: 'Workflow Automation', href: '/technology/automation' },
      { label: 'API Development and Integration', href: '/technology/api' },
      { label: 'AI Chatbots and Assistants', href: '/technology/ai-chatbots' },
      { label: 'CRM and Business Systems', href: '/technology/crm' },
      { label: 'Community and Learning Platforms', href: '/technology/community-platforms' },
    ],
  },
]

const marketing = [
  { label: 'SEO', href: '/marketing/seo' },
  { label: 'Paid Ads', href: '/marketing/paid-ads' },
  { label: 'Lead Generation', href: '/marketing/lead-generation' },
  { label: 'Email and Automation', href: '/marketing/email-automation' },
  { label: 'Content Marketing', href: '/marketing/content' },
  { label: 'Social Media', href: '/marketing/social' },
]

const products = [
  { label: 'Custom Learning Platform', href: '/products/custom-learning-platform' },
  { label: 'Client Portal', href: '/products/client-portal' },
  { label: 'Community Platform', href: '/products/community-platform' },
  { label: 'CRM and Lead Management', href: '/products/crm-lead-management' },
  { label: 'Bespoke Product Build', href: '/products/bespoke' },
]

const industries = [
  { label: 'E-commerce', href: '/industries/ecommerce' },
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Tradespeople', href: '/industries/tradespeople' },
  { label: 'Hospitality', href: '/industries/hospitality' },
  { label: 'Legal', href: '/industries/legal' },
  { label: 'Education', href: '/industries/education' },
  { label: 'Finance', href: '/industries/finance' },
  { label: 'Real Estate', href: '/industries/real-estate' },
  { label: 'Fitness and Wellness', href: '/industries/fitness-wellness' },
  { label: 'Automotive', href: '/industries/automotive' },
  { label: 'Charity and Non-Profit', href: '/industries/charity-non-profit' },
  { label: 'Professional Services', href: '/industries/professional-services' },
  { label: 'Restaurants and Food', href: '/industries/restaurants-food' },
]

const resources = [
  { label: 'Resource Hub', href: '/resources' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Glossary', href: '/glossary' },
]

const company = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [technologyOpen, setTechnologyOpen] = useState(false)
  const [marketingOpen, setMarketingOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <LogoFull className="h-4 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">

          {/* Technology mega-menu */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Technology <ChevronDown />
            </button>
            <div
              className="nav-dropdown absolute top-full left-0 mt-3 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)', width: '580px' }}
            >
              <div className="grid grid-cols-3 p-2">
                {technologyGroups.map(group => (
                  <div key={group.heading} className="p-2">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
                      style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {group.heading}
                    </p>
                    {group.items.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-2 py-2 text-sm text-ink hover:bg-light rounded transition-colors leading-snug"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marketing dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Marketing <ChevronDown />
            </button>
            <div
              className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
            >
              {marketing.map(s => (
                <Link key={s.href} href={s.href}
                  className="block px-4 py-3 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Products <ChevronDown />
            </button>
            <div
              className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
            >
              {products.map(s => (
                <Link key={s.href} href={s.href}
                  className="block px-4 py-3 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Industries dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Industries <ChevronDown />
            </button>
            <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <Link href="/industries"
                className="block px-4 py-3 text-sm font-semibold text-ink hover:bg-light transition-colors border-b"
                style={{ fontFamily: 'Geist, sans-serif', borderColor: 'var(--border)' }}>
                All Industries
              </Link>
              {industries.map(s => (
                <Link key={s.href} href={s.href}
                  className="block px-4 py-2.5 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Resources <ChevronDown />
            </button>
            <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              {resources.map(s => (
                <Link key={s.href} href={s.href}
                  className="block px-4 py-3 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/pricing" className="text-sm font-medium text-ink hover:text-navy transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
            Pricing
          </Link>

          {/* Company dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Company <ChevronDown />
            </button>
            <div className="nav-dropdown absolute top-full right-0 mt-3 w-36 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              {company.map(s => (
                <Link key={s.href} href={s.href}
                  className="block px-4 py-3 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Secondary CTA */}
          <Link href="/start-a-project"
            className="text-sm font-medium px-4 py-2 rounded transition-colors"
            style={{ color: 'var(--navy)', border: '1px solid var(--navy)', fontFamily: 'Geist, sans-serif' }}>
            Start a project
          </Link>

          {/* Primary CTA */}
          <Link href="/contact"
            className="text-sm font-medium text-white px-4 py-2 rounded transition-colors"
            style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 h-screen overflow-y-auto"
          style={{ background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
          <div className="px-4 py-6 flex flex-col gap-1">

            {/* Technology accordion */}
            <div>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setTechnologyOpen(!technologyOpen)}>
                Technology
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${technologyOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {technologyOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {technologyGroups.map(group => (
                    <div key={group.heading}>
                      <p className="text-xs font-semibold uppercase tracking-wider mt-3 mb-1"
                        style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        {group.heading}
                      </p>
                      {group.items.map(item => (
                        <Link key={item.href} href={item.href}
                          className="block text-sm text-mid py-2 hover:text-navy transition-colors"
                          onClick={() => setMenuOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Marketing accordion */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setMarketingOpen(!marketingOpen)}>
                Marketing
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${marketingOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {marketingOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {marketing.map(s => (
                    <Link key={s.href} href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products accordion */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setProductsOpen(!productsOpen)}>
                Products
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {productsOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {products.map(s => (
                    <Link key={s.href} href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries accordion */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setIndustriesOpen(!industriesOpen)}>
                Industries
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${industriesOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {industriesOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  <Link href="/industries" className="text-sm text-mid py-2 hover:text-navy transition-colors font-semibold"
                    onClick={() => setMenuOpen(false)}>
                    All Industries
                  </Link>
                  {industries.map(s => (
                    <Link key={s.href} href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources accordion */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setResourcesOpen(!resourcesOpen)}>
                Resources
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {resources.map(s => (
                    <Link key={s.href} href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pricing"
              className="text-base font-medium text-ink py-3 border-t"
              style={{ borderColor: 'var(--border)' }}
              onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>

            {/* Company accordion */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setCompanyOpen(!companyOpen)}>
                Company
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${companyOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {companyOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {company.map(s => (
                    <Link key={s.href} href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col gap-3" style={{ borderTop: '1px solid var(--border)' }}>
              <Link href="/start-a-project"
                className="block text-center text-base font-medium px-6 py-3 rounded"
                style={{ border: '1px solid var(--navy)', color: 'var(--navy)' }}
                onClick={() => setMenuOpen(false)}>
                Start a project
              </Link>
              <Link href="/contact"
                className="block text-center text-base font-medium text-white px-6 py-3 rounded"
                style={{ background: 'var(--navy)' }}
                onClick={() => setMenuOpen(false)}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
```


### `components/NavWrapper.tsx`

<sub>10 lines</sub>

```tsx
'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'

export default function NavWrapper() {
  const pathname = usePathname()
  if (pathname.startsWith('/diogenes-proposal')) return null
  return <Nav />
}
```


### `components/RevealAnimation.tsx`

<sub>46 lines</sub>

```tsx
'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface RevealAnimationProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
  as?: keyof JSX.IntrinsicElements
}

export default function RevealAnimation({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: RevealAnimationProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ''

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </Tag>
  )
}
```


### `components/ServiceCard.tsx`

<sub>48 lines</sub>

```tsx
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  showLink?: boolean
}

export default function ServiceCard({ title, description, href, icon, showLink = false }: ServiceCardProps) {
  return (
    <div
      className="p-6 transition-colors hover:bg-light flex flex-col gap-4 h-full"
      style={{ border: '1px solid var(--border)' }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded"
        style={{ background: 'var(--light)', color: 'var(--navy)' }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3
          className="text-lg font-semibold text-ink mb-2"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          {description}
        </p>
      </div>
      {showLink && (
        <Link
          href={href}
          className="text-sm font-medium flex items-center gap-1 transition-colors"
          style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
        >
          Learn more
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      )}
    </div>
  )
}
```


---

## `app/` — Next.js App Router (pages, layouts, route handlers)


### `app/globals.css`

<sub>161 lines</sub>

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy: #1A2939;
  --blue: #35ADDF;
  --blue2: #1d96cb;
  --ink: #111318;
  --mid: #6b7280;
  --light: #f5f4f2;
  --white: #ffffff;
  --border: #e5e3df;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Geist', sans-serif;
  font-size: 1rem; /* 16px minimum */
  color: var(--ink);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
}

/* Crosshatch grid background */
.crosshatch-bg {
  background-color: var(--navy);
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 51px,
      rgba(255,255,255,0.06) 51px,
      rgba(255,255,255,0.06) 52px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 51px,
      rgba(255,255,255,0.06) 51px,
      rgba(255,255,255,0.06) 52px
    ),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 36px,
      rgba(255,255,255,0.02) 36px,
      rgba(255,255,255,0.02) 37px
    );
}

/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* Portable text styles */
.prose-content h2 {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: var(--ink);
}

.prose-content h3 {
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  color: var(--ink);
}

.prose-content p {
  margin-bottom: 1.25rem;
  line-height: 1.75;
  color: var(--mid);
}

.prose-content ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose-content ul li {
  margin-bottom: 0.5rem;
  color: var(--mid);
}

.prose-content ol {
  list-style: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose-content ol li {
  margin-bottom: 0.5rem;
  color: var(--mid);
}

.prose-content a {
  color: var(--blue);
  text-decoration: underline;
}

.prose-content blockquote {
  border-left: 4px solid var(--blue);
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--mid);
}

/* Nav dropdown */
.nav-dropdown {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
}

.nav-dropdown-trigger:hover .nav-dropdown,
.nav-dropdown-trigger:focus-within .nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Accordion */
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.open {
  max-height: 500px;
}
```


### `app/icon.svg`

<sub>4 lines</sub>

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 773.76 585.35">
  <path fill="#1a2939" d="M457.41,585.35V203.2l-164.74,250.03h-3.34L126.27,205.71v379.64H0V0h138.81l153.86,247.52L446.54,0h138.81v585.35h-127.94Z"/>
  <circle fill="#35addf" cx="707.82" cy="519.41" r="65.94"/>
</svg>
```


### `app/layout.tsx`

<sub>47 lines</sub>

```tsx
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import NavWrapper from '@/components/NavWrapper'
import FooterWrapper from '@/components/FooterWrapper'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://masuyodigital.com'),
  title: {
    default: 'Masuyo Digital – We build digital things that actually work.',
    template: '%s | Masuyo Digital',
  },
  description: 'A full-service digital agency based in the UK. Websites, marketing, technology, automation and hosting, all under one roof.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://masuyodigital.com',
    siteName: 'Masuyo Digital',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <NavWrapper />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  )
}
```


### `app/not-found.tsx`

<sub>35 lines</sub>

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="crosshatch-bg min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-8xl font-semibold text-white mb-6"
          style={{ fontFamily: 'var(--font-poppins)', opacity: 0.15 }}
        >
          404
        </p>
        <h1
          className="text-4xl md:text-5xl font-semibold text-white mb-4"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Page not found.
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}
        >
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
          style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
        >
          Go home
        </Link>
      </div>
    </section>
  )
}
```


### `app/page.tsx`

<sub>653 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Masuyo Digital – We build digital things that actually work.',
  description: 'Your website, your marketing, your technology. All working together to grow your business. UK-based digital agency working globally.',
  openGraph: {
    title: 'Masuyo Digital – We build digital things that actually work.',
    description: 'Your website, your marketing, your technology. All working together to grow your business.',
    url: 'https://masuyodigital.com',
  },
  alternates: { canonical: 'https://masuyodigital.com' },
}


const useCases = [
  {
    title: 'You are a local business with no real online presence',
    body: 'We get you online properly. A website that represents you well, local SEO so people in your area find you, and a simple way to capture enquiries.',
  },
  {
    title: 'You are growing and need your marketing to keep up',
    body: 'We build and run campaigns across search and social, set up lead generation systems, and track everything so you know what is working.',
  },
  {
    title: 'You want technology to help run your business more efficiently',
    body: 'We look at what you are currently doing, find where technology saves you time and money, and build or implement the right tools.',
  },
  {
    title: 'You want a full digital partner, not just an agency',
    body: 'Strategy, website, marketing, automation, hosting. We act as your digital team without the overhead of hiring one.',
  },
]

const whatWeBuild = [
  'Websites and web applications',
  'Marketing campaigns and ad management',
  'SEO strategies and content systems',
  'CRM and customer management systems',
  'CMS platforms for your team to manage content',
  'Lead generation funnels and landing pages',
  'Automation workflows and integrations',
  'Hosting, server management and ongoing support',
]

const stats = [
  { value: '10+', label: 'Businesses supported across multiple industries' },
  { value: '2', label: 'Countries served and growing' },
  { value: '1', label: 'Team handling everything digital' },
  { value: '7 days', label: 'Average website delivery time' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <circle cx="1200" cy="150" r="550" stroke="rgba(53,173,223,0.10)" strokeWidth="1" fill="none" />
            <circle cx="1200" cy="150" r="380" stroke="rgba(53,173,223,0.07)" strokeWidth="1" fill="none" />
            <circle cx="1200" cy="150" r="210" stroke="rgba(53,173,223,0.12)" strokeWidth="1" fill="none" />
            <circle cx="1350" cy="750" r="120" stroke="rgba(53,173,223,0.08)" strokeWidth="1" fill="none" />
            <line x1="800" y1="0" x2="1440" y2="600" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="900" y1="900" x2="1440" y2="300" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}
              >
                UK based. Working globally.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                We build digital things that{' '}
                <em className="not-italic" style={{ fontStyle: 'italic' }}>actually</em> work.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-lg md:text-xl mb-10"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}
              >
                Your website, your marketing, your technology. All working together to grow your business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded bg-[#35ADDF] hover:bg-[#1d96cb] transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  Start a conversation
                </Link>
                <Link
                  href="/services"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded border border-[#35ADDF] bg-transparent hover:bg-[#35ADDF] transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  Our services
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Offer block */}
      <section style={{ background: 'var(--blue)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}
              >
                Get online fast
              </p>
              <h2
                className="text-2xl md:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                The simplest way to get your business online.
              </h2>
              <p
                className="text-sm leading-relaxed max-w-2xl"
                style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Geist, sans-serif' }}
              >
                A professionally built website from just £249, live in 7 working days. You tell us what you need. We handle everything. No lengthy back and forth, no confusing process. Just a website that works, delivered fast.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/get-a-website"
                className="inline-block text-sm font-semibold px-6 py-3.5 rounded transition-colors hover:bg-light"
                style={{ background: 'var(--white)', color: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
              >
                See what is included
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                About Masuyo
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-6"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                One team. Everything digital.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}
              >
                Most businesses know they need to do more online. They just do not know where to start, or who to trust. That is where we come in. Masuyo is a full service digital agency working with businesses across the UK and globally. We design, build, market and automate. Everything under one roof, from one team that genuinely cares about your growth.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Technology section */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Technology
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
                We Build Digital Systems That Scale
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                From websites and web applications to DevOps, automation, and AI integrations. We architect, build, and deploy technology that is fast, secure, and built to grow with your business.
              </p>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 6l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 6l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.5 3l-3 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Web Development',
                description: 'Modern, performant websites built around your business goals',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="3" width="14" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                    <rect x="2" y="10" width="14" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="13.5" cy="5.5" r=".9" fill="currentColor" stroke="none"/>
                    <circle cx="13.5" cy="12.5" r=".9" fill="currentColor" stroke="none"/>
                  </svg>
                ),
                title: 'DevOps and Infrastructure',
                description: 'Cloud hosting, pipelines, and architecture that keeps everything running',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9a6 6 0 0110.39-3M15 9a6 6 0 01-10.39 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M13 5.5l2.5-2.5M5.5 13L3 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Workflow Automation',
                description: 'Remove manual tasks and connect your tools into a single system',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="4" y="4" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M6 1v3M9 1v3M12 1v3M6 14v3M9 14v3M12 14v3M1 6h3M1 9h3M1 12h3M14 6h3M14 9h3M14 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'AI and Integrations',
                description: 'Intelligent assistants and API connections that extend what your business can do',
              },
            ].map((card, i) => (
              <RevealAnimation key={card.title} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex flex-col gap-4 p-5 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{card.description}</p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>

          <RevealAnimation>
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-navy"
              style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
            >
              Explore technology services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </RevealAnimation>
        </div>
      </section>

      {/* Marketing section */}
      <section className="py-24" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
                Marketing and Growth
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
                Marketing Systems That Generate Real Results
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                From SEO and paid ads to email automation and content. We build the campaigns and systems that bring you customers consistently, backed by proper tracking and data.
              </p>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M6 8h4M8 6v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'SEO',
                description: 'Rank higher and drive organic traffic that converts',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"/>
                  </svg>
                ),
                title: 'Paid Ads',
                description: 'Google and Meta campaigns managed to deliver profitable leads',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1.5" y="4" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M1.5 7l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Email Automation',
                description: 'Sequences that nurture leads and retain customers automatically',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2v7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M2 12v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Lead Generation',
                description: 'End-to-end systems that bring qualified prospects directly to you',
              },
            ].map((card, i) => (
              <RevealAnimation key={card.title} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex flex-col gap-4 p-5 rounded-lg h-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(53,173,223,0.15)', color: 'var(--blue)' }}>
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Geist, sans-serif' }}>{card.description}</p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>

          <RevealAnimation>
            <Link
              href="/marketing"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
            >
              Explore marketing services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </RevealAnimation>
        </div>
      </section>

      {/* Growth section */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                Why it matters
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-6"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Digital is not a one-off project. It is an ongoing engine for growth.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}
              >
                The businesses seeing the biggest results online are not always the biggest or best funded. They are the ones with the right foundations. A website that works hard. Marketing that runs consistently. Technology that supports the team. Automation that removes friction. We help businesses build that engine at any stage, whether starting from scratch, fixing something that is not working, or scaling what they already have.
              </p>
            </RevealAnimation>
          </div>

          {/* Use cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div
                  className="p-6 rounded-lg h-full"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '3px solid var(--blue)' }}
                >
                  <h3
                    className="text-base font-semibold text-ink mb-3"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {uc.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    {uc.body}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <RevealAnimation>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-4"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                What we build
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                From your first website to full digital infrastructure. Here is the kind of work we do every day.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <ul className="flex flex-col gap-3">
                {whatWeBuild.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm pb-3"
                    style={{ borderBottom: i < whatWeBuild.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}
                  >
                    <span style={{ color: 'var(--blue)', marginTop: '2px' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Hosting callout */}
      <section style={{ background: 'var(--navy)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <RevealAnimation>
                <h2
                  className="text-2xl md:text-3xl font-semibold text-white mb-4"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Your website, hosted by us.
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={1}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}
                >
                  We run our own server infrastructure, so we host your website directly. No third party hosting companies, no passing the buck. Fast load times, strong uptime, and a team who knows your site inside out.
                </p>
              </RevealAnimation>
            </div>
            <RevealAnimation delay={2}>
              <Link
                href="/services/hosting"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded border transition-colors hover:bg-white hover:text-ink"
                style={{ borderColor: 'rgba(255,255,255,0.25)', fontFamily: 'Geist, sans-serif' }}
              >
                Find out more
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {stats.map((stat, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div
                  className="py-10 px-6 text-center flex flex-col items-center justify-center h-full"
                  style={{ background: 'var(--white)' }}
                >
                  <p className="text-4xl font-semibold mb-2" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--blue)' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    {stat.label}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Products section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Technology Products
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
                Products Built to Power Your Business
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                Custom-built digital products designed around how your business actually works. No monthly platform fees, no vendor lock-in. Just software you own.
              </p>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {[
              {
                label: 'Custom Learning Platform',
                href: '/products/custom-learning-platform',
                description: 'Train your staff or sell courses to customers on a platform that carries your brand.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M7 7.5l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                label: 'Client Portal',
                href: '/products/client-portal',
                description: 'Give clients a branded space to view projects, files, invoices, and messages.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M2 8h16" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="10" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M10 3v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                label: 'Community Platform',
                href: '/products/community-platform',
                description: 'Build a members-only community with forums, content, and gated access — all on your domain.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="14" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M2 17c0-2.8 2.2-5 5-5h6c2.8 0 5 2.2 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                label: 'CRM and Lead Management',
                href: '/products/crm-lead-management',
                description: 'A fully bespoke CRM that fits your sales process instead of forcing you to change it.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="2" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                    <rect x="11" y="2" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                    <rect x="2" y="11" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                    <rect x="11" y="11" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                ),
              },
            ].map((card, i) => (
              <RevealAnimation key={card.label} delay={(i % 2 + 1) as 1 | 2}>
                <Link href={card.href} className="flex flex-col gap-4 p-6 rounded-lg h-full group transition-shadow hover:shadow-md" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(53,173,223,0.12)', color: 'var(--blue)' }}>
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="text-base font-semibold text-ink group-hover:text-navy transition-colors" style={{ fontFamily: 'var(--font-poppins)' }}>{card.label}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{card.description}</p>
                  </div>
                  <span className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                    Learn more
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </RevealAnimation>
            ))}
          </div>

          {/* Bespoke banner */}
          <RevealAnimation>
            <Link
              href="/products/bespoke"
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-lg transition-colors hover:opacity-95"
              style={{ background: 'var(--navy)' }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                  Bespoke Product Build
                </p>
                <p className="text-base font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Have an idea that does not fit a template? We build it from scratch.
                </p>
              </div>
              <span className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded" style={{ background: 'var(--blue)', color: '#ffffff', fontFamily: 'Geist, sans-serif' }}>
                Tell us your idea
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5h8M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </RevealAnimation>
        </div>
      </section>

      {/* CTA band */}
      <CTABand />
    </>
  )
}
```


### `app/robots.ts`

<sub>12 lines</sub>

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/diogenes-proposal',
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masuyodigital.com'}/sitemap.xml`,
  }
}
```


### `app/about/page.tsx`

<sub>323 lines</sub>

```tsx
import type { Metadata } from 'next'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'We are Masuyo. A digital agency that does things properly. Based in the UK, working globally.',
  openGraph: {
    title: 'About Masuyo Digital',
    description: 'We are Masuyo. A digital agency that does things properly.',
    url: 'https://masuyodigital.com/about',
  },
  alternates: { canonical: 'https://masuyodigital.com/about' },
}

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 7v4.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'We are honest',
    body: 'If something will not work, we say so. We would rather lose a project than take your money for something that will not deliver results.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11h14M11 4l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Results over deliverables',
    body: 'A beautiful website that generates no enquiries is a failure. We measure success by business outcomes, not by what we have produced.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 11l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'No jargon',
    body: 'We explain what we are doing and why in plain language. You should always understand exactly where your money is going.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 19c0-3.866 3.134-7 7-7h.5a7 7 0 017 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Direct relationships',
    body: 'No account managers, no handoffs to offshore teams. The people you talk to are the people doing the work.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3v4M11 15v4M3 11h4M15 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: 'Everything connected',
    body: 'Your website, marketing and technology should work together. Siloed digital services produce siloed results. We join it all up.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 17L9 7l4 6 3-4 3 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Long-term thinking',
    body: 'We build digital assets that grow in value over time. SEO, content, technology: the compounding effect of doing this properly is significant.',
  },
]

const milestones = [
  {
    year: '2022',
    title: 'Founded',
    body: 'Masuyo was started with one principle: build digital things that actually deliver results for the businesses behind them.',
  },
  {
    year: '2023',
    title: 'First international clients',
    body: 'Projects expanded beyond the UK as word spread. We began working with businesses in Europe and North America.',
  },
  {
    year: '2024',
    title: 'Full-service expansion',
    body: 'We formalised our automation and technology solutions offer, giving clients access to a complete digital operation under one roof.',
  },
  {
    year: '2025',
    title: 'Growing and focused',
    body: 'We continue to grow while deliberately staying small. Better work, not more clients. That is the plan.',
  },
]

const stats = [
  { value: '10+', label: 'Businesses helped' },
  { value: '2', label: 'Countries served' },
  { value: '100%', label: 'Work done in-house' },
  { value: '7 days', label: 'Average site delivery' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                We are Masuyo. A digital agency that does things properly.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Based in the UK. Working globally. No outsourcing, no bloated retainers, no fluff.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className="py-10 px-6 text-center flex flex-col items-center justify-center"
                style={{ background: 'var(--white)' }}
              >
                <p className="text-4xl font-semibold mb-1" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--blue)' }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Our story
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                Why we started, and why it matters
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We started Masuyo because we saw too many businesses being sold digital services they did not understand, did not need, or that simply did not deliver. Overpromised SEO campaigns. Websites built by the cheapest contractor. Retainers for reports nobody reads.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We wanted to do it differently. Honest work, delivered properly, by a team that cares whether it works.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We work with businesses of all sizes, from sole traders getting online for the first time to established companies scaling their digital presence. What they share is that they want results, not jargon, and a team they can actually trust to get it done.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--light)' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 600" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <circle cx="0" cy="600" r="500" stroke="rgba(26,41,57,0.06)" strokeWidth="1" fill="none" />
            <circle cx="0" cy="600" r="350" stroke="rgba(26,41,57,0.05)" strokeWidth="1" fill="none" />
            <circle cx="1440" cy="0" r="400" stroke="rgba(53,173,223,0.08)" strokeWidth="1" fill="none" />
            <circle cx="1440" cy="0" r="250" stroke="rgba(53,173,223,0.06)" strokeWidth="1" fill="none" />
            <line x1="1100" y1="0" x2="1440" y2="400" stroke="rgba(53,173,223,0.05)" strokeWidth="1" />
            <line x1="1200" y1="0" x2="1440" y2="300" stroke="rgba(53,173,223,0.04)" strokeWidth="1" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                How we work
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                What we believe in
              </h2>
            </RevealAnimation>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div
                  className="p-6 rounded-lg h-full"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '3px solid var(--blue)' }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded mb-4"
                    style={{ background: 'var(--light)', color: 'var(--navy)' }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                    {v.body}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Our journey
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                How we got here
              </h2>
            </RevealAnimation>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: 'var(--border)' }}
            />
            <div className="flex flex-col gap-0">
              {milestones.map((m, i) => (
                <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="relative flex gap-8 pb-12">
                    {/* Dot */}
                    <div className="relative flex-shrink-0 hidden sm:flex items-start justify-center w-16">
                      <div
                        className="w-4 h-4 rounded-full mt-1 z-10"
                        style={{ background: 'var(--blue)', border: '2px solid var(--white)', boxShadow: '0 0 0 2px var(--blue)' }}
                      />
                    </div>
                    <div className="flex-1 sm:pt-0 pt-2">
                      <span
                        className="text-xs font-semibold uppercase tracking-widest mb-1 block"
                        style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                      >
                        {m.year}
                      </span>
                      <h3 className="text-lg font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                        {m.body}
                      </p>
                    </div>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services prompt */}
      <section className="py-16" style={{ background: 'var(--light)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <RevealAnimation>
                <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Want to work with us?
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={1}>
                <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Tell us about your business and what you need. We will take it from there.
                </p>
              </RevealAnimation>
            </div>
            <RevealAnimation delay={2}>
              <div className="flex gap-3">
                <Link href="/start-a-project"
                  className="inline-block text-sm font-semibold px-5 py-2.5 rounded"
                  style={{ background: 'var(--blue)', color: 'var(--white)', fontFamily: 'Geist, sans-serif' }}>
                  Start a project
                </Link>
                <Link href="/services"
                  className="inline-block text-sm font-semibold px-5 py-2.5 rounded"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                  Our services
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
```


### `app/blog/page.tsx`

<sub>138 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { allPostsQuery } from '@/sanity/queries'
import type { SanityPost } from '@/sanity/types'
import RevealAnimation from '@/components/RevealAnimation'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thinking out loud about digital, marketing and technology. No jargon. Just useful.',
  openGraph: {
    title: 'Blog – Masuyo Digital',
    description: 'Thinking out loud about digital, marketing and technology.',
    url: 'https://masuyodigital.com/blog',
  },
  alternates: { canonical: 'https://masuyodigital.com/blog' },
}

export const revalidate = 60

// Static posts that are always available regardless of Sanity
const staticPosts = [
  {
    _id: 'static-tech-solutions',
    title: 'How technology solutions help small businesses grow',
    slug: { current: 'tech-solutions-for-small-businesses' },
    publishedAt: '2025-04-14',
    category: 'Technology',
    excerpt: 'The right technology does not just save time; it changes the trajectory of your business. Here is what small businesses should actually be using and why.',
    featuredImage: null,
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogIndexPage() {
  let sanityPosts: SanityPost[] = []
  try {
    sanityPosts = await client.fetch(allPostsQuery)
  } catch {
    // Sanity not configured yet, show empty state
  }

  // Merge static posts with Sanity posts (static first, then Sanity)
  const staticIds = new Set(staticPosts.map(p => p.slug.current))
  const filteredSanity = sanityPosts.filter(p => !staticIds.has(p.slug.current))
  const allPosts = [...staticPosts, ...filteredSanity]

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Thinking out loud about digital, marketing and technology.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                No jargon. Just useful.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post, i) => (
              <RevealAnimation key={post._id} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col rounded-lg overflow-hidden transition-colors hover:bg-light h-full"
                  style={{ border: '1px solid var(--border)', borderTop: '3px solid var(--navy)' }}
                >
                  {'featuredImage' in post && (post as SanityPost).featuredImage?.asset?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={(post as SanityPost).featuredImage!.asset!.url}
                        alt={(post as SanityPost).featuredImage?.alt || post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-3">
                      {post.category && (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                        >
                          {post.category}
                        </span>
                      )}
                      <span className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-ink leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        {post.excerpt}
                      </p>
                    )}
                    <span
                      className="text-sm font-medium flex items-center gap-1 mt-auto"
                      style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                    >
                      Read more
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```


### `app/contact/layout.tsx`

<sub>16 lines</sub>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Let us talk about your business. No hard sell, no lengthy forms, just an honest conversation.',
  openGraph: {
    title: 'Contact – Masuyo Digital',
    description: 'Let us talk about your business.',
    url: 'https://masuyodigital.com/contact',
  },
  alternates: { canonical: 'https://masuyodigital.com/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
```


### `app/contact/page.tsx`

<sub>230 lines</sub>

```tsx
'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import RevealAnimation from '@/components/RevealAnimation'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/xlgpogqk', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Let us talk about your business.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                No hard sell. No lengthy forms. Just an honest conversation about where you are and how we might be able to help.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <RevealAnimation>
              {status === 'success' ? (
                <div
                  className="p-8 rounded-lg text-center"
                  style={{ background: 'var(--light)', border: '1px solid var(--border)' }}
                >
                  <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="var(--blue)" fillOpacity="0.1"/>
                    <path d="M12 20l5.5 5.5 10.5-11" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="text-xl font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>Message sent</h3>
                  <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    Thanks for getting in touch. We will be back with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input type="hidden" name="source" value="contact_form" />
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      Business name
                    </label>
                    <input
                      name="business"
                      type="text"
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      What are you looking to do? *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors resize-none"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                      placeholder="Tell us a bit about your business and what you are looking for..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      How did you hear about us?
                    </label>
                    <select
                      name="referral"
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                    >
                      <option value="">Select an option</option>
                      <option value="google">Google</option>
                      <option value="social">Social media</option>
                      <option value="word-of-mouth">Word of mouth</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {status === 'error' && (
                    <p className="text-sm" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity disabled:opacity-60"
                    style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
            </RevealAnimation>

            {/* Contact info */}
            <RevealAnimation delay={1}>
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                    Or drop us an email
                  </h2>
                  <a
                    href="mailto:hello@masuyodigital.com"
                    className="text-base font-medium transition-colors hover:opacity-80"
                    style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                  >
                    hello@masuyodigital.com
                  </a>
                </div>
                <div
                  className="p-6 rounded-lg"
                  style={{ background: 'var(--light)', border: '1px solid var(--border)' }}
                >
                  <h3 className="text-base font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                    What to expect
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {[
                      'We reply within one business day',
                      'No pressure, no hard sell',
                      'An honest conversation about what you actually need',
                      'Clear next steps if we are a good fit',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>
    </>
  )
}
```


### `app/diogenes-proposal/FadeIn.tsx`

<sub>44 lines</sub>

```tsx
'use client'

import { useRef, useEffect, type ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(18px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
```


### `app/diogenes-proposal/PasswordGate.tsx`

<sub>98 lines</sub>

```tsx
import LogoFullWhite from '@/components/LogoFullWhite'
import { checkPassword } from './actions'

const BLUE = '#35ADDF'
const WHITE = '#ffffff'
const H = "var(--font-poppins)"
const B = "'Geist', sans-serif"

export default function PasswordGate({ hasError }: { hasError: boolean }) {
  return (
    <div
      className="crosshatch-bg"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: B,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Concentric brand circles */}
      <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx="1100" cy="200" r="520" stroke="rgba(53,173,223,0.10)" strokeWidth="1" />
        <circle cx="1100" cy="200" r="340" stroke="rgba(53,173,223,0.08)" strokeWidth="1" />
        <circle cx="300" cy="780" r="220" stroke="rgba(53,173,223,0.07)" strokeWidth="1" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '24rem', textAlign: 'center' }}>
        <LogoFullWhite className="h-5 w-auto mx-auto mb-10" />

        <h1 style={{ fontFamily: H, fontSize: '1.75rem', fontWeight: 700, color: WHITE, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Diogenes Sun Club
        </h1>
        <p style={{ fontFamily: B, fontSize: '1rem', color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Your proposal is waiting. Please enter the password to continue.
        </p>

        <form action={checkPassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter password"
            style={{
              width: '100%',
              padding: '0.9375rem 1rem',
              fontSize: '1rem',
              fontFamily: B,
              color: WHITE,
              background: 'rgba(255,255,255,0.08)',
              border: hasError ? '1.5px solid #e25555' : '1.5px solid rgba(255,255,255,0.22)',
              borderRadius: '0.5rem',
              outline: 'none',
              textAlign: 'center',
              letterSpacing: '0.08em',
              boxSizing: 'border-box',
            }}
          />

          {hasError && (
            <p style={{ fontSize: '0.9375rem', color: '#ff9a9a', fontFamily: B, textAlign: 'center' }}>
              That password is not right. Please try again.
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.9375rem 1.5rem',
              background: BLUE,
              color: WHITE,
              fontFamily: B,
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'background 0.2s ease',
            }}
          >
            Continue
          </button>
        </form>

        <p style={{ marginTop: '3rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', fontFamily: B, lineHeight: 1.6 }}>
          This page is private. Prepared by Masuyo Digital.
        </p>
      </div>
    </div>
  )
}
```


### `app/diogenes-proposal/ProposalContent.tsx`

<sub>1018 lines</sub>

```tsx
import type { ReactNode } from 'react'
import LogoFullWhite from '@/components/LogoFullWhite'
import FadeIn from './FadeIn'
import QuestionnaireButton from './QuestionnaireButton'

/* ─── Brand tokens ─── */
const NAVY  = '#1A2939'
const BLUE  = '#35ADDF'
const BLUE2 = '#1d96cb'
const INK   = '#111318'
const MID   = '#6b7280'
const LIGHT = '#f5f4f2'
const WHITE = '#ffffff'
const BORDER = '#e5e3df'
const H = "var(--font-poppins)"
const B = "'Geist', sans-serif"

/* ─── Layout constants ─── */
const HDR    = 90  // matches ProposalShell LOGO_H (40) + PROG_H (50)
const BG_IMG = 'https://res.cloudinary.com/dfzhei0ae/image/upload/v1782483678/1_xga7gs.jpg'

/* ─── Layout primitives ─── */

function Section({
  id, bg = WHITE, children, first = false,
}: {
  id: string; bg?: string; children: ReactNode; first?: boolean
}) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: '5rem 0',
        scrollMarginTop: `${HDR}px`,
        borderTop: first ? 'none' : `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: '60rem', margin: '0 auto', padding: '0 1.5rem' }}>{children}</div>
    </section>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: light ? BLUE : BLUE2,
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
      }}
    >
      <span style={{ width: '1.75rem', height: '2px', background: BLUE, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </p>
  )
}

function H2({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      style={{
        fontFamily: H,
        fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
        fontWeight: 700,
        color: light ? WHITE : NAVY,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        marginBottom: '1.75rem',
      }}
    >
      {children}
    </h2>
  )
}

function Lead({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: 'clamp(1.125rem, 2.2vw, 1.375rem)',
        fontWeight: 500,
        lineHeight: 1.5,
        color: light ? 'rgba(255,255,255,0.92)' : INK,
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </p>
  )
}

function Chunk({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: '1.0625rem',
        lineHeight: 1.7,
        color: light ? 'rgba(255,255,255,0.78)' : MID,
        marginBottom: '1rem',
      }}
    >
      {children}
    </p>
  )
}

function Check({ light = false }: { light?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill={light ? 'rgba(53,173,223,0.25)' : 'rgba(53,173,223,0.12)'} />
      <path d="M6 10.2l2.6 2.6 5.4-5.6" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BulletList({ items, light = false }: { items: ReactNode[]; light?: boolean }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
            fontFamily: B,
            fontSize: '1.0625rem',
            lineHeight: 1.55,
            color: light ? 'rgba(255,255,255,0.88)' : INK,
          }}
        >
          <Check light={light} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function StatCard({ value, label, accent = false, small = false }: { value: ReactNode; label: string; accent?: boolean; small?: boolean }) {
  return (
    <div
      style={{
        background: accent ? NAVY : WHITE,
        border: `1px solid ${accent ? NAVY : BORDER}`,
        borderRadius: '0.875rem',
        padding: '1.75rem 1.25rem',
        textAlign: 'center',
        boxShadow: '0 1px 2px rgba(26,41,57,0.04)',
      }}
    >
      <p
        style={{
          fontFamily: H,
          fontSize: small ? 'clamp(0.9375rem, 2.5vw, 1.25rem)' : 'clamp(2rem, 6vw, 3rem)',
          fontWeight: 700,
          color: accent ? WHITE : NAVY,
          lineHeight: small ? 1.3 : 1,
          marginBottom: '0.5rem',
          letterSpacing: small ? '-0.01em' : '-0.02em',
          wordBreak: 'break-word',
        }}
      >
        {value}
      </p>
      <p style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 500, color: accent ? 'rgba(255,255,255,0.6)' : MID, lineHeight: 1.4 }}>
        {label}
      </p>
    </div>
  )
}

function Callout({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${BLUE}`,
        background: light ? 'rgba(255,255,255,0.06)' : LIGHT,
        padding: '1.25rem 1.5rem',
        borderRadius: '0 0.625rem 0.625rem 0',
        margin: '1.75rem 0',
      }}
    >
      {children}
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2" style={{ margin: '1rem 0 0.5rem' }}>
      {items.map((t, i) => (
        <span
          key={i}
          style={{
            fontFamily: B,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: NAVY,
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: '999px',
            padding: '0.4rem 0.85rem',
          }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

function Head({ eyebrow, title, light = false }: { eyebrow: string; title: ReactNode; light?: boolean }) {
  return (
    <FadeIn>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <H2 light={light}>{title}</H2>
    </FadeIn>
  )
}

/* ─── Sub-label for investment blocks ─── */
const subLabel: React.CSSProperties = {
  fontFamily: B,
  fontSize: '0.6875rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.42)',
  marginTop: '2.75rem',
  marginBottom: '1rem',
}

/* ─── Page ─── */

export default function ProposalContent() {
  return (
    <>
      {/* ── Fixed background image ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${BG_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      />
      {/* ── Fixed dark overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: 'rgba(8,14,24,0.78)',
        }}
      />

      {/* ── Scrollable content layer ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* ====== HERO ====== */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: `calc(100svh - ${HDR}px)`,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {/* Decorative brand circles */}
          <svg
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            <circle cx="1240" cy="160" r="540" stroke="rgba(53,173,223,0.10)" strokeWidth="1" />
            <circle cx="1240" cy="160" r="360" stroke="rgba(53,173,223,0.08)" strokeWidth="1" />
            <circle cx="1240" cy="160" r="200" stroke="rgba(53,173,223,0.12)" strokeWidth="1" />
          </svg>

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '60rem',
              width: '100%',
              margin: '0 auto',
              padding: `4rem clamp(1rem, 4vw, 2rem) 4.5rem`,
            }}
          >
            <FadeIn>
              <LogoFullWhite className="h-4 w-auto mb-8" />
              <p
                style={{
                  fontFamily: B,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '1.25rem',
                }}
              >
                A proposal prepared for
              </p>
              <h1
                style={{
                  fontFamily: H,
                  fontSize: 'clamp(2.5rem, 8vw, 4.25rem)',
                  fontWeight: 700,
                  color: WHITE,
                  lineHeight: 1.08,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.25rem',
                }}
              >
                Diogenes Sun Club
              </h1>
              <p
                style={{
                  fontFamily: B,
                  fontSize: 'clamp(1.0625rem, 2.4vw, 1.3125rem)',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.82)',
                  lineHeight: 1.5,
                  maxWidth: '34rem',
                }}
              >
                A new website built to grow your membership. Prepared by Masuyo Digital for Liz and the Diogenes team.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ====== FLOATING PANEL ====== */}
        {/* Outer wrapper provides the viewport-edge inset; inner div caps max width and centres */}
        <div style={{ padding: `0 clamp(0.75rem, 8vw, 8rem) 3rem` }}>
        <div
          style={{
            maxWidth: '82rem',
            margin: '0 auto',
            borderRadius: `clamp(1rem, 2vw, 1.75rem)`,
            background: WHITE,
            boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.28)',
            overflow: 'hidden',
          }}
        >

          {/* ============ THE CHALLENGE ============ */}
          <Section id="challenge" bg={LIGHT} first>
            <Head eyebrow="The challenge" title="The website has one primary job above all others." />

            <FadeIn delay={80}>
              <Chunk>There is a real and pressing challenge, and the website has to be built to solve it.</Chunk>
              <Chunk>The club needs new members, and it needs them reasonably soon.</Chunk>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="grid grid-cols-2 gap-4" style={{ margin: '2.5rem 0' }}>
                <StatCard value="200" label="members today" />
                <StatCard value="400" label="the goal" accent />
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <Chunk>The membership sits at around 200 and needs to grow toward 400. Standing in the way:</Chunk>
              <BulletList
                items={[
                  'The 50:50 balance of men and women has to be maintained.',
                  'There is currently a list of men waiting to join who cannot, simply because there are not yet enough women members to keep that balance.',
                  'The current membership skews older.',
                  'Without a steady flow of new and younger members the long term future of the club becomes uncertain.',
                ]}
              />
            </FadeIn>

            <FadeIn delay={200}>
              <Callout>
                <p style={{ fontFamily: B, fontSize: '1.0625rem', fontWeight: 500, color: INK, lineHeight: 1.6 }}>
                  So the website has one primary job above all others: to bring new members in, with a particular focus on attracting women and couples, presented in a way that feels warm, safe, modern and completely respectable.
                </p>
                <p style={{ fontFamily: B, fontSize: '0.9375rem', color: MID, marginTop: '0.625rem' }}>
                  Everything in this proposal is built around that goal.
                </p>
              </Callout>
            </FadeIn>
          </Section>

          {/* ============ STRATEGY ============ */}
          <Section id="strategy" bg={WHITE}>
            <Head eyebrow="Our approach" title="What the website needs to do." />

            <FadeIn delay={60}>
              <Lead>Five principles underpin everything we build for Diogenes.</Lead>
              <Chunk>Each one translates directly into decisions about design, copy and functionality.</Chunk>
            </FadeIn>

            <div style={{ marginTop: '2.5rem' }}>
              <NumberedCard n="1" title="Speak to women and couples first.">
                <Chunk>The single most important audience is women, because the ratio is what unlocks everything else.</Chunk>
                <Chunk>The new site will be designed and written to make a woman who is curious but nervous feel immediately at ease. That means:</Chunk>
                <BulletList
                  items={[
                    'Warm imagery',
                    'Reassurance woven through the copy',
                    'Your existing testimonials from female members brought to the front',
                    'Clear signposting of the new ladies events you are planning',
                  ]}
                />
              </NumberedCard>

              <NumberedCard n="2" title="Reassure, without ever being seedy.">
                <Chunk>This is a serious naturist club, a sports and wellbeing community, and absolutely not a lifestyle or swingers club.</Chunk>
                <Chunk>That distinction is non-negotiable, and the site will make it unmistakably clear in a calm, confident, non-defensive way.</Chunk>
                <Chunk>Your own words already do this beautifully. We will make that reassurance easy to find for the people who need it, without ever planting the wrong idea.</Chunk>
              </NumberedCard>

              <NumberedCard n="3" title="Position the club around wellbeing, not just naturism.">
                <Chunk>The most powerful way to attract the next generation of members is to lead with what the club genuinely offers:</Chunk>
                <BulletList
                  items={[
                    'A digital detox',
                    'Time in nature',
                    'Body confidence',
                    'Swimming, sport, yoga and sauna',
                    'Real human connection away from screens',
                  ]}
                />
                <Chunk>Naturism is part of that story, but the entry point for a nervous newcomer is wellbeing. This framing widens the appeal enormously.</Chunk>
              </NumberedCard>

              <NumberedCard n="4" title="Be findable.">
                <Chunk>A beautiful website that nobody finds does not solve the membership problem.</Chunk>
                <Chunk>Unlike many adult-oriented venues, naturism is a legitimate lifestyle and sport, which means you are not locked out of mainstream channels. That is a real advantage we will use.</Chunk>
              </NumberedCard>

              <NumberedCard n="5" title="Respect the community you already have." last>
                <Chunk>The existing members are the heart of the club, and the new site must feel like an evolution of Diogenes, not a replacement of it.</Chunk>
                <Chunk>Our recommendation is a warm, timeless, wellbeing-led design that appeals to newer and younger visitors while still feeling like home to existing members. This is a conversation, not a decision we make for you.</Chunk>
              </NumberedCard>
            </div>
          </Section>

          {/* ============ DISCOVERY ============ */}
          <Section id="discovery" bg={LIGHT}>
            <Head eyebrow="Getting found" title="Building the site is half the job." />

            <FadeIn delay={60}>
              <Lead>Helping the right people find it is the other half.</Lead>
              <Chunk>Here is how we will approach discovery, all included as part of this project unless noted.</Chunk>
            </FadeIn>

            <div style={{ marginTop: '2rem' }}>
              <Tactic icon={<IconSearch />} title="Local search">
                <Chunk>We will build the site to rank for the searches that matter:</Chunk>
                <Chips items={['naturist club near London', 'naturist club Buckinghamshire', 'naked yoga near me']} />
                <Chunk>Plus the wellbeing-led terms that bring in a broader audience. The current site is dated and not built for this. The new one will be.</Chunk>
              </Tactic>

              <Tactic icon={<IconPin />} title="Google Business Profile">
                <Chunk>We will help set up and optimise your Google presence so the club shows up properly on Google Maps and in local results, with photos, opening information and a route to enquire.</Chunk>
                <Chunk>This is one of the highest impact, lowest cost things a local club can do, and it is often neglected.</Chunk>
              </Tactic>

              <Tactic icon={<IconShare />} title="Built for sharing">
                <Chunk>Every page will be designed to look clean and discreet when shared on WhatsApp, Facebook or by email.</Chunk>
                <Chunk>Members can confidently share the club with friends without any awkward preview images.</Chunk>
              </Tactic>

              <Tactic icon={<IconDoc />} title="Content that attracts">
                <Chunk>Warm, genuinely useful content is what pulls curious people in from search and builds trust before they ever enquire. Over time that means:</Chunk>
                <BulletList
                  items={[
                    'A proper "new to naturism" guide',
                    'The wellbeing benefits',
                    'What to expect on a first visit',
                    "Women's experiences",
                  ]}
                />
                <Chunk>We will structure the site so this content works hard for you, and so it can grow.</Chunk>
              </Tactic>

              <Tactic icon={<IconStar />} title="The press and partnership angle">
                <Chunk>You have already had national press and a Naked Wanderings visit. That is rare and valuable.</Chunk>
                <Chunk>A modern, credible website makes future press, partnerships and features far easier to attract, because it gives journalists and partners something that reflects the quality of the club.</Chunk>
              </Tactic>
            </div>
          </Section>

          {/* ============ SCOPE ============ */}
          <Section id="scope" bg={WHITE}>
            <Head eyebrow="Scope of work" title="What we will build." />

            <FadeIn delay={60}>
              <Lead>A brand new, fully custom, public-facing website to replace the current one.</Lead>
              <Chunk>Built to be beautiful, fast, secure and mobile first, because most of your nervous first-time visitors will be browsing on a phone.</Chunk>
            </FadeIn>

            <div style={{ marginTop: '2rem' }}>
              <Deliverable title="A welcoming homepage">
                Built around the wellness, nature, community and confidence message, designed to make a nervous newcomer feel at ease within seconds.
              </Deliverable>
              <Deliverable title='A "new to naturism" and newbie FAQ section'>
                Using and elevating your own excellent existing copy, with the reassurance that women, couples and first timers are especially welcome, and the offer of free ladies events and welcome days.
              </Deliverable>
              <Deliverable title="A facilities section">
                Covering the 12-acre site with 6 acres of landscaped club grounds, the two heated indoor and outdoor pools, the sauna, tennis and pickleball, yoga, gardening and creative arts, and camping for tents and campervans. Each presented warmly rather than as a dry list.
              </Deliverable>
              <Deliverable title="An events and news section">
                Public facing, so you can show what life at the club actually looks like and keep the page feeling alive. Display only at this stage.
              </Deliverable>
              <Deliverable title='A clear membership and "arrange a visit" section'>
                Explaining how the trial visit works, with a simple, GDPR-compliant enquiry form that lands directly with you and respects your existing, careful vetting process. There is no automated joining; the human approval step you rely on stays exactly as it is.
              </Deliverable>
              <Deliverable title="A how to find us section">
                With location, parking and directions.
              </Deliverable>
              <Deliverable title="A clean link through to your existing members area" last>
                Which stays exactly as it is and is not touched as part of this project.
              </Deliverable>
            </div>

            <FadeIn delay={200}>
              <Callout>
                <p style={{ fontFamily: B, fontSize: '1.0625rem', fontWeight: 500, color: INK, lineHeight: 1.6 }}>
                  Throughout, the site will use British spelling, your own warm tone of voice, and a calm, premium, modern design.
                </p>
                <p style={{ fontFamily: B, fontSize: '0.9375rem', color: MID, marginTop: '0.5rem' }}>
                  Fully responsive, fast-loading and accessible, which matters given some of your members, and worth doing properly.
                </p>
              </Callout>
            </FadeIn>
          </Section>

          {/* ============ IMAGERY ============ */}
          <Section id="imagery" bg={LIGHT}>
            <Head eyebrow="An honest note" title="Imagery is the single most important factor." />

            <FadeIn delay={60}>
              <Chunk>We need to be straight with you about imagery.</Chunk>
              <Chunk>It is the single biggest factor in whether the new site achieves its goal, and it is the one part we cannot simply generate.</Chunk>
              <Chunk>
                The warmth you want, women laughing by the pool, outdoor yoga, sauna relaxation, people enjoying the grounds, can only really come from genuine photography of the club and real, consenting people.
              </Chunk>
              <Chunk>
                Generic stock photography of naturists either does not exist tastefully or looks exactly like the dated, posed imagery you want to avoid.
              </Chunk>
            </FadeIn>

            <FadeIn delay={120}>
              <Callout>
                <p style={{ fontFamily: B, fontSize: '1.0625rem', fontWeight: 600, color: NAVY, lineHeight: 1.6 }}>
                  We will never use artificially generated images of people for a club like this.
                </p>
                <p style={{ fontFamily: B, fontSize: '0.9375rem', color: MID, marginTop: '0.5rem' }}>
                  It would be both wrong and a risk to your reputation.
                </p>
              </Callout>
            </FadeIn>

            <FadeIn delay={160}>
              <Chunk>So the best version of this site depends on real photography.</Chunk>
              <Chunk>
                We do not offer photography ourselves, but we can arrange a professional shoot for you as an optional add-on, art directed so the images match the warm, wellbeing-led feel the site is built around.
              </Chunk>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ margin: '2rem 0' }}>
                {[
                  { option: 'Option A', desc: 'Photographing members who are happy to volunteer. Authentic and warm.' },
                  { option: 'Option B', desc: 'Bringing in professional models for the shoot. Controlled and polished.' },
                ].map(o => (
                  <div key={o.option} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: '0.875rem', padding: '1.5rem' }}>
                    <p style={{ fontFamily: H, fontSize: '1.125rem', fontWeight: 700, color: NAVY, marginBottom: '0.5rem' }}>{o.option}</p>
                    <p style={{ fontFamily: B, fontSize: '1rem', lineHeight: 1.6, color: MID }}>{o.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={240}>
              <Chunk>Either way, we would discuss which suits you.</Chunk>
              <Chunk>
                Where people are not shown, we will lean on your beautiful grounds, the pools, the woodland, sunshine and nature, which carry a great deal of warmth on their own.
              </Chunk>
              <Chunk>
                To get started we can absolutely build the site beautifully using your existing and grounds-based imagery, and elevate it further once new photography is ready.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ COMPLIANCE ============ */}
          <Section id="compliance" bg={WHITE}>
            <Head eyebrow="Peace of mind" title="Compliance and security, taken seriously." />

            <FadeIn delay={60}>
              <Chunk>The site will be built to be GDPR compliant from the ground up.</Chunk>
              <Chunk>We will host it on a secure, managed server, so it is safe and reliable from launch.</Chunk>
              <Chunk>
                Naturism is a legitimate lifestyle and sport, and the site will be presented in a way that is entirely respectable and compliant with the major platforms. That protects your ability to be found and to advertise should you choose to later.
              </Chunk>
            </FadeIn>

            <FadeIn delay={120}>
              <BulletList
                items={[
                  'GDPR-compliant privacy policy and cookie handling',
                  'Secure, managed hosting with SSL certificate',
                  'Firewall protection and regular backups',
                  'Enquiry forms that treat personal data correctly',
                  'Presentation compliant with major platforms and search engines',
                ]}
              />
            </FadeIn>
          </Section>

          {/* ============ INVESTMENT ============ */}
          <section
            id="investment"
            className="crosshatch-bg"
            style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0', scrollMarginTop: `${HDR}px` }}
          >
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '60rem', margin: '0 auto', padding: '0 1.5rem' }}>

              <Head eyebrow="Clear and simple" title="Your investment." light />

              <FadeIn delay={60}>
                <Chunk light>
                  Clear and simple, with no surprises. Here is exactly what it costs to build, launch and look after your new website.
                </Chunk>
              </FadeIn>

              {/* ── Sub-block A: Build and launch ── */}
              <FadeIn delay={100}>
                <p style={subLabel}>To build and launch (one-off)</p>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '1rem',
                    padding: 'clamp(1.5rem, 4vw, 2.25rem)',
                  }}
                >
                  <LineItem label="Website" price="£1,100" />
                  <LineItem label="3 logo mockups" price="£200" />
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '0.25rem 0 1.25rem' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: H, fontSize: '1.25rem', fontWeight: 700, color: WHITE, margin: 0 }}>Total</p>
                    <p style={{ fontFamily: H, fontSize: 'clamp(2.75rem, 9vw, 4.5rem)', fontWeight: 700, color: WHITE, letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
                      £1,300
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1.5rem', paddingTop: '1.5rem' }}>
                    <p style={{ fontFamily: B, fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(53,173,223,0.8)', marginBottom: '0.75rem' }}>
                      Included
                    </p>
                    <BulletList
                      light
                      items={[
                        'Full custom design and build',
                        'Discovery and SEO setup',
                        'Google Business Profile optimisation',
                        'GDPR compliance and secure setup',
                        'Mobile-first, accessible build',
                        'One revision round as standard',
                      ]}
                    />
                  </div>
                </div>
              </FadeIn>

              {/* ── Sub-block B: Monthly plans ── */}
              <FadeIn delay={140}>
                <p style={subLabel}>To keep your site live and looked after (choose one)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PlanCard
                    price="£100 / month"
                    name="Care plan"
                    features={[
                      'Hosting, SSL, firewall, backups and security',
                      'Up to 4 hours each month of our time for updates, changes and event uploads',
                    ]}
                    featured
                  />
                  <PlanCard
                    price="£45 / month"
                    name="Hosting only"
                    features={[
                      'Hosting, SSL, firewall, backups and security',
                    ]}
                  />
                </div>
                <p style={{ fontFamily: B, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginTop: '1rem' }}>
                  A monthly plan keeps your site online, secure and backed up. Choose the level that suits you.
                </p>
              </FadeIn>

              {/* ── Sub-block C: Optional extras ── */}
              <FadeIn delay={180}>
                <p style={subLabel}>Optional marketing extras (only if you want them)</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <ExtraRow
                    title="Photography and drone shoot"
                    desc="Arranged and art directed by us to match the warm, wellbeing-led brief."
                    price="Quoted on request"
                  />
                  <ExtraRow
                    title="SEO guide articles"
                    desc="Written to bring curious people in from search and build trust before they enquire."
                    price="Weekly: £100/month or monthly: £25/month"
                  />
                  <ExtraRow
                    title="Google Ads setup"
                    desc="Setup only. The advertising spend itself is paid separately by you and is not included in this fee."
                    price="£100 per ad"
                  />
                </div>
              </FadeIn>

            </div>
          </section>

          {/* ============ FUTURE PHASES ============ */}
          <Section id="future" bg={WHITE}>
            <Head eyebrow="Looking ahead" title="Future phases, for later, not now." />

            <FadeIn delay={60}>
              <Chunk>You were clear that the priority right now is the public website, and we agree.</Chunk>
              <Chunk>For the future, when you are ready, there is a natural second phase:</Chunk>
              <BulletList
                items={[
                  'Online visitor and membership booking with proper onboarding',
                  'Event and camping bookings',
                  'A members and fee management system',
                ]}
              />
              <Chunk>
                Tools like MembershipMojo can handle much of this. We have deliberately kept all of that out of this proposal so you can get the public site live and working for you first.
              </Chunk>
              <Chunk>When the time comes, we would be glad to help with the rest.</Chunk>
            </FadeIn>
          </Section>

          {/* ============ NEXT STEPS ============ */}
          <Section id="next" bg={LIGHT}>
            <Head eyebrow="When you are ready" title="The next step is just a few questions." />

            <FadeIn delay={60}>
              <Lead>Before we talk, it would help to know a little more about where you are.</Lead>
              <Chunk>The questions below take about three minutes. They cover the basics: sign-off, pages, design feel and imagery. There are no right or wrong answers, and you can save your progress and come back any time.</Chunk>
              <Chunk>Once we have your answers we will be in touch quickly with any follow-up thoughts, and from there we can arrange a short call to confirm everything and get started.</Chunk>
            </FadeIn>

            <FadeIn delay={120}>
              <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                <QuestionnaireButton />
              </div>
              <p style={{ fontFamily: B, fontSize: '0.875rem', color: MID, lineHeight: 1.6 }}>
                Prefer to get in touch directly? Email us at{' '}
                <a href="mailto:hello@masuyodigital.com" style={{ color: BLUE, textDecoration: 'none', fontWeight: 500 }}>
                  hello@masuyodigital.com
                </a>
              </p>
            </FadeIn>

            <FadeIn delay={180}>
              <div style={{ marginTop: '3rem', borderRadius: '1rem', overflow: 'hidden', border: `1px solid ${BORDER}` }}>
                <div className="crosshatch-bg" style={{ padding: '1.75rem 2rem' }}>
                  <LogoFullWhite className="h-4 w-auto mb-3" />
                  <p style={{ fontFamily: B, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>Prepared for Liz and the Diogenes team.</p>
                </div>
                <div style={{ background: WHITE, padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="mailto:hello@masuyodigital.com" style={{ fontFamily: B, fontSize: '1rem', fontWeight: 500, color: NAVY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <IconMail />
                    hello@masuyodigital.com
                  </a>
                  <a href="https://masuyodigital.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: B, fontSize: '1rem', fontWeight: 500, color: NAVY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <IconGlobe />
                    masuyodigital.com
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={240}>
              <p style={{ fontFamily: H, fontSize: '1.1875rem', fontWeight: 600, fontStyle: 'italic', color: NAVY, marginTop: '3rem', lineHeight: 1.6 }}>
                Thank you for reading this in full. We hope it reflects the care we would bring to the work itself.
              </p>
            </FadeIn>
          </Section>

          {/* Footer strip */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            style={{ background: NAVY, padding: '1.75rem 1.5rem' }}
          >
            <p style={{ fontFamily: B, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>Diogenes Sun Club, proposal by Masuyo Digital</p>
            <p style={{ fontFamily: B, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>Private and confidential</p>
          </div>

        </div>{/* end floating panel */}
        </div>{/* end panel inset wrapper */}
      </div>{/* end scrollable content layer */}
    </>
  )
}

/* ─── Composite components ─── */

function NumberedCard({ n, title, children, last = false }: { n: string; title: string; children: ReactNode; last?: boolean }) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', gap: '1.25rem', padding: '1.75rem 0', borderTop: `1px solid ${BORDER}`, borderBottom: last ? `1px solid ${BORDER}` : undefined }}>
        <div
          style={{
            flexShrink: 0,
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.75rem',
            background: NAVY,
            color: WHITE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: H,
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          {n}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: H, fontSize: '1.3125rem', fontWeight: 700, color: NAVY, marginBottom: '0.625rem', lineHeight: 1.3 }}>{title}</h3>
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

function Tactic({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <FadeIn>
      <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: '1rem', padding: '1.75rem', marginBottom: '1rem' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '0.875rem' }}>
          <div style={{ flexShrink: 0, width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
          <h3 style={{ fontFamily: H, fontSize: '1.25rem', fontWeight: 700, color: NAVY }}>{title}</h3>
        </div>
        {children}
      </div>
    </FadeIn>
  )
}

function Deliverable({ title, children, last = false }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', gap: '0.875rem', padding: '1.25rem 0', borderTop: `1px solid ${BORDER}`, borderBottom: last ? `1px solid ${BORDER}` : undefined }}>
        <Check />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: H, fontSize: '1.125rem', fontWeight: 700, color: NAVY, marginBottom: '0.3rem', lineHeight: 1.3 }}>{title}</p>
          <p style={{ fontFamily: B, fontSize: '1rem', lineHeight: 1.6, color: MID }}>{children}</p>
        </div>
      </div>
    </FadeIn>
  )
}

/* ─── Investment section sub-components ─── */

function LineItem({ label, price }: { label: string; price: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '1rem',
        padding: '0.8125rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span style={{ fontFamily: B, fontSize: '1rem', color: 'rgba(255,255,255,0.72)' }}>{label}</span>
      <span style={{ fontFamily: B, fontSize: '1rem', fontWeight: 600, color: WHITE, flexShrink: 0 }}>{price}</span>
    </div>
  )
}

function PlanCard({ price, name, features, featured = false }: { price: string; name: string; features: string[]; featured?: boolean }) {
  return (
    <div
      style={{
        background: featured ? 'rgba(53,173,223,0.12)' : 'rgba(255,255,255,0.05)',
        border: featured ? '1.5px solid rgba(53,173,223,0.4)' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.875rem',
        padding: '1.5rem',
      }}
    >
      <p style={{ fontFamily: H, fontSize: 'clamp(1.625rem, 5vw, 2.125rem)', fontWeight: 700, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.375rem' }}>
        {price}
      </p>
      <p style={{ fontFamily: B, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: featured ? BLUE : 'rgba(255,255,255,0.42)', marginBottom: '1.25rem' }}>
        {name}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
            <Check light />
            <span style={{ fontFamily: B, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExtraRow({ title, desc, price }: { title: string; desc: string; price: string }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '0.75rem',
        padding: '1.125rem 1.375rem',
      }}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3"
        style={{ marginBottom: '0.4rem' }}
      >
        <p style={{ fontFamily: H, fontSize: '1.0625rem', fontWeight: 700, color: WHITE, margin: 0 }}>{title}</p>
        <p style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 600, color: BLUE, whiteSpace: 'nowrap', flexShrink: 0, margin: 0 }}>{price}</p>
      </div>
      <p style={{ fontFamily: B, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
    </div>
  )
}

/* ─── Icons ─── */

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" stroke={NAVY} strokeWidth="1.6" />
      <path d="M12.8 12.8L17 17" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function IconPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18s6-5.2 6-9.5A6 6 0 1 0 4 8.5C4 12.8 10 18 10 18Z" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="10" cy="8.2" r="2.1" fill={BLUE} />
    </svg>
  )
}
function IconShare() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="5" cy="10" r="2.2" stroke={NAVY} strokeWidth="1.6" />
      <circle cx="15" cy="5" r="2.2" stroke={BLUE} strokeWidth="1.6" />
      <circle cx="15" cy="15" r="2.2" stroke={BLUE} strokeWidth="1.6" />
      <path d="M7 9l6-3M7 11l6 3" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 3h6l4 4v10H5V3Z" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 3v4h4" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 11h5M7.5 13.5h5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5l2.2 4.6 5 .7-3.6 3.5.86 5L10 14l-4.46 2.3.86-5L2.8 7.8l5-.7L10 2.5Z" stroke={NAVY} strokeWidth="1.5" strokeLinejoin="round" fill="rgba(53,173,223,0.18)" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke={BLUE} strokeWidth="1.5" />
      <path d="M2 5l7 4.5L16 5" stroke={BLUE} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function IconGlobe() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="7" stroke={BLUE} strokeWidth="1.5" />
      <path d="M9 2c-2 2.4-2 11.6 0 14M9 2c2 2.4 2 11.6 0 14M2 9h14" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
```


### `app/diogenes-proposal/ProposalShell.tsx`

<sub>272 lines</sub>

```tsx
'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'
import LogoFullWhite from '@/components/LogoFullWhite'

const SECTIONS = [
  { id: 'challenge',  label: 'The Challenge' },
  { id: 'strategy',   label: 'Strategy' },
  { id: 'discovery',  label: 'Getting Found' },
  { id: 'scope',      label: 'What We Build' },
  { id: 'imagery',    label: 'Imagery' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'investment', label: 'Investment' },
  { id: 'future',     label: 'Future Phases' },
  { id: 'next',       label: 'Next Steps' },
]

const NAVY = '#1A2939' // logo bar
const NAVY2 = '#16212E' // progress strip, a touch darker to separate the two
const BLUE = '#35ADDF'
const LOGO_H = 40 // px, slim logo bar
const PROG_H = 50 // px, progress strip
const TOTAL = LOGO_H + PROG_H // total fixed header height

export default function ProposalShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('challenge')
  const [progress, setProgress] = useState(0)
  const activeIndex = Math.max(0, SECTIONS.findIndex(s => s.id === active))
  const total = SECTIONS.length

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Keep the active step visible inside the horizontally scrolling track
  useEffect(() => {
    const btn = document.getElementById(`navitem-${active}`)
    btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - TOTAL + 1
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  return (
    <div style={{ fontFamily: "'Geist', sans-serif" }}>
      {/* Hide the track scrollbar on webkit without removing scroll function */}
      <style dangerouslySetInnerHTML={{ __html: '.dgp-navscroll::-webkit-scrollbar{display:none}' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
        {/* ---------- Strip 1: slim logo bar ---------- */}
        <div
          style={{
            height: `${LOGO_H}px`,
            background: NAVY,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '80rem',
              width: '100%',
              margin: '0 auto',
              padding: '0 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <a
              href="https://masuyodigital.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Masuyo Digital"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <LogoFullWhite className="h-[11px] w-auto" />
            </a>
            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Proposal
            </span>
          </div>
        </div>

        {/* ---------- Strip 2: section progress bar ---------- */}
        <div style={{ height: `${PROG_H}px`, background: NAVY2, position: 'relative' }}>
          <div
            style={{
              maxWidth: '80rem',
              width: '100%',
              height: '100%',
              margin: '0 auto',
              padding: '0 1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Step counter (desktop, fixed at left of the track) */}
            <div
              className="hidden md:flex"
              aria-hidden="true"
              style={{
                flexShrink: 0,
                alignItems: 'baseline',
                gap: '0.25rem',
                marginRight: '1rem',
                paddingRight: '1rem',
                borderRight: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: BLUE }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.6875rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>
                / {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Steps along the track (desktop, horizontally scrollable) */}
            <nav
              className="dgp-navscroll hidden md:flex"
              aria-label="Proposal sections"
              style={{
                alignItems: 'center',
                height: '100%',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {SECTIONS.map((s, i) => {
                const isActive = i === activeIndex
                const isDone = i < activeIndex
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {/* Connector segment: filled once the path into this step is reached */}
                    {i > 0 && (
                      <span
                        style={{
                          width: '1.25rem',
                          height: '2px',
                          flexShrink: 0,
                          background: i <= activeIndex ? BLUE : 'rgba(255,255,255,0.15)',
                          transition: 'background 0.3s ease',
                        }}
                      />
                    )}
                    <button
                      id={`navitem-${s.id}`}
                      onClick={() => scrollTo(s.id)}
                      aria-current={isActive ? 'true' : undefined}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        flexShrink: 0,
                        cursor: 'pointer',
                        border: 'none',
                        whiteSpace: 'nowrap',
                        background: isActive ? BLUE : 'transparent',
                        borderRadius: '999px',
                        padding: isActive ? '0.35rem 0.8rem' : '0.35rem 0.4rem',
                        transition: 'background 0.25s ease',
                      }}
                    >
                      {/* Step dot: done = filled blue, current = white on pill, upcoming = hollow */}
                      <span
                        style={{
                          width: isActive ? 7 : 8,
                          height: isActive ? 7 : 8,
                          borderRadius: '50%',
                          flexShrink: 0,
                          boxSizing: 'border-box',
                          background: isActive ? '#ffffff' : isDone ? BLUE : 'transparent',
                          border: isActive ? 'none' : isDone ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
                          transition: 'background 0.25s ease, border-color 0.25s ease',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Geist', sans-serif",
                          fontSize: '0.8125rem',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? '#ffffff' : isDone ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.42)',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        {s.label}
                      </span>
                    </button>
                  </div>
                )
              })}
            </nav>

            {/* Condensed current-step readout (mobile) */}
            <div className="flex md:hidden" style={{ alignItems: 'center', gap: '0.4rem', width: '100%', minWidth: 0 }}>
              <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: BLUE, flexShrink: 0 }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.6875rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
                / {String(total).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginLeft: '0.4rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                }}
              >
                {SECTIONS[activeIndex]?.label}
              </span>
            </div>
          </div>

          {/* Continuous scroll-progress fill, runs along the very bottom of the strip */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '3px', background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: BLUE, transition: 'width 0.1s linear' }} />
          </div>
        </div>
      </header>

      {/* Content begins below the full header so the bar never overlaps it */}
      <div style={{ paddingTop: `${TOTAL}px` }}>{children}</div>
    </div>
  )
}
```


### `app/diogenes-proposal/QuestionnaireButton.tsx`

<sub>682 lines</sub>

```tsx
'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { submitQuestionnaire } from './actions'

const NAVY  = '#1A2939'
const BLUE  = '#35ADDF'
const WHITE = '#ffffff'
const INK   = '#111318'
const H     = "var(--font-poppins)"
const B     = "'Geist', sans-serif"

/* ---------- Question definitions ---------- */

type QType = 'single' | 'multi' | 'longtext'

interface Question {
  id: string
  type: QType
  question: string
  options?: string[]
  hasOther?: string   // option label that reveals a text input
  hasYesText?: boolean // "Yes" option reveals a textarea
  optional?: boolean
  note?: string
}

const QUESTIONS: Question[] = [
  {
    id: 'q2',
    type: 'single',
    question: 'How would you like to handle the copy, the wording on the site?',
    options: [
      'We write draft copy from what you have provided, and you review and edit it (included)',
      'We write all the copy for you (£150)',
      'Not sure yet, let us discuss',
    ],
  },
  {
    id: 'q3',
    type: 'multi',
    question: 'Which pages do you need? Select all that apply.',
    options: [
      'Home',
      'New to Naturism and FAQs',
      'Facilities',
      'Membership and Arrange a Visit',
      'Events and News',
      'About and History',
      'Location and Contact',
      'Privacy Policy',
      'Something else',
    ],
    hasOther: 'Something else',
  },
  {
    id: 'q4',
    type: 'single',
    question: 'How far should the design lean toward a younger feel?',
    options: [
      'Lean noticeably younger',
      'A warm balance (recommended)',
      'Keep it close to the current feel',
      'Not sure, we would like your advice',
    ],
  },
  {
    id: 'q5',
    type: 'single',
    question: 'Do you have access to your current domain and hosting?',
    options: ['Yes, full access', 'We have some of it', 'No or not sure (we can help)'],
  },
  {
    id: 'q6',
    type: 'single',
    question: 'What is your preference for imagery on the site?',
    options: [
      'A professional photo and drone shoot',
      'Start with the grounds and add people later',
      'We have our own photos we can use',
      'Not sure, we would like your advice',
    ],
  },
  {
    id: 'q7',
    type: 'multi',
    question: 'Are you interested in any optional ongoing services?',
    options: [
      'Care plan at £100 per month (includes up to 4 hours support)',
      'Hosting only at £45 per month',
      'Weekly SEO articles at £100 per month',
      'Monthly SEO articles at £25 per month',
      'Google Ads setup at £100 per ad',
      'None for now',
    ],
  },
  {
    id: 'q9',
    type: 'longtext',
    question: 'Is there anything else you would like us to know?',
    optional: true,
    note: 'This is entirely optional. Leave it blank if you prefer.',
  },
]

/* ---------- localStorage helpers ---------- */

const LS_KEY = 'dgp_questionnaire_v2'

type Answers = Record<string, string | string[]>
type Extras  = Record<string, string>

function lsLoad(): { step: number; answers: Answers; extras: Extras } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function lsSave(step: number, answers: Answers, extras: Extras) {
  try { localStorage.setItem(LS_KEY, JSON.stringify({ step, answers, extras })) } catch {}
}

function lsClear() {
  try { localStorage.removeItem(LS_KEY) } catch {}
}

/* ---------- Button (public export) ---------- */

export default function QuestionnaireButton() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Portals can only target document.body after mount (avoids SSR mismatch)
  useEffect(() => setMounted(true), [])

  function handleOpen() {
    setOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function handleClose() {
    setOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: BLUE,
          color: WHITE,
          fontFamily: B,
          fontSize: '1.0625rem',
          fontWeight: 600,
          border: 'none',
          borderRadius: '0.5rem',
          padding: '1rem 2rem',
          cursor: 'pointer',
          letterSpacing: '0.01em',
          boxShadow: '0 4px 20px rgba(53,173,223,0.35)',
          transition: 'opacity 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Answer a few quick questions
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke={WHITE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Side tab and overlay are portaled to the body so no transformed or
          overflow-hidden ancestor (the floating panel, FadeIn) can clip them. */}
      {mounted && createPortal(
        <>
          {!open && <SideTab onOpen={handleOpen} />}
          {open && <QuestionnaireOverlay onClose={handleClose} />}
        </>,
        document.body
      )}
    </>
  )
}

/* ---------- Sticky side tab (persistent opener) ---------- */

function SideTab({ onOpen }: { onOpen: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onOpen}
      aria-label="Open the quick questions"
      style={{
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        background: hover ? '#2c9fd4' : BLUE,
        color: WHITE,
        border: 'none',
        borderRadius: '0.75rem 0 0 0.75rem',
        padding: 'clamp(0.7rem, 2vw, 0.95rem) clamp(0.45rem, 1.4vw, 0.6rem)',
        cursor: 'pointer',
        boxShadow: '-6px 0 24px rgba(0,0,0,0.28)',
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7.25" stroke={WHITE} strokeWidth="1.5" />
        <path d="M7 6.9a2 2 0 0 1 3.4 1.3c0 1.2-1.4 1.4-1.4 2.5" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="13" r="0.85" fill={WHITE} />
      </svg>
      <span
        style={{
          writingMode: 'vertical-rl',
          fontFamily: B,
          fontSize: 'clamp(0.75rem, 2vw, 0.8125rem)',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        Quick questions
      </span>
    </button>
  )
}

/* ---------- Overlay ---------- */

function QuestionnaireOverlay({ onClose }: { onClose: () => void }) {
  const total = QUESTIONS.length

  const [step,    setStep]    = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [extras,  setExtras]  = useState<Extras>({})
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [saved,   setSaved]   = useState(false)

  // Restore from localStorage
  useEffect(() => {
    const s = lsLoad()
    if (s) {
      setStep(Math.min(s.step ?? 0, total - 1))
      setAnswers(s.answers ?? {})
      setExtras(s.extras ?? {})
      setSaved(true)
    }
  }, [total])

  // Persist on every change
  useEffect(() => {
    if (status === 'success') return
    lsSave(step, answers, extras)
    setSaved(true)
  }, [step, answers, extras, status])

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  const q      = QUESTIONS[step]
  const answer = answers[q.id]
  const isLast = step === total - 1

  const canProceed =
    q.optional ? true
    : q.type === 'single' ? !!answer
    : q.type === 'multi'  ? Array.isArray(answer) && (answer as string[]).length > 0
    : true

  function setSingle(val: string) {
    setAnswers(prev => ({ ...prev, [q.id]: val }))
  }

  function toggleMulti(opt: string) {
    const cur = (answers[q.id] as string[]) ?? []
    setAnswers(prev => ({
      ...prev,
      [q.id]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt],
    }))
  }

  function setLong(val: string) {
    setAnswers(prev => ({ ...prev, [q.id]: val }))
  }

  function setExtra(key: string, val: string) {
    setExtras(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit() {
    setStatus('submitting')
    const payload: Record<string, string> = {}
    QUESTIONS.forEach(qn => {
      const a = answers[qn.id]
      payload[qn.id] = Array.isArray(a) ? a.join(', ') : (a as string) ?? ''
    })
    Object.entries(extras).forEach(([k, v]) => { payload[k] = v })

    try {
      const result = await submitQuestionnaire(payload)
      if (result.ok) { setStatus('success'); lsClear() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  function handleNext() {
    if (isLast) handleSubmit()
    else setStep(s => s + 1)
  }

  const pct = ((step + 1) / total) * 100

  /* --- shared styles --- */
  const optBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    width: '100%',
    textAlign: 'left',
    borderRadius: '0.625rem',
    padding: '0.9375rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.12s ease',
    border: '1.5px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
  }
  const optActive: React.CSSProperties = {
    ...optBase,
    background: 'rgba(53,173,223,0.14)',
    border: `1.5px solid ${BLUE}`,
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Proposal questionnaire"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(8,15,24,0.93)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        style={{
          background: '#0d1820',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '1.25rem',
          width: '100%',
          maxWidth: '38rem',
          maxHeight: '90svh',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {status === 'success' ? (
          <SuccessScreen onClose={onClose} />
        ) : (
          <>
            {/* ── Header (fixed, never scrolls) ── */}
            <div style={{ flexShrink: 0, padding: '1.375rem 1.5rem 0', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', marginBottom: '0.625rem' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: BLUE, borderRadius: '99px', transition: 'width 0.3s ease' }} />
                </div>
                <p style={{ fontFamily: B, fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Question {step + 1} of {total}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Save and close"
                style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: '0.125rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1, marginTop: '0.25rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* ── Question body (scrolls internally when tall) ── */}
            <div style={{ padding: '1.25rem 1.5rem 1rem', flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <h2
                style={{
                  fontFamily: H,
                  fontSize: 'clamp(1.125rem, 3.5vw, 1.4375rem)',
                  fontWeight: 700,
                  color: WHITE,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  marginBottom: '1.25rem',
                }}
              >
                {q.question}
              </h2>

              {q.note && (
                <p style={{ fontFamily: B, fontSize: '0.875rem', color: 'rgba(255,255,255,0.42)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {q.note}
                </p>
              )}

              {/* ── Single select ── */}
              {q.type === 'single' && q.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map(opt => {
                    const sel = answer === opt
                    return (
                      <button key={opt} onClick={() => setSingle(opt)} style={sel ? optActive : optBase}>
                        <Dot filled={sel} circle />
                        <span style={{ fontFamily: B, fontSize: '0.9375rem', fontWeight: sel ? 600 : 400, color: sel ? WHITE : 'rgba(255,255,255,0.72)', lineHeight: 1.4 }}>
                          {opt}
                        </span>
                      </button>
                    )
                  })}

                  {/* "Yes" free text (q8) */}
                  {q.hasYesText && answer === 'Yes' && (
                    <textarea
                      value={extras[`${q.id}_detail`] ?? ''}
                      onChange={e => setExtra(`${q.id}_detail`, e.target.value)}
                      placeholder="What did you particularly like?"
                      rows={3}
                      style={textareaStyle}
                    />
                  )}
                </div>
              )}

              {/* ── Multi select ── */}
              {q.type === 'multi' && q.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map(opt => {
                    const sel = ((answers[q.id] as string[]) ?? []).includes(opt)
                    return (
                      <button key={opt} onClick={() => toggleMulti(opt)} style={sel ? optActive : optBase}>
                        <Dot filled={sel} circle={false} />
                        <span style={{ fontFamily: B, fontSize: '0.9375rem', fontWeight: sel ? 600 : 400, color: sel ? WHITE : 'rgba(255,255,255,0.72)', lineHeight: 1.4 }}>
                          {opt}
                        </span>
                      </button>
                    )
                  })}

                  {/* "Something else" free text (q3) */}
                  {q.hasOther && ((answers[q.id] as string[]) ?? []).includes(q.hasOther) && (
                    <input
                      type="text"
                      value={extras[`${q.id}_other`] ?? ''}
                      onChange={e => setExtra(`${q.id}_other`, e.target.value)}
                      placeholder="Please describe the additional page"
                      style={inputStyle}
                    />
                  )}
                </div>
              )}

              {/* ── Long text ── */}
              {q.type === 'longtext' && (
                <textarea
                  value={(answer as string) ?? ''}
                  onChange={e => setLong(e.target.value)}
                  placeholder="Type here..."
                  rows={5}
                  style={textareaStyle}
                />
              )}
            </div>

            {/* ── Error ── */}
            {status === 'error' && (
              <div style={{ flexShrink: 0, margin: '0 1.5rem', padding: '0.875rem 1.125rem', background: 'rgba(220,60,60,0.12)', border: '1px solid rgba(220,60,60,0.28)', borderRadius: '0.625rem' }}>
                <p style={{ fontFamily: B, fontSize: '0.9375rem', color: '#ffaaaa', lineHeight: 1.5 }}>
                  Something went wrong sending your answers. Your progress is still saved on this device. Please try again, or get in touch with us directly.
                </p>
              </div>
            )}

            {/* ── Footer (fixed, never scrolls) ── */}
            <div
              style={{
                flexShrink: 0,
                padding: '1rem 1.5rem 1.375rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {step > 0 ? (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Save and close
                  </button>
                )}
                {saved && status !== 'error' && (
                  <span style={{ fontFamily: B, fontSize: '0.6875rem', color: 'rgba(255,255,255,0.25)' }}>
                    Progress saved on this device
                  </span>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed || status === 'submitting'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: canProceed && status !== 'submitting' ? BLUE : 'rgba(53,173,223,0.22)',
                  color: canProceed && status !== 'submitting' ? WHITE : 'rgba(255,255,255,0.35)',
                  fontFamily: B,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.6875rem 1.25rem',
                  cursor: canProceed && status !== 'submitting' ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                {status === 'submitting' ? 'Sending...' : isLast ? 'Submit' : 'Next'}
                {!isLast && status !== 'submitting' && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M2 6.5h9M7.5 3l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- Success screen ---------- */

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
      <div
        style={{
          width: '4.25rem',
          height: '4.25rem',
          borderRadius: '50%',
          background: 'rgba(53,173,223,0.14)',
          border: `1px solid rgba(53,173,223,0.3)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.75rem',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path d="M5 13l6 6 10-12" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ fontFamily: H, fontSize: '1.5rem', fontWeight: 700, color: WHITE, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
        Thank you, your answers are on their way.
      </h2>
      <p style={{ fontFamily: B, fontSize: '1rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, maxWidth: '22rem', margin: '0 auto 2.5rem' }}>
        Cameron will be in touch shortly. We are looking forward to working on this together.
      </p>
      <button
        onClick={onClose}
        style={{
          fontFamily: B,
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: WHITE,
          background: BLUE,
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.8125rem 1.75rem',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(53,173,223,0.3)',
        }}
      >
        Close
      </button>
    </div>
  )
}

/* ---------- Shared sub-components ---------- */

function Dot({ filled, circle }: { filled: boolean; circle: boolean }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: '1.125rem',
        height: '1.125rem',
        borderRadius: circle ? '50%' : '0.3125rem',
        border: filled ? 'none' : '1.5px solid rgba(255,255,255,0.28)',
        background: filled ? BLUE : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.12s ease',
      }}
    >
      {filled && circle && (
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: WHITE, display: 'block' }} />
      )}
      {filled && !circle && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
          <path d="M1.5 4.5l3 3 5-6" stroke={WHITE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

/* ---------- Shared input styles ---------- */

const sharedInput: React.CSSProperties = {
  width: '100%',
  fontFamily: B,
  fontSize: '0.9375rem',
  color: WHITE,
  background: 'rgba(255,255,255,0.05)',
  border: '1.5px solid rgba(255,255,255,0.13)',
  borderRadius: '0.625rem',
  outline: 'none',
  boxSizing: 'border-box',
  lineHeight: 1.6,
}

const textareaStyle: React.CSSProperties = {
  ...sharedInput,
  padding: '0.875rem 1rem',
  resize: 'vertical',
  marginTop: '0.375rem',
}

const inputStyle: React.CSSProperties = {
  ...sharedInput,
  padding: '0.8125rem 1rem',
  marginTop: '0.375rem',
  display: 'block',
}
```


### `app/diogenes-proposal/actions.ts`

<sub>75 lines</sub>

```ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { getSessionToken } from './session'

/* ---------- Password check ---------- */

export async function checkPassword(formData: FormData) {
  const input   = (formData.get('password') as string | null) ?? ''
  const correct = process.env.DIOGENES_PROPOSAL_PASSWORD ?? ''

  if (correct && input === correct) {
    cookies().set('dgp_session', getSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/diogenes-proposal',
    })
    redirect('/diogenes-proposal')
  }

  redirect('/diogenes-proposal?err=1')
}

/* ---------- Questionnaire submission ---------- */

const QUESTION_LABELS: Record<string, string> = {
  q2: 'How would you like to handle the copy?',
  q3: 'Which pages do you need?',
  q4: 'How far should the design lean toward a younger feel?',
  q5: 'Do you have access to your current domain and hosting?',
  q6: 'What is your preference for imagery?',
  q7: 'Are you interested in any optional ongoing services?',
  q9: 'Is there anything else you would like us to know?',
}

export async function submitQuestionnaire(
  data: Record<string, string>
): Promise<{ ok: boolean }> {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const lines = Object.entries(QUESTION_LABELS).map(([key, label]) => {
    const answer = data[key] || '(not answered)'
    const extra  = data[`${key}_detail`] || data[`${key}_other`]
    const detail = extra ? `\n   Note: ${extra}` : ''
    return `${label}\n   ${answer}${detail}`
  })

  const text = [
    'Diogenes Sun Club – Questionnaire Response',
    'Submitted via the proposal page',
    '',
    lines.join('\n\n'),
  ].join('\n')

  try {
    const { error } = await resend.emails.send({
      from: 'Masuyo Digital <hello@masuyodigital.com>',
      to:   'hello@masuyodigital.com',
      subject: 'Diogenes questionnaire response',
      text,
    })
    if (error) {
      console.error('Resend error:', error)
      return { ok: false }
    }
    return { ok: true }
  } catch (err) {
    console.error('submitQuestionnaire error:', err)
    return { ok: false }
  }
}
```


### `app/diogenes-proposal/page.tsx`

<sub>36 lines</sub>

```tsx
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getSessionToken } from './session'
import PasswordGate from './PasswordGate'
import ProposalShell from './ProposalShell'
import ProposalContent from './ProposalContent'

export const metadata: Metadata = {
  title: 'Proposal',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default async function DiogenesProposalPage({
  searchParams,
}: {
  searchParams: { err?: string }
}) {
  const cookieStore = cookies()
  const session = cookieStore.get('dgp_session')
  const expected = getSessionToken()
  const isAuthenticated = !!expected && session?.value === expected

  if (!isAuthenticated) {
    return <PasswordGate hasError={searchParams.err === '1'} />
  }

  return (
    <ProposalShell>
      <ProposalContent />
    </ProposalShell>
  )
}
```


### `app/diogenes-proposal/session.ts`

<sub>7 lines</sub>

```ts
import crypto from 'crypto'

export function getSessionToken(): string {
  const secret = process.env.DIOGENES_PROPOSAL_PASSWORD
  if (!secret) return ''
  return crypto.createHmac('sha256', secret).update('dgp_session_v1').digest('hex')
}
```


### `app/faq/layout.tsx`

<sub>16 lines</sub>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Straight answers to the questions we hear most often: pricing, timelines, process, SEO, and what makes Masuyo different.',
  openGraph: {
    title: 'FAQ – Masuyo Digital',
    description: 'Straight answers about our process, pricing, and services.',
    url: 'https://masuyodigital.com/faq',
  },
  alternates: { canonical: 'https://masuyodigital.com/faq' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
```


### `app/faq/page.tsx`

<sub>235 lines</sub>

```tsx
'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import RevealAnimation from '@/components/RevealAnimation'
import Link from 'next/link'

const groups = [
  {
    heading: 'Getting Started',
    faqs: [
      {
        q: 'How do I get started with Masuyo?',
        a: 'The easiest way is to fill in our Start a Project form, which takes about two minutes and gives you an indicative cost range. Alternatively, drop us a message on the Contact page or email hello@masuyodigital.com. We will get back to you within one business day.',
      },
      {
        q: 'Do I need to know exactly what I want before getting in touch?',
        a: 'Not at all. Most of our clients come to us with a rough idea and we help them work out the rest. A short conversation is usually enough to understand what you need and what the right approach is.',
      },
      {
        q: 'Do I need to provide any content before you start building?',
        a: 'It helps to have your logo and a general sense of what you want to say, but it is not essential before we begin. We can work with you to develop copy and will advise on imagery. Just let us know what you have and what you need.',
      },
      {
        q: 'Can you work with businesses outside the UK?',
        a: 'Yes. We are based in the UK but work with clients globally. All communication is handled remotely and we are experienced at working across time zones.',
      },
      {
        q: 'What size of business do you work with?',
        a: 'All sizes. From sole traders launching their first website to established companies scaling their digital presence. Our approach adapts to the size and stage of your business.',
      },
    ],
  },
  {
    heading: 'Pricing and Packages',
    faqs: [
      {
        q: 'How much does a website cost?',
        a: 'Our starter websites begin at £249. More complex projects are priced based on your specific requirements. The best way to get an idea is to use our project estimator, which will give you an indicative range in a couple of minutes. Final pricing is always confirmed after a discovery call.',
      },
      {
        q: 'What is included in the £249 starter website?',
        a: 'The starter package includes up to 5 pages, a contact form, full mobile optimisation, basic SEO setup, SSL certificate, and hosting on our own servers. It is designed to get a professional, working website live quickly for businesses just getting started.',
      },
      {
        q: 'Are there ongoing costs after my site is built?',
        a: 'Hosting and support are available as an ongoing arrangement. Hosting includes server management, uptime monitoring, backups, and SSL. We also offer monthly retainers for ongoing marketing, updates, or development work. There is no obligation to continue beyond the initial build if you just need a one-off project.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes, for larger projects we typically work to a split payment structure: a deposit to begin, a mid-point payment, and a final payment on completion. We will discuss this during the discovery call.',
      },
      {
        q: 'Can I get a fixed-price quote?',
        a: 'Yes. Once we understand your requirements through a discovery call, we provide a fixed-price quote. There are no surprise invoices at the end of the project.',
      },
    ],
  },
  {
    heading: 'The Build Process',
    faqs: [
      {
        q: 'How long does it take to build a website?',
        a: 'Our starter websites are delivered within 7 working days. More complex websites or web applications typically take 2–6 weeks depending on scope. We will give you a clear timeline before any work begins.',
      },
      {
        q: 'What does the process look like from start to finish?',
        a: 'We start with a discovery call or brief to understand your requirements. We then design and build your site, keeping you informed at key stages. You get a review round before launch and we handle all the technical aspects of going live. We stay in touch after launch to make sure everything is running as expected.',
      },
      {
        q: 'Do I get to review the work before it goes live?',
        a: 'Yes, always. We share the site for your review before launch. Our standard packages include a round of revisions so you can make sure everything is exactly as you want it.',
      },
      {
        q: 'Will my website be mobile friendly?',
        a: 'Yes, every website we build is fully responsive and tested across multiple screen sizes and devices. Mobile-first design is our standard approach.',
      },
      {
        q: 'Do you use templates or build from scratch?',
        a: 'We build from scratch using modern frameworks. We do not use page builders or cookie-cutter templates. This gives you a faster, more flexible site that is designed around your specific business rather than a generic layout.',
      },
    ],
  },
  {
    heading: 'After Launch',
    faqs: [
      {
        q: 'Can I update the site myself after it is built?',
        a: 'Yes, if required. We can build your site with a content management system (CMS) that lets you update text, images, blog posts and more without needing a developer. We will show you how to use it and provide documentation.',
      },
      {
        q: 'What happens if something breaks after launch?',
        a: 'If we built your site and host it with us, we are on hand to fix any issues quickly. We monitor our hosting infrastructure proactively and can usually resolve problems before you even notice them. If something does go wrong, you contact us directly, not through a support ticket system.',
      },
      {
        q: 'What is included in hosting?',
        a: 'Our managed hosting includes your own space on our server infrastructure, fast load times, SSL certificate, daily backups, uptime monitoring, and direct support from the team who built your site. We do not outsource hosting to third parties.',
      },
      {
        q: 'Can you take over hosting for a site built by someone else?',
        a: 'Yes. We regularly migrate existing websites onto our hosting. Get in touch and we will assess what is involved and give you a clear picture of costs.',
      },
    ],
  },
  {
    heading: 'SEO and Marketing',
    faqs: [
      {
        q: 'What is SEO and do I need it?',
        a: 'SEO (Search Engine Optimisation) is the process of improving your website so it appears higher in Google search results when people search for what you offer. If you want to attract customers through search engines, you need it. It is a long-term investment that compounds over time.',
      },
      {
        q: 'Does every website you build come with SEO?',
        a: 'Every website we build includes basic on-page SEO setup: proper page titles, meta descriptions, semantic HTML structure, fast loading speeds, and mobile optimisation. This gives you a solid foundation. Ongoing SEO work (content strategy, link building, technical audits) is a separate service.',
      },
      {
        q: 'How long does SEO take to show results?',
        a: 'Honest answer: 3–6 months is typical before you see meaningful organic traffic growth, though this depends heavily on your industry and competition. SEO is not a quick fix; it is a consistent, compounding strategy. We will always give you a realistic picture of what is achievable in your market.',
      },
      {
        q: 'Do you run paid ads?',
        a: 'Yes. We manage Google Ads, Meta Ads (Facebook and Instagram) and other paid channels. We build campaigns focused on generating real results: enquiries, leads, sales, not just clicks and impressions.',
      },
      {
        q: 'What makes Masuyo different from other digital agencies?',
        a: 'We are a small, focused team that handles everything directly. No account managers passing your work to offshore developers. No bloated retainers for things you do not need. We are honest about what will and will not work, and we measure success by results, not by how many deliverables we can put on a report.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-semibold text-ink pr-4" style={{ fontFamily: 'Geist, sans-serif', lineHeight: '1.6' }}>{q}</span>
        <span className="flex-shrink-0 mt-0.5 transition-transform" style={{ transform: open ? 'rotate(45deg)' : 'none', color: 'var(--mid)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Frequently asked questions
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Straight answers to the questions we hear most often.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Jump links */}
      <section className="py-8 sticky top-16 z-40" style={{ background: 'var(--light)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {groups.map(g => (
              <a key={g.heading} href={`#${g.heading.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors hover:bg-white"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                {g.heading}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {groups.map((g, gi) => (
            <div key={g.heading} id={g.heading.toLowerCase().replace(/\s+/g, '-')} className={gi > 0 ? 'mt-16' : ''}>
              <RevealAnimation>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {g.heading}
                </h2>
              </RevealAnimation>
              <div style={{ borderTop: '1px solid var(--border)' }}>
                {g.faqs.map((faq, fi) => (
                  <RevealAnimation key={fi} delay={Math.min(fi, 2) as 0 | 1 | 2}>
                    <FAQItem q={faq.q} a={faq.a} />
                  </RevealAnimation>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Still have questions?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p className="text-base mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              We are happy to talk through anything that is not covered here.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={2}>
            <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
              style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
              Get in touch
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
```


### `app/get-a-website/layout.tsx`

<sub>16 lines</sub>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Website',
  description: 'Your website, live in 7 working days. Professional, fast and built around your business. Starting at £249.',
  openGraph: {
    title: 'Get a Website – Masuyo Digital',
    description: 'Your website, live in 7 working days. Starting at £249.',
    url: 'https://masuyodigital.com/get-a-website',
  },
  alternates: { canonical: 'https://masuyodigital.com/get-a-website' },
}

export default function GetAWebsiteLayout({ children }: { children: React.ReactNode }) {
  return children
}
```


### `app/get-a-website/page.tsx`

<sub>277 lines</sub>

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'

const steps = [
  { number: '01', title: 'Choose your package below.' },
  { number: '02', title: 'Complete a short brief telling us about your business.' },
  { number: '03', title: 'We get to work. No lengthy calls, no back and forth.' },
  { number: '04', title: 'Your site is live within 7 working days.' },
]

const packages = [
  {
    name: 'Starter',
    price: '£249',
    description: 'A clean, professional website for businesses getting online.',
    features: ['Up to 5 pages', 'Contact form', 'Mobile ready', 'SEO setup', 'Hosted by us'],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '£649',
    description: 'For businesses that need more.',
    features: ['Up to 10 pages', 'Blog setup', 'Lead capture', 'Analytics', 'Priority delivery'],
    cta: 'Get started',
    featured: true,
  },
  {
    name: 'Custom',
    price: 'Let\'s talk',
    description: 'Got something more specific in mind? Get in touch.',
    features: ['Tailored to your needs', 'Custom functionality', 'Full consultation', 'Bespoke quote'],
    cta: 'Contact us',
    featured: false,
  },
]

const included = [
  'Built by a real team, not a template generator',
  'Hosted on our own servers',
  'SSL certificate included',
  'Mobile and tablet optimised',
  'Basic SEO setup',
  'Delivered in 7 working days',
]

const faqs = [
  {
    q: 'What do I need to provide?',
    a: 'Just a short brief about your business, your logo if you have one, and any copy or images you want included. We can advise on the rest.',
  },
  {
    q: 'What if I do not have a logo or copy?',
    a: 'We can help with that. Just mention it when you submit your brief.',
  },
  {
    q: 'What happens after the 7 days?',
    a: 'Your site goes live. We then offer ongoing hosting and support packages if you want us to stay involved.',
  },
  {
    q: 'Can I make changes after?',
    a: 'Yes. We offer a revision round as standard and ongoing support if needed.',
  },
]

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{q}</span>
        <span className="flex-shrink-0 transition-transform" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', color: 'var(--mid)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{a}</p>
      </div>
    </div>
  )
}

export default function GetAWebsitePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--blue)' }} className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Your website, live in 7 working days.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-xl" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Geist, sans-serif' }}>
                Professional, fast and built around your business. Starting at £249.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              How it works
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex flex-col gap-3">
                  <span className="text-3xl font-semibold" style={{ color: 'var(--blue)', fontFamily: 'var(--font-poppins)' }}>{step.number}</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{step.title}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              Choose your package
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <RevealAnimation key={pkg.name} delay={(i + 1) as 1 | 2 | 3}>
                <div
                  className="p-8 rounded-lg flex flex-col gap-6 relative h-full"
                  style={{
                    background: pkg.featured ? 'var(--navy)' : 'var(--white)',
                    border: pkg.featured ? 'none' : '1px solid var(--border)',
                  }}
                >
                  {pkg.featured && (
                    <span
                      className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded"
                      style={{ background: 'var(--blue)', color: 'var(--white)', fontFamily: 'Geist, sans-serif' }}
                    >
                      Most popular
                    </span>
                  )}
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: pkg.featured ? 'rgba(255,255,255,0.5)' : 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {pkg.name}
                    </p>
                    <p
                      className="text-4xl font-semibold mb-2"
                      style={{ fontFamily: 'var(--font-poppins)', color: pkg.featured ? 'var(--white)' : 'var(--ink)' }}
                    >
                      {pkg.price}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: pkg.featured ? 'rgba(255,255,255,0.65)' : 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {pkg.description}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: pkg.featured ? 'rgba(255,255,255,0.8)' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke={pkg.featured ? 'rgba(255,255,255,0.5)' : 'var(--blue)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {pkg.name === 'Custom' ? (
                    <Link
                      href="/contact"
                      className="block text-center text-sm font-semibold px-6 py-3.5 rounded transition-colors"
                      style={{ background: 'var(--light)', color: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {pkg.cta}
                    </Link>
                  ) : (
                    <a
                      href="https://formspree.io/f/xlgpogqk"
                      className="block text-center text-sm font-semibold px-6 py-3.5 rounded transition-colors"
                      style={{
                        background: pkg.featured ? 'var(--blue)' : 'var(--navy)',
                        color: 'var(--white)',
                        fontFamily: 'Geist, sans-serif',
                      }}
                    >
                      {pkg.cta}
                    </a>
                  )}
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                What is included in every package
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <ul className="flex flex-col gap-3">
                {included.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm pb-3" style={{ borderBottom: i < included.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                    <span style={{ color: 'var(--blue)', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
                Questions
              </h2>
            </RevealAnimation>
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {faqs.map((faq, i) => (
                <FAQ key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2 className="text-2xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Not ready to order yet? That is fine.
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
              Ask us a question
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
```


### `app/glossary/layout.tsx`

<sub>16 lines</sub>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Marketing Glossary',
  description: 'Plain-English definitions of 30+ digital marketing and web terms: from A/B testing and bounce rate to SEO, UX, and conversion rate.',
  openGraph: {
    title: 'Digital Marketing Glossary – Masuyo Digital',
    description: 'Plain-English definitions of digital marketing, SEO, and web terms for UK businesses.',
    url: 'https://masuyodigital.com/glossary',
  },
  alternates: { canonical: 'https://masuyodigital.com/glossary' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
```


### `app/glossary/page.tsx`

<sub>136 lines</sub>

```tsx
import RevealAnimation from '@/components/RevealAnimation'
import Link from 'next/link'

const terms = [
  { term: 'A/B Testing', definition: 'A method of comparing two versions of a webpage or ad to see which performs better. One group of users sees version A, another sees version B, and you measure which achieves your goal: more clicks, sign-ups, or purchases.' },
  { term: 'Alt Text', definition: 'A written description added to an image on a webpage. It helps search engines understand what an image shows, and is read aloud by screen readers for visually impaired users. Missing alt text is both an SEO and accessibility issue.' },
  { term: 'Backlink', definition: 'A link from another website to yours. Search engines treat backlinks as votes of confidence: the more high-quality sites that link to you, the more authority your site tends to have in search rankings.' },
  { term: 'Bounce Rate', definition: 'The percentage of visitors who land on a page and leave without clicking anything else. A high bounce rate is not always bad (it depends on the page purpose), but on key landing pages it often signals a mismatch between what people expect and what they find.' },
  { term: 'Call to Action (CTA)', definition: 'A button, link, or prompt that tells a visitor what to do next. Examples include "Get a free quote", "Book a call", or "Download the guide". A clear CTA is one of the simplest ways to improve conversion rates.' },
  { term: 'Canonical URL', definition: 'The preferred version of a webpage when multiple URLs show the same or similar content. A canonical tag tells search engines which version to index, preventing duplicate content issues that can dilute your rankings.' },
  { term: 'Click-Through Rate (CTR)', definition: 'The percentage of people who click on a link after seeing it. Used in search results (how many people click your listing vs see it) and in email marketing (how many recipients click a link in your email).' },
  { term: 'Content Management System (CMS)', definition: 'Software that lets you create and manage website content without writing code. WordPress, Sanity, and Contentful are popular examples. A CMS allows business owners to update text and images themselves after a site is built.' },
  { term: 'Conversion', definition: 'When a visitor completes a desired action on your website. A conversion could be making a purchase, submitting an enquiry form, signing up for a newsletter, or calling your phone number, depending on whatever goal the page is designed around.' },
  { term: 'Conversion Rate', definition: 'The percentage of visitors who complete a desired action. If 200 people visit your contact page and 14 fill in the form, your conversion rate is 7%. Improving conversion rate is often more cost-effective than driving more traffic.' },
  { term: 'Core Web Vitals', definition: 'A set of three Google metrics that measure real-world user experience: Largest Contentful Paint (how fast the main content loads), First Input Delay (how quickly the page responds to interaction), and Cumulative Layout Shift (how stable the layout is while loading). These directly affect Google rankings.' },
  { term: 'Cost Per Click (CPC)', definition: 'The amount you pay each time someone clicks on one of your paid ads. Used in Google Ads and Meta Ads. A lower CPC means you are paying less to get traffic, but the quality of that traffic also matters.' },
  { term: 'Cost Per Lead (CPL)', definition: 'The total spend divided by the number of leads generated. If you spend £500 on ads and get 25 enquiries, your CPL is £20. This is a more meaningful metric than CPC because it tracks actual business outcomes, not just clicks.' },
  { term: 'Domain Authority (DA)', definition: 'A score (1–100) developed by Moz that predicts how likely a website is to rank in search results. It is based on the number and quality of backlinks pointing to the site. DA is a useful benchmark, but not a metric Google itself uses.' },
  { term: 'Favicon', definition: 'The small icon that appears in a browser tab next to a page title, and in bookmarks. Usually a simplified version of your logo. A missing favicon is a small detail that makes a site look less polished.' },
  { term: 'Google Business Profile (GBP)', definition: 'The free listing that appears in Google Maps and in the local pack of search results. For businesses serving a local area, a fully optimised GBP is often the fastest route to more enquiries, often more impactful than the main website for many local searches.' },
  { term: 'Heading Tags (H1, H2, H3)', definition: 'HTML elements that structure content on a page. The H1 is the main heading, and there should only be one per page. H2s and H3s are sub-headings. Search engines use these to understand page structure, so using them logically matters for SEO.' },
  { term: 'Heatmap', definition: 'A visual tool that shows where users click, scroll to, or move their mouse on a webpage. Tools like Hotjar generate heatmaps. They are useful for understanding which parts of a page people engage with and where they drop off.' },
  { term: 'Impression', definition: 'The number of times an ad or search result is shown, regardless of whether anyone clicked it. Impressions measure visibility. A high impression count with a low CTR suggests your headline or listing is not compelling enough.' },
  { term: 'Keyword', definition: 'A word or phrase that people type into search engines. SEO involves targeting the keywords your ideal customers use, both to optimise your existing pages and to guide what content to create.' },
  { term: 'Landing Page', definition: 'A standalone webpage designed around a single goal, usually to capture a lead or make a sale. Unlike a standard homepage, a landing page removes distractions and focuses the visitor on one action. Often used in paid advertising campaigns.' },
  { term: 'Meta Description', definition: 'The short summary that appears under your page title in search results. It does not directly affect rankings, but a well-written meta description improves click-through rate by telling searchers exactly what they will find on the page.' },
  { term: 'Organic Traffic', definition: 'Visitors who arrive at your website from unpaid search results. As opposed to paid traffic from ads. Organic traffic is the goal of SEO, building a sustainable source of visitors that does not require ongoing ad spend.' },
  { term: 'Page Speed', definition: 'How quickly a webpage loads. Measured in seconds. Google uses page speed as a ranking signal, and slow pages lose visitors; research consistently shows that each extra second of load time reduces conversions.' },
  { term: 'Responsive Design', definition: 'A web design approach where a site automatically adjusts its layout to fit any screen size: phone, tablet, or desktop. Responsive design is the standard, not a premium feature. Google also uses mobile-first indexing, meaning how your site performs on mobile affects your overall rankings.' },
  { term: 'Return on Ad Spend (ROAS)', definition: 'Revenue generated for every pound spent on advertising. If you spend £1,000 on ads and generate £4,000 in revenue, your ROAS is 4x (or 400%). It is a core metric for judging whether a paid campaign is profitable.' },
  { term: 'Schema Markup', definition: 'Code added to a webpage that helps search engines understand the content in detail, for example by flagging that a page contains a product with a price, a review with a star rating, or an event with a date. Can lead to rich results in Google that stand out from standard listings.' },
  { term: 'Search Engine Optimisation (SEO)', definition: 'The process of improving a website so it ranks higher in search engine results for relevant queries. SEO covers three areas: technical (how the site is built), on-page (the content and structure), and off-page (backlinks and authority). Results take 3–6 months to materialise but compound over time.' },
  { term: 'SSL Certificate', definition: 'A security certificate that encrypts the connection between a website and its visitors. Sites with SSL show "https://" and a padlock icon in the browser. Google treats SSL as a ranking factor, and modern browsers warn users when a site does not have one.' },
  { term: 'Title Tag', definition: 'The clickable headline that appears in search results and in the browser tab. One of the most important on-page SEO elements. Each page should have a unique, descriptive title tag under 60 characters that includes the target keyword.' },
  { term: 'UX (User Experience)', definition: 'How easy and enjoyable a website or app is to use. Good UX means visitors can find what they need quickly, the layout makes sense, and nothing feels confusing or broken. Poor UX drives visitors away regardless of how good your product or service is.' },
  { term: 'XML Sitemap', definition: 'A file that lists all the important pages on your website and helps search engines discover and index them. Submitting a sitemap to Google Search Console is one of the first steps in any SEO setup.' },
]

const letters: string[] = Array.from(new Set<string>(terms.map(t => t.term[0]))).sort()

export default function GlossaryPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Digital marketing glossary
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Plain-English definitions of the terms you will hear when working with a digital agency.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Jump links */}
      <section className="py-6 sticky top-16 z-40" style={{ background: 'var(--light)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-1.5">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="text-xs font-semibold w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-white"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {letters.map(letter => {
            const letterTerms = terms.filter(t => t.term[0] === letter)
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--blue)', minWidth: '2rem' }}>
                    {letter}
                  </span>
                  <div className="flex-1" style={{ height: '1px', background: 'var(--border)' }} />
                </div>
                <dl className="flex flex-col gap-8">
                  {letterTerms.map(({ term, definition }) => (
                    <RevealAnimation key={term}>
                      <div>
                        <dt className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                          {term}
                        </dt>
                        <dd className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                          {definition}
                        </dd>
                      </div>
                    </RevealAnimation>
                  ))}
                </dl>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Want to put these into practice?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p className="text-base mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              We help UK businesses apply digital marketing properly, no jargon, no bloated retainers.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={2}>
            <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
              style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
              Get in touch
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
```


### `app/industries/layout.tsx`

<sub>16 lines</sub>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industries We Work With',
  description: 'Masuyo Digital works with businesses across 13 industries in the UK: from e-commerce and healthcare to tradespeople and professional services.',
  openGraph: {
    title: 'Industries We Work With – Masuyo Digital',
    description: 'Bespoke digital solutions tailored to your industry. Web design, SEO, and marketing for UK businesses.',
    url: 'https://masuyodigital.com/industries',
  },
  alternates: { canonical: 'https://masuyodigital.com/industries' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
```


### `app/industries/page.tsx`

<sub>226 lines</sub>

```tsx
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'

const industries = [
  {
    slug: 'ecommerce',
    label: 'E-commerce',
    description: 'Conversion-optimised online stores built for growth, mobile-first checkout, and lower cart abandonment.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 5h2.5l2 10h13l2-7H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11.5" cy="19.5" r="1.5" fill="currentColor" />
        <circle cx="18.5" cy="19.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    slug: 'healthcare',
    label: 'Healthcare',
    description: 'Professional, GDPR-compliant websites for clinics, practices, and healthcare providers that build patient trust.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'tradespeople',
    label: 'Tradespeople',
    description: 'Local search dominance, gallery showcases, and lead generation for builders, plumbers, electricians, and more.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22l10-10m0 0l3-7 4 4-7 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'hospitality',
    label: 'Hospitality',
    description: 'Beautiful hotel and venue websites with direct booking integrations that reduce reliance on third-party platforms.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 22V11l9-7 9 7v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="11" y="16" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    slug: 'legal',
    label: 'Legal',
    description: 'Authority-building websites for law firms and solicitors: practice area pages, consultation booking, and trust signals.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v20M6 8l4 8H6m12 0h-4l4-8M6 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'education',
    label: 'Education',
    description: 'Clear enrolment journeys, course pages, and local SEO for schools, colleges, tutors, and training providers.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5L3 11l11 6 11-6-11-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11v7M8 13.5v5a6 6 0 0012 0v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'finance',
    label: 'Finance',
    description: 'Trust-focused digital presence for IFAs, mortgage brokers, and fintech businesses: compliant, clear, and conversion-ready.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 20V12M10 20V8M15 20v-6M20 20V5M3 22h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'real-estate',
    label: 'Real Estate',
    description: 'Property search, local area SEO, and lead capture for estate agents and letting agencies, with less reliance on portals.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M3 22V11l11-9 11 9v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 22v-7h8v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'fitness-wellness',
    label: 'Fitness & Wellness',
    description: 'Class booking integrations, membership landing pages, and results-focused content for gyms, studios, and therapists.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 14a4 4 0 008 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'automotive',
    label: 'Automotive',
    description: 'Vehicle inventory pages, high-intent Google Ads, and local SEO for car dealers, garages, and MOT centres.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 16l2-6h16l2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="16" width="22" height="5" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8.5" cy="21" r="2" fill="currentColor" />
        <circle cx="19.5" cy="21" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    slug: 'charity-non-profit',
    label: 'Charity & Non-Profit',
    description: 'Emotive, accessible websites with donation integrations and volunteer recruitment for charities and non-profits.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 22s-9-5.5-9-12a5 5 0 0110 0 5 5 0 0110 0c0 6.5-11 12-11 12z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'professional-services',
    label: 'Professional Services',
    description: 'Thought leadership, service landing pages, and lead nurturing for consultants, accountants, and B2B firms.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 6V4h8v2M8 12h12M8 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'restaurants-food',
    label: 'Restaurants & Food',
    description: 'Direct ordering, menu showcases, and local SEO for restaurants, cafes, and food businesses, with less margin lost to aggregators.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9 4v7a4 4 0 008 0V4M13 15v9M17 4v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Industries we work with
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Every industry has its own digital challenges. We build solutions that fit how your business actually works.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <RevealAnimation key={industry.slug} delay={(i % 3) as 0 | 1 | 2}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group block p-6 rounded-lg transition-shadow hover:shadow-md h-full"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                >
                  <div className="mb-4" style={{ color: 'var(--blue)' }}>
                    {industry.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-ink mb-2 group-hover:text-navy transition-colors" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {industry.label}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                    {industry.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:opacity-80" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Not sure which solution fits your business?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
              Tell us about your project and we will recommend the right approach.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={2}>
            <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
              style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
              Start a project
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
```


### `app/lifestyle-venues/VenueContactForm.tsx`

<sub>132 lines</sub>

```tsx
'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

export default function VenueContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/xlgpogqk', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="p-8 rounded-lg text-center"
        style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
      >
        <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="var(--blue)" fillOpacity="0.1" />
          <path d="M12 20l5.5 5.5 10.5-11" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-xl font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>Message sent</h3>
        <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          Thanks for getting in touch. We will get back to you within a day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Hidden fields to identify the enquiry source */}
      <input type="hidden" name="_subject" value="New enquiry from Lifestyle Venues page" />
      <input type="hidden" name="source" value="lifestyle-venues" />

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
          Your name *
        </label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
          style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)', background: 'var(--white)' }}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
          Venue name *
        </label>
        <input
          name="venue"
          type="text"
          required
          className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
          style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)', background: 'var(--white)' }}
          placeholder="Your venue"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
          Email address *
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
          style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)', background: 'var(--white)' }}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
          A short message *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 text-sm rounded outline-none transition-colors resize-none"
          style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)', background: 'var(--white)' }}
          placeholder="Tell us a little about your venue and what you need..."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>
          Something went wrong. Please try again or email us directly at hello@masuyodigital.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity disabled:opacity-60"
        style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
      >
        {status === 'submitting' ? 'Sending...' : 'Send'}
      </button>

      <p className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.6' }}>
        We work discreetly and professionally with every client. Your enquiry stays between us.
      </p>
    </form>
  )
}
```


### `app/lifestyle-venues/page.tsx`

<sub>261 lines</sub>

```tsx
import type { Metadata } from 'next'
import RevealAnimation from '@/components/RevealAnimation'
import VenueContactForm from './VenueContactForm'

export const metadata: Metadata = {
  title: { absolute: 'Websites and marketing for lifestyle and adult venues | Masuyo Digital' },
  description: 'Web design, SEO and digital marketing built specifically for UK lifestyle, adult and members venues. Built by a team that understands your industry.',
  openGraph: {
    title: 'Websites and marketing for lifestyle and adult venues | Masuyo Digital',
    description: 'Web design, SEO and digital marketing built specifically for UK lifestyle, adult and members venues. Built by a team that understands your industry.',
    url: 'https://masuyodigital.com/lifestyle-venues',
  },
  alternates: { canonical: 'https://masuyodigital.com/lifestyle-venues' },
}

const features = [
  {
    title: 'Modern websites',
    body: 'Clean, fast, mobile-first sites that make your venue look as good online as it does in person. Easy for you to update, built to be discreet and professional.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 7h15M5 17h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Getting found on Google',
    body: 'Proper search optimisation so people looking for a venue like yours actually find you, without needing the advertising channels you are banned from.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Built for your industry',
    body: 'We already work in this space, so we understand discretion, the audience, the sensitivities and what does and does not work. No awkward conversations, no judgement.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l6 2.5v4c0 3.8-2.6 6.6-6 8-3.4-1.4-6-4.2-6-8V5l6-2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M7.5 10l1.8 1.8L13 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Ongoing support',
    body: 'We do not disappear after launch. Updates, changes and advice when you need them.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 2v2.5M10 15.5V18M18 10h-2.5M4.5 10H2M15.66 4.34l-1.77 1.77M6.11 13.89l-1.77 1.77M15.66 15.66l-1.77-1.77M6.11 6.11L4.34 4.34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

const steps = [
  {
    number: '01',
    title: 'We talk.',
    body: 'Tell us about your venue and what you need. No pressure, no pitch, just a conversation.',
  },
  {
    number: '02',
    title: 'We build.',
    body: 'We design and build your site, or sort your existing one, and get your search visibility working.',
  },
  {
    number: '03',
    title: 'You grow.',
    body: 'You get a professional online presence that brings people through the door, with us on hand when you need us.',
  },
]

export default function LifestyleVenuesPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Websites and marketing for venues the mainstream will not touch.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg md:text-xl mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We design websites and get you found online, built specifically for UK lifestyle, adult and members venues by a team that already works in your world.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <a
                href="#contact"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded transition-colors"
                style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                Get in touch
              </a>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Section 1: The problem */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                You run a great venue. The internet makes it hard to show it.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                If you run a lifestyle, adult or members venue, you already know the problem. You are locked out of Google Ads and Meta. Mainstream agencies do not understand your industry, or quietly refuse to work with it. Your website might be dated, hard to update, or invisible when people search for you. And the platforms everyone else relies on to grow simply are not open to you.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                The result is that good venues stay hidden, while the people looking for them cannot find them.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Section 2: What we do */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What we build for you.
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <RevealAnimation key={f.title} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="p-8 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="w-11 h-11 rounded flex items-center justify-center mb-5 flex-shrink-0" style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2.5" style={{ fontFamily: 'var(--font-poppins)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>{f.body}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why us */}
      <section className="py-24" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
                Why us
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                We already work in your world.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                Masuyo Digital is the team behind Venuva, the UK lifestyle and adult venue directory. We built it from the ground up: clean, modern, discreet and built to rank. We understand this industry because we work in it every day, and we know exactly what a venue needs to be found, trusted and booked.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                When you work with us, you are not explaining your business to a mainstream agency that does not get it. You are working with people who already do.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={4}>
              <a
                href="https://venuva.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                See our work at Venuva
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Section 4: How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              Simple, straightforward, no jargon.
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <RevealAnimation key={step.number} delay={(i + 1) as 1 | 2 | 3}>
                <div className="flex flex-col gap-3">
                  <span className="text-3xl font-semibold" style={{ color: 'var(--blue)', fontFamily: 'var(--font-poppins)' }}>{step.number}</span>
                  <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>{step.body}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Contact */}
      <section id="contact" className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <RevealAnimation>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Let us talk.
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Tell us a little about your venue and what you need. We will get back to you within a day. No obligation, no hard sell.
                </p>
                <div className="p-6 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <h3 className="text-base font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                    What to expect
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {[
                      'We reply within one business day',
                      'A discreet, professional conversation',
                      'Honest advice on what your venue actually needs',
                      'No judgement, no awkward questions',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1}>
              <VenueContactForm />
            </RevealAnimation>
          </div>
        </div>
      </section>
    </>
  )
}
```


### `app/marketing/page.tsx`

<sub>268 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Digital Marketing Services | SEO, Paid Ads and Lead Generation | Masuyo Digital',
  description: 'From SEO and paid ads to email automation and content marketing, Masuyo Digital builds marketing systems that generate consistent leads and grow your business.',
  openGraph: {
    title: 'Digital Marketing Services | SEO, Paid Ads and Lead Generation | Masuyo Digital',
    description: 'From SEO and paid ads to email automation and content marketing, Masuyo Digital builds marketing systems that generate consistent leads and grow your business.',
    url: 'https://masuyodigital.com/marketing',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing' },
}

/* ─── Category icons ──────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 16.5L23 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="2.5" fill="currentColor" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="2" y="5" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8l11 8 11-8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Service card icon ───────────────────────────────────── */
function ServiceIcon({ slug }: { slug: string }) {
  const s = { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (slug === 'seo')              return <svg {...s}><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/><path d="M5 7h4M7 5v4"/></svg>
  if (slug === 'paid-ads')         return <svg {...s}><circle cx="8" cy="8" r="6.5"/><circle cx="8" cy="8" r="3.5"/><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none"/></svg>
  if (slug === 'lead-generation')  return <svg {...s}><path d="M8 2v6l3-3"/><path d="M8 8l-3-3"/><path d="M2 10v2a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
  if (slug === 'email-automation') return <svg {...s}><rect x="1" y="3.5" width="14" height="9" rx="1.5"/><path d="M1 6l7 4.5L15 6"/></svg>
  if (slug === 'content')          return <svg {...s}><path d="M3 3h10a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M5 6h6M5 8.5h6M5 11h4"/></svg>
  return <svg {...s}><circle cx="8" cy="5" r="2.5"/><circle cx="3" cy="12" r="2"/><circle cx="13" cy="12" r="2"/><path d="M8 7.5v1.5M8 9L5 12M8 9l3 3"/></svg>
}

/* ─── Data ────────────────────────────────────────────────── */
const services = [
  { slug: 'seo',              title: 'SEO',                    description: 'Rank higher, get found faster, and drive organic traffic that converts.',                                      href: '/marketing/seo' },
  { slug: 'paid-ads',         title: 'Paid Ads',               description: 'Google and Meta campaigns managed to deliver profitable leads and sales.',                                      href: '/marketing/paid-ads' },
  { slug: 'lead-generation',  title: 'Lead Generation',        description: 'End-to-end systems that bring qualified prospects directly to you.',                                            href: '/marketing/lead-generation' },
  { slug: 'email-automation', title: 'Email and Automation',   description: 'Sequences and workflows that nurture leads and retain customers automatically.',                               href: '/marketing/email-automation' },
  { slug: 'content',          title: 'Content Marketing',      description: 'Strategic content that builds authority, drives traffic, and generates inbound leads.',                        href: '/marketing/content' },
  { slug: 'social',           title: 'Social Media',           description: 'Consistent, on-brand social content and management that builds your audience.',                                href: '/marketing/social' },
]

const stats = [
  {
    label: 'Full funnel',
    description: 'From first click to signed client, we build and manage the entire journey',
  },
  {
    label: 'Data first',
    description: 'Every decision is backed by tracking, analytics, and real performance data',
  },
  {
    label: 'Always connected',
    description: 'Your marketing stack connects to your CRM, your website, and your business systems',
  },
]

/* ─── Sub-components ──────────────────────────────────────── */
function ServiceCard({ slug, title, description, href }: { slug: string; title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 p-5 rounded-lg transition-colors hover:bg-light h-full"
      style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
    >
      <div
        className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}
      >
        <ServiceIcon slug={slug} />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-semibold text-ink leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          {description}
        </p>
      </div>
      <span className="flex items-center gap-1.5 text-xs font-semibold transition-colors group-hover:text-navy" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
        Learn more
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
export default function MarketingPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Marketing
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Marketing That Generates Real Results
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build the campaigns, funnels, and systems that bring you customers consistently. No vanity metrics, no fluff. Just leads, conversions, and growth.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link
                href="/start-a-project"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
                style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* How We Grow Your Business */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              How We Grow Your Business
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <SearchIcon />,
                heading: 'Get Found',
                description: 'SEO, content marketing, and Google Business Profile optimisation. We make sure the right people find you when they are searching for what you offer.',
              },
              {
                icon: <TargetIcon />,
                heading: 'Generate Leads',
                description: 'Paid ads, lead generation campaigns, and conversion-focused landing pages. We bring qualified prospects to your door and turn them into enquiries.',
              },
              {
                icon: <MailIcon />,
                heading: 'Nurture and Convert',
                description: 'Email automation, retargeting, and follow-up sequences. We make sure no lead goes cold and no opportunity is wasted.',
              },
            ].map((card, i) => (
              <RevealAnimation key={card.heading} delay={(i + 1) as 1 | 2 | 3}>
                <div
                  className="flex flex-col gap-5 p-6 rounded-lg h-full"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--navy)', color: 'var(--blue)' }}
                  >
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {card.heading}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              Our Marketing Services
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <RevealAnimation key={s.slug} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <ServiceCard {...s} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works differently */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                Marketing and technology, working together
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                Most agencies separate marketing from technology. We do not. Every campaign we run is backed by proper tracking, automation, and infrastructure. That means better data, faster optimisation, and results that actually last.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div className="flex flex-col gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex gap-5 p-5 rounded-lg"
                    style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                  >
                    <div
                      className="w-1 rounded-full flex-shrink-0"
                      style={{ background: 'var(--blue)' }}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {stat.label}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        {stat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build a marketing system that works?"
        body="Tell us where you are and where you want to be. We will build the system to get you there."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/pricing/page.tsx`

<sub>364 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Transparent Project Pricing and Estimates | Masuyo Digital',
  description: 'Explore our project pricing guide for web development, digital marketing, automation, and technology services. Get an instant estimate with our interactive quote builder.',
  openGraph: {
    title: 'Transparent Project Pricing and Estimates | Masuyo Digital',
    description: 'Explore our project pricing guide for web development, digital marketing, automation, and technology services.',
    url: 'https://masuyodigital.com/pricing',
  },
  alternates: { canonical: 'https://masuyodigital.com/pricing' },
}

const howItWorks = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 3v2M11 17v2M3 11h2M17 11h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    heading: 'Scoped to your needs',
    body: 'Every estimate starts with understanding what you are trying to achieve, not just what you want to build.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3l7 3v5c0 4-3.5 7-7 8-3.5-1-7-4-7-8V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7.5 11l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    heading: 'No hidden costs',
    body: 'We agree the scope before we start. If something changes, we tell you before it affects the price.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15.5 12v7M12 15.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    heading: 'Flexible engagement',
    body: 'Project-based, retainer, or hybrid. We structure our work around what makes sense for your business.',
  },
]

const factors = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="6" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="11" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7" y="16" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Scope and complexity',
    desc: 'The number of pages, features, and integrations required directly affects build time and cost.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M14 3l3 3-9 9H5v-3l9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Design requirements',
    desc: 'Custom design takes longer than template-based work. Brand new design systems cost more than refinements.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Timeline',
    desc: 'Tighter deadlines require dedicated resource allocation, which carries a premium.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6.5 13.5L3 17M13.5 6.5L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="5" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 15h6M5 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Integrations',
    desc: 'Connecting third-party tools, APIs, and platforms adds technical complexity and time.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Content',
    desc: 'Projects where we produce copy, graphics, or video content are priced accordingly.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10a6 6 0 0111.66-2M16 10a6 6 0 01-11.66 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 7l2.5-2.5M4.5 13.5L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Ongoing support',
    desc: 'Retainer arrangements are priced separately from project work and billed monthly.',
  },
]

const techPricing = [
  { label: 'New Website',                    price: 'from £249' },
  { label: 'Website Redesign',               price: 'from £349' },
  { label: 'Mobile App',                     price: 'from £2,500' },
  { label: 'Web Application',                price: 'from £3,500' },
  { label: 'Course or Learning Platform',    price: 'from £1,800' },
  { label: 'Community Hub or Member Portal', price: 'from £2,200' },
  { label: 'Custom CRM or Business System',  price: 'from £3,000' },
  { label: 'DevOps and Infrastructure',      price: 'from £800' },
  { label: 'Automation Project',             price: 'from £800' },
  { label: 'AI Chatbot or Assistant',        price: 'from £700' },
  { label: 'Hosting and Maintenance',        price: 'from £40/mo' },
]

const marketingPricing = [
  { label: 'SEO Setup',                          price: 'from £199' },
  { label: 'Google Analytics and Tracking',      price: 'from £99' },
  { label: 'Email Marketing Automation',         price: 'from £300' },
  { label: 'Full Funnel Build',                  price: 'from £1,200' },
  { label: 'Lead Generation Campaign',           price: 'from £299/mo' },
  { label: 'Review Generation Automation',       price: 'from £200' },
  { label: 'Social Media Automation',            price: 'from £300' },
  { label: 'CRM Integration',                    price: 'from £400' },
  { label: 'Monthly SEO and Content Retainer',   price: 'from £499/mo' },
  { label: 'Managed Automation Retainer',        price: 'from £599/mo' },
  { label: 'Growth Retainer',                    price: 'from £899/mo' },
]

function PriceRow({ label, price, last }: { label: string; price: string; last?: boolean }) {
  const isMonthly = price.includes('/mo')
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: last ? 'none' : '1px solid var(--border)' }}
    >
      <span className="text-sm text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{label}</span>
      <span
        className="text-sm font-semibold flex-shrink-0 ml-4"
        style={{ color: isMonthly ? 'var(--blue)' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
      >
        {price}
      </span>
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 480" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <circle cx="1300" cy="80" r="420" stroke="rgba(53,173,223,0.09)" strokeWidth="1" fill="none" />
            <circle cx="1300" cy="80" r="260" stroke="rgba(53,173,223,0.07)" strokeWidth="1" fill="none" />
            <circle cx="1300" cy="80" r="140" stroke="rgba(53,173,223,0.10)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 relative">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Honest Pricing. No Surprises.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Every project is different, so every quote is tailored. Use our interactive builder to get an instant estimate, or get in touch and we will work it out together.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/start-a-project"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity hover:opacity-90"
                  style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                  Build your estimate
                </Link>
                <Link href="/contact"
                  className="inline-block text-center text-sm font-semibold px-6 py-3.5 rounded transition-colors hover:bg-white hover:text-ink"
                  style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)', fontFamily: 'Geist, sans-serif' }}>
                  Talk to us
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* How our pricing works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                How it works
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                How our pricing works
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We do not publish fixed price lists because good work is rarely one-size-fits-all. What we do is give you a clear, honest estimate based on what you actually need, and we stick to it.
              </p>
            </RevealAnimation>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((card, i) => (
              <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div className="p-6 rounded-lg h-full" style={{ border: '1px solid var(--border)', borderTop: '3px solid var(--blue)', background: 'var(--white)' }}>
                  <div className="w-10 h-10 flex items-center justify-center rounded mb-4"
                    style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {card.icon}
                  </div>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {card.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                    {card.body}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What affects the price */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Pricing factors
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                What affects the cost of a project?
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                A number of factors influence how we price a project. Here is what we take into account:
              </p>
            </RevealAnimation>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {factors.map((f, i) => (
              <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div className="p-5 rounded-lg h-full flex gap-4" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="w-9 h-9 flex items-center justify-center rounded flex-shrink-0"
                    style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {f.label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Indicative pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Price guide
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                Indicative starting prices
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                These are starting points, not fixed prices. Your actual quote will depend on your specific requirements.
              </p>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Technology */}
            <RevealAnimation>
              <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="px-6 py-4" style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                    Service area
                  </p>
                  <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                    Technology
                  </h3>
                </div>
                <div className="px-6 py-2">
                  {techPricing.map((row, i) => (
                    <PriceRow key={row.label} label={row.label} price={row.price} last={i === techPricing.length - 1} />
                  ))}
                </div>
              </div>
            </RevealAnimation>

            {/* Marketing and Growth */}
            <RevealAnimation delay={1}>
              <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="px-6 py-4" style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                    Service area
                  </p>
                  <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                    Marketing and Growth
                  </h3>
                </div>
                <div className="px-6 py-2">
                  {marketingPricing.map((row, i) => (
                    <PriceRow key={row.label} label={row.label} price={row.price} last={i === marketingPricing.length - 1} />
                  ))}
                </div>
              </div>
            </RevealAnimation>
          </div>

          {/* Disclaimer */}
          <RevealAnimation>
            <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              All prices shown are indicative starting points and exclude VAT. Final pricing is confirmed following a discovery call and scope agreement.
            </p>
          </RevealAnimation>
        </div>
      </section>

      <CTABand
        headline="Ready to get a proper estimate?"
        body="Use our interactive quote builder to see a breakdown of costs for your project in real time."
        buttonLabel="Build your estimate"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/privacy-policy/page.tsx`

<sub>230 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Masuyo Digital privacy policy: how we collect, use, and protect your personal data in compliance with UK GDPR.',
  alternates: { canonical: 'https://masuyodigital.com/privacy-policy' },
}

const LAST_UPDATED = '14 April 2025'
const COMPANY = 'Masuyo Digital'
const EMAIL = 'hello@masuyodigital.com'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
      {children}
    </p>
  )
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
          <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Header */}
        <div className="mb-10 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
          <h1 className="text-4xl font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <P>
          This Privacy Policy explains how {COMPANY} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, and protects your personal data when you visit our website at masuyodigital.com or engage with our services. We are committed to protecting your privacy and handling your data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </P>
        <P>
          Please read this policy carefully. If you have any questions, contact us at{' '}
          <a href={`mailto:${EMAIL}`} style={{ color: 'var(--blue)' }}>{EMAIL}</a>.
        </P>

        <div className="my-8" style={{ borderTop: '1px solid var(--border)' }} />

        <Section title="1. Who we are">
          <P>
            {COMPANY} is the data controller responsible for your personal data. We are based in the United Kingdom. You can contact us regarding any data protection matters at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'var(--blue)' }}>{EMAIL}</a>.
          </P>
        </Section>

        <Section title="2. What data we collect">
          <P>We may collect and process the following categories of personal data:</P>
          <Ul items={[
            'Identity data: your name, business name, and job title where provided.',
            'Contact data: your email address, telephone number, and postal address.',
            'Communication data: messages you send us via our contact or enquiry forms, and email correspondence.',
            'Technical data: your IP address, browser type and version, operating system, time zone, and pages visited on our website.',
            'Usage data: information about how you use our website, including referring URLs, pages viewed, and session duration.',
            'Marketing preferences: your preferences regarding receiving marketing communications from us.',
          ]} />
          <P>
            We do not intentionally collect any special category data (such as health information, racial or ethnic origin, or political opinions). Please do not submit such data to us through our website.
          </P>
        </Section>

        <Section title="3. How we collect your data">
          <P>We collect data through the following means:</P>
          <Ul items={[
            'Direct interactions: when you complete a contact form, project enquiry form, or email us directly.',
            'Automated technologies: when you visit our website, we may automatically collect technical and usage data via cookies and similar technologies.',
            'Third-party services: we use third-party form processing services (such as Formspree) and analytics tools (such as Google Analytics) that may collect data on our behalf.',
          ]} />
        </Section>

        <Section title="4. How we use your data">
          <P>We use your personal data for the following purposes:</P>
          <Ul items={[
            'To respond to enquiries and provide you with information about our services.',
            'To deliver services you have engaged us to provide.',
            'To manage our relationship with you, including billing and account management.',
            'To send you marketing communications where you have consented, or where we have a legitimate interest to do so.',
            'To improve our website and services through analytics.',
            'To comply with our legal obligations.',
          ]} />
          <P>
            Our lawful bases for processing under UK GDPR are: performance of a contract (where we are delivering services to you), legitimate interests (for analytics and internal business purposes), consent (for marketing communications), and legal obligation (where applicable).
          </P>
        </Section>

        <Section title="5. Cookies">
          <P>
            Our website uses cookies (small text files stored on your device) to enhance your experience and understand how our site is used. Cookies we use include:
          </P>
          <Ul items={[
            'Essential cookies: necessary for the website to function. These cannot be disabled.',
            'Analytics cookies: used to collect anonymous information about how visitors use the site. We use Google Analytics 4 for this purpose. This data helps us improve our content and user experience.',
            'Preference cookies: used to remember your settings or choices on return visits.',
          ]} />
          <P>
            You can control or delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of the website. For more information about managing cookies, visit{' '}
            <span style={{ color: 'var(--blue)' }}>www.allaboutcookies.org</span>.
          </P>
          <P>
            Where required by law (for non-essential cookies), we will seek your consent before placing cookies on your device.
          </P>
        </Section>

        <Section title="6. Data sharing and third parties">
          <P>We do not sell your personal data. We may share your data with:</P>
          <Ul items={[
            'Service providers who process data on our behalf, such as form processing services, email delivery platforms, and hosting infrastructure. These parties process data only in accordance with our instructions.',
            'Analytics providers such as Google Analytics, which may process data in accordance with their own privacy policies.',
            'Legal or regulatory authorities where we are required to disclose data by law.',
          ]} />
          <P>
            Where we transfer data outside the UK, we ensure appropriate safeguards are in place in accordance with UK GDPR requirements.
          </P>
        </Section>

        <Section title="7. Data retention">
          <P>
            We retain your personal data only for as long as necessary for the purposes it was collected and in accordance with our legal obligations. Specifically:
          </P>
          <Ul items={[
            'Enquiry and contact data: retained for up to 2 years from last contact, or as long as necessary to manage an ongoing client relationship.',
            'Client and project data: retained for up to 6 years after the end of the client relationship, in line with legal requirements for financial records.',
            'Analytics data: retained in aggregated form. Individual session data is subject to the retention policies of the analytics provider.',
          ]} />
          <P>
            Once data is no longer needed, it is securely deleted or anonymised.
          </P>
        </Section>

        <Section title="8. Your rights under UK GDPR">
          <P>You have the following rights regarding your personal data:</P>
          <Ul items={[
            'Right of access: you can request a copy of the personal data we hold about you.',
            'Right to rectification: you can ask us to correct inaccurate or incomplete data.',
            'Right to erasure: in certain circumstances, you can ask us to delete your personal data.',
            'Right to restriction: you can ask us to restrict the processing of your data in certain circumstances.',
            'Right to data portability: you can request that we transfer your data to another organisation in a structured, machine-readable format.',
            'Right to object: you can object to our processing of your data where we rely on legitimate interests as our lawful basis.',
            'Rights related to automated decision-making: we do not make automated decisions with significant effects based on your personal data.',
          ]} />
          <P>
            To exercise any of these rights, contact us at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'var(--blue)' }}>{EMAIL}</a>. We will respond within one calendar month. You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{' '}
            <span style={{ color: 'var(--blue)' }}>ico.org.uk</span>.
          </P>
        </Section>

        <Section title="9. Data security">
          <P>
            We take appropriate technical and organisational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, or unauthorised disclosure. Our website is served over HTTPS and our server infrastructure includes access controls, monitoring, and regular backups.
          </P>
          <P>
            No method of transmission or storage is 100% secure. If you believe your data has been compromised, please contact us immediately at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'var(--blue)' }}>{EMAIL}</a>.
          </P>
        </Section>

        <Section title="10. Links to other websites">
          <P>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies before providing any personal data.
          </P>
        </Section>

        <Section title="11. Children's privacy">
          <P>
            Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.
          </P>
        </Section>

        <Section title="12. Changes to this policy">
          <P>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. The &ldquo;last updated&rdquo; date at the top of this page indicates when the policy was last revised. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.
          </P>
        </Section>

        <Section title="13. Contact us">
          <P>
            If you have any questions about this Privacy Policy or how we handle your personal data, please contact us:
          </P>
          <div className="p-5 rounded-lg" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
            <p className="text-sm font-semibold text-ink mb-1" style={{ fontFamily: 'Geist, sans-serif' }}>{COMPANY}</p>
            <a href={`mailto:${EMAIL}`} className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>{EMAIL}</a>
          </div>
        </Section>

        <div className="mt-10 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/terms" className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            Terms of Service
          </Link>
          <span style={{ color: 'var(--border)' }}>·</span>
          <Link href="/contact" className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
```


### `app/resources/layout.tsx`

<sub>16 lines</sub>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free guides, templates, checklists, and toolkits for UK businesses: covering marketing, finance, technology, legal, and growth.',
  openGraph: {
    title: 'Free Business Resources – Masuyo Digital',
    description: 'Practical guides, templates and checklists for growing UK businesses.',
    url: 'https://masuyodigital.com/resources',
  },
  alternates: { canonical: 'https://masuyodigital.com/resources' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
```


### `app/resources/page.tsx`

<sub>325 lines</sub>

```tsx
// TODO: Resources are not yet linked to real downloadable content. Each resource card needs a real PDF or online form wired up before launch.
'use client'

import { useState, useEffect } from 'react'
import RevealAnimation from '@/components/RevealAnimation'
import ResourceModal from './components/ResourceModal'

const GATED_SLUGS = new Set([
  'brand-identity-starter-kit',
  'google-ads-starter-guide',
  'email-marketing-template-pack',
  'pricing-your-services-guide',
  'automation-opportunities-audit',
  'lead-generation-playbook',
])

/* ─── Types ─────────────────────────────────────────────── */
interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: 'guide' | 'checklist' | 'template' | 'toolkit'
  premium: boolean
  slug: string
  content: string[]   // bullet points for the resource detail
}

/* ─── Resource data ─────────────────────────────────────── */
const RESOURCES: Resource[] = [
  // Business Setup
  {
    id: 'r1', title: 'UK Business Launch Checklist', category: 'Business Setup', type: 'checklist', premium: false, slug: 'uk-business-launch-checklist',
    description: 'Everything you need to do before, during, and after registering your UK business: from Companies House to HMRC to your first invoice.',
    content: ['Register with Companies House (Ltd) or HMRC (sole trader)', 'Set up a business bank account', 'Register for VAT if turnover exceeds £90,000', 'Get relevant insurance (public liability, professional indemnity)', 'Set up accounting software (Xero, QuickBooks, or FreeAgent)', 'Create a basic contract template for clients', 'Open a business email address', 'Secure your domain name', 'Set up your Google Business Profile', 'Register for Self Assessment (sole trader) or PAYE (Ltd)', 'Draft terms and conditions for your website', 'Create a simple cash flow forecast'],
  },
  {
    id: 'r2', title: 'Choosing Your Business Structure Guide', category: 'Business Setup', type: 'guide', premium: false, slug: 'choosing-business-structure',
    description: 'Sole trader, limited company, or partnership? This guide walks through the pros, cons, and tax implications of each for UK businesses.',
    content: ['Sole trader: simple setup, personal liability, class 2 NI', 'Limited company: separate legal entity, more admin, often lower tax', 'Partnership: shared ownership, joint liability', 'When to switch from sole trader to Ltd', 'Director salary vs dividends explained', 'IR35 considerations for contractors', 'Key questions to ask your accountant'],
  },
  {
    id: 'r3', title: 'Brand Identity Starter Kit', category: 'Business Setup', type: 'toolkit', premium: true, slug: 'brand-identity-starter-kit',
    description: 'A practical toolkit covering brand positioning, tone of voice, visual identity basics, and the essential brand assets every business needs.',
    content: ['What is a brand and why it matters', 'Defining your brand values (worksheet)', 'Identifying your target audience', 'Crafting a one-line positioning statement', 'Choosing brand colours and fonts', 'Logo types and when to use each', 'Building a basic brand guidelines document', 'Social media profile image sizes', 'Email signature best practices'],
  },

  // Marketing
  {
    id: 'r4', title: 'SEO Quick-Start Checklist for New Websites', category: 'Marketing', type: 'checklist', premium: false, slug: 'seo-quick-start-checklist',
    description: 'The essential on-page SEO tasks to complete when launching a new website. Covers meta data, headings, images, speed, and local SEO.',
    content: ['Set up Google Search Console', 'Set up Google Analytics 4', 'Write unique title tags for every page (under 60 characters)', 'Write meta descriptions for every page (under 155 characters)', 'Use one H1 per page', 'Add alt text to all images', 'Compress images before upload', 'Create and submit an XML sitemap', 'Set up Google Business Profile for local businesses', 'Ensure site loads in under 3 seconds', 'Check mobile usability in Search Console', 'Build at least 3–5 core pages of quality content'],
  },
  {
    id: 'r5', title: 'Google Ads Starter Guide for UK Businesses', category: 'Marketing', type: 'guide', premium: true, slug: 'google-ads-starter-guide',
    description: 'How to set up and run your first Google Ads campaign without wasting budget. Includes keyword strategy, match types, bidding, and tracking.',
    content: ['Understanding search vs display vs shopping', 'Setting up conversion tracking', 'Keyword research with Google Keyword Planner', 'Match types: broad, phrase, exact explained', 'Negative keywords (the most important list you will build)', 'Writing ad copy that converts', 'Setting a realistic budget', 'Quality Score and how to improve it', 'Smart bidding vs manual bidding', 'Reading your first report'],
  },
  {
    id: 'r6', title: 'Email Marketing Campaign Template Pack', category: 'Marketing', type: 'template', premium: true, slug: 'email-marketing-template-pack',
    description: 'Ready-to-use email templates for welcome sequences, monthly newsletters, re-engagement campaigns, and post-purchase follow-ups.',
    content: ['Welcome email sequence (5 emails)', 'Monthly newsletter structure', 'Promotional campaign template', 'Re-engagement email sequence (3 emails)', 'Post-purchase follow-up template', 'Subject line formula guide', 'When to send (day and time data)', 'List hygiene best practices'],
  },
  {
    id: 'r7', title: 'Social Media Content Calendar Template', category: 'Marketing', type: 'template', premium: false, slug: 'social-media-content-calendar',
    description: 'A 90-day content calendar template with content pillars, posting frequency guidance, and caption formulas for LinkedIn, Instagram, and Facebook.',
    content: ['Setting your content pillars (3–5 topics)', 'Recommended posting frequency by platform', 'Content mix: educational, promotional, social proof, behind the scenes', '90-day calendar template', 'Caption formulas for each content type', 'Hashtag strategy for UK businesses', 'How to batch content creation', 'Tools for scheduling: Buffer, Later, Hootsuite'],
  },

  // Finance
  {
    id: 'r8', title: 'Cash Flow Forecast Template (12-Month)', category: 'Finance', type: 'template', premium: false, slug: 'cash-flow-forecast-template',
    description: 'A straightforward 12-month cash flow template for UK small businesses. Track income, outgoings, and forecast your position month by month.',
    content: ['Monthly income by source', 'Fixed costs (rent, software, insurance)', 'Variable costs (materials, contractors, ads)', 'Tax provisions (VAT, corporation tax, income tax)', 'Closing balance forecast', 'How to use the forecast to make decisions', 'Warning signs in your cash flow', 'When to speak to an accountant'],
  },
  {
    id: 'r9', title: 'Pricing Your Services Guide', category: 'Finance', type: 'guide', premium: true, slug: 'pricing-your-services-guide',
    description: 'How to price your services with confidence. Covers cost-plus pricing, value-based pricing, day rates, retainers, and how to raise your prices.',
    content: ['Why most small businesses undercharge', 'Cost-plus pricing explained', 'Value-based pricing: charge for outcomes, not time', 'How to calculate your minimum viable day rate', 'Retainers vs project fees', 'Writing proposals that justify your price', 'Handling the "that is too expensive" objection', 'How and when to raise your prices'],
  },

  // Technology
  {
    id: 'r10', title: 'Tech Stack Guide for Small Businesses', category: 'Technology', type: 'guide', premium: false, slug: 'tech-stack-guide',
    description: 'The essential software every UK small business needs: accounting, CRM, communication, and project management, with recommendations and alternatives.',
    content: ['Accounting: Xero vs QuickBooks vs FreeAgent', 'CRM: HubSpot Free vs Pipedrive vs Notion', 'Email: Google Workspace vs Microsoft 365', 'Project management: Trello vs Asana vs ClickUp', 'Communication: Slack vs Teams', 'Video calls: Zoom vs Google Meet', 'E-signatures: DocuSign vs SignNow', 'Storage: Google Drive vs Dropbox', 'Invoicing: built-in accounting vs Stripe'],
  },
  {
    id: 'r11', title: 'Website Brief Template', category: 'Technology', type: 'template', premium: false, slug: 'website-brief-template',
    description: 'A structured brief template to help you define exactly what you want from a new website before speaking to a developer or agency.',
    content: ['Business overview (one paragraph)', 'Goals for the website', 'Target audience description', 'Competitor websites you like and why', 'Pages and sections you need', 'Content you already have', 'Content you need help with', 'Design preferences and brand assets', 'Technical requirements', 'Timeline and budget range'],
  },
  {
    id: 'r12', title: 'Automation Opportunities Audit', category: 'Technology', type: 'checklist', premium: true, slug: 'automation-opportunities-audit',
    description: 'A self-assessment checklist to identify where automation can save your business the most time and money, with tool recommendations.',
    content: ['Lead capture and follow-up', 'Client onboarding documents', 'Invoice generation and payment reminders', 'Appointment booking and reminders', 'Internal reporting and dashboards', 'Social media scheduling', 'Email marketing sequences', 'Data entry between systems (Zapier/Make)', 'Payroll and expenses', 'Customer support responses'],
  },

  // Legal
  {
    id: 'r13', title: 'Website Legal Pages Checklist', category: 'Legal', type: 'checklist', premium: false, slug: 'website-legal-pages-checklist',
    description: 'The legal pages every UK business website must have, with plain-English explanations of what goes in each one.',
    content: ['Privacy Policy: what data you collect and why', 'Cookie Policy: GDPR requirements for cookies', 'Terms and Conditions: your rules of engagement', 'Accessibility Statement: legal requirement for some sites', 'Returns and Refunds Policy: required for e-commerce', 'Company information: registration number, address', 'When to use a cookie consent banner', 'Recommended free tools: Termly, iubenda'],
  },
  {
    id: 'r14', title: 'Freelancer Client Contract Template Guide', category: 'Legal', type: 'guide', premium: true, slug: 'freelancer-contract-guide',
    description: 'What to include in a client contract to protect yourself as a UK freelancer or agency, covering scope, payment, IP ownership, and kill fees.',
    content: ['Why you need a contract (and why a verbal agreement is not enough)', 'Scope of work: how to write it clearly', 'Payment terms: deposits, milestones, net 30', 'Intellectual property: who owns what', 'Revision and change request policy', 'Kill fee: protecting your time on abandoned projects', 'Liability limitation clauses', 'Dispute resolution', 'Where to get contracts reviewed cheaply'],
  },

  // Growth
  {
    id: 'r15', title: 'Lead Generation Playbook for Service Businesses', category: 'Growth', type: 'guide', premium: true, slug: 'lead-generation-playbook',
    description: 'A practical playbook for service businesses looking to generate a consistent flow of qualified leads, without relying on word of mouth alone.',
    content: ['Why referrals alone are not a strategy', 'Defining your ideal client', 'Building a lead generation funnel', 'Lead magnets that work for service businesses', 'Landing page essentials', 'Google Ads for service businesses', 'LinkedIn outreach strategy', 'Email nurture sequences', 'Tracking your cost per lead', 'Scaling what works'],
  },
  {
    id: 'r16', title: 'Business Growth Planning Template', category: 'Growth', type: 'template', premium: false, slug: 'business-growth-template',
    description: 'A simple one-page planning template to set growth goals, identify what is working, and build a focused action plan for the next 90 days.',
    content: ['Where you are now (revenue, clients, team)', 'Where you want to be in 90 days', 'Key growth levers for your business', 'What is working and should be doubled down on', 'What is not working and should be stopped', 'Three focus actions for the next 30 days', 'Metrics to track weekly', 'Monthly review prompts'],
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(RESOURCES.map(r => r.category)))]
function TypeIcon({ type }: { type: string }) {
  if (type === 'guide') return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <rect x="2" y="1.5" width="9" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 4.5h4M4.5 6.5h4M4.5 8.5h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
  if (type === 'checklist') return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <rect x="1.5" y="1.5" width="10" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6.5l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (type === 'template') return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <rect x="1.5" y="1.5" width="10" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 5h10" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5v7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
  // toolkit / default
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <rect x="1.5" y="4.5" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 4.5V3a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function ResourceCard({ resource, bookmarked, onBookmark }: {
  resource: Resource
  bookmarked: boolean
  onBookmark: (id: string) => void
}) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden transition-colors hover:bg-light h-full"
      style={{ border: '1px solid var(--border)', background: 'var(--white)' }}>
      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'var(--light)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              {resource.category}
            </span>
            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              <TypeIcon type={resource.type} />
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </span>
          </div>
          <button onClick={() => onBookmark(resource.id)} className="flex-shrink-0 transition-colors hover:opacity-70"
            title={bookmarked ? 'Remove bookmark' : 'Save'}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill={bookmarked ? 'var(--navy)' : 'none'}>
              <path d="M4 3h10a1 1 0 011 1v11.5l-6-3-6 3V4a1 1 0 011-1z" stroke="var(--navy)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-ink leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
              {resource.title}
            </h3>
            {resource.premium && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0"
                style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Premium
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{resource.description}</p>
        </div>

        {/* Actions */}
        <div className="mt-auto">
          <ResourceModal
            resourceTitle={resource.title}
            resourceSlug={resource.slug}
            isPremium={GATED_SLUGS.has(resource.slug)}
            resourceContent={[]}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const b = localStorage.getItem('masuyo_bookmarks')
    if (b) setBookmarks(JSON.parse(b))
  }, [])

  function handleBookmark(id: string) {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
      localStorage.setItem('masuyo_bookmarks', JSON.stringify(next))
      return next
    })
  }

  const filtered = RESOURCES.filter(r => {
    const matchCat = activeCategory === 'All' || r.category === activeCategory
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase())
    const matchBookmark = !showBookmarksOnly || bookmarks.includes(r.id)
    return matchCat && matchSearch && matchBookmark
  })

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Free resources for growing businesses
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Guides, templates, checklists, and toolkits to help you build and grow your business. No fluff. Just useful.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Search + filter bar */}
      <section className="py-8 sticky top-16 z-40" style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="var(--mid)" strokeWidth="1.5" />
                <path d="M10.5 10.5l2.5 2.5" stroke="var(--mid)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources…"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none"
                style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }} />
            </div>
            {/* Bookmark toggle */}
            <button onClick={() => setShowBookmarksOnly(s => !s)}
              className="text-sm font-medium flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors"
              style={{ border: `1px solid ${showBookmarksOnly ? 'var(--navy)' : 'var(--border)'}`, background: showBookmarksOnly ? 'var(--navy)' : 'var(--white)', color: showBookmarksOnly ? '#fff' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill={showBookmarksOnly ? '#fff' : 'none'}>
                <path d="M3 2h8a.75.75 0 01.75.75V12l-4.75-2.5L2.25 12V2.75A.75.75 0 013 2z" stroke={showBookmarksOnly ? '#fff' : 'var(--navy)'} strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              Saved ({bookmarks.length})
            </button>
          </div>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                style={{ background: activeCategory === cat ? 'var(--navy)' : 'var(--light)', color: activeCategory === cat ? '#fff' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                No resources match your search. Try a different term or category.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(r => (
                  <ResourceCard key={r.id} resource={r}
                    bookmarked={bookmarks.includes(r.id)}
                    onBookmark={handleBookmark} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
```


### `app/services/page.tsx`

<sub>168 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Everything your business needs, digitally. From your first website to full marketing and automation.',
  openGraph: {
    title: 'Services – Masuyo Digital',
    description: 'Everything your business needs, digitally. From your first website to full marketing and automation.',
    url: 'https://masuyodigital.com/services',
  },
  alternates: { canonical: 'https://masuyodigital.com/services' },
}

const services = [
  {
    title: 'Web Design & Development',
    description: 'A website built around your business goals. Fast, modern, mobile-friendly, and designed to convert visitors into customers. We build websites that work hard.',
    href: '/services/web-design',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Digital Marketing',
    description: 'SEO, paid ads, content and social. We build marketing strategies that get your business in front of the right people and keeps it there consistently.',
    href: '/services/digital-marketing',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Lead Generation',
    description: 'We build systems that bring real enquiries directly to you, through ads, landing pages and organic search. More leads, less chasing.',
    href: '/services/lead-generation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 3V1M10 19v-2M3 10H1M19 10h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Technology Solutions',
    description: 'From CRM systems to custom platforms, we build and implement the technology that helps your business run better and scale faster.',
    href: '/services/technology-solutions',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 5V3M10 17v-2M5 10H3M17 10h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Automation',
    description: 'We identify the tasks eating your time and automate them. Less admin, fewer errors, more time for the work that actually matters.',
    href: '/services/automation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10a6 6 0 0111.66-2M16 10a6 6 0 01-11.66 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15 7l2.5-2.5M4.5 13.5L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Hosting & Infrastructure',
    description: 'We host your website on our own servers. Fast, reliable, and managed by us. No third-party companies, no passing the buck.',
    href: '/services/hosting',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="11" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15" cy="6.5" r="1" fill="currentColor"/>
        <circle cx="15" cy="13.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1
                className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Everything your business needs, digitally.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p
                className="text-lg"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}
              >
                From your first website to full marketing and automation. We do it all.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 -m-px">
            {services.map((service, i) => (
              <RevealAnimation key={service.href} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  icon={service.icon}
                  showLink={true}
                />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2
              className="text-2xl md:text-3xl font-semibold text-ink mb-4"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Not sure which services you need?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p
              className="text-base mb-8"
              style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
            >
              Let us figure that out together.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={2}>
            <Link
              href="/contact"
              className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
              style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
            >
              Get in touch
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
```


### `app/start-a-project/layout.tsx`

<sub>16 lines</sub>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Answer a few quick questions and get an indicative cost estimate for your website, marketing, or technology project.',
  openGraph: {
    title: 'Start a Project – Masuyo Digital',
    description: 'Get an indicative estimate for your project in under 2 minutes.',
    url: 'https://masuyodigital.com/start-a-project',
  },
  alternates: { canonical: 'https://masuyodigital.com/start-a-project' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
```


### `app/start-a-project/page.tsx`

<sub>720 lines</sub>

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'

/* ─── Types ────────────────────────────────────────────────────────────────── */

type TabId = 'project' | 'features' | 'marketing' | 'scale' | 'timeline'

interface Option {
  id: string
  label: string
  price: number
  monthly?: boolean
  desc?: string
  tooltip?: string
}

interface LineItem {
  id: string
  label: string
  price: number
  monthly?: boolean
  tab: TabId
}

interface SelState {
  project: string
  features: string[]
  marketing: string[]
  scale: string
  timeline: string
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const PROJECT_TYPES: Option[] = [
  { id: 'new-website',       label: 'New Website',                      price: 249,  tooltip: 'A professionally designed and developed website built from scratch, tailored to your business goals and brand.' },
  { id: 'website-redesign',  label: 'Website Redesign',                 price: 349,  tooltip: 'A full rebuild of your existing website with improved design, performance, and user experience.' },
  { id: 'mobile-app',        label: 'Mobile App',                       price: 2500, tooltip: 'A native or cross-platform mobile application for iOS and Android, built around your users and business logic.' },
  { id: 'web-application',   label: 'Web Application',                  price: 3500, tooltip: 'A custom browser-based application with complex functionality, user accounts, and data management.' },
  { id: 'course-platform',   label: 'Course or Learning Platform',      price: 1800, tooltip: 'A fully featured online learning environment with course management, student progress tracking, and payment integration.' },
  { id: 'community-hub',     label: 'Community Hub or Member Portal',   price: 2200, tooltip: 'A private, branded online space for your members, customers, or team with content, discussion, and access control.' },
  { id: 'custom-crm',        label: 'Custom CRM or Business System',    price: 3000, tooltip: 'A bespoke internal platform built around your workflows, replacing spreadsheets and disconnected tools.' },
  { id: 'digital-marketing', label: 'Digital Marketing Campaign',       price: 299,  monthly: true, tooltip: 'A managed campaign across your chosen channels, built to drive traffic, leads, and conversions.' },
  { id: 'automation',        label: 'Automation Project',               price: 800,  tooltip: 'A targeted automation build that removes manual tasks from your business processes and connects your tools.' },
  { id: 'hosting',           label: 'Hosting and Maintenance',          price: 40,   monthly: true, tooltip: 'Managed hosting on our own infrastructure with updates, monitoring, backups, and technical support included.' },
]

const FEATURES: Option[] = [
  { id: 'ecommerce',    label: 'E-commerce / Online Shop',            price: 400, tooltip: 'A fully integrated online store with product management, checkout, and payment processing.' },
  { id: 'booking',      label: 'Booking or Appointment System',       price: 250, tooltip: 'An online booking tool that lets customers schedule appointments, classes, or services directly.' },
  { id: 'cms-blog',     label: 'CMS / Blog',                          price: 150, tooltip: 'A content management system so your team can update pages, publish blog posts, and manage content without a developer.' },
  { id: 'members-area', label: 'Members Area or Login',               price: 600, tooltip: 'A secure, gated section of your site accessible only to registered or paying users.' },
  { id: 'resource-hub', label: 'Interactive Resource Hub',            price: 500, tooltip: 'A searchable library of guides, tools, and downloads with filtering, bookmarking, and gated premium content.' },
  { id: 'progress',     label: 'Student or Member Progress Tracking', price: 600, tooltip: 'A dashboard that shows users their progress through courses, modules, or membership milestones.' },
  { id: 'payment',      label: 'Payment Gateway',                     price: 200, tooltip: 'Secure online payment processing integrated into your site or application, supporting cards and digital wallets.' },
  { id: 'custom-forms', label: 'Custom Forms',                        price: 75,  tooltip: 'Tailored forms with conditional logic, validation, and automated notifications or CRM routing.' },
  { id: 'live-chat',    label: 'Live Chat Integration',               price: 75,  tooltip: 'A real-time chat widget connected to your support or sales team, with fallback to email or bot.' },
  { id: 'multilang',    label: 'Multi-language Support',              price: 400, tooltip: 'Full internationalisation of your site or app so content can be served in multiple languages.' },
  { id: 'api',          label: 'API Development or Integration',      price: 800, tooltip: 'Custom API build or third-party API connection to extend functionality and connect your platforms.' },
  { id: 'ai-chatbot',   label: 'AI Chatbot or Assistant',             price: 700, tooltip: 'An intelligent conversational assistant trained on your content to handle enquiries, support, or lead qualification.' },
]

const MARKETING_GROWTH: Option[] = [
  { id: 'seo-setup',         label: 'SEO Setup',                                        price: 199,  tooltip: 'Technical SEO foundation including metadata, sitemap, schema markup, and Google Search Console configuration.' },
  { id: 'analytics',         label: 'Google Analytics and Tracking',                   price: 99,   tooltip: 'Full analytics implementation with goal tracking, event monitoring, and conversion reporting.' },
  { id: 'email-automation',  label: 'Email Marketing Automation',                      price: 300,  tooltip: 'Automated email sequences triggered by user behaviour, from welcome flows to re-engagement campaigns.' },
  { id: 'full-funnel',       label: 'Full Funnel Build (ads, landing page, email, CRM)', price: 1200, tooltip: 'End-to-end campaign build covering paid ads, landing page, email sequence, and CRM integration.' },
  { id: 'onboarding',        label: 'Automated Onboarding Workflows',                  price: 350,  tooltip: 'A structured automated journey that guides new customers or users from sign-up to active engagement.' },
  { id: 'review-gen',        label: 'Review Generation Automation',                    price: 200,  tooltip: 'Post-purchase or post-service automated sequences designed to drive Google and Trustpilot reviews.' },
  { id: 'abandoned',         label: 'Abandoned Enquiry Recovery',                      price: 250,  tooltip: 'Automated follow-up sequences that re-engage leads who made contact but did not convert.' },
  { id: 'social-auto',       label: 'Social Media Automation and Scheduling',          price: 300,  tooltip: 'Content planning, creation, and scheduling automation across your social channels.' },
  { id: 'crm-integration',   label: 'CRM Integration',                                 price: 400,  tooltip: 'Connection of your website or application to your CRM platform for seamless lead and customer data flow.' },
  { id: 'whatsapp-sms',      label: 'WhatsApp or SMS Automation',                      price: 300,  tooltip: 'Automated messaging via WhatsApp or SMS for confirmations, reminders, follow-ups, and campaigns.' },
  { id: 'seo-retainer',      label: 'Monthly SEO and Content Retainer',                price: 499,  monthly: true, tooltip: 'Ongoing SEO management, keyword targeting, and content production to grow organic traffic month on month.' },
  { id: 'auto-retainer',     label: 'Managed Automation Retainer',                     price: 599,  monthly: true, tooltip: 'A monthly retainer where we continuously build, optimise, and manage your business automations.' },
  { id: 'growth-retainer',   label: 'Growth Retainer (SEO, content, ads, reporting)',  price: 899,  monthly: true, tooltip: 'A comprehensive monthly package combining SEO, content, paid ads, and performance reporting.' },
]

const SCALES: Option[] = [
  { id: 'small',      label: 'Small',      desc: '1 to 5 pages or basic scope',     price: 0,    tooltip: 'Suitable for straightforward projects with a clear, limited scope, typically up to 5 pages or a single core function.' },
  { id: 'medium',     label: 'Medium',     desc: '6 to 15 pages or moderate scope', price: 200,  tooltip: 'A moderate scope project with multiple sections, integrations, or content requirements, typically 6 to 15 pages.' },
  { id: 'large',      label: 'Large',      desc: '15+ pages or complex scope',      price: 500,  tooltip: 'A complex project with extensive page count, multiple integrations, custom functionality, or large content volumes.' },
  { id: 'enterprise', label: 'Enterprise', desc: 'Custom workflows, large team',    price: 1500, tooltip: 'A high-complexity build requiring bespoke architecture, large team access, advanced workflows, or phased delivery.' },
]

const TIMELINES: Option[] = [
  { id: 'flexible',   label: 'Flexible (no rush)', price: 0,   tooltip: 'No fixed deadline. We work this into our schedule at the most efficient point, keeping costs lean.' },
  { id: '3-6-months', label: '3 to 6 months',      price: 0,   tooltip: 'A comfortable timeline that allows for thorough discovery, design, build, and testing without a rush premium.' },
  { id: '1-3-months', label: '1 to 3 months',      price: 300, tooltip: 'An accelerated timeline that requires dedicated resource allocation and priority scheduling.' },
  { id: 'asap',       label: 'ASAP',               price: 700, tooltip: 'Urgent delivery requiring immediate resource prioritisation and extended working hours to hit your deadline.' },
]

const TABS: { id: TabId; label: string }[] = [
  { id: 'project',   label: 'Project Type' },
  { id: 'features',  label: 'Features' },
  { id: 'marketing', label: 'Marketing and Growth' },
  { id: 'scale',     label: 'Scale' },
  { id: 'timeline',  label: 'Timeline' },
]

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function fmt(n: number) {
  return '\u00a3' + n.toLocaleString('en-GB')
}

function computeLineItems(sel: SelState): LineItem[] {
  const items: LineItem[] = []

  if (sel.project) {
    const o = PROJECT_TYPES.find(x => x.id === sel.project)
    if (o) items.push({ id: o.id, label: o.label, price: o.price, monthly: o.monthly, tab: 'project' })
  }

  sel.features.forEach(id => {
    const o = FEATURES.find(x => x.id === id)
    if (o) items.push({ id: o.id, label: o.label, price: o.price, tab: 'features' })
  })

  sel.marketing.forEach(id => {
    const o = MARKETING_GROWTH.find(x => x.id === id)
    if (o) items.push({ id: o.id, label: o.label, price: o.price, monthly: o.monthly, tab: 'marketing' })
  })

  if (sel.scale) {
    const o = SCALES.find(x => x.id === sel.scale)
    if (o) items.push({ id: 'scale-' + o.id, label: 'Scale: ' + o.label, price: o.price, tab: 'scale' })
  }

  if (sel.timeline) {
    const o = TIMELINES.find(x => x.id === sel.timeline)
    if (o) items.push({ id: 'timeline-' + o.id, label: 'Timeline: ' + o.label, price: o.price, tab: 'timeline' })
  }

  return items
}

/* ─── Animated number ──────────────────────────────────────────────────────── */

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target)
  const prev = useRef(target)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    const start = prev.current
    if (start === target) return
    const t0 = performance.now()
    const dur = 380
    if (raf.current) cancelAnimationFrame(raf.current)
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(start + (target - start) * e))
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else prev.current = target
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target])
  return value
}

/* ─── Tooltip ─────────────────────────────────────────────────────────────── */

function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)

  function calcAndShow() {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    // Anchor tooltip below-left of the icon, clamped to viewport
    const tipW = 232
    const left = Math.min(Math.max(8, r.right - tipW), window.innerWidth - tipW - 8)
    setCoords({ top: r.bottom + 6, left })
    setOpen(true)
  }

  // Close on outside click/tap
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent | TouchEvent) {
      if (btnRef.current && btnRef.current.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [open])

  return (
    <span className="inline-flex flex-shrink-0 ml-1.5 relative" style={{ verticalAlign: 'middle' }}>
      <button
        ref={btnRef}
        type="button"
        aria-label="More information"
        onMouseEnter={calcAndShow}
        onMouseLeave={() => setOpen(false)}
        onClick={e => { e.stopPropagation(); open ? setOpen(false) : calcAndShow() }}
        className="w-4 h-4 rounded-full inline-flex items-center justify-center flex-shrink-0 transition-colors"
        style={{
          background: 'rgba(107,114,128,0.15)',
          color: 'var(--mid)',
          fontSize: '9px',
          fontStyle: 'italic',
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          lineHeight: 1,
        }}
      >
        i
      </button>
      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            width: '232px',
            zIndex: 9999,
            background: 'var(--ink)',
            borderRadius: '8px',
            padding: '10px 12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'Geist, sans-serif', fontSize: '0.75rem', lineHeight: '1.55', margin: 0 }}>
            {text}
          </p>
        </div>
      )}
    </span>
  )
}

/* ─── CheckCard ────────────────────────────────────────────────────────────── */

function CheckCard({ option, checked, onToggle }: { option: Option; checked: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="w-full text-left p-4 rounded-lg transition-all"
      style={{ border: `1px solid ${checked ? 'var(--blue)' : 'var(--border)'}`, background: checked ? 'rgba(53,173,223,0.06)' : 'var(--white)' }}>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
          style={{ background: checked ? 'var(--blue)' : 'transparent', border: `1.5px solid ${checked ? 'var(--blue)' : 'var(--border)'}` }}>
          {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-0">
              <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{option.label}</span>
              {option.tooltip && <Tooltip text={option.tooltip} />}
            </span>
            {option.desc && <p className="text-xs mt-0.5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{option.desc}</p>}
          </div>
          <p className="text-xs font-semibold flex-shrink-0" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            {fmt(option.price)}{option.monthly ? '/mo' : ''}
          </p>
        </div>
      </div>
    </button>
  )
}

/* ─── RadioCard ────────────────────────────────────────────────────────────── */

function RadioCard({ option, selected, onSelect }: { option: Option; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className="w-full text-left p-4 rounded-lg transition-all"
      style={{ border: `1px solid ${selected ? 'var(--blue)' : 'var(--border)'}`, background: selected ? 'rgba(53,173,223,0.06)' : 'var(--white)' }}>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
          style={{ background: selected ? 'var(--blue)' : 'transparent', border: `1.5px solid ${selected ? 'var(--blue)' : 'var(--border)'}` }}>
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-0">
              <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{option.label}</span>
              {option.tooltip && <Tooltip text={option.tooltip} />}
            </span>
            {option.desc && <p className="text-xs mt-0.5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{option.desc}</p>}
          </div>
          <p className="text-xs font-semibold flex-shrink-0" style={{ color: option.price > 0 ? 'var(--blue)' : 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            {option.monthly ? fmt(option.price) + '/mo' : option.price > 0 ? fmt(option.price) : 'Included'}
          </p>
        </div>
      </div>
    </button>
  )
}

/* ─── QuoteLine ────────────────────────────────────────────────────────────── */

function QuoteLine({ item, onRemove }: { item: LineItem; onRemove: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 16)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="flex items-center gap-2 py-2.5" style={{
      borderBottom: '1px solid var(--border)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(12px)',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
    }}>
      <span className="text-sm flex-1" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{item.label}</span>
      <span className="text-sm font-medium flex-shrink-0" style={{ color: item.monthly ? 'var(--blue)' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
        {item.price === 0 ? 'Included' : fmt(item.price) + (item.monthly ? '/mo' : '')}
      </span>
      <button type="button" onClick={onRemove} aria-label={`Remove ${item.label}`}
        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
        style={{ color: 'var(--mid)', background: 'transparent' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

/* ─── Quote panel content ──────────────────────────────────────────────────── */

function QuotePanelContent({
  lineItems, oneTimeTotal, monthlyTotal, animatedOneTime, animatedMonthly,
  onRemove, onSubmit, onReset, submitStatus,
}: {
  lineItems: LineItem[]
  oneTimeTotal: number
  monthlyTotal: number
  animatedOneTime: number
  animatedMonthly: number
  onRemove: (item: LineItem) => void
  onSubmit: () => void
  onReset: () => void
  submitStatus: 'idle' | 'submitting' | 'success' | 'error'
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          Live quote
        </p>
        <h2 className="text-2xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
          Your Estimate
        </h2>
      </div>

      {/* Totals */}
      <div className="rounded-lg p-5 mb-6" style={{ background: 'var(--navy)' }}>
        {oneTimeTotal > 0 && (
          <div className={monthlyTotal > 0 ? 'mb-3 pb-3' : ''} style={monthlyTotal > 0 ? { borderBottom: '1px solid rgba(255,255,255,0.1)' } : {}}>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>One-off total</p>
            <p className="text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
              {fmt(animatedOneTime)}
            </p>
          </div>
        )}
        {monthlyTotal > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>Monthly total</p>
            <p className="text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
              {fmt(animatedMonthly)}<span className="text-base font-normal ml-1" style={{ color: 'rgba(255,255,255,0.6)' }}>/mo</span>
            </p>
          </div>
        )}
        {oneTimeTotal === 0 && monthlyTotal === 0 && (
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
            Select options to see your estimate
          </p>
        )}
      </div>

      {/* Line items */}
      <div className="flex-1 overflow-y-auto mb-4" style={{ minHeight: 0 }}>
        {lineItems.length === 0 ? (
          <p className="text-sm py-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            No items selected yet. Use the tabs on the left to build your quote.
          </p>
        ) : (
          <div>
            {lineItems.map(item => (
              <QuoteLine key={item.id} item={item} onRemove={() => onRemove(item)} />
            ))}
            <div className="pt-3 mt-1 flex flex-col gap-1">
              {oneTimeTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>One-off subtotal</span>
                  <span className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{fmt(oneTimeTotal)}</span>
                </div>
              )}
              {monthlyTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>Monthly subtotal</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>{fmt(monthlyTotal)}/mo</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
        This estimate is indicative only. Prices vary depending on your specific requirements and will be confirmed following a discovery call. Monthly costs are shown where applicable and are billed separately.
      </p>

      {submitStatus === 'error' && (
        <p className="text-xs mb-3" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>
          Something went wrong. Please try again.
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button type="button" onClick={onSubmit} disabled={lineItems.length === 0 || submitStatus === 'submitting'}
          className="flex-1 text-sm font-semibold text-white py-3 rounded transition-opacity disabled:opacity-40"
          style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
          {submitStatus === 'submitting' ? 'Sending...' : 'Send my estimate'}
        </button>
        <button type="button" onClick={onReset}
          className="text-sm font-medium px-4 py-3 rounded transition-colors"
          style={{ border: '1px solid var(--border)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif', background: 'var(--white)' }}>
          Start again
        </button>
      </div>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

const EMPTY_SEL: SelState = { project: '', features: [], marketing: [], scale: '', timeline: '' }

export default function StartAProjectPage() {
  const [tab, setTab] = useState<TabId>('project')
  const [sel, setSel] = useState<SelState>(EMPTY_SEL)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const lineItems = computeLineItems(sel)
  const oneTimeTotal = lineItems.filter(i => !i.monthly).reduce((s, i) => s + i.price, 0)
  const monthlyTotal = lineItems.filter(i => i.monthly).reduce((s, i) => s + i.price, 0)
  const animatedOneTime = useAnimatedNumber(oneTimeTotal)
  const animatedMonthly = useAnimatedNumber(monthlyTotal)

  const mobileTotal = oneTimeTotal > 0 && monthlyTotal > 0
    ? fmt(oneTimeTotal) + ' + ' + fmt(monthlyTotal) + '/mo'
    : oneTimeTotal > 0
    ? fmt(oneTimeTotal)
    : monthlyTotal > 0
    ? fmt(monthlyTotal) + '/mo'
    : fmt(0)

  function toggleFeature(id: string) {
    setSel(p => ({ ...p, features: p.features.includes(id) ? p.features.filter(v => v !== id) : [...p.features, id] }))
  }
  function toggleMarketing(id: string) {
    setSel(p => ({ ...p, marketing: p.marketing.includes(id) ? p.marketing.filter(v => v !== id) : [...p.marketing, id] }))
  }
  function removeItem(item: LineItem) {
    if (item.tab === 'project') setSel(p => ({ ...p, project: '' }))
    else if (item.tab === 'features') setSel(p => ({ ...p, features: p.features.filter(v => v !== item.id) }))
    else if (item.tab === 'marketing') setSel(p => ({ ...p, marketing: p.marketing.filter(v => v !== item.id) }))
    else if (item.tab === 'scale') setSel(p => ({ ...p, scale: '' }))
    else if (item.tab === 'timeline') setSel(p => ({ ...p, timeline: '' }))
  }
  function reset() {
    setSel(EMPTY_SEL)
    setSubmitStatus('idle')
    setDrawerOpen(false)
  }
  async function handleSubmit() {
    setSubmitStatus('submitting')
    const body = {
      source: 'start_a_project',
      items: lineItems.map(i => `${i.label}: ${i.price === 0 ? 'Included' : fmt(i.price) + (i.monthly ? '/mo' : '')}`).join('\n'),
      oneOffTotal: fmt(oneTimeTotal),
      monthlyTotal: monthlyTotal > 0 ? fmt(monthlyTotal) + '/mo' : 'None',
    }
    try {
      const res = await fetch('https://formspree.io/f/xlgpogqk', {
        method: 'POST', body: JSON.stringify(body),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      setSubmitStatus(res.ok ? 'success' : 'error')
      if (res.ok) setDrawerOpen(false)
    } catch { setSubmitStatus('error') }
  }

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerOpen(false) }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  if (submitStatus === 'success') {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(53,173,223,0.1)' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6.5 6.5L23 8" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>Estimate sent</h1>
          <p className="text-base mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            We have received your estimate request and will be in touch within one business day.
          </p>
          <button type="button" onClick={reset}
            className="inline-block text-sm font-semibold text-white px-6 py-3 rounded"
            style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
            Start a new estimate
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Split layout */}
      <div className="pt-16 flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 4rem)' }}>

        {/* Left panel */}
        <div className="flex-1 lg:w-[55%] overflow-y-auto" style={{ minHeight: 0 }}>
          <div className="px-6 md:px-10 pt-10 pb-0" style={{ borderBottom: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              Quote builder
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              Start a project
            </h1>
            {/* Tabs */}
            <div className="flex -mb-px overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {TABS.map(t => (
                <button key={t.id} type="button" onClick={() => setTab(t.id)}
                  className="px-4 py-3 text-sm font-medium flex-shrink-0 transition-colors"
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    color: tab === t.id ? 'var(--navy)' : 'var(--mid)',
                    borderBottom: tab === t.id ? '2px solid var(--navy)' : '2px solid transparent',
                    background: 'transparent',
                    outline: 'none',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-6 md:px-10 py-8 pb-28 lg:pb-8">

            {tab === 'project' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Select the type of project you need. Pick one.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_TYPES.map(o => (
                    <RadioCard key={o.id} option={o} selected={sel.project === o.id}
                      onSelect={() => setSel(p => ({ ...p, project: o.id }))} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'features' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Select any features you need. Skip if unsure.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEATURES.map(o => (
                    <CheckCard key={o.id} option={o} checked={sel.features.includes(o.id)}
                      onToggle={() => toggleFeature(o.id)} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'marketing' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Add marketing, growth, and automation services to your project.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MARKETING_GROWTH.map(o => (
                    <CheckCard key={o.id} option={o} checked={sel.marketing.includes(o.id)}
                      onToggle={() => toggleMarketing(o.id)} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'scale' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Choose the option that best describes the scope of your project.
                </p>
                <div className="flex flex-col gap-3">
                  {SCALES.map(o => (
                    <RadioCard key={o.id} option={o} selected={sel.scale === o.id}
                      onSelect={() => setSel(p => ({ ...p, scale: o.id }))} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'timeline' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Rush fees apply for faster turnarounds.
                </p>
                <div className="flex flex-col gap-3">
                  {TIMELINES.map(o => (
                    <RadioCard key={o.id} option={o} selected={sel.timeline === o.id}
                      onSelect={() => setSel(p => ({ ...p, timeline: o.id }))} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right panel: desktop */}
        <div className="hidden lg:flex flex-col lg:w-[45%] flex-shrink-0 sticky top-16 overflow-y-auto"
          style={{ height: 'calc(100vh - 4rem)', borderLeft: '1px solid var(--border)', padding: '2.5rem' }}>
          <QuotePanelContent
            lineItems={lineItems}
            oneTimeTotal={oneTimeTotal}
            monthlyTotal={monthlyTotal}
            animatedOneTime={animatedOneTime}
            animatedMonthly={animatedMonthly}
            onRemove={removeItem}
            onSubmit={handleSubmit}
            onReset={reset}
            submitStatus={submitStatus}
          />
        </div>

      </div>

      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button type="button" onClick={() => setDrawerOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4">
          <span className="text-sm font-medium text-white" style={{ fontFamily: 'Geist, sans-serif' }}>
            Your estimate: <span className="font-semibold">{mobileTotal}</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            style={{ color: 'rgba(255,255,255,0.7)', transform: drawerOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
            <path d="M4 11.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setDrawerOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-50 rounded-t-2xl overflow-hidden flex flex-col"
        style={{
          background: 'var(--white)',
          maxHeight: '85vh',
          transform: drawerOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          borderTop: '1px solid var(--border)',
        }}>
        <div className="flex-shrink-0 flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
        </div>
        <div className="flex-shrink-0 flex items-center justify-between px-6 pb-4"
          style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>Your Estimate</h2>
          <button type="button" onClick={() => setDrawerOpen(false)} className="p-1" style={{ color: 'var(--mid)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6" style={{ paddingBottom: '5rem' }}>
          <QuotePanelContent
            lineItems={lineItems}
            oneTimeTotal={oneTimeTotal}
            monthlyTotal={monthlyTotal}
            animatedOneTime={animatedOneTime}
            animatedMonthly={animatedMonthly}
            onRemove={removeItem}
            onSubmit={handleSubmit}
            onReset={reset}
            submitStatus={submitStatus}
          />
        </div>
      </div>
    </>
  )
}
```


### `app/technology/page.tsx`

<sub>292 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Technology Services | Web Development, DevOps and Automation | Masuyo Digital',
  description: 'From web development and cloud infrastructure to AI integrations and workflow automation, Masuyo Digital builds and deploys technology that scales with your business.',
  openGraph: {
    title: 'Technology Services | Web Development, DevOps and Automation | Masuyo Digital',
    description: 'From web development and cloud infrastructure to AI integrations and workflow automation, Masuyo Digital builds and deploys technology that scales with your business.',
    url: 'https://masuyodigital.com/technology',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology' },
}

/* ─── Category icons ──────────────────────────────────────── */
function LayersIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 2L2 8l11 5.5L24 8 13 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 14l11 5.5L24 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 20l11 5.5L24 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function ServerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="3" y="3" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="15" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="7" r="1.25" fill="currentColor" />
      <circle cx="7.5" cy="19" r="1.25" fill="currentColor" />
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="8" y="8" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2v6M13 2v6M16 2v6M10 18v6M13 18v6M16 18v6M2 10h6M2 13h6M2 16h6M18 10h6M18 13h6M18 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Service card icon ───────────────────────────────────── */
function ServiceIcon({ slug }: { slug: string }) {
  const s = { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (slug === 'web-development')   return <svg {...s}><path d="M4 5l-3 3 3 3"/><path d="M12 5l3 3-3 3"/><path d="M9 3l-2 10"/></svg>
  if (slug === 'app-development')   return <svg {...s}><rect x="4" y="1" width="8" height="14" rx="1.5"/><path d="M7 12h2"/></svg>
  if (slug === 'web-applications')  return <svg {...s}><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 6h14"/><circle cx="3.5" cy="4.5" r=".6" fill="currentColor" stroke="none"/><circle cx="5.5" cy="4.5" r=".6" fill="currentColor" stroke="none"/></svg>
  if (slug === 'ecommerce')         return <svg {...s}><path d="M2 2h2l1.5 7h7l1.5-5H5.5"/><circle cx="8" cy="13.5" r="1"/><circle cx="12" cy="13.5" r="1"/></svg>
  if (slug === 'devops')            return <svg {...s}><circle cx="8" cy="8" r="2.5"/><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.64 3.64l1.06 1.06M11.3 11.3l1.06 1.06M3.64 12.36l1.06-1.06M11.3 4.7l1.06-1.06"/></svg>
  if (slug === 'hosting')           return <svg {...s}><rect x="1" y="4" width="14" height="4" rx="1"/><rect x="1" y="10" width="14" height="4" rx="1"/><circle cx="3.5" cy="6" r=".8" fill="currentColor" stroke="none"/><circle cx="3.5" cy="12" r=".8" fill="currentColor" stroke="none"/></svg>
  if (slug === 'database')          return <svg {...s}><ellipse cx="8" cy="4" rx="6" ry="2"/><path d="M2 4v4c0 1.1 2.69 2 6 2s6-.9 6-2V4"/><path d="M2 8v4c0 1.1 2.69 2 6 2s6-.9 6-2V8"/></svg>
  if (slug === 'architecture')      return <svg {...s}><circle cx="8" cy="8" r="2"/><circle cx="2" cy="3" r="1.5"/><circle cx="14" cy="3" r="1.5"/><circle cx="14" cy="13" r="1.5"/><circle cx="2" cy="13" r="1.5"/><path d="M3.2 4l3.4 2.7M9.4 5.3l3.4-2M12.5 4l-3.5 2.7M3.5 12.2l3.5-2.5M9 9.7l3.5 2.5"/></svg>
  if (slug === 'gdpr-compliance')   return <svg {...s}><path d="M8 1L2 4v4c0 3.5 2.6 6.7 6 7.7 3.4-1 6-4.2 6-7.7V4L8 1z"/><path d="M5.5 8l2 2 3-3"/></svg>
  if (slug === 'automation')        return <svg {...s}><path d="M5 4H3a1 1 0 00-1 1v6a1 1 0 001 1h2"/><path d="M11 4h2a1 1 0 011 1v6a1 1 0 01-1 1h-2"/><path d="M8 2v12M5 8h6"/></svg>
  if (slug === 'api')               return <svg {...s}><path d="M2 8h12"/><circle cx="5" cy="8" r="2"/><circle cx="11" cy="8" r="2"/><path d="M5 6V4M5 10v2M11 6V4M11 10v2"/></svg>
  if (slug === 'ai-chatbots')       return <svg {...s}><path d="M14 3H2a1 1 0 00-1 1v7a1 1 0 001 1h2v3l3-3h7a1 1 0 001-1V4a1 1 0 00-1-1z"/><path d="M5 7.5h6M5 9.5h4"/></svg>
  if (slug === 'crm')               return <svg {...s}><circle cx="8" cy="5" r="2.5"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
  // community-platforms
  return <svg {...s}><circle cx="4" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><path d="M5.8 7.2L6.5 10M10.2 7.2L9.5 10M4 8v2.5M12 8v2.5"/></svg>
}

/* ─── Data ────────────────────────────────────────────────── */
const buildServices = [
  { slug: 'web-development',   title: 'Web Development',             description: 'Modern, fast, and built to convert.',                                       href: '/technology/web-development' },
  { slug: 'app-development',   title: 'App Development',             description: 'Native and cross-platform apps for iOS and Android.',                       href: '/technology/app-development' },
  { slug: 'web-applications',  title: 'Web Applications and Portals', description: 'Complex browser-based tools and client portals.',                          href: '/technology/web-applications' },
  { slug: 'ecommerce',         title: 'E-commerce Development',      description: 'Online stores built around your products and customers.',                   href: '/technology/ecommerce' },
]

const infraServices = [
  { slug: 'devops',            title: 'DevOps',                          description: 'CI/CD pipelines, deployment automation, and release management.',                  href: '/technology/devops' },
  { slug: 'hosting',           title: 'Hosting',                         description: 'Managed hosting on our own infrastructure. Fast, reliable, and fully supported.',  href: '/technology/hosting' },
  { slug: 'database',          title: 'Database Design and Management',  description: 'Structured, scalable, and secure data architecture.',                              href: '/technology/database' },
  { slug: 'architecture',      title: 'Systems Architecture',            description: 'Technical strategy and system design for complex digital products.',               href: '/technology/architecture' },
  { slug: 'gdpr-compliance',   title: 'GDPR and Compliance',             description: 'Data protection implementation that keeps you on the right side of the law.',      href: '/technology/gdpr-compliance' },
]

const automationServices = [
  { slug: 'automation',            title: 'Workflow Automation',              description: 'Remove the manual tasks and connect your business tools.',              href: '/technology/automation' },
  { slug: 'api',                   title: 'API Development and Integration',  description: 'Build and connect APIs across your entire tech stack.',                href: '/technology/api' },
  { slug: 'ai-chatbots',           title: 'AI Chatbots and Assistants',       description: 'Intelligent assistants trained on your content and workflows.',        href: '/technology/ai-chatbots' },
  { slug: 'crm',                   title: 'CRM and Business Systems',         description: 'Custom CRM platforms and internal business tools.',                    href: '/technology/crm' },
  { slug: 'community-platforms',   title: 'Community and Learning Platforms', description: 'Member portals, course platforms, and community hubs.',               href: '/technology/community-platforms' },
]

/* ─── Sub-components ──────────────────────────────────────── */
function ServiceCard({ slug, title, description, href }: { slug: string; title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 p-5 rounded-lg transition-colors hover:bg-light h-full"
      style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
    >
      <div
        className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}
      >
        <ServiceIcon slug={slug} />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-semibold text-ink leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          {description}
        </p>
      </div>
      <span className="flex items-center gap-1.5 text-xs font-semibold transition-colors group-hover:text-navy" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
        Learn more
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}

function SectionHeading({ label, id }: { label: string; id: string }) {
  return (
    <div id={id} className="flex items-center gap-4 mb-10">
      <h2 className="text-3xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
        {label}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
export default function TechnologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                We Build Technology That Works at Scale
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                From architecture and infrastructure to automation and AI, we design and deploy digital systems that are fast, secure, and built to grow with your business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link
                href="/start-a-project"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
                style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* What We Build - 3 category cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What We Build
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <LayersIcon />,
                heading: 'Build',
                description: 'Websites, web applications, mobile apps, and e-commerce platforms. Built from scratch, built to perform, built around your goals.',
                anchor: '#build',
              },
              {
                icon: <ServerIcon />,
                heading: 'Infrastructure and DevOps',
                description: 'Cloud hosting, CI/CD pipelines, database architecture, systems design, and GDPR compliance. The foundations that keep everything running.',
                anchor: '#infrastructure',
              },
              {
                icon: <CpuIcon />,
                heading: 'Automation and Intelligence',
                description: 'Workflow automation, API integrations, AI assistants, CRM systems, and community platforms. Technology that works while you sleep.',
                anchor: '#automation',
              },
            ].map((card, i) => (
              <RevealAnimation key={card.heading} delay={(i + 1) as 1 | 2 | 3}>
                <div
                  className="flex flex-col gap-5 p-6 rounded-lg h-full"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--navy)', color: 'var(--blue)' }}
                  >
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {card.heading}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                      {card.description}
                    </p>
                  </div>
                  <Link
                    href={card.anchor}
                    className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-navy"
                    style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                  >
                    View services
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Build */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <SectionHeading label="Build" id="build" />
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {buildServices.map((s, i) => (
              <RevealAnimation key={s.slug} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <ServiceCard {...s} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure and DevOps */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <SectionHeading label="Infrastructure and DevOps" id="infrastructure" />
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {infraServices.map((s, i) => (
              <RevealAnimation key={s.slug} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <ServiceCard {...s} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Automation and Intelligence */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <SectionHeading label="Automation and Intelligence" id="automation" />
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {automationServices.map((s, i) => (
              <RevealAnimation key={s.slug} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <ServiceCard {...s} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build something that lasts?"
        body="Tell us what you need and we will tell you how to build it properly."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/terms/page.tsx`

<sub>250 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Masuyo Digital terms of service: the terms that govern your use of our website and services.',
  alternates: { canonical: 'https://masuyodigital.com/terms' },
}

const LAST_UPDATED = '14 April 2025'
const COMPANY = 'Masuyo Digital'
const EMAIL = 'hello@masuyodigital.com'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
      {children}
    </p>
  )
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
          <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function TermsPage() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Header */}
        <div className="mb-10 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
          <h1 className="text-4xl font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Terms of Service
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <P>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website located at masuyodigital.com and any services provided by {COMPANY} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.
        </P>

        <div className="my-8" style={{ borderTop: '1px solid var(--border)' }} />

        <Section title="1. About us">
          <P>
            {COMPANY} is a digital agency based in the United Kingdom providing web design, digital marketing, technology solutions, automation, and hosting services. For any enquiries regarding these Terms, please contact us at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'var(--blue)' }}>{EMAIL}</a>.
          </P>
        </Section>

        <Section title="2. Use of our website">
          <P>You may use our website for lawful purposes only. You agree not to:</P>
          <Ul items={[
            'Use the website in any way that violates applicable laws or regulations.',
            'Transmit any unsolicited or unauthorised advertising or promotional material.',
            'Attempt to gain unauthorised access to any part of the website, its servers, or any related systems.',
            'Introduce viruses, trojans, worms, or other malicious or harmful material.',
            'Harvest or collect email addresses or other personal data from the website without permission.',
            'Reproduce, duplicate, copy, or resell any part of our website without our express written consent.',
            'Use automated tools to scrape, crawl, or index our website content.',
          ]} />
          <P>
            We reserve the right to suspend or terminate access to the website for any user who violates these conditions, at our sole discretion and without prior notice.
          </P>
        </Section>

        <Section title="3. Our services">
          <P>
            Details of our services, including scope, deliverables, timelines, and pricing, are agreed in writing between {COMPANY} and the client before work commences. These Terms apply in addition to any project-specific agreement or statement of work.
          </P>
          <P>
            We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. Where we make material changes affecting an existing client agreement, we will provide reasonable prior notice.
          </P>
        </Section>

        <Section title="4. Quotes and pricing">
          <P>
            All prices stated on this website are indicative and subject to confirmation following a discovery call or review of your requirements. A formal quote or proposal will be provided before any work begins.
          </P>
          <P>
            Prices on the website are stated in GBP (£) and are exclusive of VAT unless stated otherwise. Where VAT applies, it will be itemised on invoices.
          </P>
          <P>
            We reserve the right to change our advertised prices at any time. Price changes will not affect quotes already accepted or projects already in progress under a signed agreement.
          </P>
        </Section>

        <Section title="5. Payment terms">
          <P>
            Payment terms for each project are agreed in the project proposal or statement of work. Standard terms are:
          </P>
          <Ul items={[
            'A deposit (typically 50% of the agreed project fee) is due before work commences.',
            'The remaining balance is due upon completion of the project or as specified in the project agreement.',
            'For ongoing services (such as hosting or retainers), invoices are issued monthly and payment is due within 14 days of the invoice date.',
          ]} />
          <P>
            Late payments may incur interest at 8% above the Bank of England base rate per annum in accordance with the Late Payment of Commercial Debts (Interest) Act 1998. We reserve the right to suspend services for accounts with overdue invoices.
          </P>
        </Section>

        <Section title="6. Intellectual property">
          <P>
            All content on this website, including text, graphics, logos, images, and software, is the property of {COMPANY} or our licensors and is protected by UK and international intellectual property laws.
          </P>
          <P>
            Upon full payment for a project, ownership of the deliverables (such as website design, code, and content created for you) transfers to the client, except as otherwise agreed in writing. We retain the right to display work completed for clients in our portfolio unless otherwise agreed.
          </P>
          <P>
            Any third-party software, frameworks, or libraries incorporated into your project are subject to their respective licences. We will advise you of any licensing obligations that may affect your use of the deliverables.
          </P>
        </Section>

        <Section title="7. Client responsibilities">
          <P>To enable us to deliver services effectively, clients are responsible for:</P>
          <Ul items={[
            'Providing accurate, complete, and timely information and materials required for the project.',
            'Reviewing and approving work within agreed timelines. Delays caused by client inaction may affect delivery dates.',
            'Ensuring that any content, images, or materials provided to us do not infringe the rights of any third party.',
            'Maintaining appropriate backups of any content or data you provide to us.',
            'Obtaining any necessary licences, permissions, or consents required for materials you supply.',
          ]} />
        </Section>

        <Section title="8. Hosting services">
          <P>
            Where we provide hosting services, we will use reasonable endeavours to maintain uptime and server availability. We do not guarantee 100% uptime and are not liable for losses arising from scheduled or unscheduled downtime.
          </P>
          <P>
            Hosting services are provided on a monthly or annual basis. Either party may terminate hosting with 30 days&apos; written notice. Upon termination, we will provide a reasonable opportunity for you to retrieve your data.
          </P>
          <P>
            We reserve the right to suspend hosting immediately and without notice if the hosted content violates our acceptable use policy or applicable law.
          </P>
        </Section>

        <Section title="9. Confidentiality">
          <P>
            Each party agrees to keep confidential any proprietary or sensitive information received from the other party in connection with a project, and not to disclose it to any third party without prior written consent, except as required by law.
          </P>
        </Section>

        <Section title="10. Limitation of liability">
          <P>
            To the fullest extent permitted by applicable law, {COMPANY} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of revenue, loss of data, or loss of business opportunity, arising from your use of our website or services.
          </P>
          <P>
            Our total aggregate liability to any client in connection with any project shall not exceed the total fees paid by that client to us in the twelve months preceding the claim.
          </P>
          <P>
            Nothing in these Terms excludes or limits our liability for: death or personal injury caused by our negligence; fraud or fraudulent misrepresentation; or any other liability that cannot be excluded or limited under applicable law.
          </P>
        </Section>

        <Section title="11. Indemnification">
          <P>
            You agree to indemnify and hold harmless {COMPANY} and its team members from any claims, losses, damages, or expenses (including reasonable legal fees) arising from your use of our website or services, your breach of these Terms, or your infringement of any third-party rights.
          </P>
        </Section>

        <Section title="12. Acceptable use">
          <P>
            You must not use our services to create, host, promote, or distribute content that:
          </P>
          <Ul items={[
            'Is unlawful, harmful, defamatory, obscene, or offensive.',
            'Infringes any intellectual property, privacy, or other rights of any third party.',
            'Involves the collection or processing of personal data without appropriate legal basis.',
            'Constitutes spam, phishing, or any form of unsolicited communication.',
            'Is designed to defraud, mislead, or cause harm to any person or organisation.',
            'Violates any applicable UK law or regulation.',
          ]} />
        </Section>

        <Section title="13. Termination">
          <P>
            Either party may terminate a project or service agreement by giving notice as specified in the relevant project agreement. In the absence of a specific agreement, 30 days&apos; written notice is required.
          </P>
          <P>
            Upon termination, any outstanding fees for work completed up to the date of termination become immediately due and payable. Deposits paid are non-refundable unless expressly agreed otherwise.
          </P>
          <P>
            We may terminate services immediately and without refund where a client has materially breached these Terms or a project agreement.
          </P>
        </Section>

        <Section title="14. Governing law and disputes">
          <P>
            These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </P>
          <P>
            We are committed to resolving disputes fairly and without unnecessary escalation. If you have a complaint, please contact us at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'var(--blue)' }}>{EMAIL}</a>{' '}
            and we will aim to reach a resolution within 14 working days.
          </P>
        </Section>

        <Section title="15. Changes to these terms">
          <P>
            We may update these Terms from time to time. Changes will be posted on this page with an updated &ldquo;last updated&rdquo; date. Continued use of our website or services after changes are posted constitutes acceptance of the updated Terms. We recommend reviewing this page periodically.
          </P>
        </Section>

        <Section title="16. Contact">
          <P>
            For any questions regarding these Terms, please contact us:
          </P>
          <div className="p-5 rounded-lg" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
            <p className="text-sm font-semibold text-ink mb-1" style={{ fontFamily: 'Geist, sans-serif' }}>{COMPANY}</p>
            <a href={`mailto:${EMAIL}`} className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>{EMAIL}</a>
          </div>
        </Section>

        <div className="mt-10 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/privacy-policy" className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            Privacy Policy
          </Link>
          <span style={{ color: 'var(--border)' }}>·</span>
          <Link href="/contact" className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
```


### `app/blog/[slug]/page.tsx`

<sub>221 lines</sub>

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { postBySlugQuery, allPostSlugsQuery, latestPostsQuery } from '@/sanity/queries'
import type { SanityPost } from '@/sanity/types'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(allPostSlugsQuery)
    return slugs
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post: SanityPost = await client.fetch(postBySlugQuery, { slug: params.slug })
    if (!post) return {}
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} – Masuyo Digital`,
        description: post.excerpt,
        url: `https://masuyodigital.com/blog/${params.slug}`,
        images: post.featuredImage?.asset?.url ? [{ url: post.featuredImage.asset.url }] : [],
      },
      alternates: { canonical: `https://masuyodigital.com/blog/${params.slug}` },
    }
  } catch {
    return {}
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold text-ink mt-10 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-ink mt-8 mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 pl-4 my-6 italic" style={{ borderColor: 'var(--blue)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{children}</blockquote>
    ),
  },
  types: {
    image: ({ value }: { value: { asset?: { url: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?.url) return null
      return (
        <figure className="my-8">
          <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={value.asset.url}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-center mt-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-ink">{children}</strong>,
  },
}

export default async function BlogPostPage({ params }: Props) {
  let post: SanityPost | null = null
  let relatedPosts: SanityPost[] = []

  try {
    post = await client.fetch(postBySlugQuery, { slug: params.slug })
    relatedPosts = await client.fetch(latestPostsQuery)
    relatedPosts = relatedPosts.filter((p) => p.slug.current !== params.slug).slice(0, 3)
  } catch {
    // Sanity not configured
  }

  if (!post) notFound()

  return (
    <>
      {/* Featured image */}
      {post.featuredImage?.asset?.url && (
        <div className="relative w-full h-72 md:h-[480px] mt-16" style={{ background: 'var(--light)' }}>
          <Image
            src={post.featuredImage.asset.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Post content */}
      <article className="py-16 md:py-24" style={{ marginTop: post.featuredImage ? '0' : '64px' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.category && (
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded"
                style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                {post.category}
              </span>
            )}
            <span className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              {formatDate(post.publishedAt)}
            </span>
            {post.author && (
              <>
                <span style={{ color: 'var(--border)' }}>·</span>
                <span className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  {post.author}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
            {post.title}
          </h1>

          {/* Body */}
          {post.body && (
            // @ts-expect-error PortableText types
            <PortableText value={post.body} components={portableTextComponents} />
          )}

          {/* Back link */}
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href="/blog"
              className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H3M6.5 4L3 7l3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to blog
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16" style={{ background: 'var(--light)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-ink mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>
              More from the blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug.current}`}
                  className="group p-6 rounded-lg transition-colors hover:bg-white"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                >
                  {related.category && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded mb-3 inline-block"
                      style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {related.category}
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-ink mb-2 leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {related.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    {formatDate(related.publishedAt)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
```


### `app/blog/tech-solutions-for-small-businesses/page.tsx`

<sub>187 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How Technology Solutions Help Small Businesses Grow',
  description: 'The right technology does not just save time; it changes the trajectory of your business. Here is what small businesses should actually be using and why.',
  openGraph: {
    title: 'How Technology Solutions Help Small Businesses Grow – Masuyo Digital',
    description: 'The right technology does not just save time; it changes the trajectory of your business.',
    url: 'https://masuyodigital.com/blog/tech-solutions-for-small-businesses',
  },
  alternates: { canonical: 'https://masuyodigital.com/blog/tech-solutions-for-small-businesses' },
}

export default function TechSolutionsBlogPost() {
  return (
    <article className="py-16 md:py-24" style={{ marginTop: '64px' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded"
            style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
          >
            Technology
          </span>
          <span className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            14 April 2025
          </span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            Masuyo Digital
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-8 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
          How technology solutions help small businesses grow
        </h1>

        {/* Intro */}
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Ask most small business owners whether technology helps their business and they will say yes. Ask them whether they are using the right technology well, and the answer is usually more complicated.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          The gap between having tools and using them effectively is where most small businesses lose time, money and competitive ground. The right technology, implemented properly, does not just make things marginally easier. It changes the trajectory of the business.
        </p>
        <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Here is a clear-eyed look at what small businesses should be using, why it matters, and how to approach it without getting overwhelmed.
        </p>

        {/* Pull quote */}
        <blockquote className="border-l-4 pl-5 my-8" style={{ borderColor: 'var(--blue)' }}>
          <p className="text-xl font-semibold text-ink leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
            &ldquo;The right technology does not just save time. It compounds. Every system you put in place makes the next one more powerful.&rdquo;
          </p>
        </blockquote>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold text-ink mt-10 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Start with the basics: your customer relationship management
        </h2>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          If you are managing customer relationships through a spreadsheet, a combination of email folders, or (and we see this more often than you would expect) your memory, you are leaving revenue on the table.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          A CRM (Customer Relationship Management) system gives you a single place to track every contact, conversation, proposal, and sale. More importantly, it makes follow-up automatic. The number one reason small businesses lose clients they should have won is simply that they forgot to follow up at the right moment.
        </p>
        <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          For most small businesses, HubSpot Free or a simple Notion-based pipeline is enough to start. You do not need a £500/month enterprise platform. You need consistent data and consistent follow-through.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold text-ink mt-10 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Automation: the multiplier most businesses ignore
        </h2>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Consider how much time your team spends on tasks that follow a predictable pattern. Someone submits an enquiry form. Someone manually emails them a quote template. They respond. Someone manually books a call. The call happens. Someone manually sends a follow-up email.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Each of those manual steps is time that could be spent on work that actually requires human judgment. Automation tools like Zapier, Make (formerly Integromat), or bespoke integrations between your existing platforms can eliminate most of this friction.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          The business case is simple: a two-person company that automates its enquiry and onboarding workflow gets back five to ten hours a week. That is the equivalent of adding a part-time team member at no additional cost.
        </p>
        <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          The key is to start with the highest-frequency, lowest-complexity processes. Do not begin with automation because you have read about it. Begin with automation because you have identified something specific that is eating your time.
        </p>

        {/* Highlight box */}
        <div className="my-8 p-6 rounded-lg" style={{ background: 'var(--light)', borderLeft: '3px solid var(--blue)' }}>
          <h3 className="text-base font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Quick win: automate your enquiry response
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
            Connect your contact form to your email system so every new enquiry triggers an immediate, personalised acknowledgement with next steps. Research shows response speed is one of the biggest drivers of conversion rate: the businesses that respond within five minutes win disproportionately.
          </p>
        </div>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold text-ink mt-10 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Your website is not a brochure; it is infrastructure
        </h2>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Many small businesses treat their website as something they built once and now maintain. That thinking misses most of the value.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          A well-built website is the hub of your entire digital operation. It is where your SEO efforts direct traffic. It is where your ad campaigns land. It is where your email sequences point. It is where your social media bio links. When the website works, when it is fast, trustworthy, and designed to convert, every other channel you invest in becomes more effective.
        </p>
        <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Performance matters more than most business owners realise. A one-second delay in page load time reduces conversions by roughly 7% according to multiple studies. On mobile, where the majority of your traffic likely lands, the impact is even greater. If your website loads in more than three seconds, fixing that is one of the highest-return investments you can make.
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold text-ink mt-10 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Accounting and invoicing: the admin that silently kills momentum
        </h2>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Late invoicing, poor cash flow visibility, and hours spent reconciling bank statements are symptoms of the same problem: using the wrong tool for financial management, or using no dedicated tool at all.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          UK small businesses have strong options here. Xero is the market leader and integrates with most other platforms. QuickBooks is solid, particularly if your accountant already uses it. FreeAgent is popular with contractors and sole traders, and is free through some UK business bank accounts.
        </p>
        <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          The specific tool matters less than using one properly. Automated bank feeds, recurring invoices, and a live cash flow forecast take a few hours to set up and save many more every month.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold text-ink mt-10 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Data: the asset most small businesses do not know they have
        </h2>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Every time someone visits your website, engages with an email, searches for your business, or calls your number, they leave data. That data tells you where your customers come from, what they are looking for, where they get confused, and what persuades them to buy.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Most small businesses have access to this data through free tools including Google Analytics 4, Google Search Console, and Meta Business Suite, but do not look at it, do not know how to interpret it, or do not connect the insights to decisions.
        </p>
        <p className="text-base mb-10 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          You do not need a data analyst. You need a monthly habit: spend 30 minutes looking at where your traffic comes from, which pages get the most visits, and which convert. Over time, this creates a feedback loop that makes every marketing and technology decision more precise.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold text-ink mt-10 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Where to start if you are overwhelmed
        </h2>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          Technology solutions can feel like a rabbit hole. There are hundreds of tools, each claiming to solve a version of the same problem, each with its own learning curve and monthly subscription.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          The most effective approach is not to pick the best tools in each category. It is to pick the smallest set of tools that solve your most expensive problems, integrate them properly, and build habits around using them.
        </p>
        <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
          A business with a great website, a working CRM, solid accounting software, and a few well-placed automations is not using cutting-edge technology. It is using the right technology well. That combination puts it ahead of most of its competitors.
        </p>

        {/* Final callout */}
        <div className="my-10 p-7 rounded-lg" style={{ background: 'var(--navy)' }}>
          <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Want help choosing the right tech stack for your business?
          </h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
            We help UK businesses audit their current tools, identify gaps, and implement the right systems. No bloated software, no unnecessary subscriptions.
          </p>
          <Link href="/services/technology-solutions"
            className="inline-block text-sm font-semibold text-white px-5 py-2.5 rounded"
            style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            See our technology solutions
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/blog"
            className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-80"
            style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6.5 4L3 7l3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to blog
          </Link>
        </div>
      </div>
    </article>
  )
}
```


### `app/industries/[slug]/page.tsx`

<sub>207 lines</sub>

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import { industries, getIndustryBySlug } from '@/lib/industries-data'

export async function generateStaticParams() {
  return industries.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) return {}
  return {
    title: industry.seoTitle,
    description: industry.metaDescription,
    openGraph: {
      title: industry.seoTitle,
      description: industry.metaDescription,
      url: `https://masuyodigital.com/industries/${industry.slug}`,
    },
    alternates: { canonical: `https://masuyodigital.com/industries/${industry.slug}` },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) notFound()

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-3xl">
            <RevealAnimation>
              <Link
                href="/industries"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All Industries
              </Link>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Geist, sans-serif' }}
              >
                {industry.name}
              </p>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {industry.hero}
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <Link
                href="/start-a-project"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity hover:opacity-90"
                style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                {industry.cta}
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                The problem
              </p>
              <p
                className="text-xl md:text-2xl leading-relaxed"
                style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}
              >
                {industry.problem}
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                What we do
              </p>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                How we help {industry.name} businesses
              </h2>
            </RevealAnimation>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.solutions.map((solution, i) => (
              <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div
                  className="p-6 rounded-lg h-full flex flex-col gap-4"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '3px solid var(--blue)' }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
                  >
                    {solution}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                The result
              </p>
              <p
                className="text-2xl md:text-3xl font-semibold text-ink mb-10"
                style={{ fontFamily: 'var(--font-poppins)', lineHeight: '1.4' }}
              >
                {industry.benefits}
              </p>
              <Link
                href="/start-a-project"
                className="inline-block text-sm font-semibold text-white px-8 py-4 rounded transition-opacity hover:opacity-90"
                style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
              >
                {industry.cta}
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section className="py-16" style={{ background: 'var(--light)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
            >
              Other industries
            </p>
          </RevealAnimation>
          <div className="flex flex-wrap gap-3">
            {industries
              .filter(i => i.slug !== slug)
              .map(i => (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="text-sm font-medium px-4 py-2 rounded-full transition-colors hover:bg-white"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
                >
                  {i.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
```


### `app/marketing/content/page.tsx`

<sub>135 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Content Marketing Services UK | Masuyo Digital',
  description: 'Strategic content marketing for UK businesses. Blog posts, guides, and content that builds authority, drives organic traffic, and generates inbound leads.',
  openGraph: {
    title: 'Content Marketing Services UK | Masuyo Digital',
    description: 'Strategic content marketing for UK businesses. Blog posts, guides, and content that builds authority, drives organic traffic, and generates inbound leads.',
    url: 'https://masuyodigital.com/marketing/content',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing/content' },
}

const solutionPoints = [
  'Content strategy built around your target keywords and audience',
  'Blog posts and long-form guides written to rank',
  'Lead magnets and downloadable resources',
  'Content repurposing across channels',
  'Internal linking strategy to boost SEO',
  'Editorial calendar and consistent publishing schedule',
]

const features = [
  'Content strategy',
  'Keyword research',
  'Blog post writing',
  'Long-form guide creation',
  'Lead magnet development',
  'Content calendar',
  'SEO optimisation',
  'Performance tracking',
]

export default function ContentPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Content Marketing
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Content That Builds Authority and Drives Leads
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We create strategic content that ranks in search, establishes your expertise, and brings the right people to your business before they are even ready to buy.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Random blog posts and social updates do not build authority or drive traffic. Content marketing only works when it is strategic, consistent, and built around what your ideal clients are actually searching for.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  How we approach content
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build content that compounds?"
        body="Tell us about your audience and what they are searching for. We will build the content strategy that gets you found."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/marketing/email-automation/page.tsx`

<sub>134 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Email Marketing and Automation UK | Masuyo Digital',
  description: 'Email marketing and automation for UK businesses. Welcome sequences, nurture campaigns, and re-engagement flows that convert leads into customers.',
  openGraph: {
    title: 'Email Marketing and Automation UK | Masuyo Digital',
    description: 'Email marketing and automation for UK businesses. Welcome sequences, nurture campaigns, and re-engagement flows that convert leads into customers.',
    url: 'https://masuyodigital.com/marketing/email-automation',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing/email-automation' },
}

const solutionPoints = [
  'Welcome and onboarding sequences for new subscribers',
  'Lead nurture campaigns for prospects who are not ready to buy yet',
  'Post-purchase and post-project follow-up sequences',
  'Re-engagement campaigns for cold subscribers',
  'Abandoned enquiry recovery sequences',
  'Review and referral request automation',
]

const features = [
  'Email strategy',
  'Sequence design and copywriting',
  'Platform setup (Mailchimp, Klaviyo, or ActiveCampaign)',
  'Automation workflow build',
  'List segmentation',
  'A/B testing',
  'Performance reporting',
]

export default function EmailAutomationPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Email Marketing and Automation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Email That Works While You Sleep
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build email sequences and automation workflows that nurture your leads, onboard your customers, and keep your audience engaged without you lifting a finger.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most businesses send the occasional newsletter and call it email marketing. Without automated sequences and a proper nurture strategy, you are leaving a huge amount of revenue on the table from leads who just needed a bit more time.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we build
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to put your email to work?"
        body="Tell us about your audience and where they are in the buying journey. We will build the sequences to move them forward."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/marketing/lead-generation/page.tsx`

<sub>137 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Lead Generation Services UK | Masuyo Digital',
  description: 'End-to-end lead generation for UK service businesses. We build the systems that bring qualified prospects to you consistently.',
  openGraph: {
    title: 'Lead Generation Services UK | Masuyo Digital',
    description: 'End-to-end lead generation for UK service businesses. We build the systems that bring qualified prospects to you consistently.',
    url: 'https://masuyodigital.com/marketing/lead-generation',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing/lead-generation' },
}

const solutionPoints = [
  'Multi-channel lead generation strategy',
  'Landing page design and build',
  'Lead magnet creation and distribution',
  'Paid traffic to targeted landing pages',
  'SEO for high-intent search terms',
  'Lead qualification and scoring setup',
  'CRM integration and follow-up automation',
]

const features = [
  'Lead generation strategy',
  'Landing page build',
  'Lead magnet creation',
  'Paid campaign management',
  'SEO foundations',
  'Lead scoring',
  'CRM setup',
  'Follow-up automation',
  'Monthly reporting',
]

export default function LeadGenerationPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Lead Generation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                A Consistent Flow of Qualified Leads
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build lead generation systems that work across multiple channels, so you are never dependent on word of mouth or a single source of new business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most service businesses grow through referrals until the referrals slow down. Without a systematic approach to lead generation, your pipeline is unpredictable and your growth is out of your control.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  How we generate leads
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to take control of your pipeline?"
        body="Tell us about your business and who your ideal customer is. We will build the system to bring them to you."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/marketing/paid-ads/page.tsx`

<sub>137 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Paid Advertising Services UK | Google and Meta Ads | Masuyo Digital',
  description: 'Google Ads and Meta Ads management for UK businesses. Campaigns built to deliver profitable leads and sales, not just clicks.',
  openGraph: {
    title: 'Paid Advertising Services UK | Google and Meta Ads | Masuyo Digital',
    description: 'Google Ads and Meta Ads management for UK businesses. Campaigns built to deliver profitable leads and sales, not just clicks.',
    url: 'https://masuyodigital.com/marketing/paid-ads',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing/paid-ads' },
}

const solutionPoints = [
  'Campaign strategy and setup from scratch',
  'Keyword research and audience targeting',
  'Ad copy and creative development',
  'Dedicated landing pages for each campaign',
  'Conversion tracking setup before spending a penny',
  'Weekly optimisation and performance review',
  'Monthly reporting with clear ROI metrics',
]

const features = [
  'Campaign strategy',
  'Keyword and audience research',
  'Ad copy and creative',
  'Landing page build',
  'Conversion tracking',
  'A/B testing',
  'Budget management',
  'Weekly optimisation',
  'Monthly reporting',
]

export default function PaidAdsPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Paid Advertising
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Paid Ads That Pay for Themselves
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We manage Google and Meta ad campaigns that are built around your cost per acquisition, not your click-through rate. Every pound of budget is tracked, optimised, and accountable.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most paid ad campaigns waste the majority of their budget on the wrong keywords, the wrong audiences, and landing pages that do not convert. You end up paying for traffic that never becomes a customer.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  How we run campaigns
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to make your ad spend work harder?"
        body="Tell us your budget, your goals, and who you are trying to reach. We will build the campaigns that deliver."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/marketing/seo/page.tsx`

<sub>136 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'SEO Services UK | Search Engine Optimisation | Masuyo Digital',
  description: 'SEO services for UK businesses that want to rank higher, get found faster, and drive organic traffic that converts into real customers.',
  openGraph: {
    title: 'SEO Services UK | Search Engine Optimisation | Masuyo Digital',
    description: 'SEO services for UK businesses that want to rank higher, get found faster, and drive organic traffic that converts into real customers.',
    url: 'https://masuyodigital.com/marketing/seo',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing/seo' },
}

const solutionPoints = [
  'Technical SEO audit and implementation',
  'Keyword research and opportunity mapping',
  'On-page optimisation across all key pages',
  'Content strategy and creation',
  'Local SEO for businesses serving specific areas',
  'Link building and authority development',
  'Monthly reporting and strategy review',
]

const features = [
  'Technical audit',
  'Keyword research',
  'On-page optimisation',
  'Content briefs',
  'Google Search Console setup',
  'Sitemap and schema markup',
  'Local SEO',
  'Monthly reporting',
]

export default function SeoPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                SEO and Search Engine Optimisation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Rank Higher. Get Found. Grow Organically.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build SEO strategies that get your business in front of the right people at the right moment. Technical foundations, content strategy, and link building that compounds over time.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most businesses either ignore SEO entirely or waste money on agencies that promise page one rankings overnight. Real SEO takes time, expertise, and a strategy built around your specific market.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  How we approach SEO
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to grow your organic traffic?"
        body="Tell us about your business and where you want to rank. We will build the strategy to get you there."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/marketing/social/page.tsx`

<sub>135 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Social Media Management UK | Masuyo Digital',
  description: 'Social media management and content creation for UK businesses. Consistent, on-brand content that builds your audience and drives engagement.',
  openGraph: {
    title: 'Social Media Management UK | Masuyo Digital',
    description: 'Social media management and content creation for UK businesses. Consistent, on-brand content that builds your audience and drives engagement.',
    url: 'https://masuyodigital.com/marketing/social',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing/social' },
}

const solutionPoints = [
  'Social media strategy and content pillar development',
  'Content creation and copywriting for LinkedIn, Instagram, and Facebook',
  'Branded graphics and visual content',
  'Scheduling and publishing management',
  'Community management and engagement',
  'Monthly performance review and strategy adjustment',
]

const features = [
  'Social media strategy',
  'Content calendar',
  'Copywriting',
  'Graphic design',
  'Scheduling',
  'Community management',
  'Hashtag research',
  'Monthly reporting',
]

export default function SocialPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Social Media Management
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Social Media That Actually Builds Your Business
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We manage your social media presence with a strategy, not just a schedule. Consistent content, clear messaging, and a focus on building an audience that converts.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Posting randomly and hoping for engagement is not a social media strategy. Without consistent, on-brand content built around a clear content plan, your social presence does more harm than good.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we do
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build a social presence that works?"
        body="Tell us which platforms matter for your business and what you want your audience to do. We will build the strategy."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/products/bespoke/page.tsx`

<sub>122 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Bespoke Technology Solutions UK | Masuyo Digital',
  description: 'We build bespoke technology products from scratch. If your idea does not fit a template, we design and build it from the ground up.',
  openGraph: {
    title: 'Bespoke Technology Solutions UK | Masuyo Digital',
    description: 'We build bespoke technology products from scratch.',
    url: 'https://masuyodigital.com/products/bespoke',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/bespoke' },
}

const products = [
  { title: 'Custom Learning Platform', description: 'Branded course platform and coaching academy.', href: '/products/custom-learning-platform' },
  { title: 'Client Portal', description: 'Premium branded space for your clients to access work and files.', href: '/products/client-portal' },
  { title: 'Community Platform', description: 'Private branded community your members will actually use.', href: '/products/community-platform' },
  { title: 'CRM and Lead Management', description: 'Lightweight custom CRM built around your sales process.', href: '/products/crm-lead-management' },
]

const capabilities = [
  'Custom web applications and internal tools',
  'Marketplace and multi-vendor platforms',
  'Booking and scheduling systems',
  'Subscription and membership platforms',
  'Data dashboards and reporting tools',
  'Complex API and third-party integrations',
  'Workflow automation and business systems',
  'Mobile applications for iOS and Android',
]

export default function BespokePage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Bespoke Technology
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                We Build What Others Cannot Template
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                If your idea does not fit a standard platform or template, we design and build it from the ground up. Custom software built exactly for your business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Book a Discovery Call
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we can build
                </h2>
                <ul className="flex flex-col gap-3">
                  {capabilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                      <span style={{ color: 'var(--blue)', marginTop: 2 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Ready-made products
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: 1.7 }}>
                  If your needs fit one of our existing product types, we can start from a proven foundation and customise it for you.
                </p>
                <div className="flex flex-col gap-4">
                  {products.map((p, i) => (
                    <Link key={i} href={p.href} className="flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-light" style={{ border: '1px solid var(--border)' }}>
                      <div>
                        <p className="text-sm font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{p.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{p.description}</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'var(--blue)', flexShrink: 0 }}>
                        <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand
        headline="Have an idea that needs a custom build?"
        body="Book a discovery call. We will listen, ask the right questions, and tell you exactly what it would take to build it."
        buttonLabel="Book a Discovery Call"
        buttonHref="/contact"
      />
    </>
  )
}
```


### `app/products/client-portal/page.tsx`

<sub>89 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom Client Portal Development UK | Masuyo Digital',
  description: 'Give your clients a premium branded space to access work, files, and project updates. A fully custom client portal built for your business.',
  openGraph: {
    title: 'Custom Client Portal Development UK | Masuyo Digital',
    description: 'Give your clients a premium branded space to access work, files, and project updates.',
    url: 'https://masuyodigital.com/products/client-portal',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/client-portal' },
}

const features = [
  { title: 'Branded Client Login', description: 'Your domain, your colours, your logo. A portal that looks like part of your business.' },
  { title: 'Project and Task Tracking', description: 'Clients see exactly where their project stands without needing to email you.' },
  { title: 'File and Document Sharing', description: 'Secure upload and download of deliverables, contracts, and assets.' },
  { title: 'Invoices and Payments', description: 'Send invoices and collect payments directly through the portal.' },
  { title: 'Messaging and Updates', description: 'Keep all client communication in one place, tied to their project.' },
  { title: 'Admin Dashboard', description: 'Manage all clients, projects, and activity from one clean control panel.' },
]

export default function ClientPortalPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology Product
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                We Build Custom Client Portals
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Give your clients a premium branded space to access work, files, and updates. Fully custom, fully owned. No monthly platform fees.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                  Get a Quote
                </Link>
                <Link href="/products/bespoke" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded border border-[#35ADDF] bg-transparent hover:bg-[#35ADDF] transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
                  See All Products
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="p-6 rounded-lg h-full" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{f.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to give your clients a better experience?"
        body="Tell us how you work and what your clients need. We will build a portal that fits."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
```


### `app/products/community-platform/page.tsx`

<sub>89 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom Community Platform Development UK | Masuyo Digital',
  description: 'Launch a private branded community your members will actually use. A fully custom community platform built for your audience.',
  openGraph: {
    title: 'Custom Community Platform Development UK | Masuyo Digital',
    description: 'Launch a private branded community your members will actually use.',
    url: 'https://masuyodigital.com/products/community-platform',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/community-platform' },
}

const features = [
  { title: 'Discussion Feed and Forums', description: 'Threaded discussions, topic channels, and a feed that keeps members engaged.' },
  { title: 'Member Profiles and Directory', description: 'Custom profiles, bios, and a searchable directory to help members connect.' },
  { title: 'Content and Resource Library', description: 'Share videos, guides, templates, and other resources exclusively with members.' },
  { title: 'Events and Live Sessions', description: 'Schedule and manage events, webinars, and live calls within the platform.' },
  { title: 'Membership and Access Control', description: 'Free tiers, paid tiers, or invitation-only. Full control over who gets in and what they see.' },
  { title: 'Admin and Moderation Tools', description: 'Manage members, moderate content, and keep your community healthy from one dashboard.' },
]

export default function CommunityPlatformPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology Product
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                We Build Custom Community Platforms
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Launch a private branded community your members will actually use. Built on your domain, owned by you, with no third-party platform fees.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                  Get a Quote
                </Link>
                <Link href="/products/bespoke" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded border border-[#35ADDF] bg-transparent hover:bg-[#35ADDF] transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
                  See All Products
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="p-6 rounded-lg h-full" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{f.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build a community your members love?"
        body="Tell us about your audience and what you want them to experience. We will build it."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
```


### `app/products/crm-lead-management/page.tsx`

<sub>89 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom CRM and Lead Management UK | Masuyo Digital',
  description: 'A lightweight custom CRM built around how your business actually works. Track leads, manage relationships, and close more deals without the bloat.',
  openGraph: {
    title: 'Custom CRM and Lead Management UK | Masuyo Digital',
    description: 'A lightweight custom CRM built around how your business actually works.',
    url: 'https://masuyodigital.com/products/crm-lead-management',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/crm-lead-management' },
}

const features = [
  { title: 'Lead Pipeline and Stages', description: 'A visual pipeline built around your actual sales process, not a generic template.' },
  { title: 'Contact and Company Records', description: 'Full contact history, notes, files, and communication logs in one place.' },
  { title: 'Task and Follow-Up Reminders', description: 'Never let a lead go cold. Automated reminders and task assignment built in.' },
  { title: 'Reporting and Dashboards', description: 'See your pipeline health, conversion rates, and revenue forecast at a glance.' },
  { title: 'Email and Activity Tracking', description: 'Log calls, emails, and meetings against each contact automatically.' },
  { title: 'Custom Fields and Workflows', description: 'Build the data structure and automation rules your business actually needs.' },
]

export default function CrmLeadManagementPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology Product
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                A CRM Built Around Your Business
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                A lightweight custom CRM built around how your business actually works. Track leads, manage relationships, and close more deals without the bloat.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                  Get a Quote
                </Link>
                <Link href="/products/bespoke" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded border border-[#35ADDF] bg-transparent hover:bg-[#35ADDF] transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
                  See All Products
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="p-6 rounded-lg h-full" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{f.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready for a CRM that actually fits your business?"
        body="Tell us how you manage leads today. We will build the system around your process."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
```


### `app/products/custom-learning-platform/page.tsx`

<sub>392 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom Learning Platform Development UK | Masuyo Digital',
  description: 'We build custom e-learning platforms for UK businesses. Train staff, sell courses, and issue certificates on a branded platform you own outright. No monthly fees.',
  openGraph: {
    title: 'Custom Learning Platform Development UK | Masuyo Digital',
    description: 'A fully custom learning platform built for your business. Train staff or sell courses on a branded portal you own outright.',
    url: 'https://masuyodigital.com/products/custom-learning-platform',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/custom-learning-platform' },
}

const features = [
  {
    title: 'Course Builder',
    description: 'Structure content into modules and lessons with support for video, text, images, and embedded files. No technical knowledge required to create and publish courses.',
  },
  {
    title: 'Progress Tracking',
    description: 'See exactly which students have completed which modules, their quiz scores, and how long they have spent on each section. Exportable reports included.',
  },
  {
    title: 'Completion Certificates',
    description: 'Issue branded certificates automatically when a student finishes a course. Fully customisable with your logo, their name, and the course details.',
  },
  {
    title: 'Enrolment Control',
    description: 'Open access, invite-only, or paid enrolment. Sell courses with one-off payments, subscriptions, or bundle access. You set the rules.',
  },
  {
    title: 'Branded Portal',
    description: 'Your domain, your colour scheme, your logo. The platform feels like a natural extension of your business, not a third-party tool.',
  },
  {
    title: 'Admin Dashboard',
    description: 'Manage all your courses, students, and enrolments from one clean control panel. Add new content, track activity, and update access without touching code.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Discovery',
    body: 'We learn how your business runs, who your learners are, and what they need to achieve. This shapes every decision in the build.',
  },
  {
    number: '02',
    title: 'Build',
    body: 'We design and build the platform around your exact requirements. You review at every stage and we iterate until it is exactly right.',
  },
  {
    number: '03',
    title: 'Launch and Handover',
    body: 'We deploy, test, and hand over the platform with full documentation and a training session for your team. We stay on hand for ongoing support.',
  },
]

const faqs = [
  {
    q: 'Can students access the platform on mobile?',
    a: 'Yes. The platform is fully responsive and works on phones, tablets, and desktops. Students can learn wherever they are.',
  },
  {
    q: 'Do I own the platform once it is built?',
    a: 'Yes, entirely. There are no ongoing platform fees, no vendor lock-in, and no monthly subscriptions to a third party. It is your software, hosted on your infrastructure.',
  },
  {
    q: 'Can I sell courses through the platform?',
    a: 'Yes. We can integrate payment processing so students can purchase access directly. We support one-off payments, subscriptions, and course bundle pricing.',
  },
  {
    q: 'How long does it take to build?',
    a: 'Most platforms take four to eight weeks from kick-off to launch, depending on the complexity of your requirements. We will give you a clear timeline at the start of the project.',
  },
  {
    q: 'Can I add my own courses after launch without developer help?',
    a: 'Yes. The admin dashboard is designed so you can create, publish, and update courses yourself. No technical knowledge needed.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'We offer ongoing support and development retainers. We can also scope individual change requests — whatever works best for your team.',
  },
]

export default function CustomLearningPlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology Product
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                A Learning Platform Built Around Your Business
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Train your staff, onboard new hires, or sell courses to your customers on a fully branded e-learning platform. No monthly fees. No platform compromise. Software you own outright.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded"
                  style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                  Get a Quote
                </Link>
                <Link
                  href="#features"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded border border-[#35ADDF] bg-transparent hover:bg-[#35ADDF] transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  See What Is Possible
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                What is included
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                Everything you need to run a professional learning programme
              </h2>
            </div>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <RevealAnimation key={f.title} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="p-6 rounded-lg h-full" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                  <div className="w-8 h-8 rounded flex items-center justify-center mb-4 flex-shrink-0" style={{ background: 'rgba(53,173,223,0.12)', color: 'var(--blue)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2.5 8l3.5 3.5 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{f.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Browser mockup */}
      <section className="py-24" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
                The platform
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                Clean, simple, and built for how your people actually work
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                The admin and learner interfaces are designed to be intuitive from day one. Your team can manage content, your learners can get on with learning.
              </p>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            {/* Browser chrome */}
            <div className="rounded-xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              {/* Browser top bar */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#0f1a26' }}>
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <div className="flex-1 mx-4">
                  <div className="mx-auto max-w-xs h-6 rounded px-3 flex items-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>learn.yourbusiness.com</span>
                  </div>
                </div>
              </div>

              {/* App layout */}
              <div className="flex" style={{ background: '#ffffff', minHeight: 420 }}>
                {/* Sidebar */}
                <div className="flex-shrink-0 py-6 px-3 flex flex-col gap-1" style={{ background: '#1e2a3a', width: 180 }}>
                  <div className="px-3 mb-4">
                    <div className="h-5 rounded" style={{ background: 'rgba(255,255,255,0.15)', width: 100 }} />
                  </div>
                  {[
                    { label: 'Dashboard', active: true },
                    { label: 'Courses', active: false },
                    { label: 'Students', active: false },
                    { label: 'Certificates', active: false },
                    { label: 'Settings', active: false },
                  ].map(item => (
                    <div key={item.label} className="px-3 py-2 rounded text-xs font-medium" style={{
                      fontFamily: 'Geist, sans-serif',
                      color: item.active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                      background: item.active ? 'rgba(53,173,223,0.2)' : 'transparent',
                    }}>
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-6">
                  <div className="mb-5">
                    <p className="text-base font-semibold mb-1" style={{ color: '#1A2939', fontFamily: 'Geist, sans-serif' }}>Learning Dashboard</p>
                    <p className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Geist, sans-serif' }}>Welcome back, Admin</p>
                  </div>

                  {/* Metric cards */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Courses', value: '12' },
                      { label: 'Completion Rate', value: '87%' },
                      { label: 'Certificates Issued', value: '4' },
                    ].map(metric => (
                      <div key={metric.label} className="p-3 rounded-lg" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <p className="text-lg font-semibold mb-0.5" style={{ color: '#1A2939', fontFamily: 'Geist, sans-serif' }}>{metric.value}</p>
                        <p className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Geist, sans-serif' }}>{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Course grid */}
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#9ca3af', fontFamily: 'Geist, sans-serif' }}>Recent Courses</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: 'Staff Onboarding', progress: 100, color: '#35ADDF' },
                      { title: 'Health and Safety', progress: 68, color: '#10b981' },
                      { title: 'Product Training', progress: 45, color: '#f59e0b' },
                      { title: 'Customer Service', progress: 22, color: '#8b5cf6' },
                    ].map(course => (
                      <div key={course.title} className="p-3 rounded-lg" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <div className="h-1.5 rounded-full mb-2.5" style={{ background: '#e5e7eb' }}>
                          <div className="h-1.5 rounded-full" style={{ background: course.color, width: `${course.progress}%` }} />
                        </div>
                        <p className="text-xs font-medium" style={{ color: '#374151', fontFamily: 'Geist, sans-serif' }}>{course.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#9ca3af', fontFamily: 'Geist, sans-serif' }}>{course.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                How it works
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                From brief to live platform in a matter of weeks
              </h2>
            </div>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <RevealAnimation key={step.number} delay={(i + 1) as 1 | 2 | 3}>
                <div className="flex flex-col gap-4">
                  <p className="text-4xl font-semibold" style={{ color: 'var(--blue)', fontFamily: 'var(--font-poppins)', opacity: 0.4 }}>{step.number}</p>
                  <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>{step.body}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Investment
                </p>
                <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Transparent pricing. No hidden costs.
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Every platform is scoped individually because no two businesses have the same needs. We will give you a fixed quote after a brief discovery call so you know exactly what you are committing to.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Once the platform is built, it is yours. You host it, you own it, and you are not paying a monthly fee to keep it running. Optional support and maintenance retainers are available if you want us to stay involved.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div className="rounded-xl p-8" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Starting from</p>
                <p className="text-5xl font-semibold mb-2" style={{ color: 'var(--navy)', fontFamily: 'var(--font-poppins)' }}>£3,500</p>
                <p className="text-sm mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Final price depends on scope and features required</p>
                <ul className="flex flex-col gap-3 mb-8">
                  {[
                    'Fixed project price, no surprises',
                    'No monthly platform fees',
                    'Full ownership of the codebase',
                    'Branded to your business',
                    'Handover training included',
                    'Optional ongoing support available',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      <span style={{ color: 'var(--blue)', flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block text-center text-sm font-semibold text-white py-3.5 rounded" style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
                  Get a Quote
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                FAQ
              </p>
              <h2 className="text-3xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                Common questions
              </h2>
            </div>
          </RevealAnimation>
          <div className="max-w-3xl flex flex-col" style={{ gap: 0 }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group"
                style={{ borderTop: '1px solid var(--border)', ...(i === faqs.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}) }}
              >
                <summary
                  className="flex items-center justify-between py-5 cursor-pointer list-none"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  <span className="text-sm font-semibold pr-8" style={{ color: 'var(--ink)' }}>{faq.q}</span>
                  <span className="flex-shrink-0" style={{ color: 'var(--mid)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-open:rotate-45">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build a learning platform your business owns?"
        body="Tell us what you need to teach, who your learners are, and we will scope the right platform for you."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
```


### `app/resources/[slug]/page.tsx`

<sub>89 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const RESOURCES = [
  { slug: 'uk-business-launch-checklist', title: 'UK Business Launch Checklist', category: 'Business Setup', type: 'checklist', description: 'Everything you need to do before, during, and after registering your UK business.', content: ['Register with Companies House (Ltd) or HMRC (sole trader)', 'Set up a business bank account', 'Register for VAT if turnover exceeds £90,000', 'Get relevant insurance (public liability, professional indemnity)', 'Set up accounting software (Xero, QuickBooks, or FreeAgent)', 'Create a basic contract template for clients', 'Open a business email address', 'Secure your domain name', 'Set up your Google Business Profile', 'Register for Self Assessment (sole trader) or PAYE (Ltd)', 'Draft terms and conditions for your website', 'Create a simple cash flow forecast'], premium: false },
  { slug: 'choosing-business-structure', title: 'Choosing Your Business Structure Guide', category: 'Business Setup', type: 'guide', description: 'Sole trader, limited company, or partnership? Pros, cons, and tax implications.', content: ['Sole trader: simple setup, personal liability, class 2 NI', 'Limited company: separate legal entity, more admin, often lower tax', 'Partnership: shared ownership, joint liability', 'When to switch from sole trader to Ltd', 'Director salary vs dividends explained', 'IR35 considerations for contractors', 'Key questions to ask your accountant'], premium: false },
  { slug: 'seo-quick-start-checklist', title: 'SEO Quick-Start Checklist for New Websites', category: 'Marketing', type: 'checklist', description: 'The essential on-page SEO tasks to complete when launching a new website.', content: ['Set up Google Search Console', 'Set up Google Analytics 4', 'Write unique title tags for every page (under 60 characters)', 'Write meta descriptions for every page (under 155 characters)', 'Use one H1 per page', 'Add alt text to all images', 'Compress images before upload', 'Create and submit an XML sitemap', 'Set up Google Business Profile for local businesses', 'Ensure site loads in under 3 seconds', 'Check mobile usability in Search Console', 'Build at least 3–5 core pages of quality content'], premium: false },
  { slug: 'social-media-content-calendar', title: 'Social Media Content Calendar Template', category: 'Marketing', type: 'template', description: 'A 90-day content calendar template with content pillars and caption formulas.', content: ['Setting your content pillars (3–5 topics)', 'Recommended posting frequency by platform', 'Content mix: educational, promotional, social proof, behind the scenes', '90-day calendar template', 'Caption formulas for each content type', 'Hashtag strategy for UK businesses', 'How to batch content creation', 'Tools for scheduling: Buffer, Later, Hootsuite'], premium: false },
  { slug: 'cash-flow-forecast-template', title: 'Cash Flow Forecast Template (12-Month)', category: 'Finance', type: 'template', description: 'A 12-month cash flow template for UK small businesses.', content: ['Monthly income by source', 'Fixed costs (rent, software, insurance)', 'Variable costs (materials, contractors, ads)', 'Tax provisions (VAT, corporation tax, income tax)', 'Closing balance forecast', 'How to use the forecast to make decisions', 'Warning signs in your cash flow', 'When to speak to an accountant'], premium: false },
  { slug: 'tech-stack-guide', title: 'Tech Stack Guide for Small Businesses', category: 'Technology', type: 'guide', description: 'The essential software every UK small business needs.', content: ['Accounting: Xero vs QuickBooks vs FreeAgent', 'CRM: HubSpot Free vs Pipedrive vs Notion', 'Email: Google Workspace vs Microsoft 365', 'Project management: Trello vs Asana vs ClickUp', 'Communication: Slack vs Teams', 'Video calls: Zoom vs Google Meet', 'E-signatures: DocuSign vs SignNow', 'Storage: Google Drive vs Dropbox', 'Invoicing: built-in accounting vs Stripe'], premium: false },
  { slug: 'website-brief-template', title: 'Website Brief Template', category: 'Technology', type: 'template', description: 'A structured brief template to define what you want from a new website.', content: ['Business overview (one paragraph)', 'Goals for the website', 'Target audience description', 'Competitor websites you like and why', 'Pages and sections you need', 'Content you already have', 'Content you need help with', 'Design preferences and brand assets', 'Technical requirements', 'Timeline and budget range'], premium: false },
  { slug: 'website-legal-pages-checklist', title: 'Website Legal Pages Checklist', category: 'Legal', type: 'checklist', description: 'The legal pages every UK business website must have.', content: ['Privacy Policy: what data you collect and why', 'Cookie Policy: GDPR requirements for cookies', 'Terms and Conditions: your rules of engagement', 'Accessibility Statement: legal requirement for some sites', 'Returns and Refunds Policy: required for e-commerce', 'Company information: registration number, address', 'When to use a cookie consent banner', 'Recommended free tools: Termly, iubenda'], premium: false },
  { slug: 'business-growth-template', title: 'Business Growth Planning Template', category: 'Growth', type: 'template', description: 'A one-page planning template for your next 90-day growth sprint.', content: ['Where you are now (revenue, clients, team)', 'Where you want to be in 90 days', 'Key growth levers for your business', 'What is working and should be doubled down on', 'What is not working and should be stopped', 'Three focus actions for the next 30 days', 'Metrics to track weekly', 'Monthly review prompts'], premium: false },
]

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return RESOURCES.filter(r => !r.premium).map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = RESOURCES.find(r => r.slug === params.slug)
  if (!resource) return {}
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: `https://masuyodigital.com/resources/${params.slug}` },
  }
}

export default function ResourcePage({ params }: Props) {
  const resource = RESOURCES.find(r => r.slug === params.slug)
  if (!resource) notFound()

  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/resources" className="text-sm flex items-center gap-1 transition-colors hover:opacity-70"
            style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M6.5 4L3 7l3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Resources
          </Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{resource.category}</span>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded mb-4 inline-block"
          style={{ background: 'var(--light)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </span>

        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>{resource.title}</h1>
        <p className="text-base mb-10" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>{resource.description}</p>

        <div className="rounded-lg p-6 mb-10" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
          <h2 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            {resource.type === 'checklist' ? 'Checklist items' : resource.type === 'template' ? 'What is included' : 'What we cover'}
          </h2>
          <ul className="flex flex-col gap-3">
            {resource.content.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-lg" style={{ background: 'var(--navy)' }}>
          <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
            Need help putting this into practice?
          </h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
            We work with businesses across the UK to implement exactly what is covered in these resources.
          </p>
          <Link href="/contact" className="inline-block text-sm font-semibold text-white px-5 py-2.5 rounded"
            style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  )
}
```


### `app/resources/components/ResourceModal.tsx`

<sub>344 lines</sub>

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'

interface ResourceModalProps {
  resourceTitle: string
  resourceSlug: string
  isPremium: boolean
  resourceContent: string[]
}

const HTML2PDF_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'

function getResourceContent(slug: string): string {
  if (slug === 'uk-business-launch-checklist') return `
<h2>Before You Register</h2>
<ul>
<li>Define your business idea and target market</li>
<li>Choose your business name and check it is available on Companies House</li>
<li>Check your chosen name is not trademarked at the IPO</li>
<li>Check the domain name is available and register it</li>
<li>Decide on your business structure (sole trader, limited company, partnership)</li>
<li>Open a separate business bank account</li>
<li>Set up a business email address</li>
<li>Define your core services or products and initial pricing</li>
<li>Research your competitors and identify your differentiators</li>
<li>Create a simple one-page business plan</li>
</ul>
<h2>Registering Your Business</h2>
<ul>
<li>Register as a sole trader with HMRC (if applicable)</li>
<li>Register your limited company with Companies House (if applicable)</li>
<li>Register for Self Assessment with HMRC</li>
<li>Register for VAT if your turnover will exceed &#163;90,000</li>
<li>Set up PAYE if you plan to employ staff</li>
<li>Register for Corporation Tax within 3 months of starting to trade</li>
<li>Get any licences or permits required for your industry</li>
<li>Take out appropriate insurance (public liability, professional indemnity, employers liability)</li>
</ul>
<h2>Setting Up Your Operations</h2>
<ul>
<li>Set up accounting software (Xero, QuickBooks, or FreeAgent recommended)</li>
<li>Create invoice and quote templates</li>
<li>Set up a system for tracking expenses</li>
<li>Create standard terms and conditions for clients</li>
<li>Register with the ICO if you process personal data (&#163;40/year)</li>
<li>Set up a simple project management system</li>
</ul>
<h2>Your Online Presence</h2>
<ul>
<li>Build or commission your website</li>
<li>Set up Google Business Profile</li>
<li>Set up and optimise your LinkedIn page</li>
<li>Install Google Analytics and Google Search Console</li>
<li>Get listed in relevant UK business directories</li>
<li>Set up a professional email signature</li>
</ul>
<h2>Your First 30 Days</h2>
<ul>
<li>Tell your network you are open for business</li>
<li>Reach out to potential clients or referral partners</li>
<li>Set monthly financial targets and review dates</li>
<li>Join a relevant industry association or local business group</li>
<li>Set up a simple CRM to track leads and clients</li>
</ul>
<p><em>This checklist is a general guide and does not constitute legal or financial advice.</em></p>
`
  return ''
}

function buildResourceHtml(title: string, contentHtml: string): string {
  const body = contentHtml
    ? `<style>.pdf-rc h2{color:#1A2939;font-family:Georgia,serif;font-size:17px;font-weight:600;margin:22px 0 9px}.pdf-rc ul{padding-left:20px;margin:6px 0 14px;list-style-type:disc}.pdf-rc li{color:#374151;font-size:14px;line-height:1.6;margin-bottom:5px}.pdf-rc p{color:#374151;font-size:14px;line-height:1.7;margin-bottom:12px}.pdf-rc strong{color:#111318;font-weight:600}.pdf-rc em{font-style:italic;color:#6b7280}</style><div class="pdf-rc">${contentHtml}</div>`
    : '<p style="color:#374151;font-size:15px;line-height:1.7;">Full content coming soon.</p>'
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1A2939; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #ffffff; font-family: Georgia, serif; font-size: 20px; font-weight: 600;">Masuyo Digital</span>
        <span style="color: rgba(255,255,255,0.85); font-size: 14px; font-style: italic;">${title}</span>
      </div>
      <div style="background: #ffffff; padding: 48px 40px;">
        <h1 style="color: #1A2939; font-family: Georgia, serif; font-size: 26px; margin: 0 0 12px 0; font-weight: 600;">${title}</h1>
        <div style="height: 2px; background: #35ADDF; border-radius: 2px; margin-bottom: 32px;"></div>
        ${body}
      </div>
      <div style="background: #1A2939; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: rgba(255,255,255,0.75); font-size: 12px;">masuyodigital.com</span>
        <span style="color: rgba(255,255,255,0.75); font-size: 12px;">&#169; 2025 Masuyo Digital</span>
        <span style="color: rgba(255,255,255,0.75); font-size: 12px;">hello@masuyodigital.com</span>
      </div>
    </div>
  `
}

function loadHtml2Pdf(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).html2pdf) { resolve(); return }
    const existing = document.querySelector(`script[src="${HTML2PDF_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const script = document.createElement('script')
    script.src = HTML2PDF_SRC
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function ResourceModal({ resourceTitle, resourceSlug, isPremium, resourceContent: _resourceContent }: ResourceModalProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<'view' | 'download' | null>(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const pdfContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('[ResourceModal] slug:', resourceSlug, '| isPremium:', isPremium, '| masuyo_unlocked in localStorage:', localStorage.getItem('masuyo_unlocked'))
    if (localStorage.getItem('masuyo_unlocked')) setUnlocked(true)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
        setGateOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleAction(action: 'view' | 'download') {
    if (isPremium && !unlocked) {
      setPendingAction(action)
      setGateOpen(true)
    } else {
      executeAction(action)
    }
  }

  function executeAction(action: 'view' | 'download') {
    if (action === 'view') {
      setLightboxOpen(true)
    } else {
      triggerDownload()
    }
  }

  async function triggerDownload() {
    const container = pdfContainerRef.current
    if (!container) return
    try {
      await loadHtml2Pdf()
      container.innerHTML = buildResourceHtml(resourceTitle, getResourceContent(resourceSlug))
      await new Promise(resolve => setTimeout(resolve, 300))
      await (window as any).html2pdf()
        .set({
          margin: 0,
          filename: `masuyo-${resourceSlug}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(container)
        .save()
      container.innerHTML = ''
    } catch (err) {
      console.error('PDF generation failed:', err)
      container.innerHTML = ''
    }
  }

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('https://formspree.io/f/xlgpogqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'resource_unlock' }),
      })
      if (res.ok) {
        localStorage.setItem('masuyo_unlocked', 'true')
        setUnlocked(true)
        setGateOpen(false)
        setEmail('')
        const action = pendingAction
        setPendingAction(null)
        if (action) executeAction(action)
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handleAction('view')}
          className="flex-1 text-sm font-semibold py-2.5 rounded transition-colors"
          style={{ border: '1px solid var(--navy)', color: 'var(--navy)', background: 'transparent', fontFamily: 'Geist, sans-serif' }}>
          View
        </button>
        <button
          onClick={() => handleAction('download')}
          className="flex-1 text-sm font-semibold py-2.5 rounded transition-colors text-white"
          style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
          Download
        </button>
      </div>

      {/* Email gate modal */}
      {gateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setGateOpen(false)}>
          <div
            className="w-full rounded-xl overflow-hidden"
            style={{ maxWidth: 480, background: '#ffffff' }}
            onClick={e => e.stopPropagation()}>
            <div className="px-7 py-6" style={{ background: 'var(--navy)' }}>
              <p className="font-semibold text-white mb-1" style={{ fontFamily: 'var(--font-poppins)', fontSize: 17 }}>
                Masuyo Digital
              </p>
              <h2 className="text-xl font-semibold text-white leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
                Unlock all premium resources
              </h2>
            </div>
            <div className="px-7 py-6">
              <p className="text-sm mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: 1.7 }}>
                Enter your email to unlock all premium resources instantly. You will never be asked again on this device.
              </p>
              <form onSubmit={handleGateSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError('') }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-sm rounded-lg outline-none"
                  style={{ border: `1px solid ${emailError ? '#dc2626' : 'var(--border)'}`, fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }} />
                {emailError && (
                  <p className="text-xs" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>{emailError}</p>
                )}
                {submitError && (
                  <p className="text-xs" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-sm font-semibold text-white py-3 rounded-lg"
                  style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                  {submitting ? 'Unlocking...' : 'Unlock free access'}
                </button>
                <button
                  type="button"
                  onClick={() => setGateOpen(false)}
                  className="w-full text-sm py-2 rounded-lg"
                  style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hidden PDF render target — always in DOM so html2canvas can measure it */}
      <div
        ref={pdfContainerRef}
        aria-hidden="true"
        style={{ position: 'fixed', left: '-9999px', top: 0, width: '800px', pointerEvents: 'none', zIndex: -1 }}
      />

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setLightboxOpen(false)}>
          <div className="flex min-h-full items-center justify-center p-6 py-10">
            <div
              className="w-full rounded-xl overflow-hidden"
              style={{ maxWidth: 800, background: '#ffffff' }}
              onClick={e => e.stopPropagation()}>
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <h2 className="text-base font-semibold text-ink pr-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {resourceTitle}
                </h2>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="flex-shrink-0 p-1 rounded transition-colors hover:opacity-60"
                  aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5l10 10M15 5L5 15" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {/* Content */}
              <div className="p-8">
                <style>{`
                  .lb-rc h2{color:#1A2939;font-family:var(--font-poppins),Poppins,sans-serif;font-size:1.05rem;font-weight:600;margin:1.5rem 0 0.5rem}
                  .lb-rc ul{padding-left:1.25rem;margin:0.4rem 0 1rem;list-style-type:disc}
                  .lb-rc li{color:#6b7280;font-family:Geist,sans-serif;font-size:0.875rem;line-height:1.65;margin-bottom:0.3rem}
                  .lb-rc p{color:#6b7280;font-family:Geist,sans-serif;font-size:0.875rem;line-height:1.7;margin-bottom:0.75rem}
                  .lb-rc strong{color:#111318;font-weight:600}
                  .lb-rc em{font-style:italic}
                `}</style>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--navy)', fontFamily: 'var(--font-poppins)' }}>
                  {resourceTitle}
                </h3>
                <div className="mb-6" style={{ height: 2, background: '#35ADDF', borderRadius: 2 }} />
                {getResourceContent(resourceSlug) ? (
                  <div className="lb-rc" dangerouslySetInnerHTML={{ __html: getResourceContent(resourceSlug) }} />
                ) : (
                  <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: 1.7 }}>
                    Full content coming soon.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
```


### `app/services/automation/page.tsx`

<sub>112 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Automation',
  description: 'Stop doing manually what a machine can do for you. We find and automate the tasks eating your time.',
  openGraph: {
    title: 'Automation – Masuyo Digital',
    description: 'Stop doing manually what a machine can do for you.',
    url: 'https://masuyodigital.com/services/automation',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/automation' },
}

const whatWeAutomate = [
  {
    title: 'Lead and enquiry handling',
    description: 'New enquiries automatically logged, assigned and followed up.',
  },
  {
    title: 'Client onboarding',
    description: 'Documents, welcome emails and setup tasks triggered automatically.',
  },
  {
    title: 'Invoicing and payments',
    description: 'Automated invoices, payment reminders and reconciliation.',
  },
  {
    title: 'Reporting',
    description: 'Regular reports generated and delivered without anyone lifting a finger.',
  },
  {
    title: 'Data and system sync',
    description: 'Information flowing automatically between your tools without manual input.',
  },
]

export default function AutomationPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Automation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Stop doing manually what a machine can do for you.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Every business has tasks that eat time without adding value. Chasing invoices, moving data between systems, sending follow-up emails, updating spreadsheets. We find those tasks and automate them, so your team can focus on the work that actually matters.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Get in touch
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* What we automate */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What we automate
            </h2>
          </RevealAnimation>
          <div className="flex flex-col divide-y divide-[#e5e3df]" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {whatWeAutomate.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <h3 className="text-base font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed md:col-span-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{item.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                How we work
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We start by mapping out how your business currently works. Then we identify where automation saves the most time and build it. Most clients are surprised by how quickly the time savings add up.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Let us find the time you are losing." body="A short conversation is usually enough to identify the big wins." buttonLabel="Get in touch" buttonHref="/contact" />
    </>
  )
}
```


### `app/services/digital-marketing/page.tsx`

<sub>112 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Digital Marketing',
  description: 'Marketing that actually brings in business. SEO, paid ads, content and social that target the right audience at the right time.',
  openGraph: {
    title: 'Digital Marketing – Masuyo Digital',
    description: 'Marketing that actually brings in business.',
    url: 'https://masuyodigital.com/services/digital-marketing',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/digital-marketing' },
}

const services = [
  {
    title: 'Search engine optimisation',
    description: 'We improve your visibility on Google so more of the right people find you organically over time.',
  },
  {
    title: 'Paid advertising',
    description: 'Google Ads, Meta Ads and more. We manage campaigns that drive real results, not just clicks.',
  },
  {
    title: 'Content marketing',
    description: 'Blog posts, landing pages and content that builds authority and drives search traffic.',
  },
  {
    title: 'Social media',
    description: 'Strategy, content and management for the platforms that matter to your audience.',
  },
  {
    title: 'Email marketing',
    description: 'Campaigns and automations that keep your audience engaged and drive repeat business.',
  },
]

export default function DigitalMarketingPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Digital Marketing
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Marketing that actually brings in business.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Getting traffic to your website is one thing. Getting the right traffic, people who are ready to buy, is another. We build digital marketing strategies that target the right audience, at the right time, through the right channels. Then we track everything so you always know what is working.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a conversation
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What we do
            </h2>
          </RevealAnimation>
          <div className="flex flex-col divide-y divide-[#e5e3df]" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {services.map((s, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <h3 className="text-base font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed md:col-span-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{s.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                How it works
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We start by understanding your business and your goals. Then we build a strategy, implement it, track performance, and refine over time. No set-and-forget. We stay involved.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Want to know what is possible for your business?" body="We will give you an honest picture of where you are and where you could be." buttonLabel="Start a conversation" buttonHref="/contact" />
    </>
  )
}
```


### `app/services/hosting/page.tsx`

<sub>106 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Hosting & Infrastructure',
  description: 'Fast, reliable hosting. Managed by us. We host your website on our own server infrastructure.',
  openGraph: {
    title: 'Hosting & Infrastructure – Masuyo Digital',
    description: 'Fast, reliable hosting. Managed by us.',
    url: 'https://masuyodigital.com/services/hosting',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/hosting' },
}

const included = [
  'Your own space on our managed server infrastructure.',
  'Fast load times, built on high performance hardware.',
  'SSL certificate included and maintained.',
  'Regular backups so nothing is ever lost.',
  'Uptime monitoring and proactive management.',
  'A team who knows your site and can act quickly if anything needs attention.',
]

export default function HostingPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Hosting & Infrastructure
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Fast, reliable hosting. Managed by us.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Most hosting companies are hands-off. Something breaks, you raise a ticket and wait. We do it differently. We host your website on our own server infrastructure, which means we are responsible for it and we stay on top of it.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Get in touch
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {included.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div className="flex gap-4 p-5 h-full" style={{ border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--blue)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{item}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                Why it matters
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                A slow website loses visitors. A website that goes down loses business. Good hosting is not glamorous but it is essential, and it is something we take seriously.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div className="p-6 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <p className="text-sm font-semibold text-ink mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>Note</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                  Hosting is included with every website we build. We also offer hosting for existing sites built elsewhere. Get in touch to discuss.
                </p>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Want us to host your site?" body="Get in touch and we will talk through what is involved." buttonLabel="Get in touch" buttonHref="/contact" />
    </>
  )
}
```


### `app/services/lead-generation/page.tsx`

<sub>101 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Lead Generation',
  description: 'More enquiries. Better leads. Less chasing. We build lead generation systems that work in the background.',
  openGraph: {
    title: 'Lead Generation – Masuyo Digital',
    description: 'More enquiries. Better leads. Less chasing.',
    url: 'https://masuyodigital.com/services/lead-generation',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/lead-generation' },
}

const whatWeBuild = [
  'Landing pages designed specifically to convert visitors into enquiries.',
  'Paid ad campaigns on Google and social media targeting people actively looking for what you offer.',
  'SEO strategies that bring in organic traffic over time.',
  'Lead capture systems and forms that connect directly to your CRM or inbox.',
  'Automated follow-up sequences so no lead goes cold.',
]

export default function LeadGenerationPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Lead Generation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                More enquiries. Better leads. Less chasing.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Most businesses are not short of potential customers. They are short of a reliable way to reach them. We build lead generation systems that work in the background, bringing enquiries directly to you while you focus on running your business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Get in touch
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What we build
            </h2>
          </RevealAnimation>
          <div className="flex flex-col gap-4">
            {whatWeBuild.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="flex gap-4 p-6" style={{ border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <span className="text-lg font-semibold flex-shrink-0 w-8" style={{ color: 'var(--blue)', fontFamily: 'var(--font-poppins)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', paddingTop: '2px' }}>
                    {item}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                Who this is for
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                Whether you are a service business, a trade, a professional practice or a growing company, if you want a more consistent flow of qualified enquiries, this is where we start.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Let us look at your lead generation together." body="We will show you where the gaps are and how we fix them." buttonLabel="Get in touch" buttonHref="/contact" />
    </>
  )
}
```


### `app/services/technology-solutions/page.tsx`

<sub>100 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Technology Solutions',
  description: 'The right technology changes everything. CRM systems, custom platforms, integrations and technology audits.',
  openGraph: {
    title: 'Technology Solutions – Masuyo Digital',
    description: 'The right technology changes everything.',
    url: 'https://masuyodigital.com/services/technology-solutions',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/technology-solutions' },
}

const whatWeDo = [
  {
    title: 'CRM systems',
    description: 'We set up and configure customer relationship management systems so your team can track leads, manage clients and stay organised.',
  },
  {
    title: 'CMS platforms',
    description: 'Content management systems that give your team full control over your website and content without needing a developer.',
  },
  {
    title: 'Custom platforms and web applications',
    description: 'When off-the-shelf does not cut it, we build it.',
  },
  {
    title: 'Third-party integrations',
    description: 'We connect the tools you already use so they work together properly.',
  },
  {
    title: 'Technology audits',
    description: 'We look at what you are currently using, identify gaps and inefficiencies, and recommend the right path forward.',
  },
]

export default function TechnologySolutionsPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology Solutions
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                The right technology changes everything.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Most businesses are using a fraction of what technology could do for them. Some are using the wrong tools entirely. We help businesses find, build and implement technology that makes a real difference: whether that is a CRM, a custom platform, a client portal or something more specific to how you work.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Book a conversation
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What we do
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {whatWeDo.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div className="p-6 hover:bg-light transition-colors h-full flex flex-col gap-3" style={{ border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0"
                    style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'var(--font-poppins)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{item.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="Not sure what technology you need? Start there." body="We will help you figure out what is right for your business." buttonLabel="Book a conversation" buttonHref="/contact" />
    </>
  )
}
```


### `app/services/web-design/page.tsx`

<sub>124 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Web Design & Development',
  description: 'Websites that work as hard as you do. Fast, modern, mobile-friendly websites built to convert visitors into customers.',
  openGraph: {
    title: 'Web Design & Development – Masuyo Digital',
    description: 'Websites that work as hard as you do. Fast, modern, mobile-friendly websites built to convert visitors into customers.',
    url: 'https://masuyodigital.com/services/web-design',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/web-design' },
}

const features = [
  { title: 'Fast loading', description: 'Built lean and hosted on our own servers for strong performance.' },
  { title: 'Mobile first', description: 'Designed to work perfectly on every device.' },
  { title: 'SEO ready', description: 'Built with search engines in mind from day one.' },
  { title: 'Easy to manage', description: 'CMS options available so your team can update content.' },
  { title: 'Secure', description: 'SSL included, maintained and monitored.' },
  { title: 'Built around you', description: 'Designed around your business goals, not a template.' },
]

const whatWeBuild = [
  'Marketing and brochure websites',
  'E-commerce stores',
  'Landing pages and lead generation pages',
  'Web applications and client portals',
  'CMS-powered websites with full content control',
]

export default function WebDesignPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Web Design & Development
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Websites that work as hard as you do.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Your website is often the first thing a potential customer sees. It needs to represent your business well, load fast, work on every device, and give visitors a reason to get in touch. We build websites that do all of that, without the bloat and without the faff.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Get in touch
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What every site includes
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 -m-px items-stretch">
            {features.map((f, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="p-6 hover:bg-light transition-colors h-full flex flex-col gap-3" style={{ border: '1px solid var(--border)' }}>
                  <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {i === 0 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    {i === 1 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 15h6M8 12v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    {i === 2 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {i === 3 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    {i === 4 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {i === 5 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 14c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  </div>
                  <h3 className="text-base font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{f.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                What we build
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                From simple brochure sites to complex web applications, we cover the full spectrum.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <ul className="flex flex-col gap-3">
                {whatWeBuild.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm pb-3" style={{ borderBottom: i < whatWeBuild.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                    <span style={{ color: 'var(--blue)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Ready to talk about your website?" body="Tell us what you need. We will handle the rest." buttonLabel="Get in touch" buttonHref="/contact" />
    </>
  )
}
```


### `app/technology/ai-chatbots/page.tsx`

<sub>134 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'AI Chatbot Development UK | Masuyo Digital',
  description: 'Custom AI chatbots and intelligent assistants for UK businesses. Built on your content, trained for your customers, and deployed on your platforms.',
  openGraph: {
    title: 'AI Chatbot Development UK | Masuyo Digital',
    description: 'Custom AI chatbots and intelligent assistants for UK businesses. Built on your content, trained for your customers, and deployed on your platforms.',
    url: 'https://masuyodigital.com/technology/ai-chatbots',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/ai-chatbots' },
}

const solutionPoints = [
  'Customer support chatbots trained on your knowledge base',
  'Lead qualification and booking assistants',
  'Internal knowledge base assistants for your team',
  'Product recommendation engines',
  'FAQ and support deflection tools',
  'Multi-channel deployment (website, WhatsApp, Slack)',
]

const features = [
  'AI model selection and configuration',
  'Knowledge base setup and training',
  'Conversation flow design',
  'Integration with your existing tools',
  'Testing and refinement',
  'Analytics dashboard',
  'Ongoing optimisation',
]

export default function AiChatbotsPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                AI Chatbots and Assistants
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                AI That Works for Your Business, Not Against It
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build intelligent assistants trained on your content, your products, and your processes. Available 24/7, consistent every time, and genuinely useful to your customers.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Generic AI tools give generic answers. Your customers ask specific questions about your products, your pricing, and your process. They need answers that are accurate, on-brand, and actually helpful.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we build
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to put AI to work?"
        body="Tell us about your business and your customers. We will build an assistant that actually helps them."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/api/page.tsx`

<sub>135 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'API Development and Integration UK | Masuyo Digital',
  description: 'Custom API development and third-party API integration for UK businesses. Connect your platforms and extend what your systems can do.',
  openGraph: {
    title: 'API Development and Integration UK | Masuyo Digital',
    description: 'Custom API development and third-party API integration for UK businesses. Connect your platforms and extend what your systems can do.',
    url: 'https://masuyodigital.com/technology/api',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/api' },
}

const solutionPoints = [
  'Custom REST and GraphQL API development',
  'Third-party API integration (payment gateways, CRMs, ERPs, marketing tools)',
  'Webhook setup and management',
  'API documentation and versioning',
  'Authentication and security implementation',
  'Rate limiting and performance optimisation',
]

const features = [
  'Custom API design and build',
  'Third-party integrations',
  'Webhook configuration',
  'API documentation',
  'Authentication setup',
  'Error handling',
  'Monitoring',
  'Ongoing support',
]

export default function ApiPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                API Development and Integration
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Connect Everything. Automate Anything.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build custom APIs and integrate third-party services so your platforms talk to each other seamlessly. No more manual data transfers, no more disconnected systems.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Modern businesses use dozens of different tools. When those tools cannot communicate, you end up with data silos, manual workarounds, and a team spending hours on tasks that should take seconds.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we build and connect
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What you get
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Need your systems to work together?"
        body="Tell us what tools you are using and where the gaps are. We will connect them properly."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/app-development/page.tsx`

<sub>137 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'App Development Services UK | Masuyo Digital',
  description: 'Native and cross-platform mobile app development for iOS and Android. Built around your users and your business logic.',
  openGraph: {
    title: 'App Development Services UK | Masuyo Digital',
    description: 'Native and cross-platform mobile app development for iOS and Android. Built around your users and your business logic.',
    url: 'https://masuyodigital.com/technology/app-development',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/app-development' },
}

const solutionPoints = [
  'We start with a clear scope and stick to it',
  'Cross-platform development using React Native for iOS and Android from one codebase',
  'User experience design before a single line of code is written',
  'Iterative delivery so you see progress throughout',
  'App store submission and post-launch support included',
]

const features = [
  'iOS and Android apps',
  'React Native development',
  'UI/UX design',
  'API integration',
  'Push notifications',
  'In-app payments',
  'Analytics',
  'App store submission',
]

export default function AppDevelopmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                App Development
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Mobile Apps Built Around Your Users
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                From concept to app store, we build mobile applications that your customers will actually use. Native performance, intuitive design, and solid engineering.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Problem and Solution */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most app projects fail not because of bad ideas but because of poor planning, bloated scopes, and agencies that prioritise billing over delivery. You end up with a half-built product and a large invoice.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  How we approach app development
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What we build
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Got an app idea?"
        body="Tell us what you want to build. We will scope it properly and tell you exactly how we will deliver it."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/architecture/page.tsx`

<sub>136 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Systems Architecture and Technical Strategy UK | Masuyo Digital',
  description: 'Technical architecture consultancy for UK businesses building complex digital products. We help you make the right decisions before you write a line of code.',
  openGraph: {
    title: 'Systems Architecture and Technical Strategy UK | Masuyo Digital',
    description: 'Technical architecture consultancy for UK businesses building complex digital products. We help you make the right decisions before you write a line of code.',
    url: 'https://masuyodigital.com/technology/architecture',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/architecture' },
}

const solutionPoints = [
  'Technical discovery and requirements mapping',
  'System architecture design and documentation',
  'Technology stack selection and justification',
  'Integration architecture (how your systems talk to each other)',
  'Scalability and performance planning',
  'Build vs buy analysis',
  'Technical roadmap creation',
]

const features = [
  'Architecture documentation',
  'Technology recommendations',
  'Integration mapping',
  'Scalability plan',
  'Technical roadmap',
  'Risk assessment',
  'Vendor evaluation',
  'Team briefing',
]

export default function ArchitecturePage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Systems Architecture
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Build on the Right Foundations
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                The most expensive technology mistakes happen before development starts. We help you make the right architectural decisions upfront so you are not rebuilding in 18 months.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most businesses jump straight into building without a clear technical strategy. They end up with systems that cannot scale, cannot integrate with new tools, and cost a fortune to maintain or change.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we cover
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What you get
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Planning something complex?"
        body="Tell us what you are trying to build. We will help you work out the right way to build it."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/automation/page.tsx`

<sub>136 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Workflow Automation Services UK | Masuyo Digital',
  description: 'Business workflow automation for UK companies. Remove manual tasks, connect your tools, and let your systems do the work.',
  openGraph: {
    title: 'Workflow Automation Services UK | Masuyo Digital',
    description: 'Business workflow automation for UK companies. Remove manual tasks, connect your tools, and let your systems do the work.',
    url: 'https://masuyodigital.com/technology/automation',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/automation' },
}

const solutionPoints = [
  'Lead capture and CRM data entry',
  'Proposal and contract generation',
  'Invoice and payment workflows',
  'Client onboarding sequences',
  'Internal approval and sign-off processes',
  'Reporting and data aggregation',
  'Cross-platform data synchronisation',
]

const features = [
  'Process mapping and audit',
  'Automation design',
  'Zapier and Make implementation',
  'Custom webhook development',
  'Testing and QA',
  'Documentation',
  'Team training',
  'Ongoing optimisation',
]

export default function AutomationPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Workflow Automation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Stop Doing Manually What a System Can Do Automatically
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We identify the repetitive tasks eating your team's time and build the automations that eliminate them. Less admin, fewer errors, more time for the work that actually matters.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most businesses are running on a patchwork of disconnected tools and manual processes. Data entered in one place has to be copied somewhere else. Tasks fall through the cracks. Time is wasted on work that adds no value.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we automate
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              How we do it
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to automate the repetitive stuff?"
        body="Tell us where your team is losing time. We will map the processes and build the automations."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/community-platforms/page.tsx`

<sub>136 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Community and Learning Platform Development UK | Masuyo Digital',
  description: 'Custom community hubs, member portals, and online learning platforms for UK businesses. Built to engage, retain, and grow your audience.',
  openGraph: {
    title: 'Community and Learning Platform Development UK | Masuyo Digital',
    description: 'Custom community hubs, member portals, and online learning platforms for UK businesses. Built to engage, retain, and grow your audience.',
    url: 'https://masuyodigital.com/technology/community-platforms',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/community-platforms' },
}

const solutionPoints = [
  'Private community hubs with discussion, content, and events',
  'Online course and learning management systems',
  'Member portals with gated content and progress tracking',
  'Subscription and membership management',
  'Live and recorded content delivery',
  'Community moderation and management tools',
]

const features = [
  'Custom platform design',
  'Membership and subscription management',
  'Content management system',
  'Progress tracking',
  'Discussion forums',
  'Event management',
  'Payment integration',
  'Email notifications',
  'Analytics',
]

export default function CommunityPlatformsPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Community and Learning Platforms
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Build a Community Your Members Actually Want to Be Part Of
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build custom community platforms, member portals, and online learning environments that keep your audience engaged, coming back, and growing.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Generic community tools like Facebook Groups or off-the-shelf course platforms are either too limited or too generic. You have no control over the experience, the data, or the brand. And you are building your community on someone else's platform.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we build
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build your community?"
        body="Tell us about your audience and what you want to build together. We will make it happen."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/crm/page.tsx`

<sub>135 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom CRM and Business Systems UK | Masuyo Digital',
  description: 'Bespoke CRM and internal business system development for UK companies. Built around your workflows, not the other way around.',
  openGraph: {
    title: 'Custom CRM and Business Systems UK | Masuyo Digital',
    description: 'Bespoke CRM and internal business system development for UK companies. Built around your workflows, not the other way around.',
    url: 'https://masuyodigital.com/technology/crm',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/crm' },
}

const solutionPoints = [
  'Custom CRM platforms built around your sales process',
  'Client and project management systems',
  'Internal operations and workflow tools',
  'Custom dashboards and reporting',
  'Role-based access and permissions',
  'Integration with your existing tools',
]

const features = [
  'Requirements discovery',
  'Custom database design',
  'Workflow implementation',
  'User interface design',
  'Role-based access control',
  'Reporting and dashboards',
  'Third-party integrations',
  'Training and documentation',
]

export default function CrmPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                CRM and Business Systems
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                A CRM Built Around How You Actually Work
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Off-the-shelf CRM tools make you fit around their system. We build platforms around yours. Custom workflows, custom data structures, and exactly the features your business needs.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most businesses are either over-paying for CRM features they never use, or under-served by systems that cannot handle their specific workflows. The result is workarounds, duplicate data entry, and a team that ignores the system entirely.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we build
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What you get
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Need a system built around your business?"
        body="Tell us how you work and what is not working. We will build the system that fits."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/database/page.tsx`

<sub>135 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Database Design and Management UK | Masuyo Digital',
  description: 'Structured, scalable, and secure database design and management for UK businesses. From initial architecture to ongoing optimisation.',
  openGraph: {
    title: 'Database Design and Management UK | Masuyo Digital',
    description: 'Structured, scalable, and secure database design and management for UK businesses. From initial architecture to ongoing optimisation.',
    url: 'https://masuyodigital.com/technology/database',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/database' },
}

const solutionPoints = [
  'Database design and schema architecture',
  'PostgreSQL, MySQL, and MongoDB implementation',
  'Query optimisation and performance tuning',
  'Data migration from legacy systems',
  'Backup and recovery setup',
  'Ongoing monitoring and maintenance',
]

const features = [
  'Architecture design',
  'Schema documentation',
  'Query optimisation',
  'Indexing strategy',
  'Backup configuration',
  'Performance monitoring',
  'Data migration',
  'Security hardening',
]

export default function DatabasePage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Database Design and Management
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Data Architecture That Scales With You
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                A well-designed database is the foundation of every reliable digital product. We design, build, and manage data structures that are fast, secure, and built to handle growth.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Poor database design is one of the most expensive technical problems to fix later. Slow queries, data integrity issues, and scaling bottlenecks all trace back to architecture decisions made early in a project.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we do
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What you get
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Need a database built properly?"
        body="Tell us about your data requirements and we will design the right structure from the start."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/devops/page.tsx`

<sub>135 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'DevOps Services UK | CI/CD and Deployment Automation | Masuyo Digital',
  description: 'DevOps consultancy and implementation for UK businesses. CI/CD pipelines, deployment automation, and release management that keeps your development moving fast and safely.',
  openGraph: {
    title: 'DevOps Services UK | CI/CD and Deployment Automation | Masuyo Digital',
    description: 'DevOps consultancy and implementation for UK businesses. CI/CD pipelines, deployment automation, and release management that keeps your development moving fast and safely.',
    url: 'https://masuyodigital.com/technology/devops',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/devops' },
}

const solutionPoints = [
  'CI/CD pipeline setup (GitHub Actions, GitLab CI, or similar)',
  'Automated testing integration',
  'Containerisation with Docker',
  'Environment management (development, staging, production)',
  'Monitoring and alerting setup',
  'Rollback and recovery procedures',
]

const features = [
  'CI/CD pipeline',
  'Automated builds and tests',
  'Docker containerisation',
  'Environment configuration',
  'Deployment monitoring',
  'Incident alerting',
  'Documentation',
  'Team training',
]

export default function DevOpsPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                DevOps
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Ship Faster. Break Less. Sleep Better.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We design and implement DevOps pipelines that automate your deployment process, reduce human error, and give your team the confidence to release continuously.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Manual deployments are slow, error-prone, and stressful. Every release is a risk. Without a proper CI/CD pipeline, your development team spends more time managing deployments than building features.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we implement
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What you get
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to modernise your deployment process?"
        body="Tell us about your current setup and where the friction is. We will fix it."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/ecommerce/page.tsx`

<sub>138 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'E-commerce Development UK | Masuyo Digital',
  description: 'Custom e-commerce websites built to sell. Fast, conversion-optimised, and built around your products and customers.',
  openGraph: {
    title: 'E-commerce Development UK | Masuyo Digital',
    description: 'Custom e-commerce websites built to sell. Fast, conversion-optimised, and built around your products and customers.',
    url: 'https://masuyodigital.com/technology/ecommerce',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/ecommerce' },
}

const solutionPoints = [
  'Custom design that reflects your brand, not a generic template',
  'Built for speed, because every second of load time costs you sales',
  'Conversion-focused product pages and checkout flows',
  'SEO built in so customers can find you organically',
  'Integrated with your inventory, payments, and fulfilment systems',
]

const features = [
  'Custom storefront design',
  'Product and category pages',
  'Secure checkout',
  'Payment gateway integration',
  'Inventory management',
  'Order management',
  'Discount and promo codes',
  'SEO setup',
  'Mobile-first build',
]

export default function EcommercePage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                E-commerce Development
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                E-commerce That Is Built to Sell
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build online stores that load fast, look great, and convert browsers into buyers. Custom built around your products, your brand, and your customers.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Problem and Solution */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Template e-commerce stores all look the same, load slowly, and cannot be customised without expensive plugins. You end up competing on price because your store cannot communicate your value.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we do differently
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build a store that sells?"
        body="Tell us about your products and your customers. We will build the store around them."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/gdpr-compliance/page.tsx`

<sub>136 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'GDPR Compliance for Websites and Apps UK | Masuyo Digital',
  description: 'GDPR compliance implementation for UK business websites and applications. Data protection that keeps you legal and builds customer trust.',
  openGraph: {
    title: 'GDPR Compliance for Websites and Apps UK | Masuyo Digital',
    description: 'GDPR compliance implementation for UK business websites and applications. Data protection that keeps you legal and builds customer trust.',
    url: 'https://masuyodigital.com/technology/gdpr-compliance',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/gdpr-compliance' },
}

const solutionPoints = [
  'Data audit and mapping (what data you collect and where it goes)',
  'Privacy policy and cookie policy implementation',
  'Cookie consent management',
  'Data retention and deletion workflows',
  'User rights implementation (access, deletion, portability)',
  'Third-party processor review',
  'ICO registration guidance',
]

const features = [
  'Data flow audit',
  'Privacy policy',
  'Cookie policy',
  'Consent management',
  'Data retention setup',
  'User rights workflows',
  'Processor agreements review',
  'Compliance documentation',
]

export default function GdprCompliancePage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                GDPR and Compliance
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                GDPR Compliance That Actually Protects You
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We implement the technical and policy foundations that keep your business compliant with UK GDPR. Clear, practical, and built into your systems from the ground up.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most businesses know they need to be GDPR compliant but are not sure what that means technically. A privacy policy alone is not enough. The way your systems collect, store, and process data needs to be compliant too.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we implement
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What you get
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Need to get compliant?"
        body="Tell us about your business and how you collect data. We will take care of the rest."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/hosting/page.tsx`

<sub>134 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Managed Hosting Services UK | Masuyo Digital',
  description: 'Managed website and application hosting on our own UK infrastructure. Fast, reliable, and fully supported with no third-party middlemen.',
  openGraph: {
    title: 'Managed Hosting Services UK | Masuyo Digital',
    description: 'Managed website and application hosting on our own UK infrastructure. Fast, reliable, and fully supported with no third-party middlemen.',
    url: 'https://masuyodigital.com/technology/hosting',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/hosting' },
}

const solutionPoints = [
  'We own and manage the infrastructure directly',
  'Your site sits on a dedicated server, not shared with hundreds of others',
  'We know your site because we built it',
  'Proactive monitoring means we often fix issues before you notice them',
  'One point of contact for everything',
]

const features = [
  'Managed VPS hosting',
  'SSL certificate',
  'Daily backups',
  'Uptime monitoring',
  'Security updates',
  'Performance optimisation',
  'Support',
  'Monthly reporting',
]

export default function HostingPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Hosting
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Hosting You Can Actually Rely On
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We host your website or application on our own infrastructure. No third-party middlemen, no passing the buck. Fast load times, strong uptime, and a team that knows your site inside out.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Cheap shared hosting is slow and unreliable. Large hosting providers give you a ticket number when something breaks. Neither option is acceptable when your website is your business.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Why host with Masuyo
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to move to hosting that works?"
        body="Tell us about your site and your current setup. We will take it from there."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/web-applications/page.tsx`

<sub>138 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Web Application Development UK | Masuyo Digital',
  description: 'Custom web applications, client portals, and browser-based tools built for complex business needs.',
  openGraph: {
    title: 'Web Application Development UK | Masuyo Digital',
    description: 'Custom web applications, client portals, and browser-based tools built for complex business needs.',
    url: 'https://masuyodigital.com/technology/web-applications',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/web-applications' },
}

const solutionPoints = [
  'Client portals and internal tools',
  'Booking and reservation systems',
  'Custom dashboards and reporting tools',
  'Multi-user platforms with role-based access',
  'Data management and workflow applications',
  'Integrations with your existing systems',
]

const features = [
  'Next.js and React',
  'Secure authentication',
  'Role-based access control',
  'Real-time data',
  'Third-party integrations',
  'Responsive design',
  'Scalable architecture',
  'Full documentation',
]

export default function WebApplicationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Web Applications and Portals
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Complex Problems, Clean Solutions
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build web applications that handle the complexity your business needs, without the complexity your users have to deal with. Powerful under the hood, simple on the surface.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Problem and Solution */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Off-the-shelf software rarely fits exactly. You end up paying for features you do not need, missing features you do, and spending hours on workarounds. A custom web application solves your actual problem.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we build
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              How we build it
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Have a complex problem to solve?"
        body="Tell us what you need and we will tell you exactly how to build it."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


### `app/technology/web-development/page.tsx`

<sub>137 lines</sub>

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Web Development Services UK | Masuyo Digital',
  description: 'Professional web development for businesses that need more than a template. Fast, modern, and built to convert.',
  openGraph: {
    title: 'Web Development Services UK | Masuyo Digital',
    description: 'Professional web development for businesses that need more than a template. Fast, modern, and built to convert.',
    url: 'https://masuyodigital.com/technology/web-development',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/web-development' },
}

const solutionPoints = [
  'Built on modern frameworks (Next.js) for speed and performance',
  'Designed around conversion, not just aesthetics',
  'SEO foundations built in from day one',
  'Hosted on our own infrastructure for reliability and speed',
  'Fully managed and supported after launch',
]

const features = [
  'Custom design',
  'Mobile-first development',
  'SEO setup',
  'Contact forms',
  'CMS integration',
  'Google Analytics',
  'SSL certificate',
  'Ongoing support',
]

export default function WebDevelopmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Web Development
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Websites Built to Perform, Not Just to Look Good
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We design and develop websites that load fast, rank well, and turn visitors into customers. Every line of code is written with your business goals in mind.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Problem and Solution */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Most websites look fine but do not perform. They are slow, not optimised for search, and built on templates that cannot grow with your business. You end up paying for a redesign every two years.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  What we do differently
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'var(--font-poppins)' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready for a website that works?"
        body="Tell us about your business and what you need. We will take it from there."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
```


---

## `public/` — static assets


### `public/.gitkeep`

*(empty file)*
