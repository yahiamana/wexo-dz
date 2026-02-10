'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ShieldCheck, ArrowRight, Activity } from 'lucide-react'
import Button from '@/components/ui/Button'
import { type Locale, getLocalizedField } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'

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

interface PricingSectionProps {
  locale: Locale
  translations: {
    pricing: {
      title: string
      subtitle: string
      startingAt: string
      popular: string
      features: string
      cta: string
    }
  }
  websiteTypes: WebsiteType[]
}

export default function PricingSection({ locale, translations, websiteTypes }: PricingSectionProps) {
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
      featuresEn: ['Surgical Design', 'Mobile Optimization', 'Logic-First SEO'],
      featuresFr: ['Design Chirurgical', 'Optimisation Mobile', 'SEO Logique'],
      featuresAr: ['تصميم جراحي', 'تحسين الجوال', 'سيو منطقي'],
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
      featuresEn: ['Advanced Data Flows', 'Behavioral Tracking', 'Authority Narrative'],
      featuresFr: ['Flux de Données Avancés', 'Suivi Comportemental', 'Récit d\'Autorité'],
      featuresAr: ['تدفقات بيانات متقدمة', 'تتبع سلوكي', 'سردية السلطة'],
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
      featuresEn: ['PCI Compliance', 'Inventory Logic', 'Payment Synchronization'],
      featuresFr: ['Conformité PCI', 'Logique d\'Inventaire', 'Synchronisation des Paiements'],
      featuresAr: ['توافق PCI', 'منطق المخزون', 'تزامن الدفع'],
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
    <section className="py-24 sm:py-32 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 gap-10 border-b border-slate-100 dark:border-slate-800 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-10 bg-blue-600 dark:bg-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">Resource Allocation</span>
            </div>
            <h2 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 uppercase leading-[0.9]">
              Capital <span className="text-blue-600 dark:text-blue-400">Allocation</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-semibold max-w-2xl">
              Investment tiers designed for specific operational stages. No generic packages—only synchronized growth infrastructure.
            </p>
          </motion.div>

          <Link href={`/${locale}/pricing`}>
            <Button variant="ghost" className="p-0 text-[13px] font-black uppercase tracking-widest hover:bg-transparent group transition-all">
              <span>View Full Breakdown</span>
              <div className="ml-4 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-10 rounded-3xl border transition-all duration-500 flex flex-col h-full overflow-hidden
                ${type.isPopular 
                  ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-2xl scale-105 z-10' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:border-blue-500/30'}`}
            >
              {type.isPopular && (
                <div className="absolute top-0 right-0 p-8">
                  <ShieldCheck className="w-8 h-8 text-blue-400 dark:text-blue-600" strokeWidth={1.5} />
                </div>
              )}
              
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                   <Activity size={12} className={type.isPopular ? 'text-blue-400' : 'text-blue-600'} />
                   <span className={`text-[10px] font-black uppercase tracking-widest ${type.isPopular ? 'text-blue-400' : 'text-blue-600'}`}>System Tier 0{index + 1}</span>
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter leading-none">
                  {getLocalizedField(type, 'title', locale)}
                </h3>
                <p className={`text-sm font-semibold leading-relaxed ${type.isPopular ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
                  {getLocalizedField(type, 'desc', locale)}
                </p>
              </div>
              
              <div className="mb-10 pb-10 border-b border-slate-100/10 dark:border-slate-800/10">
                <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${type.isPopular ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>Starting Allocation</span>
                <div className="text-4xl font-black tracking-tighter">
                  {getPrice(type)}
                </div>
              </div>
              
              <div className="flex-1 mb-10">
                <p className={`text-[10px] font-black uppercase tracking-widest mb-6 ${type.isPopular ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>Technical Specifications</p>
                <ul className="space-y-4">
                  {getFeatures(type).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold">
                      <Check className={`w-4 h-4 flex-shrink-0 ${type.isPopular ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link href={`/${locale}/pricing/${type.slug}`} className="block mt-auto">
                <Button 
                  className={`w-full py-6 px-4 rounded-xl font-black uppercase tracking-wider border transition-all text-[12px]
                    ${type.isPopular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-transparent' 
                      : 'bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900'}`}
                >
                    <span className="whitespace-nowrap">{translations.pricing.cta}</span>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
