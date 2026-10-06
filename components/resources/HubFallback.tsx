import { slugify } from '@/lib/slug'
import ResourceCard from './ResourceCard'
import type { HubResource } from './ResourcesHub'


/**
 * What the hub renders before its script loads, and for anyone without
 * JavaScript: a plain search form that submits to the same URL, chip links,
 * and every article. The interactive hub replaces it once it hydrates.
 */
export default function HubFallback({ resources, categories }: { resources: HubResource[]; categories: readonly string[] }) {
  const featured = resources.filter(r => r.featured).slice(0, 2)
  const rest = resources.filter(r => !featured.includes(r))
  return (
    <div>
      <form action="/resources" method="get" className="mx-auto max-w-2xl">
        <label htmlFor="resource-search-fallback" className="sr-only">
          Search guides
        </label>
        <input
          id="resource-search-fallback"
          name="q"
          type="search"
          placeholder='Search guides, for example "website cost"'
          className="w-full rounded-card border-2 border-transparent bg-paper py-5 pl-14 pr-5 text-lead text-deep placeholder:text-steel"
        />
      </form>
      <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Categories">
        {['All', ...categories, 'Glossary'].map(label => (
          <li key={label}>
            <a
              href={label === 'All' ? '/resources' : `/resources?category=${slugify(label)}`}
              className="inline-flex min-h-[2.75rem] items-center rounded-full bg-paper px-4 text-[1rem] font-semibold text-petrol ring-2 ring-inset ring-petrol/25"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <section aria-labelledby="start-here-fallback" className="mt-14">
        <h2 id="start-here-fallback" className="text-subhead text-deep">
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
      <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Articles">
        {rest.map(r => (
          <li key={r.slug}>
            <ResourceCard r={r} />
          </li>
        ))}
      </ul>
    </div>
  )
}
