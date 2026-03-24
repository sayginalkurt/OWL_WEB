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
    <SectionContainer id={id} zIndex={zIndex}>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        <RevealWrapper>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading>{heading}</SectionHeading>
          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mt-4">{body}</p>
        </RevealWrapper>
        <RevealWrapper delay={0.1}>
          <div className="rounded-lg border border-border bg-card/35 p-6">
            <h3 className="text-base lg:text-lg font-bold text-foreground">{cardHeading}</h3>
            <p className="text-xs lg:text-sm text-muted-foreground mt-2 mb-5">
              See OWL Intelligence in action with a guided walkthrough tailored to your institution.
            </p>
            <Link href={ctaHref} className={homeButtonPrimary}>
              {ctaLabel}
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
