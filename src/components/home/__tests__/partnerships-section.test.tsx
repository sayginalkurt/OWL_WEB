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
})
