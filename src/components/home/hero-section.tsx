'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Eyebrow } from './shared/eyebrow'
import { ScrollCue } from './shared/scroll-cue'
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion'

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
      className="w-full min-h-[90vh] flex items-center"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, #0d1422 0%, #07090f 70%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">

          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={staggerItem}>
              <Eyebrow dot dark>{eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#f0f0f0] mt-2 max-w-2xl"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-base lg:text-lg text-[#5a6888] leading-relaxed mt-6 max-w-xl"
            >
              {body}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mt-8">
              <Link href="/products" className={cn(buttonVariants())}>
                {ctaPrimary}
              </Link>
              <Link href="/agent" className={cn(buttonVariants({ variant: 'outline' }), 'border-[#1a2640] text-[#8899bb] hover:bg-dark-surface hover:text-[#f0f0f0]')}>
                {ctaSecondary} →
              </Link>
            </motion.div>

            <motion.div variants={staggerItem}>
              <ScrollCue />
            </motion.div>
          </motion.div>

          {/* Right column — metric cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col gap-4"
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="rounded-lg bg-dark-surface border border-dark-border p-5"
              >
                <p className="text-3xl font-bold tracking-tight text-chart-2">{metric.value}</p>
                <p className="text-sm text-[#5a6888] mt-1 leading-snug">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
