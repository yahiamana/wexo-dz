'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Terminal } from 'lucide-react'
import Button from '@/components/ui/Button'
import { type Locale } from '@/lib/i18n'

interface HeroSectionProps {
  locale: Locale
  translations: {
    hero: {
      title: string
      subtitle: string
      cta: string
      secondaryCta: string
      availableBadge: string
      resultsLabel: string
      liveStatusLabel: string
      topNotchWork: string
    }
  }
}

export default function HeroSection({ locale, translations }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Structural Grid - High Authority Visual */}
      <div className="absolute inset-x-0 top-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 sm:pt-40 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Content: Narrative Authority */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-wider mb-8 shadow-2xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>{translations.hero.availableBadge}</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-8 uppercase">
                {translations.hero.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12 font-medium">
                {translations.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-lg px-10 py-7 text-[13px] font-black uppercase tracking-wider bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-500 group border-none">
                    {translations.hero.cta}
                    <ArrowRight className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1.5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/portfolio`} className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto rounded-lg px-10 py-7 text-[13px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-none">
                    {translations.hero.secondaryCta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Right Visual: Engineering Terminal */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative aspect-[4/3]"
            >
              {/* Terminal Frame */}
              <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Header */}
                <div className="h-10 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                    <Terminal size={10} />
                    Status: Optimal
                  </div>
                </div>
                
                {/* Dashboard Placeholder Content */}
                <div className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-2 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-6 w-32 bg-slate-300 dark:bg-slate-700 rounded-md" />
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-32 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 space-y-4">
                      <div className="h-1.5 w-12 bg-slate-100 dark:bg-slate-900 rounded" />
                      <div className="h-8 w-full bg-slate-50 dark:bg-slate-900 rounded" />
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900 rounded" />
                    </div>
                    <div className="h-32 rounded-xl bg-blue-600 p-4 relative overflow-hidden flex flex-col justify-between">
                      <div className="h-1.5 w-12 bg-blue-400 rounded" />
                      <div className="text-white font-black text-2xl uppercase tracking-tighter leading-none">
                        Active <br/> Metrics
                      </div>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rotate-45 translate-x-12 -translate-y-12" />
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800" />
                  
                  <div className="flex gap-4">
                    <div className="flex-1 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="flex-1 h-3 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="flex-1 h-3 rounded bg-blue-500/30" />
                  </div>
                </div>
              </div>

              {/* Floating Performance Indicator */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-20"
              >
                <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">{translations.hero.resultsLabel}</div>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">+145%</div>
              </motion.div>

              {/* Operational Status Tag */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-2xl shadow-2xl z-20">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{translations.hero.liveStatusLabel}</span>
                </div>
                <div className="text-sm font-bold">"{translations.hero.topNotchWork}"</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
