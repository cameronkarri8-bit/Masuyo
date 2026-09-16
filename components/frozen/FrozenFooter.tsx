import { BUSINESS, INERT_HREF, NAV_LINKS, SAMPLE_NOTICE } from './content'

/**
 * Footer, carrying the sample notice in full for the second time.
 *
 * The notice is repeated here rather than referred back to, so that anyone who
 * lands mid page, or who prints or shares a screenshot of the bottom of the
 * page, still sees the whole statement.
 */
export default function FrozenFooter() {
  return (
    <footer className="bg-fc-navy text-fc-frost">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="fc-wordmark">{BUSINESS.name}</p>
            <p className="mt-2 text-[0.9375rem] text-fc-frost/60">{BUSINESS.trade}</p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] sm:justify-end">
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
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 text-[0.9375rem] text-fc-frost/60 sm:flex-row sm:justify-between">
          <address className="not-italic">
            {BUSINESS.addressLines.map(line => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <a
            href={INERT_HREF}
            className="text-fc-cyan transition-opacity hover:opacity-80 sm:self-end"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </div>

        <p className="mt-12 max-w-2xl border-t border-white/10 pt-10 text-[0.8125rem] leading-relaxed text-fc-frost/55">
          {SAMPLE_NOTICE}
        </p>
      </div>
    </footer>
  )
}
