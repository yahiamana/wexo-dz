'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, Waypoints } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { type Locale } from '@/lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'
import Button from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

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
    methodology: {
      title: string
    }
  }
}

export default function Navbar({ locale, translations }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { href: `/${locale}/methodology`, label: translations.methodology.title },
    { href: `/${locale}/portfolio`, label: translations.nav.portfolio },
    { href: `/${locale}/services`, label: translations.nav.services },
    { href: `/${locale}/pricing`, label: translations.nav.pricing },
    { href: `/${locale}/testimonials`, label: translations.nav.testimonials },
  ]

  const isActive = (path: string) => pathname === path
  
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
      isScrolled 
        ? "h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200/40 dark:border-slate-800/40 shadow-sm" 
        : "h-24 bg-transparent"
    )}>
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Elite Brand Anchor v4 */}
        <Link href={`/${locale}`} className="flex items-center gap-4 group">
          <div className="w-11 h-11 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900 font-black text-2xl transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 group-hover:scale-105 shadow-xl shadow-slate-900/5">
            W
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
              WEXO
            </span>
            <span className="text-[9px] font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase leading-none mt-1.5 opacity-80">
              Infrastructure
            </span>
          </div>
        </Link>
        
        {/* Tactical Desktop Stream */}
        <div className="hidden lg:flex items-center bg-slate-100/30 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl p-1 gap-1 border border-slate-200/20 dark:border-slate-800/20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2.5 text-[10px] font-black tracking-wider uppercase rounded-xl transition-all duration-500 relative group",
                isActive(link.href)
                  ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-950 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {link.label}
              {!isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-500" />
              )}
            </Link>
          ))}
        </div>
        
        {/* Intelligence Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 border-r border-slate-200/50 dark:border-slate-800/50 pr-4 mr-1">
             <ThemeToggle />
             <LanguageSwitcher currentLocale={locale} />
          </div>
          
          <Link href={`/${locale}/contact`} className="hidden md:block">
            <Button size="md" className="min-h-[2.75rem] px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black tracking-wider uppercase rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white border-none transition-all duration-500 active:scale-95 group">
              <span className="whitespace-nowrap">{translations.hero.cta}</span>
              <Waypoints className="w-4 h-4 ml-3 flex-shrink-0 opacity-60 transition-transform group-hover:rotate-180 duration-700" />
            </Button>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-2xl text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900/50 transition-all border border-slate-200/10 active:scale-90"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Strategy Terminal v4 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden absolute top-0 left-0 right-0 h-screen bg-white dark:bg-slate-950 z-[100] p-6 flex flex-col pt-32"
          >
             <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col gap-4 overflow-y-auto">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-4 px-4">Navigation Index</span>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-6 rounded-3xl text-xl font-black tracking-tight uppercase transition-all",
                      isActive(link.href)
                        ? "bg-blue-600 text-white"
                        : "bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 active:bg-slate-200 dark:active:bg-slate-800"
                    )}
                  >
                    {link.label}
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border",
                      isActive(link.href) ? "border-white/20" : "border-slate-200 dark:border-slate-800"
                    )}>
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-auto space-y-4 pt-10 border-t border-slate-100 dark:border-slate-900">
               <div className="flex items-center justify-between px-6 py-5 bg-slate-50 dark:bg-slate-900 rounded-[2rem]">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Tactical Control</span>
                  <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <LanguageSwitcher currentLocale={locale} />
                  </div>
               </div>
               
               <Link
                  href={`/${locale}/contact`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full h-20 text-[14px] font-black tracking-[0.3em] uppercase rounded-[2rem] bg-blue-600 shadow-2xl shadow-blue-500/20" size="lg">
                    {translations.hero.cta}
                    <Waypoints className="ml-4 w-5 h-5" />
                  </Button>
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
