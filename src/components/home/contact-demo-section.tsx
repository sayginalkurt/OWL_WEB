'use client'

import Link from 'next/link'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'
import { homeButtonPrimary } from './shared/home-button'

interface ContactDemoSectionProps {
  id?: string
  eyebrow: string
  heading: string
  body: string
  cardHeading: string
  ctaLabel: string
  ctaHref: string
  zIndex?: number
}

export function ContactDemoSection({ id, eyebrow, heading, body, cardHeading, ctaLabel, ctaHref, zIndex }: ContactDemoSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex} hideIndicator className="overflow-visible">
      <RevealWrapper>
        <div
          data-testid="contact-layout"
          className="mx-auto grid max-w-6xl gap-6 rounded-[1.8rem] border border-border/80 bg-card/45 p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.16)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:p-8"
        >
          <div className="max-w-3xl">
            <Eyebrow className="mb-5 text-[0.72rem] tracking-[0.26em]">{eyebrow}</Eyebrow>
            <SectionHeading className="max-w-[13ch] text-[2.5rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[3rem] lg:text-[3.15rem] xl:text-[3.7rem]">
              {heading}
            </SectionHeading>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {body}
            </p>
          </div>

          <div className="rounded-[1.3rem] border border-border bg-background p-5 lg:min-w-[17rem]">
            <h3 className="text-base font-bold text-foreground lg:text-lg">{cardHeading}</h3>
            <Link href={ctaHref} className={`${homeButtonPrimary} mt-5 w-full`}>
              {ctaLabel}
            </Link>
          </div>
        </div>
      </RevealWrapper>
    </SectionContainer>
  )
}
