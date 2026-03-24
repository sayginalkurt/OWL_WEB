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
  stackIndex?: number
}

function FounderBlock({ founder }: { founder: Founder }) {
  return (
    <RevealWrapper>
      <div className="rounded-lg border border-border bg-card/30 p-5 h-full">
        <span aria-hidden className="block text-6xl font-extrabold leading-none text-muted-foreground/20 -mb-2 select-none">
          &ldquo;
        </span>
        <p className="text-base lg:text-lg font-semibold italic text-foreground leading-relaxed">
          {founder.quote}
        </p>
        <div className="flex items-center gap-3 mt-4">
          <Image
            src={founder.photoSrc}
            alt={founder.photoAlt}
            width={36}
            height={36}
            className="rounded-full object-cover grayscale"
          />
          <div>
            <p className="text-sm font-bold text-foreground">{founder.name}</p>
            <p className="text-xs text-muted-foreground">{founder.role}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">{founder.credential}</p>
      </div>
    </RevealWrapper>
  )
}

export function FoundersSection({ id, eyebrow, heading, founders, zIndex, stackIndex }: FoundersSectionProps) {
  return (
    <SectionContainer surface="default" id={id} zIndex={zIndex} stackIndex={stackIndex}>
      <div className="max-w-6xl mx-auto">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading className="mb-8">{heading}</SectionHeading>
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5">
          <FounderBlock founder={founders[0]} />
          <FounderBlock founder={founders[1]} />
        </div>
      </div>
    </SectionContainer>
  )
}
