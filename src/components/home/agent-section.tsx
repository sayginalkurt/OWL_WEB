'use client'

import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface AgentSectionProps {
  eyebrow: string
  heading: string
  subCopy: string
  ctaLabel: string
  ctaHref: string
}

export function AgentSection({ eyebrow, heading, subCopy, ctaLabel, ctaHref }: AgentSectionProps) {
  return (
    <SectionContainer dark>
      <div className="max-w-xl mx-auto text-center">
        <RevealWrapper>
          <Eyebrow dark className="justify-center gap-2">
            <MessageSquare className="w-3 h-3" aria-hidden />
            {eyebrow}
          </Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-base text-[#5a6888] leading-relaxed mt-6 mb-10">{subCopy}</p>
          <Link href={ctaHref} className={buttonVariants()}>
            {ctaLabel}
          </Link>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
