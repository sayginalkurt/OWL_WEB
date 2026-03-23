# OWL Intelligence — Homepage Redesign Spec

**Date:** 2026-03-23
**Status:** Approved for implementation
**Scope:** `src/app/[locale]/page.tsx` + new `src/components/home/` folder + shared utilities

---

## 1. Design Decisions (Finalized)

| Decision | Choice | Notes |
|---|---|---|
| Visual tone | Dark hero → Light body | Selective dark sections for technical content |
| Hero layout | Left-aligned asymmetric split | Headline left (60%), data accent right (40%) |
| Product Ecosystem viz | Layered Stack Diagram | Numbered pill rows, animated sequentially |
| Intelligence Layer viz | Annotated Narrative Steps | 8 steps in two staggered columns |
| Section rhythm | Hard Cuts | Background changes abruptly — no gradient fades, no border lines |
| Founders treatment | Quote-Forward | Voice before face, magazine-like |

---

## 2. Content Source

All text content: `owlcontent/owl_website_content_en.md`
All image assets: `owlcontent/images/`

### Asset Inventory

| Asset | File | Usage |
|---|---|---|
| OWL logo (gold) | `owlgold.svg` | Dark sections only |
| OWL logo (navy) | `owlnavy.svg` | Light sections only |
| FWBM logo | `fwbmlogo.svg` | Product Ecosystem — shown as-is (green `#7ed957`) |
| FuzzyOwl logo | `fuzzyowl.png` | Product Ecosystem — shown as-is (blue gradient) |
| Beyza Polat photo | `beyzapolat.png` | Founders — 36×36px circular avatar |
| Saygın Vedat Alkurt photo | `sayginalkurt.png` | Founders — 36×36px circular avatar |

### Image handling (next/image)

All assets must be copied to `public/images/` before use. Use `next/image` for all images with explicit `width`, `height`, and descriptive `alt` text. SVG files (`owlgold.svg`, `owlnavy.svg`, `fwbmlogo.svg`) are best inlined as React components using `next/image` with `width`/`height` or via direct `<img>` with `unoptimized` — whichever preserves SVG crispness.

```
public/
  images/
    owlgold.svg
    owlnavy.svg
    fwbmlogo.svg
    fuzzyowl.png
    beyzapolat.png
    sayginalkurt.png
```

---

## 3. Color System

### New CSS custom properties — add to `src/app/globals.css` inside the `@theme inline` block

```css
@theme inline {
  /* existing tokens ... */

  /* Dark section backgrounds — homepage only */
  --color-dark-base: #07090f;
  --color-dark-mid: #0d1422;
  --color-dark-surface: #0e1624;
  --color-dark-border: #1a2640;

  /* OWL brand colors — used only on wordmark/logo */
  --color-owl-gold: #d3af37;
  --color-owl-navy: #292d69;
}
```

These become Tailwind utilities: `bg-dark-base`, `bg-dark-mid`, `border-dark-border`, etc.

### Token usage table

| Usage | Tailwind class | Value |
|---|---|---|
| Dark section background | `bg-dark-base` or `bg-dark-mid` | `#07090f` / `#0d1422` |
| Dark card/surface | `bg-dark-surface` | `#0e1624` |
| Dark card border | `border-dark-border` | `#1a2640` |
| Light section background | `bg-background` | `oklch(1 0 0)` |
| Primary text (dark bg) | literal `text-[#f0f0f0]` | Near-white |
| Muted text (dark bg) | literal `text-[#5a6888]` | Muted navy-blue |
| Primary text (light bg) | `text-foreground` | Existing token |
| Muted text (light bg) | `text-muted-foreground` | Existing token |
| Accent — eyebrows, timeline dots | `text-chart-3` | Blue (oklch 0.546) |
| Accent — metric values, pills | `text-chart-2` | Blue (oklch 0.623) |
| Accent — hover highlights | `text-chart-1` | Blue (oklch 0.809) |
| FWBM product color | literal `text-[#7ed957]` | Green — product brand only |
| OWL gold wordmark | `text-owl-gold` | `#d3af37` — dark sections only |
| OWL navy wordmark | `text-owl-navy` | `#292d69` — light sections only |

