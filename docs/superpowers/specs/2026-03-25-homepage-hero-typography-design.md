# Homepage Hero Typography Design

**Date:** 2026-03-25
**Status:** Approved concept, ready for implementation planning
**Area:** `src/components/home/hero-section.tsx`

## Goal

Redesign the homepage hero typography so it matches the premium editorial language established by the `Problem` section (`BusinessSpeedSection`) and the `Value` section, while keeping the current interactive animated background intact.

## Chosen Direction

The selected direction is **Editorial Monolith**.

This direction treats the hero as a single dominant statement rather than a layered marketing block. The typography should feel confident, severe, and editorial, with one primary message carrying the visual weight and a quieter supporting line underneath it.

## Design Principles

1. **Keep the interactive background unchanged**
   The `AetherFlowHero` animated background remains exactly as the atmospheric layer behind the typography. The redesign is about type, spacing, hierarchy, and alignment, not about replacing the motion system.

2. **Match the section language below**
   The hero should visually belong to the same family as `BusinessSpeedSection` (the `Problem` section) and `ValueSection`:
   - strong uppercase typography
   - tight tracking and negative letter spacing on the main heading
   - restrained supporting copy
   - premium editorial spacing rather than dense landing-page stacking

3. **One dominant typographic idea**
   The hero should no longer feel like two equal headline lines. The composition should make `ADVANCED ANALYTICS` the main monolith and treat `Grounded in Field Data` as a supporting line.

4. **Reduce generic landing-page feel**
   The current hero uses centered stacked copy, lighter supporting text, and CTA emphasis that reads more like a generic SaaS hero. The redesign should feel more institutional and authored.

## Layout Direction

The hero remains vertically centered within the first viewport and continues to sit above the animated background.

### Typographic hierarchy

- **Eyebrow:** small, uppercase, widely tracked, consistent with the eyebrow treatment used in the sections below
- **Primary headline:** very large, uppercase, heavy weight, tight leading, tight tracking, visually dominant
- **Supporting line:** smaller, quieter, more restrained, separated clearly from the main headline so it reads as a subtitle rather than a second headline
- **Body copy:** narrower measure, calm tone, lower contrast than the headline but still clearly readable

### Alignment

The hero should remain centered overall, but the typography should feel more composed and deliberate, with clearer internal spacing and less “everything centered at equal importance.”

### CTA treatment

The CTA row remains present, but it should sit lower in the hierarchy:
- keep both CTA buttons
- reduce their visual competition with the headline
- allow the headline to define the first impression

### Metrics treatment

The shipped version should remove the metrics from the visible hero composition so the first screen is cleaner and more aligned with the editorial language of the later sections.

This is still a typography/layout change rather than a copy change:
- the metric content can remain in the broader page data model for now
- the hero redesign simply does not display those values in the main hero block
- no new metric treatment should be introduced during this implementation pass

## Content Strategy

The content itself does not change in this redesign:
- keep existing localized eyebrow, headline, body, and CTA strings
- reuse the current message structure
- only change visual presentation and hierarchy

This keeps the scope limited to design refinement rather than copywriting or content modeling.

### Headline content model

The implementation should continue using the existing localized `headline` string as the source of truth.

The examples `ADVANCED ANALYTICS` and `Grounded in Field Data` describe the desired visual hierarchy, not a required content-schema split. If implementation needs a visual break, it should derive it from presentation logic only and should not introduce new translation keys during this pass.

## Component Boundaries

### `HeroSection`

Primary file to modify:
- `src/components/home/hero-section.tsx`

Responsibilities:
- preserve the animated background layer
- apply the new typography hierarchy
- keep CTA behavior intact
- preserve scroll indicator behavior

### Shared system consistency

The redesign should visually align with:
- `src/components/home/business-speed-section.tsx`
- `src/components/home/value-section.tsx`
- `src/components/home/shared/eyebrow.tsx`
- `src/components/home/shared/section-heading.tsx`

Implementation may reuse shared styling patterns, but should avoid unrelated refactors.

## Non-Goals

This redesign does **not** include:
- changing hero copy
- replacing the animated background
- changing CTA destinations
- redesigning other homepage sections
- adding new interaction logic to the hero

## Accessibility and Readability

- headline and supporting line must maintain strong contrast over the animated background
- body copy must remain readable against the overlay layer
- CTAs must remain clearly legible and keyboard accessible
- the supporting line should not become so faint that it disappears on lower-quality displays

## Testing Expectations

Implementation should add or update tests that confirm:
- the hero still renders a semantic `h1`
- eyebrow, headline, body, and CTA buttons still render
- the animated background component remains mounted
- visible metrics are no longer rendered in the hero
- the hero headline hierarchy is implemented through markup/classes that distinguish the dominant line from the quieter supporting treatment

## Implementation Notes

The safest implementation is a typography-only refactor inside `HeroSection`:
- keep the section structure and background layers
- reduce decorative or unused imports if no longer needed
- simplify the headline markup so the dominant line and supporting line have a clear visual relationship
- keep motion restrained on the copy block; no new headline effects should be added
- allow responsive line breaks and scale adjustments on smaller screens without changing the content model

## Recommended Outcome

The finished hero should feel like the opening statement of the same editorial system used by the `Problem` and `Value` sections:
- more premium
- more institutional
- less generic
- more typographically disciplined
