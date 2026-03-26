import type { ImgHTMLAttributes, ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Footer } from '../footer'

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: (namespace: string) => (key: string) => {
    const messages = {
      footer: {
        description: 'AI-powered intelligence products grounded in authentic field data.',
        products: 'Products',
        company: 'Company',
        legal: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        rights: 'All rights reserved.',
        uk: 'United Kingdom',
        turkey: 'Türkiye',
      },
      nav: {
        fwbm: 'FWBM',
        fuzzyowl: 'FuzzyOwl',
        about: 'About',
        founders: 'Founders',
        investors: 'Investors & Partners',
        contact: 'Contact',
      },
    } as const

    const group = messages[namespace as keyof typeof messages]
    return group?.[key as keyof typeof group] ?? key
  },
}))

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, className, children }: { href: string; className?: string; children: ReactNode }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}))

describe('Footer', () => {
  it('uses an opaque footer background so previous section content does not bleed through', () => {
    const { container } = render(<Footer />)

    const footer = container.querySelector('footer')
    expect(footer?.className).toContain('bg-background')
    expect(footer?.className).not.toContain('bg-muted/30')
  })

  it('still renders the current footer description', () => {
    render(<Footer />)

    expect(screen.getByText('AI-powered intelligence products grounded in authentic field data.')).toBeInTheDocument()
  })

  it('renders EconImpact and the updated corporate name', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'EconImpact' })).toBeInTheDocument()
    expect(screen.getByText(/OWL Intelligence A\.Ş\./)).toBeInTheDocument()
  })
})
