# SEO Framework Implementation Plan (Next.js + Sanity + Supabase)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Phase 1 technical SEO correctness (canonical host + locale `hreflang` + robots/sitemap correctness + indexation boundaries), then Phase 2 metadata + JSON-LD templates, then Phase 3 CMS governance + regression tests.

**Architecture:** Centralize SEO logic in a small, typed “SEO kernel” (`src/lib/seo/*`) and consume it from App Router Metadata API (`metadata` / `generateMetadata`) plus metadata routes (`robots.ts`, `sitemap.ts`). Sanity provides inputs (SEO fields + timestamps), not the whole system.

**Tech Stack:** Next.js App Router (Next 16), TypeScript, `next-intl`, Sanity (`@sanity/client`), Vitest.

---

## Spec reference

- Spec: `docs/superpowers/specs/2026-03-26-seo-framework-design.md`
- Locked decisions:
  - Canonical host: `https://www.owlintelligence.co.uk`
  - Both locales indexable: `/en/*` and `/tr/*` with `hreflang`

## Scope check (what this plan covers)

- ✅ Phase 1: canonical host enforcement within app outputs, locale alternates correctness, correct robots/sitemap behavior, studio noindex, parameter/pagination default policy hooks, and tests for URL builders.
- ✅ Phase 2: page-type metadata helpers + JSON-LD emitters, and wiring those into key routes (marketing + insights templates).
- ✅ Phase 3: Sanity schema expansion for SEO governance, query projections for SEO + timestamps, and CI regression checks.
- ❌ Hosting-layer redirects (http→https, non-www→www, trailing slash normalization): this plan defines *requirements* and *verifications*, but actual configuration may live in Vercel/Cloudflare/NGINX. Implement where your infra lives.

---

## File structure (new + modified) — responsibilities locked

### Create (SEO kernel)

- `src/lib/seo/site.ts`
  - Canonical host source of truth (`NEXT_PUBLIC_SITE_URL`, defaulting to `https://www.owlintelligence.co.uk`)
  - Locale list/types (`en`, `tr`)
  - Absolute URL builder (safe, normalized)
- `src/lib/seo/alternates.ts`
  - `canonical` + `hreflang` languages map builder (`en`, `tr`, `x-default`)
- `src/lib/seo/metadata.ts`
  - Opinionated `buildMetadata(...)` helper returning `Metadata`
  - Enforces canonical/alternates patterns
  - Default robots policy hooks for param/pagination pages
- `src/components/seo/jsonld.tsx`
  - Minimal JSON-LD emitter using `next/script`
- `src/lib/seo/schema/organization.ts`
- `src/lib/seo/schema/website.ts`
- `src/lib/seo/schema/breadcrumbs.ts`
- `src/lib/seo/schema/article.ts`
- `src/lib/seo/schema/person.ts`
- `src/lib/seo/schema/service.ts`

### Modify (App Router SEO surfaces)

- `src/app/layout.tsx`
  - Set `metadataBase` to canonical host
  - Provide global defaults for OG/Twitter
- `src/app/[locale]/layout.tsx`
  - Ensure document-level language correctness (`<html lang=...>`)
  - Ensure locale-aware metadata defaults are consistent (where appropriate)
- `src/app/robots.ts`
  - Always return canonical sitemap URL host
  - Expand disallow list if needed (studio/api already)
- `src/app/sitemap.ts`
  - Use canonical host
  - Remove blanket `lastModified: new Date()`
  - Exclude non-index routes (studio/api/utility/noindex)
  - Add optional Sanity entries (Phase 2/3)

### Sanity (governance + inputs)

- `sanity/schemas/objects/seo.ts` (Phase 3)
  - Expand fields + validations
- `sanity/lib/queries.ts` (Phase 3)
  - Project SEO fields + timestamps (`_updatedAt`, `publishedAt`)

### Tests

