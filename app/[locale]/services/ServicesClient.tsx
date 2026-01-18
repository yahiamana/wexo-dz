'use client'

import { motion } from 'framer-motion'
import { Globe, Zap, Palette, Users, Shield, Smartphone, Check, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface ServicesClientProps {
  locale: Locale
  translations: any
}

export default function ServicesClient({ locale, translations: t }: ServicesClientProps) {
  
  const services = [
    {
      icon: Globe,
      title: locale === 'ar' ? 'تصميم مواقع مخصص' : locale === 'fr' ? 'Design Web Personnalisé' : 'Custom Website Design',
      desc: locale === 'ar' 
        ? 'مواقع فريدة ومصممة خصيصاً لعلامتك التجارية' 
        : locale === 'fr' 
        ? 'Sites uniques conçus sur mesure pour votre marque'
        : 'Unique websites tailored specifically for your brand',
    },
    {
      icon: Zap,
      title: locale === 'ar' ? 'سرعة فائقة' : locale === 'fr' ? 'Vitesse Optimale' : 'Lightning Fast',
      desc: locale === 'ar'
        ? 'مواقع سريعة التحميل تحتل مراتب أعلى في البحث'
        : locale === 'fr'
        ? 'Sites rapides qui se classent mieux dans les recherches'
        : 'Fast-loading sites that rank higher in search',
    },
    {
      icon: Smartphone,
      title: locale === 'ar' ? 'متوافق مع الجوال' : locale === 'fr' ? 'Mobile Responsive' : 'Mobile Responsive',
      desc: locale === 'ar'
        ? 'تجربة مثالية على جميع الأجهزة'
        : locale === 'fr'
        ? 'Expérience parfaite sur tous les appareils'
        : 'Perfect experience on all devices',
    },
    {
      icon: Shield,
      title: locale === 'ar' ? 'آمن وموثوق' : locale === 'fr' ? 'Sécurisé et Fiable' : 'Secure & Reliable',
      desc: locale === 'ar'
        ? 'حماية SSL وأمان على مستوى عالمي'
        : locale === 'fr'
        ? 'Protection SSL et sécurité de niveau mondial'
        : 'SSL protection and world-class security',
    },
    {
      icon: Palette,
      title: locale === 'ar' ? 'تصميم احترافي' : locale === 'fr' ? 'Design Professionnel' : 'Professional Design',
      desc: locale === 'ar'
        ? 'تصاميم عصرية تعكس احترافية عملك'
        : locale === 'fr'
        ? 'Designs modernes reflétant le professionnalisme de votre entreprise'
        : 'Modern designs that reflect your business professionalism',
    },
    {
      icon: Users,
      title: locale === 'ar' ? 'دعم متواصل' : locale === 'fr' ? 'Support Continu' : 'Ongoing Support',
      desc: locale === 'ar'
        ? 'فريق دعم متاح لمساعدتك في أي وقت'
        : locale === 'fr'
        ? 'Équipe de support disponible pour vous aider à tout moment'
        : 'Support team available to help you anytime',
    },
  ]
  
  const processSteps = [
    {
      step: '01',
      title: locale === 'ar' ? 'استشارة مجانية' : locale === 'fr' ? 'Consultation Gratuite' : 'Free Consultation',
      desc: locale === 'ar'
        ? 'نتعرف على عملك واحتياجاتك'
        : locale === 'fr'
        ? 'Nous apprenons à connaître votre entreprise et vos besoins'
        : 'We learn about your business and needs',
    },
    {
      step: '02',
      title: locale === 'ar' ? 'التصميم والتطوير' : locale === 'fr' ? 'Design et Développement' : 'Design & Development',
      desc: locale === 'ar'
        ? 'نصمم موقعك باستخدام أحدث التقنيات'
        : locale === 'fr'
        ? 'Nous concevons votre site avec les dernières technologies'
        : 'We design your site using the latest technologies',
    },
    {
      step: '03',
      title: locale === 'ar' ? 'المراجعة والإطلاق' : locale === 'fr' ? 'Révision et Lancement' : 'Review & Launch',
      desc: locale === 'ar'
        ? 'نراجع معك ونطلق موقعك للعالم'
        : locale === 'fr'
        ? 'Nous révisons avec vous et lançons votre site au monde'
        : 'We review with you and launch your site to the world',
    },
  ]
  
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
              <span>{locale === 'ar' ? 'خدماتنا' : locale === 'fr' ? 'Nos Services' : 'Our Services'}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              {t.services.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Why Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t.services.whyTitle}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {t.services.whyDesc}
              </p>
              
              <ul className="space-y-4">
                {[
                  locale === 'ar' ? 'بناء الثقة مع العملاء' : locale === 'fr' ? 'Renforcer la confiance avec les clients' : 'Build trust with customers',
                  locale === 'ar' ? 'الوصول لعملاء جدد' : locale === 'fr' ? 'Atteindre de nouveaux clients' : 'Reach new customers',
                  locale === 'ar' ? 'زيادة المبيعات' : locale === 'fr' ? 'Augmenter les ventes' : 'Increase sales',
                  locale === 'ar' ? 'التميز عن المنافسين' : locale === 'fr' ? 'Se démarquer de la concurrence' : 'Stand out from competitors',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 rounded-3xl flex items-center justify-center">
                <div className="text-9xl font-bold text-blue-200">W</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.services.howTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.services.howDesc}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-blue-100 dark:text-blue-900/50 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="gap-2">
                {t.services.cta}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
