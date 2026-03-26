import { render, screen, within } from '@testing-library/react'
import { FoundersSection } from '../founders-section'

const props = {
  eyebrow: 'Founders',
  heading: 'Built from a conviction',
  founders: [
    {
      quote: 'We built OWL because institutions kept making critical decisions on stale data.',
      name: 'Beyza Polat',
      role: 'Co-Founder',
      credential: 'Economist',
      photoSrc: '/images/beyzapolat.png',
      photoAlt: 'Beyza Polat',
    },
    {
      quote: 'The gap was never the data — it was the infrastructure.',
      name: 'Saygın Vedat Alkurt',
      role: 'Co-Founder',
      credential: 'Sociologist',
      photoSrc: '/images/sayginalkurt.png',
      photoAlt: 'Saygın Vedat Alkurt',
    },
  ] as [{ quote: string; name: string; role: string; credential: string; photoSrc: string; photoAlt: string }, { quote: string; name: string; role: string; credential: string; photoSrc: string; photoAlt: string }],
}

describe('FoundersSection', () => {
  it('renders both founder names', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getByText('Beyza Polat')).toBeInTheDocument()
    expect(screen.getByText('Saygın Vedat Alkurt')).toBeInTheDocument()
  })

  it('renders both quotes', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getByText(/We built OWL/)).toBeInTheDocument()
    expect(screen.getByText(/never the data/)).toBeInTheDocument()
  })

  it('renders founder photos with alt text', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getByAltText('Beyza Polat')).toBeInTheDocument()
    expect(screen.getByAltText('Saygın Vedat Alkurt')).toBeInTheDocument()
  })

  it('renders roles', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getAllByText('Co-Founder')).toHaveLength(2)
    expect(screen.getByText('Economist')).toBeInTheDocument()
    expect(screen.getByText('Sociologist')).toBeInTheDocument()
  })

  it('uses the shared editorial heading typography', () => {
    render(<FoundersSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-[2.5rem]')
    expect(heading.className).toContain('leading-[0.92]')
    expect(heading.className).toContain('tracking-[-0.05em]')
  })

  it('renders the founders section as an editorial profile rail', () => {
    render(<FoundersSection {...props} />)

    const rail = screen.getByTestId('founders-layout')
    expect(within(rail).getAllByRole('article')).toHaveLength(2)
  })

  it('left-aligns the founder quotations inside each profile object', () => {
    render(<FoundersSection {...props} />)

    const quotes = [
      screen.getByText('We built OWL because institutions kept making critical decisions on stale data.'),
      screen.getByText('The gap was never the data — it was the infrastructure.'),
    ]

    quotes.forEach((quote) => {
      expect(quote.className).toContain('text-left')
    })
  })

  it('keeps both founder cards the same size and places the quote marks at the top right', () => {
    render(<FoundersSection {...props} />)

    const rail = screen.getByTestId('founders-layout')
    expect(rail.className).not.toContain('lg:pt-10')

    const quoteMarks = [
      screen.getByTestId('founder-quote-mark-0'),
      screen.getByTestId('founder-quote-mark-1'),
    ]

    quoteMarks.forEach((mark) => {
      expect(mark.className).toContain('self-end')
    })
  })
})
