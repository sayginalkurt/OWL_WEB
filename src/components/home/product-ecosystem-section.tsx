'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { SectionContainer } from './shared/section-container'
import { Eyebrow } from './shared/eyebrow'
import { SectionHeading } from './shared/section-heading'
import { RevealWrapper } from './shared/reveal-wrapper'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import fwbmLogo from '../../../owlcontent/images/productlogos/FWBM.png'
import fuzzyOwlLogo from '../../../owlcontent/images/productlogos/FuzzyOWL.png'
import econImpactLogo from '../../../owlcontent/images/productlogos/EconImpact.png'

interface ProductLayer {
  logoSrc: string
  logoAlt: string
  name: string
  descriptor: string
  layers: [string, string, string]
  comingSoon?: boolean
}

interface ProductEcosystemSectionProps {
  id?: string
  eyebrow: string
  heading: string
  intro: string
  products: ProductLayer[]
  zIndex?: number
}

const uploadedLogoMap: Record<string, StaticImageData> = {
  FWBM: fwbmLogo,
  FuzzyOwl: fuzzyOwlLogo,
  EconImpact: econImpactLogo,
}

function resolveProductLogo(product: ProductLayer): string | StaticImageData {
  return uploadedLogoMap[product.logoAlt] ?? product.logoSrc
}

function getPreviewPosition(index: number) {
  if (index === 0) return 'left-1/2 top-[5%] -translate-x-1/2'
  if (index === 1) return 'left-[2%] top-[4%] sm:left-[8%]'
  return 'right-[2%] top-[34%] sm:right-[8%]'
}

function ProductLogoNode({
  product,
  active,
  center,
  popupOpen,
  onActivate,
  onDeactivate,
  onTogglePopup,
}: {
  product: ProductLayer
  active: boolean
  center?: boolean
  popupOpen: boolean
  onActivate: () => void
  onDeactivate: () => void
  onTogglePopup: () => void
}) {
  return (
    <button
      type="button"
      data-testid={`product-node-${product.logoAlt}`}
      data-active={active ? 'true' : 'false'}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseLeave={onDeactivate}
      onBlur={onDeactivate}
      onClick={onTogglePopup}
      className={cn(
        'group relative flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:scale-[1.08] focus:scale-[1.08] focus-visible:ring-2 focus-visible:ring-[var(--sd-fg-accent)]/50',
        center
          ? 'h-36 w-36 sm:h-40 sm:w-40 lg:h-48 lg:w-48'
          : 'h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32',
        active
          ? 'scale-[1.06] opacity-100'
          : 'scale-100 opacity-75 hover:opacity-100 focus:opacity-100'
      )}
      aria-label={product.name}
      aria-expanded={popupOpen}
      aria-controls="product-detail-popup"
    >
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-full border transition-all duration-500',
          active
            ? 'border-[var(--sd-fg-accent)]/55 bg-[color-mix(in_oklab,var(--sd-surface)_70%,transparent)] shadow-[0_0_0_12px_rgba(136,153,187,0.06),0_24px_80px_-34px_rgba(3,8,20,0.9)]'
            : 'border-[var(--sd-border)] bg-[color-mix(in_oklab,var(--sd-surface)_88%,transparent)]'
        )}
      />
      <div
        aria-hidden
        className={cn(
          'absolute rounded-full border border-[var(--sd-fg-accent)]/18 transition-all duration-500',
          center ? 'inset-[-1.1rem]' : 'inset-[-0.8rem]',
          active ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
        )}
      />
      <Image
        src={resolveProductLogo(product)}
        alt={product.logoAlt}
        width={center ? 108 : 70}
        height={center ? 108 : 70}
        className={cn(
          'relative z-10 h-auto object-contain transition-transform duration-500',
          center ? 'w-[4.75rem] sm:w-[5.5rem] lg:w-[6.4rem]' : 'w-[3.25rem] sm:w-[3.75rem] lg:w-[4.2rem]',
          active ? 'scale-100' : 'scale-95'
        )}
      />
      <span className="sr-only">{product.name}</span>
    </button>
  )
}

