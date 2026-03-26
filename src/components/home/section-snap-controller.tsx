'use client'

import { useEffect } from 'react'

const sectionIds = [
  'hero',
  'business-speed',
  'value',
  'product-ecosystem',
  'intelligence-layer',
  'who-we-serve',
  'why-owl',
  'founders',
  'partnerships',
  'agent',
  'contact-demo',
] as const

/**
 * Exposes smooth section-to-section jumps for the side navigation without
 * hijacking the browser's native wheel or keyboard scrolling behavior.
 */
export function SectionSnapController() {
  useEffect(() => {
    const HEADER_HEIGHT = 64 // 4rem

    const getScrollTargets = (): number[] => {
      return sectionIds.map((id) => {
        const el = document.getElementById(id)
        if (!el) return 0
        return Math.max(0, el.offsetTop - HEADER_HEIGHT)
      })
    }

    const scrollToIndex = (index: number) => {
      const targets = getScrollTargets()
      const target = targets[index]
      if (target === undefined) return

      window.scrollTo({
        top: target,
        behavior: 'smooth',
      })
    }

    // Expose a global function for SectionNav to call
    ;(window as unknown as Record<string, unknown>).__scrollToSection = (id: string) => {
      const idx = sectionIds.indexOf(id as typeof sectionIds[number])
      if (idx !== -1) scrollToIndex(idx)
    }

    return () => {
      delete (window as unknown as Record<string, unknown>).__scrollToSection
    }
  }, [])

  return null
}
