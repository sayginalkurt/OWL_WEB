'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'hero', labelKey: 'home' },
  { id: 'business-speed', labelKey: 'problem' },
  { id: 'value', labelKey: 'value' },
  { id: 'product-ecosystem', labelKey: 'products' },
  { id: 'intelligence-layer', labelKey: 'intelligence' },
  { id: 'who-we-serve', labelKey: 'sectors' },
  { id: 'why-owl', labelKey: 'whyOwl' },
  { id: 'founders', labelKey: 'founders' },
  { id: 'partnerships', labelKey: 'partnerships' },
  { id: 'agent', labelKey: 'agent' },
  { id: 'contact-demo', labelKey: 'contact' },
] as const

export function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const t = useTranslations('home.sectionNav')

  useEffect(() => {
    const updateActive = () => {
      const viewportMidpoint = window.innerHeight * 0.5
      let active = 0
      let closestDist = Infinity

      sections.forEach(({ id }, i) => {
        const el = document.getElementById(id)
        if (!el) return

        const rect = el.getBoundingClientRect()
        if (rect.top <= viewportMidpoint && rect.bottom >= viewportMidpoint) {
          active = i
          closestDist = -1
          return
        }

        if (closestDist === -1) return

        const dist = Math.min(
          Math.abs(rect.top - viewportMidpoint),
          Math.abs(rect.bottom - viewportMidpoint)
        )

        if (dist < closestDist) {
          closestDist = dist
          active = i
        }
      })

      setActiveIndex(active)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  function scrollToSection(id: string) {
    const fn = (window as unknown as Record<string, unknown>).__scrollToSection
    if (typeof fn === 'function') {
      fn(id)
      return
    }

    const el = document.getElementById(id)
    if (el) {
      const top = window.scrollY + el.getBoundingClientRect().top - 64
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end"
    >
      <div className="absolute right-0 top-0 bottom-0 w-px bg-[#1a2640]" />

      {sections.map(({ id, labelKey }, i) => {
        const isActive = activeIndex === i
        const label = t(labelKey)

        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            title={label}
            aria-label={`Go to ${label}`}
            aria-current={isActive ? 'location' : undefined}
            className={cn(
              'relative flex items-center gap-2.5 py-1.5 pr-4 group transition-all duration-300',
              isActive ? 'opacity-100' : 'opacity-25 hover:opacity-60'
            )}
          >
            <span
              className={cn(
                'text-[9px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap',
                isActive
                  ? 'text-chart-3 opacity-100 translate-x-0'
                  : 'text-foreground opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100'
              )}
            >
              {label}
            </span>

            <span
              className={cn(
                'text-[10px] font-bold tracking-[0.15em] transition-colors duration-300 min-w-[1.5rem] text-right',
                isActive ? 'text-chart-3' : 'text-foreground'
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

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
