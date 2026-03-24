'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { RevealWrapper } from './shared/reveal-wrapper'

interface BusinessSpeedSectionProps {
  id?: string
  eyebrow: string
  statements: [string, string, string]
  zIndex?: number
}

export function BusinessSpeedSection({ id, eyebrow, statements, zIndex }: BusinessSpeedSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex}>
      <div className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="flex flex-col gap-8 mt-10">
          {statements.map((statement, i) => (
            <RevealWrapper key={i} delay={i * 0.1}>
              <p className="text-2xl lg:text-3xl font-semibold leading-snug text-foreground border-l-2 border-chart-3 pl-6 py-2">
                {statement}
              </p>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
