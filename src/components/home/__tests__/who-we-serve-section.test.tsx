import { render, screen } from '@testing-library/react'
import { WhoWeServeSection } from '../who-we-serve-section'

const props = {
  eyebrow: 'Who We Serve',
  heading: 'Built for institutions',
  context: 'Nine sectors.',
  sectors: [
    'Finance and Banking', 'Insurance', 'Retail',
    'Fast-Moving Consumer Goods', 'E-Commerce',
    'Durable Goods and Home Appliances', 'Real Estate',
    'Technology and Telecommunications', 'International Organizations',
  ] as [string,string,string,string,string,string,string,string,string],
}

describe('WhoWeServeSection', () => {
  it('renders heading', () => {
    render(<WhoWeServeSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Built for institutions')
  })

  it('renders all 9 sector pills', () => {
    render(<WhoWeServeSection {...props} />)
    expect(screen.getByText('Finance and Banking')).toBeInTheDocument()
    expect(screen.getByText('International Organizations')).toBeInTheDocument()
  })
})
