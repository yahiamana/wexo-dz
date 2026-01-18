'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import { type Locale } from '@/lib/i18n'

interface HeroSectionProps {
  locale: Locale
  translations: {
    hero: {
      title: string
      mainTitleStart: string
      mainTitleHighlight: string
      mainTitleEnd: string
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Abstract Background Shapes - Optimized */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[50vw] h-full bg-slate-50 dark:bg-slate-900 opacity-50 clip-path-slant" />
         <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-2xl" />
         <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-gradient-to-tr from-orange-400/10 to-pink-400/10 dark:from-orange-500/5 dark:to-pink-500/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 sm:pt-40 pb-12 sm:pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-sm font-semibold mb-6 sm:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>{translations.hero.availableBadge}</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 sm:mb-8">
                {translations.hero.mainTitleStart} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{translations.hero.mainTitleHighlight}</span>
                <br/> {translations.hero.mainTitleEnd}
              </h1>
              
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8 sm:mb-10">
                {translations.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300">
                    {translations.hero.cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`/${locale}/portfolio`} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600">
                    {translations.hero.secondaryCta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Right Visual (Abstract Composition) */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none px-4 sm:px-0">
            <div
              className="relative aspect-square opacity-100"
            >
              {/* Main Image Container with Creative Mask */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 rounded-[2rem] shadow-2xl dark:shadow-slate-900/50 overflow-hidden border border-white/50 dark:border-slate-700/50 rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
                 {/* Placeholder for abstract UI representation */}
                 <div className="absolute top-10 left-10 right-10 bottom-0 bg-white dark:bg-slate-950 shadow-lg rounded-t-xl border border-slate-100 dark:border-slate-800 p-6">
                    <div className="flex gap-2 mb-4">
                       <div className="w-3 h-3 rounded-full bg-red-400" />
                       <div className="w-3 h-3 rounded-full bg-yellow-400" />
                       <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="space-y-4">
                        <div className="h-32 bg-slate-50 dark:bg-slate-900 rounded-lg w-full" />
                        <div className="grid grid-cols-2 gap-4">
                           <div className="h-20 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg w-full" />
                           <div className="h-20 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg w-full" />
                        </div>
                    </div>
                 </div>
              </div>
              
              {/* Floating Elements */}
              <div
                className="absolute -top-6 right-0 sm:-top-10 sm:-right-4 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl dark:shadow-black/50 border border-transparent dark:border-slate-800 flex items-center gap-3 z-20 scale-90 sm:scale-100 origin-top-right"
              >
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                     <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{translations.hero.resultsLabel}</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">+145%</div>
                  </div>
              </div>

              <div
                className="absolute -bottom-4 left-0 sm:-bottom-8 sm:-left-4 bg-gray-900 dark:bg-slate-800 text-white p-3 sm:p-4 rounded-2xl shadow-xl z-20 max-w-[180px] sm:max-w-[200px] scale-90 sm:scale-100 origin-bottom-left"
              >
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs font-medium text-gray-300">{translations.hero.liveStatusLabel}</span>
                 </div>
                 <div className="text-sm font-medium">"{translations.hero.topNotchWork}"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
