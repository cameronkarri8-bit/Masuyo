'use client'

import { usePathname } from 'next/navigation'
import { isStandaloneRoute } from '@/lib/proposals'
import Nav from './Nav'

export default function NavWrapper() {
  const pathname = usePathname()
  if (isStandaloneRoute(pathname)) return null
  return <Nav />
}
