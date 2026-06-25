'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  if (pathname.startsWith('/diogenes-proposal')) return null
  return <Footer />
}
