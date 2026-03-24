import { cn } from '@/lib/utils'
import { ScrollIndicator } from './scroll-indicator'

interface SectionContainerProps {
  dark?: boolean
  className?: string
  innerClassName?: string
  children: React.ReactNode
  id?: string
  hideIndicator?: boolean
  zIndex?: number
  surface?: 'default' | 'inverse'
}

export function SectionContainer({
  dark,
  className,
  innerClassName,
  children,
  id,
  hideIndicator,
  zIndex,
  surface = 'default',
}: SectionContainerProps) {
  const backgroundColor =
    surface === 'inverse'
      ? 'var(--section-inverse-bg)'
      : dark
        ? 'var(--sd-bg)'
        : 'var(--background)'
  const color = surface === 'inverse' ? 'var(--section-inverse-fg)' : undefined

  return (
    <section
      id={id}
      className={cn(
        'w-full flex items-center sticky top-16 section-stack-card relative isolate overflow-hidden',
        dark ? 'section-dark' : 'bg-background',
        className
      )}
      style={{
        ...(zIndex ? { zIndex } : {}),
        height: 'calc(100vh - 4rem)',
        backgroundColor,
        color,
      }}
    >
      <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundColor }} />
      <div className={cn("max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 w-full h-full flex flex-col justify-center", innerClassName)}>
        {children}
      </div>
      {!hideIndicator && <ScrollIndicator dark={dark} />}
    </section>
  )
}
