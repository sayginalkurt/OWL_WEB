'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eyebrow } from './shared/eyebrow'
import { ScrollIndicator } from './shared/scroll-indicator'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { homeButtonHeroOutline, homeButtonHeroPrimary } from './shared/home-button'
import AetherFlowHero from '@/components/ui/aether-flow-hero'

interface MetricCard {
  value: string
  label: string
}

interface HeroSectionProps {
  eyebrow: string
  headline: string
  body: string
  ctaPrimary: string
  ctaSecondary: string
  metrics: [MetricCard, MetricCard, MetricCard]
}

function splitHeroHeadline(headline: string) {
  if (headline.includes(' Grounded in ')) {
    const [monolith, support] = headline.split(' Grounded in ')
    return { monolith, support: `Grounded in ${support}` }
  }

  const verifiedMatch = headline.match(/^(.*?)\s+(%100\s+Doğrulanmış[\s\S]+)$/i)
  if (verifiedMatch) {
    return { monolith: verifiedMatch[1], support: verifiedMatch[2] }
  }

  const bagliMatch = headline.match(/^(.*?\bBağlı)\s+(.*)$/)
  if (bagliMatch) {
    return { monolith: bagliMatch[2], support: bagliMatch[1] }
  }

  return { monolith: headline, support: '' }
}

export function HeroSection({ eyebrow, headline, body, ctaPrimary, ctaSecondary, metrics: _metrics }: HeroSectionProps) {
  const { monolith, support } = splitHeroHeadline(headline)

  return (
    <section
      id="hero"
      className="dark w-full flex items-center relative overflow-hidden bg-[#07090f] text-white"
      style={{
        zIndex: 1,
        // Use dynamic viewport height on mobile browsers; keep vh as fallback.
        minHeight: 'calc(100vh - 4rem)',
        height: 'calc(100dvh - 4rem)',
      }}
    >
      <div data-testid="hero-background" className="absolute inset-0 h-full w-full z-0">
        <AetherFlowHero showOverlay={false} className="absolute inset-0 h-full w-full z-0" />
      </div>
      <div aria-hidden className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex max-w-5xl flex-col items-center"
        >
          <motion.div variants={staggerItem}>
            <Eyebrow className="mb-5 text-[0.72rem] tracking-[0.26em] !text-white/78">
              {eyebrow}
            </Eyebrow>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="mt-1 max-w-[12ch] text-5xl font-black uppercase leading-[0.9] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.2rem] xl:text-[6rem]"
          >
            <span data-testid="hero-headline-monolith" className="block drop-shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              {monolith}
              {support ? ' ' : ''}
            </span>
            {support ? (
              <span
                data-testid="hero-headline-support"
                className="mt-5 block text-sm font-semibold uppercase tracking-[0.32em] text-white/60 sm:text-base"
              >
                {support}
              </span>
            ) : (
              <span data-testid="hero-headline-support" className="sr-only" />
            )}
          </motion.h1>

          <motion.div variants={staggerItem} className="mt-8 h-px w-24 bg-chart-3/65" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.9, ease: 'easeOut' }}
            className="mt-8 max-w-2xl text-sm leading-relaxed text-white/74 sm:text-base lg:text-[1.02rem]"
          >
            {body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.8, ease: 'easeOut' }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <Link href="/products" className={homeButtonHeroPrimary}>
              {ctaPrimary}
            </Link>
            <Link href="/agent" className={homeButtonHeroOutline}>
              {ctaSecondary} →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator dark />
    </section>
  )
}