export function ProductEcosystemSection({ id, eyebrow, heading, intro, products, zIndex }: ProductEcosystemSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const heroProduct = products[0]
  const orbitProducts = products.slice(1)
  const activeProduct = products[activeIndex] ?? heroProduct
  const previewProduct = previewIndex === null ? null : (products[previewIndex] ?? heroProduct)
  const openProduct = openIndex === null ? null : (products[openIndex] ?? heroProduct)

  useEffect(() => {
    if (openIndex === null) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openIndex])

  const activateProduct = (index: number) => {
    setActiveIndex(index)
    setPreviewIndex(index)
  }

  const deactivateProduct = (index: number) => {
    setPreviewIndex((current) => (current === index ? null : current))
  }

  const toggleProductPopup = (index: number) => {
    setActiveIndex(index)
    setPreviewIndex(index)
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <SectionContainer
      dark
      surface="inverse"
      id={id}
      zIndex={zIndex}
      hideIndicator
      className="overflow-visible"
      innerClassName="justify-between py-8 sm:py-10 lg:py-12"
    >
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-6 lg:gap-8">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <RevealWrapper>
            <div className="max-w-3xl">
              <Eyebrow dot dark className="mb-5 text-[0.72rem] tracking-[0.26em]">
                {eyebrow}
              </Eyebrow>
              <SectionHeading dark className="max-w-[17ch] text-[2.5rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[3rem] lg:text-[3.15rem] xl:text-[3.7rem]">
                {heading}
              </SectionHeading>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={0.05}>
            <div className="lg:pb-1">
              <p className="max-w-xl text-sm leading-relaxed text-[var(--sd-fg-muted)]">
                {intro}
              </p>
              <div className="mt-5 flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--sd-fg-accent)]">
                <span>{String(products.length).padStart(2, '0')} Products</span>
                <span aria-hidden className="h-px w-10 bg-[var(--sd-fg-accent)]/50" />
                <span>Eclipse Stage</span>
              </div>
            </div>
          </RevealWrapper>
        </div>

        <div className="relative flex min-h-[18rem] items-center justify-center overflow-visible">
          <div aria-hidden className="absolute inset-x-[12%] top-1/2 h-px -translate-y-1/2 bg-[var(--sd-fg-accent)]/10" />
          <div aria-hidden className="absolute h-[12rem] w-[12rem] rounded-full border border-[var(--sd-fg-accent)]/10 sm:h-[15rem] sm:w-[15rem] lg:h-[18rem] lg:w-[18rem]" />
          <div aria-hidden className="absolute h-[16rem] w-[16rem] rounded-full border border-[var(--sd-fg-accent)]/6 sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[24rem]" />

          {previewProduct && openProduct === null && (
            <div
              data-testid="product-hover-preview"
              className={cn(
                'pointer-events-none absolute z-20 hidden w-52 rounded-[1.1rem] border border-[var(--sd-border)] bg-[color-mix(in_oklab,var(--sd-surface)_88%,transparent)] p-4 shadow-[0_20px_60px_-35px_rgba(3,8,20,0.88)] backdrop-blur-md lg:block',
                getPreviewPosition(previewIndex ?? activeIndex)
              )}
            >
              <p className="text-sm font-semibold tracking-tight text-[var(--sd-fg)]">{previewProduct.name}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {previewProduct.layers.slice(0, 2).map((layer) => (
                  <span
                    key={layer}
                    className="rounded-full border border-[var(--sd-fg-accent)]/20 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--sd-fg-accent)]"
                  >
                    {layer}
                  </span>
                ))}
              </div>
            </div>
          )}

          {orbitProducts[0] && (
            <div className="absolute left-[8%] top-1/2 -translate-y-[8%] sm:left-[14%] lg:left-[18%]">
              <ProductLogoNode
                product={orbitProducts[0]}
                active={activeIndex === 1}
                popupOpen={openIndex === 1}
                onActivate={() => activateProduct(1)}
                onDeactivate={() => deactivateProduct(1)}
                onTogglePopup={() => toggleProductPopup(1)}
              />
            </div>
          )}

          {heroProduct && (
            <div className="relative z-10">
              <ProductLogoNode
                product={heroProduct}
                center
                active={activeIndex === 0}
                popupOpen={openIndex === 0}
                onActivate={() => activateProduct(0)}
                onDeactivate={() => deactivateProduct(0)}
                onTogglePopup={() => toggleProductPopup(0)}
              />
            </div>
          )}

          {orbitProducts[1] && (
            <div className="absolute right-[8%] top-[22%] sm:right-[14%] lg:right-[18%]">
              <ProductLogoNode
                product={orbitProducts[1]}
                active={activeIndex === 2}
                popupOpen={openIndex === 2}
                onActivate={() => activateProduct(2)}
                onDeactivate={() => deactivateProduct(2)}
                onTogglePopup={() => toggleProductPopup(2)}
              />
            </div>
          )}

        </div>

        <RevealWrapper delay={0.08}>
          <div
            data-testid="product-spotlight"
            className="grid gap-4 border-t border-[var(--sd-border)] pt-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-8"
          >
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--sd-fg-accent)]">
                Spotlight
              </p>
              <h3 className="mt-3 max-w-[22ch] text-[1.1rem] font-bold tracking-tight text-[var(--sd-fg)] sm:text-[1.3rem]">
                {activeProduct?.name}
              </h3>
            </div>
            <div className="grid gap-4">
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--sd-fg-muted)] sm:text-[0.98rem]">
                {activeProduct?.descriptor}
              </p>
              <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
                {activeProduct?.layers.map((layer, i) => (
                  <div key={layer} className="border-t border-[var(--sd-border)] pt-2.5">
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--sd-fg-accent)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--sd-fg)]">{layer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>

      <Dialog open={openProduct !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        {openProduct && (
          <DialogContent
            data-testid="product-detail-popup"
            className="top-1/2 left-1/2 max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[1.35rem] border border-border bg-background p-6 text-foreground shadow-2xl"
          >
            <DialogHeader className="gap-3">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-chart-3">
                Product Detail
              </p>
              <DialogTitle className="max-w-[22ch] text-[1.1rem] font-bold tracking-tight text-foreground sm:text-[1.25rem]">
                {openProduct.name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-2">
              {openProduct.layers.map((layer, i) => (
                <div
                  key={layer}
                  className="rounded-2xl border border-border bg-muted/65 px-3 py-2.5"
                >
                  <span className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-chart-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">{layer}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {openProduct.descriptor}
              </DialogDescription>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </SectionContainer>
  )
}
