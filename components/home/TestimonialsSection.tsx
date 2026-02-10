'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Waypoints, Activity, Fingerprint } from 'lucide-react'
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
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      profession: 'Operations Lead',
      feedbackEn: 'System deployment was surgical. Operational efficiency increased by 200% within the first fiscal quarter.',
      feedbackFr: 'Le déploiement du système a été chirurgical. L\'efficacité opérationnelle a augmenté de 200 % au cours du premier trimestre.',
      feedbackAr: 'كان نشر النظام جراحياً. زادت الكفاءة التشغيلية بنسبة 200٪ خلال الربع المالي الأول.',
      rating: 5,
      avatarUrl: null,
    },
    {
      id: ' Ahmed Mohamed',
      clientName: 'Ahmed Mohamed',
      profession: 'Infrastructure Architect',
      feedbackEn: 'High-authority technical logic. The resulting infrastructure perfectly mirrors our strategic expansion goals.',
      feedbackFr: 'Logique technique de haute autorité. L\'infrastructure résultante reflète parfaitement nos objectifs d\'expansion stratégique.',
      feedbackAr: 'منطق تقني عالي السلطة. تعكس البنية التحتية الناتجة تماماً أهداف التوسع الاستراتيجي لدينا.',
      rating: 5,
      avatarUrl: null,
    },
    {
      id: '3',
      clientName: 'Marie Dupont',
      profession: 'Fintech Director',
      feedbackEn: 'The scalability of the transaction engine is unparalleled. A cornerstone of our digital market dominance.',
      feedbackFr: 'La scalabilité du moteur de transaction est inégalée. Un pilier de notre dominance sur le marché numérique.',
      feedbackAr: 'قابلية توسع محرك المعاملات لا مثيل لها. حجر الزاوية في هيمنتنا على السوق الرقمية.',
      rating: 5,
      avatarUrl: null,
    },
  ]
  
  return (
    <section className="py-24 sm:py-36 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden transition-colors duration-500">
      {/* Structural Registry Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 lg:mb-28 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-12 bg-blue-600 dark:bg-blue-400" />
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Verified Feedback Hub</span>
          </div>
          
          <h2 className="text-5xl sm:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.85] mb-8">
            Strategic <br />
            <span className="text-blue-600">Proof</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-2xl">
            {translations.testimonials.subtitle}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-full bg-white dark:bg-slate-950 rounded-[2.5rem] p-10 border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/20 dark:shadow-black/20 flex flex-col">
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-blue-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Verification 0{index + 1}</span>
                   </div>
                   <Fingerprint size={24} strokeWidth={1} className="text-slate-200 dark:text-slate-800" />
                </div>

                <div className="flex-grow mb-10">
                  <p className="text-slate-900 dark:text-white text-lg font-bold leading-relaxed tracking-tight italic">
                    "{getLocalizedField(testimonial, 'feedback', locale)}"
                  </p>
                </div>
                
                <div className="flex items-center gap-5 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="w-14 h-14 bg-slate-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-slate-900 font-black text-xl shadow-2xl">
                    {testimonial.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-2">{testimonial.clientName}</div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest">{testimonial.profession}</div>
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
