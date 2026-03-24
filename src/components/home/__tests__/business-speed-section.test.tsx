import { render, screen } from '@testing-library/react'
import { BusinessSpeedSection } from '../business-speed-section'

const props = {
  eyebrow: 'Business Moves Faster Than Traditional Data',
  statements: [
    'Static measurement cannot keep pace with changing conditions.',
    'Delayed signals weaken response quality.',
    'Better decisions require higher-frequency, ground-level evidence.',
  ] as [string, string, string],
}

describe('BusinessSpeedSection', () => {
  it('renders the left-side headline', () => {
    render(<BusinessSpeedSection {...props} />)
    expect(screen.getByText('BUSINESS MOVES')).toBeInTheDocument()
    expect(screen.getByText('FASTER THAN')).toBeInTheDocument()
    expect(screen.getByText('TRADITIONAL DATA')).toBeInTheDocument()
  })

  it('renders all three statements', () => {
    render(<BusinessSpeedSection {...props} />)
    props.statements.forEach(s => {
      expect(screen.getByText(s)).toBeInTheDocument()
    })
  })
})
