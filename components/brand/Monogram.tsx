import { MONOGRAM } from '@/lib/brand/logo-paths'

/**
 * The m. monogram, for small spaces: favicons, avatars, app icons.
 *
 * Three tiles, from the guide: petrol (paper m, aqua dot), mist (petrol m,
 * petrol dot) and aqua (petrol m, petrol dot).
 */

const TILES = {
  petrol: { tile: '#0F3B4F', letters: '#F3F6F7', dot: '#4FE0E6' },
  mist: { tile: '#E4EAEC', letters: '#0F3B4F', dot: '#0F3B4F' },
  aqua: { tile: '#4FE0E6', letters: '#0F3B4F', dot: '#0F3B4F' },
} as const

export type MonogramTile = keyof typeof TILES

export default function Monogram({
  tile = 'petrol',
  className = '',
  title = 'Masuyo',
  decorative = false,
}: {
  tile?: MonogramTile
  className?: string
  title?: string
  decorative?: boolean
}) {
  const c = TILES[tile]
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title }
  return (
    <svg viewBox={`0 0 ${MONOGRAM.size} ${MONOGRAM.size}`} className={className} {...a11y}>
      <rect width={MONOGRAM.size} height={MONOGRAM.size} rx={MONOGRAM.radius} fill={c.tile} />
      <g transform={MONOGRAM.transform}>
        <path fill={c.letters} d={MONOGRAM.letters} />
        <path fill={c.dot} d={MONOGRAM.dot} />
      </g>
    </svg>
  )
}
