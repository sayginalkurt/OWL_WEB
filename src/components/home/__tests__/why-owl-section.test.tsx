import { render, screen } from '@testing-library/react'
import { WhyOwlSection } from '../why-owl-section'

const props = {
  eyebrow: 'Why OWL Intelligence',
  heading: 'Not a research firm.',
  intro: 'Unlike conventional research firms.',
  differentiators: [
    { title: 'Methodology', body: 'Deep methodological expertise.' },
    { title: 'Advanced Analytics', body: 'Transforms data into decisions.' },
    { title: 'AI Infrastructure', body: 'Developed in-house.' },
  ] as [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }],
}

describe('WhyOwlSection', () => {
  it('renders heading', () => {
    render(<WhyOwlSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Not a research firm.')
  })

  it('renders all 3 differentiator titles', () => {
    render(<WhyOwlSection {...props} />)
    expect(screen.getByText('Methodology')).toBeInTheDocument()
    expect(screen.getByText('AI Infrastructure')).toBeInTheDocument()
  })
})
