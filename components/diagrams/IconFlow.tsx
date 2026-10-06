import Icon from '@/components/brand/Icon'
import type { BrandIconName } from '@/lib/brand/icons'

/**
 * A short flow of steps, each an icon, a label and one line, joined by a
 * single line. Across the page on desktop, down the left on a phone.
 *
 * One step can be highlighted. On a light ground the highlight is a petrol
 * tile with the icon in its on-petrol colours, because aqua is never a
 * highlight colour on a light background.
 */
export interface FlowStep {
  icon: BrandIconName
  title: string
  body?: string
}

const COLUMNS: Record<number, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}

export default function IconFlow({
  steps,
  highlight,
  numbered = true,
  onPaper = false,
}: {
  steps: FlowStep[]
  highlight?: number
  numbered?: boolean
  /** On a paper band the tiles step down to mist, so they still read as tiles. */
  onPaper?: boolean
}) {
  const cols = COLUMNS[steps.length] ?? 'lg:grid-cols-6'
  return (
    <ol className={`relative grid gap-8 lg:gap-6 ${cols}`}>
      {steps.map((step, i) => {
        const on = i === highlight
        return (
          <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-9 top-[4.75rem] h-[calc(100%-2.75rem)] w-0.5 bg-petrol/20 lg:left-[5.25rem] lg:top-9 lg:h-0.5 lg:w-[calc(100%-3.5rem)]"
              />
            )}
            <span
              className={`relative z-10 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-card ${
                on ? 'bg-petrol' : onPaper ? 'bg-mist' : 'bg-paper'
              }`}
            >
              <Icon name={step.icon} size={44} dark={on} />
            </span>
            <div className="lg:mt-5">
              <h3 className="text-subhead text-deep">
                {numbered && <span className="mr-2 font-extrabold text-petrol">{i + 1}</span>}
                {on ? <span className="highlighter">{step.title}</span> : step.title}
              </h3>
              {step.body && <p className="mt-1.5 text-body text-steel">{step.body}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
