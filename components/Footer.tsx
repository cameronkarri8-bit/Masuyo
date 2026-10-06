import Link from 'next/link'
import Wordmark from '@/components/brand/Wordmark'
import { FOOTER_COLUMNS } from '@/lib/navigation'
import { SITE } from '@/lib/site'

/**
 * The footer.
 *
 * Deep rather than the petrol the copy spec suggests: every main page ends
 * with the petrol closing band, and two petrol bands back to back read as one
 * shapeless block. Deep is the brand's other dark ground, so the two stay
 * distinct.
 *
 * Links only what a visitor might look for. No second sitemap.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="ground-dark bg-deep text-paper">
      <div className="mx-auto max-w-site px-5 pb-10 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-10">
          <div className="max-w-sm">
            <Link href="/" aria-label="Masuyo, home" className="inline-block rounded-sm">
              <Wordmark tone="paper" className="h-8 w-auto" />
            </Link>
            <p className="mt-6 text-body text-mist">
              We build the websites, systems and automation that growing businesses run on. Based in
              Lancashire, working with businesses across the North West and beyond.
            </p>
            <p className="mt-6 text-subhead text-paper">{SITE.tagline}</p>
          </div>

          {FOOTER_COLUMNS.map(column => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-small text-mist">{column.heading}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-body text-paper transition-colors hover:text-aqua">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-small text-mist">Talk to us</h2>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-block break-all text-body font-semibold text-paper underline decoration-aqua decoration-2 underline-offset-[5px] hover:text-aqua sm:break-normal"
            >
              {SITE.email}
            </a>
            <p className="mt-3 text-body text-mist">{SITE.replyPromise}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-6 text-small text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.legalName}</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="hover:text-paper">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-paper">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
