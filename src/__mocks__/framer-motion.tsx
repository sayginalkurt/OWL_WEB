import React from 'react'
import { vi } from 'vitest'

// useInView always returns true in tests (elements are always "in view")
export const useInView = vi.fn(() => true)
export const useAnimation = vi.fn(() => ({ start: vi.fn(), stop: vi.fn() }))
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>

// motion.div, motion.span, etc. render as plain HTML elements
export const motion = new Proxy({} as Record<string, React.FC>, {
  get: (_, tag: string) => {
    const Component = React.forwardRef(
      ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { [key: string]: unknown }, ref: React.Ref<HTMLElement>) => {
        // Strip Framer Motion-specific props before passing to DOM
        const { initial, animate, exit, transition, variants, whileHover, whileTap, viewport, ...domProps } = props as Record<string, unknown>
        void initial; void animate; void exit; void transition; void variants; void whileHover; void whileTap; void viewport
        return React.createElement(tag, { ...domProps, ref }, children)
      }
    )
    Component.displayName = `motion.${tag}`
    return Component
  },
})
