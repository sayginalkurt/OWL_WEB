import { render, screen } from '@testing-library/react'
import { SectionContainer } from '../section-container'

describe('SectionContainer', () => {
  it('renders children', () => {
    render(<SectionContainer><p>content</p></SectionContainer>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('applies dark background when dark prop is true', () => {
    const { container } = render(<SectionContainer dark><p>x</p></SectionContainer>)
    expect(container.firstChild).toHaveClass('section-dark')
  })

  it('applies light background by default', () => {
    const { container } = render(<SectionContainer><p>x</p></SectionContainer>)
    expect(container.firstChild).toHaveClass('bg-background')
  })

  it('accepts an id prop for anchor links', () => {
    const { container } = render(<SectionContainer id="hero"><p>x</p></SectionContainer>)
    expect(container.firstChild).toHaveAttribute('id', 'hero')
  })
})
