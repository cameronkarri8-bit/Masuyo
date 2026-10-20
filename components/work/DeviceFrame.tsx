import Image from 'next/image'
import type { WorkImage } from '@/lib/work'

/**
 * A screenshot in a plain device frame. Desktop gets a thin window bar with
 * no address bar, so no URL is ever shown. Phone gets a rounded bezel.
 *
 * The frames are drawn here rather than baked into the images, so the same
 * screenshot works in a card, the hero and the gallery.
 */
export default function DeviceFrame({
  image,
  sizes,
  priority = false,
  dark = false,
  className = '',
}: {
  image: WorkImage
  sizes: string
  priority?: boolean
  /** On a petrol or deep ground. */
  dark?: boolean
  className?: string
}) {
  if (image.device === 'phone') {
    return (
      <div
        className={`overflow-hidden rounded-[1.75rem] border-[6px] border-deep bg-deep shadow-[0_18px_40px_-18px_rgba(8,31,40,0.45)] ${
          dark ? 'ring-1 ring-paper/20' : ''
        } ${className}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full rounded-[1.25rem]"
        />
      </div>
    )
  }
  return (
    <div
      className={`overflow-hidden rounded-[0.875rem] shadow-[0_18px_40px_-18px_rgba(8,31,40,0.45)] ring-1 ${
        dark ? 'bg-deep ring-paper/15' : 'bg-paper ring-petrol/15'
      } ${className}`}
    >
      <div aria-hidden="true" className={`flex h-6 items-center gap-1.5 px-3 ${dark ? 'bg-deep' : 'bg-mist'}`}>
        <span className={`h-2 w-2 rounded-full ${dark ? 'bg-paper/30' : 'bg-petrol/25'}`} />
        <span className={`h-2 w-2 rounded-full ${dark ? 'bg-paper/30' : 'bg-petrol/25'}`} />
        <span className={`h-2 w-2 rounded-full ${dark ? 'bg-paper/30' : 'bg-petrol/25'}`} />
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  )
}
