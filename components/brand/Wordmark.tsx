import { WORDMARK } from '@/lib/brand/logo-paths'

/**
 * The masuyo. wordmark, drawn from outlines so it needs no font.
 *
 * Three versions, from the guide:
 *   petrol  on light grounds and on aqua: petrol, with the dot matching
 *   paper   on petrol and deep grounds: paper, with the aqua dot
 *
 * Size it by width or height in CSS; the aspect ratio is fixed. The guide's
 * minimum is 80px wide on screen.
 */

const TONES = {
  petrol: { letters: '#0F3B4F', dot: '#0F3B4F' },
  paper: { letters: '#F3F6F7', dot: '#4FE0E6' },
} as const

export type WordmarkTone = keyof typeof TONES

export default function Wordmark({
  tone = 'petrol',
  className = '',
  title = 'Masuyo',
}: {
  tone?: WordmarkTone
  className?: string
  title?: string
}) {
  const colours = TONES[tone]
  return (
    <svg
      viewBox={WORDMARK.viewBox}
      className={className}
      role="img"
      aria-label={title}
      style={{ minWidth: 80 }}
    >
      <path fill={colours.letters} d={WORDMARK.letters} />
      <path fill={colours.dot} d={WORDMARK.dot} />
    </svg>
  )
}
