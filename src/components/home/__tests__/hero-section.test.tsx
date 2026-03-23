import { render, screen } from '@testing-library/react'
import { HeroSection } from '../hero-section'

const defaultProps = {
  eyebrow: 'Next-Gen Research',
  headline: 'Advanced Analytics Grounded in Field Data',
  body: 'OWL Intelligence develops decision-support products.',
  ctaPrimary: 'Explore Products',
  ctaSecondary: 'Talk to Our Agent',
  metrics: [
    { value: '81', label: 'Provinces of field coverage' },
    { value: '15+', label: 'Years of experience' },
    { value: '2', label: 'AI-supported products' },
  ] as [{ value: string; label: string }, { value: string; label: string }, { value: string; label: string }],
}

describe('HeroSection', () => {
  it('renders the headline', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(defaultProps.headline)
  })

  it('renders both CTA buttons', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByRole('link', { name: defaultProps.ctaPrimary })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Talk to Our Agent/i })).toBeInTheDocument()
  })

  it('renders all three metric values', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText('81')).toBeInTheDocument()
    expect(screen.getByText('15+')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders metric labels', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText('Provinces of field coverage')).toBeInTheDocument()
  })

  it('renders the eyebrow', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText('Next-Gen Research')).toBeInTheDocument()
  })
})
