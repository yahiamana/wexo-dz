import { type Locale } from '@/lib/i18n'
import ServicesClient from './ServicesClient'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

import JsonLd from '@/components/seo/JsonLd'

const translations = { en, fr, ar }

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  
  return {
    title: locale === 'ar' ? 'خدماتنا - تطوير ويب وتسويق' : locale === 'fr' ? 'Nos Services - Création Web & Marketing' : 'Our Services - Web Development & Marketing',
    description: locale === 'ar' ? 'اكتشف خدماتنا في تصميم المواقع، التطبيقات، والتسويق الرقمي.' : locale === 'fr' ? 'Découvrez nos services : création de sites web, applications mobiles, et marketing digital.' : 'Explore our premium services: web design, app development, and digital marketing.',
  }
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development',
    provider: {
      '@type': 'Organization',
      name: 'WEXO DZ',
      url: 'https://wexo-dz.vercel.app'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Algeria'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Design'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Optimization'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Branding'
          }
        }
      ]
    }
  }

  return (
    <>
      <JsonLd data={servicesSchema} />
      <ServicesClient locale={locale as Locale} translations={t} />
    </>
  )
}
