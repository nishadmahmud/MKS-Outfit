'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import * as fbq from '@/lib/fpixel'

export default function ClientLayout({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    fbq.pageview()
  }, [pathname])

  return children
}
