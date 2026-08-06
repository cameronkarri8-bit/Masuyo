'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

/*
  Umami tracker.

  Both variables are NEXT_PUBLIC, so they are inlined at build time rather than
  read at runtime. They have to be referenced as full process.env member
  expressions for that substitution to happen, which is why neither is
  destructured.

  Nothing renders unless both are set, so a local checkout without an .env.local
  does not emit a script tag pointing at undefined.
*/
const SRC = process.env.NEXT_PUBLIC_UMAMI_SRC
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_ID

export default function AnalyticsWrapper() {
  const pathname = usePathname()

  // Private client content. Suppressed the same way the nav and footer are.
  if (pathname.startsWith('/diogenes-proposal')) return null

  if (SRC === undefined || SRC === '' || WEBSITE_ID === undefined || WEBSITE_ID === '') {
    return null
  }

  return <Script src={SRC} data-website-id={WEBSITE_ID} strategy="afterInteractive" />
}
