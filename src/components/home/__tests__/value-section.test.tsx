import { render, screen } from '@testing-library/react'
import { ValueSection } from '../value-section'

const props = {
  eyebrow: 'How OWL Intelligence Creates Value',
  heading: 'Measurement, analytics, and AI in one decision-support layer',
  body: 'OWL Intelligence brings measurement, analytics, and AI together.',
  columns: [
    { title: 'Measurement', body: 'Continuous real-world monitoring.' },
    { title: 'Analytics', body: 'Transforms data into decisions.' },
    { title: 'AI', body: 'Governed AI interpretation layer.' },
  ] as [{ title: string; body: string }, { title: string; body: string }, { title: string; body: string }],
}

describe('ValueSection', () => {
  it('renders heading', () => {
    render(<ValueSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(props.heading)
  })

  it('renders all 3 column titles', () => {
    render(<ValueSection {...props} />)
    expect(screen.getByText('Measurement')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
  })
})
