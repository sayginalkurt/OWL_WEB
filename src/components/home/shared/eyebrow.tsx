import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  dot?: boolean
  dark?: boolean
  className?: string
}

export function Eyebrow({ children, dot, dark, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase mb-4',
        dark ? 'text-chart-3' : 'text-muted-foreground',
        className,
      )}
    >
      {dot && (
        <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      )}
      {children}
    </p>
  )
}
