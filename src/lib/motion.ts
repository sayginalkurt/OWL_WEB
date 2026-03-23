import { type Variants } from 'framer-motion'

/** Default entrance: fade + translate up */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Fade only — no translation */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

/** Stagger container — 80ms between children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/** Sequential container — 150ms between children (stack layers, timeline steps) */
export const sequentialContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

/** Child item for stagger/sequential containers */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}
