'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Star, ArrowRight, Sparkles } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
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
}

interface PricingClientProps {
  locale: Locale
  translations: {
    pricing: {
      title: string
      subtitle: string
      startingAt: string
      popular: string
      features: string
      cta: string
      customNote: string
    }
    hero: {
      cta: string
    }
  }
  websiteTypes: WebsiteType[]
}

export default function PricingClient({ locale, translations: t, websiteTypes }: PricingClientProps) {
  const getFeatures = (type: WebsiteType): string[] => {
    const featureMap: Record<Locale, string[]> = {
      en: type.featuresEn,
      fr: type.featuresFr,
      ar: type.featuresAr,
    }
    return featureMap[locale] || type.featuresEn
  }

  const getPrice = (type: WebsiteType) => {
    return formatPrice(type.priceDZD, 'DZD')
  }

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>{locale === 'ar' ? 'الأسعار' : locale === 'fr' ? 'Tarifs' : 'Pricing'}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              {t.pricing.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {type.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="info" className="flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      {t.pricing.popular}
                    </Badge>
                  </div>
                )}
                
                <Link href={`/${locale}/pricing/${type.slug}`} className="block h-full focus:outline-none group">
                <Card 
                  hover 
                  className={`h-full flex flex-col ${type.isPopular ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {getLocalizedField(type, 'title', locale)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {getLocalizedField(type, 'desc', locale)}
                    </p>
                  </div>
                  
                  <div className="mb-8 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl text-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">{t.pricing.startingAt}</span>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {getPrice(type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{t.pricing.features}</p>
                    <ul className="space-y-3">
                      {getFeatures(type).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <div className="w-full">
                      <Button 
                        variant={type.isPopular ? 'primary' : 'outline'} 
                        className="w-full gap-2 group-hover:bg-blue-600 group-hover:text-white transition-colors pointer-events-none"
                        as="span"
                      >
                        {t.pricing.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Custom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t.pricing.customNote}</p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="gap-2">
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ or Additional Info could go here */}
    </div>
  )
}
