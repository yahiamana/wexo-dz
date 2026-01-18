'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Star } from 'lucide-react'
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
  // Default pricing if none from DB
  const displayTypes = websiteTypes.length > 0 ? websiteTypes : [
    {
      id: '1',
      slug: 'one-page',
      titleEn: 'One Page Website',
      titleFr: 'Site One Page',
      titleAr: 'موقع صفحة واحدة',
      descEn: 'Perfect for personal brands and small businesses',
      descFr: 'Parfait pour les marques personnelles et petites entreprises',
      descAr: 'مثالي للعلامات الشخصية والأعمال الصغيرة',
      featuresEn: ['Single page design', 'Mobile responsive', 'Contact form', 'SEO optimized'],
      featuresFr: ['Design page unique', 'Responsive mobile', 'Formulaire de contact', 'Optimisé SEO'],
      featuresAr: ['تصميم صفحة واحدة', 'متوافق مع الجوال', 'نموذج اتصال', 'محسّن لمحركات البحث'],
      priceUSD: 299,
      priceEUR: 279,
      priceDZD: 45000,
      isPopular: false,
    },
    {
      id: '2',
      slug: 'business',
      titleEn: 'Business Website',
      titleFr: 'Site Entreprise',
      titleAr: 'موقع أعمال',
      descEn: 'Complete solution for growing businesses',
      descFr: 'Solution complète pour les entreprises en croissance',
      descAr: 'حل متكامل للأعمال النامية',
      featuresEn: ['5-10 pages', 'Mobile responsive', 'Blog section', 'SEO optimized', 'Analytics'],
      featuresFr: ['5-10 pages', 'Responsive mobile', 'Section blog', 'Optimisé SEO', 'Analytics'],
      featuresAr: ['5-10 صفحات', 'متوافق مع الجوال', 'قسم مدونة', 'محسّن SEO', 'تحليلات'],
      priceUSD: 599,
      priceEUR: 549,
      priceDZD: 90000,
      isPopular: true,
    },
    {
      id: '3',
      slug: 'ecommerce',
      titleEn: 'E-commerce Website',
      titleFr: 'Site E-commerce',
      titleAr: 'موقع تجارة إلكترونية',
      descEn: 'Full online store with payment integration',
      descFr: 'Boutique en ligne complète avec paiement intégré',
      descAr: 'متجر إلكتروني كامل مع تكامل الدفع',
      featuresEn: ['Unlimited products', 'Shopping cart', 'Payment gateway', 'Order management', 'Inventory system'],
      featuresFr: ['Produits illimités', 'Panier', 'Passerelle de paiement', 'Gestion commandes', 'Système inventaire'],
      featuresAr: ['منتجات غير محدودة', 'سلة تسوق', 'بوابة دفع', 'إدارة الطلبات', 'نظام المخزون'],
      priceUSD: 1299,
      priceEUR: 1199,
      priceDZD: 200000,
      isPopular: false,
    },
  ]
  
  const getPrice = (type: WebsiteType) => {
    if (locale === 'ar') return formatPrice(type.priceDZD, 'DZD')
    if (locale === 'fr') return formatPrice(type.priceEUR, 'EUR')
    return formatPrice(type.priceUSD, 'USD')
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
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {translations.pricing.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {translations.pricing.subtitle}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...displayTypes, {
            id: 'custom-project',
            slug: 'custom',
            titleEn: 'Custom Project',
            titleFr: 'Projet Sur Mesure',
            titleAr: 'مشروع مخصص',
            descEn: 'For complex projects with specific requirements',
            descFr: 'Pour les projets complexes avec des besoins spécifiques',
            descAr: 'للمشاريع المعقدة ذات المتطلبات المحددة',
            featuresEn: ['Custom functionality', 'Dedicated team', 'Priority support', 'Scalable architecture'],
            featuresFr: ['Fonctionnalités sur mesure', 'Équipe dédiée', 'Support prioritaire', 'Architecture évolutive'],
            featuresAr: ['وظائف مخصصة', 'فريق مخصص', 'دعم ذو أولوية', 'بنية قابلة للتوسع'],
            priceUSD: 0,
            priceEUR: 0,
            priceDZD: 0,
            isPopular: false,
            isCustom: true
          }].map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {type.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="info" className="flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    {translations.pricing.popular}
                  </Badge>
                </div>
              )}
              
              <Card 
                hover 
                className={`h-full flex flex-col ${type.isPopular ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}
              >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {getLocalizedField(type, 'title', locale)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {getLocalizedField(type, 'desc', locale)}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{translations.pricing.startingAt}</span>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      {type.isCustom ? (
                        <span className="text-2xl">
                          {locale === 'ar' ? 'تواصل معنا' : locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                        </span>
                      ) : getPrice(type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{translations.pricing.features}</p>
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
                  <Link href={`/${locale}/contact`} className="block">
                    <Button 
                      variant={type.isPopular ? 'primary' : 'outline'} 
                      className="w-full"
                    >
                      {translations.pricing.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
