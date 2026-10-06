'use client'

import { useEffect, useRef } from 'react'

/**
 * Fades content up a few pixels as it enters the screen, once.
 *
 * Nothing loops, bounces or counts. With reduced motion turned on, or with
 * scripting off, the content is simply there.
 */
export default function Rise({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
  /** Stagger, in steps of 80ms. */
  delay?: 0 | 1 | 2 | 3 | 4 | 5
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node
      }}
      className={`rise ${className}`}
      style={delay ? { transitionDelay: `${delay * 80}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
