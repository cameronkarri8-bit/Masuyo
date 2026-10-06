import { createPen } from '@/lib/brand/pen'
import { NORTH_WEST_OUTLINE, project, TOWNS } from '@/lib/geo'
import { Label } from './svg'

/**
 * The stylised map: a flat outline of the North West, one aqua dot for
 * Leyland with a soft ring around it. Drawn on petrol, which is why the dot
 * can be aqua.
 *
 * "region" shows the whole North West, for the Approach page. "local" zooms to
 * Central Lancashire and marks the towns the Preston page names.
 */
export default function RegionMap({ view = 'region', className = '' }: { view?: 'region' | 'local'; className?: string }) {
  const W = 420
  const H = 480
  const bounds =
    view === 'region'
      ? { north: 55.1, south: 52.9, west: -3.75, east: -1.85 }
      : { north: 53.81, south: 53.62, west: -2.86, east: -2.56 }
  const pen = createPen(view === 'region' ? 101 : 102, 0.6)
  const pts = NORTH_WEST_OUTLINE.map(p => project(p, bounds, W, H))
  const outline = pen.poly(pts, true)
  const [lx, ly] = project(TOWNS.Leyland, bounds, W, H)
  const towns = view === 'local' ? Object.entries(TOWNS).filter(([name]) => name !== 'Leyland') : []
  const label =
    view === 'region'
      ? 'A stylised map of North West England with Leyland marked, between Preston and Chorley.'
      : 'A stylised map of Central Lancashire marking Leyland, Preston, Chorley, Buckshaw Village, Penwortham and Bamber Bridge.'

  // Label placement, so names sit clear of their dots and of each other.
  const offsets: Record<string, [number, number, 'start' | 'end']> = {
    Preston: [12, -10, 'start'],
    Penwortham: [-12, -10, 'end'],
    'Bamber Bridge': [12, 4, 'start'],
    'Buckshaw Village': [12, 6, 'start'],
    Chorley: [12, 6, 'start'],
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={label}>
      <defs>
        <clipPath id={`map-clip-${view}`}>
          <rect width={W} height={H} rx="20" />
        </clipPath>
      </defs>
      <g clipPath={`url(#map-clip-${view})`}>
        <path d={outline} fill="#F3F6F7" fillOpacity={0.06} stroke="#F3F6F7" strokeOpacity={0.35} strokeWidth={2.5} strokeLinejoin="round" />
      </g>
      <circle cx={lx} cy={ly} r={view === 'region' ? 34 : 46} fill="#4FE0E6" fillOpacity={0.12} stroke="#4FE0E6" strokeOpacity={0.5} strokeWidth={2} />
      {towns.map(([name, ll]) => {
        const [x, y] = project(ll, bounds, W, H)
        const [dx, dy, anchor] = offsets[name] ?? [12, 5, 'start']
        return (
          <g key={name}>
            <circle cx={x} cy={y} r={5} fill="#F3F6F7" />
            <Label x={x + dx} y={y + dy} size={15} anchor={anchor} fill="#F3F6F7">
              {name}
            </Label>
          </g>
        )
      })}
      <circle cx={lx} cy={ly} r={8} fill="#4FE0E6" />
      <Label x={lx + (view === 'region' ? 16 : 14)} y={ly + (view === 'region' ? 5 : 22)} size={view === 'region' ? 17 : 16} weight={700} fill="#4FE0E6">
        Leyland
      </Label>
    </svg>
  )
}
