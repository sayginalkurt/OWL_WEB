# Next.js + Sanity + Supabase SEO framework (design)

## Goal

Implement a **complete, maintainable SEO framework** for an existing production website built on:

- Next.js App Router (`next@16`)
- `next-intl` locale routing (`/en/*`, `/tr/*`)
- Sanity CMS (localized fields)
- Supabase (SSR client utilities present)
- Vitest (for regression tests)

The framework must improve **crawlability, indexability, metadata consistency, structured data coverage, performance inputs (CWV), and long-term governance** across engineering + content workflows.

## Agreed decisions (locked)

- **Locales**: Both `/en/*` and `/tr/*` are **indexable**. Use `hreflang` alternates between locales.
- **Canonical host**: `https://www.owlintelligence.co.uk` is the single canonical host.

## Non-goals

- No “SEO hacks” or spammy schema. Only accurate, page-appropriate markup.
- No indexing of utility/internal/studio routes.
- No broad refactors unrelated to SEO/system correctness.

## Current state (observed in repo)

### Routing & i18n

- App Router with locale segment: `src/app/[locale]/*`
- `next-intl` middleware: `src/middleware.ts` excludes `/api`, `/_next`, `/studio`, `/_vercel`, and static files.
- Locales: `en`, `tr` (`src/i18n/config.ts`)

### Existing technical SEO endpoints

- Robots route: `src/app/robots.ts`
  - Disallows `/api/` and `/studio/`
  - References sitemap at `${baseUrl}/sitemap.xml`
  - **Risk**: fallback base URL is not the agreed canonical host
- Sitemap route: `src/app/sitemap.ts`
  - Generates a static list of pages for `en`/`tr`
  - Uses `lastModified: new Date()` for every entry
  - **Risk**: fallback base URL is not the agreed canonical host

### Metadata usage

- Root metadata exists in `src/app/layout.tsx` (title template + description)
- Homepage (`src/app/[locale]/page.tsx`) implements `generateMetadata` via translations
- Most other routes appear to not implement route-level metadata yet

### Sanity SEO model (existing)

- `sanity/schemas/objects/seo.ts` exists with:
  - localized meta title/description
  - ogImage
- Sanity document types include `insight` with `seo` field; queries currently do **not** project SEO fields in `sanity/lib/queries.ts`

## Design principles

### 1) One SEO “kernel”, many consumers

Create a small, well-typed SEO core that everything reuses:

- canonical URL generation
- locale alternates (`hreflang`)
- metadata building with safe fallbacks
- JSON-LD generation by page type
- sitemap + robots share the same canonical host source

### 1.1) URL, indexation, and duplication policy (MUST IMPLEMENT)

This project must enforce a single, deterministic URL shape for each indexable page. “Canonical host in tags” is not enough—**redirects + canonicals + sitemaps must agree**.

#### Canonicalization + redirects

- Enforce redirects at the edge (preferred) or Next middleware (only if edge config is unavailable):
  - `http://*` → `https://*`
  - `https://owlintelligence.co.uk/*` → `https://www.owlintelligence.co.uk/*`
  - Normalize locale roots and trailing-slash variants (choose one canonical shape and redirect the other).
- Define behavior for `/`:
  - Either redirect `/` → `/en` (simple and deterministic), or implement locale negotiation.
  - Regardless, the **canonical URL must match the final, resolved URL**.

#### Parameterized URLs (UTM / filters / sort / pagination)

- Canonical URLs **never** include querystrings or hashes.
- Tracking parameters (e.g. `utm_*`, `gclid`, `fbclid`) must never create indexable variants.
- Filter/sort/search/pagination parameters must be explicitly classified as either:
  - **Indexable** (rare; requires dedicated template + unique content + stable URL), or
  - **Default**: `noindex,follow` + excluded from sitemap + canonical to the base listing URL.

#### Pagination

- Only the “page 1” listing URL should appear in sitemap.
- Paginated listing pages are `noindex,follow` unless explicitly designed as SEO landing pages.

#### Missing translations / alternates

- Only emit `hreflang` alternates that actually exist (no pointing alternates at 404s).
- If a locale variant is missing/untranslated, it must not be indexable (choose 404 or redirect-to-other-locale policy per template and enforce it consistently).

### 2) Make indexing boundaries explicit

Some pages exist for users but should not be indexed:

