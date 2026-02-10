'use client'

import { motion } from 'framer-motion'
import { Activity, Box, Fingerprint } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface BusinessRealityProps {
  locale: Locale
  translations: any
}

export default function BusinessReality({ locale, translations }: BusinessRealityProps) {
  const t = translations.businessReality
  const items = [
    { icon: Activity, title: t.item1.title, desc: t.item1.desc },
    { icon: Box, title: t.item2.title, desc: t.item2.desc },
    { icon: Fingerprint, title: t.item3.title, desc: t.item3.desc },
  ]

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Diagnostic Phase</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase leading-[0.95]"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-10 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 group"
            >
              <div className="absolute top-0 right-0 p-6 text-[40px] font-black text-slate-100 dark:text-slate-800 transition-colors group-hover:text-blue-500/10">
                0{index + 1}
              </div>
              <div className="w-14 h-14 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center mb-8 text-white dark:text-slate-900 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-500">
                <item.icon className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-5 uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
