import LogoMark from '@/components/placeholder/LogoMark'

interface ClientLogoStripProps {
  heading?: string
  /** How many logo slots to render. */
  count?: number
  /** `dark` is for navy and blue sections. */
  tone?: 'light' | 'dark'
}

/**
 * Row of client logos.
 *
 * TODO: replace with real client logos. Until then every slot renders a
 * generic LogoMark reading "Client one", "Client two" and so on, so nothing
 * can imply a client relationship we do not have.
 */
export default function ClientLogoStrip({
  heading = 'Trusted by businesses across the UK',
  count = 6,
  tone = 'light',
}: ClientLogoStripProps) {
  const dark = tone === 'dark'

  return (
    <div>
      {heading && (
        <p
          className={`text-center font-sans text-xs font-semibold uppercase tracking-[0.06em] ${
            dark ? 'text-white/50' : 'text-navy/50'
          }`}
        >
          {heading}
        </p>
      )}

      <ul className="mt-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i}>
            {/* TODO: replace with a real, permissioned client logo */}
            <LogoMark index={i} />
          </li>
        ))}
      </ul>
    </div>
  )
}
