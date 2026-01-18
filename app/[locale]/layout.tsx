import type { Metadata } from 'next'
import '../globals.css'
import { notFound } from 'next/navigation'
import { type Locale, locales, getDirection } from '@/lib/i18n'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

// Import translations
import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  
  return {
    title: {
      default: 'WEXO DZ - ' + t.hero.title,
      template: '%s | WEXO DZ'
    },
    description: t.hero.subtitle,
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }
  
  const t = translations[locale as Locale] || translations.en
  const dir = getDirection(locale as Locale)
  
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <ThemeProvider>
          <Navbar locale={locale as Locale} translations={t} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale as Locale} translations={t} />
        </ThemeProvider>
      </body>
    </html>
  )
}
