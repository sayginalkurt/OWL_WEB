'use client'

import Image from 'next/image'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'

interface Founder {
  quote: string
  name: string
  role: string
  credential: string
  photoSrc: string
  photoAlt: string
}

interface FoundersSectionProps {
  id?: string
  eyebrow: string
  heading: string
  founders: [Founder, Founder]
  zIndex?: number
}

function FounderBlock({ founder, quoteMarkTestId }: { founder: Founder; quoteMarkTestId: string }) {
  return (
    <RevealWrapper className="h-full">
      <article className="flex h-full flex-col rounded-xl border border-border bg-card/30 p-6 lg:p-8">
        <span
          aria-hidden
          data-testid={quoteMarkTestId}
          className="block self-end text-7xl font-extrabold leading-none text-muted-foreground/15 select-none"
        >
          &ldquo;
        </span>
        <p className="mt-4 flex-1 text-left text-lg font-semibold italic leading-relaxed text-foreground lg:text-xl">
          {founder.quote}
        </p>
        <div className="flex items-center gap-4 mt-6 pt-5 border-t border-border/50">
          <Image
            src={founder.photoSrc}
            alt={founder.photoAlt}
            width={44}
            height={44}
            className="rounded-full object-cover grayscale"
          />
          <div>
            <p className="text-sm font-bold text-foreground">{founder.name}</p>
            <p className="text-xs text-muted-foreground">{founder.role}</p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">{founder.credential}</p>
          </div>
        </div>
      </article>
    </RevealWrapper>
  )
}

export function FoundersSection({ id, eyebrow, heading, founders, zIndex }: FoundersSectionProps) {
  return (
    <SectionContainer surface="default" id={id} zIndex={zIndex} className="overflow-visible">
      <div className="grid h-full items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
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
            <div aria-hidden className="mt-8 h-px w-24 bg-chart-3/65" />
          </div>
        </div>

        <div data-testid="founders-layout" className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <FounderBlock founder={founders[0]} quoteMarkTestId="founder-quote-mark-0" />
          <FounderBlock founder={founders[1]} quoteMarkTestId="founder-quote-mark-1" />
        </div>
      </div>
    </SectionContainer>
  )
}