### Hard cuts between sections

Hard cuts are achieved by **direct background-color changes only** — no border lines, no gradient fade. When a dark section immediately precedes a light section, the visual boundary is the raw edge of the two backgrounds. This creates the deliberate, page-turning editorial effect.

---

## 4. Typography

Font family: **Geist Sans** throughout. No new fonts introduced.

**Important:** The root layout's Geist font import must include weight 800. Verify `src/app/layout.tsx` Geist configuration includes `weight: ['400', '500', '600', '700', '800']` or equivalent. Without this, the browser synthesizes bold weight, which degrades rendering quality.

| Role | Tailwind size | Weight class | Tracking | Color |
|---|---|---|---|---|
| Eyebrow label | `text-[11px]` | `font-bold` | `tracking-widest` | `text-chart-3` (dark) / `text-muted-foreground` (light) |
| Hero headline | `text-5xl lg:text-6xl xl:text-7xl` | `font-extrabold` | `tracking-tight` + `leading-[1.08]` | `text-[#f0f0f0]` |
| Section headline | `text-4xl lg:text-5xl` | `font-bold` | `tracking-tight` | Foreground-appropriate |
| Section sub-headline | `text-xl lg:text-2xl` | `font-medium` | normal | Muted |
| Body copy | `text-base lg:text-lg` | `font-normal` | normal | Muted, `leading-relaxed` |
| Metric value (hero accent) | `text-3xl` | `font-bold` | `tracking-tight` | `text-chart-2` |
| Timeline step number | `text-[11px]` | `font-bold` | `tracking-widest` | `text-chart-3` |
| Founder quote | `text-xl` | `font-semibold` | normal | `text-foreground`, `italic` |
| Founder name | `text-sm` | `font-bold` | normal | `text-foreground` |

---

## 5. Section Map

| # | Component | Background | Notes |
|---|---|---|---|
| 1 | `HeroSection` | **Dark** (`bg-dark-base`) | Cinematic entry |
| 2 | `BusinessSpeedSection` | Light | Problem statement, editorial |
| 3 | `ValueSection` | Light | Value props, 3-column |
| 4 | `ProductEcosystemSection` | **Dark** (`bg-dark-mid`) | Contiguous with section 5 |
| 5 | `IntelligenceLayerSection` | **Dark** (`bg-dark-mid`) | Contiguous with section 4 |
| 6 | `WhoWeServeSection` | Light | 9 sector pills |
| 7 | `WhyOwlSection` | Light | 3 differentiators |
| 8 | `FoundersSection` | Light | Quote-forward |
| 9 | `PartnershipsSection` | **Dark** (`bg-dark-mid`) | Contiguous with section 10 |
| 10 | `AgentSection` | **Dark** (`bg-dark-mid`) | Contiguous with section 9 |
| 11 | `ContactDemoSection` | Light | CTA + link to /contact |
| 12 | `Footer` | Light | **Existing `footer.tsx` unchanged** |

**Dark zones:**
- Zone A: Section 1 (hero) — standalone
- Zone B: Sections 4–5 (product + intelligence) — visually contiguous, same `bg-dark-mid`
- Zone C: Sections 9–10 (partnerships + agent) — visually contiguous, same `bg-dark-mid`

**Footer note:** The existing `footer.tsx` uses `bg-muted/30` (light). It is not changed. Section 12 in the map is therefore **light-themed**.

---

## 6. Client / Server Component Boundary

This is the most critical architectural decision for this implementation.

### Rule

`page.tsx` remains a **Server Component**. It uses `getTranslations` (server-side next-intl API) to pass translated strings as props down to section components.

All section components under `src/components/home/` are **Client Components** (`"use client"`) because they use Framer Motion hooks (`useInView`, `useAnimation`).

Shared components in `src/components/home/shared/` that use Framer Motion (`RevealWrapper`, `ScrollCue`) are also Client Components. `SectionContainer`, `Eyebrow`, and `SectionHeading` are **Server Components** (no hooks, pure presentational).

### Pattern in `page.tsx`

