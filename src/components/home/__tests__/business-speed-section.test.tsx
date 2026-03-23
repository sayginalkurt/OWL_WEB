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
  it('renders the eyebrow', () => {
    render(<BusinessSpeedSection {...props} />)
    expect(screen.getByText(props.eyebrow)).toBeInTheDocument()
  })

  it('renders all three statements', () => {
    render(<BusinessSpeedSection {...props} />)
    props.statements.forEach(s => {
      expect(screen.getByText(s)).toBeInTheDocument()
    })
  })
})
