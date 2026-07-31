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
          <div className="w-14 flex-shrink-0">
            <ImagePlaceholder
              aspect="1/1"
              label="PLACEHOLDER: client headshot"
              className="!rounded-full"
            />
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
