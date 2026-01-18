import { type Locale } from '@/lib/i18n'
import prisma from '@/lib/db'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import PricingSection from '@/components/home/PricingSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection from '@/components/home/CTASection'
import JsonLd from '@/components/seo/JsonLd'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface HomePageProps {
  params: Promise<{ locale: string }>
}

async function getHomeData() {
  try {
    const [services, websiteTypes, projects, testimonials] = await Promise.all([
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 6,
      }),
      prisma.websiteType.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 3,
      }),
      prisma.portfolioProject.findMany({
        where: { isVisible: true },
        orderBy: { order: 'asc' },
        take: 4,
      }),
      prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
    ])
    
    return { services, websiteTypes, projects, testimonials }
  } catch {
    // Return empty arrays if database not connected
    return { services: [], websiteTypes: [], projects: [], testimonials: [] }
  }
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  
  return {
    title: locale === 'ar' ? 'أفضل وكالة رقمية في الجزائر' : locale === 'fr' ? 'Meilleure Agence Digitale en Algérie' : 'Top Digital Agency in Algeria',
    description: t.hero.subtitle,
    keywords: locale === 'ar' 
      ? ['تصميم مواقع', 'تسويق رقمي', 'وكالة إعلانية', 'تطوير برمجيات', 'الجزائر']
      : locale === 'fr'
      ? ['Création site web Algérie', 'Agence marketing digital', 'SEO Algérie', 'Développement web', 'Branding']
      : ['Web design Algeria', 'Digital marketing agency', 'SEO services', 'Software development', 'Branding agency'],
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  const data = await getHomeData()
  
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WEXO DZ',
    url: 'https://wexo-dz.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wexo-dz.vercel.app/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <JsonLd data={websiteSchema} />
      <HeroSection locale={locale as Locale} translations={t} />
      <ServicesSection 
        locale={locale as Locale} 
        translations={t} 
        services={data.services} 
      />
      <PricingSection 
        locale={locale as Locale} 
        translations={t} 
        websiteTypes={data.websiteTypes} 
      />
      <PortfolioSection 
        locale={locale as Locale} 
        translations={t} 
        projects={data.projects} 
      />
      <TestimonialsSection 
        locale={locale as Locale} 
        translations={t} 
        testimonials={data.testimonials} 
      />
      <CTASection locale={locale as Locale} translations={t} />
    </>
  )
}
