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
    <SectionContainer surface="default" id={id} zIndex={zIndex} className="overflow-visible">
      <div className="grid h-full items-center gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-14">
        <div className="relative flex h-full min-h-[18rem] flex-col justify-center border-b border-border/70 pb-8 lg:min-h-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-14">
          <div
            aria-hidden
            className="absolute left-0 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full border border-chart-3/20 lg:block"
          />
          <div className="relative z-10 max-w-2xl">
            <Eyebrow className="mb-5 text-[0.72rem] tracking-[0.26em]">{eyebrow}</Eyebrow>
            <SectionHeading className="max-w-[13ch] text-[2.5rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[3rem] lg:text-[3.15rem] xl:text-[3.7rem]">
              {heading}
            </SectionHeading>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {intro}
            </p>
            <div aria-hidden className="mt-8 h-px w-24 bg-chart-3/65" />
          </div>
        </div>

        <div className="relative" data-testid="why-owl-rail">
          <div
            aria-hidden
            className="absolute left-[14%] right-[14%] top-1/2 hidden h-px -translate-y-1/2 bg-border/70 lg:block"
          />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
            {differentiators.map((d, i) => (
              <div key={d.title} className="flex flex-col items-center gap-3 lg:flex-1 lg:flex-row lg:gap-3">
                <RevealWrapper delay={i * 0.1}>
                  <article className="relative w-full rounded-[1.4rem] border border-border/80 bg-card/70 p-5 shadow-[0_22px_60px_-38px_rgba(15,23,42,0.18)] backdrop-blur-sm lg:min-h-[16.5rem] lg:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[0.72rem] font-bold tracking-[0.24em] text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden className="hidden h-2.5 w-2.5 rounded-full bg-chart-3/70 lg:block" />
                    </div>
                    <h3 className="mt-8 text-lg font-bold tracking-tight text-foreground lg:text-[1.35rem]">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-[0.98rem]">
                      {d.body}
                    </p>
                  </article>
                </RevealWrapper>
                {i < differentiators.length - 1 && (
                  <div
                    aria-hidden
                    className="flex h-8 w-8 items-center justify-center text-muted-foreground/70 lg:h-auto lg:w-auto lg:flex-0"
                  >
                    <span className="text-lg lg:text-xl">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
