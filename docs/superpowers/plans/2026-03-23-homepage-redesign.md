# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing inline homepage with a 12-section, scroll-based narrative landing page for OWL Intelligence using Framer Motion animations, a dark/light alternating layout, and modular section components.

**Architecture:** `page.tsx` remains a server component that fetches all translations via `getTranslations` and passes them as props to client section components. Each section is a separate `"use client"` component under `src/components/home/`. Shared presentational primitives (`SectionContainer`, `Eyebrow`, `SectionHeading`) are server components. Animation utilities live in `src/lib/motion.ts`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, next-intl 4, lucide-react, next/image

**Spec:** `docs/superpowers/specs/2026-03-23-homepage-redesign.md`

---

## Task 1: Test infrastructure

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/__mocks__/framer-motion.tsx`
- Modify: `package.json` (add devDependencies + test script)

- [ ] **Step 1.1: Install test dependencies**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: packages added to `devDependencies` in `package.json`.

- [ ] **Step 1.2: Create vitest config**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 1.3: Create test setup file**

Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'

// Mock IntersectionObserver (not available in jsdom)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return [] }
} as unknown as typeof IntersectionObserver

// Mock next/image globally
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: {
    src: string; alt: string; width?: number; height?: number; className?: string
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}))

// Mock next/link globally
vi.mock('next/link', () => ({
  default: ({ href, children, className }: {
    href: string; children: React.ReactNode; className?: string
  }) => <a href={href} className={className}>{children}</a>,
}))
```

- [ ] **Step 1.4: Create Framer Motion mock**

Create `src/__mocks__/framer-motion.tsx`:
```typescript
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
```

- [ ] **Step 1.5: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 1.6: Run tests to confirm setup works**

```bash
pnpm test
```

Expected: `0 test files found` (no tests yet — this confirms vitest runs without errors).

- [ ] **Step 1.7: Commit**

```bash
git add vitest.config.ts src/test/setup.ts src/__mocks__/framer-motion.tsx package.json pnpm-lock.yaml
git commit -m "feat: add vitest + react testing library test infrastructure"
```

---

## Task 2: CSS custom properties

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 2.1: Locate the `@theme inline` block in globals.css**

Open `src/app/globals.css`. Find the `@theme inline {` block.

- [ ] **Step 2.2: Add dark section and brand color tokens**

Inside the `@theme inline` block, after the last existing variable, add:

```css
  /* ── Homepage dark section backgrounds ── */
  --color-dark-base: #07090f;
  --color-dark-mid: #0d1422;
  --color-dark-surface: #0e1624;
  --color-dark-border: #1a2640;

  /* ── OWL brand colors (logo/wordmark only) ── */
  --color-owl-gold: #d3af37;
  --color-owl-navy: #292d69;
```

These become Tailwind utilities: `bg-dark-base`, `bg-dark-mid`, `bg-dark-surface`, `border-dark-border`, `text-owl-gold`, `text-owl-navy`.

- [ ] **Step 2.3: Verify Tailwind picks up the new tokens**

```bash
pnpm dev
```

Open the browser DevTools and inspect any element. In the Tailwind stylesheet, search for `dark-base`. Confirm it appears. Stop the dev server.

- [ ] **Step 2.4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add dark section and OWL brand color tokens to Tailwind theme"
```

---

## Task 3: Font config + image assets

**Files:**
- Modify: `src/app/layout.tsx`
- Copy: `owlcontent/images/*` → `public/images/`

- [ ] **Step 3.1: Verify Geist font includes weight 800**

Open `src/app/layout.tsx`. Find the Geist import. If it looks like:
```typescript
const geist = Geist({ subsets: ['latin'] })
```
Update it to explicitly include all needed weights:
```typescript
const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})
```

If it already specifies weights, verify `'800'` is included.

- [ ] **Step 3.2: Copy image assets to public/images/**

```bash
mkdir -p public/images
cp owlcontent/images/owlgold.svg public/images/owlgold.svg
cp owlcontent/images/owlnavy.svg public/images/owlnavy.svg
cp owlcontent/images/fwbmlogo.svg public/images/fwbmlogo.svg
cp owlcontent/images/fuzzyowl.png public/images/fuzzyowl.png
cp owlcontent/images/beyzapolat.png public/images/beyzapolat.png
cp owlcontent/images/sayginalkurt.png public/images/sayginalkurt.png
```

- [ ] **Step 3.3: Verify images are accessible**

```bash
pnpm dev
```

Open `http://localhost:3000/images/beyzapolat.png` in the browser. Confirm the image loads. Stop dev server.

- [ ] **Step 3.4: Commit**

```bash
git add src/app/layout.tsx public/images/
git commit -m "feat: include Geist weight 800 and copy brand assets to public/images"
```

---

## Task 4: Motion presets

**Files:**
- Create: `src/lib/motion.ts`
- Create: `src/lib/__tests__/motion.test.ts`

- [ ] **Step 4.1: Write the failing test**

Create `src/lib/__tests__/motion.test.ts`:
```typescript
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
```

- [ ] **Step 4.2: Run to confirm failure**

```bash
pnpm test
```

Expected: FAIL — `Cannot find module '../motion'`

- [ ] **Step 4.3: Create motion.ts**

Create `src/lib/motion.ts`:
```typescript
import { type Variants } from 'framer-motion'

/** Default entrance: fade + translate up */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Fade only — no translation */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

/** Stagger container — 80ms between children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/** Sequential container — 150ms between children (stack layers, timeline steps) */
export const sequentialContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

/** Child item for stagger/sequential containers */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}
```

- [ ] **Step 4.4: Run tests to confirm passing**

```bash
pnpm test
```

Expected: PASS — 5 tests pass.

- [ ] **Step 4.5: Commit**

```bash
git add src/lib/motion.ts src/lib/__tests__/motion.test.ts
git commit -m "feat: add Framer Motion presets to src/lib/motion.ts"
```

---

## Task 5: Shared server components (SectionContainer, Eyebrow, SectionHeading)

**Files:**
- Create: `src/components/home/shared/section-container.tsx`
- Create: `src/components/home/shared/eyebrow.tsx`
- Create: `src/components/home/shared/section-heading.tsx`
- Create: `src/components/home/shared/__tests__/section-container.test.tsx`
- Create: `src/components/home/shared/__tests__/eyebrow.test.tsx`

- [ ] **Step 5.1: Write tests**

Create `src/components/home/shared/__tests__/section-container.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { SectionContainer } from '../section-container'

describe('SectionContainer', () => {
  it('renders children', () => {
    render(<SectionContainer><p>content</p></SectionContainer>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('applies dark background when dark prop is true', () => {
    const { container } = render(<SectionContainer dark><p>x</p></SectionContainer>)
    expect(container.firstChild).toHaveClass('bg-dark-mid')
  })

  it('applies light background by default', () => {
    const { container } = render(<SectionContainer><p>x</p></SectionContainer>)
    expect(container.firstChild).toHaveClass('bg-background')
  })

  it('accepts an id prop for anchor links', () => {
    const { container } = render(<SectionContainer id="hero"><p>x</p></SectionContainer>)
    expect(container.firstChild).toHaveAttribute('id', 'hero')
  })
})
```

Create `src/components/home/shared/__tests__/eyebrow.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { Eyebrow } from '../eyebrow'

describe('Eyebrow', () => {
  it('renders text', () => {
    render(<Eyebrow>WHO WE SERVE</Eyebrow>)
    expect(screen.getByText('WHO WE SERVE')).toBeInTheDocument()
  })

  it('renders with dot prefix by default', () => {
    const { container } = render(<Eyebrow dot>LABEL</Eyebrow>)
    expect(container.querySelector('[aria-hidden]')).toBeInTheDocument()
  })
})
```

- [ ] **Step 5.2: Run to confirm failure**

```bash
pnpm test
```

Expected: FAIL — modules not found.

- [ ] **Step 5.3: Create SectionContainer**

Create `src/components/home/shared/section-container.tsx`:
```typescript
import { cn } from '@/lib/utils'

interface SectionContainerProps {
  dark?: boolean
  className?: string
  children: React.ReactNode
  id?: string
}

export function SectionContainer({ dark, className, children, id }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn('w-full', dark ? 'bg-dark-mid' : 'bg-background', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {children}
      </div>
    </section>
  )
}
```

- [ ] **Step 5.4: Create Eyebrow**

Create `src/components/home/shared/eyebrow.tsx`:
```typescript
import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  dot?: boolean
  dark?: boolean
  className?: string
}

export function Eyebrow({ children, dot, dark, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase mb-4',
        dark ? 'text-chart-3' : 'text-muted-foreground',
        className,
      )}
    >
      {dot && (
        <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      )}
      {children}
    </p>
  )
}
```

- [ ] **Step 5.5: Create SectionHeading**

Create `src/components/home/shared/section-heading.tsx`:
```typescript
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  children: React.ReactNode
  dark?: boolean
  className?: string
}

