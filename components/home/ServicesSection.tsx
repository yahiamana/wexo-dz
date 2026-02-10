'use client'

import { motion } from 'framer-motion'
import { Globe, Zap, Palette, Shield, Smartphone, Search, ArrowRight, Layers } from 'lucide-react'
import Button from '@/components/ui/Button'
import { type Locale, getLocalizedField } from '@/lib/i18n'
import Link from 'next/link'

interface Service {
  id: string
  icon: string
  titleEn: string
  titleFr: string
  titleAr: string
  descEn: string
  descFr: string
  descAr: string
}

interface ServicesSectionProps {
  locale: Locale
  translations: {
    services: {
      title: string
      titleStart: string
      titleHighlight: string
      subtitle: string
    }
    common: {
      viewAll: string
    }
  }
  services: Service[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string, strokeWidth?: number }>> = {
  globe: Globe,
  zap: Zap,
  palette: Palette,
  shield: Shield,
  smartphone: Smartphone,
  search: Search,
}

export default function ServicesSection({ locale, translations, services }: ServicesSectionProps) {
  const displayServices = services.length > 0 ? services : [
    {
      id: '1',
      icon: 'globe',
      titleEn: 'Infrastructure Architecture',
      titleFr: 'Architecture d\'infrastructure',
      titleAr: 'هندسة البنية التحتية',
      descEn: 'We build high-availability technical foundations that eliminate operational volatility.',
      descFr: 'Nous construisons des bases techniques à haute disponibilité qui éliminent la volatilité opérationnelle.',
      descAr: 'نحن نبني قواعد تقنية عالية التوفر تقضي على التقلبات التشغيلية.',
    },
    {
      id: '2',
      icon: 'zap',
      titleEn: 'Performance Engineering',
      titleFr: 'Ingénierie de Performance',
      titleAr: 'هندسة الأداء',
      descEn: 'Low-latency systems optimized for high-density market transactions.',
      descFr: 'Systèmes à faible latence optimisés pour les transactions de marché à haute densité.',
      descAr: 'أنظمة ذات زمن وصول منخفض مُحسّنة لمعاملات السوق عالية الكثافة.',
    },
    {
      id: '3',
      icon: 'smartphone',
      titleEn: 'Mobile Systems',
      titleFr: 'Systèmes Mobiles',
      titleAr: 'أنظمة الجوال',
      descEn: 'Critical mobile infrastructure for high-growth digital businesses.',
      descFr: 'Infrastructure mobile critique pour les entreprises numériques à forte croissance.',
      descAr: 'بنية تحتية جوالة بالغة الأهمية للأعمال الرقمية سريعة النمو.',
    },
  ]
  
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-10 bg-blue-600 dark:bg-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Capabilities Log</span>
              </div>
              <h2 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 uppercase leading-[0.9]">
                {translations.services.titleStart} <span className="text-blue-600 dark:text-blue-400">{translations.services.titleHighlight}</span>
              </h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-semibold max-w-2xl">
                {translations.services.subtitle}
              </p>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <Link href={`/${locale}/services`}>
                <Button variant="ghost" className="p-0 text-[13px] font-black uppercase tracking-wider hover:bg-transparent group transition-all">
                  <span>Explore Full Catalog</span>
                  <div className="ml-4 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Button>
               </Link>
            </motion.div>
        </div>
        
        {/* Architectural Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[340px] gap-8">
          {displayServices.slice(0, 5).map((service, index) => {
            const IconComponent = iconMap[service.icon] || Globe
            const colSpan = index === 0 ? 'md:col-span-12 lg:col-span-7' : 
                            index === 1 ? 'md:col-span-6 lg:col-span-5' : 
                            index === 2 ? 'md:col-span-6 lg:col-span-4' :
                            index === 3 ? 'md:col-span-6 lg:col-span-4' :
                            'md:col-span-6 lg:col-span-4'
            
            const isBlue = index === 0
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${colSpan} group relative overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:border-blue-500/30 shadow-sm hover:shadow-2xl`}
              >
                {/* Visual Anchors */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-50/50 dark:from-slate-900/20 to-transparent pointer-events-none" />
                
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-500
                        ${isBlue ? 'bg-blue-600 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 group-hover:bg-blue-600 group-hover:text-white'}`}>
                        <IconComponent className="w-7 h-7" strokeWidth={2.5} />
                      </div>
                      <div className="text-[40px] font-black text-slate-50 dark:text-slate-900 transition-colors group-hover:text-blue-500/10 select-none">
                        0{index + 1}
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black mb-5 tracking-tight uppercase leading-none">
                       {getLocalizedField(service, 'title', locale)}
                    </h3>
                  </div>
                  
                  <div>
                     <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-semibold max-w-md">
                      {getLocalizedField(service, 'desc', locale)}
                    </p>
                    <div className="mt-8 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <span>View Specifications</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
