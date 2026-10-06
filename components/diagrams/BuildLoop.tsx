import { Dot } from '@/components/ui/SectionTitle'

/**
 * How we build a system: four stages across the page, with a curved arrow
 * running back from stage three to stage two, labelled "feedback each stage".
 * On a phone the stages stack and the loop is said in words.
 */
export interface Stage {
  title: string
  body: string
}

export default function BuildLoop({ stages }: { stages: Stage[] }) {
  return (
    <div className="relative">
      {/* The return arrow, desktop only: from above stage 3 back to stage 2. */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-16 left-[37.5%] hidden h-16 w-1/4 lg:block">
        <svg viewBox="0 0 300 70" preserveAspectRatio="none" className="h-full w-full overflow-visible" fill="none">
          <path
            d="M270 66C262 20 200 8 150 8C100 8 40 20 32 62"
            stroke="#0F3B4F"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M18 50L31 64L44 51" stroke="#0F3B4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="absolute inset-x-0 -top-7 text-center text-small text-petrol">feedback each stage</p>
      </div>

      <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
        {stages.map((stage, i) => (
          <li key={stage.title} className="rounded-card bg-paper p-6">
            <span aria-hidden="true" className="text-title text-petrol">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-subhead text-deep">
              {stage.title}
              <Dot />
            </h3>
            <p className="mt-2 text-body text-steel">{stage.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-body text-steel lg:hidden">
        Stages two and three repeat: each stage goes live, we take your feedback, and it shapes the next one.
      </p>
    </div>
  )
}
