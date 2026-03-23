'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { fadeUp, fadeIn, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'

const variantMap = { fadeUp, fadeIn, staggerItem } satisfies Record<string, Variants>

interface RevealWrapperProps {
  children: React.ReactNode
  variant?: keyof typeof variantMap
  delay?: number
  className?: string
}

export function RevealWrapper({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
}: RevealWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const base = variantMap[variant]
  const resolved: Variants = delay
    ? {
        ...base,
        visible: {
          ...(base.visible as object),
          transition: {
            ...((base.visible as { transition?: object }).transition ?? {}),
            delay,
          },
        },
      }
    : base

  return (
    <motion.div
      ref={ref}
      variants={resolved}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
