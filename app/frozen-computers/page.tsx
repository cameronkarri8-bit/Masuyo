import type { Metadata } from 'next'
import FrozenNav from '@/components/frozen/FrozenNav'
import Hero from '@/components/frozen/Hero'
import TrustStrip from '@/components/frozen/TrustStrip'
import Repairs from '@/components/frozen/Repairs'
import CustomPCs from '@/components/frozen/CustomPCs'
import HowItWorks from '@/components/frozen/HowItWorks'
import Areas from '@/components/frozen/Areas'
import Contact from '@/components/frozen/Contact'
import FrozenFooter from '@/components/frozen/FrozenFooter'
import { BUSINESS } from '@/components/frozen/content'

/**
 * Frozen Computers homepage design concept.
 *
 * A speculative mockup shown to a prospective client. It is not a live client
 * project, Masuyo Digital has no relationship with the business, and the page
 * says so in a notice that is fixed to the top and repeated in the footer.
 *
 * Indexing: noindex and nofollow, and absent from sitemap.ts. It is
 * deliberately NOT disallowed in robots.ts. A disallowed URL cannot be
 * crawled, so the noindex would never be read and the page could still surface
 * from an external link. Leaving it crawlable is what lets the directive do
 * its job. The proposal routes are disallowed instead because they are
 * password gated and there is nothing behind them to read.
 *
 * The page is reachable without a password on purpose, so it opens on a phone
 * from a plain link.
 */
export const metadata: Metadata = {
  title: `${BUSINESS.name} design concept`,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function FrozenComputersPage() {
  return (
    <div className="fc-page">
      <FrozenNav />

      {/* Dark, light, white, dark, frost, white, dark. Alternating bands, one
          idea in each, with the accent used once or twice per band at most. */}
      <Hero />
      <TrustStrip />
      <Repairs />
      <CustomPCs />
      <HowItWorks />
      <Areas />
      <Contact />

      <FrozenFooter />
    </div>
  )
}
