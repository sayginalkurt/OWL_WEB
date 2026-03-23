import { render, screen } from '@testing-library/react'
import { RevealWrapper } from '../reveal-wrapper'

describe('RevealWrapper', () => {
  it('renders children', () => {
    render(<RevealWrapper><p>visible content</p></RevealWrapper>)
    expect(screen.getByText('visible content')).toBeInTheDocument()
  })

  it('accepts a className prop', () => {
    const { container } = render(
      <RevealWrapper className="custom-class"><p>x</p></RevealWrapper>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with fadeIn variant without crashing', () => {
    render(<RevealWrapper variant="fadeIn"><p>fadeIn content</p></RevealWrapper>)
    expect(screen.getByText('fadeIn content')).toBeInTheDocument()
  })

  it('renders with a delay without crashing', () => {
    render(<RevealWrapper delay={0.3}><p>delayed</p></RevealWrapper>)
    expect(screen.getByText('delayed')).toBeInTheDocument()
  })
})
