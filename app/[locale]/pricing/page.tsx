import { type Locale, getLocalizedField } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'
import prisma from '@/lib/db'
import PricingClient from './PricingClient'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface PricingPageProps {
  params: Promise<{ locale: string }>
}

async function getWebsiteTypes() {
  try {
    return await prisma.websiteType.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  const websiteTypes = await getWebsiteTypes()
  
  // Default types if none from DB
  const defaultTypes = [
    {
      id: '1',
      slug: 'one-page',
      titleEn: 'One Page Website',
      titleFr: 'Site One Page',
      titleAr: 'موقع صفحة واحدة',
      descEn: 'Perfect for personal brands, freelancers, and small businesses that need a simple online presence.',
      descFr: 'Parfait pour les marques personnelles, freelances et petites entreprises ayant besoin d\'une présence en ligne simple.',
      descAr: 'مثالي للعلامات الشخصية والمستقلين والأعمال الصغيرة التي تحتاج وجوداً بسيطاً على الإنترنت.',
      featuresEn: ['Single page design', 'Mobile responsive', 'Contact form', 'SEO optimized', 'Social media links', '1 month support'],
      featuresFr: ['Design page unique', 'Responsive mobile', 'Formulaire de contact', 'Optimisé SEO', 'Liens réseaux sociaux', '1 mois de support'],
      featuresAr: ['تصميم صفحة واحدة', 'متوافق مع الجوال', 'نموذج اتصال', 'محسّن SEO', 'روابط وسائل التواصل', 'شهر دعم'],
      priceUSD: 299,
      priceEUR: 279,
      priceDZD: 45000,
      icon: 'file',
      isPopular: false,
      order: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      slug: 'business',
      titleEn: 'Business Website',
      titleFr: 'Site Entreprise',
      titleAr: 'موقع أعمال',
      descEn: 'Complete solution for growing businesses that need a professional multi-page website.',
      descFr: 'Solution complète pour les entreprises en croissance nécessitant un site professionnel multi-pages.',
      descAr: 'حل متكامل للأعمال النامية التي تحتاج موقعاً احترافياً متعدد الصفحات.',
      featuresEn: ['5-10 pages', 'Mobile responsive', 'Blog section', 'SEO optimized', 'Google Analytics', 'Contact form', '3 months support'],
      featuresFr: ['5-10 pages', 'Responsive mobile', 'Section blog', 'Optimisé SEO', 'Google Analytics', 'Formulaire contact', '3 mois de support'],
      featuresAr: ['5-10 صفحات', 'متوافق مع الجوال', 'قسم مدونة', 'محسّن SEO', 'تحليلات جوجل', 'نموذج اتصال', '3 أشهر دعم'],
      priceUSD: 599,
      priceEUR: 549,
      priceDZD: 90000,
      icon: 'building',
      isPopular: true,
      order: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      slug: 'professional',
      titleEn: 'Doctor / Lawyer Website',
      titleFr: 'Site Médecin / Avocat',
      titleAr: 'موقع طبيب / محامي',
      descEn: 'Specialized websites for professionals like doctors, lawyers, and consultants.',
      descFr: 'Sites spécialisés pour professionnels comme médecins, avocats et consultants.',
      descAr: 'مواقع متخصصة للمهنيين مثل الأطباء والمحامين والاستشاريين.',
      featuresEn: ['Professional design', 'Appointment booking', 'Service pages', 'Testimonials', 'Mobile responsive', 'SEO optimized', '6 months support'],
      featuresFr: ['Design professionnel', 'Réservation rendez-vous', 'Pages services', 'Témoignages', 'Responsive mobile', 'Optimisé SEO', '6 mois de support'],
      featuresAr: ['تصميم احترافي', 'حجز مواعيد', 'صفحات خدمات', 'شهادات العملاء', 'متوافق مع الجوال', 'محسّن SEO', '6 أشهر دعم'],
      priceUSD: 799,
      priceEUR: 749,
      priceDZD: 120000,
      icon: 'briefcase',
      isPopular: false,
      order: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      slug: 'ecommerce',
      titleEn: 'E-commerce Website',
      titleFr: 'Site E-commerce',
      titleAr: 'موقع تجارة إلكترونية',
      descEn: 'Full online store with payment integration and inventory management.',
      descFr: 'Boutique en ligne complète avec paiement intégré et gestion des stocks.',
      descAr: 'متجر إلكتروني كامل مع تكامل الدفع وإدارة المخزون.',
      featuresEn: ['Unlimited products', 'Shopping cart', 'Payment gateway', 'Order management', 'Inventory system', 'Customer accounts', '12 months support'],
      featuresFr: ['Produits illimités', 'Panier d\'achat', 'Passerelle de paiement', 'Gestion commandes', 'Système inventaire', 'Comptes clients', '12 mois de support'],
      featuresAr: ['منتجات غير محدودة', 'سلة تسوق', 'بوابة دفع', 'إدارة الطلبات', 'نظام المخزون', 'حسابات العملاء', '12 شهر دعم'],
      priceUSD: 1299,
      priceEUR: 1199,
      priceDZD: 200000,
      icon: 'shopping-cart',
      isPopular: false,
      order: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  
  const displayTypes = websiteTypes.length > 0 ? websiteTypes : defaultTypes
  
  return (
    <PricingClient 
      locale={locale as Locale} 
      translations={t} 
      websiteTypes={displayTypes}
    />
  )
}
