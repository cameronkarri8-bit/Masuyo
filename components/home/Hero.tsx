import Image from 'next/image'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import { HERO_IMAGE, HERO_IMAGE_ALT, HERO_OBJECT_POSITION_MOBILE } from '@/lib/images'

/**
 * Full bleed homepage hero.
 *
 * The negative top margin pulls the section up under the sticky header so the
 * nav overlays the photograph. The header keeps its place in the document flow,
 * which means no other page needs to know this exists. The inner padding puts
 * the content back below the nav.
 *
 * `id="site-hero"` is the handle Nav observes to decide whether it is currently
 * over the image. Renaming it silently breaks the nav colour swap.
 *
 * The image is the LCP element. It carries `priority`, so Next emits a preload
 * and never lazy loads it.
 */
export default function Hero() {
  return (
    <section
      id="site-hero"
      style={{ ['--hero-pos-mobile' as string]: HERO_OBJECT_POSITION_MOBILE }}
      className="hero-frame on-dark relative -mt-20 flex w-full items-center overflow-hidden"
    >
      <Image
        src={HERO_IMAGE}
        alt={HERO_IMAGE_ALT}
        fill
        priority
        sizes="100vw"
        className="hero-image object-cover"
      />

      {/* Legibility scrim. Decorative, so it is hidden from assistive tech. */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0" />

      <div className="hero-scrim-content relative mx-auto w-full max-w-7xl px-6 pb-10 pt-24 md:px-8">
        <div className="max-w-[34rem]">
          <RevealAnimation>
            <h1 className="max-w-[15ch] text-white hero-display">
              We build digital things that actually work.
            </h1>
            <p className="mt-6 max-w-[46ch] font-sans text-lg leading-relaxed text-white sm:mt-8">
              Websites, marketing and software for growing businesses. Fair prices, no
              jargon, one senior person on every project.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <Link href="/start-a-project" className="btn-primary">
                Get an instant estimate
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to us
              </Link>
            </div>
            <p className="mt-5 font-sans text-base text-white/75 sm:mt-7">
              Websites <span className="font-semibold text-white">from £249</span>. Support
              and growth plans <span className="font-semibold text-white">from £40 per month</span>.
              Every price published.
            </p>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}
