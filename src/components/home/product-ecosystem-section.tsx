'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'
import { sequentialContainer, staggerItem } from '@/lib/motion'

interface ProductLayer {
  logoSrc: string
  logoAlt: string
  name: string
  descriptor: string
  layers: [string, string, string]
  comingSoon?: boolean
}

interface ProductEcosystemSectionProps {
  id?: string
  eyebrow: string
  heading: string
  intro: string
  products: ProductLayer[]
  zIndex?: number
}

function ProductStack({ product }: { product: ProductLayer }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="rounded-xl border border-[var(--sd-border)] bg-[var(--sd-surface)] p-5 h-full">
      <div className="flex items-center gap-3 mb-3">
        <Image src={product.logoSrc} alt={product.logoAlt} width={36} height={36} className="rounded" />
        <h3 className="text-base font-bold text-[var(--sd-fg)]">{product.name}</h3>
        {product.comingSoon && (
          <span className="text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border border-[var(--sd-border)] text-[var(--sd-fg-accent)] bg-[color-mix(in_oklab,var(--sd-surface)_90%,var(--sd-fg)_10%)]">
            Coming Soon
          </span>
        )}
      </div>
      <p className="text-sm text-[var(--sd-fg-muted)] leading-relaxed mb-4">{product.descriptor}</p>
      <motion.div
        ref={ref}
        variants={sequentialContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid gap-2"
      >
        {product.layers.map((layer, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="w-full rounded-lg px-3.5 py-2.5 text-sm font-medium bg-transparent border border-[var(--sd-border)] text-[var(--sd-fg-accent)] flex items-center gap-2.5"
          >
            <span className="text-[var(--sd-fg-accent)] font-bold text-[11px] tracking-widest flex-shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            {layer}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function ProductEcosystemSection({ id, eyebrow, heading, intro, products, zIndex }: ProductEcosystemSectionProps) {
  return (
    <SectionContainer dark surface="inverse" id={id} zIndex={zIndex}>
      <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-10 items-start">
        <div className="max-w-xl">
          <Eyebrow dot dark>{eyebrow}</Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-sm text-[var(--sd-fg-muted)] leading-relaxed mt-4">{intro}</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <RevealWrapper key={i} delay={i * 0.1}>
              <ProductStack product={product} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
