import Icon from '@/components/brand/Icon'
import { Dot } from '@/components/ui/SectionTitle'
import type { BrandIconName } from '@/lib/brand/icons'
import { createPen } from '@/lib/brand/pen'

/**
 * Numbered steps as a row of cards, joined by small hand drawn arrows: across
 * the page on desktop, down the page on a phone.
 *
 * Each card carries its number (Albert Sans extra bold, petrol on light
 * grounds, aqua on petrol) and, when given, a brand icon. A step can be marked
 * `ongoing`, which turns its card petrol and adds an "Ongoing" pill: use it for
 * the step that never finishes, such as Care, so the eye lands on it last.
 *
 * The list is an ordered list, so the sequence is in the markup as well as on
 * screen. The arrows are decoration and hidden from assistive technology.
 */
export interface Step {
  title: string
  body?: React.ReactNode
  icon?: BrandIconName
  ongoing?: boolean
}

/** A short pen arrow, drawn once so it is identical on the server and in the browser. */
const pen = createPen(11, 0.9)
const ARROW_SHAFT = pen.line(2, 12, 30, 12)
const ARROW_HEAD = pen.poly([
  [22, 4],
  [31, 12],
  [22, 20],
])

function Arrow({ dark }: { dark: boolean }) {
  return (
    <svg
      viewBox="0 0 34 24"
      width="34"
      height="24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke={dark ? '#4FE0E6' : '#0F3B4F'}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ARROW_SHAFT} />
      <path d={ARROW_HEAD} />
    </svg>
  )
}

export default function Steps({
  steps,
  dark = false,
  onPaper = false,
  columns,
}: {
  steps: Step[]
  dark?: boolean
  /** On a paper section the cards step down to mist, so they still read as cards. */
  onPaper?: boolean
  columns?: 3 | 4
}) {
  const cols = columns ?? (steps.length >= 4 ? 4 : 3)
  const base = dark ? 'bg-paper/[0.06] ring-1 ring-inset ring-paper/10' : onPaper ? 'bg-mist' : 'bg-paper'

  return (
    <ol className={`grid gap-10 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} lg:gap-10`}>
      {steps.map((step, i) => {
        const solid = step.ongoing && !dark
        const onDark = dark || solid
        const last = i === steps.length - 1
        return (
          <li
            key={step.title}
            className={`relative flex flex-col rounded-card p-6 sm:p-7 ${solid ? 'bg-petrol' : base}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span aria-hidden="true" className={`text-title ${onDark ? 'text-aqua' : 'text-petrol'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {step.icon && <Icon name={step.icon} size={44} dark={onDark} className="-mr-1 -mt-1" />}
            </div>

            <h3 className={`mt-8 text-subhead ${onDark ? 'text-paper' : 'text-deep'}`}>
              {step.title.replace(/\.$/, '')}
              <Dot />
            </h3>
            {step.body && (
              <div className={`mt-2 text-body ${onDark ? 'text-mist' : 'text-steel'}`}>{step.body}</div>
            )}
            {step.ongoing && (
              <span
                className={`mt-6 inline-flex self-start rounded-full px-3 py-1 text-small ${
                  onDark ? 'bg-aqua text-deep' : 'bg-petrol text-paper'
                }`}
              >
                Ongoing
              </span>
            )}

            {/* The joining arrow: in the gap below on a phone, in the gap to the right on desktop. */}
            {!last && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-8 top-full flex h-10 w-[34px] rotate-90 items-center justify-center lg:left-full lg:top-9 lg:h-auto lg:w-10 lg:rotate-0"
              >
                <Arrow dark={dark} />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
