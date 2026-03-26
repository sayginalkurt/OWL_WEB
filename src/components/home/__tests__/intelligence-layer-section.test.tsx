import { render, screen, within } from '@testing-library/react'
import { IntelligenceLayerSection } from '../intelligence-layer-section'

const mockSteps = Array.from({ length: 8 }, (_, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title: `Step ${i + 1} Title`,
  body: `Step ${i + 1} body text.`,
})) as [
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
  { number: string; title: string; body: string },
]

const props = {
  eyebrow: 'How Our Intelligence Layer Works',
  heading: 'Eight integrated stages from raw signal to institutional decision',
  steps: mockSteps,
}

describe('IntelligenceLayerSection', () => {
  it('renders the heading', () => {
    render(<IntelligenceLayerSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Eight integrated stages from raw signal to institutional decision'
    )
  })

  it('renders all 8 step titles', () => {
    render(<IntelligenceLayerSection {...props} />)
    mockSteps.forEach(step => {
      expect(screen.getByText(step.title)).toBeInTheDocument()
    })
  })

  it('renders step numbers', () => {
    render(<IntelligenceLayerSection {...props} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('08')).toBeInTheDocument()
  })

  it('renders the steps inside a shared matrix shell', () => {
    render(<IntelligenceLayerSection {...props} />)

    const matrix = screen.getByTestId('intelligence-layer-matrix')
    expect(within(matrix).getAllByRole('article')).toHaveLength(8)
  })

  it('uses a wider heading measure for the production copy', () => {
    render(<IntelligenceLayerSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).not.toContain('max-w-[12ch]')
  })

  it('does not render the removed section meta labels', () => {
    render(<IntelligenceLayerSection {...props} />)

    expect(screen.queryByText('08 Stages')).not.toBeInTheDocument()
    expect(screen.queryByText('Structured Chain')).not.toBeInTheDocument()
  })

  it('keeps the section content vertically centered', () => {
    const { container } = render(<IntelligenceLayerSection {...props} />)

    const innerContainer = container.querySelector('section > div:nth-of-type(2)')
    expect(innerContainer?.className).toContain('justify-center')
  })

  it('matches the previous section heading scale and rhythm', () => {
    render(<IntelligenceLayerSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('leading-[0.92]')
    expect(heading.className).toContain('tracking-[-0.05em]')
    expect(heading.className).toContain('text-[2.5rem]')
    expect(heading.className).toContain('lg:text-[3.15rem]')
  })

  it('uses a wide enough heading measure for a two-line wrap', () => {
    render(<IntelligenceLayerSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('max-w-[23ch]')
  })

  it('uses a two-column matrix by default for mobile fit', () => {
    render(<IntelligenceLayerSection {...props} />)

    const matrix = screen.getByTestId('intelligence-layer-matrix')
    expect(matrix.className).toContain('grid-cols-2')
  })

  it('does not use a sticky full-viewport section shell', () => {
    const { container } = render(<IntelligenceLayerSection {...props} />)

    const section = container.querySelector('section')
    expect(section?.className).not.toContain('sticky')
  })

  it('centers content inside each step box', () => {
    render(<IntelligenceLayerSection {...props} />)

    const card = within(screen.getByTestId('intelligence-layer-matrix')).getAllByRole('article')[0]
    expect(card.className).toContain('items-center')
    expect(card.className).toContain('text-center')
    expect(card.className).toContain('justify-center')
  })

  it('keeps a full-viewport section feel without using sticky layout', () => {
    const { container } = render(<IntelligenceLayerSection {...props} />)

    const innerContainer = container.querySelector('section > div:nth-of-type(2)')
    expect(innerContainer?.className).toContain('min-h-[calc(100vh-4rem)]')
  })
})
