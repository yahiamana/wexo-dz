'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { type Locale, getLocalizedField } from '@/lib/i18n'
import RequestForm from './RequestForm'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
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
  imageUrl: string | null
  // ... other fields if needed
}

interface Project {
  id: string
  slug: string
  titleEn: string
  titleFr: string
  titleAr: string
  descriptionEn: string
  descriptionFr: string
  descriptionAr: string
  imageUrl: string
  category: string
  websiteType?: string | null
  // ...
}

interface WebsiteTypeClientProps {
  locale: Locale
  translations: any
  websiteType: WebsiteType
  relatedProjects: any[] // Using any for simplicity here, ideally strictly typed
}

export default function WebsiteTypeClient({ locale, translations, websiteType, relatedProjects }: WebsiteTypeClientProps) {
  const features = (locale === 'ar' ? websiteType.featuresAr : locale === 'fr' ? websiteType.featuresFr : websiteType.featuresEn) || []
  const title = getLocalizedField(websiteType, 'title', locale)
  const description = getLocalizedField(websiteType, 'desc', locale)

  return (
    <div className="min-h-screen pt-32 pb-16 bg-white dark:bg-slate-950">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link 
          href={`/${locale}/pricing`}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {locale === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          <span className="font-medium">
            {translations.common?.back || (locale === 'fr' ? 'Retour' : locale === 'ar' ? 'عودة' : 'Back')}
          </span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Details & Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Preview Image */}
                {websiteType.imageUrl && (
                   <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800">
                      <div className="relative aspect-video w-full">
                        <Image 
                          src={websiteType.imageUrl} 
                          alt={title}
                          fill
                          className="object-cover"
                        />
                      </div>
                   </div>
                )}

                {/* Features */}
                <div className="mb-12">
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {locale === 'ar' ? 'المميزات' : locale === 'fr' ? 'Fonctionnalités incluses' : 'What\'s Included'}
                   </h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-1 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                             <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Form Section */}
                <div id="request-form">
                   <RequestForm locale={locale} translations={translations} websiteType={title} />
                </div>
              </motion.div>
            </div>

            {/* Right Column: Related Work (or sticky sidebar concept) */}
            <div className="lg:pl-10">
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="sticky top-32"
               >
                 <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {locale === 'ar' ? 'أعمالنا المشابهة' : locale === 'fr' ? 'Exemples de réalisations' : 'Real Examples'}
                    </h2>
                    <Link href={`/${locale}/portfolio`} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      {translations.common?.viewAll || (locale === 'fr' ? 'Voir tout' : locale === 'ar' ? 'عرض الكل' : 'View All')}
                    </Link>
                 </div>

                 {relatedProjects.length > 0 ? (
                    <div className="space-y-6">
                      {relatedProjects.map((project, idx) => (
                        <Card key={project.id} className="group overflow-hidden border-0 shadow-lg" hover>
                           <div className="relative aspect-video w-full overflow-hidden">
                              <Image 
                                src={project.imageUrl}
                                alt={getLocalizedField(project, 'title', locale)}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                 <Link href={`/${locale}/portfolio/${project.slug}`}>
                                   <Button size="sm" variant="secondary" className="gap-2 bg-white text-gray-900 hover:bg-gray-100">
                                      {translations.portfolio?.viewProject || 'View Project'}
                                      <ArrowRight className="w-4 h-4" />
                                   </Button>
                                 </Link>
                              </div>
                           </div>
                           <div className="p-5">
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                {getLocalizedField(project, 'title', locale)}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {(project.technologies || []).slice(0, 3).map((tech: string, i: number) => (
                                  <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5">{tech}</Badge>
                                ))}
                              </div>
                           </div>
                        </Card>
                      ))}
                    </div>
                 ) : (
                    <div className="p-8 text-center bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
                       <p className="text-gray-500 dark:text-gray-400">
                         {locale === 'ar' ? 'لا توجد مشاريع مشابهة حالياً لعرضها.' : locale === 'fr' ? 'Aucun projet similaire à afficher pour le moment.' : 'No similar projects to display at the moment.'}
                       </p>
                    </div>
                 )}
               </motion.div>
            </div>
        </div>
      </div>
    </div>
  )
}
