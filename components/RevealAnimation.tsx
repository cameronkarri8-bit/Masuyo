'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface RevealAnimationProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
  as?: keyof JSX.IntrinsicElements
}

export default function RevealAnimation({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: RevealAnimationProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ''

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </Tag>
  )
}