```tsx
// src/app/[locale]/page.tsx  — Server Component, no "use client"
import { getTranslations } from 'next-intl/server'
import { HeroSection } from '@/components/home/hero-section'
// ... other imports

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
      {/* ... remaining sections */}
    </main>
  )
}
```

### Pattern in section components

```tsx
// src/components/home/hero-section.tsx
'use client'

import { motion, useInView } from 'framer-motion'
// No useTranslations here — strings arrive as props

interface HeroSectionProps {
  eyebrow: string
  headline: string
  body: string
  ctaPrimary: string
  ctaSecondary: string
  metrics: { value: string; label: string }[]
}
```

This pattern:
- Keeps RSC benefits on the page shell
- Avoids nesting server components inside client components
- Works correctly with the existing `NextIntlClientProvider` in the locale layout
- Keeps translation logic in one place (page.tsx)

### `generateMetadata`

`page.tsx` must preserve (and update) the existing `generateMetadata` export:

```tsx
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' })
  return {
    title: t('meta.title'),        // add to messages/en.json
    description: t('meta.description'),
  }
}
```

---

## 7. Section Specifications

### 7.1 Hero Section

**Background:** `bg-dark-base` (`#07090f`) with radial gradient overlay for depth:
`style={{ background: 'radial-gradient(ellipse at 30% 50%, #0d1422 0%, #07090f 70%)' }}`

**Layout:** `grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center`
On mobile (`< lg`): single column, right column hidden or collapsed below CTAs.

**Left column:**
- Eyebrow component: `NEXT-GEN RESEARCH`
- Headline: `Advanced Analytics Grounded in Field Data` — `text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#f0f0f0]`
- Body: "OWL Intelligence develops decision-support products for institutions by combining validated field data, structured analytics, and AI governed within a clear oversight framework." — `text-base lg:text-lg text-[#5a6888] leading-relaxed max-w-xl`
- CTA row: `flex flex-wrap gap-3 mt-8`
  - Primary: existing `Button` component, default variant (dark bg, light text), label "Explore Products", links to `/products`
  - Secondary: existing `Button` component, outline variant, label "Talk to Our Agent →", links to `/agent`
- Scroll cue: `ScrollCue` component, `mt-12`

**Right column (hidden on mobile):**
- 3 metric cards, `flex flex-col gap-4`
- Card structure: `rounded-lg bg-dark-surface border border-dark-border p-5`
- Metric value: `text-3xl font-bold tracking-tight text-chart-2`
- Label: `text-sm text-[#5a6888] mt-1 leading-snug`
- Content:
  - Card 1: value `"81"`, label `"Provinces of field coverage across Turkey"`
  - Card 2: value `"15+"`, label `"Years of institutional research experience"`
  - Card 3: value `"2"`, label `"AI-supported decision products in the ecosystem"`
- Cards animate in with `motion.div` stagger, `delay: 0.2 / 0.35 / 0.5`

**OWL logo:** `owlgold.svg` — shown in header (header is separate, unchanged)

---

### 7.2 Business Speed Section

**Background:** `bg-background`
**Padding:** `py-20 sm:py-28`

**Layout:** Single column, `max-w-3xl mx-auto px-4 sm:px-6 lg:px-8`

**Content:**
- `Eyebrow`: `BUSINESS MOVES FASTER THAN TRADITIONAL DATA`
- 3 statement lines, each wrapped in `RevealWrapper` with 80ms stagger delay:

```
1. "Static measurement cannot keep pace with changing conditions."
2. "Delayed signals weaken response quality."
3. "Better decisions require higher-frequency, ground-level evidence."
```

- Statement style: `text-2xl lg:text-3xl font-semibold leading-snug text-foreground`
- Left accent: `border-l-2 border-chart-3 pl-6 py-2`
- Gap between statements: `gap-8`

**Mobile:** Same layout, text scales to `text-xl`

---

### 7.3 Value Section

**Background:** `bg-background`

**Layout:**
- Top: `Eyebrow` + `SectionHeading` + intro paragraph, centered, `max-w-2xl mx-auto text-center`
- Below: 3-column grid `grid lg:grid-cols-3 gap-8 mt-16`, each column left-aligned

