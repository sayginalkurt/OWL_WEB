import { render, screen, within } from '@testing-library/react'
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

  it('uses the shared editorial heading typography', () => {
    render(<WhyOwlSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-[2.5rem]')
    expect(heading.className).toContain('leading-[0.92]')
    expect(heading.className).toContain('tracking-[-0.05em]')
  })

  it('renders an editorial rail layout with three sequenced cards', () => {
    render(<WhyOwlSection {...props} />)

    const rail = screen.getByTestId('why-owl-rail')
    expect(within(rail).getAllByRole('article')).toHaveLength(3)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
  })
})
