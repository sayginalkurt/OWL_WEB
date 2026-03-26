import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SectionSnapController } from '../section-snap-controller'

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

describe('SectionSnapController', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))
    )

    vi.stubGlobal('scrollTo', vi.fn())

    sectionIds.forEach((id, index) => {
      const section = document.createElement('section')
      section.id = id
      Object.defineProperty(section, 'offsetTop', {
        configurable: true,
        get: () => index * 1000,
      })
      document.body.appendChild(section)
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.unstubAllGlobals()
  })

  it('does not hijack wheel scrolling at the document level', () => {
    render(<SectionSnapController />)

    const event = new WheelEvent('wheel', { deltaY: 120, cancelable: true })
    document.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(false)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('still exposes direct section navigation for the side nav', () => {
    render(<SectionSnapController />)

    const scrollToSection = (window as Window & { __scrollToSection?: (id: string) => void }).__scrollToSection
    expect(scrollToSection).toBeTypeOf('function')

    scrollToSection?.('product-ecosystem')

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 2936,
      behavior: 'smooth',
    })
  })
})
