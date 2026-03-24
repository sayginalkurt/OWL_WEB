'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface WhoWeServeSectionProps {
  id?: string
  eyebrow: string
  heading: string
  context: string
  sectors: [string,string,string,string,string,string,string,string,string]
  zIndex?: number
}

export function WhoWeServeSection({ id, eyebrow, heading, context, sectors, zIndex }: WhoWeServeSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex}>
      <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionHeading>{heading}</SectionHeading>
          <p className="text-muted-foreground mt-4 text-sm lg:text-base leading-relaxed">{context}</p>
        </div>
        <RevealWrapper>
          <div className="flex flex-wrap gap-3">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="inline-flex items-center rounded-full border border-border bg-card/35 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-chart-3 hover:text-chart-3 cursor-default"
              >
                {sector}
              </span>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
