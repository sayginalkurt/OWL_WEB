# Homepage Problem Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage problem section into a localized editorial split layout that preserves the section's dramatic message while improving readability, hierarchy, and responsiveness.

**Architecture:** Extend the existing `BusinessSpeedSection` API with a localized heading, then refactor the section into a two-column editorial layout using the shared home typography primitives. Keep the change focused to the homepage message files, the homepage route, the section component, and its tests.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Lock the desired behavior with tests

**Files:**
- Modify: `src/components/home/__tests__/business-speed-section.test.tsx`
- Test: `src/components/home/__tests__/business-speed-section.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('renders the editorial heading and eyebrow copy', () => {
  render(<BusinessSpeedSection {...(props as any)} heading="Business moves faster than traditional data" />)
  expect(screen.getByText('Problem')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /business moves faster than traditional data/i })).toBeInTheDocument()
})

it('renders statements as content, not interactive buttons', () => {
  render(<BusinessSpeedSection {...(props as any)} heading="Business moves faster than traditional data" />)
  expect(screen.queryAllByRole('button')).toHaveLength(0)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test src/components/home/__tests__/business-speed-section.test.tsx`
Expected: FAIL because the eyebrow and heading are not rendered as designed, and the statements still render as buttons.

### Task 2: Implement the editorial split redesign

**Files:**
- Modify: `src/components/home/business-speed-section.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `messages/en.json`
- Modify: `messages/tr.json`

- [ ] **Step 1: Add the localized heading content**

```json
"businessSpeed": {
  "eyebrow": "Problem",
  "heading": "Business moves faster than traditional data",
  "statement1": "...",
  "statement2": "...",
  "statement3": "..."
}
```

- [ ] **Step 2: Pass the heading into the homepage section**

```tsx
<BusinessSpeedSection
  eyebrow={t('businessSpeed.eyebrow')}
  heading={t('businessSpeed.heading')}
  statements={[...]}
/>
```

- [ ] **Step 3: Replace the current oversized hardcoded layout with the editorial split**

```tsx
<div className="grid h-full gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
  <div>
    <Eyebrow>{eyebrow}</Eyebrow>
    <SectionHeading className="max-w-[12ch] uppercase ...">{heading}</SectionHeading>
  </div>
  <div>
    {statements.map(...)}
  </div>
</div>
```

- [ ] **Step 4: Keep the statement list editorial rather than interactive**

```tsx
<article className="border-t border-border/70 py-5">
  <span className="...">01</span>
  <p>{statement}</p>
</article>
```

### Task 3: Verify the change

**Files:**
- Test: `src/components/home/__tests__/business-speed-section.test.tsx`

- [ ] **Step 1: Run the section test to verify it passes**

Run: `npm test src/components/home/__tests__/business-speed-section.test.tsx`
Expected: PASS

- [ ] **Step 2: Run lints for the touched area**

Run: `npm run lint -- src/components/home/business-speed-section.tsx src/components/home/__tests__/business-speed-section.test.tsx src/app/[locale]/page.tsx`
Expected: PASS or no new issues in edited files

- [ ] **Step 3: Review the edited files for UI consistency**

Check that:
- the eyebrow renders
- the heading is localized
- there are no button semantics on static statements
- the section stacks cleanly on smaller screens
