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
  it('renders the editorial eyebrow, heading, and supporting body copy', () => {
    render(<ValueSection {...props} />)
    expect(screen.getByText(props.eyebrow)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(props.heading)
    expect(screen.getByText(props.body)).toBeInTheDocument()
  })

  it('renders all 3 stages as directional editorial articles', () => {
    render(<ValueSection {...props} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(screen.getByText('Measurement')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  it('uses theme-aware article surfaces instead of a hardcoded light gradient', () => {
    render(<ValueSection {...props} />)
    const firstStage = screen.getAllByRole('article')[0]
    expect(firstStage.className).not.toContain('rgba(255,255,255')
    expect(firstStage).toHaveClass('bg-card/70')
  })
})
