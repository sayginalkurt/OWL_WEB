import { render, screen } from '@testing-library/react'
import { ProductEcosystemSection } from '../product-ecosystem-section'

const props = {
  eyebrow: 'Product Ecosystem',
  heading: 'An integrated structure',
  intro: 'Our product ecosystem provides an integrated structure.',
  products: [
    {
      logoSrc: '/images/fwbmlogo.svg',
      logoAlt: 'FWBM',
      name: 'Financial Well-Being Monitor',
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
  it('renders both product names', () => {
    render(<ProductEcosystemSection {...props} />)
    expect(screen.getByText('Financial Well-Being Monitor')).toBeInTheDocument()
    expect(screen.getByText('FuzzyOwl')).toBeInTheDocument()
  })

  it('renders layer pills', () => {
    render(<ProductEcosystemSection {...props} />)
    expect(screen.getByText('Validated Field Data')).toBeInTheDocument()
    expect(screen.getByText('Relational Mapping')).toBeInTheDocument()
  })

  it('renders product logos with alt text', () => {
    render(<ProductEcosystemSection {...props} />)
    expect(screen.getByAltText('FWBM')).toBeInTheDocument()
    expect(screen.getByAltText('FuzzyOwl')).toBeInTheDocument()
  })
})