- `src/lib/seo/__tests__/alternates.test.ts`
- `src/lib/seo/__tests__/site.test.ts`
- `src/lib/seo/__tests__/sitemap.test.ts` (lightweight, if feasible given Next types)

---

## Task 1: Add canonical site URL + locale helpers

**Files:**
- Create: `src/lib/seo/site.ts`
- Test: `src/lib/seo/__tests__/site.test.ts`

- [ ] **Step 1: Write failing test for absolute URL + locale path helpers**

Create `src/lib/seo/__tests__/site.test.ts` asserting:
- canonical host defaults to `https://www.owlintelligence.co.uk` when env missing
- `toAbsoluteUrl("/en")` yields `https://www.owlintelligence.co.uk/en`

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test`  
Expected: FAIL (module missing).

- [ ] **Step 3: Implement `src/lib/seo/site.ts` minimally**

Implement:
- `SITE_URL`
- `LOCALES` / `Locale`
- `toAbsoluteUrl(path: string)`
- `localePath(locale: Locale, pathname: string)`

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test`  
Expected: PASS for new tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo/site.ts src/lib/seo/__tests__/site.test.ts
git commit -m "feat(seo): add canonical site URL helpers"
```

---

## Task 2: Implement canonical + `hreflang` alternates builder

**Files:**
- Create: `src/lib/seo/alternates.ts`
- Test: `src/lib/seo/__tests__/alternates.test.ts`

- [ ] **Step 1: Write failing test**

Assertions:
- `buildAlternates("en", "/products")` returns:
  - `canonical` = `https://www.owlintelligence.co.uk/en/products`
  - `languages.en` and `languages.tr`
  - `languages["x-default"]` points to `en`

- [ ] **Step 2: Run tests (fail)**

Run: `npm test`  
Expected: FAIL (module missing).

- [ ] **Step 3: Implement minimal builder**

- [ ] **Step 4: Run tests (pass)**

Run: `npm test`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo/alternates.ts src/lib/seo/__tests__/alternates.test.ts
git commit -m "feat(seo): add canonical and hreflang alternates builder"
```

---

## Task 3: Fix `metadataBase` and global defaults in root layout (Phase 1)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add `metadataBase` and global OG defaults**

Use `SITE_URL` and ensure the canonical host is the default in production.

- [ ] **Step 2: Verify build compiles**

Run: `npm run build`  
Expected: SUCCESS.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix(seo): set metadataBase to canonical host"
```

---

