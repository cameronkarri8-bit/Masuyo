/**
 * Stylised map of the Preston area.
 *
 * Inline SVG, so it adds no image weight and cannot shift the layout once the
 * page paints. It is deliberately abstract: relative positions are roughly
 * right, everything else is invented for legibility. It should read as a piece
 * of design rather than as a survey, which is why there are no street shapes,
 * no coastline detail and no scale.
 *
 * The viewBox is 640 by 480. Coordinates below are hand placed and verified at
 * 360, 768, 1280 and 1920 so that no label overlaps another. Below 1280 the
 * outer ring drops out through `map-outer` rather than being allowed to
 * collide, since the box shrinks faster than the type does.
 */

const NAVY_DEEP = '#111d29'
const NAVY = '#1A2939'
const BLUE = '#35ADDF'

interface Place {
  x: number
  y: number
  label: string
  /** Which side of the marker the label sits on, to keep pairs apart. */
  anchor: 'start' | 'middle' | 'end'
  /** Vertical nudge for the label, in user units. */
  dy: number
  /** Hidden below 1280px, where there is not room for ten labels. */
  outer?: boolean
}

/*
  Preston sits at the centre. Everything else is placed by rough compass bearing
  and relative distance, not by coordinate.
*/
const PRESTON = { x: 300, y: 236 }

const PLACES: Place[] = [
  { x: 306, y: 168, label: 'Fulwood', anchor: 'start', dy: -20 },
  { x: 286, y: 292, label: 'Penwortham', anchor: 'middle', dy: 28 },
  { x: 362, y: 300, label: 'Bamber Bridge', anchor: 'start', dy: 18 },
  { x: 344, y: 366, label: 'Leyland', anchor: 'middle', dy: 22 },
  { x: 428, y: 176, label: 'Longridge', anchor: 'start', dy: -12, outer: true },
  { x: 424, y: 424, label: 'Chorley', anchor: 'start', dy: 20, outer: true },
  { x: 132, y: 340, label: 'Lytham St Annes', anchor: 'start', dy: 22, outer: true },
  { x: 86, y: 214, label: 'Blackpool', anchor: 'start', dy: -12, outer: true },
  { x: 520, y: 268, label: 'Blackburn', anchor: 'end', dy: 22, outer: true },
  { x: 214, y: 62, label: 'Lancaster', anchor: 'start', dy: -12, outer: true },
]

