import { segments } from '@/lib/industries/text'
import type { IndustrySource } from '@/lib/industries/types'

/**
 * A string of industry copy, with prices filled in from lib/pricing.ts and
 * each [n] marker turned into a small link to that source.
 */
export default function RichText({ text, sources, dark = false }: { text: string; sources: IndustrySource[]; dark?: boolean }) {
  return (
    <>
      {segments(text).map((s, i) => {
        if (s.kind === 'text') return <span key={i}>{s.text}</span>
        const source = sources.find(x => x.n === s.n)
        if (!source) return null
        return (
          <sup key={i} className="ml-0.5 text-[0.7em] font-semibold leading-none">
            <a
              href={source.url}
              rel="noopener"
              aria-label={`Source ${source.n}: ${source.publisher}, ${source.title}`}
              className={`underline decoration-1 underline-offset-2 ${
                dark ? 'text-aqua decoration-aqua/50 hover:decoration-aqua' : 'text-petrol decoration-petrol/40 hover:decoration-petrol'
              }`}
            >
              {source.n}
            </a>
          </sup>
        )
      })}
    </>
  )
}
