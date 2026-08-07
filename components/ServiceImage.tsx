import Image from 'next/image'
import type { ServiceImage as ServiceImageData } from '@/lib/images'

/**
 * A supplied service photograph at a fixed 16/9 crop.
 *
 * The aspect ratio is fixed here rather than left to the source file, so the
 * four homepage cards line up no matter what dimensions the images arrive at.
 * The service page heroes use this same component at the same ratio, which
 * means there is one crop to judge rather than two.
 */
interface Props {
  image: ServiceImageData
  /** Rounds all four corners. Card tiles leave this off and let the card clip. */
  rounded?: boolean
  /** Scales gently when an ancestor marked `group` is hovered. */
  hover?: boolean
  priority?: boolean
  sizes?: string
}

export default function ServiceImage({
  image,
  rounded = false,
  hover = false,
  priority = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
}: Props) {
  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden bg-blue-tint ${
        rounded ? 'rounded-card' : ''
      }`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${
          hover ? 'transition-transform duration-500 ease-out group-hover:scale-[1.04]' : ''
        }`}
      />
    </div>
  )
}
