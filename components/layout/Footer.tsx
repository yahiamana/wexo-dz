import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
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
    methodology: {
      title: string
    }
  }
}

export default function Footer({ locale, translations }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { href: `/${locale}/methodology`, label: translations.methodology.title },
    { href: `/${locale}/portfolio`, label: translations.nav.portfolio },
    { href: `/${locale}/services`, label: translations.nav.services },
    { href: `/${locale}/pricing`, label: translations.nav.pricing },
    { href: `/${locale}/testimonials`, label: translations.nav.testimonials },
    { href: `/${locale}/contact`, label: translations.nav.contact },
  ]
  
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 relative overflow-hidden border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Brand Identity Hub */}
          <div className="lg:col-span-5">
            <Link href={`/${locale}`} className="flex items-center gap-4 mb-8 group">
              <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-black text-2xl transition-transform duration-500 group-hover:rotate-12">
                W
              </div>
              <div className="flex flex-col -gap-1">
                <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                  WEXO
                </span>
                <span className="text-[11px] font-thin tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase leading-none mt-1">
                  Infrastructure
                </span>
              </div>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-sm text-lg font-medium">
              {translations.footer.description}
            </p>
            <div className="flex items-center gap-6">
               <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700">Established 2024</span>
            </div>
          </div>
          
          {/* Strategic Roadmap (Links) */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] mb-10 text-slate-400 dark:text-slate-600 underline underline-offset-8 decoration-slate-200 dark:decoration-slate-800">{translations.footer.quickLinks}</h3>
            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-black uppercase tracking-widest transition-all flex items-center gap-3 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Operational Intelligence (Contact) */}
          <div className="lg:col-span-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] mb-10 text-slate-400 dark:text-slate-600 underline underline-offset-8 decoration-slate-200 dark:decoration-slate-800">{translations.footer.contact}</h3>
            <ul className="space-y-8">
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Mail className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-1">{translations.footer.email}</span>
                  <span className="text-slate-900 dark:text-white font-bold tracking-tight">communications@wexodz.com</span>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                 <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Phone className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-1">{translations.footer.phone}</span>
                  <span className="text-slate-900 dark:text-white font-bold tracking-tight">+213 561 020 056</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Verification Bar */}
        <div className="mt-24 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
            © {currentYear} WEXO DZ. {translations.footer.rights}
          </p>
          <div className="flex gap-8">
            <Link href={`/${locale}/privacy`} className="text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">{translations.footer.privacyPolicy}</Link>
            <Link href={`/${locale}/terms`} className="text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">{translations.footer.termsOfService}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
