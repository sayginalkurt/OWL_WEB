import { cn } from '@/lib/utils'
import { ScrollIndicator } from './scroll-indicator'

interface SectionContainerProps {
  dark?: boolean
  className?: string
  children: React.ReactNode
  id?: string
  hideIndicator?: boolean
  zIndex?: number
}

export function SectionContainer({ dark, className, children, id, hideIndicator, zIndex }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full min-h-[calc(100vh-4rem)] flex items-center sticky top-16 section-stack-card',
        dark ? 'section-dark' : 'bg-background',
        className
      )}
      style={zIndex ? { zIndex } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        {children}
      </div>
      {!hideIndicator && <ScrollIndicator dark={dark} />}
    </section>
  )
}
