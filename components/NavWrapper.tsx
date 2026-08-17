'use client'

import { usePathname } from 'next/navigation'
import { isProposalRoute } from '@/lib/proposals'
import Nav from './Nav'

export default function NavWrapper() {
  const pathname = usePathname()
  if (isProposalRoute(pathname)) return null
  return <Nav />
}
