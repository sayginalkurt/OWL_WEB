# Technology & AI page redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the “Paper & Ink” editorial redesign for `src/app/[locale]/technology/page.tsx`, adding the new narrative sections with logo bands and fully localizing the page in EN/TR via `next-intl` messages.

**Architecture:** Keep the page self-contained, using a small local `LogoBand` component and translation-driven content. Use Tailwind classes and existing shadcn UI primitives; avoid global CSS changes except where already provided by `globals.css`.

**Tech Stack:** Next.js App Router, `next-intl`, Tailwind, shadcn/ui (`Card`, `Badge`), lucide icons.

---

### Task 1: Add `technologyPage` translations (EN/TR)

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/tr.json`

- [ ] Add a new top-level `technologyPage` namespace with keys for:
  - eyebrow, hero title/lead
  - 3 narrative block headings + bodies
  - logo band labels and item names (as plain strings)
  - capabilities heading/lead
  - 6 pillars titles/descriptions (stable IDs)
  - methodology heading/lead + 4 steps
- [ ] Sanity-check JSON validity (no trailing commas).

### Task 2: Implement redesigned page structure + components

**Files:**
- Modify: `src/app/[locale]/technology/page.tsx`

- [ ] Refactor page to use `useTranslations("technologyPage")`.
- [ ] Implement Hero + 3 narrative sections (each with `LogoBand`).
- [ ] Implement Capabilities section with 6 pillar cards, keyed by stable IDs.
- [ ] Restyle Methodology section to match “Paper & Ink”.
- [ ] Add “paper” background overlay that is reduced/disabled in dark mode.

### Task 3: Verify

**Files:**
- None

- [ ] Run: `pnpm -v` (confirm manager) and `pnpm test` (or the repo’s test script if different).
- [ ] Run: `pnpm lint` if available.
- [ ] Manually check `/en/technology` and `/tr/technology` render without missing translation warnings.

