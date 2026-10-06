import { Dot } from '@/components/ui/SectionTitle'

/**
 * Numbered steps joined by a thin line: across the page on desktop, down the
 * left on a phone.
 *
 * Step numbers are Albert Sans extra bold, petrol on light grounds and aqua on
 * petrol, as the brief sets out. The list is an ordered list, so the sequence
 * is in the markup as well as on screen.
 */
export interface Step {
  title: string
  body?: React.ReactNode
}

export default function Steps({
  steps,
  dark = false,
  columns,
}: {
  steps: Step[]
  dark?: boolean
  columns?: 3 | 4
}) {
  const cols = columns ?? (steps.length >= 4 ? 4 : 3)
  return (
    <ol className={`relative grid gap-10 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} lg:gap-8`}>
      {steps.map((step, i) => (
        <li key={step.title} className="relative pl-16 lg:pl-0 lg:pt-16">
          {/* The joining line: down the left on a phone, across on desktop. */}
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute left-[1.15rem] top-12 h-[calc(100%-1rem)] w-0.5 lg:left-14 lg:top-[1.4rem] lg:h-0.5 lg:w-[calc(100%-1.5rem)] ${
                dark ? 'bg-paper/25' : 'bg-petrol/20'
              }`}
            />
          )}
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 text-title ${dark ? 'text-aqua' : 'text-petrol'}`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className={`text-subhead ${dark ? 'text-paper' : 'text-deep'}`}>
            {step.title.replace(/\.$/, '')}
            <Dot />
          </h3>
          {step.body && <div className={`mt-2 text-body ${dark ? 'text-mist' : 'text-steel'}`}>{step.body}</div>}
        </li>
      ))}
    </ol>
  )
}
