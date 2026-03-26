# Homepage Hero Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the homepage hero into the approved Editorial Monolith typography direction while preserving the interactive background and CTA behavior.

**Architecture:** Keep `HeroSection` as the single implementation file, preserve `AetherFlowHero` and `ScrollIndicator`, and replace the current generic centered hero stack with a tighter editorial typography hierarchy. Update the hero tests first to codify the new hierarchy and removal of visible metrics, then implement the minimal component changes to satisfy those tests.

**Tech Stack:** Next.js App Router, React, TypeScript, Framer Motion, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Lock the approved hero behavior in tests

**Files:**
- Modify: `src/components/home/__tests__/hero-section.test.tsx`
- Test: `src/components/home/__tests__/hero-section.test.tsx`

- [ ] **Step 1: Write the failing test**

Update the hero tests to assert the approved Editorial Monolith behavior:

```typescript
it('keeps the animated background mounted', () => {
  render(<HeroSection {...defaultProps} />)
  expect(screen.getByTestId('hero-background')).toBeInTheDocument()
})

it('renders the eyebrow, headline, body, and CTAs', () => {
  render(<HeroSection {...defaultProps} />)
  expect(screen.getByText(defaultProps.eyebrow)).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(defaultProps.headline)
  expect(screen.getByText(defaultProps.body)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: defaultProps.ctaPrimary })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: defaultProps.ctaSecondary })).toBeInTheDocument()
})

it('does not render visible metrics in the redesigned hero', () => {
  render(<HeroSection {...defaultProps} />)
  expect(screen.queryByText('81')).not.toBeInTheDocument()
  expect(screen.queryByText('15+')).not.toBeInTheDocument()
  expect(screen.queryByText('2')).not.toBeInTheDocument()
})

it('applies separate styling hooks for the monolith and supporting line', () => {
  render(<HeroSection {...defaultProps} />)
  expect(screen.getByTestId('hero-headline-monolith')).toBeInTheDocument()
  expect(screen.getByTestId('hero-headline-support')).toBeInTheDocument()
})

it('keeps the scroll indicator mounted', () => {
  const { container } = render(<HeroSection {...defaultProps} />)
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/__tests__/hero-section.test.tsx`

Expected: FAIL because the current hero still renders visible metrics and does not expose the background for direct testing.

### Task 2: Implement the Editorial Monolith hierarchy

**Files:**
- Modify: `src/components/home/hero-section.tsx`
- Test: `src/components/home/__tests__/hero-section.test.tsx`

- [ ] **Step 1: Write minimal implementation**

Refactor `HeroSection` to:

```tsx
<AetherFlowHero
  data-testid="hero-background"
  showOverlay={false}
  className="absolute inset-0 h-full w-full z-0"
/>

<div className="relative z-20 ... flex items-center justify-center text-center">
  <motion.div ... className="max-w-5xl">
    <Eyebrow className="mb-5 text-[0.72rem] tracking-[0.26em] !text-white/78">
      {eyebrow}
    </Eyebrow>

    <motion.h1 ... className="text-5xl sm:text-6xl lg:text-[5.5rem] ... uppercase">
      <span data-testid="hero-headline-monolith" className="block">
        {headline.replace(' Grounded in Field Data', '')}
      </span>
      <span data-testid="hero-headline-support" className="mt-5 block text-sm sm:text-base ...">
        Grounded in Field Data
      </span>
    </motion.h1>

    <div aria-hidden className="mx-auto mt-8 h-px w-24 bg-chart-3/65" />

    <motion.p ... className="mx-auto mt-8 max-w-2xl text-sm sm:text-base ... text-white/72">
      {body}
    </motion.p>

    <motion.div ... className="mt-12 flex flex-wrap items-center justify-center gap-5">
      ...
    </motion.div>
  </motion.div>
</div>
```

Implementation notes:
- keep the animated background
- remove visible metrics from the rendered hero
- remove unused imports or props from local rendering logic as needed, but do not change public prop shape during this pass
- keep motion restrained and typography-led
- keep `ScrollIndicator` rendered
- derive the supporting line from presentation logic only; do not add new translation keys

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run src/components/home/__tests__/hero-section.test.tsx`

Expected: PASS

### Task 3: Verify hero integration

**Files:**
- Modify: `src/components/home/hero-section.tsx`
- Test: `src/components/home/__tests__/hero-section.test.tsx`

- [ ] **Step 1: Run focused verification**

Run:
- `npx vitest run src/components/home/__tests__/hero-section.test.tsx`

Expected: PASS with no failures.

- [ ] **Step 2: Check lint diagnostics**

Run diagnostics for:
- `src/components/home/hero-section.tsx`
- `src/components/home/__tests__/hero-section.test.tsx`

Use: `ReadLints` for those two paths

- [ ] **Step 3: Commit**

```bash
git add src/components/home/hero-section.tsx src/components/home/__tests__/hero-section.test.tsx docs/superpowers/plans/2026-03-25-homepage-hero-typography.md
git commit -m "refine hero typography"
```
