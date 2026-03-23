'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollCueProps {
  className?: string
}

export function ScrollCue({ className }: ScrollCueProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('flex flex-col items-center gap-2 mt-12', className)}
    >
      {/* Vertical hairline */}
      <div className="w-px h-10 bg-gradient-to-b from-transparent to-chart-3" />
      {/* Animated dot */}
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-chart-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Label */}
      <span className="text-[10px] tracking-widest text-[#3a4a66] uppercase mt-1">
        SCROLL
      </span>
    </div>
  )
}
