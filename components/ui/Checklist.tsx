/**
 * A list with the brand tick as its marker.
 *
 * The tick is the pen mark from the guide, in petrol on light grounds and aqua
 * on dark ones. It is drawn inline rather than animated: a list of eight ticks
 * drawing themselves would be far more than the one or two marks per layout
 * the guide allows.
 */

function Tick({ dark }: { dark: boolean }) {
  return (
    <svg viewBox="0 0 80 66" className="mt-1 h-4 w-5 shrink-0" aria-hidden="true" fill="none">
      <path
        d="M5 34C12 42 19 50 26 59C40 40 56 21 75 5"
        stroke={dark ? '#4FE0E6' : '#0F3B4F'}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Checklist({
  items,
  dark = false,
  columns = 1,
  className = '',
}: {
  items: React.ReactNode[]
  dark?: boolean
  columns?: 1 | 2
  className?: string
}) {
  return (
    <ul className={`grid gap-x-10 gap-y-4 ${columns === 2 ? 'md:grid-cols-2' : ''} ${className}`}>
      {items.map((item, i) => (
        <li key={i} className={`flex gap-3 text-body ${dark ? 'text-paper' : 'text-deep'}`}>
          <Tick dark={dark} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
