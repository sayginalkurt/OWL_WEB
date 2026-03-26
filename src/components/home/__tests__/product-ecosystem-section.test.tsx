import { fireEvent, render, screen, within } from '@testing-library/react'
import { ProductEcosystemSection } from '../product-ecosystem-section'

const props = {
  eyebrow: 'Product Ecosystem',
  heading: 'An integrated structure',
  intro: 'Our product ecosystem provides an integrated structure.',
  products: [
    {
      logoSrc: '/images/fwbmlogo.svg',
      logoAlt: 'FWBM',
      name: 'FWBM: Financial Well-Being Monitor ©',
      descriptor: 'Next-generation household financial resilience.',
      layers: [
        'Validated Field Data',
        'Structured Analytics',
        'Decision Infrastructure',
      ] as [string, string, string],
    },
    {
      logoSrc: '/images/fuzzyowl.png',
      logoAlt: 'FuzzyOwl',
      name: 'FuzzyOwl',
      descriptor: 'Makes visible which variables shape decisions.',
      layers: [
        'Relational Mapping',
        'AI-Supported Analytics',
        'Scenario Simulation',
      ] as [string, string, string],
    },
  ] as [{ logoSrc: string; logoAlt: string; name: string; descriptor: string; layers: [string, string, string] }, { logoSrc: string; logoAlt: string; name: string; descriptor: string; layers: [string, string, string] }],
}

describe('ProductEcosystemSection', () => {
  it('renders all product logos with alt text', () => {
    render(<ProductEcosystemSection {...props} />)
    expect(screen.getByAltText('FWBM')).toBeInTheDocument()
    expect(screen.getByAltText('FuzzyOwl')).toBeInTheDocument()
  })

  it('defaults the spotlight to FWBM', () => {
    render(<ProductEcosystemSection {...props} />)
    const spotlight = screen.getByTestId('product-spotlight')
    expect(within(spotlight).getByText('FWBM: Financial Well-Being Monitor ©')).toBeInTheDocument()
    expect(within(spotlight).getByText('Next-generation household financial resilience.')).toBeInTheDocument()
  })

  it('updates the spotlight when hovering another logo', () => {
    render(<ProductEcosystemSection {...props} />)
    fireEvent.mouseEnter(screen.getByTestId('product-node-FuzzyOwl'))
    const spotlight = screen.getByTestId('product-spotlight')
    expect(within(spotlight).getByText('FuzzyOwl')).toBeInTheDocument()
    expect(within(spotlight).getByText('Makes visible which variables shape decisions.')).toBeInTheDocument()
  })

  it('shows a lightweight preview near the active logo on hover', () => {
    render(<ProductEcosystemSection {...props} />)
    fireEvent.mouseEnter(screen.getByTestId('product-node-FuzzyOwl'))
    const preview = screen.getByTestId('product-hover-preview')
    expect(within(preview).getByText('FuzzyOwl')).toBeInTheDocument()
    expect(within(preview).getByText('Relational Mapping')).toBeInTheDocument()
  })

  it('keeps FWBM as the central active logo by default', () => {
    render(<ProductEcosystemSection {...props} />)
    expect(screen.getByTestId('product-node-FWBM')).toHaveAttribute('data-active', 'true')
  })

  it('adds cinematic hover expansion classes to logo nodes', () => {
    render(<ProductEcosystemSection {...props} />)
    const firstNode = screen.getByTestId('product-node-FWBM')
    expect(firstNode.className).toContain('transition-all')
    expect(firstNode.className).toContain('hover:scale')
  })

  it('keeps the product section overflow visible for smooth homepage transitions', () => {
    render(<ProductEcosystemSection {...props} />)
    const section = screen.getByRole('heading', { level: 2 }).closest('section')
    expect(section).not.toBeNull()
    expect(section?.className).toContain('overflow-visible')
    expect(section?.className).not.toContain('overflow-hidden')
  })

  it('opens a centered popup above the section stack with tags before summary on click', () => {
    const { container } = render(<ProductEcosystemSection {...props} />)
    fireEvent.click(screen.getByTestId('product-node-FuzzyOwl'))
    expect(container.querySelector('[data-testid="product-detail-popup"]')).toBeNull()
    const popup = document.body.querySelector('[data-testid="product-detail-popup"]')
    expect(popup).not.toBeNull()
    const popupElement = popup as HTMLElement
    expect(popupElement).toHaveClass('fixed')
    expect(popupElement).toHaveClass('top-1/2')
    expect(popupElement).toHaveClass('left-1/2')
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(within(popupElement).getByText('Relational Mapping')).toBeInTheDocument()
    expect(within(popupElement).getByText('AI-Supported Analytics')).toBeInTheDocument()
    expect(within(popupElement).getByText('Makes visible which variables shape decisions.')).toBeInTheDocument()
  })

  it('uses solid theme-aware popup colors for readability', () => {
    render(<ProductEcosystemSection {...props} />)
    fireEvent.click(screen.getByTestId('product-node-FuzzyOwl'))
    const popup = document.body.querySelector('[data-testid="product-detail-popup"]') as HTMLElement
    expect(popup).toHaveClass('bg-background')
    expect(popup).toHaveClass('text-foreground')
    expect(popup.className).not.toContain('color-mix')
    expect(within(popup).getByText('Makes visible which variables shape decisions.').className).toContain('text-muted-foreground')
  })

  it('closes the anchored popup when clicking the same logo again', () => {
    render(<ProductEcosystemSection {...props} />)
    const logo = screen.getByTestId('product-node-FuzzyOwl')
    fireEvent.click(logo)
    expect(screen.getByTestId('product-detail-popup')).toBeInTheDocument()
    fireEvent.click(logo)
    expect(screen.queryByTestId('product-detail-popup')).not.toBeInTheDocument()
  })
})
