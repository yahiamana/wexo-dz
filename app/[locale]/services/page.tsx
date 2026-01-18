import { type Locale } from '@/lib/i18n'
import ServicesClient from './ServicesClient'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  
  return <ServicesClient locale={locale as Locale} translations={t} />
}
