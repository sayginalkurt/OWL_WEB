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
  return (
    <SectionContainer
      dark
      surface="inverse"
      id={id}
      zIndex={zIndex}
      hideIndicator
      sticky={false}
      className="overflow-visible"
      innerClassName="min-h-[calc(100vh-4rem)] [min-height:calc(100dvh-4rem)] justify-center py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-5xl">
          <Eyebrow className="mb-4 text-[0.72rem] tracking-[0.26em]">{eyebrow}</Eyebrow>
          <SectionHeading
            dark
            className="max-w-[23ch] text-[2.5rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[3rem] lg:text-[3.15rem] xl:text-[3.7rem]"
          >
            {heading}
          </SectionHeading>
        </div>

        <div
          data-testid="intelligence-layer-matrix"
          className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:gap-4 xl:grid-cols-4"
        >
          {steps.map((step, i) => (
            <RevealWrapper key={step.number} delay={i * 0.05} className="h-full min-w-0">
              <article
                className="flex min-w-0 h-full min-h-[8rem] flex-col items-center justify-center rounded-[1rem] border border-[var(--sd-border)] px-3 py-3 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--sd-fg-accent)]/40 hover:shadow-[0_22px_55px_-38px_rgba(2,6,23,0.9)] sm:min-h-[9.5rem] sm:rounded-[1.1rem] sm:px-5 sm:py-5 lg:min-h-[10.5rem]"
                style={{ backgroundColor: 'color-mix(in oklab, var(--sd-surface) 74%, var(--section-inverse-bg))' }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[0.68rem] font-bold tracking-[0.24em] text-[var(--sd-fg-accent)]">
                    {step.number}
                  </span>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--sd-fg-accent)]/70" />
                </div>
                <h3 className="mt-3 max-w-[16ch] text-[0.92rem] font-bold leading-[1.04] tracking-[-0.03em] text-[var(--sd-fg-heading)] sm:mt-4 sm:max-w-[18ch] sm:text-[1.05rem] lg:text-[1.12rem]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.76rem] leading-relaxed text-[var(--sd-fg-muted)] sm:mt-3 sm:text-[0.9rem]">
                  {step.body}
                </p>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
