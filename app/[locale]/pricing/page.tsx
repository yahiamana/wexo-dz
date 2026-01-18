import { type Locale, getLocalizedField } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'
import prisma from '@/lib/db'
import PricingClient from './PricingClient'
import { DEFAULT_WEBSITE_TYPES } from '@/lib/constants'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface PricingPageProps {
  params: Promise<{ locale: string }>
}

async function getWebsiteTypes() {
  try {
    return await prisma.websiteType.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  const websiteTypes = await getWebsiteTypes()
  
  // Default types if none from DB
  const defaultTypes = (DEFAULT_WEBSITE_TYPES as any[]).map(type => ({
     ...type,
     createdAt: new Date(),
     updatedAt: new Date()
  }))
  
  const displayTypes = websiteTypes.length > 0 ? websiteTypes : defaultTypes
  
  return (
    <PricingClient 
      locale={locale as Locale} 
      translations={t} 
      websiteTypes={displayTypes}
    />
  )
}
