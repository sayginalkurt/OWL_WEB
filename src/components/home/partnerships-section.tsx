'use client'

import Link from 'next/link'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'
import { homeButtonInversePrimary } from './shared/home-button'

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
    <SectionContainer dark surface="inverse" className="section-inverse" id={id} zIndex={zIndex}>
      <div className="max-w-2xl mx-auto text-center">
        <div aria-hidden className="w-16 h-px bg-[var(--sd-fg-accent)] mx-auto mb-8" />
        <RevealWrapper>
          <Eyebrow dark className="justify-center">{eyebrow}</Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-base lg:text-lg text-[var(--sd-fg-muted)] leading-relaxed mt-5 mb-10">{body}</p>
          <Link href={ctaHref} className={`${homeButtonInversePrimary} border-[#1f3254] bg-[#1f3254] text-white hover:bg-[#2a426d]`}>
            {ctaLabel}
          </Link>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
