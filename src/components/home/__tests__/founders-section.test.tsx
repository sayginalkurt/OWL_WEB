import { render, screen } from '@testing-library/react'
import { FoundersSection } from '../founders-section'

const props = {
  eyebrow: 'Founders',
  heading: 'Built from a conviction',
  founders: [
    {
      quote: 'We built OWL because institutions kept making critical decisions on stale data.',
      name: 'Beyza Polat, Ph.D.',
      role: 'CEO & Co-Founder',
      credential: 'Economist. Bilkent University · LSE.',
      photoSrc: '/images/beyzapolat.png',
      photoAlt: 'Beyza Polat',
    },
    {
      quote: 'The gap was never the data — it was the infrastructure.',
      name: 'Saygın Vedat Alkurt',
      role: 'Co-Founder',
      credential: 'Sociologist. METU.',
      photoSrc: '/images/sayginalkurt.png',
      photoAlt: 'Saygın Vedat Alkurt',
    },
  ] as [{ quote: string; name: string; role: string; credential: string; photoSrc: string; photoAlt: string }, { quote: string; name: string; role: string; credential: string; photoSrc: string; photoAlt: string }],
}

describe('FoundersSection', () => {
  it('renders both founder names', () => {
    render(<FoundersSection {...props} />)
    expect(screen.getByText('Beyza Polat, Ph.D.')).toBeInTheDocument()
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
    expect(screen.getByText('CEO & Co-Founder')).toBeInTheDocument()
  })
})
