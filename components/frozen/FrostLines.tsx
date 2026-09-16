/**
 * Thin crystalline line work.
 *
 * Frost crystals branch at sixty degrees, so the geometry here is a set of long
 * rays from two off canvas origins with short branches struck off each at plus
 * and minus sixty. It is abstract: read as a whole it is light catching an
 * edge, not a picture of a snowflake, and there is no clipart anywhere in it.
 *
 * Every number is computed at module load from fixed inputs, so the server and
 * the client produce byte identical markup and there is no hydration mismatch.
 * Strokes are non-scaling, which keeps them a true hairline at any width rather
 * than fattening up as the slice crop scales the viewBox.
 */

function round(n: number): number {
  return Math.round(n * 10) / 10
}

/** One ray with its branches, returned as a single path string. */
function dendrite(ox: number, oy: number, angleDeg: number, length: number): string {
  const rad = (angleDeg * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)

  const segments = [`M${round(ox)} ${round(oy)}L${round(ox + dx * length)} ${round(oy + dy * length)}`]

  const stops = [0.28, 0.44, 0.59, 0.73, 0.86]
  for (let i = 0; i < stops.length; i += 1) {
    const t = stops[i]
    const px = ox + dx * length * t
    const py = oy + dy * length * t
    const branchLength = length * 0.1 * (1 - i * 0.12)

    for (const offset of [60, -60]) {
      const b = ((angleDeg + offset) * Math.PI) / 180
      segments.push(
        `M${round(px)} ${round(py)}L${round(px + Math.cos(b) * branchLength)} ${round(py + Math.sin(b) * branchLength)}`
      )
    }
  }

  return segments.join('')
}

const RAYS = [
  dendrite(120, -140, 31, 980),
  dendrite(120, -140, 49, 880),
  dendrite(120, -140, 67, 760),
  dendrite(1140, 940, -149, 900),
  dendrite(1140, 940, -131, 800),
]

/** A regular hexagon, the shape frost actually grows on. */
function hexagon(cx: number, cy: number, r: number, rotationDeg: number): string {
  const points: string[] = []
  for (let i = 0; i < 6; i += 1) {
    const a = ((60 * i + rotationDeg) * Math.PI) / 180
    points.push(`${round(cx + Math.cos(a) * r)},${round(cy + Math.sin(a) * r)}`)
  }
  return points.join(' ')
}

const HEXAGONS = [
  { points: hexagon(930, 168, 132, 12), opacity: 0.09 },
  { points: hexagon(930, 168, 78, 12), opacity: 0.06 },
  { points: hexagon(214, 646, 92, -8), opacity: 0.07 },
]

export default function FrostLines({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <g stroke="#EAF4F9" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {RAYS.map((d, i) => (
          <path key={i} d={d} opacity={0.11} />
        ))}
        {HEXAGONS.map((hex, i) => (
          <polygon key={i} points={hex.points} opacity={hex.opacity} />
        ))}
      </g>
    </svg>
  )
}
