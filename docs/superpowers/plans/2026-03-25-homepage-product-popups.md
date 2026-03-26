# Homepage Product Popups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add hybrid product popup interactions in the homepage Product Ecosystem section without reintroducing the section scrolling bug.

**Architecture:** Keep the existing spotlight as the persistent product detail area, add a lightweight anchored hover/focus preview near the active logo, and add a richer click-open anchored panel inside the same section. The popup reuses existing product `layers` as primary tags and `descriptor` as secondary summary content, so no new content model is needed.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Define popup behavior with tests

**Files:**
- Modify: `src/components/home/__tests__/product-ecosystem-section.test.tsx`
- Test: `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 1: Write the failing test**

Add tests for:
- hover/focus shows a lightweight preview for the active product
- click opens a richer anchored popup with tags first and summary underneath
- clicking the same product again closes the popup

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/__tests__/product-ecosystem-section.test.tsx`
Expected: FAIL because preview/popup behavior is not implemented yet.

### Task 2: Implement popup UI in Product Ecosystem

**Files:**
- Modify: `src/components/home/product-ecosystem-section.tsx`
- Test: `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 1: Write minimal implementation**

Implement:
- button-like logo interaction with click toggle behavior
- hover/focus preview anchored in the eclipse stage
- click-open anchored panel using the current active product
- dismiss on second click and `Escape`
- keep `overflow-visible` so the section still transitions cleanly

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run src/components/home/__tests__/product-ecosystem-section.test.tsx`
Expected: PASS

### Task 3: Verify regressions

**Files:**
- Modify: `src/components/home/product-ecosystem-section.tsx`
- Test: `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 1: Run lint checks**

Run lint/diagnostics for:
- `src/components/home/product-ecosystem-section.tsx`
- `src/components/home/__tests__/product-ecosystem-section.test.tsx`

- [ ] **Step 2: Confirm scrolling safeguard remains covered**

Ensure the existing overflow-visible regression test still passes so popup work does not reintroduce the Product section scroll trap.