## Task 4: Fix document language (`<html lang>`) and locale layout SEO responsibilities (Phase 1)

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/layout.tsx` (if this is where `<html>` actually lives)

- [ ] **Step 1: Confirm where `<html>` is defined**

Requirement:
- There must be exactly **one** `<html>` in the layout tree (root ownership).
- `lang` must be on `<html>`, not a nested `<div>`.

Implementation note:
- In many App Router setups, `<html>` is owned by `src/app/layout.tsx` and nested layouts cannot redefine it. Do not introduce a second `<html>`.

- [ ] **Step 2: Implement locale-correct `<html lang>` in the correct layout**

Acceptance criteria:
- `/en/*` renders `<html lang="en">`
- `/tr/*` renders `<html lang="tr">`
- No redirect loops or hydration regressions.

- [ ] **Step 3: Routing smoke checks**

Run: `npm run dev` and spot-check `/en` and `/tr`.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/[locale]/layout.tsx
git commit -m "fix(i18n): set html lang per locale"
```

---

## Task 5: Add Phase 1 metadata wiring for canonical + `hreflang` on key indexable routes

**Files:**
- Create: `src/lib/seo/metadata.ts`
- Modify: a small set of representative, clearly indexable routes under `src/app/[locale]/*`:
  - `src/app/[locale]/page.tsx` (home; already has `generateMetadata`)
  - `src/app/[locale]/products/page.tsx`
  - `src/app/[locale]/solutions/page.tsx`
  - `src/app/[locale]/about/page.tsx`
  - (optional) `src/app/[locale]/technology/page.tsx`

- [ ] **Step 1: Write a failing test for metadata helper (canonical + alternates)**

Add `src/lib/seo/__tests__/metadata.test.ts` verifying `buildIndexableMetadata(...)` (or equivalent) returns:
- `alternates.canonical` = `https://www.owlintelligence.co.uk/{locale}{pathname}`
- `alternates.languages.en/tr/x-default` correctness

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test`  
Expected: FAIL (module missing).

- [ ] **Step 3: Implement minimal `src/lib/seo/metadata.ts`**

Requirements (Phase 1):
- Accept `{ locale, pathname, title, description }`
- Return `Metadata` including:
  - `title`, `description`
  - `alternates` using `buildAlternates(...)`
  - optional OG/Twitter defaults (ok to rely on root defaults initially)

- [ ] **Step 4: Wire helper into the representative routes**

Acceptance criteria:
- Viewing HTML source for `/en`, `/tr` includes:
  - canonical link to `https://www.owlintelligence.co.uk/...`
  - `hreflang` alternates for `en` + `tr` (+ `x-default`)

- [ ] **Step 5: Run build**

Run: `npm run build`  
Expected: SUCCESS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/seo/metadata.ts src/lib/seo/__tests__/metadata.test.ts src/app/[locale]/page.tsx src/app/[locale]/products/page.tsx src/app/[locale]/solutions/page.tsx src/app/[locale]/about/page.tsx src/app/[locale]/technology/page.tsx
git commit -m "feat(seo): add canonical and hreflang metadata for key routes"
```

---

## Task 5: Correct robots route to always reference canonical sitemap URL (Phase 1)

**Files:**
- Modify: `src/app/robots.ts`
- (Optional) Add a tiny unit test if you extract URL building to `src/lib/seo/site.ts`

- [ ] **Step 1: Replace fallback baseUrl with canonical host helper**

Requirements:
- sitemap URL uses `https://www.owlintelligence.co.uk/sitemap.xml`
- disallow remains for `/api/` and `/studio/`

- [ ] **Step 2: Verify locally**

Run: `npm run dev` then request `/robots.txt` in browser.  
Expected: sitemap points at canonical host.

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "fix(seo): ensure robots sitemap uses canonical host"
```

---

## Task 6: Fix sitemap route host + lastmod correctness + exclusions (Phase 1)

**Files:**
- Modify: `src/app/sitemap.ts`
- Create: `src/lib/seo/sitemap.ts` (pure generator; enables unit tests)
- Test: `src/lib/seo/__tests__/sitemap.test.ts`

- [ ] **Step 1: Switch sitemap base URL to canonical host helper**

Requirement:
- All `url` entries start with `https://www.owlintelligence.co.uk/`.

- [ ] **Step 2: Remove blanket `lastModified: new Date()`**

Decision (Phase 1):
- For the current static list sitemap, omit `lastModified` to avoid false freshness.

- [ ] **Step 3: Exclude known utility/non-index routes (if decided)**

At minimum:
- Do not include `/studio` or `/api` (already not present).
- Decide whether to include `/tools/product-finder` and any playground routes. If not intended to rank, remove from `staticPages`.

- [ ] **Step 4: Verify locally**

Request `/sitemap.xml`.  
Expected: stable output and correct host.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix(seo): correct sitemap host and remove false lastmod"
```

---

## Task 7: Add “noindex” for studio route (Phase 1 indexation boundary)

**Files:**
- Modify: `src/app/studio/[[...tool]]/page.tsx` OR add route segment config with Metadata API

- [ ] **Step 1: Implement `noindex` metadata for studio**

Requirement:
- `/studio/*` must emit `robots: { index: false, follow: false }` (or follow true if you prefer).

- [ ] **Step 2: Verify**

Open studio route and inspect HTML head or response headers.

- [ ] **Step 3: Commit**

```bash
git add src/app/studio/[[...tool]]/page.tsx
git commit -m "fix(seo): noindex Sanity Studio route"
```

---

## Task 8: Redirect/canonicalization enforcement (infra) + verification (Phase 1 requirement)

**Files:**
- (May be infra-only; if in-repo, document the chosen mechanism and implement accordingly.)

- [ ] **Step 1: Implement redirects in hosting/edge config**

Required redirects:
- `http://www.owlintelligence.co.uk/*` → `https://www.owlintelligence.co.uk/*`
- `https://owlintelligence.co.uk/*` → `https://www.owlintelligence.co.uk/*`
- Normalize trailing slash variants and locale root variants (`/en` vs `/en/`) based on the chosen canonical shape.
- Decide `/` policy:
  - recommended: `/` → `/en`

- [ ] **Step 2: Verify against deployed environment**

Run (replace with your deployment URL):
- `curl -I http://www.owlintelligence.co.uk/en`
  - Expected: 301/308 to `https://www.owlintelligence.co.uk/en`
- `curl -I https://owlintelligence.co.uk/en`
  - Expected: 301/308 to `https://www.owlintelligence.co.uk/en`

- [ ] **Step 3: Document the enforcement point**

Update README or ops docs (location depends on your repo conventions) with:
- where redirects are configured
- exact rules
- how to verify

---

## Task 8: Add JSON-LD emitter + global Organization/WebSite schemas (Phase 2)

**Files:**
- Create: `src/components/seo/jsonld.tsx`
- Create: `src/lib/seo/schema/organization.ts`
- Create: `src/lib/seo/schema/website.ts`
- Modify: `src/app/[locale]/layout.tsx` (or a shared layout component) to render them on indexable pages

- [ ] **Step 1: Write minimal JSON-LD emitter**
- [ ] **Step 2: Add Organization + WebSite schema builders (no spam)**
- [ ] **Step 3: Render globally for indexable pages**
- [ ] **Step 4: Validate with Google Rich Results Test / Schema Validator**
- [ ] **Step 5: Commit**

---

## Task 9: Build metadata template helper and wire into key routes (Phase 2)

**Files:**
- Extend: `src/lib/seo/metadata.ts` (from Phase 1)
- Modify: additional routes and page types under `src/app/[locale]/*`
  - contact, agent, investors, founders
  - add CMS-driven templates when they exist (e.g. insights detail)

- [ ] **Step 1: Add `buildMetadata({ locale, pathname, title, description, ... })`**
- [ ] **Step 2: Add alternates + canonical for each route**
- [ ] **Step 3: Ensure Open Graph and Twitter are consistent**
- [ ] **Step 4: Add regression tests (snapshots for helper outputs)**
- [ ] **Step 5: Commit (small, per template group)**

---

## Task 10: Sanity SEO governance + query projections (Phase 3)

**Files:**
- Modify: `sanity/schemas/objects/seo.ts`
- Modify: `sanity/lib/queries.ts`

- [ ] **Step 1: Expand SEO object fields + validations**
- [ ] **Step 2: Project `seo` + timestamps in queries**
- [ ] **Step 3: Wire Sanity SEO fields into Next metadata on CMS-driven routes**
- [ ] **Step 4: Commit**

---

## Verification checklist (Phase 1 exit criteria)

- [ ] **Canonical host**: sitemap + robots + metadataBase all use `https://www.owlintelligence.co.uk`
- [ ] **Locale indexing**: representative `/en/*` and `/tr/*` routes emit correct canonical + `hreflang` alternates (and do not point alternates at non-existent pages)
- [ ] **Studio**: `/studio/*` is `noindex` and disallowed in robots
- [ ] **Sitemap quality**: no blanket “updated now”; no non-indexable URLs included
- [ ] **Basic tests**: Vitest passes and includes canonical/alternates URL unit tests
- [ ] **Redirect verification**: http→https and non-www→www redirects verified on production

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-03-26-seo-framework-implementation-plan.md`.

Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration  
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?

