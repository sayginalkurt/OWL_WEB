import { render, screen } from '@testing-library/react'
import { PartnershipsSection } from '../partnerships-section'

const props = {
  eyebrow: 'Partnerships, Investment & Institutional Collaboration',
  heading: 'Open to those who want to build',
  body: 'OWL Intelligence is open to working with stakeholders.',
  ctaLabel: 'Get in Touch',
  ctaHref: '/contact',
}

describe('PartnershipsSection', () => {
  it('renders heading', () => {
    render(<PartnershipsSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders CTA link', () => {
    render(<PartnershipsSection {...props} />)
    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '/contact')
  })

  it('uses the shared editorial heading typography', () => {
    render(<PartnershipsSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-[2.5rem]')
    expect(heading.className).toContain('leading-[0.92]')
    expect(heading.className).toContain('tracking-[-0.05em]')
  })

  it('renders a distinct partnership proposition object', () => {
    render(<PartnershipsSection {...props} />)

    expect(screen.getByTestId('partnerships-layout')).toBeInTheDocument()
  })

  it('centers the collaboration copy in the main proposition frame without a nested card', () => {
    render(<PartnershipsSection {...props} />)

    const layout = screen.getByTestId('partnerships-layout')
    expect(layout.className).toContain('lg:items-center')
    expect(screen.queryByText('Collaboration')).not.toBeInTheDocument()
  })

  it('uses the owl gold CTA style with a subtle hover instead of an invert hover', () => {
    render(<PartnershipsSection {...props} />)

    const cta = screen.getByRole('link', { name: 'Get in Touch' })
    expect(cta.className).toContain('var(--color-owl-gold)')
    expect(cta.className).toContain('hover:shadow')
    expect(cta.className).not.toContain('hover:text-[var(--sd-bg')
  })
})
