'use client'

import { usePathname } from 'next/navigation'
import { isStandaloneRoute } from '@/lib/proposals'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  if (isStandaloneRoute(pathname)) return null
  return <Footer />
}
