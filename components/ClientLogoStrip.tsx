import ImagePlaceholder from '@/components/ImagePlaceholder'

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
 * TODO: replace with real client logos. Until then every slot renders an
 * ImagePlaceholder, so no logo can imply a client relationship we do not have.
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
          className={`text-center font-sans text-xs font-semibold uppercase tracking-[0.14em] ${
            dark ? 'text-white/50' : 'text-navy/50'
          }`}
        >
          {heading}
        </p>
      )}

      <ul className="mt-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i}>
            {/* TODO: replace with real client logo */}
            <ImagePlaceholder aspect="5/2" label="PLACEHOLDER: client logo" />
          </li>
        ))}
      </ul>
    </div>
  )
}
