'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface IntelligenceStep {
  number: string
  title: string
  body: string
}

interface IntelligenceLayerSectionProps {
  id?: string
  eyebrow: string
  heading: string
  zIndex?: number
  stackIndex?: number
  steps: [
    IntelligenceStep, IntelligenceStep, IntelligenceStep, IntelligenceStep,
    IntelligenceStep, IntelligenceStep, IntelligenceStep, IntelligenceStep,
  ]
}

export function IntelligenceLayerSection({ id, eyebrow, heading, steps, zIndex, stackIndex }: IntelligenceLayerSectionProps) {
  return (
    <SectionContainer dark surface="inverse" id={id} zIndex={zIndex} stackIndex={stackIndex}>
      <div className="mb-6">
        <Eyebrow dot dark>{eyebrow}</Eyebrow>
        <SectionHeading dark>{heading}</SectionHeading>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        {steps.map((step, i) => (
          <RevealWrapper key={step.number} delay={i * 0.06}>
            <div className="h-full rounded-lg border border-[var(--sd-border)] bg-[var(--sd-surface)] p-3.5">
              <span className="block text-[11px] font-bold tracking-widest text-chart-3 mb-1.5">
                {step.number}
              </span>
              <h3 className="text-sm font-bold text-[var(--sd-fg-heading)] leading-snug">{step.title}</h3>
              <p className="text-xs text-[var(--sd-fg-muted)] leading-relaxed mt-1.5">{step.body}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </SectionContainer>
  )
}
