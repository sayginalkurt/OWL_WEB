import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SectionNav } from '../section-nav'

let currentLocale = 'en'
let currentScrollY = 0

const navLabels = {
  en: {
    home: 'Home',
    problem: 'Problem',
  },
  tr: {
    home: 'Anasayfa',
    problem: 'Problem',
  },
} as const

vi.mock('next-intl', () => ({
  useLocale: () => currentLocale,
  useTranslations: () => (key: string) => {
    const labels = navLabels[currentLocale as keyof typeof navLabels]
    return labels[key as keyof typeof labels] ?? key
  },
}))

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

const sectionHeights = [1000, 2200, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]

describe('SectionNav', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 900,
    })

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => currentScrollY,
    })

    let offset = 0
    sectionIds.forEach((id, index) => {
      const section = document.createElement('section')
      const height = sectionHeights[index] ?? 1000
      const sectionOffset = offset

      section.id = id
      Object.defineProperty(section, 'offsetTop', {
        configurable: true,
        get: () => sectionOffset,
      })
      Object.defineProperty(section, 'offsetHeight', {
        configurable: true,
        get: () => height,
      })
      section.getBoundingClientRect = () =>
        ({
          top: sectionOffset - currentScrollY,
          bottom: sectionOffset - currentScrollY + height,
          height,
          left: 0,
          right: 0,
          width: 1200,
          x: 0,
          y: sectionOffset - currentScrollY,
          toJSON: () => ({}),
        }) as DOMRect

      document.body.appendChild(section)
      offset += height
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
    currentLocale = 'en'
    currentScrollY = 0
    vi.unstubAllGlobals()
  })

  it('uses Home as the first English label', () => {
    render(<SectionNav />)

    expect(screen.getByRole('button', { name: 'Go to Home' })).toBeInTheDocument()
  })

  it('uses Anasayfa as the first Turkish label', () => {
    currentLocale = 'tr'

    render(<SectionNav />)

    expect(screen.getByRole('button', { name: 'Go to Anasayfa' })).toBeInTheDocument()
  })

  it('keeps the active item aligned with the section occupying the viewport center', () => {
    currentScrollY = 2500

    render(<SectionNav />)
    fireEvent.scroll(window)

    expect(screen.getByRole('button', { name: 'Go to Problem' })).toHaveAttribute('aria-current', 'location')
  })

  it('clicks through to the section jump handler', () => {
    const scrollToSection = vi.fn()
    ;(window as Window & { __scrollToSection?: (id: string) => void }).__scrollToSection = scrollToSection

    render(<SectionNav />)
    fireEvent.click(screen.getByRole('button', { name: 'Go to Home' }))

    expect(scrollToSection).toHaveBeenCalledWith('hero')
  })
})
