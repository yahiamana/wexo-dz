'use client'

import { motion } from 'framer-motion'
import { Target, X, ShieldCheck, ArrowRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface FilterSectionProps {
  locale: Locale
  translations: {
    filter: {
      badge: string
      title: string
      subtitle: string
      forWho: {
        title: string
        item1: string
        item2: string
        item3: string
      }
      notForWho: {
        title: string
        item1: string
        item2: string
        item3: string
      }
    }
  }
}

export default function FilterSection({ locale, translations }: FilterSectionProps) {
  const t = translations.filter

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-950 transition-colors duration-500 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase leading-[0.95]"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Alignment Synchronization (Positive) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 lg:p-14 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-[60px] font-black text-slate-100 dark:text-slate-800/10">
              <Target size={60} strokeWidth={1} />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-4 uppercase tracking-tight">
              <div className="w-1.5 h-6 bg-blue-600 dark:bg-blue-400 rounded-full" />
              {t.forWho.title}
            </h3>
            
            <ul className="space-y-8">
              {[t.forWho.item1, t.forWho.item2, t.forWho.item3].map((item, i) => (
                <li key={i} className="flex gap-5 group/item">
                  <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-bold text-lg">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Conflict Calibration (Negative) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 lg:p-14 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-[60px] font-black text-slate-100 dark:text-slate-800/10">
              <X size={60} strokeWidth={1} />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-4 uppercase tracking-tight">
              <div className="w-1.5 h-6 bg-slate-300 dark:bg-slate-700 rounded-full" />
              {t.notForWho.title}
            </h3>
            
            <ul className="space-y-8">
              {[t.notForWho.item1, t.notForWho.item2, t.notForWho.item3].map((item, i) => (
                <li key={i} className="flex gap-5 group/item opacity-60 hover:opacity-100 transition-opacity">
                  <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <X className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
