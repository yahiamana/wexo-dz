import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface FooterProps {
  locale: Locale
  translations: {
    nav: {
      home: string
      services: string
      pricing: string
      portfolio: string
      testimonials: string
      contact: string
    }
    footer: {
      description: string
      quickLinks: string
      contact: string
      rights: string
      email: string
      phone: string
      location: string
      privacyPolicy: string
      termsOfService: string
    }
  }
}

export default function Footer({ locale, translations }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { href: `/${locale}`, label: translations.nav.home },
    { href: `/${locale}/services`, label: translations.nav.services },
    { href: `/${locale}/pricing`, label: translations.nav.pricing },
    { href: `/${locale}/portfolio`, label: translations.nav.portfolio },
    { href: `/${locale}/testimonials`, label: translations.nav.testimonials },
    { href: `/${locale}/contact`, label: translations.nav.contact },
  ]
  
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 relative overflow-hidden border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Background Elements - Adaptive */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
      <div className="hidden dark:block absolute -top-40 -right-40 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden dark:block absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      {/* Light mode decorative blobs */}
      <div className="dark:hidden absolute -top-40 -right-40 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="dark:hidden absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">WEXO DZ</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-sm">
              {translations.footer.description}
            </p>
            <div className="flex gap-4">
               {/* Social placeholders could go here */}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">{translations.footer.quickLinks}</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
             {/* Additional columns can be added here if needed */}
          </div>
          
          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">{translations.footer.contact}</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-slate-600 dark:text-slate-400 group">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 group-hover:border-blue-500/50 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">{translations.footer.email}</span>
                  <span className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">contact@wexodz.com</span>
                </div>
              </li>
              <li className="flex items-start gap-4 text-slate-600 dark:text-slate-400 group">
                 <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 group-hover:border-blue-500/50 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">{translations.footer.phone}</span>
                  <span className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+213 561020056</span>
                </div>
              </li>
              
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} WEXO DZ. {translations.footer.rights}
          </p>
          
        </div>
      </div>
    </footer>
  )
}
