interface ImagePlaceholderProps {
  /** What the real image will be. Written so the brief travels with the slot. */
  label: string
  /** Aspect ratio, for example "16/9", "4/3", "1/1". Defaults to 16/9. */
  aspect?: string
  /** Rounds the corners to the card radius. On by default. */
  rounded?: boolean
  className?: string
}

/**
 * Stands in for every image on the site.
 *
 * We never link out to stock photography, so this renders a blue tinted panel
 * with a diagonal hatch, an icon and the shot description. Swapping in the real
 * asset later means replacing this element with a next/image.
 *
 * Decorative until then, so it is hidden from assistive technology.
 */
export default function ImagePlaceholder({
  label,
  aspect = '16/9',
  rounded = true,
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      style={{ aspectRatio: aspect }}
      className={`relative flex w-full items-center justify-center overflow-hidden bg-blue-tint ring-1 ring-inset ring-blue/15 ${
        rounded ? 'rounded-card' : ''
      } ${className}`}
    >
      {/* Diagonal hatch, kept very quiet so the label stays readable. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 9px, rgba(53,173,223,0.10) 9px, rgba(53,173,223,0.10) 10px)',
        }}
      />

      <div className="relative flex max-w-[30ch] flex-col items-center gap-3 px-6 text-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-blue"
        >
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.5" cy="9.5" r="1.6" fill="currentColor" />
          <path
            d="M4 17.5l4.8-4.4a2 2 0 0 1 2.7 0l3 2.8m0 0l1.7-1.5a2 2 0 0 1 2.6 0L20 15.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="font-sans text-xs font-medium leading-relaxed tracking-wide text-navy/70">
          {label}
        </p>
      </div>
    </div>
  )
}
