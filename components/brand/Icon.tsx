import { BRAND_ICONS, ICON_FILL_OFFSET, ICON_LINE, type BrandIconName } from '@/lib/brand/icons'

/**
 * A brand icon: pen line, off register aqua fill, one detail, a slight tilt.
 *
 * On light grounds the line is petrol and the fill aqua. On petrol and deep
 * grounds the line is aqua and the fill paper, as the guide shows.
 *
 * Never below 20px. Below 24px the line thickens and the detail is dropped,
 * so the shape still reads.
 */

const TONES = {
  light: { ink: '#0F3B4F', fill: '#4FE0E6', knock: '#F3F6F7' },
  dark: { ink: '#4FE0E6', fill: '#F3F6F7', knock: '#0F3B4F' },
} as const

const BY_NAME = new Map(BRAND_ICONS.map(icon => [icon.name, icon]))

export default function Icon({
  name,
  size = 48,
  dark = false,
  label,
  className = '',
}: {
  name: BrandIconName
  size?: number
  dark?: boolean
  /** Give a label when the icon carries meaning; leave it out when a heading beside it says the same thing. */
  label?: string
  className?: string
}) {
  const icon = BY_NAME.get(name)
  if (!icon) return null
  const px = Math.max(20, size)
  const small = px < 24
  const c = TONES[dark ? 'dark' : 'light']
  const lines = small ? icon.lines : [...icon.lines, ...(icon.detail.lines ?? [])]
  const solids = small ? icon.solids : [...icon.solids, ...(icon.detail.solids ?? [])]
  const knocked = small ? icon.knocked : [...icon.knocked, ...(icon.detail.knocked ?? [])]
  const a11y = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const }

  return (
    <svg viewBox="0 0 48 48" width={px} height={px} className={`shrink-0 ${className}`} focusable="false" {...a11y}>
      <g transform={`rotate(${icon.tilt} 24 24)`}>
        <g fill={c.fill} transform={`translate(${ICON_FILL_OFFSET} ${ICON_FILL_OFFSET})`}>
          {icon.fills.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g
          fill="none"
          stroke={c.ink}
          strokeWidth={small ? 3.2 : ICON_LINE}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {lines.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g fill={c.ink}>
          {solids.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {knocked.map((d, i) => (
          <path key={i} d={d} fill={c.ink} stroke={c.knock} strokeWidth={1.6} strokeLinejoin="round" paintOrder="stroke" />
        ))}
      </g>
    </svg>
  )
}
