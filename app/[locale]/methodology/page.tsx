'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, ShieldCheck, TrendingUp, Lightbulb, Target, Cpu, LineChart } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'
import { type Locale } from '@/lib/i18n'
import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

export default function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const t = translations[locale as Locale] || translations.en
  const isRtl = locale === 'ar'

  const pillars = [
    {
      icon: Lightbulb,
      title: t.methodology.pillars.strategy.title,
      desc: t.methodology.pillars.strategy.desc,
      color: "blue",
      details: locale === 'ar' ? "تحليل عميق للسوق والمنافسين وسلوك المستهلك قبل البدء في أي تطوير." : "Deep analysis of market, competitors, and consumer behavior before any development starts."
    },
    {
      icon: Target,
      title: t.methodology.pillars.logic.title,
      desc: t.methodology.pillars.logic.desc,
      color: "indigo",
      details: locale === 'ar' ? "تصميم رحلة المستخدم وهيكلية البيانات لضمان أعلى مستويات التحويل الكفاءة." : "User journey and data structure design to ensure maximum conversion efficiency."
    },
    {
      icon: Cpu,
      title: t.methodology.pillars.engineering.title,
      desc: t.methodology.pillars.engineering.desc,
      color: "emerald",
      details: locale === 'ar' ? "بناء أنظمة برمجية متينة، سريعة، وآمنة باستخدام أحدث المعايير العالمية." : "Building robust, fast, and secure software systems using the latest global standards."
    },
    {
      icon: LineChart,
      title: t.methodology.pillars.scaling.title,
      desc: t.methodology.pillars.scaling.desc,
      color: "orange",
      details: locale === 'ar' ? "المتابعة المستمرة وتحليل البيانات لتطوير النظام وضمان الريادة الدائمة." : "Continuous monitoring and data analysis to evolve the system and ensure lasting leadership."
    }
  ]

  return (
    <div className="pt-20 pb-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[50vw] h-full bg-slate-50 dark:bg-slate-900 opacity-50 clip-path-slant" />
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-orange-400/10 dark:bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold mb-8 border border-blue-100 dark:border-blue-800"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.common.learnMore}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight"
          >
            {t.methodology.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
             {t.methodology.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Main Pillars */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-slate-50 dark:bg-slate-900/50 p-10 sm:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-slate-100 dark:border-slate-700`}>
                  <pillar.icon className="w-8 h-8 text-blue-600" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                  {pillar.title}
                </h2>

                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 font-medium leading-relaxed">
                  {pillar.desc}
                </p>

                <div className="p-6 bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-widest">{locale === 'ar' ? 'التطبيق العملي' : 'Practical Application'}</p>
                  <p className="text-slate-500 dark:text-slate-500 italic">
                    {pillar.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-32">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Zap className="w-16 h-16 text-blue-600/20 absolute -top-12 -left-8 -rotate-12" />
              <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white italic leading-tight">
                {locale === 'ar' 
                  ? "\"نحن لا نصمم مواقع جميلة فحسب، بل نصمم أصولاً تجارية تقضي على عوائق نموك.\""
                  : "\"We don't just build websites. We engineer assets that remove the friction between where you are and where you deserve to be.\""}
              </p>
            </motion.div>
         </div>
      </section>

      {/* CTA */}
      <section className="px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight relative z-10">
            {t.cta.readyToStart}
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <Link href={`/${locale}/contact`}>
              <button className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-xl shadow-blue-600/20">
                {t.common.getStarted}
              </button>
            </Link>
            <Link href={`/${locale}/portfolio`}>
              <button className="h-16 px-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg transition-all border border-white/10 backdrop-blur-md">
                {t.hero.secondaryCta}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
