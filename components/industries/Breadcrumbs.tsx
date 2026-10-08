import Link from 'next/link'

export interface Crumb {
  name: string
  href: string
}

/**
 * A breadcrumb trail. The last item is the current page and is not a link.
 * The same list feeds the BreadcrumbList structured data.
 */
export default function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const link = dark
    ? 'text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-aqua'
    : 'text-petrol underline decoration-petrol/30 underline-offset-4 hover:decoration-petrol'
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 text-small ${dark ? 'text-mist' : 'text-steel'}`}>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={item.href} className={link}>
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
