'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Sparkles } from 'lucide-react'
import Card from '@/components/ui/Card'
import { type Locale, getLocalizedField } from '@/lib/i18n'

interface Testimonial {
  id: string
  clientName: string
  profession: string
  feedbackEn: string
  feedbackFr: string
  feedbackAr: string
  rating: number
  avatarUrl?: string | null
}

interface TestimonialsClientProps {
  locale: Locale
  translations: {
    testimonials: {
      title: string
      subtitle: string
    }
  }
  testimonials: Testimonial[]
}

export default function TestimonialsClient({ locale, translations: t, testimonials }: TestimonialsClientProps) {
  return (
    <div className="pt-20">
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
              <span>{locale === 'ar' ? 'آراء العملاء' : locale === 'fr' ? 'Témoignages' : 'Testimonials'}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              {t.testimonials.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Grid */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card glass className="h-full flex flex-col">
                  <Quote className="w-10 h-10 text-blue-500/30 dark:text-blue-400/20 mb-4" />
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1 mb-6">
                    "{getLocalizedField(testimonial, 'feedback', locale)}"
                  </p>
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.clientName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.clientName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.profession}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