- Sanity Studio (`/studio`)
- API (`/api/*`)
- potential “tool” routes (e.g. `/tools/*`) depending on product intent
- playground/utility pages (e.g. `/products/fuzzyowl/playground`) unless intentionally designed as indexable landing pages

The framework must support **route-level noindex** (Metadata API) and **sitemap exclusion**.

### 3) Locale correctness is not optional

Every indexable page must have:

- correct **canonical** (www + locale)
- `hreflang` alternates for `en` and `tr`
- optional `x-default` pointing to `/en/*`

### 4) Avoid false freshness

Sitemap entries should not claim “updated now” unless true. Use:

- static lastmod for marketing pages (or omit)
- Sanity `_updatedAt` / `publishedAt` for content entries

## Proposed approaches (2–3) and recommendation

### Approach A (recommended): Next Metadata API + shared SEO utilities

- Use Next.js Metadata API (`metadata`, `generateMetadata`) as the single source of meta tags.
- Centralize canonical/alternates logic in `src/lib/seo/*`.
- Emit JSON-LD via a small `<JsonLd />` component using `next/script`.
- Keep sitemap/robots in App Router metadata routes, but make them data-driven.

**Pros**: idiomatic App Router, typed, composable, testable, low long-term cost.  
**Cons**: requires disciplined adoption across routes.

### Approach B: “SEO provider” component pattern

- Build an `<SEO />` component inserted into pages/layouts to set tags.

**Pros**: familiar to teams from Pages Router era.  
**Cons**: easier to drift; less native than Metadata API; can conflict with server components.

### Approach C: CMS-first SEO (Sanity controls most SEO output)

- Use Sanity SEO fields aggressively across templates.

**Pros**: editorial control.  
**Cons**: risk of inconsistency and schema spam without strong guardrails; still needs a kernel for canonical/alternates and safe defaults.

## Decision

Proceed with **Approach A** plus **CMS SEO fallbacks** (Approach C as an input source, not the system).

## Information architecture (SEO surfaces)

### Page types (expected)

- **Marketing**: home, products index, product detail pages, solutions index/detail, about pages, contact
- **Editorial**: insights list, insight detail, optional tag/category/author pages
- **Utility**: tools (product finder), playgrounds
- **Infrastructure**: studio, api routes

### SEO outputs per page type (minimum)

- **All indexable pages**
  - title + description
  - canonical
  - `hreflang` alternates
  - OG + Twitter
  - Organization + WebSite JSON-LD (site-wide or layout-level)
  - BreadcrumbList JSON-LD where depth > 1
- **Insights detail**
  - BlogPosting/Article JSON-LD with author/date/headline/image
- **Product/service pages**
  - Service or Product JSON-LD (pick based on actual offering shape; default to Service for B2B unless real offers exist)
- **FAQ surfaces**
  - FAQPage JSON-LD only when Q/A is visibly rendered

## Technical SEO implementation details (Next.js App Router)

### Canonical host & URL building

- Canonical host: `https://www.owlintelligence.co.uk`
- Canonical URL = host + `/{locale}{pathname}` (no querystring; no hash)
- Canonical must always be **absolute** and begin with the canonical host.
- Trailing slash policy: maintain current Next routing (no forced trailing slash), but **normalize variants via redirects** so crawlers see one stable URL shape.

### Locale alternates (`hreflang`)

For any indexable route `/{locale}{pathname}`:

- `en`: `https://www.owlintelligence.co.uk/en{pathname}`
- `tr`: `https://www.owlintelligence.co.uk/tr{pathname}`
- `x-default`: `https://www.owlintelligence.co.uk/en{pathname}`

### Robots & indexation boundaries

- Keep robots disallow for:
  - `/api/`
  - `/studio/`
- Additionally enforce **noindex** at route-level for:
  - `/studio/*`
  - any other non-search routes (tools/playground) as decided by product intent
- Ensure such routes are **excluded from sitemap**.
- Staging/preview environments must be `noindex` (prefer global noindex in those deployments).

### Sitemap strategy

Start with:

- Static marketing pages for `en` + `tr`
- Add Sanity-driven pages:
  - insights articles (with accurate `lastModified`)
  - CMS pages/products/solutions if those routes are Sanity-driven

Evolve to sitemap index if URL count grows materially.

