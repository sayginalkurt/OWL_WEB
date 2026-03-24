'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface Differentiator {
  title: string
  body: string
}

interface WhyOwlSectionProps {
  id?: string
  eyebrow: string
  heading: string
  intro: string
  differentiators: [Differentiator, Differentiator, Differentiator]
  zIndex?: number
}

export function WhyOwlSection({ id, eyebrow, heading, intro, differentiators, zIndex }: WhyOwlSectionProps) {
  return (
    <SectionContainer surface="default" id={id} zIndex={zIndex}>
      <div className="max-w-2xl mb-10">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading>{heading}</SectionHeading>
        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mt-4">{intro}</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        {differentiators.map((d, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className="h-full rounded-xl border-l-2 border-l-chart-3 border border-border bg-card/30 p-5 lg:p-6">
              <h3 className="text-base lg:text-lg font-bold text-foreground">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2.5">{d.body}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </SectionContainer>
  )
}
