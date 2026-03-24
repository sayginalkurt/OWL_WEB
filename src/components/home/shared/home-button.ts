import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const homeButtonBase =
  'h-10 rounded-md px-4 text-sm font-semibold tracking-[0.01em] shadow-sm transition-colors'

export const homeButtonPrimary = cn(
  buttonVariants({ size: 'lg' }),
  homeButtonBase,
  'bg-primary text-primary-foreground hover:bg-primary/90'
)

export const homeButtonOutline = cn(
  buttonVariants({ variant: 'outline', size: 'lg' }),
  homeButtonBase,
  'border-border bg-background text-foreground hover:bg-muted'
)

export const homeButtonInversePrimary = cn(
  buttonVariants({ size: 'lg' }),
  homeButtonBase,
  'bg-[var(--sd-fg,#f0f0f0)] text-[var(--sd-bg,#0d1422)] hover:bg-[color-mix(in_oklab,var(--sd-fg,#f0f0f0)_92%,black)]'
)

export const homeButtonInverseOutline = cn(
  buttonVariants({ variant: 'outline', size: 'lg' }),
  homeButtonBase,
  'border-[var(--sd-border,#1a2640)] bg-[var(--sd-surface,#0e1624)] text-[var(--sd-fg,#f0f0f0)] hover:bg-[color-mix(in_oklab,var(--sd-surface,#0e1624)_90%,var(--sd-fg,#f0f0f0)_10%)] hover:text-[var(--sd-fg,#f0f0f0)]'
)

export const homeButtonHeroPrimary = cn(
  buttonVariants({ size: 'lg' }),
  homeButtonBase,
  'border border-[#2b3b5d] bg-[#1a2640] text-[#f0f0f0] hover:bg-[#233355]'
)

export const homeButtonHeroOutline = cn(
  buttonVariants({ variant: 'outline', size: 'lg' }),
  homeButtonBase,
  'border-[#3a507b] bg-transparent text-[#f0f0f0] hover:bg-[#18253f] hover:text-[#f0f0f0]'
)
