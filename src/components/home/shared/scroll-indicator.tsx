'use client'

import { motion } from 'framer-motion'

interface ScrollIndicatorProps {
  dark?: boolean
}

export function ScrollIndicator({ dark }: ScrollIndicatorProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center"
      style={{ opacity: dark ? 0.18 : 0.12 }}
    >
      <motion.svg
        width="14"
        height="22"
        viewBox="0 0 14 22"
        fill="none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* arrow line */}
        <line
          x1="7"
          y1="1"
          x2="7"
          y2="15"
          stroke={dark ? 'var(--sd-fg-accent, #8899bb)' : 'currentColor'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* arrowhead */}
        <path
          d="M2 11l5 5 5-5"
          stroke={dark ? 'var(--sd-fg-accent, #8899bb)' : 'currentColor'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  )
}
