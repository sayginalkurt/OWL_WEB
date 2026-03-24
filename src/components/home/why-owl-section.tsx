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
    <SectionContainer id={id} zIndex={zIndex}>
      <div className="max-w-2xl mb-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading>{heading}</SectionHeading>
        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mt-6">{intro}</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {differentiators.map((d, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className="border-l-2 border-chart-3 pl-5 py-1">
              <h3 className="text-base font-bold text-foreground">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{d.body}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </SectionContainer>
  )
}