**Content:**
- Eyebrow: `HOW OWL INTELLIGENCE CREATES VALUE`
- Heading: "Measurement, analytics, and AI in one decision-support layer"
- Intro: "OWL Intelligence brings measurement, analytics, and AI together within a single decision-support layer. It continuously monitors real-world conditions, processes emerging signals, and makes them usable for institutional contexts. This makes it possible not only to see change, but to interpret it in time."
- Column 1 — **Measurement**: short title + 1-sentence note derived from content
- Column 2 — **Analytics**: short title + 1-sentence note
- Column 3 — **AI**: short title + 1-sentence note
- Each column: `RevealWrapper` with sequential 100ms stagger

**Mobile:** Columns stack vertically

---

### 7.4 Product Ecosystem Section

**Background:** `bg-dark-mid`
**OWL logo version:** `owlgold.svg` (if logo appears in this section)

**Layout:** `grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start`
- Left: eyebrow + heading + brief intro
- Right: two product stack blocks (FWBM then FuzzyOwl), stacked vertically with `gap-12`

**Eyebrow:** `PRODUCT ECOSYSTEM`
**Heading:** "An integrated structure that turns field data into stronger decisions"
**Intro:** "Our product ecosystem provides an integrated structure that turns field data into stronger measurement, analysis, and decision support."

