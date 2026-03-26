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
  it('renders the eyebrow, headline, body, and ctas', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText(defaultProps.eyebrow)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(defaultProps.headline)
    expect(screen.getByText(defaultProps.body)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: defaultProps.ctaPrimary })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: new RegExp(`^${defaultProps.ctaSecondary}`) })).toBeInTheDocument()
  })

  it('does not render visible metrics in the redesigned hero', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.queryByText('81')).not.toBeInTheDocument()
    expect(screen.queryByText('15+')).not.toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('keeps the animated background mounted', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByTestId('hero-background')).toBeInTheDocument()
  })

  it('applies separate styling hooks for the monolith and supporting line', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByTestId('hero-headline-monolith')).toBeInTheDocument()
    expect(screen.getByTestId('hero-headline-support')).toBeInTheDocument()
  })

  it('keeps the scroll indicator mounted', () => {
    const { container } = render(<HeroSection {...defaultProps} />)
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
  })
})
