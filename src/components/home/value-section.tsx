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
  stackIndex?: number
}

export function ValueSection({ id, eyebrow, heading, body, columns, zIndex, stackIndex }: ValueSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex} stackIndex={stackIndex}>
      <div className="max-w-2xl mx-auto text-center mb-8">
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <SectionHeading>{heading}</SectionHeading>
        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mt-4">{body}</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-5">
        {columns.map((col, i) => (
          <RevealWrapper key={i} delay={i * 0.1}>
            <div className="h-full rounded-lg border border-border bg-card/30 p-4">
              <h3 className="text-sm lg:text-base font-bold text-foreground">{col.title}</h3>
              <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed mt-2">{col.body}</p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </SectionContainer>
  )
}
