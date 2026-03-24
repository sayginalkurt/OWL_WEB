'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'business-speed', label: 'Problem' },
  { id: 'value', label: 'Value' },
  { id: 'product-ecosystem', label: 'Products' },
  { id: 'intelligence-layer', label: 'Intelligence' },
  { id: 'who-we-serve', label: 'Sectors' },
  { id: 'why-owl', label: 'Why OWL' },
  { id: 'founders', label: 'Founders' },
  { id: 'partnerships', label: 'Partnerships' },
  { id: 'agent', label: 'Agent' },
  { id: 'contact-demo', label: 'Contact' },
]

export function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const HEADER_HEIGHT = 64

    const updateActive = () => {
      const scrollY = window.scrollY
      let closest = 0
      let closestDist = Infinity
      sections.forEach(({ id }, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const dist = Math.abs(scrollY - (el.offsetTop - HEADER_HEIGHT))
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActiveIndex(closest)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    return () => window.removeEventListener('scroll', updateActive)
  }, [])

  function scrollToSection(id: string) {
    const fn = (window as unknown as Record<string, unknown>).__scrollToSection
    if (typeof fn === 'function') {
      fn(id)
    } else {
      // Fallback: scroll to offset position
      const el = document.getElementById(id)
      if (el) {
        window.scrollTo({ top: Math.max(0, el.offsetTop - 64), behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end"
    >
      {/* Vertical track line */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-[#1a2640]" />

      {sections.map(({ id, label }, i) => {
        const isActive = activeIndex === i
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            title={label}
            aria-label={`Go to ${label}`}
            className={cn(
              'relative flex items-center gap-2.5 py-1.5 pr-4 group transition-all duration-300',
              isActive ? 'opacity-100' : 'opacity-25 hover:opacity-60'
            )}
          >
            {/* Section label — only visible on hover or active */}
            <span
              className={cn(
                'text-[9px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap',
                isActive ? 'text-chart-3 opacity-100 translate-x-0' : 'text-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2'
              )}
            >
              {label}
            </span>

            {/* Number */}
            <span
              className={cn(
                'text-[10px] font-bold tracking-[0.15em] transition-colors duration-300 min-w-[1.5rem] text-right',
                isActive ? 'text-chart-3' : 'text-foreground'
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Tick mark connecting to the track */}
            <span
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 h-px transition-all duration-300',
                isActive ? 'w-3 bg-chart-3' : 'w-1.5 bg-[#3a4a66]'
              )}
            />
          </button>
        )
      })}
    </nav>
  )
}