export default function PrestonMap({ className = '' }: { className?: string }) {
  return (
    <div
      /*
        Capped below the breakpoint, where the map sits under the copy at full
        container width. Uncapped it ran to 528px tall at tablet size and pushed
        the hero past 120vh.
      */
      className={`preston-map relative w-full max-w-md overflow-hidden rounded-card lg:max-w-none ${className}`}
      style={{ aspectRatio: '4 / 3' }}
    >
      <svg
        viewBox="0 0 640 480"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby="preston-map-title preston-map-desc"
        className="h-full w-full"
      >
        <title id="preston-map-title">
          Stylised map of Preston and the surrounding Lancashire areas Masuyo Digital works
          with.
        </title>
        <desc id="preston-map-desc">
          An abstract illustration rather than an accurate street map. Preston sits at the
          centre, with the River Ribble running through the lower half, the M6 corridor to
          the east and the M55 to the north west. Surrounding markers show Fulwood,
          Penwortham, Bamber Bridge, Leyland, Longridge, Chorley, Lytham St Annes,
          Blackpool, Blackburn and Lancaster.
        </desc>

        <defs>
          {/* Soft depth across the panel, lit from the top left. */}
          <linearGradient id="pm-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={NAVY} />
            <stop offset="55%" stopColor={NAVY_DEEP} />
            <stop offset="100%" stopColor="#0c1620" />
          </linearGradient>

          <radialGradient id="pm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.5" />
            <stop offset="55%" stopColor={BLUE} stopOpacity="0.12" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </radialGradient>

          {/* Edge lighting on the corridors, brightest at the centre of the run. */}
          <linearGradient id="pm-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.1" />
            <stop offset="45%" stopColor={BLUE} stopOpacity="0.55" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="pm-road-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.08" />
            <stop offset="55%" stopColor={BLUE} stopOpacity="0.5" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="pm-river" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.12" />
            <stop offset="40%" stopColor={BLUE} stopOpacity="0.62" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0.14" />
          </linearGradient>
        </defs>

        <rect x="-400" y="-300" width="1440" height="1080" fill="url(#pm-panel)" />

        {/* Faint grid, to read as a map surface without pretending to be one. */}
        <g stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1">
          {[-160, -80, 0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800].map(x => (
            <line key={`v${x}`} x1={x} y1="-300" x2={x} y2="780" />
          ))}
          {[-80, 0, 80, 160, 240, 320, 400, 480, 560].map(y => (
            <line key={`h${y}`} x1="-400" y1={y} x2="1040" y2={y} />
          ))}
        </g>

        {/* Ambient glow behind the city centre. */}
        <circle cx={PRESTON.x} cy={PRESTON.y} r="190" fill="url(#pm-glow)" />

        {/* M6, a vertical corridor to the east. */}
        <path
          d="M470 -10 C 462 110, 486 210, 474 300 C 466 372, 480 430, 472 490"
          fill="none"
          stroke="url(#pm-road)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="482" y="96" className="map-road" textAnchor="start">
          M6
        </text>

        {/* M55, running in from the north west. */}
        <path
          d="M-10 150 C 90 142, 170 168, 246 186 C 268 191, 284 199, 296 210"
          fill="none"
          stroke="url(#pm-road-h)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="120" y="140" className="map-road" textAnchor="start">
          M55
        </text>

        {/* River Ribble, through the lower portion. */}
        <path
          d="M-10 316 C 90 300, 170 336, 250 322 C 330 308, 392 268, 470 250 C 530 236, 590 232, 650 236"
          fill="none"
          stroke="url(#pm-river)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M-10 316 C 90 300, 170 336, 250 322 C 330 308, 392 268, 470 250 C 530 236, 590 232, 650 236"
          fill="none"
          stroke={BLUE}
          strokeOpacity="0.16"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <text x="18" y="292" className="map-road" textAnchor="start">
          River Ribble
        </text>

        {/* Surrounding areas. */}
        {PLACES.map(pl => (
          <g key={pl.label} className={pl.outer === true ? 'map-outer' : undefined}>
            <circle cx={pl.x} cy={pl.y} r="9" fill={BLUE} fillOpacity="0.1" />
            <circle cx={pl.x} cy={pl.y} r="4" fill={BLUE} fillOpacity="0.85" />
            <text
              x={pl.x + (pl.anchor === 'start' ? 12 : pl.anchor === 'end' ? -12 : 0)}
              y={pl.y + pl.dy}
              textAnchor={pl.anchor}
              className="map-label"
            >
              {pl.label}
            </text>
          </g>
        ))}

        {/* Preston city centre. Larger marker, and the only thing that moves. */}
        <g>
          <circle
            cx={PRESTON.x}
            cy={PRESTON.y}
            r="26"
            fill="none"
            stroke={BLUE}
            strokeOpacity="0.32"
            className="map-pulse"
          />
          <circle cx={PRESTON.x} cy={PRESTON.y} r="17" fill={BLUE} fillOpacity="0.16" />
          <circle cx={PRESTON.x} cy={PRESTON.y} r="9.5" fill={BLUE} />
          <circle cx={PRESTON.x} cy={PRESTON.y} r="3.6" fill="#ffffff" fillOpacity="0.92" />
          <text x={PRESTON.x} y={PRESTON.y - 46} textAnchor="middle" className="map-city">
            Preston
          </text>
        </g>
      </svg>
    </div>
  )
}
