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
}

interface ProductEcosystemSectionProps {
  eyebrow: string
  heading: string
  intro: string
  products: [ProductLayer, ProductLayer]
}

function ProductStack({ product }: { product: ProductLayer }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <Image src={product.logoSrc} alt={product.logoAlt} width={32} height={32} className="rounded" />
        <h3 className="text-base font-bold text-[#f0f0f0]">{product.name}</h3>
      </div>
      <p className="text-sm text-[#5a6888] max-w-sm mb-5">{product.descriptor}</p>
      <motion.div
        ref={ref}
        variants={sequentialContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-col gap-2"
      >
        {product.layers.map((layer, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="w-full rounded-md px-4 py-2.5 text-sm font-medium bg-dark-surface border border-dark-border text-[#5a7aaa] flex items-center gap-3"
          >
            <span className="text-chart-3 font-bold text-[11px] tracking-widest flex-shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            {layer}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function ProductEcosystemSection({ eyebrow, heading, intro, products }: ProductEcosystemSectionProps) {
  return (
    <SectionContainer dark>
      <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">
        <div>
          <Eyebrow dot dark>{eyebrow}</Eyebrow>
          <SectionHeading dark>{heading}</SectionHeading>
          <p className="text-sm text-[#5a6888] leading-relaxed mt-4">{intro}</p>
        </div>
        <div className="flex flex-col gap-12">
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
