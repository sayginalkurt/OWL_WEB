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
  steps: [
    IntelligenceStep, IntelligenceStep, IntelligenceStep, IntelligenceStep,
    IntelligenceStep, IntelligenceStep, IntelligenceStep, IntelligenceStep,
  ]
}

export function IntelligenceLayerSection({ id, eyebrow, heading, steps, zIndex }: IntelligenceLayerSectionProps) {
  const leftSteps = steps.slice(0, 4)
  const rightSteps = steps.slice(4, 8)

  return (
    <SectionContainer dark id={id} zIndex={zIndex}>
      <div className="mb-16">
        <Eyebrow dot dark>{eyebrow}</Eyebrow>
        <SectionHeading dark>{heading}</SectionHeading>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10">
        <div className="flex flex-col gap-10">
          {leftSteps.map((step, i) => (
            <RevealWrapper key={step.number} delay={i * 0.1}>
              <div>
                <span className="block text-[11px] font-bold tracking-widest text-chart-3 mb-1">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-[var(--sd-fg-heading)]">{step.title}</h3>
                <p className="text-sm text-[var(--sd-fg-muted)] leading-relaxed mt-2">{step.body}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          {rightSteps.map((step, i) => (
            <RevealWrapper key={step.number} delay={0.2 + i * 0.1}>
              <div>
                <span className="block text-[11px] font-bold tracking-widest text-chart-3 mb-1">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-[var(--sd-fg-heading)]">{step.title}</h3>
                <p className="text-sm text-[var(--sd-fg-muted)] leading-relaxed mt-2">{step.body}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
