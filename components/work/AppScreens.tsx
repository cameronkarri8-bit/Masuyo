import Image from 'next/image'
import type { WorkImage } from '@/lib/work'

/**
 * Three phone screens for an app: one in front, one either side, angled a
 * little behind it. No drawn bezel, just the screen with the rounded corners
 * of a modern phone and a soft shadow, so it reads as the app rather than a
 * picture of a device.
 *
 * `crop` sets the screens in a box the same shape as a desktop screenshot and
 * lets them run off the bottom edge, so an app card lines up with the desktop
 * cards next to it. Without it the whole fan shows, for the case study hero.
 */

/** Rounded like a phone screen: 12% of the width across, 5.5% of the height down. */
export const PHONE_RADIUS = 'rounded-[12%/5.5%]'

function Screen({
  image,
  sizes,
  priority,
  dark,
  className = '',
  style,
}: {
  image: WorkImage
  sizes: string
  priority?: boolean
  dark: boolean
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`overflow-hidden ${PHONE_RADIUS} ${
        dark ? 'ring-1 ring-paper/15' : 'ring-1 ring-petrol/10'
      } shadow-[0_24px_48px_-20px_rgba(8,31,40,0.45)] ${className}`}
      style={style}
    >
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

export default function AppScreens({
  images,
  sizes,
  priority = false,
  dark = false,
  crop = false,
}: {
  images: WorkImage[]
  /** The sizes for the front screen; the two behind it are a little smaller. */
  sizes: string
  priority?: boolean
  dark?: boolean
  crop?: boolean
}) {
  const [front, left, right] = images
  if (!front) return null
  return (
    <div
      className={`relative mx-auto w-full ${crop ? 'aspect-[1600/1140]' : 'aspect-[7/6] max-w-[34rem]'}`}
    >
      {left && (
        <Screen
          image={left}
          sizes={sizes}
          dark={dark}
          className="absolute left-[7%] w-[29%]"
          style={{ top: crop ? '16%' : '12%', transform: 'rotate(-6deg)' }}
        />
      )}
      {right && (
        <Screen
          image={right}
          sizes={sizes}
          dark={dark}
          className="absolute right-[7%] w-[29%]"
          style={{ top: crop ? '16%' : '12%', transform: 'rotate(6deg)' }}
        />
      )}
      <Screen
        image={front}
        sizes={sizes}
        priority={priority}
        dark={dark}
        className="absolute left-1/2 z-10 w-[35%] -translate-x-1/2"
        style={{ top: crop ? '4%' : '0' }}
      />
    </div>
  )
}
