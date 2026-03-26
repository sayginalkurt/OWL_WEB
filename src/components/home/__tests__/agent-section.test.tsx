import { render, screen } from '@testing-library/react'
import { AgentSection } from '../agent-section'

const props = {
  eyebrow: 'Talk to Our Agent',
  heading: 'Ask anything you would like to know.',
  subCopy: 'Our AI agent is available to answer questions.',
  ctaLabel: 'Talk to OWL Agent',
  ctaHref: '/agent',
}

describe('AgentSection', () => {
  it('renders heading', () => {
    render(<AgentSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Ask anything')
  })

  it('renders CTA link to /agent', () => {
    render(<AgentSection {...props} />)
    expect(screen.getByRole('link', { name: 'Talk to OWL Agent' })).toHaveAttribute('href', '/agent')
  })

  it('uses the shared editorial heading typography', () => {
    render(<AgentSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-[2.5rem]')
    expect(heading.className).toContain('leading-[0.92]')
    expect(heading.className).toContain('tracking-[-0.05em]')
  })

  it('renders a conversational agent prompt object', () => {
    render(<AgentSection {...props} />)

    expect(screen.getByTestId('agent-layout')).toBeInTheDocument()
  })

  it('uses a simple icon and button action object instead of the larger prompt card', () => {
    render(<AgentSection {...props} />)

    expect(screen.queryByText('Prompt')).not.toBeInTheDocument()
    expect(screen.queryByText('Products')).not.toBeInTheDocument()

    const action = screen.getByTestId('agent-action')
    const icon = action.querySelector('svg')
    expect(icon).not.toBeNull()
    expect(icon?.getAttribute('class')).toContain('h-9')
    expect(icon?.getAttribute('class')).toContain('w-9')
    expect(screen.getByRole('link', { name: 'Talk to OWL Agent' }).className).toContain('var(--color-owl-gold)')
    expect(screen.getByRole('link', { name: 'Talk to OWL Agent' }).className).toContain('hover:shadow')
  })
})
