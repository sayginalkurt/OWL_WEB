import { render, screen } from '@testing-library/react'
import { ScrollCue } from '../scroll-cue'

describe('ScrollCue', () => {
  it('renders SCROLL label', () => {
    render(<ScrollCue />)
    expect(screen.getByText('SCROLL')).toBeInTheDocument()
  })

  it('has aria-hidden on decorative elements', () => {
    const { container } = render(<ScrollCue />)
    // The container itself should be aria-hidden since it's decorative
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})
