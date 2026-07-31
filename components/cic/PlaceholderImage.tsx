import { Image as ImageIcon } from 'lucide-react'

interface PlaceholderImageProps {
  /** Intended intrinsic width in px. Drives the aspect ratio of the box. */
  width: number
  /** Intended intrinsic height in px. */
  height: number
  /** Shot description. Shown in the placeholder so the brief travels with the slot. */
  label: string
  /** Real alt text for the eventual image. Applied when the image is swapped in. */
  alt: string
  /** Eventual asset path, so swapping to a real image is a one line change. */
  src: string
  className?: string
}

/**
 * Stands in for a real photograph.
 *
 * Renders the intended dimensions and the shot brief rather than sourcing stock
 * imagery. Swapping to the real asset later means replacing this element with a
 * next/image using the same src and alt already recorded here.
 *
 * Decorative only until then, so it is hidden from assistive technology and the
 * alt text is carried on a data attribute rather than announced.
 */
export default function PlaceholderImage({
  width,
  height,
  label,
  alt,
  src,
  className = '',
}: PlaceholderImageProps) {
  return (
    <div
      aria-hidden="true"
      data-placeholder-src={src}
      data-placeholder-alt={alt}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`flex w-full flex-col items-center justify-center gap-3 border border-border bg-light p-6 text-center ${className}`}
    >
      <ImageIcon className="h-8 w-8 shrink-0 text-mid" strokeWidth={1.5} />
      <p className="font-mono text-xs leading-relaxed text-mid">
        {width} x {height}
      </p>
      <p className="max-w-[34ch] font-mono text-xs leading-relaxed text-mid">{label}</p>
    </div>
  )
}
