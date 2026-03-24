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
 * Locks wheel/keyboard scrolling to section-by-section navigation.
 * Calculates scroll targets based on each section's offsetTop so that
 * sticky sections land exactly at their stick position (top: 4rem).
 */
export function SectionSnapController() {
  useEffect(() => {
    // Skip on touch-only devices — let native momentum scrolling work
    if (window.matchMedia('(pointer: coarse)').matches) return

    let locked = false
    let currentIndex = 0
    let unlockTimer: number | undefined
    const HEADER_HEIGHT = 64 // 4rem

    const getScrollTargets = (): number[] => {
      return sectionIds.map((id) => {
        const el = document.getElementById(id)
        if (!el) return 0
        // For the hero (first section), scroll to top of page
        // For sticky sections, scroll to their offsetTop minus header height
        // so they land exactly at their sticky position
        return Math.max(0, el.offsetTop - HEADER_HEIGHT)
      })
    }

    const getCurrentIndex = () => {
      const scrollY = window.scrollY
      const targets = getScrollTargets()
      // Find the closest section to current scroll position
      let closest = 0
      let closestDist = Infinity
      targets.forEach((target, i) => {
        const dist = Math.abs(scrollY - target)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      return closest
    }

    const scrollToIndex = (index: number) => {
      const targets = getScrollTargets()
      const target = targets[index]
      if (target === undefined) return

      locked = true
      currentIndex = index

      window.scrollTo({
        top: target,
        behavior: 'smooth',
      })

      // Unlock after animation completes
      window.clearTimeout(unlockTimer)
      unlockTimer = window.setTimeout(() => {
        locked = false
        // Re-sync in case scroll didn't land exactly
        currentIndex = getCurrentIndex()
      }, 800)
    }

    let wheelDelta = 0
    let wheelTimer: number | undefined

    const onWheel = (e: WheelEvent) => {
      // Don't hijack scrolling inside form elements
      const active = document.activeElement as HTMLElement | null
      if (active && ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName)) return

      e.preventDefault()

      if (locked) return

      // Accumulate delta to handle trackpad inertia
      wheelDelta += e.deltaY
      window.clearTimeout(wheelTimer)
      wheelTimer = window.setTimeout(() => { wheelDelta = 0 }, 150)

      if (Math.abs(wheelDelta) < 50) return

      const direction = wheelDelta > 0 ? 1 : -1
      wheelDelta = 0

      // Re-sync current index from actual scroll position
      currentIndex = getCurrentIndex()
      const nextIndex = Math.max(0, Math.min(sectionIds.length - 1, currentIndex + direction))
      if (nextIndex === currentIndex) return

      scrollToIndex(nextIndex)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (locked) return
      const active = document.activeElement as HTMLElement | null
      if (active && ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName)) return

      let direction = 0
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') direction = 1
      if (e.key === 'ArrowUp' || e.key === 'PageUp') direction = -1
      if (e.key === 'Home') { e.preventDefault(); scrollToIndex(0); return }
      if (e.key === 'End') { e.preventDefault(); scrollToIndex(sectionIds.length - 1); return }
      if (direction === 0) return

      e.preventDefault()
      currentIndex = getCurrentIndex()
      const nextIndex = Math.max(0, Math.min(sectionIds.length - 1, currentIndex + direction))
      if (nextIndex !== currentIndex) scrollToIndex(nextIndex)
    }

    // Expose a global function for SectionNav to call
    ;(window as unknown as Record<string, unknown>).__scrollToSection = (id: string) => {
      const idx = sectionIds.indexOf(id as typeof sectionIds[number])
      if (idx !== -1) scrollToIndex(idx)
    }

    document.addEventListener('wheel', onWheel, { passive: false, capture: true })
    document.addEventListener('keydown', onKeyDown, { capture: true })

    return () => {
      document.removeEventListener('wheel', onWheel, { capture: true })
      document.removeEventListener('keydown', onKeyDown, { capture: true })
      window.clearTimeout(unlockTimer)
      window.clearTimeout(wheelTimer)
      delete (window as unknown as Record<string, unknown>).__scrollToSection
    }
  }, [])

  return null
}
