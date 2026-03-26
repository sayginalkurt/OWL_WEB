import { render, screen } from '@testing-library/react'
import { BusinessSpeedSection } from '../business-speed-section'

const props = {
  eyebrow: 'Problem',
  heading: 'Business moves faster than traditional data',
  statements: [
    'Static measurement cannot keep pace with changing conditions.',
    'Delayed signals weaken response quality.',
    'Better decisions require higher-frequency, ground-level evidence.',
  ] as [string, string, string],
}

describe('BusinessSpeedSection', () => {
  it('renders the editorial eyebrow and heading copy', () => {
    render(<BusinessSpeedSection {...(props as never)} />)
    expect(screen.getByText('Problem')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /business moves faster than traditional data/i })).toBeInTheDocument()
  })

  it('renders all three statements', () => {
    render(<BusinessSpeedSection {...(props as never)} />)
    props.statements.forEach(s => {
      expect(screen.getByText(s)).toBeInTheDocument()
    })
  })

  it('renders the statements as editorial content rather than buttons', () => {
    render(<BusinessSpeedSection {...(props as never)} />)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })
})
