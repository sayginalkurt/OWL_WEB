'use client'

import Link from 'next/link'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'
import { homeButtonOwlGold } from './shared/home-button'

interface PartnershipsSectionProps {
  id?: string
  eyebrow: string
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
  zIndex?: number
}

export function PartnershipsSection({ id, eyebrow, heading, body, ctaLabel, ctaHref, zIndex }: PartnershipsSectionProps) {
  return (
    <SectionContainer dark surface="inverse" className="section-inverse overflow-visible" id={id} zIndex={zIndex}>
      <RevealWrapper>
        <div
          data-testid="partnerships-layout"
          className="mx-auto grid max-w-6xl gap-6 rounded-[1.8rem] border border-[var(--sd-border)] bg-[color-mix(in_oklab,var(--sd-surface)_88%,transparent)] p-6 shadow-[0_28px_90px_-48px_rgba(3,8,20,0.85)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:p-8"
        >
          <div className="max-w-3xl">
            <Eyebrow className="mb-5 text-[0.72rem] tracking-[0.26em]">{eyebrow}</Eyebrow>
            <SectionHeading dark className="max-w-[14ch] text-[2.5rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[3rem] lg:text-[3.15rem] xl:text-[3.7rem]">
              {heading}
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--sd-fg-muted)]">
              {body}
            </p>
          </div>

          <div className="flex max-w-[18rem] flex-col items-start justify-center lg:items-center lg:text-center">
            <Link
              href={ctaHref}
              className={`${homeButtonOwlGold} mt-5 w-full [--button-owl-fg:var(--sd-fg)]`}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </RevealWrapper>
    </SectionContainer>
  )
}
