# Homepage Product Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage Product Ecosystem section into a premium Product Archive layout with animated hover states while preserving the same editorial design language as the new Problem and Value sections.

**Architecture:** Keep the existing section inputs and product data model, but replace the current dark card grid with archive-style product entries that read like a curated institutional catalog. Use the inverse surface tokens already established in the home sections, upgrade the FWBM product title to the approved branded copy, and add restrained hover motion via theme-safe classes instead of hardcoded colors.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Vitest, Testing Library

---

### Task 1: Lock the Product Archive behavior with tests

**Files:**
- Modify: `src/components/home/__tests__/product-ecosystem-section.test.tsx`
- Test: `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('renders archive-style product entries', () => {
  render(<ProductEcosystemSection {...props} />)
  expect(screen.getAllByRole('article')).toHaveLength(2)
})

it('renders the approved branded FWBM title', () => {
  render(<ProductEcosystemSection {...props} />)
  expect(screen.getByText('FWBM: Financial Well-Being Monitor ©')).toBeInTheDocument()
})

it('adds hover animation classes to the product containers', () => {
  render(<ProductEcosystemSection {...props} />)
  const firstEntry = screen.getAllByRole('article')[0]
  expect(firstEntry.className).toContain('hover:-translate-y-1')
  expect(firstEntry.className).toContain('transition-all')
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test src/components/home/__tests__/product-ecosystem-section.test.tsx`
Expected: FAIL because the current implementation still renders generic `div` cards and lacks the archive-row hover treatment.

### Task 2: Implement the Product Archive redesign

**Files:**
- Modify: `src/components/home/product-ecosystem-section.tsx`
- Modify: `messages/en.json`
- Modify: `messages/tr.json`

- [ ] **Step 1: Update the branded FWBM title**

```json
"fwbmName": "FWBM: Financial Well-Being Monitor ©"
```

- [ ] **Step 2: Replace the current product card grid with archive-style entries**

```tsx
<div className="border-y ...">
  {products.map(product => (
    <article ...>
      ...
    </article>
  ))}
</div>
```

- [ ] **Step 3: Make the entries visually distinct from the first two sections**

Use:
- a top editorial header band instead of a split layout
- full-width archive entries with clear columns
- restrained metadata blocks for layers
- premium, catalog-like spacing and rule lines

- [ ] **Step 4: Add hover animation to the containers**

```tsx
className="transition-all duration-300 hover:-translate-y-1 hover:border-[var(--sd-fg-accent)] hover:shadow-[...]"
```

The hover animation must stay premium and subtle, not playful.

### Task 3: Verify the redesign

**Files:**
- Test: `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 1: Run the section test to verify it passes**

Run: `npm test src/components/home/__tests__/product-ecosystem-section.test.tsx`
Expected: PASS

- [ ] **Step 2: Check lints for the edited files**

Run: `npm run lint -- src/components/home/product-ecosystem-section.tsx src/components/home/__tests__/product-ecosystem-section.test.tsx`
Expected: PASS or no new issues in the edited files

- [ ] **Step 3: Review the section against the approved direction**

Check that:
- the section reads like a curated product archive
- the layout is visibly different from the Problem and Value sections
- hover animation is present on product containers
- FWBM branding uses the approved copyright form
