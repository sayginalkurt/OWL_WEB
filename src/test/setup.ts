import '@testing-library/jest-dom'

// Mock IntersectionObserver (not available in jsdom)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return [] }
} as unknown as typeof IntersectionObserver

// Mock next/image globally
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: {
    src: string; alt: string; width?: number; height?: number; className?: string
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}))

// Mock next/link globally
vi.mock('next/link', () => ({
  default: ({ href, children, className }: {
    href: string; children: React.ReactNode; className?: string
  }) => <a href={href} className={className}>{children}</a>,
}))
