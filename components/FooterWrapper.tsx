'use client'

import { usePathname } from 'next/navigation'
import { isProposalRoute } from '@/lib/proposals'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()
  if (isProposalRoute(pathname)) return null
  return <Footer />
}
