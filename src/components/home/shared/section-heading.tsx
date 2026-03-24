import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  children: React.ReactNode
  dark?: boolean
  className?: string
}

export function SectionHeading({ children, dark, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.08]',
        dark ? 'text-[var(--sd-fg)]' : 'text-foreground',
        className,
      )}
    >
      {children}
    </h2>
  )
}
