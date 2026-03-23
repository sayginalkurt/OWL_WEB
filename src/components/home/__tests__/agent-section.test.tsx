import { render, screen } from '@testing-library/react'
import { AgentSection } from '../agent-section'

const props = {
  eyebrow: 'Talk to Our Agent',
  heading: 'Ask anything you would like to know.',
  subCopy: 'Our AI agent is available to answer questions.',
  ctaLabel: 'Open Agent',
  ctaHref: '/agent',
}

describe('AgentSection', () => {
  it('renders heading', () => {
    render(<AgentSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Ask anything')
  })

  it('renders CTA link to /agent', () => {
    render(<AgentSection {...props} />)
    expect(screen.getByRole('link', { name: 'Open Agent' })).toHaveAttribute('href', '/agent')
  })
})
