'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'
import Button from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface NavbarProps {
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
    hero: {
      cta: string
    }
  }
}

export default function Navbar({ locale, translations }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { href: `/${locale}`, label: translations.nav.home },
    { href: `/${locale}/services`, label: translations.nav.services },
    { href: `/${locale}/pricing`, label: translations.nav.pricing },
    { href: `/${locale}/portfolio`, label: translations.nav.portfolio },
    { href: `/${locale}/testimonials`, label: translations.nav.testimonials },
  ]
  
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div 
        className={`pointer-events-auto transition-all duration-300 ${
          isScrolled ? 'w-[90%] max-w-5xl' : 'w-full max-w-7xl'
        }`}
      >
        <div className={`
          flex items-center justify-between px-6 py-3 
          ${isScrolled 
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-2xl rounded-full border border-gray-100 dark:border-slate-800' 
            : 'bg-transparent py-6'} 
          transition-all duration-300
        `}>
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
             <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
               W
             </div>
             <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
               WEXO DZ
             </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-slate-800/50 p-1.5 rounded-full backdrop-blur-md border border-white/50 dark:border-slate-700/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-full transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />
            <Link href={`/${locale}/contact`}>
              <Button size="sm" className="rounded-full px-6 shadow-lg shadow-blue-500/20">{translations.hero.cta}</Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
             <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-full p-1 flex items-center">
                <ThemeToggle />
                <LanguageSwitcher currentLocale={locale} />
             </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
         {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-4 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-800 origin-top animate-in slide-in-from-top-4 fade-in duration-200 pointer-events-auto">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                className="mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full rounded-xl py-4" size="lg">{translations.hero.cta}</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
