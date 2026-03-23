import { describe, it, expect } from 'vitest'
import { fadeUp, fadeIn, staggerContainer, sequentialContainer, staggerItem } from '../motion'

describe('motion presets', () => {
  it('fadeUp has hidden and visible states', () => {
    expect(fadeUp.hidden).toEqual({ opacity: 0, y: 20 })
    expect((fadeUp.visible as { opacity: number }).opacity).toBe(1)
    expect((fadeUp.visible as { y: number }).y).toBe(0)
  })

  it('fadeIn only animates opacity', () => {
    expect(fadeIn.hidden).toEqual({ opacity: 0 })
    expect((fadeIn.visible as { opacity: number }).opacity).toBe(1)
    expect((fadeIn.hidden as Record<string, unknown>).y).toBeUndefined()
  })

  it('staggerContainer has staggerChildren 0.08', () => {
    const visible = staggerContainer.visible as { transition: { staggerChildren: number } }
    expect(visible.transition.staggerChildren).toBe(0.08)
  })

  it('sequentialContainer has staggerChildren 0.15', () => {
    const visible = sequentialContainer.visible as { transition: { staggerChildren: number } }
    expect(visible.transition.staggerChildren).toBe(0.15)
  })

  it('staggerItem fades up from y:16', () => {
    expect((staggerItem.hidden as { y: number }).y).toBe(16)
    expect((staggerItem.visible as { y: number }).y).toBe(0)
  })
})
