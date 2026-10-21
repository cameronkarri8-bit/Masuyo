import Image from 'next/image'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'

/**
 * "Hello, I'm Cameron.": who is behind Made in Lancashire, with his photo and
 * his own words on why it exists. Written for the page, from the welcome pack.
 */
export default function FounderNote() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
      <div className="relative mx-auto w-full max-w-[22rem] lg:mx-0">
        <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-card bg-aqua" />
        <Image
          src="/people/cameron.webp"
          alt="Cameron Karri, founder of Masuyo and Made in Lancashire"
          width={900}
          height={1125}
          sizes="(min-width: 1024px) 22rem, 80vw"
          className="relative aspect-[4/5] w-full rounded-card object-cover"
        />
      </div>

      <div>
        <SectionTitle id="founder-title">Hello, I&apos;m Cameron.</SectionTitle>
        <div className="mt-6 max-w-measure space-y-4 text-lead text-steel">
          <p>
            I started Masuyo in 2020, designing for small businesses. That grew into building their websites, and then
            the systems behind them.
          </p>
          <p>
            Today, from Leyland, we build the technology businesses rely on. Made in Lancashire is where we start: backing
            the independents that make our towns what they are, with an eye on taking it across the UK.
          </p>
        </div>
        <blockquote className="ground-dark mt-8 max-w-xl rounded-card bg-petrol p-6 text-paper sm:p-8">
          <span aria-hidden="true" className="block text-[3rem] font-extrabold leading-[0.6] text-aqua">
            &ldquo;
          </span>
          <p className="mt-4 text-subhead text-paper">
            Lancashire&apos;s independents are what make our towns worth visiting. I want more people to find them, and I
            want them to have the same tools as the big names
            <Dot />
          </p>
          <footer className="mt-4 text-small font-semibold text-aqua">Cameron Karri, founder of Masuyo</footer>
        </blockquote>
      </div>
    </div>
  )
}
