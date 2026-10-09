'use client'

import { useEffect, useRef } from 'react'
import Container from '@/components/ui/Container'

/**
 * The promotional video, straight under the home page hero.
 *
 * It sits across the join between the petrol hero and the mist page, so it
 * reads as part of the opening. It plays muted on a loop, as a product video
 * does, with the controls showing so anyone can pause it or turn the sound
 * on. Visitors who ask for reduced motion get the first frame and press play
 * themselves.
 *
 * Hosted on Cloudinary. The poster is Cloudinary's still of the first frame,
 * so the frame holds its shape before the video loads.
 */

const VIDEO = 'https://res.cloudinary.com/dfzhei0ae/video/upload/v1791534369/masuyo-homepage-web_jffjbw.mp4'
const POSTER = 'https://res.cloudinary.com/dfzhei0ae/video/upload/so_0/v1791534369/masuyo-homepage-web_jffjbw.jpg'

export default function HomeVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {
      // Autoplay refused (some browsers, data saver): the controls are there.
    })
  }, [])

  return (
    <section aria-label="Masuyo in a minute" className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-petrol" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-mist" />
      <Container className="relative">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-card bg-deep ring-1 ring-paper/10">
          <video
            ref={ref}
            className="block aspect-video h-auto w-full bg-deep object-contain"
            src={VIDEO}
            poster={POSTER}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Masuyo promotional video"
          />
        </div>
      </Container>
    </section>
  )
}
