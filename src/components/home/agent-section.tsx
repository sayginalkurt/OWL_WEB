'use client'

import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface AgentSectionProps {
  id?: string
  eyebrow: string
  heading: string
  subCopy: string
  ctaLabel: string
  ctaHref: string
  zIndex?: number
  stackIndex?: number
}

export function AgentSection({ id, eyebrow, heading, subCopy, ctaLabel, ctaHref, zIndex, stackIndex }: AgentSectionProps) {
  return (
    <SectionContainer dark surface="inverse" className="section-inverse" id={id} zIndex={zIndex} stackIndex={stackIndex}>
      <div className="max-w-xl mx-auto text-center">
        <RevealWrapper>
          <Eyebrow dark className="justify-center gap-2">
            <MessageSquare className="w-3 h-3" aria-hidden />
            {eyebrow}
          </Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-sm lg:text-base text-[var(--sd-fg-muted)] leading-relaxed mt-4 mb-8">{subCopy}</p>
          <Link href={ctaHref} className={buttonVariants()}>
            {ctaLabel}
          </Link>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
