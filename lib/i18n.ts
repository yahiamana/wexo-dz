export type Locale = 'en' | 'fr' | 'ar'

export const locales: Locale[] = ['en', 'fr', 'ar']
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية'
}

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  ar: '🇸🇦'
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ar'
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr'
}

export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale
  
  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';')
    return code.split('-')[0].toLowerCase()
  })
  
  for (const lang of languages) {
    if (lang === 'ar') return 'ar'
    if (lang === 'fr') return 'fr'
    if (lang === 'en') return 'en'
  }
  
  return defaultLocale
}

export function getLocalizedField(
  item: any,
  fieldBase: string,
  locale: Locale
): string {
  const capitalizedLocale = locale.charAt(0).toUpperCase() + locale.slice(1)
  const fieldName = `${fieldBase}${capitalizedLocale}`
  const fallbackField = `${fieldBase}En`
  return (item[fieldName] as string) || (item[fallbackField] as string) || ''
}
