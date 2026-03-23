import { render, screen } from '@testing-library/react'
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
  heading: 'Eight integrated stages',
  steps: mockSteps,
}

describe('IntelligenceLayerSection', () => {
  it('renders the heading', () => {
    render(<IntelligenceLayerSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Eight integrated stages')
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
})