export function SectionHeading({ children, dark, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]',
        dark ? 'text-[#f0f0f0]' : 'text-foreground',
        className,
      )}
    >
      {children}
    </h2>
  )
}
```

- [ ] **Step 5.6: Run tests**

```bash
pnpm test
```

Expected: PASS — all tests pass.

- [ ] **Step 5.7: Commit**

```bash
git add src/components/home/shared/
git commit -m "feat: add SectionContainer, Eyebrow, SectionHeading shared components"
```

---

## Task 6: RevealWrapper (client component)

**Files:**
- Create: `src/components/home/shared/reveal-wrapper.tsx`
- Create: `src/components/home/shared/__tests__/reveal-wrapper.test.tsx`

- [ ] **Step 6.1: Write the test**

Create `src/components/home/shared/__tests__/reveal-wrapper.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { RevealWrapper } from '../reveal-wrapper'

describe('RevealWrapper', () => {
  it('renders children', () => {
    render(<RevealWrapper><p>visible content</p></RevealWrapper>)
    expect(screen.getByText('visible content')).toBeInTheDocument()
  })

  it('accepts a className prop', () => {
    const { container } = render(
      <RevealWrapper className="custom-class"><p>x</p></RevealWrapper>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with fadeIn variant without crashing', () => {
    render(<RevealWrapper variant="fadeIn"><p>fadeIn content</p></RevealWrapper>)
    expect(screen.getByText('fadeIn content')).toBeInTheDocument()
  })

  it('renders with a delay without crashing', () => {
    render(<RevealWrapper delay={0.3}><p>delayed</p></RevealWrapper>)
    expect(screen.getByText('delayed')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6.2: Run to confirm failure**

```bash
pnpm test
```

Expected: FAIL — `Cannot find module '../reveal-wrapper'`

- [ ] **Step 6.3: Create RevealWrapper**

Create `src/components/home/shared/reveal-wrapper.tsx`:
```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { fadeUp, fadeIn, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'

const variantMap = { fadeUp, fadeIn, staggerItem } satisfies Record<string, Variants>

interface RevealWrapperProps {
  children: React.ReactNode
  variant?: keyof typeof variantMap
  delay?: number
  className?: string
}

export function RevealWrapper({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
}: RevealWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const base = variantMap[variant]
  const resolved: Variants = delay
    ? {
        ...base,
        visible: {
          ...(base.visible as object),
          transition: {
            ...((base.visible as { transition?: object }).transition ?? {}),
            delay,
          },
        },
      }
    : base

  return (
    <motion.div
      ref={ref}
      variants={resolved}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 6.4: Run tests**

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 6.5: Commit**

```bash
git add src/components/home/shared/reveal-wrapper.tsx src/components/home/shared/__tests__/reveal-wrapper.test.tsx
git commit -m "feat: add RevealWrapper scroll-reveal component"
```

---

## Task 7: ScrollCue

**Files:**
- Create: `src/components/home/shared/scroll-cue.tsx`
- Create: `src/components/home/shared/__tests__/scroll-cue.test.tsx`

- [ ] **Step 7.1: Write test**

Create `src/components/home/shared/__tests__/scroll-cue.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { ScrollCue } from '../scroll-cue'

describe('ScrollCue', () => {
  it('renders SCROLL label', () => {
    render(<ScrollCue />)
    expect(screen.getByText('SCROLL')).toBeInTheDocument()
  })

  it('has aria-hidden on decorative elements', () => {
    const { container } = render(<ScrollCue />)
    // The container itself should be aria-hidden since it's decorative
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})
```

- [ ] **Step 7.2: Run to confirm failure**

```bash
pnpm test
```

Expected: FAIL.

- [ ] **Step 7.3: Create ScrollCue**

Create `src/components/home/shared/scroll-cue.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollCueProps {
  className?: string
}

export function ScrollCue({ className }: ScrollCueProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('flex flex-col items-center gap-2 mt-12', className)}
    >
      {/* Vertical hairline */}
      <div className="w-px h-10 bg-gradient-to-b from-transparent to-chart-3" />
      {/* Animated dot */}
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-chart-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Label */}
      <span className="text-[10px] tracking-widest text-[#3a4a66] uppercase mt-1">
        SCROLL
      </span>
    </div>
  )
}
```

- [ ] **Step 7.4: Run tests**

```bash
pnpm test
```

Expected: PASS.

- [ ] **Step 7.5: Commit**

```bash
git add src/components/home/shared/scroll-cue.tsx src/components/home/shared/__tests__/scroll-cue.test.tsx
git commit -m "feat: add ScrollCue animated scroll indicator component"
```

---

## Task 8: HeroSection

**Files:**
- Create: `src/components/home/hero-section.tsx`
- Create: `src/components/home/__tests__/hero-section.test.tsx`

Props come from `page.tsx` via `getTranslations`. No translation calls inside the component.

- [ ] **Step 8.1: Write test**

Create `src/components/home/__tests__/hero-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { HeroSection } from '../hero-section'

const defaultProps = {
  eyebrow: 'Next-Gen Research',
  headline: 'Advanced Analytics Grounded in Field Data',
  body: 'OWL Intelligence develops decision-support products.',
  ctaPrimary: 'Explore Products',
  ctaSecondary: 'Talk to Our Agent',
  metrics: [
    { value: '81', label: 'Provinces of field coverage' },
    { value: '15+', label: 'Years of experience' },
    { value: '2', label: 'AI-supported products' },
  ],
}

describe('HeroSection', () => {
  it('renders the headline', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(defaultProps.headline)
  })

  it('renders both CTA buttons', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByRole('link', { name: defaultProps.ctaPrimary })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Talk to Our Agent/i })).toBeInTheDocument()
  })

  it('renders all three metric values', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText('81')).toBeInTheDocument()
    expect(screen.getByText('15+')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders metric labels', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText('Provinces of field coverage')).toBeInTheDocument()
  })

  it('renders the eyebrow', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText('Next-Gen Research')).toBeInTheDocument()
  })
})
```

- [ ] **Step 8.2: Run to confirm failure**

```bash
pnpm test src/components/home/__tests__/hero-section.test.tsx
```

Expected: FAIL.

- [ ] **Step 8.3: Create HeroSection**

Create `src/components/home/hero-section.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Eyebrow } from './shared/eyebrow'
import { ScrollCue } from './shared/scroll-cue'
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion'

interface MetricCard {
  value: string
  label: string
}

interface HeroSectionProps {
  eyebrow: string
  headline: string
  body: string
  ctaPrimary: string
  ctaSecondary: string
  metrics: [MetricCard, MetricCard, MetricCard]
}

