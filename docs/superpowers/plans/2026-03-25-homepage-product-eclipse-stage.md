# Homepage Product Eclipse Stage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Product Ecosystem section with an Eclipse Stage layout that centers FWBM as the primary logo, stages the other products around it, and uses cinematic hover expansion instead of card containers.

**Architecture:** Keep the existing homepage section inputs, but discard the archive-row structure in favor of a stage-based composition with a central logo constellation and a spotlight detail area. Use the uploaded product logos from `owlcontent/images/productlogos/`, keep FWBM permanently centered as the hero logo, and drive the supporting copy from hover/focus state.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Next Image, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Lock the Eclipse Stage behavior with tests

**Files:**
- Modify: `src/components/home/__tests__/product-ecosystem-section.test.tsx`
- Test: `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('defaults the spotlight to FWBM', () => {
  render(<ProductEcosystemSection {...props} />)
  expect(within(screen.getByTestId('product-spotlight')).getByText('FWBM: Financial Well-Being Monitor ©')).toBeInTheDocument()
})

it('updates the spotlight when hovering another logo', () => {
  render(<ProductEcosystemSection {...props} />)
  fireEvent.mouseEnter(screen.getByTestId('product-node-FuzzyOwl'))
  expect(within(screen.getByTestId('product-spotlight')).getByText('FuzzyOwl')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test src/components/home/__tests__/product-ecosystem-section.test.tsx`
Expected: FAIL because the current archive layout has no FWBM-centered spotlight stage and no hover-driven spotlight switching.

### Task 2: Implement the Eclipse Stage redesign

**Files:**
- Modify: `src/components/home/product-ecosystem-section.tsx`

- [ ] **Step 1: Remove the archive-row structure**

Delete the current archive entry component and the list layout that depends on row cards and archive metadata.

- [ ] **Step 2: Import and use the uploaded logo assets**

Use the new files from:
- `owlcontent/images/productlogos/FWBM.png`
- `owlcontent/images/productlogos/FuzzyOWL.png`
- `owlcontent/images/productlogos/EconImpact.png`

- [ ] **Step 3: Build the centered Eclipse Stage**

Create:
- one central FWBM logo node
- two secondary orbit logos
- subtle orbit lines / rings
- slow premium hover scaling

- [ ] **Step 4: Add spotlight copy driven by hover state**

Render a compact detail area beneath the stage that updates the active product title, descriptor, and plain-text capability lines on hover/focus.

### Task 3: Verify the redesign

**Files:**
- Test: `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 1: Run the section test to verify it passes**

Run: `npm test src/components/home/__tests__/product-ecosystem-section.test.tsx`
Expected: PASS

- [ ] **Step 2: Check lints for the edited files**

Run: `npm run lint -- src/components/home/product-ecosystem-section.tsx src/components/home/__tests__/product-ecosystem-section.test.tsx`
Expected: PASS or no new issues in the edited files

- [ ] **Step 3: Review the section against the approved design**

Check that:
- FWBM remains the visual center
- there are no card containers
- hover expands logos and changes the spotlight content
- the section still fits within the premium dark homepage language
