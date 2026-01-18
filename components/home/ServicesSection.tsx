'use client'

import { motion } from 'framer-motion'
import { Globe, Zap, Palette, Shield, Smartphone, Search, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { type Locale, getLocalizedField } from '@/lib/i18n'

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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  zap: Zap,
  palette: Palette,
  shield: Shield,
  smartphone: Smartphone,
  search: Search,
}

export default function ServicesSection({ locale, translations, services }: ServicesSectionProps) {
  // Default services if none from DB
  const displayServices = services.length > 0 ? services : [
    {
      id: '1',
      icon: 'globe',
      titleEn: 'Custom Website Design',
      titleFr: 'Design Web Personnalisé',
      titleAr: 'تصميم مواقع مخصص',
      descEn: 'Unique, beautiful websites tailored to your brand and business goals.',
      descFr: 'Des sites web uniques et beaux adaptés à votre marque et vos objectifs.',
      descAr: 'مواقع فريدة وجميلة مصممة خصيصاً لعلامتك التجارية وأهدافك.',
    },
    {
      id: '2',
      icon: 'zap',
      titleEn: 'Fast & Optimized',
      titleFr: 'Rapide & Optimisé',
      titleAr: 'سريع ومحسّن',
      descEn: 'Lightning-fast websites that load quickly and rank higher on search engines.',
      descFr: 'Des sites ultra-rapides qui se chargent vite et se classent mieux sur les moteurs de recherche.',
      descAr: 'مواقع سريعة للغاية تُحمّل بسرعة وتحتل مراتب أعلى في محركات البحث.',
    },
    {
      id: '3',
      icon: 'smartphone',
      titleEn: 'Mobile Responsive',
      titleFr: 'Responsive Mobile',
      titleAr: 'متوافق مع الجوال',
      descEn: 'Perfect experience on all devices - phones, tablets, and desktops.',
      descFr: 'Une expérience parfaite sur tous les appareils - téléphones, tablettes et ordinateurs.',
      descAr: 'تجربة مثالية على جميع الأجهزة - الهواتف والأجهزة اللوحية والحواسيب.',
    },
  ]
  
  return (
    <section className="py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-900 bg-noise transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
                {translations.services.titleStart} <span className="text-blue-600 dark:text-blue-500">{translations.services.titleHighlight}</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {translations.services.subtitle}
              </p>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <Button variant="outline" className="rounded-full px-6 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">View All Services</Button>
            </motion.div>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[300px] gap-6">
          {displayServices.slice(0, 5).map((service, index) => {
            const IconComponent = iconMap[service.icon] || Globe
            // Custom sizing for Bento feel
            const colSpan = index === 0 ? 'md:col-span-3 lg:col-span-6' : 
                            index === 1 ? 'md:col-span-3 lg:col-span-6' : 
                            'md:col-span-2 lg:col-span-4'
            
            const isDark = index === 0 || index === 2
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${colSpan} group relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10 
                  ${isDark 
                    ? 'bg-gray-900 dark:bg-slate-800 text-white' 
                    : 'bg-white dark:bg-slate-950 text-gray-900 dark:text-white'} 
                  shadow-2xl shadow-gray-200/50 dark:shadow-black/50 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 border border-gray-100/10 dark:border-slate-800`}
              >
                {isDark && (
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
                )}
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl 
                      ${isDark 
                        ? 'bg-white/10 text-white' 
                        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">
                       {getLocalizedField(service, 'title', locale)}
                    </h3>
                  </div>
                  
                  <div>
                     <p className={`${isDark ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'} leading-relaxed text-lg`}>
                      {getLocalizedField(service, 'desc', locale)}
                    </p>
                    
                    <div className={`mt-6 w-10 h-10 rounded-full flex items-center justify-center border transition-colors 
                      ${isDark 
                        ? 'border-white/20 group-hover:bg-white group-hover:text-gray-900' 
                        : 'border-gray-200 dark:border-slate-700 group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-gray-900'}`}>
                       <ArrowRight className="w-4 h-4" />
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
