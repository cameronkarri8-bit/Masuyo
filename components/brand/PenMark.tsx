'use client'

import { useEffect, useRef } from 'react'
import { PEN_MARKS, type PenMarkType } from '@/lib/brand/pen-marks'

/**
 * A pen mark: circle, box, underline, arrow and the rest.
 *
 * Petrol pen on light grounds, aqua pen on petrol. Never blurred, glowing or
 * textured. One or two per layout at most.
 *
 * The mark draws itself once as it comes into view, the way a pen would, and
 * is simply there for anyone who prefers reduced motion or has scripting off.
 */
export default function PenMark({
  type,
  tone = 'petrol',
  className = '',
  strokeWidth = 3,
  animate = true,
}: {
  type: PenMarkType
  tone?: 'petrol' | 'aqua' | 'deep'
  className?: string
  strokeWidth?: number
  animate?: boolean
}) {
  const ref = useRef<SVGSVGElement>(null)
  const shape = PEN_MARKS[type]
  const colour = tone === 'aqua' ? '#4FE0E6' : tone === 'deep' ? '#0D1A20' : '#0F3B4F'

  useEffect(() => {
    const el = ref.current
    if (!el || !animate) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-drawn')
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animate])

  return (
    <svg
      ref={ref}
      viewBox={shape.viewBox}
      className={`${animate ? 'pen-draw' : ''} overflow-visible ${className}`}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {shape.strokes.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke={colour}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={animate ? { transitionDelay: `${i * 0.12}s` } : undefined}
        />
      ))}
    </svg>
  )
}
