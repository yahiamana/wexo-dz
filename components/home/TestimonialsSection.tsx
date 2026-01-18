'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
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

interface TestimonialsSectionProps {
  locale: Locale
  translations: {
    testimonials: {
      title: string
      subtitle: string
      badge: string
    }
  }
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ locale, translations, testimonials }: TestimonialsSectionProps) {
  // Default testimonials if none from DB
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      profession: 'Restaurant Owner',
      feedbackEn: 'Amazing work! They delivered exactly what we needed. Our online orders increased by 200%.',
      feedbackFr: 'Travail incroyable ! Ils ont livré exactement ce dont nous avions besoin. Nos commandes en ligne ont augmenté de 200%.',
      feedbackAr: 'عمل مذهل! لقد قدموا بالضبط ما كنا نحتاجه. زادت طلباتنا عبر الإنترنت بنسبة 200٪.',
      rating: 5,
      avatarUrl: null,
    },
    {
      id: '2',
      clientName: 'Ahmed Mohamed',
      profession: 'Lawyer',
      feedbackEn: 'Very professional team. The website perfectly represents our firm\'s values and expertise.',
      feedbackFr: 'Équipe très professionnelle. Le site représente parfaitement les valeurs et l\'expertise de notre cabinet.',
      feedbackAr: 'فريق محترف جداً. الموقع يمثل قيم وخبرة مكتبنا بشكل مثالي.',
      rating: 5,
      avatarUrl: null,
    },
    {
      id: '3',
      clientName: 'Marie Dupont',
      profession: 'Boutique Owner',
      feedbackEn: 'Our e-commerce site is beautiful and easy to manage. Sales have doubled since launch!',
      feedbackFr: 'Notre site e-commerce est magnifique et facile à gérer. Les ventes ont doublé depuis le lancement !',
      feedbackAr: 'موقع التجارة الإلكترونية الخاص بنا جميل وسهل الإدارة. تضاعفت المبيعات منذ الإطلاق!',
      rating: 5,
      avatarUrl: null,
    },
  ]
  
  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>{translations.testimonials.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {translations.testimonials.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {translations.testimonials.subtitle}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${index === 1 ? 'md:mt-12' : ''}`}
            >
              <div className="relative h-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-700">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-100 dark:text-slate-700 rotate-180" />
                
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-orange-400 fill-orange-400'
                          : 'text-gray-200 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-8 relative z-10">
                  "{getLocalizedField(testimonial, 'feedback', locale)}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-50 dark:border-slate-700">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-blue-600 dark:to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-slate-900/20">
                    {testimonial.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.clientName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{testimonial.profession}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
