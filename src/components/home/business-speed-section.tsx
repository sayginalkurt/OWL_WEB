'use client'

import { SectionContainer } from './shared/section-container'
import { RevealWrapper } from './shared/reveal-wrapper'

interface BusinessSpeedSectionProps {
  id?: string
  eyebrow: string
  statements: [string, string, string]
  zIndex?: number
}

export function BusinessSpeedSection({ id, statements, zIndex }: BusinessSpeedSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex} className="overflow-visible" innerClassName="max-w-none px-0 py-0 flex-row">
      <div className="relative h-full w-full flex">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[72%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-[#1f3354]"
        />
        <div className="relative z-20 flex h-full grow flex-nowrap items-center w-full">
          <div className="flex h-full basis-1/2 shrink-0 grow-0 items-center justify-end pr-4 md:pr-8 lg:pr-12">
            <h2 className="whitespace-nowrap text-right text-[clamp(90rem,246vw,240rem)] font-black uppercase leading-[0.78] tracking-tight text-foreground">
              <span className="block">BUSINESS MOVES</span>
              <span className="block">FASTER THAN</span>
              <span className="block">TRADITIONAL DATA</span>
            </h2>
          </div>

          <div className="flex h-full basis-1/2 shrink-0 grow-0 flex-col items-start justify-center gap-5 pl-5 md:pl-10 lg:pl-16 lg:gap-6">
            {statements.map((statement, i) => (
              <RevealWrapper key={i} delay={i * 0.1}>
                <div
                  role="button"
                  tabIndex={0}
                  className="w-full max-w-xl cursor-pointer text-sm lg:text-base xl:text-[1rem] font-semibold leading-snug text-foreground border-l-2 border-chart-3/85 pl-5 py-3 rounded-r-md bg-card/35 transition-all duration-300 hover:-translate-y-1 hover:border-chart-3 hover:bg-card/60 hover:shadow-[0_18px_40px_-24px_rgba(8,94,255,0.85)] focus-visible:-translate-y-1 focus-visible:border-chart-3 focus-visible:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chart-3/60"
                >
                  {statement}
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
