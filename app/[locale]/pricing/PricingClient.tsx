'use client'

import { motion } from 'framer-motion'
import { Check, ShieldCheck, ArrowRight, Activity, Zap, Layers, CircuitBoard } from 'lucide-react'
import Link from 'next/link'
import { type Locale, getLocalizedField } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

interface WebsiteType {
  id: string
  slug: string
  titleEn: string
  titleFr: string
  titleAr: string
  descEn: string
  descFr: string
  descAr: string
  featuresEn: string[]
  featuresFr: string[]
  featuresAr: string[]
  priceUSD: number
  priceEUR: number
  priceDZD: number
  isPopular: boolean
  isCustom?: boolean
}

interface PricingClientProps {
  locale: Locale
  translations: any
  websiteTypes: WebsiteType[]
}

export default function PricingClient({ locale, translations: t, websiteTypes }: PricingClientProps) {
  const displayTypes = websiteTypes.length > 0 ? websiteTypes : [
    {
       id: '1',
       slug: 'one-page',
       titleEn: 'Base Infrastructure',
       titleFr: 'Infrastructure de base',
       titleAr: 'البنية التحتية الأساسية',
       descEn: 'Essential digital anchor for focused operational visibility.',
       descFr: 'Ancre numérique essentielle pour une visibilité opérationnelle ciblée.',
       descAr: 'مرساة رقمية أساسية لرؤية تشغيلية مركزة.',
       featuresEn: ['Surgical Design', 'Mobile Optimization', 'Logic-First SEO', 'SSL Verification'],
       featuresFr: ['Design Chirurgical', 'Optimisation Mobile', 'SEO Logique', 'Vérification SSL'],
       featuresAr: ['تصميم جراحي', 'تحسين الجوال', 'سيو منطقي', 'تحقق SSL'],
       priceUSD: 299,
       priceEUR: 279,
       priceDZD: 45000,
       isPopular: false,
    },
    {
       id: '2',
       slug: 'business',
       titleEn: 'Scale System',
       titleFr: 'Système d\'échelle',
       titleAr: 'نظام التوسع',
       descEn: 'Full-spectrum infrastructure for high-growth commercial entities.',
       descFr: 'Infrastructure à spectre complet pour les entités commerciales à forte croissance.',
       descAr: 'بنية تحتية كاملة الأطياف للكيانات التجارية سريعة النمو.',
       featuresEn: ['Advanced Data Flows', 'Behavioral Tracking', 'Authority Narrative', 'Performance Monitoring'],
       featuresFr: ['Flux de Données Avancés', 'Suivi Comportemental', 'Récit d\'Autorité', 'Surveillance de Performance'],
       featuresAr: ['تدفقات بيانات متقدمة', 'تتبع سلوكي', 'سردية السلطة', 'مراقبة الأداء'],
       priceUSD: 599,
       priceEUR: 549,
       priceDZD: 90000,
       isPopular: true,
    },
    {
       id: '3',
       slug: 'ecommerce',
       titleEn: 'Market Engine',
       titleFr: 'Moteur de marché',
       titleAr: 'محرك السوق',
       descEn: 'High-density transactional architecture for global commerce.',
       descFr: 'Architecture transactionnelle à haute densité pour le commerce mondial.',
       descAr: 'بنية معاملات عالية الكثافة للتجارة العالمية.',
       featuresEn: ['PCI Compliance', 'Inventory Logic', 'Payment Synchronization', 'Order Intelligence'],
       featuresFr: ['Conformité PCI', 'Logique d\'Inventaire', 'Synchronisation des Paiements', 'Intelligence de Commandes'],
       featuresAr: ['توافق PCI', 'منطق المخزون', 'تزامن الدفع', 'ذكاء الطلبات'],
       priceUSD: 1299,
       priceEUR: 1199,
       priceDZD: 200000,
       isPopular: false,
    },
  ]

  const getPrice = (type: WebsiteType) => {
    return formatPrice(type.priceDZD, 'DZD')
  }

  const getFeatures = (type: WebsiteType): string[] => {
    const featureMap: Record<Locale, string[]> = {
      en: type.featuresEn,
      fr: type.featuresFr,
      ar: type.featuresAr,
    }
    return featureMap[locale] || type.featuresEn
  }

  return (
    <div className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      {/* Header: Resource Allocation Hero */}
      <section className="py-24 sm:py-36 relative overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[2px] w-12 bg-blue-600 dark:bg-blue-400" />
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">Resource Allocation Registry</span>
            </div>
            
            <h1 className="text-5xl sm:text-8xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter uppercase leading-[0.85]">
              Capital <br />
              <span className="text-blue-600 dark:text-blue-400">Allocation</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-semibold">
              {t.pricing.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Allocation Tiers: The Architectural Grid */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {displayTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-12 rounded-[40px] border transition-all duration-500 flex flex-col h-full overflow-hidden
                  ${type.isPopular 
                    ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-3xl scale-105 z-10' 
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:border-blue-500/30'}`}
              >
                {type.isPopular && (
                  <div className="absolute top-0 right-0 p-10">
                    <ShieldCheck className="w-10 h-10 text-blue-400 dark:text-blue-600" strokeWidth={1} />
                  </div>
                )}
                
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                     <Activity size={14} className={type.isPopular ? 'text-blue-400' : 'text-blue-600'} />
                     <span className={`text-[11px] font-black uppercase tracking-wider ${type.isPopular ? 'text-blue-400' : 'text-blue-600'}`}>Investment Tier 0{index + 1}</span>
                  </div>
                  <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-none">
                    {getLocalizedField(type, 'title', locale)}
                  </h3>
                  <p className={`text-base font-semibold leading-relaxed ${type.isPopular ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
                    {getLocalizedField(type, 'desc', locale)}
                  </p>
                </div>
                
                <div className="mb-12 pb-12 border-b border-slate-100/10 dark:border-slate-800/10">
                  <span className={`text-[11px] font-black uppercase tracking-wider block mb-3 ${type.isPopular ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>{t.pricing.startingAt}</span>
                  <div className="text-4xl font-black tracking-tighter">
                    {getPrice(type)}
                  </div>
                </div>
                
                <div className="flex-1 mb-12">
                  <p className={`text-[11px] font-black uppercase tracking-wider mb-8 ${type.isPopular ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>{t.pricing.features}</p>
                  <ul className="space-y-5">
                    {getFeatures(type).map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-base font-bold">
                        <Check className={`w-5 h-5 flex-shrink-0 ${type.isPopular ? 'text-blue-400' : 'text-blue-600'}`} strokeWidth={3} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link href={`/${locale}/contact`} className="block mt-auto">
                  <Button 
                    className={`w-full min-h-[5rem] px-6 rounded-2xl font-black uppercase tracking-wider border transition-all text-xs
                      ${type.isPopular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-xl shadow-blue-500/20' 
                        : 'bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900'}`}
                  >
                    <span className="whitespace-nowrap">{t.pricing.cta}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Solutions: The Exception Case */}
      <section className="py-24 sm:py-32 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                 <div className="flex items-center gap-3 mb-6">
                    <div className="h-[2px] w-10 bg-blue-600 dark:bg-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Bespoke Infrastructure</span>
                 </div>
                 <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tighter leading-none">
                    Multi-Phase <br />
                    <span className="text-blue-600">Enterprise</span> <br />
                    Log
                 </h2>
                 <p className="text-xl text-slate-500 dark:text-slate-400 font-semibold leading-relaxed mb-10 max-w-md">
                    {t.pricing.customNote}
                 </p>
                 <Link href={`/${locale}/contact`}>
                   <Button size="lg" className="rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-blue-600 hover:text-white h-16 px-10 transition-all font-black uppercase tracking-widest text-xs border-none">
                     Request Consultation
                   </Button>
                 </Link>
              </motion.div>
              
              <div className="relative group">
                 <div className="aspect-video bg-slate-900 dark:bg-slate-100 rounded-[40px] flex items-center justify-center overflow-hidden border border-slate-800 dark:border-slate-200">
                    <CircuitBoard size={160} className="text-blue-600/20" strokeWidth={0.5} />
                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                    <div className="relative z-10 text-center">
                       <Activity className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white dark:text-slate-900">Custom System Logic</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}
