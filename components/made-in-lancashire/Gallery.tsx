'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

/**
 * A member's photos: the cover and up to four more. Swipes on touch (CSS
 * scroll snap), and works with the keyboard through the scrollable region
 * and the numbered buttons.
 */
export default function Gallery({ photos, name }: { photos: string[]; name: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const list = photos.slice(0, 5)
  if (list.length === 0) return null

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label={`Photos of ${name}, ${list.length} in all. Swipe or scroll to see more.`}
        onScroll={e => {
          const el = e.currentTarget
          setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)))
        }}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-card [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {list.map((src, i) => (
          <div key={src} className="w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={i === 0 ? `${name}, the cover photo` : `${name}, photo ${i + 1}`}
              width={1200}
              height={900}
              priority={i === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="aspect-[4/3] h-auto w-full bg-mist object-cover"
            />
          </div>
        ))}
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2" aria-label="Choose a photo">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className={`block h-2.5 rounded-full transition-all ${i === index ? 'w-6 bg-petrol' : 'w-2.5 bg-petrol/30'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
