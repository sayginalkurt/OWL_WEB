'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface PartnershipsSectionProps {
  eyebrow: string
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export function PartnershipsSection({ eyebrow, heading, body, ctaLabel, ctaHref }: PartnershipsSectionProps) {
  return (
    <SectionContainer dark>
      <div className="max-w-2xl mx-auto text-center">
        <div aria-hidden className="w-12 h-px bg-chart-3 mx-auto mb-6" />
        <RevealWrapper>
          <Eyebrow dark className="justify-center">{eyebrow}</Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-base text-[#5a6888] leading-relaxed mt-6 mb-10">{body}</p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'outline' }), 'border-[#1a2640] text-[#8899bb] hover:bg-dark-surface hover:text-[#f0f0f0]')}>
            {ctaLabel}
          </Link>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
