'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface ValueColumn {
  title: string
  body: string
}

interface ValueSectionProps {
  id?: string
  eyebrow: string
  heading: string
  body: string
  columns: [ValueColumn, ValueColumn, ValueColumn]
  zIndex?: number
}

export function ValueSection({ id, eyebrow, heading, body, columns, zIndex }: ValueSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex}>
      <div className="max-w-2xl mx-auto text-center mb-16">
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <SectionHeading>{heading}</SectionHeading>
        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mt-6">{body}</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {columns.map((col, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className="border-l-2 border-chart-3 pl-5 py-1">
              <h3 className="text-base font-bold text-foreground">{col.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{col.body}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </SectionContainer>
  )
}
