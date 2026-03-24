'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eyebrow } from './shared/eyebrow'
import { ScrollIndicator } from './shared/scroll-indicator'
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion'
import { homeButtonHeroOutline, homeButtonHeroPrimary } from './shared/home-button'
import { cn } from '@/lib/utils'
import AetherFlowHero from '@/components/ui/aether-flow-hero'
import { MatrixText } from '@/components/ui/matrix-text'

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

export function HeroSection({ eyebrow, headline, body, ctaPrimary, ctaSecondary, metrics }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="dark w-full flex items-center relative overflow-hidden bg-[#07090f] text-white"
      style={{
        zIndex: 1,
        height: 'calc(100vh - 4rem)',
      }}
    >
      <AetherFlowHero showOverlay={false} className="absolute inset-0 h-full w-full z-0" />
      <div aria-hidden className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 w-full h-full flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center w-full">

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center relative z-10"
          >

            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] !text-[#ffffff] mt-4 max-w-7xl"
            >
              <div className="flex flex-col items-center">
                <span className="block !text-[#ffffff] drop-shadow-2xl tracking-wider">ADVANCED ANALYTICS</span>
                <span className="block mt-6 text-base sm:text-lg lg:text-xl font-light tracking-[0.4em] !text-white uppercase opacity-60">Grounded in Field Data</span>
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              className="text-base sm:text-lg lg:text-xl !text-[#ffffff] leading-relaxed mt-16 max-w-2xl font-light text-center opacity-70"
            >
              {body}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-6 mt-14"
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
      </div>

      <ScrollIndicator dark />
    </section>
  )
}
