'use client'

import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { RevealWrapper } from './shared/reveal-wrapper'
import { SectionHeading } from './shared/section-heading'

interface BusinessSpeedSectionProps {
  id?: string
  eyebrow: string
  heading: string
  statements: [string, string, string]
  zIndex?: number
}

export function BusinessSpeedSection({ id, eyebrow, heading, statements, zIndex }: BusinessSpeedSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex} className="overflow-visible">
      <div className="grid h-full items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="relative flex h-full min-h-[18rem] flex-col justify-center border-b border-border/70 pb-8 lg:min-h-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-14">
          <div
            aria-hidden
            className="absolute left-0 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full border border-chart-3/20 lg:block"
          />
          <div className="relative z-10 max-w-2xl">
            <Eyebrow className="mb-5 text-[0.72rem] tracking-[0.26em]">{eyebrow}</Eyebrow>
            <SectionHeading className="max-w-[12ch] text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl lg:text-[4.2rem] xl:text-[4.9rem]">
              {heading}
            </SectionHeading>
            <div aria-hidden className="mt-8 h-px w-24 bg-chart-3/65" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {statements.map((statement, i) => (
            <RevealWrapper key={i} delay={i * 0.1}>
              <article className="grid grid-cols-[auto_1fr] gap-4 border-t border-border/70 py-5 first:border-t-0 first:pt-0 last:border-b last:border-border/70 last:pb-5">
                <span className="pt-0.5 text-[0.72rem] font-bold tracking-[0.24em] text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="max-w-xl text-base font-medium leading-relaxed text-foreground sm:text-[1.05rem]">
                  {statement}
                </p>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
