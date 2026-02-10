'use client'

import { motion } from 'framer-motion'
import { Search, CircuitBoard, Code2, Rocket, ArrowRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'
import Link from 'next/link'
import Button from '@/components/ui/Button'

interface MethodologySectionProps {
  locale: Locale
  translations: any
}

export default function MethodologySection({ locale, translations }: MethodologySectionProps) {
  const t = translations.methodology
  const pillars = [
    { icon: Search, title: t.pillars.strategy.title, desc: t.pillars.strategy.desc },
    { icon: CircuitBoard, title: t.pillars.logic.title, desc: t.pillars.logic.desc },
    { icon: Code2, title: t.pillars.engineering.title, desc: t.pillars.engineering.desc },
    { icon: Rocket, title: t.pillars.scaling.title, desc: t.pillars.scaling.desc },
  ]

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/30 overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>{t.title}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.95] uppercase"
            >
              {t.subtitle}
            </motion.h2>

            <div className="space-y-12">
              {pillars.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-8 group"
                >
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-500 shadow-xl">
                    <step.icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-14"
            >
              <Link href={`/${locale}/methodology`}>
                <Button variant="ghost" className="text-blue-600 dark:text-blue-400 p-0 text-[13px] font-black uppercase tracking-widest hover:bg-transparent hover:gap-3 transition-all duration-300">
                  {translations.common?.learnMore || 'See Roadmap'}
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Technical Visual - Blueprint Style */}
          <div className="relative lg:block hidden">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="aspect-[4/5] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden relative shadow-2xl"
            >
               {/* Grid Background */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px]" />
               
               {/* System Data Nodes */}
               <div className="absolute inset-0 p-12 flex flex-col justify-center gap-10">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <div className="h-2 w-32 bg-slate-800 rounded" />
                     </div>
                     <div className="h-16 bg-slate-900/50 border border-slate-800 rounded-xl w-full flex items-center px-6 gap-4">
                        <div className="w-8 h-8 rounded bg-blue-500/20" />
                        <div className="space-y-2 flex-1">
                           <div className="h-1.5 w-1/2 bg-slate-700 rounded" />
                           <div className="h-1.5 w-full bg-slate-800 rounded" />
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-4 translate-x-12">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <div className="h-2 w-40 bg-slate-800 rounded" />
                     </div>
                     <div className="h-16 bg-slate-900/50 border border-slate-800 rounded-xl w-full flex items-center px-6 gap-4">
                        <div className="w-8 h-8 rounded bg-indigo-500/20" />
                        <div className="space-y-2 flex-1">
                           <div className="h-1.5 w-1/2 bg-slate-700 rounded" />
                           <div className="h-1.5 w-full bg-slate-800 rounded" />
                        </div>
                     </div>
                  </div>

                  <div className="h-px bg-slate-800 w-full my-4" />

                  <div className="flex justify-between items-end">
                     <div className="space-y-2">
                        <div className="h-1.5 w-20 bg-slate-800 rounded" />
                        <div className="h-6 w-32 bg-slate-700 rounded" />
                     </div>
                     <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                  </div>
               </div>
            </motion.div>
            
            {/* Logic Decal */}
            <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-2xl shadow-2xl -rotate-2">
               <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2 underline decoration-white/30 underline-offset-4">Logic Flow</div>
               <div className="text-3xl font-black uppercase tracking-tighter">Verified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
