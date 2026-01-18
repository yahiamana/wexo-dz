'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { type Locale } from '@/lib/i18n'

interface CTASectionProps {
  locale: Locale
  translations: {
    hero: {
      cta: string
      secondaryCta: string
    }
    cta: {
      readyToStart: string
    }
    contact: {
      title: string
      subtitle: string
    }
  }
}

export default function CTASection({ locale, translations }: CTASectionProps) {
  const router = useRouter()

  return (
    <section className="py-32 relative overflow-hidden bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mb-8"
        >
          <div className="flex items-center gap-3 text-blue-200">
            <MessageCircle className="w-6 h-6" />
            <span className="font-medium">{translations.cta.readyToStart}</span>
          </div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight"
        >
          {translations.contact.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {translations.contact.subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-xl"
            onClick={() => router.push(`/${locale}/contact`)}
          >
            {translations.hero.cta}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

           <Link href={`/${locale}/portfolio`}>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8 py-6 rounded-full"
            >
              {translations.hero.secondaryCta}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
