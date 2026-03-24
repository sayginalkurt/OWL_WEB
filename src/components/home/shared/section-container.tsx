import { cn } from '@/lib/utils'
import { ScrollIndicator } from './scroll-indicator'

interface SectionContainerProps {
  dark?: boolean
  className?: string
  children: React.ReactNode
  id?: string
  hideIndicator?: boolean
  zIndex?: number
  stackIndex?: number
  surface?: 'default' | 'inverse'
}

export function SectionContainer({
  dark,
  className,
  children,
  id,
  hideIndicator,
  zIndex,
  stackIndex = 0,
  surface = 'default',
}: SectionContainerProps) {
  const stackOffset = Math.min(Math.max(stackIndex, 0) * 8, 48)
  const stickyTop = `calc(4rem + ${stackOffset}px)`
  const stickyHeight = `calc(100vh - 4rem - ${stackOffset}px)`
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
        'w-full flex items-center sticky section-stack-card relative isolate overflow-hidden',
        dark ? 'section-dark' : 'bg-background',
        className
      )}
      style={{
        ...(zIndex ? { zIndex } : {}),
        top: stickyTop,
        height: stickyHeight,
        backgroundColor,
        color,
      }}
    >
      <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundColor }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full h-full flex flex-col justify-center">
        {children}
      </div>
      {!hideIndicator && <ScrollIndicator dark={dark} />}
    </section>
  )
}
