'use client'

import { useEffect, useRef } from 'react'

/**
 * A 9:16 feature video: muted, looping, inline, and lazy. Nothing downloads
 * until the player nears the screen; the poster shows until it plays. Anyone
 * who prefers reduced motion gets the poster and the controls, and the video
 * stays still unless they press play.
 */
export default function VerticalVideo({ src, poster, label, className = '' }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause()
          return
        }
        if (!video.src) video.src = src
        if (!reduce) video.play().catch(() => {})
      },
      { rootMargin: '200px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <div className={`mx-auto aspect-[9/16] w-full max-w-[20rem] overflow-hidden rounded-card bg-deep ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        controls
        preload="none"
        aria-label={label}
      />
    </div>
  )
}