**Product stack block (shared structure):**
```
[ product logo ]  [ product name ]    ← logo + name row, `flex items-center gap-3`
[ short descriptor paragraph ]        ← `text-sm text-[#5a6888] mt-2 max-w-sm`
[ layer pill 1 ]                      ← full-width pill
[ layer pill 2 ]
[ layer pill 3 ]
```

**Layer pill style:**
- `w-full rounded-md px-4 py-2.5 text-sm font-medium`
- FWBM pills: `bg-[#0e1624] border border-dark-border text-[#5a7aaa]`
- FuzzyOwl pills: same base style
- Number prefix: `text-chart-3 mr-3 font-bold text-[11px] tracking-widest`
- Animation: `motion.div` with `sequentialContainer` on the pill group, `staggerItem` per pill — triggered by `useInView` on the product block

**FWBM block:**
- Logo: `<Image src="/images/fwbmlogo.svg" width={32} height={32} alt="FWBM" />`
- Name: "Financial Well-Being Monitor"
- Descriptor: "Next-generation household financial resilience measurement at institutional scale."
- Pills: `01 Validated Field Data` / `02 Structured Analytics` / `03 Decision Infrastructure`

**FuzzyOwl block:**
- Logo: `<Image src="/images/fuzzyowl.png" width={32} height={32} alt="FuzzyOwl" />`
- Name: "FuzzyOwl"
- Descriptor: "Makes visible which variables shape decisions, how they influence each other, and how interventions affect the system as a whole."
- Pills: `01 Relational Mapping` / `02 AI-Supported Analytics` / `03 Scenario Simulation`

**Mobile:** Left column stacks above right column

---

### 7.5 Intelligence Layer Section

**Background:** `bg-dark-mid` (contiguous with Section 4 — no visual boundary between them)

**Eyebrow:** `HOW OUR INTELLIGENCE LAYER WORKS`
**Heading:** "Eight integrated stages from raw signal to institutional decision"

**Layout:**
- Heading block: full width, `mb-16`
- Steps grid: `grid lg:grid-cols-2 gap-x-16 gap-y-10`
- On mobile: single column

**Step item structure:**
```tsx
<RevealWrapper variant="fadeUp">
  <div>
    <span>  {/* step number — "01" */}
      text-[11px] font-bold tracking-widest text-chart-3
    </span>
    <h3>  {/* step title */}
      text-lg font-bold text-[#ccd] mt-1
    </h3>
    <p>  {/* step body */}
      text-sm text-[#5a6888] leading-relaxed mt-2
    </p>
  </div>
</RevealWrapper>
```

**Animation:** Each step is individually wrapped in `RevealWrapper`. Left column steps (1–4) use `delay={index * 0.1}`. Right column steps (5–8) use `delay={0.2 + index * 0.1}`, so left column begins revealing slightly before right.

**The 8 steps (exact content):**

| # | Title | Body |
|---|---|---|
| 01 | Methodology Design | Each product begins with an embedded methodology that defines what is measured and how it is measured. |
| 02 | Data Collection | A regular, structured, and highly reliable flow of real-world data is generated through fieldwork. |
| 03 | Validation and Audit Control | The AuditorAI layer subjects the data to quality, consistency, and validation checks, creating a fully validated foundation. |
| 04 | Unified Data Integration | Validated field data is brought together with integrated databases and relevant external data sources within a single data structure. |
| 05 | Classification and Structuring | The ClassifyAI layer organizes the data into meaningful categories, labels it, and prepares it for analysis. |
| 06 | Computation Engines | Deterministic computation engines consistently generate indicators, scores, segments, and decision rules. |
| 07 | Live Decision Dashboards | Processed data becomes trackable, comparable, and ready for institutional use through live dashboards. |
| 08 | Governed AI Analysis Layer | Governed AI analysis assistants such as Monet and FuzzyOwl interpret findings, explain patterns, and complete the analytical layer. |

---

### 7.6 Who We Serve Section

**Background:** `bg-background`

**Layout:** Two-column on desktop: `grid lg:grid-cols-[2fr_3fr] gap-12 items-start`
- Left: `Eyebrow` + `SectionHeading` + one-line context sentence
- Right: flowing pill grid

**Eyebrow:** `WHO WE SERVE`
**Heading:** "Built for institutions that operate at complexity"
**Context line (left column):** "Nine sectors. One coherent intelligence infrastructure."

**9 sector pills (right column):**
```
Finance and Banking · Insurance · Retail · Fast-Moving Consumer Goods
· E-Commerce · Durable Goods and Home Appliances · Real Estate
· Technology and Telecommunications · International Organizations
```
- Pill style: `inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground`
- On hover: `hover:border-chart-3 hover:text-chart-3 transition-colors`
- Container: `flex flex-wrap gap-3`
- Each pill: `RevealWrapper` with `staggerItem`, triggered together via `staggerContainer`

**i18n keys:** `home.sectors.items` — an array of 9 strings in `messages/en.json`:
```json
"sectors": {
  "eyebrow": "...",
  "heading": "...",
  "context": "...",
  "items": [
    "Finance and Banking",
    "Insurance",
    "Retail",
    "Fast-Moving Consumer Goods",
    "E-Commerce",
    "Durable Goods and Home Appliances",
    "Real Estate",
    "Technology and Telecommunications",
    "International Organizations"
  ]
}
```

**Mobile:** Columns stack. Pills wrap naturally.

---

### 7.7 Why OWL Section

**Background:** `bg-background`

**Layout:** Intro block (`max-w-2xl`, left-aligned) + 3-column differentiator grid (`grid lg:grid-cols-3 gap-8 mt-14`)

**Eyebrow:** `WHY OWL INTELLIGENCE`
**Heading:** "Not a research firm. An intelligence infrastructure."
**Intro:** "Unlike conventional research firms, OWL Intelligence does not leave data confined to reports; it turns data into productized analytics and decision support. With more than 15 years of experience, a field network spanning all 81 provinces of Turkey, and in-house technology capabilities, it transforms research into an infrastructure that operates at institutional scale."

**3 differentiator blocks (each `RevealWrapper` with 100ms stagger):**
- Block style: `border-l-2 border-chart-3 pl-5 py-1`
- Title: `text-base font-bold text-foreground`
- Body: `text-sm text-muted-foreground leading-relaxed mt-2`

1. **Methodology** — body from content section 6.1
2. **Advanced Analytics** — body from content section 6.2
3. **AI Infrastructure** — body from content section 6.3

---

### 7.8 Founders Section

**Background:** `bg-background`

**Layout:** `max-w-2xl mx-auto` — centered, narrow, intimate

**Eyebrow:** `FOUNDERS`
**Heading:** "Built from a conviction, not a gap in the market"

**Founder 1 — Beyza Polat, Ph.D.:**

```tsx
<RevealWrapper variant="fadeUp">
  {/* Decorative quote mark */}
  <span aria-hidden className="block text-7xl font-extrabold leading-none text-muted-foreground/20 -mb-3">
    "
  </span>
  {/* Quote */}
  <p className="text-xl font-semibold italic text-foreground max-w-xl leading-relaxed">
    {t('founders.beyza.quote')}
  </p>
  {/* Attribution */}
  <div className="flex items-center gap-3 mt-6">
    <Image
      src="/images/beyzapolat.png"
      width={36} height={36}
      alt="Beyza Polat"
      className="rounded-full object-cover grayscale"
    />
    <div>
      <p className="text-sm font-bold text-foreground">Beyza Polat, Ph.D.</p>
      <p className="text-xs text-muted-foreground">CEO & Co-Founder</p>
    </div>
  </div>
  {/* Credential */}
  <p className="text-xs text-muted-foreground mt-3">
    Economist. Bilkent University · London School of Economics.
  </p>
</RevealWrapper>
```

**Separator:** `<hr className="border-border my-10" />`

**Founder 2 — Saygın Vedat Alkurt:** Same pattern.
- Photo: `sayginalkurt.png`
- Name: "Saygın Vedat Alkurt"
- Role: "Co-Founder"
- Credential: "Sociologist. Middle East Technical University. 15+ years in data-driven research and policy consulting."

**Placeholder quotes (until real quotes are supplied — add `// TODO` comment):**
```json
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
}
```
These are editorial placeholders. Real quotes must be supplied and reviewed before the page goes live.

---

### 7.9 Partnerships Section

**Background:** `bg-dark-mid`

**Layout:** `max-w-2xl mx-auto text-center py-24 sm:py-32`

**Eyebrow:** `PARTNERSHIPS, INVESTMENT & INSTITUTIONAL COLLABORATION`
**Heading:** "Open to those who want to build and grow together"
**Body:** "OWL Intelligence is open to working with stakeholders who want to build, grow, and open up new areas together. We see strategic partnerships and institutional collaboration as a natural part of our long-term vision."

**Visual differentiation from Section 10:**
- Section 9 (Partnerships) uses a subtle decorative element: a thin horizontal line above the eyebrow (`w-12 h-px bg-chart-3 mx-auto mb-6`) to signal "entry into a new zone"
- This distinguishes it from the adjacent Agent section despite the same background color

**CTA:** `Button` outline variant, "Get in Touch", links to `/contact`

---

### 7.10 Agent Section

**Background:** `bg-dark-mid` (contiguous with Section 9)

**Layout:** `max-w-xl mx-auto text-center py-20 sm:py-24`

**Visual differentiation from Section 9:**
- Section 10 (Agent) uses a larger, bolder CTA treatment and no decorative line
- The eyebrow uses a distinct icon prefix (e.g., a `MessageSquare` icon from lucide-react, 12px)

**Eyebrow:** `TALK TO OUR AGENT` (with icon prefix)
**Heading:** "Ask anything you would like to know about OWL Intelligence."
**Sub-copy:** "Our AI agent is available to answer questions about our products, methodology, and how we work with institutions."
**CTA:** `Button` default variant (light bg, dark text), "Open Agent", links to `/agent`

---

### 7.11 Contact / Book a Demo Section

**Background:** `bg-background`

**Layout:** `grid lg:grid-cols-2 gap-12 items-start`
- Left: `Eyebrow` + `SectionHeading` + one-paragraph brief
- Right: single CTA card — `rounded-lg border border-border p-8`, heading "Ready to see it in action?", button "Book a Demo" linking to `/contact`

**Eyebrow:** `CONTACT`
**Heading:** "Start a conversation."
**Left body:** Brief, warm — "Whether you're exploring for your institution, looking to invest, or interested in collaboration, we're ready to talk."

**Mobile:** Columns stack, right card below left text

---

### 7.12 Footer

**No changes.** Uses the existing `src/components/layout/footer.tsx` with its current light `bg-muted/30` styling.

---

## 8. Header Behavior on Dark Hero

The existing `header.tsx` uses `bg-background/80 backdrop-blur-lg` — a semi-transparent white bar. This remains **unchanged**. Over the dark hero (`bg-dark-base`), the white translucent header will float clearly above the dark content, creating intentional contrast that grounds the navigation. This is a common and acceptable pattern used by many premium sites.

No scroll-based color transition is implemented for this spec. If a transparent-to-opaque header animation is desired in a future iteration, it would require a client component wrapper around `header.tsx` and a scroll event listener — that is out of scope here.

---

## 9. Motion Strategy

**Library:** Framer Motion 12 (`framer-motion`) — already installed, currently unused.
**Principle:** Natural browser scroll + motion enhancement. No scroll-jacking. All animations use `once: true`.

### Complete `src/lib/motion.ts`

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

/** Fade only — for elements where translation would be distracting */
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
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

/** Sequential container — 150ms between children (for stack layers, timeline steps) */
export const sequentialContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

/** Child item for use inside stagger/sequential containers */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}
```

### `RevealWrapper` — complete prop interface

```typescript
// src/components/home/shared/reveal-wrapper.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, fadeIn, staggerItem } from '@/lib/motion'
import type { Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

const variantMap = { fadeUp, fadeIn, staggerItem }

interface RevealWrapperProps {
  children: React.ReactNode
  variant?: keyof typeof variantMap   // default: 'fadeUp'
  delay?: number                      // extra delay in seconds, default: 0
  className?: string
  as?: React.ElementType              // default: 'div'
}

export function RevealWrapper({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
  as: Tag = 'div',
}: RevealWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const selectedVariant = variantMap[variant]
  const delayedVariant: Variants = delay
    ? {
        ...selectedVariant,
        visible: {
          ...(selectedVariant.visible as object),
          transition: {
            ...((selectedVariant.visible as { transition?: object }).transition ?? {}),
            delay,
          },
        },
      }
    : selectedVariant

  return (
    <motion.div
      ref={ref}
      variants={delayedVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn(className)}
      // @ts-expect-error motion.div does not accept `as` directly; Tag wrapping is handled externally if needed
    >
      {children}
    </motion.div>
  )
}
```

### `ScrollCue` — spec

```typescript
// src/components/home/shared/scroll-cue.tsx
'use client'
// - Container: flex flex-col items-center gap-2
// - Line: w-px h-10 bg-gradient-to-b from-transparent to-chart-3
// - Dot: w-1.5 h-1.5 rounded-full bg-chart-3
//   animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
// - Label: text-[10px] tracking-widest text-[#3a4a66] uppercase mt-1
//   content: "SCROLL"
```

---

## 10. Shared Component Architecture

```
src/
  lib/
    motion.ts                          ← Framer Motion presets (Client-safe, no 'use client' needed)
  components/
    home/
      shared/
        section-container.tsx          ← Server Component — padding + max-width + dark/light bg
        reveal-wrapper.tsx             ← Client Component — useInView + motion.div
        scroll-cue.tsx                 ← Client Component — animated scroll indicator
        eyebrow.tsx                    ← Server Component — uppercase tracked label
        section-heading.tsx            ← Server Component — h2 with consistent sizing
      hero-section.tsx                 ← Client Component
      business-speed-section.tsx       ← Client Component
      value-section.tsx                ← Client Component
      product-ecosystem-section.tsx    ← Client Component
      intelligence-layer-section.tsx   ← Client Component
      who-we-serve-section.tsx         ← Client Component
      why-owl-section.tsx              ← Client Component
      founders-section.tsx             ← Client Component
      partnerships-section.tsx         ← Client Component
      agent-section.tsx                ← Client Component
      contact-demo-section.tsx         ← Client Component
```

### `SectionContainer` complete interface

```typescript
// src/components/home/shared/section-container.tsx
// Server Component — no "use client"

interface SectionContainerProps {
  dark?: boolean       // true → bg-dark-mid; false/undefined → bg-background
  className?: string
  children: React.ReactNode
  id?: string          // for anchor links / section identification
}

// Internal:
// Outer: <section id={id} className={cn('w-full', dark ? 'bg-dark-mid' : 'bg-background', className)}>
// Inner: <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
```

---

## 11. Internationalization

### Strategy

`page.tsx` is a server component. It calls `getTranslations('home')` (server API) and passes all strings as props to section components. Section components receive strings as props — they do NOT call `useTranslations` internally.

### Keys to add to `messages/en.json`

Extend the existing `"home"` object with these new keys (the existing `heroTitle`, `heroSubtitle` etc. can be replaced):

```json
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
    "body": "OWL Intelligence brings measurement, analytics, and AI together within a single decision-support layer...",
    "col1Title": "Measurement",
    "col1Body": "...",
    "col2Title": "Analytics",
    "col2Body": "...",
    "col3Title": "AI",
    "col3Body": "..."
  },
  "productEcosystem": { "..." },
  "intelligenceLayer": { "..." },
  "sectors": {
    "eyebrow": "Who We Serve",
    "heading": "Built for institutions that operate at complexity",
    "context": "Nine sectors. One coherent intelligence infrastructure.",
    "items": [
      "Finance and Banking", "Insurance", "Retail",
      "Fast-Moving Consumer Goods", "E-Commerce",
      "Durable Goods and Home Appliances", "Real Estate",
      "Technology and Telecommunications", "International Organizations"
    ]
  },
  "whyOwl": { "..." },
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
  "partnerships": { "..." },
  "agent": { "..." },
  "contact": { "..." }
}
```

**Existing `solutions.*` and `common.*` keys are preserved** — the new `page.tsx` no longer uses `solutions.*` for the homepage (new `home.sectors.items` replaces it), but the `/solutions` page continues to use `solutions.*` independently.

---

## 12. File Changes Summary

| Action | File |
|---|---|
| **Update** | `src/app/globals.css` — add `--color-dark-base`, `--color-dark-mid`, `--color-dark-surface`, `--color-dark-border`, `--color-owl-gold`, `--color-owl-navy` to `@theme inline` block |
| **Update** | `src/app/layout.tsx` — verify Geist font includes weight `800` |
| **Copy** | `owlcontent/images/*` → `public/images/` (6 assets) |
| **Create** | `src/lib/motion.ts` |
| **Create** | `src/components/home/shared/section-container.tsx` |
| **Create** | `src/components/home/shared/reveal-wrapper.tsx` |
| **Create** | `src/components/home/shared/scroll-cue.tsx` |
| **Create** | `src/components/home/shared/eyebrow.tsx` |
| **Create** | `src/components/home/shared/section-heading.tsx` |
| **Create** | `src/components/home/hero-section.tsx` |
| **Create** | `src/components/home/business-speed-section.tsx` |
| **Create** | `src/components/home/value-section.tsx` |
| **Create** | `src/components/home/product-ecosystem-section.tsx` |
| **Create** | `src/components/home/intelligence-layer-section.tsx` |
| **Create** | `src/components/home/who-we-serve-section.tsx` |
| **Create** | `src/components/home/why-owl-section.tsx` |
| **Create** | `src/components/home/founders-section.tsx` |
| **Create** | `src/components/home/partnerships-section.tsx` |
| **Create** | `src/components/home/agent-section.tsx` |
| **Create** | `src/components/home/contact-demo-section.tsx` |
| **Rewrite** | `src/app/[locale]/page.tsx` |
| **Update** | `messages/en.json` — add `home.*` keys, `home.meta.*` |
| **Update** | `messages/tr.json` — Turkish equivalents |
| **No change** | `src/components/layout/header.tsx` |
| **No change** | `src/components/layout/footer.tsx` |
| **No change** | All `src/components/ui/` files |

---

## 13. Open Items

1. **Founder quotes** — Placeholder quotes provided in Section 7.8 and `messages/en.json`. These must be reviewed and replaced by real founder quotes before launch. Every quote usage must include a `// TODO: replace with real founder quote` comment.
2. **Turkish translations** — `tr.json` additions must be reviewed by a native speaker. The `home.founders.beyza.quote` and `home.founders.saygin.quote` in particular require careful translation.
3. **Geist font weight 800** — Verify the root layout's `next/font/google` Geist config includes weight 800. If not, add it before implementing the hero headline.
4. **Contact section right column** — Section 7.11 right column is a CTA card linking to `/contact`. No new form is built. If a lightweight inline form is desired in future, it is a separate spec.
