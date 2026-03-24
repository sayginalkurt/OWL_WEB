'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface PartnershipsSectionProps {
  id?: string
  eyebrow: string
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
  zIndex?: number
  stackIndex?: number
}

export function PartnershipsSection({ id, eyebrow, heading, body, ctaLabel, ctaHref, zIndex, stackIndex }: PartnershipsSectionProps) {
  return (
    <SectionContainer dark surface="inverse" className="section-inverse" id={id} zIndex={zIndex} stackIndex={stackIndex}>
      <div className="max-w-2xl mx-auto text-center">
        <div aria-hidden className="w-12 h-px bg-chart-3 mx-auto mb-6" />
        <RevealWrapper>
          <Eyebrow dark className="justify-center">{eyebrow}</Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-sm lg:text-base text-[var(--sd-fg-muted)] leading-relaxed mt-4 mb-8">{body}</p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'outline' }), 'border-[var(--sd-border)] text-[var(--sd-fg-accent)] hover:bg-[var(--sd-surface)] hover:text-[var(--sd-fg)]')}>
            {ctaLabel}
          </Link>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
