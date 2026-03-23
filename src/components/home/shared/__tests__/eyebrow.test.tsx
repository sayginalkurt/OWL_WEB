import { render, screen } from '@testing-library/react'
import { Eyebrow } from '../eyebrow'

describe('Eyebrow', () => {
  it('renders text', () => {
    render(<Eyebrow>WHO WE SERVE</Eyebrow>)
    expect(screen.getByText('WHO WE SERVE')).toBeInTheDocument()
  })

  it('renders with dot prefix by default', () => {
    const { container } = render(<Eyebrow dot>LABEL</Eyebrow>)
    expect(container.querySelector('[aria-hidden]')).toBeInTheDocument()
  })
})