#### Sitemap acceptance criteria (testable)

- Sitemap URLs always use the canonical host `https://www.owlintelligence.co.uk`.
- Sitemap must exclude:
  - `noindex` content
  - `/studio/*`, `/api/*`
  - parameterized/paginated URLs (unless explicitly approved as indexable)
- `lastModified` must be stable and truthful:
  - static pages: omit or use a stable build timestamp
  - Sanity content: use `_updatedAt` and/or `publishedAt`
- Order is stable (deterministic sorting) and URLs are deduped.
- If URL count approaches limits (50k URLs / 50MB), emit a sitemap index and chunked sitemaps.

### Rendering strategy

- Marketing pages: SSG or ISR where possible
- Editorial pages: ISR (revalidate) backed by Sanity publish/update timestamps
- Utility pages: SSR ok; indexation decision explicit

## Sanity SEO model design (governance)

### Expand `seo` object fields

Add fields to `sanity/schemas/objects/seo.ts`:

- `seoTitle` (localizedString)
- `metaDescription` (localizedString)
- `ogTitle` (localizedString)
- `ogDescription` (localizedString)
- `ogImage` (image) (keep)
- `canonicalUrl` (url, optional override with strict guardrails)
- `noindex` (boolean)
- `nofollow` (boolean; default false)
- `focusKeyword` / `targetQuery` (string, optional governance)
- `structuredDataOverride` (string/json, advanced; behind strict validation/policy)

#### Guardrails for `canonicalUrl`

- Only allow same-host, absolute canonicals that start with `https://www.owlintelligence.co.uk/`.
- Disallow cross-host canonicals.
- If `canonicalUrl` is set, alternates must still remain internally consistent and must not create cross-locale duplicate canonicals.

### Validation rules

- Meta title: warn > ~60 characters (soft)
- Meta description: warn > ~160 characters (soft)
- Require slug on indexable doc types
- Encourage excerpt for editorial types (used as fallback)

### Fallback logic (critical)

If editors don’t fill SEO fields:

- `seoTitle` → document title
- `metaDescription` → excerpt; else derive from first text block (trimmed)
- OG fields → fall back to SEO title/description
- OG image → fall back to site default

## Testing & regression protection (Vitest)

Add lightweight unit tests to prevent regressions:

- Canonical URL builder: host + locale + path correctness
- Alternates builder: correct `en`/`tr`/`x-default`
- Sitemap generation: includes only indexable URLs; uses canonical host
- Metadata builder snapshots for representative templates

## Content lifecycle requirements (Sanity)

- If a Sanity document is unpublished/deleted:
  - remove it from sitemap immediately (or on next revalidate)
  - serve 404 (or 410 if you decide to signal permanent removal—choose one policy and apply consistently)
- If a slug changes:
  - implement a redirect strategy (at minimum: last-known slug → new slug via 301)
  - ensure canonicals and sitemap reflect the new URL only

## Deliverables (files to create/modify)

### Next.js

- Modify:
  - `src/app/layout.tsx` (global metadata defaults, `metadataBase`)
  - `src/app/[locale]/layout.tsx` (document `lang`, locale-aware alternates pattern)
  - `src/app/robots.ts` (canonical host, stricter rules, use shared site URL)
  - `src/app/sitemap.ts` (canonical host, accurate lastmod, Sanity entries)
- Create:
  - `src/lib/seo/site.ts` (canonical host, locales, absolute URL builder)
  - `src/lib/seo/alternates.ts` (canonical + `hreflang`)
  - `src/lib/seo/metadata.ts` (typed metadata builder + fallbacks)
  - `src/components/seo/jsonld.tsx` (safe JSON-LD emitter)
  - `src/lib/seo/schema/*` (Org/WebSite/Breadcrumb/Article/Person/Service)

### Sanity

- Modify:
  - `sanity/schemas/objects/seo.ts` (fields + validation)
  - relevant document schemas to include `seo` consistently (where missing)
  - `sanity/lib/queries.ts` to project SEO fields + timestamps for metadata/sitemap

## Rollout plan (high-level)

- Phase 1 (critical correctness): canonical host + locale alternates + sitemap/robots correctness + studio noindex
- Phase 2 (coverage): metadata templates for each page type + JSON-LD by template
- Phase 3 (governance): Sanity schema expansions + editor previews/guardrails + automated tests

