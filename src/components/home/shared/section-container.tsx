import { cn } from '@/lib/utils'

interface SectionContainerProps {
  dark?: boolean
  className?: string
  children: React.ReactNode
  id?: string
}

export function SectionContainer({ dark, className, children, id }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn('w-full', dark ? 'bg-dark-mid' : 'bg-background', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {children}
      </div>
    </section>
  )
}
