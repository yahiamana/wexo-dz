import { type Locale } from '@/lib/i18n'
import ContactClient from './ContactClient'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  
  return <ContactClient locale={locale as Locale} translations={t} />
}
