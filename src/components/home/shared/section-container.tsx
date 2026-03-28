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
  sticky?: boolean
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
  sticky = true,
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
        'w-full flex items-center section-stack-card relative isolate overflow-hidden',
        // Sticky + overflow-hidden on tall sections clips content and blocks normal scroll on phones/tablets.
        sticky
          ? 'max-lg:relative max-lg:top-auto max-lg:min-h-[calc(100dvh-4rem)] lg:sticky lg:top-16 lg:min-h-[calc(100vh-4rem)] lg:h-[calc(100dvh-4rem)]'
          : 'relative top-0',
        dark ? 'section-dark' : 'bg-background',
        className
      )}
      style={{
        ...(zIndex ? { zIndex } : {}),
        backgroundColor,
        color,
      }}
    >
      <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundColor }} />
      <div
        className={cn(
          'mx-auto flex w-full min-w-0 max-w-7xl flex-col justify-center px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20',
          sticky ? 'h-full' : 'min-h-0',
          innerClassName,
        )}
      >
        {children}
      </div>
      {!hideIndicator && <ScrollIndicator dark={dark} />}
    </section>
  )
}
