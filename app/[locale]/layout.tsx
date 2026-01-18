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
  
  const baseUrl = 'https://wexo-dz.vercel.app'
  const currentUrl = `${baseUrl}/${locale}`

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `WEXO DZ | ${t.hero.title}`,
      template: '%s | WEXO DZ'
    },
    description: t.hero.subtitle,
    applicationName: 'WEXO DZ',
    authors: [{ name: 'WEXO DZ Team' }],
    generator: 'Next.js',
    keywords: [
      'Web Agency Algeria', 'Agence Web Algérie', 'مكالة ويب الجزائر',
      'Website Creation', 'Création Site Web', 'تصميم مواقع', 
      'Digital Marketing Algeria', 'SEO Algeria', 'Branding Agency'
    ],
    referrer: 'origin-when-cross-origin',
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'fr': `${baseUrl}/fr`,
        'ar': `${baseUrl}/ar`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: `WEXO DZ | ${t.hero.title}`,
      description: t.hero.subtitle,
      url: currentUrl,
      siteName: 'WEXO DZ',
      images: [
        {
          url: '/og-image.jpg', // Ensure this image exists in public folder
          width: 1200,
          height: 630,
          alt: 'WEXO DZ - Premium Digital Agency',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'WEXO DZ',
      description: t.hero.subtitle,
      images: ['/og-image.jpg'], // Reuse same image or explicit twitter image
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
    verification: {
      google: 'verification_token_placeholder', // User to provide
    },
  }
}

import JsonLd from '@/components/seo/JsonLd'

// ... existing imports

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }
  
  const t = translations[locale as Locale] || translations.en
  const dir = getDirection(locale as Locale)

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WEXO DZ',
    url: 'https://wexo-dz.vercel.app',
    logo: 'https://wexo-dz.vercel.app/logo.png', // Ensure this exists
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+213-YOUR-PHONE', // Update with real phone
      contactType: 'customer service',
      areaServed: ['DZ', 'FR', 'GB'],
      availableLanguage: ['Arabic', 'French', 'English']
    },
    sameAs: [
      'https://facebook.com/wexodz',
      'https://instagram.com/wexodz',
      'https://linkedin.com/company/wexodz'
    ]
  }
  
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <JsonLd data={organizationSchema} />
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
