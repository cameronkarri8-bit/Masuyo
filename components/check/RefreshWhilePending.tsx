'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/** While a report is still being put together, look again every ten seconds (for up to five minutes). */
export default function RefreshWhilePending() {
  const router = useRouter()
  useEffect(() => {
    let n = 0
    const timer = setInterval(() => {
      n += 1
      if (n > 30) clearInterval(timer)
      else router.refresh()
    }, 10_000)
    return () => clearInterval(timer)
  }, [router])
  return null
}
