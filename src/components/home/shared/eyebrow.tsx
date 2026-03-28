import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  dot?: boolean
  className?: string
}

export function Eyebrow({ children, dot, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[color:var(--color-owl-gold)]',
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
