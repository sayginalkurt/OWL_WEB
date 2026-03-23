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
        'text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]',
        dark ? 'text-[#f0f0f0]' : 'text-foreground',
        className,
      )}
    >
      {children}
    </h2>
  )
}
