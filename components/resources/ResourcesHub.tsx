'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import TextLink from '@/components/ui/TextLink'
import type { GlossaryTerm } from '@/lib/glossary'
import { slugify } from '@/lib/slug'
import ResourceCard, { type CardData } from './ResourceCard'

/**
 * The Resources hub: a search box, category chips and the article grid.
 *
 * Search filters as the visitor types and combines with the chosen chip. Both
 * are kept in the address bar (?q=, ?category=, ?page=), so a filtered view
 * can be shared or bookmarked. The glossary is a chip of its own.
 */

export interface HubResource extends CardData {
  featured: boolean
  shortAnswer: string
}

const PAGE_SIZE = 12


function matches(haystack: string, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const h = haystack.toLowerCase()
  return words.every(w => h.includes(w))
}

export default function ResourcesHub({
  resources,
  categories,
  glossary,
}: {
  resources: HubResource[]
  categories: readonly string[]
  glossary: GlossaryTerm[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const category = params.get('category') ?? 'all'
  const page = Math.max(1, parseInt(params.get('page') ?? '1', 10) || 1)

  // Keep the address bar in step with the search box.
  useEffect(() => {
    const current = params.get('q') ?? ''
    if (current === query) return
    const t = setTimeout(() => update({ q: query, page: null }), 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === '' || (k === 'category' && v === 'all') || (k === 'page' && v === '1')) sp.delete(k)
      else sp.set(k, v)
    }
    const qs = sp.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const chips = [{ id: 'all', label: 'All' }, ...categories.map(c => ({ id: slugify(c), label: c })), { id: 'glossary', label: 'Glossary' }]
  const isGlossary = category === 'glossary'
  const searching = query.trim().length > 0

  const filtered = useMemo(
    () =>
      resources.filter(
        r =>
          (category === 'all' || slugify(r.category) === category) &&
          (!searching || matches(`${r.title} ${r.description} ${r.category} ${r.shortAnswer}`, query))
      ),
    [resources, category, query, searching]
  )
  const terms = useMemo(
    () => glossary.filter(t => !searching || matches(`${t.term} ${t.definition}`, query)),
    [glossary, query, searching]
  )

  const titles = useMemo(() => new Map(resources.map(r => [r.slug, r.title])), [resources])
  const showFeatured = category === 'all' && !searching && page === 1
  const featured = showFeatured ? filtered.filter(r => r.featured).slice(0, 2) : []
  const rest = filtered.filter(r => !featured.includes(r))
  const pages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE))
  const shown = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <label htmlFor="resource-search" className="sr-only">
          Search guides
        </label>
        <div className="relative">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-steel" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2.2" />
            <path d="M15.5 15.5 20 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search guides, for example "website cost"'
            className="w-full rounded-card border-2 border-transparent bg-paper py-5 pl-14 pr-5 text-lead text-deep placeholder:text-steel focus:border-petrol focus:outline-none"
          />
        </div>
      </div>

      <div className="scroll-row -mx-5 mt-8 overflow-x-auto px-5 sm:-mx-8 sm:px-8">
        <ul className="flex w-max gap-2 lg:mx-auto lg:w-auto lg:flex-wrap lg:justify-center" aria-label="Categories">
          {chips.map(chip => {
            const on = chip.id === category
            return (
              <li key={chip.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => update({ category: chip.id, page: null })}
                  className={`min-h-[2.75rem] whitespace-nowrap rounded-full px-4 text-[1rem] font-semibold ring-2 ring-inset transition-colors ${
                    on ? 'bg-petrol text-paper ring-petrol' : 'bg-paper text-petrol ring-petrol/25 hover:ring-petrol'
                  }`}
                >
                  {chip.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div aria-live="polite" className="sr-only">
        {isGlossary ? `${terms.length} terms` : `${filtered.length} articles`}
      </div>

      {isGlossary ? (
        <section aria-label="Glossary" className="mt-14">
          {terms.length === 0 ? (
            <Empty />
          ) : (
            <dl className="mx-auto grid max-w-4xl gap-x-12 gap-y-8 md:grid-cols-2">
              {terms.map(t => (
                <div key={t.term} className="border-t border-petrol/15 pt-4">
                  <dt className="text-subhead text-deep">{t.term}</dt>
                  <dd className="mt-2 text-body text-steel">{t.definition}</dd>
                  {t.slug && titles.get(t.slug) && (
                    <dd className="mt-3">
                      <TextLink href={`/resources/${t.slug}`}>{titles.get(t.slug)}</TextLink>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          )}
        </section>
      ) : (
        <>
          {featured.length > 0 && (
            <section aria-labelledby="start-here" className="mt-14">
              <h2 id="start-here" className="text-subhead text-deep">
                Start here
              </h2>
              <ul className="mt-5 grid gap-5 md:grid-cols-2">
                {featured.map(r => (
                  <li key={r.slug}>
                    <ResourceCard r={r} large />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {filtered.length === 0 ? (
            <Empty />
          ) : (
            <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Articles">
              {shown.map(r => (
                <li key={r.slug}>
                  <ResourceCard r={r} />
                </li>
              ))}
            </ul>
          )}
          {pages > 1 && (
            <nav aria-label="Pages" className="mt-12 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                <Link
                  key={n}
                  href={`${pathname}?${new URLSearchParams({ ...Object.fromEntries(params.entries()), page: String(n) }).toString()}`}
                  scroll={false}
                  aria-current={n === page ? 'page' : undefined}
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-semibold ${n === page ? 'bg-petrol text-paper' : 'bg-paper text-petrol'}`}
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </>
      )}
    </div>
  )
}

function Empty() {
  return (
    <div className="mx-auto mt-14 max-w-xl rounded-card bg-paper p-8 text-center">
      <p className="text-lead text-deep">Nothing matches that yet. Try a broader word, or ask us directly.</p>
      <div className="mt-4">
        <TextLink href="/start">Start a project</TextLink>
      </div>
    </div>
  )
}
