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
      <div className="grid min-w-0 items-center gap-10 max-lg:py-2 lg:h-full lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div className="relative flex min-h-0 min-w-0 flex-col justify-center border-b border-border/70 pb-8 max-lg:min-h-0 lg:h-full lg:min-h-[18rem] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-14">
          <div
            aria-hidden
            className="absolute left-0 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full border border-chart-3/20 lg:block"
          />
          <div className="relative z-10 min-w-0 max-w-2xl">
            <Eyebrow className="mb-5 w-full min-w-0 max-w-full whitespace-normal break-words text-[0.64rem] leading-relaxed tracking-[0.18em] sm:text-[0.72rem] sm:tracking-[0.26em]">
              {eyebrow}
            </Eyebrow>
            <SectionHeading className="min-w-0 max-w-full text-balance break-words text-3xl font-black leading-[0.95] tracking-[-0.05em] sm:text-4xl md:text-5xl lg:max-w-[13ch] lg:text-[4rem] xl:text-[4.6rem]">
              {heading}
            </SectionHeading>
            <p className="mt-6 max-w-xl break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
              {body}
            </p>
            <div aria-hidden className="mt-8 h-px w-24 bg-chart-3/65" />
          </div>
        </div>

        <div className="relative min-w-0">
          <div
            aria-hidden
            className="absolute left-[14%] right-[14%] top-1/2 hidden h-px -translate-y-1/2 bg-border/70 lg:block"
          />
          <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
            {columns.map((col, i) => (
              <div
                key={col.title}
                className="flex min-w-0 w-full flex-col items-stretch gap-3 lg:flex-1 lg:flex-row lg:items-stretch lg:gap-3"
              >
                <RevealWrapper className="min-w-0 w-full" delay={i * 0.1}>
                  <article className="relative w-full min-w-0 overflow-hidden rounded-[1.4rem] border border-border/80 bg-card/70 p-5 shadow-[0_22px_60px_-38px_rgba(15,23,42,0.3)] backdrop-blur-sm lg:min-h-[16.5rem] lg:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[0.72rem] font-bold tracking-[0.24em] text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden className="hidden h-2.5 w-2.5 rounded-full bg-chart-3/70 lg:block" />
                    </div>
                    <h3 className="mt-8 break-words text-lg font-bold tracking-tight text-foreground lg:text-[1.35rem]">
                      {col.title}
                    </h3>
                    <p className="mt-3 break-words text-sm leading-relaxed text-muted-foreground lg:text-[0.98rem]">
                      {col.body}
                    </p>
                  </article>
                </RevealWrapper>
                {i < columns.length - 1 && (
                  <div
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center self-center text-muted-foreground/70 lg:h-auto lg:w-auto lg:flex-0 lg:self-auto"
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
