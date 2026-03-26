import { render, screen } from '@testing-library/react'
import { ContactDemoSection } from '../contact-demo-section'

const props = {
  eyebrow: 'Contact',
  heading: 'Start a conversation.',
  body: "Whether you're exploring or looking to invest.",
  cardHeading: 'Ready to see it in action?',
  ctaLabel: 'Book a Demo',
  ctaHref: '/contact',
}

describe('ContactDemoSection', () => {
  it('renders main heading', () => {
    render(<ContactDemoSection {...props} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Start a conversation.')
  })

  it('renders the CTA card with link', () => {
    render(<ContactDemoSection {...props} />)
    expect(screen.getByRole('link', { name: 'Book a Demo' })).toHaveAttribute('href', '/contact')
  })

  it('uses the shared editorial heading typography', () => {
    render(<ContactDemoSection {...props} />)

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-[2.5rem]')
    expect(heading.className).toContain('leading-[0.92]')
    expect(heading.className).toContain('tracking-[-0.05em]')
  })

  it('renders a closing contact conversion object', () => {
    render(<ContactDemoSection {...props} />)

    expect(screen.getByTestId('contact-layout')).toBeInTheDocument()
  })
})
