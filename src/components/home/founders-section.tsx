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

function FounderBlock({ founder }: { founder: Founder }) {
  return (
    <RevealWrapper>
      <div className="rounded-xl border border-border bg-card/30 p-6 lg:p-8 h-full flex flex-col">
        <span aria-hidden className="block text-7xl font-extrabold leading-none text-muted-foreground/15 -mb-3 select-none">
          &ldquo;
        </span>
        <p className="text-lg lg:text-xl font-semibold italic text-foreground leading-relaxed flex-1">
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
      </div>
    </RevealWrapper>
  )
}

export function FoundersSection({ id, eyebrow, heading, founders, zIndex }: FoundersSectionProps) {
  return (
    <SectionContainer surface="default" id={id} zIndex={zIndex}>
      <div className="max-w-6xl mx-auto">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading className="mb-10">{heading}</SectionHeading>
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          <FounderBlock founder={founders[0]} />
          <FounderBlock founder={founders[1]} />
        </div>
      </div>
    </SectionContainer>
  )
}
