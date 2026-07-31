'use client'

import { useEffect, useRef, useState } from 'react'

export interface Stat {
  /** Final numeric value. Animated up from zero on scroll into view. */
  to: number
  /** Appended to the formatted number, for example a percent sign. */
  suffix?: string
  label: string
}

interface StatBandProps {
  stats: Stat[]
  /** Standfirst under the numerals. */
  summary: string
  /** Source attribution. */
  caption: string
}

const DURATION = 900

function format(value: number, suffix: string) {
  return `${value.toLocaleString('en-GB')}${suffix}`
}

/** Ease out cubic. Fast start, gentle settle. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function useCountUp(to: number) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLParagraphElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect a reduced motion preference by skipping straight to the value.
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setValue(to)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return
        hasRun.current = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION)
          setValue(Math.round(easeOut(progress) * to))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to])

  return { value, ref }
}

function StatCell({ stat }: { stat: Stat }) {
  const suffix = stat.suffix ?? ''
  const { value, ref } = useCountUp(stat.to)
  const final = format(stat.to, suffix)

  return (
    <div>
      {/* The animating numeral is hidden from assistive technology so screen
          readers are not read a stream of intermediate values. The final
          figure is exposed once, alongside its label. */}
      <p
        ref={ref}
        aria-hidden="true"
        className="font-poppins font-bold leading-none tracking-tight text-white"
        style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
      >
        {format(value, suffix)}
      </p>
      <p className="mt-3 text-sm leading-snug text-white/70">
        <span className="sr-only">{final} </span>
        {stat.label}
      </p>
    </div>
  )
}

/**
 * Full bleed band of headline figures directly under the hero.
 *
 * Every figure here is sourced. Nothing is estimated or rounded for effect.
 */
export default function StatBand({ stats, summary, caption }: StatBandProps) {
  return (
    <section className="w-full bg-navy py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {stats.map(stat => (
            <StatCell key={stat.label} stat={stat} />
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-[60ch] text-center text-lg leading-relaxed text-white/85">
          {summary}
        </p>
        <p className="mx-auto mt-4 max-w-[60ch] text-center text-xs text-white/50">{caption}</p>
      </div>
    </section>
  )
}