export function HeroSection({ eyebrow, headline, body, ctaPrimary, ctaSecondary, metrics }: HeroSectionProps) {
  return (
    <section
      className="w-full min-h-[90vh] flex items-center"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, #0d1422 0%, #07090f 70%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">

          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={staggerItem}>
              <Eyebrow dot dark>{eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#f0f0f0] mt-2 max-w-2xl"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-base lg:text-lg text-[#5a6888] leading-relaxed mt-6 max-w-xl"
            >
              {body}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mt-8">
              <Button asChild>
                <Link href="/products">{ctaPrimary}</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#1a2640] text-[#8899bb] hover:bg-dark-surface hover:text-[#f0f0f0]">
                <Link href="/agent">{ctaSecondary} →</Link>
              </Button>
            </motion.div>

            <motion.div variants={staggerItem}>
              <ScrollCue />
            </motion.div>
          </motion.div>

          {/* Right column — metric cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col gap-4"
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="rounded-lg bg-dark-surface border border-dark-border p-5"
              >
                <p className="text-3xl font-bold tracking-tight text-chart-2">{metric.value}</p>
                <p className="text-sm text-[#5a6888] mt-1 leading-snug">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8.4: Run tests**

```bash
pnpm test src/components/home/__tests__/hero-section.test.tsx
```

Expected: PASS — 5 tests pass.

- [ ] **Step 8.5: Commit**

```bash
git add src/components/home/hero-section.tsx src/components/home/__tests__/hero-section.test.tsx
git commit -m "feat: add HeroSection component"
```

---

## Task 9: BusinessSpeedSection

**Files:**
- Create: `src/components/home/business-speed-section.tsx`
- Create: `src/components/home/__tests__/business-speed-section.test.tsx`

- [ ] **Step 9.1: Write test**

Create `src/components/home/__tests__/business-speed-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { BusinessSpeedSection } from '../business-speed-section'

const props = {
  eyebrow: 'Business Moves Faster Than Traditional Data',
  statements: [
    'Static measurement cannot keep pace with changing conditions.',
    'Delayed signals weaken response quality.',
    'Better decisions require higher-frequency, ground-level evidence.',
  ] as [string, string, string],
}

describe('BusinessSpeedSection', () => {
  it('renders the eyebrow', () => {
    render(<BusinessSpeedSection {...props} />)
    expect(screen.getByText(props.eyebrow)).toBeInTheDocument()
  })

  it('renders all three statements', () => {
    render(<BusinessSpeedSection {...props} />)
    props.statements.forEach(s => {
      expect(screen.getByText(s)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 9.2: Run to confirm failure**

```bash
pnpm test src/components/home/__tests__/business-speed-section.test.tsx
```

- [ ] **Step 9.3: Create BusinessSpeedSection**

Create `src/components/home/business-speed-section.tsx`:
```typescript
'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { RevealWrapper } from './shared/reveal-wrapper'

interface BusinessSpeedSectionProps {
  eyebrow: string
  statements: [string, string, string]
}

export function BusinessSpeedSection({ eyebrow, statements }: BusinessSpeedSectionProps) {
  return (
    <SectionContainer>
      <div className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="flex flex-col gap-8 mt-10">
          {statements.map((statement, i) => (
            <RevealWrapper key={i} delay={i * 0.1}>
              <p className="text-2xl lg:text-3xl font-semibold leading-snug text-foreground border-l-2 border-chart-3 pl-6 py-2">
                {statement}
              </p>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
```

- [ ] **Step 9.4: Run tests and commit**

```bash
pnpm test src/components/home/__tests__/business-speed-section.test.tsx
git add src/components/home/business-speed-section.tsx src/components/home/__tests__/business-speed-section.test.tsx
git commit -m "feat: add BusinessSpeedSection component"
```

---

## Task 10: ValueSection

**Files:**
- Create: `src/components/home/value-section.tsx`
- Create: `src/components/home/__tests__/value-section.test.tsx`

- [ ] **Step 10.1: Write test**

Create `src/components/home/__tests__/value-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { ValueSection } from '../value-section'

const props = {
  eyebrow: 'How OWL Intelligence Creates Value',
  heading: 'Measurement, analytics, and AI in one decision-support layer',
  body: 'OWL Intelligence brings measurement, analytics, and AI together.',
  columns: [
    { title: 'Measurement', body: 'Continuous real-world monitoring.' },
    { title: 'Analytics', body: 'Transforms data into decisions.' },
    { title: 'AI', body: 'Governed AI interpretation layer.' },
  ] as [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }],
}

describe('ValueSection', () => {
  it('renders heading', () => {
    render(<ValueSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(props.heading)
  })

  it('renders all 3 column titles', () => {
    render(<ValueSection {...props} />)
    expect(screen.getByText('Measurement')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
  })
})
```

- [ ] **Step 10.2: Run to confirm failure**

```bash
pnpm test src/components/home/__tests__/value-section.test.tsx
```

- [ ] **Step 10.3: Create ValueSection**

Create `src/components/home/value-section.tsx`:
```typescript
'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface ValueColumn {
  title: string
  body: string
}

interface ValueSectionProps {
  eyebrow: string
  heading: string
  body: string
  columns: [ValueColumn, ValueColumn, ValueColumn]
}

export function ValueSection({ eyebrow, heading, body, columns }: ValueSectionProps) {
  return (
    <SectionContainer>
      <div className="max-w-2xl mx-auto text-center mb-16">
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <SectionHeading>{heading}</SectionHeading>
        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mt-6">{body}</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {columns.map((col, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className="border-l-2 border-chart-3 pl-5 py-1">
              <h3 className="text-base font-bold text-foreground">{col.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{col.body}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </SectionContainer>
  )
}
```

- [ ] **Step 10.4: Run tests and commit**

```bash
pnpm test src/components/home/__tests__/value-section.test.tsx
git add src/components/home/value-section.tsx src/components/home/__tests__/value-section.test.tsx
git commit -m "feat: add ValueSection component"
```

---

## Task 11: ProductEcosystemSection

**Files:**
- Create: `src/components/home/product-ecosystem-section.tsx`
- Create: `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 11.1: Write test**

Create `src/components/home/__tests__/product-ecosystem-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { ProductEcosystemSection } from '../product-ecosystem-section'

const props = {
  eyebrow: 'Product Ecosystem',
  heading: 'An integrated structure',
  intro: 'Our product ecosystem provides an integrated structure.',
  products: [
    {
      logoSrc: '/images/fwbmlogo.svg',
      logoAlt: 'FWBM',
      name: 'Financial Well-Being Monitor',
      descriptor: 'Next-generation household financial resilience.',
      layers: [
        'Validated Field Data',
        'Structured Analytics',
        'Decision Infrastructure',
      ] as [string, string, string],
    },
    {
      logoSrc: '/images/fuzzyowl.png',
      logoAlt: 'FuzzyOwl',
      name: 'FuzzyOwl',
      descriptor: 'Makes visible which variables shape decisions.',
      layers: [
        'Relational Mapping',
        'AI-Supported Analytics',
        'Scenario Simulation',
      ] as [string, string, string],
    },
  ] as [typeof props['products'][0], typeof props['products'][0]],
}

describe('ProductEcosystemSection', () => {
  it('renders both product names', () => {
    render(<ProductEcosystemSection {...props} />)
    expect(screen.getByText('Financial Well-Being Monitor')).toBeInTheDocument()
    expect(screen.getByText('FuzzyOwl')).toBeInTheDocument()
  })

  it('renders layer pills', () => {
    render(<ProductEcosystemSection {...props} />)
    expect(screen.getByText('Validated Field Data')).toBeInTheDocument()
    expect(screen.getByText('Relational Mapping')).toBeInTheDocument()
  })

  it('renders product logos with alt text', () => {
    render(<ProductEcosystemSection {...props} />)
    expect(screen.getByAltText('FWBM')).toBeInTheDocument()
    expect(screen.getByAltText('FuzzyOwl')).toBeInTheDocument()
  })
})
```

- [ ] **Step 11.2: Run to confirm failure**

```bash
pnpm test src/components/home/__tests__/product-ecosystem-section.test.tsx
```

- [ ] **Step 11.3: Create ProductEcosystemSection**

Create `src/components/home/product-ecosystem-section.tsx`:
```typescript
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'
import { sequentialContainer, staggerItem } from '@/lib/motion'

interface ProductLayer {
  logoSrc: string
  logoAlt: string
  name: string
  descriptor: string
  layers: [string, string, string]
}

interface ProductEcosystemSectionProps {
  eyebrow: string
  heading: string
  intro: string
  products: [ProductLayer, ProductLayer]
}

function ProductStack({ product }: { product: ProductLayer }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <Image src={product.logoSrc} alt={product.logoAlt} width={32} height={32} className="rounded" />
        <h3 className="text-base font-bold text-[#f0f0f0]">{product.name}</h3>
      </div>
      <p className="text-sm text-[#5a6888] max-w-sm mb-5">{product.descriptor}</p>
      <motion.div
        ref={ref}
        variants={sequentialContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-col gap-2"
      >
        {product.layers.map((layer, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="w-full rounded-md px-4 py-2.5 text-sm font-medium bg-dark-surface border border-dark-border text-[#5a7aaa] flex items-center gap-3"
          >
            <span className="text-chart-3 font-bold text-[11px] tracking-widest flex-shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            {layer}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function ProductEcosystemSection({ eyebrow, heading, intro, products }: ProductEcosystemSectionProps) {
  return (
    <SectionContainer dark>
      <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">
        <div>
          <Eyebrow dot dark>{eyebrow}</Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-sm text-[#5a6888] leading-relaxed mt-4">{intro}</p>
        </div>
        <div className="flex flex-col gap-12">
          {products.map((product, i) => (
            <RevealWrapper key={i} delay={i * 0.1}>
              <ProductStack product={product} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
```

- [ ] **Step 11.4: Run tests and commit**

```bash
pnpm test src/components/home/__tests__/product-ecosystem-section.test.tsx
git add src/components/home/product-ecosystem-section.tsx src/components/home/__tests__/product-ecosystem-section.test.tsx
git commit -m "feat: add ProductEcosystemSection with layered stack diagram"
```

---

## Task 12: IntelligenceLayerSection

**Files:**
- Create: `src/components/home/intelligence-layer-section.tsx`
- Create: `src/components/home/__tests__/intelligence-layer-section.test.tsx`

- [ ] **Step 12.1: Write test**

Create `src/components/home/__tests__/intelligence-layer-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { IntelligenceLayerSection } from '../intelligence-layer-section'

const mockSteps = Array.from({ length: 8 }, (_, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title: `Step ${i + 1} Title`,
  body: `Step ${i + 1} body text.`,
})) as [
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
]

const props = {
  eyebrow: 'How Our Intelligence Layer Works',
  heading: 'Eight integrated stages',
  steps: mockSteps,
}

describe('IntelligenceLayerSection', () => {
  it('renders the heading', () => {
    render(<IntelligenceLayerSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Eight integrated stages')
  })

  it('renders all 8 step titles', () => {
    render(<IntelligenceLayerSection {...props} />)
    mockSteps.forEach(step => {
      expect(screen.getByText(step.title)).toBeInTheDocument()
    })
  })

  it('renders step numbers', () => {
    render(<IntelligenceLayerSection {...props} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('08')).toBeInTheDocument()
  })
})
```

- [ ] **Step 12.2: Run to confirm failure**

```bash
pnpm test src/components/home/__tests__/intelligence-layer-section.test.tsx
```

- [ ] **Step 12.3: Create IntelligenceLayerSection**

Create `src/components/home/intelligence-layer-section.tsx`:
```typescript
'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface IntelligenceStep {
  number: string
  title: string
  body: string
}

interface IntelligenceLayerSectionProps {
  eyebrow: string
  heading: string
  steps: [
    IntelligenceStep, IntelligenceStep, IntelligenceStep, IntelligenceStep,
    IntelligenceStep, IntelligenceStep, IntelligenceStep, IntelligenceStep,
  ]
}

export function IntelligenceLayerSection({ eyebrow, heading, steps }: IntelligenceLayerSectionProps) {
  const leftSteps = steps.slice(0, 4)
  const rightSteps = steps.slice(4, 8)

  return (
    <SectionContainer dark>
      <div className="mb-16">
        <Eyebrow dot dark>{eyebrow}</Eyebrow>
        <SectionHeading dark>{heading}</SectionHeading>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10">
        <div className="flex flex-col gap-10">
          {leftSteps.map((step, i) => (
            <RevealWrapper key={step.number} delay={i * 0.1}>
              <div>
                <span className="block text-[11px] font-bold tracking-widest text-chart-3 mb-1">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-[#ccd]">{step.title}</h3>
                <p className="text-sm text-[#5a6888] leading-relaxed mt-2">{step.body}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          {rightSteps.map((step, i) => (
            <RevealWrapper key={step.number} delay={0.2 + i * 0.1}>
              <div>
                <span className="block text-[11px] font-bold tracking-widest text-chart-3 mb-1">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-[#ccd]">{step.title}</h3>
                <p className="text-sm text-[#5a6888] leading-relaxed mt-2">{step.body}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
```

- [ ] **Step 12.4: Run tests and commit**

```bash
pnpm test src/components/home/__tests__/intelligence-layer-section.test.tsx
git add src/components/home/intelligence-layer-section.tsx src/components/home/__tests__/intelligence-layer-section.test.tsx
git commit -m "feat: add IntelligenceLayerSection with 8-step annotated layout"
```

---

## Task 13: WhoWeServeSection

**Files:**
- Create: `src/components/home/who-we-serve-section.tsx`
- Create: `src/components/home/__tests__/who-we-serve-section.test.tsx`

- [ ] **Step 13.1: Write test**

Create `src/components/home/__tests__/who-we-serve-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { WhoWeServeSection } from '../who-we-serve-section'

const props = {
  eyebrow: 'Who We Serve',
  heading: 'Built for institutions',
  context: 'Nine sectors.',
  sectors: [
    'Finance and Banking', 'Insurance', 'Retail',
    'Fast-Moving Consumer Goods', 'E-Commerce',
    'Durable Goods and Home Appliances', 'Real Estate',
    'Technology and Telecommunications', 'International Organizations',
  ] as [string,string,string,string,string,string,string,string,string],
}

describe('WhoWeServeSection', () => {
  it('renders heading', () => {
    render(<WhoWeServeSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Built for institutions')
  })

  it('renders all 9 sector pills', () => {
    render(<WhoWeServeSection {...props} />)
    expect(screen.getByText('Finance and Banking')).toBeInTheDocument()
    expect(screen.getByText('International Organizations')).toBeInTheDocument()
  })
})
```

- [ ] **Step 13.2: Run to confirm failure**

```bash
pnpm test src/components/home/__tests__/who-we-serve-section.test.tsx
```

- [ ] **Step 13.3: Create WhoWeServeSection**

Create `src/components/home/who-we-serve-section.tsx`:
```typescript
'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface WhoWeServeSectionProps {
  eyebrow: string
  heading: string
  context: string
  sectors: [string,string,string,string,string,string,string,string,string]
}

export function WhoWeServeSection({ eyebrow, heading, context, sectors }: WhoWeServeSectionProps) {
  return (
    <SectionContainer>
      <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-start">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading>{heading}</SectionHeading>
          <p className="text-muted-foreground mt-4 text-sm">{context}</p>
        </div>
        <RevealWrapper>
          <div className="flex flex-wrap gap-3">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-chart-3 hover:text-chart-3 cursor-default"
              >
                {sector}
              </span>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
```

- [ ] **Step 13.4: Run tests and commit**

```bash
pnpm test src/components/home/__tests__/who-we-serve-section.test.tsx
git add src/components/home/who-we-serve-section.tsx src/components/home/__tests__/who-we-serve-section.test.tsx
git commit -m "feat: add WhoWeServeSection with 9 sector pills"
```

---

## Task 14: WhyOwlSection

**Files:**
- Create: `src/components/home/why-owl-section.tsx`
- Create: `src/components/home/__tests__/why-owl-section.test.tsx`

- [ ] **Step 14.1: Write test**

Create `src/components/home/__tests__/why-owl-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { WhyOwlSection } from '../why-owl-section'

const props = {
  eyebrow: 'Why OWL Intelligence',
  heading: 'Not a research firm.',
  intro: 'Unlike conventional research firms.',
  differentiators: [
    { title: 'Methodology', body: 'Deep methodological expertise.' },
    { title: 'Advanced Analytics', body: 'Transforms data into decisions.' },
    { title: 'AI Infrastructure', body: 'Developed in-house.' },
  ] as [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }],
}

describe('WhyOwlSection', () => {
  it('renders heading', () => {
    render(<WhyOwlSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Not a research firm.')
  })

  it('renders all 3 differentiator titles', () => {
    render(<WhyOwlSection {...props} />)
    expect(screen.getByText('Methodology')).toBeInTheDocument()
    expect(screen.getByText('AI Infrastructure')).toBeInTheDocument()
  })
})
```

- [ ] **Step 14.2: Create WhyOwlSection, run tests, commit**

Create `src/components/home/why-owl-section.tsx`:
```typescript
'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface Differentiator {
  title: string
  body: string
}

interface WhyOwlSectionProps {
  eyebrow: string
  heading: string
  intro: string
  differentiators: [Differentiator, Differentiator, Differentiator]
}

export function WhyOwlSection({ eyebrow, heading, intro, differentiators }: WhyOwlSectionProps) {
  return (
    <SectionContainer>
      <div className="max-w-2xl mb-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading>{heading}</SectionHeading>
        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mt-6">{intro}</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {differentiators.map((d, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className="border-l-2 border-chart-3 pl-5 py-1">
              <h3 className="text-base font-bold text-foreground">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{d.body}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </SectionContainer>
  )
}
```

```bash
pnpm test src/components/home/__tests__/why-owl-section.test.tsx
git add src/components/home/why-owl-section.tsx src/components/home/__tests__/why-owl-section.test.tsx
git commit -m "feat: add WhyOwlSection with 3 differentiator blocks"
```

---

## Task 15: FoundersSection

**Files:**
- Create: `src/components/home/founders-section.tsx`
- Create: `src/components/home/__tests__/founders-section.test.tsx`

- [ ] **Step 15.1: Write test**

Create `src/components/home/__tests__/founders-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { FoundersSection } from '../founders-section'

const props = {
  eyebrow: 'Founders',
  heading: 'Built from a conviction',
  founders: [
    {
      quote: 'We built OWL because institutions kept making critical decisions on stale data.',
      name: 'Beyza Polat, Ph.D.',
      role: 'CEO & Co-Founder',
      credential: 'Economist. Bilkent University · LSE.',
      photoSrc: '/images/beyzapolat.png',
      photoAlt: 'Beyza Polat',
    },
    {
      quote: 'The gap was never the data — it was the infrastructure.',
      name: 'Saygın Vedat Alkurt',
      role: 'Co-Founder',
      credential: 'Sociologist. METU.',
      photoSrc: '/images/sayginalkurt.png',
      photoAlt: 'Saygın Vedat Alkurt',
    },
  ] as [typeof props['founders'][0], typeof props['founders'][0]],
}

describe('FoundersSection', () => {
  it('renders both founder names', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getByText('Beyza Polat, Ph.D.')).toBeInTheDocument()
    expect(screen.getByText('Saygın Vedat Alkurt')).toBeInTheDocument()
  })

  it('renders both quotes', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getByText(/We built OWL/)).toBeInTheDocument()
    expect(screen.getByText(/never the data/)).toBeInTheDocument()
  })

  it('renders founder photos with alt text', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getByAltText('Beyza Polat')).toBeInTheDocument()
    expect(screen.getByAltText('Saygın Vedat Alkurt')).toBeInTheDocument()
  })

  it('renders roles', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getByText('CEO & Co-Founder')).toBeInTheDocument()
  })
})
```

- [ ] **Step 15.2: Create FoundersSection, run tests, commit**

Create `src/components/home/founders-section.tsx`:
```typescript
'use client'

import Image from 'next/image'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface Founder {
  quote: string
  name: string
  role: string
  credential: string
  photoSrc: string
  photoAlt: string
}

interface FoundersSectionProps {
  eyebrow: string
  heading: string
  founders: [Founder, Founder]
}

function FounderBlock({ founder }: { founder: Founder }) {
  return (
    <RevealWrapper>
      <div>
        <span aria-hidden className="block text-7xl font-extrabold leading-none text-muted-foreground/20 -mb-3 select-none">
          &ldquo;
        </span>
        {/* TODO: replace with real founder quote */}
        <p className="text-xl font-semibold italic text-foreground max-w-xl leading-relaxed">
          {founder.quote}
        </p>
        <div className="flex items-center gap-3 mt-6">
          <Image
            src={founder.photoSrc}
            alt={founder.photoAlt}
            width={36}
            height={36}
            className="rounded-full object-cover grayscale"
          />
          <div>
            <p className="text-sm font-bold text-foreground">{founder.name}</p>
            <p className="text-xs text-muted-foreground">{founder.role}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">{founder.credential}</p>
      </div>
    </RevealWrapper>
  )
}

export function FoundersSection({ eyebrow, heading, founders }: FoundersSectionProps) {
  return (
    <SectionContainer>
      <div className="max-w-2xl mx-auto">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading className="mb-12">{heading}</SectionHeading>
        <FounderBlock founder={founders[0]} />
        <hr className="border-border my-10" />
        <FounderBlock founder={founders[1]} />
      </div>
    </SectionContainer>
  )
}
```

```bash
pnpm test src/components/home/__tests__/founders-section.test.tsx
git add src/components/home/founders-section.tsx src/components/home/__tests__/founders-section.test.tsx
git commit -m "feat: add FoundersSection with quote-forward treatment"
```

---

## Task 16: PartnershipsSection + AgentSection

These two sections are adjacent dark sections with different visual anchors. Build them together.

**Files:**
- Create: `src/components/home/partnerships-section.tsx`
- Create: `src/components/home/agent-section.tsx`
- Create: `src/components/home/__tests__/partnerships-section.test.tsx`
- Create: `src/components/home/__tests__/agent-section.test.tsx`

- [ ] **Step 16.1: Write tests**

Create `src/components/home/__tests__/partnerships-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { PartnershipsSection } from '../partnerships-section'

const props = {
  eyebrow: 'Partnerships, Investment & Institutional Collaboration',
  heading: 'Open to those who want to build',
  body: 'OWL Intelligence is open to working with stakeholders.',
  ctaLabel: 'Get in Touch',
  ctaHref: '/contact',
}

describe('PartnershipsSection', () => {
  it('renders heading', () => {
    render(<PartnershipsSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders CTA link', () => {
    render(<PartnershipsSection {...props} />)
    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '/contact')
  })
})
```

Create `src/components/home/__tests__/agent-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { AgentSection } from '../agent-section'

const props = {
  eyebrow: 'Talk to Our Agent',
  heading: 'Ask anything you would like to know.',
  subCopy: 'Our AI agent is available to answer questions.',
  ctaLabel: 'Open Agent',
  ctaHref: '/agent',
}

describe('AgentSection', () => {
  it('renders heading', () => {
    render(<AgentSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Ask anything')
  })

  it('renders CTA link to /agent', () => {
    render(<AgentSection {...props} />)
    expect(screen.getByRole('link', { name: 'Open Agent' })).toHaveAttribute('href', '/agent')
  })
})
```

- [ ] **Step 16.2: Create both sections**

Create `src/components/home/partnerships-section.tsx`:
```typescript
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface PartnershipsSectionProps {
  eyebrow: string
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export function PartnershipsSection({ eyebrow, heading, body, ctaLabel, ctaHref }: PartnershipsSectionProps) {
  return (
    <SectionContainer dark>
      <div className="max-w-2xl mx-auto text-center">
        {/* Visual entry anchor — thin line above eyebrow */}
        <div aria-hidden className="w-12 h-px bg-chart-3 mx-auto mb-6" />
        <RevealWrapper>
          <Eyebrow dark className="justify-center">{eyebrow}</Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-base text-[#5a6888] leading-relaxed mt-6 mb-10">{body}</p>
          <Button asChild variant="outline" className="border-[#1a2640] text-[#8899bb] hover:bg-dark-surface hover:text-[#f0f0f0]">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
```

Create `src/components/home/agent-section.tsx`:
```typescript
'use client'

import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface AgentSectionProps {
  eyebrow: string
  heading: string
  subCopy: string
  ctaLabel: string
  ctaHref: string
}

export function AgentSection({ eyebrow, heading, subCopy, ctaLabel, ctaHref }: AgentSectionProps) {
  return (
    <SectionContainer dark>
      <div className="max-w-xl mx-auto text-center">
        <RevealWrapper>
          <Eyebrow dark className="justify-center gap-2">
            <MessageSquare className="w-3 h-3" aria-hidden />
            {eyebrow}
          </Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-base text-[#5a6888] leading-relaxed mt-6 mb-10">{subCopy}</p>
          <Button asChild>
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
```

- [ ] **Step 16.3: Run tests and commit**

```bash
pnpm test src/components/home/__tests__/partnerships-section.test.tsx src/components/home/__tests__/agent-section.test.tsx
git add src/components/home/partnerships-section.tsx src/components/home/agent-section.tsx src/components/home/__tests__/
git commit -m "feat: add PartnershipsSection and AgentSection dark CTA components"
```

---

## Task 17: ContactDemoSection

**Files:**
- Create: `src/components/home/contact-demo-section.tsx`
- Create: `src/components/home/__tests__/contact-demo-section.test.tsx`

- [ ] **Step 17.1: Write test, create component, run, commit**

Create `src/components/home/__tests__/contact-demo-section.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import { ContactDemoSection } from '../contact-demo-section'

const props = {
  eyebrow: 'Contact',
  heading: 'Start a conversation.',
  body: 'Whether you\'re exploring or looking to invest.',
  cardHeading: 'Ready to see it in action?',
  ctaLabel: 'Book a Demo',
  ctaHref: '/contact',
}

describe('ContactDemoSection', () => {
  it('renders main heading', () => {
    render(<ContactDemoSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Start a conversation.')
  })

  it('renders the CTA card with link', () => {
    render(<ContactDemoSection {...props} />)
    expect(screen.getByRole('link', { name: 'Book a Demo' })).toHaveAttribute('href', '/contact')
  })
})
```

Create `src/components/home/contact-demo-section.tsx`:
```typescript
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface ContactDemoSectionProps {
  eyebrow: string
  heading: string
  body: string
  cardHeading: string
  ctaLabel: string
  ctaHref: string
}

export function ContactDemoSection({ eyebrow, heading, body, cardHeading, ctaLabel, ctaHref }: ContactDemoSectionProps) {
  return (
    <SectionContainer>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <RevealWrapper>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading>{heading}</SectionHeading>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mt-6">{body}</p>
        </RevealWrapper>
        <RevealWrapper delay={0.1}>
          <div className="rounded-lg border border-border p-8">
            <h3 className="text-lg font-bold text-foreground">{cardHeading}</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              See OWL Intelligence in action with a guided walkthrough tailored to your institution.
            </p>
            <Button asChild>
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
```

```bash
pnpm test src/components/home/__tests__/contact-demo-section.test.tsx
git add src/components/home/contact-demo-section.tsx src/components/home/__tests__/contact-demo-section.test.tsx
git commit -m "feat: add ContactDemoSection"
```

---

## Task 18: i18n — Update translation files

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/tr.json`

- [ ] **Step 18.1: Read current en.json structure**

Open `messages/en.json`. Note the existing `"home"` key structure so you don't delete existing keys that other pages rely on.

- [ ] **Step 18.2: Add new home keys to en.json**

Merge the following into the existing `"home"` object in `messages/en.json`. Do not remove existing keys — extend them:

```json
{
  "home": {
    "meta": {
      "title": "OWL Intelligence — Advanced Analytics Grounded in Field Data",
      "description": "Decision-support products for institutions combining validated field data, structured analytics, and AI."
    },
    "hero": {
      "eyebrow": "Next-Gen Research",
      "headline": "Advanced Analytics Grounded in Field Data",
      "body": "OWL Intelligence develops decision-support products for institutions by combining validated field data, structured analytics, and AI governed within a clear oversight framework.",
      "ctaPrimary": "Explore Products",
      "ctaSecondary": "Talk to Our Agent",
      "metric1Value": "81",
      "metric1Label": "Provinces of field coverage across Turkey",
      "metric2Value": "15+",
      "metric2Label": "Years of institutional research experience",
      "metric3Value": "2",
      "metric3Label": "AI-supported decision products in the ecosystem"
    },
    "businessSpeed": {
      "eyebrow": "Business Moves Faster Than Traditional Data",
      "statement1": "Static measurement cannot keep pace with changing conditions.",
      "statement2": "Delayed signals weaken response quality.",
      "statement3": "Better decisions require higher-frequency, ground-level evidence."
    },
    "value": {
      "eyebrow": "How OWL Intelligence Creates Value",
      "heading": "Measurement, analytics, and AI in one decision-support layer",
      "body": "OWL Intelligence brings measurement, analytics, and AI together within a single decision-support layer. It continuously monitors real-world conditions, processes emerging signals, and makes them usable for institutional contexts.",
      "col1Title": "Measurement",
      "col1Body": "Continuously monitors real-world conditions through structured fieldwork and validated data pipelines.",
      "col2Title": "Analytics",
      "col2Body": "Transforms raw signals into analytical structures that connect directly to decision-making processes.",
      "col3Title": "AI",
      "col3Body": "Governed AI layers interpret findings, explain patterns, and deliver decision-ready intelligence."
    },
    "productEcosystem": {
      "eyebrow": "Product Ecosystem",
      "heading": "An integrated structure that turns field data into stronger decisions",
      "intro": "Our product ecosystem provides an integrated structure that turns field data into stronger measurement, analysis, and decision support.",
      "fwbmName": "Financial Well-Being Monitor",
      "fwbmDescriptor": "Next-generation household financial resilience measurement at institutional scale.",
      "fwbmLayer1": "Validated Field Data",
      "fwbmLayer2": "Structured Analytics",
      "fwbmLayer3": "Decision Infrastructure",
      "fuzzyowlName": "FuzzyOwl",
      "fuzzyowlDescriptor": "Makes visible which variables shape decisions, how they influence each other, and how interventions affect the system as a whole.",
      "fuzzyowlLayer1": "Relational Mapping",
      "fuzzyowlLayer2": "AI-Supported Analytics",
      "fuzzyowlLayer3": "Scenario Simulation"
    },
    "intelligenceLayer": {
      "eyebrow": "How Our Intelligence Layer Works",
      "heading": "Eight integrated stages from raw signal to institutional decision",
      "step01Title": "Methodology Design",
      "step01Body": "Each product begins with an embedded methodology that defines what is measured and how it is measured.",
      "step02Title": "Data Collection",
      "step02Body": "A regular, structured, and highly reliable flow of real-world data is generated through fieldwork.",
      "step03Title": "Validation and Audit Control",
      "step03Body": "The AuditorAI layer subjects the data to quality, consistency, and validation checks, creating a fully validated foundation.",
      "step04Title": "Unified Data Integration",
      "step04Body": "Validated field data is brought together with integrated databases and relevant external data sources within a single data structure.",
      "step05Title": "Classification and Structuring",
      "step05Body": "The ClassifyAI layer organizes the data into meaningful categories, labels it, and prepares it for analysis.",
      "step06Title": "Computation Engines",
      "step06Body": "Deterministic computation engines consistently generate indicators, scores, segments, and decision rules.",
      "step07Title": "Live Decision Dashboards",
      "step07Body": "Processed data becomes trackable, comparable, and ready for institutional use through live dashboards.",
      "step08Title": "Governed AI Analysis Layer",
      "step08Body": "Governed AI analysis assistants such as Monet and FuzzyOwl interpret findings, explain patterns, and complete the analytical layer."
    },
    "sectors": {
      "eyebrow": "Who We Serve",
      "heading": "Built for institutions that operate at complexity",
      "context": "Nine sectors. One coherent intelligence infrastructure.",
      "item1": "Finance and Banking",
      "item2": "Insurance",
      "item3": "Retail",
      "item4": "Fast-Moving Consumer Goods",
      "item5": "E-Commerce",
      "item6": "Durable Goods and Home Appliances",
      "item7": "Real Estate",
      "item8": "Technology and Telecommunications",
      "item9": "International Organizations"
    },
    "whyOwl": {
      "eyebrow": "Why OWL Intelligence",
      "heading": "Not a research firm. An intelligence infrastructure.",
      "intro": "Unlike conventional research firms, OWL Intelligence does not leave data confined to reports; it turns data into productized analytics and decision support. With more than 15 years of experience, a field network spanning all 81 provinces of Turkey, and in-house technology capabilities, it transforms research into an infrastructure that operates at institutional scale.",
      "diff1Title": "Methodology",
      "diff1Body": "Drawing on deep methodological expertise shaped by national and international projects, our team specializes in quantitative, qualitative, mixed, and experimental methods.",
      "diff2Title": "Advanced Analytics",
      "diff2Body": "OWL Intelligence does not simply collect data; it transforms it into analytical structures that connect directly to decision-making processes.",
      "diff3Title": "AI Infrastructure",
      "diff3Body": "Our technology and software infrastructure is developed in-house and designed with a product logic."
    },
    "founders": {
      "eyebrow": "Founders",
      "heading": "Built from a conviction, not a gap in the market",
      "beyza": {
        "quote": "We built OWL because institutions kept making critical decisions on data that was already six months old — and the technology to fix that already existed.",
        "name": "Beyza Polat, Ph.D.",
        "role": "CEO & Co-Founder",
        "credential": "Economist. Bilkent University · London School of Economics."
      },
      "saygin": {
        "quote": "Field research told us everything we needed to know. The gap was never the data — it was the infrastructure to make it actionable at scale.",
        "name": "Saygın Vedat Alkurt",
        "role": "Co-Founder",
        "credential": "Sociologist. Middle East Technical University. 15+ years in data-driven research."
      }
    },
    "partnerships": {
      "eyebrow": "Partnerships, Investment & Institutional Collaboration",
      "heading": "Open to those who want to build and grow together",
      "body": "OWL Intelligence is open to working with stakeholders who want to build, grow, and open up new areas together. We see strategic partnerships and institutional collaboration as a natural part of our long-term vision.",
      "ctaLabel": "Get in Touch"
    },
    "agent": {
      "eyebrow": "Talk to Our Agent",
      "heading": "Ask anything you would like to know about OWL Intelligence.",
      "subCopy": "Our AI agent is available to answer questions about our products, methodology, and how we work with institutions.",
      "ctaLabel": "Open Agent"
    },
    "contactDemo": {
      "eyebrow": "Contact",
      "heading": "Start a conversation.",
      "body": "Whether you're exploring for your institution, looking to invest, or interested in collaboration, we're ready to talk.",
      "cardHeading": "Ready to see it in action?",
      "ctaLabel": "Book a Demo"
    }
  }
}
```

- [ ] **Step 18.3: Add matching keys to tr.json**

Open `messages/tr.json`. Add a `"home"` object with the same key structure. For the initial implementation, use the English text as placeholders — mark each value with a `[TR]` prefix so they're easy to find for translation review:

```json
"home": {
  "meta": {
    "title": "[TR] OWL Intelligence — Advanced Analytics Grounded in Field Data",
    "description": "[TR] Decision-support products for institutions."
  },
  ...
}
```

(Copy all keys from en.json, prefix values with `[TR]`. A native Turkish speaker must review before launch — this is noted in Open Items.)

- [ ] **Step 18.4: Commit**

```bash
git add messages/en.json messages/tr.json
git commit -m "feat: add home.* translation keys for all new homepage sections"
```

---

## Task 19: Rewrite page.tsx

**Files:**
- Modify: `src/app/[locale]/page.tsx`

This is the assembly step. The page remains a server component. It calls `getTranslations` and passes strings as props to all section components.

- [ ] **Step 19.1: Read the existing page.tsx**

Open `src/app/[locale]/page.tsx`. Note the existing `generateMetadata` export — preserve and update it.

- [ ] **Step 19.2: Rewrite page.tsx**

Replace the entire content of `src/app/[locale]/page.tsx` with:

```typescript
import { getTranslations } from 'next-intl/server'
import { HeroSection } from '@/components/home/hero-section'
import { BusinessSpeedSection } from '@/components/home/business-speed-section'
import { ValueSection } from '@/components/home/value-section'
import { ProductEcosystemSection } from '@/components/home/product-ecosystem-section'
import { IntelligenceLayerSection } from '@/components/home/intelligence-layer-section'
import { WhoWeServeSection } from '@/components/home/who-we-serve-section'
import { WhyOwlSection } from '@/components/home/why-owl-section'
import { FoundersSection } from '@/components/home/founders-section'
import { PartnershipsSection } from '@/components/home/partnerships-section'
import { AgentSection } from '@/components/home/agent-section'
import { ContactDemoSection } from '@/components/home/contact-demo-section'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default async function HomePage() {
  const t = await getTranslations('home')

  return (
    <main>
      <HeroSection
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        body={t('hero.body')}
        ctaPrimary={t('hero.ctaPrimary')}
        ctaSecondary={t('hero.ctaSecondary')}
        metrics={[
          { value: t('hero.metric1Value'), label: t('hero.metric1Label') },
          { value: t('hero.metric2Value'), label: t('hero.metric2Label') },
          { value: t('hero.metric3Value'), label: t('hero.metric3Label') },
        ]}
      />

      <BusinessSpeedSection
        eyebrow={t('businessSpeed.eyebrow')}
        statements={[
          t('businessSpeed.statement1'),
          t('businessSpeed.statement2'),
          t('businessSpeed.statement3'),
        ]}
      />

      <ValueSection
        eyebrow={t('value.eyebrow')}
        heading={t('value.heading')}
        body={t('value.body')}
        columns={[
          { title: t('value.col1Title'), body: t('value.col1Body') },
          { title: t('value.col2Title'), body: t('value.col2Body') },
          { title: t('value.col3Title'), body: t('value.col3Body') },
        ]}
      />

      <ProductEcosystemSection
        eyebrow={t('productEcosystem.eyebrow')}
        heading={t('productEcosystem.heading')}
        intro={t('productEcosystem.intro')}
        products={[
          {
            logoSrc: '/images/fwbmlogo.svg',
            logoAlt: 'FWBM',
            name: t('productEcosystem.fwbmName'),
            descriptor: t('productEcosystem.fwbmDescriptor'),
            layers: [
              t('productEcosystem.fwbmLayer1'),
              t('productEcosystem.fwbmLayer2'),
              t('productEcosystem.fwbmLayer3'),
            ],
          },
          {
            logoSrc: '/images/fuzzyowl.png',
            logoAlt: 'FuzzyOwl',
            name: t('productEcosystem.fuzzyowlName'),
            descriptor: t('productEcosystem.fuzzyowlDescriptor'),
            layers: [
              t('productEcosystem.fuzzyowlLayer1'),
              t('productEcosystem.fuzzyowlLayer2'),
              t('productEcosystem.fuzzyowlLayer3'),
            ],
          },
        ]}
      />

      <IntelligenceLayerSection
        eyebrow={t('intelligenceLayer.eyebrow')}
        heading={t('intelligenceLayer.heading')}
        steps={[
          { number: '01', title: t('intelligenceLayer.step01Title'), body: t('intelligenceLayer.step01Body') },
          { number: '02', title: t('intelligenceLayer.step02Title'), body: t('intelligenceLayer.step02Body') },
          { number: '03', title: t('intelligenceLayer.step03Title'), body: t('intelligenceLayer.step03Body') },
          { number: '04', title: t('intelligenceLayer.step04Title'), body: t('intelligenceLayer.step04Body') },
          { number: '05', title: t('intelligenceLayer.step05Title'), body: t('intelligenceLayer.step05Body') },
          { number: '06', title: t('intelligenceLayer.step06Title'), body: t('intelligenceLayer.step06Body') },
          { number: '07', title: t('intelligenceLayer.step07Title'), body: t('intelligenceLayer.step07Body') },
          { number: '08', title: t('intelligenceLayer.step08Title'), body: t('intelligenceLayer.step08Body') },
        ]}
      />

      <WhoWeServeSection
        eyebrow={t('sectors.eyebrow')}
        heading={t('sectors.heading')}
        context={t('sectors.context')}
        sectors={[
          t('sectors.item1'), t('sectors.item2'), t('sectors.item3'),
          t('sectors.item4'), t('sectors.item5'), t('sectors.item6'),
          t('sectors.item7'), t('sectors.item8'), t('sectors.item9'),
        ]}
      />

      <WhyOwlSection
        eyebrow={t('whyOwl.eyebrow')}
        heading={t('whyOwl.heading')}
        intro={t('whyOwl.intro')}
        differentiators={[
          { title: t('whyOwl.diff1Title'), body: t('whyOwl.diff1Body') },
          { title: t('whyOwl.diff2Title'), body: t('whyOwl.diff2Body') },
          { title: t('whyOwl.diff3Title'), body: t('whyOwl.diff3Body') },
        ]}
      />

      <FoundersSection
        eyebrow={t('founders.eyebrow')}
        heading={t('founders.heading')}
        founders={[
          {
            quote: t('founders.beyza.quote'),
            name: t('founders.beyza.name'),
            role: t('founders.beyza.role'),
            credential: t('founders.beyza.credential'),
            photoSrc: '/images/beyzapolat.png',
            photoAlt: t('founders.beyza.name'),
          },
          {
            quote: t('founders.saygin.quote'),
            name: t('founders.saygin.name'),
            role: t('founders.saygin.role'),
            credential: t('founders.saygin.credential'),
            photoSrc: '/images/sayginalkurt.png',
            photoAlt: t('founders.saygin.name'),
          },
        ]}
      />

      <PartnershipsSection
        eyebrow={t('partnerships.eyebrow')}
        heading={t('partnerships.heading')}
        body={t('partnerships.body')}
        ctaLabel={t('partnerships.ctaLabel')}
        ctaHref="/contact"
      />

      <AgentSection
        eyebrow={t('agent.eyebrow')}
        heading={t('agent.heading')}
        subCopy={t('agent.subCopy')}
        ctaLabel={t('agent.ctaLabel')}
        ctaHref="/agent"
      />

      <ContactDemoSection
        eyebrow={t('contactDemo.eyebrow')}
        heading={t('contactDemo.heading')}
        body={t('contactDemo.body')}
        cardHeading={t('contactDemo.cardHeading')}
        ctaLabel={t('contactDemo.ctaLabel')}
        ctaHref="/contact"
      />
    </main>
  )
}
```

- [ ] **Step 19.3: Run the dev server and verify the page loads**

```bash
pnpm dev
```

Open `http://localhost:3000/en`. The homepage should render all 11 sections (plus the existing header and footer from the layout). Check that no console errors appear.

- [ ] **Step 19.4: Run all tests**

```bash
pnpm test
```

Expected: All tests pass.

- [ ] **Step 19.5: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: assemble homepage from modular section components"
```

---

## Task 20: Full-suite test run + visual QA

- [ ] **Step 20.1: Run full test suite**

```bash
pnpm test
```

Expected: All tests pass with 0 failures. Note the count — should be 30+ individual test cases.

- [ ] **Step 20.2: Run type check**

```bash
pnpm tsc --noEmit
```

Expected: 0 errors. Fix any TypeScript errors before continuing.

- [ ] **Step 20.3: Run build**

```bash
pnpm build
```

Expected: Build succeeds with no errors. Warnings about missing translations or image sizes are acceptable.

- [ ] **Step 20.4: Visual QA checklist**

Start the dev server (`pnpm dev`) and check each of these on `http://localhost:3000/en`:

**Hero:**
- [ ] Dark navy background renders correctly
- [ ] Headline is large, `font-extrabold`, near-white
- [ ] 3 metric cards visible on desktop (right column)
- [ ] Metric cards hidden on mobile
- [ ] Scroll cue dot animates downward on loop
- [ ] Both CTA buttons are clickable

**Section transitions:**
- [ ] Each dark→light transition is a hard cut (no gradient bleed)
- [ ] Light sections have off-white `bg-background`
- [ ] Dark sections (4+5, 9+10) share seamless background

**Animations (scroll slowly down the page):**
- [ ] Hero elements animate in on page load
- [ ] Each section's content fades up when scrolled into view
- [ ] Product Ecosystem layer pills reveal sequentially
- [ ] Intelligence Layer steps reveal independently

**Founders:**
- [ ] Quote text is italic
- [ ] Both circular founder photos load (grayscale)
- [ ] `"` decorative mark is visible but subtle (low opacity)
- [ ] Horizontal rule separates the two founders

**Mobile (resize to 375px):**
- [ ] Hero right column is hidden
- [ ] All sections stack to single column
- [ ] Pills in WhoWeServe wrap naturally
- [ ] No horizontal overflow

- [ ] **Step 20.5: Fix any issues found during visual QA**

Address any visual regressions, layout bugs, or TypeScript errors discovered. Commit fixes:

```bash
git add -p   # stage only relevant files
git commit -m "fix: visual QA corrections"
```

- [ ] **Step 20.6: Final commit — mark feature complete**

```bash
pnpm test && pnpm build
git add .
git commit -m "feat: complete OWL Intelligence homepage redesign

- 11 modular section components under components/home/
- Dark cinematic hero with asymmetric split layout
- Hard cut dark/light section rhythm
- Framer Motion scroll-reveal animations
- Layered Stack diagram for Product Ecosystem
- Annotated 8-step timeline for Intelligence Layer
- Quote-forward Founders section
- Full i18n with en.json/tr.json
- Vitest + RTL test suite (30+ tests)"
```

---

## Open Items (must resolve before launch)

1. **Founder quotes** — placeholder text is in place. Real quotes must be provided by Beyza Polat and Saygın Vedat Alkurt, reviewed, and merged before the page goes live. Search for `TODO: replace with real founder quote` to find all instances.
2. **Turkish translations** — `tr.json` values are marked with `[TR]` prefix. A native Turkish speaker must review and replace all values before the TR locale is enabled in production.
3. **Geist weight 800** — Verify the font renders correctly at `font-extrabold` in the browser. If the hero headline appears slightly thin, confirm the Geist font config in `layout.tsx` explicitly includes `weight: ['800']`.
