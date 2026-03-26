# Homepage Value Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage Value section into a transformation-axis layout that shows how OWL turns field signals into decision-ready institutional value while staying visually consistent with the new Problem section.

**Architecture:** Keep the existing `ValueSection` data contract where possible, but replace the centered heading-plus-cards layout with an editorial narrative area and a visible three-stage axis. Reuse the same typography, divider rhythm, and premium spacing language established in `BusinessSpeedSection`, while ensuring the sequence collapses cleanly on smaller screens.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Lock the new transformation-axis behavior with tests

**Files:**
- Modify: `src/components/home/__tests__/value-section.test.tsx`
- Test: `src/components/home/__tests__/value-section.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it('renders the eyebrow, heading, and supporting body copy', () => {
  render(<ValueSection {...props} />)
  expect(screen.getByText(props.eyebrow)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: props.heading })).toBeInTheDocument()
  expect(screen.getByText(props.body)).toBeInTheDocument()
})

it('renders the three pillars as a directional sequence rather than generic cards', () => {
  render(<ValueSection {...props} />)
  expect(screen.getByText('01')).toBeInTheDocument()
  expect(screen.getByText('02')).toBeInTheDocument()
  expect(screen.getByText('03')).toBeInTheDocument()
  expect(screen.getAllByRole('article')).toHaveLength(3)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test src/components/home/__tests__/value-section.test.tsx`
Expected: FAIL because the current section does not render the approved transformation-axis structure or article semantics.

### Task 2: Implement the redesigned Value section

**Files:**
- Modify: `src/components/home/value-section.tsx`

- [ ] **Step 1: Replace the centered intro block with an editorial narrative column**

```tsx
<div className="grid ...">
  <div>
    <Eyebrow>{eyebrow}</Eyebrow>
    <SectionHeading ...>{heading}</SectionHeading>
    <p>{body}</p>
  </div>
```

- [ ] **Step 2: Turn the three value pillars into a visible transformation axis**

```tsx
  <div>
    {columns.map((col, i) => (
      <article ...>
        <span>01</span>
        <h3>{col.title}</h3>
        <p>{col.body}</p>
      </article>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Add directional affordances that connect the stages**

```tsx
<div aria-hidden className="...">→</div>
```

- [ ] **Step 4: Keep the responsive collapse clean**

Use a horizontal axis feel on large screens and a stacked sequence on smaller screens, without introducing interactive controls or changing the data model.

### Task 3: Verify the redesign

**Files:**
- Test: `src/components/home/__tests__/value-section.test.tsx`

- [ ] **Step 1: Run the section test to verify it passes**

Run: `npm test src/components/home/__tests__/value-section.test.tsx`
Expected: PASS

- [ ] **Step 2: Check lints for the edited files**

Run: `npm run lint -- src/components/home/value-section.tsx src/components/home/__tests__/value-section.test.tsx`
Expected: PASS or no new issues in the edited files

- [ ] **Step 3: Review the result against the approved design**

Check that:
- the section reads as a transformation from signal to decision
- the editorial tone matches `BusinessSpeedSection`
- the three stages still preserve the existing localized content
- the layout remains legible at smaller sizes
