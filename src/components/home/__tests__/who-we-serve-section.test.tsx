import { render, screen, within } from '@testing-library/react'
import { WhoWeServeSection } from '../who-we-serve-section'

const props = {
  eyebrow: 'Who We Serve',
  heading: 'Built for institutions that operate at complexity',
  context: 'Nine sectors.',
  sectors: [
    'Finance and Banking', 'Insurance', 'Retail',
    'Fast-Moving Consumer Goods', 'E-Commerce',
    'Durable Goods and Home Appliances', 'Real Estate',
    'Technology and Telecommunications', 'International Organizations',
  ] as [string,string,string,string,string,string,string,string,string],
}

describe('WhoWeServeSection', () => {
  it('renders heading', () => {
    render(<WhoWeServeSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Built for institutions that operate at complexity'
    )
  })

  it('renders all 9 sectors in an editorial matrix', () => {
    render(<WhoWeServeSection {...props} />)

    const matrix = screen.getByTestId('who-we-serve-matrix')
    expect(within(matrix).getAllByRole('article')).toHaveLength(9)
    expect(screen.getByText('Finance and Banking')).toBeInTheDocument()
    expect(screen.getByText('International Organizations')).toBeInTheDocument()
  })

  it('uses the shared headline typography recipe', () => {
    render(<WhoWeServeSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-[2.5rem]')
    expect(heading.className).toContain('leading-[0.92]')
    expect(heading.className).toContain('tracking-[-0.05em]')
  })

  it('forces the who-we-serve heading into the approved two-line break', () => {
    render(<WhoWeServeSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.innerHTML).toContain('<br')
    expect(heading.className).toContain('max-w-[24ch]')
  })

  it('renders editorial sector numbers', () => {
    render(<WhoWeServeSection {...props} />)

    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('09')).toBeInTheDocument()
  })

  it('uses a 3x3 mobile grid and 1x9 desktop row', () => {
    render(<WhoWeServeSection {...props} />)

    const matrix = screen.getByTestId('who-we-serve-matrix')
    expect(matrix.className).toContain('grid-cols-3')
    expect(matrix.className).toContain('xl:grid-cols-9')
  })

  it('right-aligns sector labels on small screens and uses vertical type on xl+', () => {
    render(<WhoWeServeSection {...props} />)

    const firstCard = within(screen.getByTestId('who-we-serve-matrix')).getAllByRole('article')[0]
    expect(firstCard.className).toContain('group')

    const sectorLabel = screen.getByTestId('sector-label-01')
    expect(sectorLabel.className).toContain('text-right')
    expect(sectorLabel.className).toContain('xl:[writing-mode:vertical-rl]')
    expect(sectorLabel.className).toContain('xl:rotate-180')
  })

  it('uses a flexible non-sticky section shell', () => {
    const { container } = render(<WhoWeServeSection {...props} />)

    const section = container.querySelector('section')
    const innerContainer = container.querySelector('section > div:nth-of-type(2)')

    expect(section?.className).not.toContain('sticky')
    expect(innerContainer?.className).toContain('min-h-[calc(100vh-4rem)]')
  })

  it('keeps all sector cards at the same fixed height', () => {
    render(<WhoWeServeSection {...props} />)

    const firstCard = within(screen.getByTestId('who-we-serve-matrix')).getAllByRole('article')[0]
    expect(firstCard.className).toContain('h-[8.5rem]')
    expect(firstCard.className).toContain('xl:h-[19rem]')
  })
})
