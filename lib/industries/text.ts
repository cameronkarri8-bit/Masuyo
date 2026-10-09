import { CARE_PLANS, careBothText, careFromText, gbp, SYSTEMS, WEBSITES } from '@/lib/pricing'

/**
 * Tokens inside industry copy: [n] source markers and {{price:key}} prices.
 *
 * Prices resolve from lib/pricing.ts, so copy never retypes a figure.
 */

export const PRICE_TOKENS: Record<string, string> = {
  'websites.range': WEBSITES.range,
  'websites.between': WEBSITES.between,
  'websites.from': gbp(WEBSITES.from),
  'websites.to': gbp(WEBSITES.to),
  'systems.from': gbp(SYSTEMS.from),
  'systems.fromText': SYSTEMS.fromText,
  'care.monthly': gbp(CARE_PLANS.care.monthly),
  'carePlus.monthly': gbp(CARE_PLANS.carePlus.monthly),
  'care.fromText': careFromText,
  'care.bothText': careBothText,
}

export type Segment = { kind: 'text'; text: string } | { kind: 'cite'; n: number }

const TOKEN = /\[(\d+)\]|\{\{price:([\w.]+)\}\}/g

/** Splits copy into text and citations, with prices already resolved. */
export function segments(text: string): Segment[] {
  const out: Segment[] = []
  let last = 0
  const push = (t: string) => {
    if (!t) return
    const prev = out[out.length - 1]
    if (prev?.kind === 'text') prev.text += t
    else out.push({ kind: 'text', text: t })
  }
  for (const m of Array.from(text.matchAll(TOKEN))) {
    push(text.slice(last, m.index))
    if (m[1]) {
      // The marker sits after a space in the copy; the link hugs the word instead.
      const prev = out[out.length - 1]
      if (prev?.kind === 'text') prev.text = prev.text.replace(/ +$/, '')
      out.push({ kind: 'cite', n: Number(m[1]) })
    } else {
      const price = PRICE_TOKENS[m[2]]
      if (price === undefined) throw new Error(`Unknown price token "${m[0]}"`)
      push(price)
    }
    last = (m.index ?? 0) + m[0].length
  }
  push(text.slice(last))
  return out
}

/** The text a reader sees, without source markers: for metadata and schema. */
export function plainText(text: string): string {
  return segments(text)
    .map(s => (s.kind === 'text' ? s.text : ''))
    .join('')
    .replace(/ +([.,;:!?])/g, '$1')
    .replace(/ {2,}/g, ' ')
    .trim()
}

/** Every source number cited in a piece of copy. */
export function citations(text: string): number[] {
  return segments(text).flatMap(s => (s.kind === 'cite' ? [s.n] : []))
}
