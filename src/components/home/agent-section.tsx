'use client'

import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'
import { homeButtonOwlGold } from './shared/home-button'

interface AgentSectionProps {
  id?: string
  eyebrow: string
  heading: string
  subCopy: string
  ctaLabel: string
  ctaHref: string
  zIndex?: number
}

export function AgentSection({ id, eyebrow, heading, subCopy, ctaLabel, ctaHref, zIndex }: AgentSectionProps) {
  return (
    <SectionContainer dark surface="inverse" className="section-inverse overflow-visible" id={id} zIndex={zIndex}>
      <RevealWrapper>
        <div
          data-testid="agent-layout"
          className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10"
        >
          <div className="max-w-3xl">
            <Eyebrow dark className="mb-5 gap-2 text-[0.72rem] tracking-[0.26em]">
              <MessageSquare className="h-3 w-3" aria-hidden />
              {eyebrow}
            </Eyebrow>
            <SectionHeading dark className="max-w-[14ch] text-[2.5rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[3rem] lg:text-[3.15rem] xl:text-[3.7rem]">
              {heading}
            </SectionHeading>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--sd-fg-muted)] sm:text-base">
              {subCopy}
            </p>
          </div>

          <div
            data-testid="agent-action"
            className="flex flex-col items-start gap-5 rounded-[1.8rem] border border-[var(--sd-border)] bg-[color-mix(in_oklab,var(--sd-surface)_90%,transparent)] p-6 shadow-[0_28px_90px_-48px_rgba(3,8,20,0.85)] lg:items-center lg:justify-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--sd-border)] bg-[color-mix(in_oklab,var(--sd-bg)_72%,transparent)] text-[var(--sd-fg-accent)]">
              <MessageSquare className="h-9 w-9" aria-hidden />
            </div>
            <Link
              href={ctaHref}
              className={`${homeButtonOwlGold} [--button-owl-fg:var(--sd-fg)]`}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </RevealWrapper>
    </SectionContainer>
  )
}
