import { getTranslations } from 'next-intl/server'
import { HeroSection } from '@/components/home/hero-section'
import { BusinessSpeedSection } from '@/components/home/business-speed-section'
import { ValueSection } from '@/components/home/value-section'
import { ProductEcosystemSection } from '@/components/home/product-ecosystem-section'
import { IntelligenceLayerSection } from '@/components/home/intelligence-layer-section'
import { WhoWeServeSection } from '@/components/home/who-we-serve-section'
import { WhyOwlSection } from '@/components/home/why-owl-section'
import { FoundersSection } from '@/components/home/founders-section'
import { PartnershipsSection } from '@/components/home/partnerships-section'
import { AgentSection } from '@/components/home/agent-section'
import { ContactDemoSection } from '@/components/home/contact-demo-section'
import { SectionNav } from '@/components/home/section-nav'
import { SectionSnapController } from '@/components/home/section-snap-controller'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default async function HomePage() {
  const t = await getTranslations('home')

  return (
    <main className="pt-16">
      <SectionSnapController />
      <SectionNav />
      <HeroSection
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        body={t('hero.body')}
        ctaPrimary={t('hero.ctaPrimary')}
        ctaSecondary={t('hero.ctaSecondary')}
        metrics={[
          { value: t('hero.metric1Value'), label: t('hero.metric1Label') },
          { value: t('hero.metric2Value'), label: t('hero.metric2Label') },
          { value: t('hero.metric3Value'), label: t('hero.metric3Label') },
        ]}
      />

      <BusinessSpeedSection
        zIndex={2}
        id="business-speed"
        eyebrow={t('businessSpeed.eyebrow')}
        statements={[
          t('businessSpeed.statement1'),
          t('businessSpeed.statement2'),
          t('businessSpeed.statement3'),
        ]}
      />

      <ValueSection
        zIndex={3}
        id="value"
        eyebrow={t('value.eyebrow')}
        heading={t('value.heading')}
        body={t('value.body')}
        columns={[
          { title: t('value.col1Title'), body: t('value.col1Body') },
          { title: t('value.col2Title'), body: t('value.col2Body') },
          { title: t('value.col3Title'), body: t('value.col3Body') },
        ]}
      />

      <ProductEcosystemSection
        zIndex={4}
        id="product-ecosystem"
        eyebrow={t('productEcosystem.eyebrow')}
        heading={t('productEcosystem.heading')}
        intro={t('productEcosystem.intro')}
        products={[
          {
            logoSrc: '/images/fwbmlogo.svg',
            logoAlt: 'FWBM',
            name: t('productEcosystem.fwbmName'),
            descriptor: t('productEcosystem.fwbmDescriptor'),
            layers: [
              t('productEcosystem.fwbmLayer1'),
              t('productEcosystem.fwbmLayer2'),
              t('productEcosystem.fwbmLayer3'),
            ],
          },
          {
            logoSrc: '/images/fuzzyowl.png',
            logoAlt: 'FuzzyOwl',
            name: t('productEcosystem.fuzzyowlName'),
            descriptor: t('productEcosystem.fuzzyowlDescriptor'),
            layers: [
              t('productEcosystem.fuzzyowlLayer1'),
              t('productEcosystem.fuzzyowlLayer2'),
              t('productEcosystem.fuzzyowlLayer3'),
            ],
          },
          {
            logoSrc: '/images/owlgold.svg',
            logoAlt: 'EconImpact',
            name: t('productEcosystem.econimpactName'),
            descriptor: t('productEcosystem.econimpactDescriptor'),
            layers: [
              t('productEcosystem.econimpactLayer1'),
              t('productEcosystem.econimpactLayer2'),
              t('productEcosystem.econimpactLayer3'),
            ],
            comingSoon: true,
          },
        ]}
      />

      <IntelligenceLayerSection
        zIndex={5}
        id="intelligence-layer"
        eyebrow={t('intelligenceLayer.eyebrow')}
        heading={t('intelligenceLayer.heading')}
        steps={[
          { number: '01', title: t('intelligenceLayer.step01Title'), body: t('intelligenceLayer.step01Body') },
          { number: '02', title: t('intelligenceLayer.step02Title'), body: t('intelligenceLayer.step02Body') },
          { number: '03', title: t('intelligenceLayer.step03Title'), body: t('intelligenceLayer.step03Body') },
          { number: '04', title: t('intelligenceLayer.step04Title'), body: t('intelligenceLayer.step04Body') },
          { number: '05', title: t('intelligenceLayer.step05Title'), body: t('intelligenceLayer.step05Body') },
          { number: '06', title: t('intelligenceLayer.step06Title'), body: t('intelligenceLayer.step06Body') },
          { number: '07', title: t('intelligenceLayer.step07Title'), body: t('intelligenceLayer.step07Body') },
          { number: '08', title: t('intelligenceLayer.step08Title'), body: t('intelligenceLayer.step08Body') },
        ]}
      />

      <WhoWeServeSection
        zIndex={6}
        id="who-we-serve"
        eyebrow={t('sectors.eyebrow')}
        heading={t('sectors.heading')}
        context={t('sectors.context')}
        sectors={[
          t('sectors.item1'), t('sectors.item2'), t('sectors.item3'),
          t('sectors.item4'), t('sectors.item5'), t('sectors.item6'),
          t('sectors.item7'), t('sectors.item8'), t('sectors.item9'),
        ]}
      />

      <WhyOwlSection
        zIndex={7}
        id="why-owl"
        eyebrow={t('whyOwl.eyebrow')}
        heading={t('whyOwl.heading')}
        intro={t('whyOwl.intro')}
        differentiators={[
          { title: t('whyOwl.diff1Title'), body: t('whyOwl.diff1Body') },
          { title: t('whyOwl.diff2Title'), body: t('whyOwl.diff2Body') },
          { title: t('whyOwl.diff3Title'), body: t('whyOwl.diff3Body') },
        ]}
      />

      <FoundersSection
        zIndex={8}
        id="founders"
        eyebrow={t('founders.eyebrow')}
        heading={t('founders.heading')}
        founders={[
          {
            quote: t('founders.beyza.quote'),
            name: t('founders.beyza.name'),
            role: t('founders.beyza.role'),
            credential: t('founders.beyza.credential'),
            photoSrc: '/images/beyzapolat.png',
            photoAlt: t('founders.beyza.name'),
          },
          {
            quote: t('founders.saygin.quote'),
            name: t('founders.saygin.name'),
            role: t('founders.saygin.role'),
            credential: t('founders.saygin.credential'),
            photoSrc: '/images/sayginalkurt.png',
            photoAlt: t('founders.saygin.name'),
          },
        ]}
      />

      <PartnershipsSection
        zIndex={9}
        id="partnerships"
        eyebrow={t('partnerships.eyebrow')}
        heading={t('partnerships.heading')}
        body={t('partnerships.body')}
        ctaLabel={t('partnerships.ctaLabel')}
        ctaHref="/contact"
      />

      <AgentSection
        zIndex={10}
        id="agent"
        eyebrow={t('agent.eyebrow')}
        heading={t('agent.heading')}
        subCopy={t('agent.subCopy')}
        ctaLabel={t('agent.ctaLabel')}
        ctaHref="/agent"
      />

      <ContactDemoSection
        zIndex={11}
        id="contact-demo"
        eyebrow={t('contactDemo.eyebrow')}
        heading={t('contactDemo.heading')}
        body={t('contactDemo.body')}
        cardHeading={t('contactDemo.cardHeading')}
        ctaLabel={t('contactDemo.ctaLabel')}
        ctaHref="/contact"
      />
    </main>
  )
}
