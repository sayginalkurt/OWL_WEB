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
      <div>
        <span aria-hidden className="block text-7xl font-extrabold leading-none text-muted-foreground/20 -mb-3 select-none">
          &ldquo;
        </span>
        <p className="text-xl font-semibold italic text-foreground max-w-xl leading-relaxed">
          {founder.quote}
        </p>
        <div className="flex items-center gap-3 mt-6">
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

export function FoundersSection({ id, eyebrow, heading, founders, zIndex }: FoundersSectionProps) {
  return (
    <SectionContainer id={id} zIndex={zIndex}>
      <div className="max-w-2xl mx-auto">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading className="mb-12">{heading}</SectionHeading>
        <FounderBlock founder={founders[0]} />
        <hr className="border-border my-10" />
        <FounderBlock founder={founders[1]} />
      </div>
    </SectionContainer>
  )
}
