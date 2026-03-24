'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { RevealWrapper } from './shared/reveal-wrapper'

interface BusinessSpeedSectionProps {
  id?: string
  eyebrow: string
  statements: [string, string, string]
  zIndex?: number
  stackIndex?: number
}

export function BusinessSpeedSection({ id, eyebrow, statements, zIndex, stackIndex }: BusinessSpeedSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex} stackIndex={stackIndex}>
      <div className="max-w-4xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {statements.map((statement, i) => (
            <RevealWrapper key={i} delay={i * 0.1}>
              <p className="text-lg lg:text-xl font-semibold leading-snug text-foreground border-l-2 border-chart-3 pl-4 py-2 rounded-r-md bg-card/35">
                {statement}
              </p>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
