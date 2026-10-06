/**
 * From first call to live: four labelled stages on one bar.
 *
 * Not drawn to a time scale, so it never over promises. Shades of petrol for
 * the first three, aqua for launch, which is why it sits on a petrol band.
 */
const STAGES = ['Plan', 'Design', 'Build', 'Launch']
const SHADES = ['bg-paper/10', 'bg-paper/20', 'bg-paper/30', 'bg-aqua text-deep']

export default function TimelineBar() {
  return (
    <ol className="grid grid-cols-4 gap-1.5 overflow-hidden rounded-card" aria-label="Plan, then design, then build, then launch">
      {STAGES.map((stage, i) => (
        <li
          key={stage}
          className={`flex min-h-[4.5rem] items-center justify-center px-2 text-center text-[1rem] font-bold sm:text-subhead ${SHADES[i]} ${i < 3 ? 'text-paper' : ''}`}
        >
          {stage}
        </li>
      ))}
    </ol>
  )
}
