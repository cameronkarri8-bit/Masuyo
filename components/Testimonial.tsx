import ImagePlaceholder from '@/components/ImagePlaceholder'

interface TestimonialProps {
  quote: string
  name: string
  role: string
  company: string
  /** Shows an avatar slot next to the attribution. */
  avatar?: boolean
  /** `dark` is for navy and blue sections. */
  tone?: 'light' | 'dark'
  /** `feature` is the giant pull quote. `inline` is the smaller card version. */
  size?: 'feature' | 'inline'
  /**
   * Marks the quote as not yet real. Renders a visible notice, so placeholder
   * content can never be mistaken for a genuine client endorsement.
   */
  isPlaceholder?: boolean
}

export default function Testimonial({
  quote,
  name,
  role,
  company,
  avatar = false,
  tone = 'light',
  size = 'feature',
  isPlaceholder = false,
}: TestimonialProps) {
  const dark = tone === 'dark'
  const quoteClass =
    size === 'feature'
      ? 'text-4xl md:text-5xl max-w-[20ch]'
      : 'text-2xl md:text-3xl max-w-[28ch]'

  return (
    <figure>
      {isPlaceholder && (
        <p
          className={`mb-6 inline-block rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider ${
            dark ? 'bg-white/15 text-white/80' : 'bg-amber/15 text-navy'
          }`}
        >
          Placeholder, awaiting real client content
        </p>
      )}

      <blockquote>
        <p className={`${quoteClass} ${dark ? 'text-white' : 'text-navy'}`}>{quote}</p>
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4">
        {avatar && (
          /* A dedicated marker rather than ImagePlaceholder: that component's
             label and padding cannot fit a 56px circle. */
          <div
            aria-hidden="true"
            title="PLACEHOLDER: client headshot"
            className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ${
              dark ? 'bg-white/10 text-white/50' : 'bg-blue-tint text-navy/40'
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.6" />
              <path d="M5 19.5a7.2 7.2 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
        )}
        <div>
          <p className={`font-sans text-base font-semibold ${dark ? 'text-white' : 'text-navy'}`}>
            {name}
          </p>
          <p className={`font-sans text-sm ${dark ? 'text-white/60' : 'text-mid'}`}>
            {role}, {company}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
