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

function renderWhoWeServeHeading(heading: string) {
  const target = ' that operate at complexity'

  if (!heading.includes(target)) {
    return heading
  }

  const [first] = heading.split(target)

  return (
    <>
      {first}
      <br />
      {' '}
      {target.trimStart()}
    </>
  )
}

export function WhoWeServeSection({ id, eyebrow, heading, context, sectors, zIndex }: WhoWeServeSectionProps) {
  return (
    <SectionContainer
      id={id}
      zIndex={zIndex}
      sticky={false}
      hideIndicator
      className="overflow-visible"
      innerClassName="min-h-[calc(100vh-4rem)] [min-height:calc(100dvh-4rem)] justify-center py-10 sm:py-14 lg:py-16"
    >
      <div className="grid h-full content-center gap-8 lg:gap-10">
        <div className="max-w-4xl">
          <Eyebrow className="mb-5 text-[0.72rem] tracking-[0.26em]">{eyebrow}</Eyebrow>
          <SectionHeading className="max-w-[24ch] text-[2.5rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[3rem] lg:text-[3.15rem] xl:text-[3.7rem]">
            {renderWhoWeServeHeading(heading)}
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {context}
          </p>
        </div>

        <RevealWrapper>
          <div
            data-testid="who-we-serve-matrix"
            className="grid grid-cols-3 gap-2.5 sm:gap-3 xl:grid-cols-9 xl:gap-3"
          >
            {sectors.map((sector, i) => (
              <article
                key={sector}
                className="group relative flex h-[8.5rem] overflow-hidden rounded-[1rem] border border-border/80 bg-card/55 px-2 py-3 shadow-[0_20px_55px_-38px_rgba(15,23,42,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-foreground hover:bg-foreground hover:text-background hover:shadow-[0_28px_70px_-42px_rgba(15,23,42,0.35)] sm:h-[9.5rem] sm:px-3 sm:py-4 xl:h-[19rem] xl:items-end xl:rounded-[1.15rem] xl:px-3 xl:py-4"
              >
                <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
                  <span className="text-[0.68rem] font-bold tracking-[0.24em] text-muted-foreground transition-colors duration-300 group-hover:text-background/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex h-full w-full items-end justify-end xl:items-end xl:justify-end">
                  <h3
                    data-testid={`sector-label-${String(i + 1).padStart(2, '0')}`}
                    className="[writing-mode:vertical-rl] rotate-180 max-h-full text-[0.78rem] font-bold leading-none tracking-[-0.02em] text-right text-foreground transition-colors duration-300 group-hover:text-background sm:text-[0.84rem] xl:text-[1rem]"
                  >
                    {sector}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </SectionContainer>
  )
}
