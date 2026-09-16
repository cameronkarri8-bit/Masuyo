import { BUSINESS, INERT_HREF, NAV_LINKS } from './content'
import SampleBar from './SampleBar'

/**
 * Sample bar and nav, stuck to the top as one unit.
 *
 * The nav is translucent with a backdrop blur so content passes under it. The
 * sample bar above it is opaque, because a notice that has to stay legible
 * should not depend on what happens to be scrolling behind it.
 *
 * There is no hamburger. A drawer on a concept page would be a menu of links
 * that do nothing, so below sm the four links wrap onto a second row instead
 * and everything stays visible.
 *
 * The wordmark is set in type rather than reproducing the real logo, which is
 * not ours to use.
 */
export default function FrozenNav() {
  return (
    <div className="sticky top-0 z-50">
      <SampleBar />

      <header className="border-b border-white/10 bg-fc-navy/75 backdrop-blur-xl backdrop-saturate-150">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-8 sm:px-6"
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href={INERT_HREF}
              className="fc-wordmark text-fc-frost transition-opacity hover:opacity-80"
            >
              {BUSINESS.name}
            </a>

            {/* Phone sits here on narrow screens so it is reachable without scrolling. */}
            <a
              href={INERT_HREF}
              className="text-[0.9375rem] font-medium text-fc-cyan transition-opacity hover:opacity-80 sm:hidden"
            >
              {BUSINESS.phoneDisplay}
            </a>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[0.9375rem]">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-fc-frost/75 transition-colors hover:text-fc-frost"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={INERT_HREF}
            className="ml-auto hidden text-[0.9375rem] font-medium text-fc-cyan transition-opacity hover:opacity-80 sm:block"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </nav>
      </header>
    </div>
  )
}
