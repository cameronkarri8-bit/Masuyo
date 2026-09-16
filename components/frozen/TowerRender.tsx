/**
 * The custom PC render area.
 *
 * Line art rather than a photograph, because no photograph of their work was
 * supplied and using a stock machine would show a buyer a build that is not
 * theirs. Drawn as a technical elevation: case outline, glass side panel,
 * board, cooler, card, memory and shroud, all in hairlines.
 *
 * The one cyan accent is the light along the top edge of the graphics card,
 * which is the only place on this section the accent appears.
 */

const FROST = '#EAF4F9'
const CYAN = '#35C6F4'

/** Fan blades, struck as straight hairlines so they read at any size. */
function fanBlades(cx: number, cy: number, inner: number, outer: number, count: number) {
  const paths: string[] = []
  for (let i = 0; i < count; i += 1) {
    const a = ((360 / count) * i * Math.PI) / 180
    const b = a + 0.5
    const x1 = Math.round((cx + Math.cos(a) * inner) * 10) / 10
    const y1 = Math.round((cy + Math.sin(a) * inner) * 10) / 10
    const x2 = Math.round((cx + Math.cos(b) * outer) * 10) / 10
    const y2 = Math.round((cy + Math.sin(b) * outer) * 10) / 10
    paths.push(`M${x1} ${y1}L${x2} ${y2}`)
  }
  return paths.join('')
}

function Fan({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} opacity="0.3" />
      <circle cx={cx} cy={cy} r={r * 0.26} opacity="0.22" />
      <path d={fanBlades(cx, cy, r * 0.28, r * 0.94, 9)} opacity="0.16" />
    </g>
  )
}

export default function TowerRender({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 440 620"
      className={className}
    >
      <defs>
        <radialGradient id="fc-tower-glow" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor={CYAN} stopOpacity="0.2" />
          <stop offset="100%" stopColor={CYAN} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Light behind the machine rather than on it. */}
      <rect x="0" y="0" width="440" height="620" fill="url(#fc-tower-glow)" />

      <g stroke={FROST} fill="none" strokeWidth="1.25" strokeLinecap="round">
        {/* Case, then the glass side panel inset within it. */}
        <rect x="76" y="34" width="288" height="552" rx="7" opacity="0.4" />
        <rect
          x="92"
          y="50"
          width="256"
          height="520"
          rx="4"
          fill={FROST}
          fillOpacity="0.035"
          opacity="0.16"
        />

        {/* Top exhaust, sitting against the roof of the case the way it does on
            a real machine rather than floating inside it. */}
        <Fan cx={152} cy={78} r={21} />
        <Fan cx={218} cy={78} r={21} />

        {/* Front panel ports. */}
        <circle cx="308" cy="72" r="4" opacity="0.2" />
        <rect x="294" y="86" width="28" height="7" rx="2" opacity="0.18" />

        {/* Motherboard plane. */}
        <rect x="104" y="140" width="176" height="212" rx="4" opacity="0.2" />

        {/* Cooler. */}
        <rect x="140" y="176" width="104" height="104" rx="6" opacity="0.26" />
        <Fan cx={192} cy={228} r={38} />

        {/* Memory. Four sticks on edge. */}
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={292 + i * 15} y="150" width="9" height="122" rx="2" opacity="0.24" />
        ))}

        {/* Graphics card. The cyan hairline is the light along its top edge. */}
        <rect x="100" y="382" width="238" height="52" rx="6" opacity="0.3" />
        <path d="M112 382L326 382" stroke={CYAN} strokeWidth="1.5" opacity="0.85" />
        <Fan cx={164} cy={408} r={17} />
        <Fan cx={274} cy={408} r={17} />

        {/* Storage, stacked against the back of the case. */}
        <rect x="292" y="300" width="42" height="14" rx="2" opacity="0.2" />
        <rect x="292" y="322" width="42" height="14" rx="2" opacity="0.2" />

        {/* Power supply shroud, with the cable run above it. */}
        <rect x="102" y="482" width="234" height="70" rx="4" opacity="0.26" />
        <path d="M116 518L200 518" opacity="0.14" />
        <path d="M118 470C160 470 196 456 238 456C280 456 306 466 322 470" opacity="0.14" />

        {/* Front intake, seen edge on down the left flank. */}
        <path d="M86 176L86 460" opacity="0.18" />
        <path d="M81 176L81 460" opacity="0.1" />
      </g>
    </svg>
  )
}
