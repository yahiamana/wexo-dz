'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { type Locale } from '@/lib/i18n'

interface RequestFormProps {
  locale: Locale
  translations: any
  websiteType: string
}

export default function RequestForm({ locale, translations, websiteType }: RequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    objective: '',
    message: ''
  })

  // Fallback translations if not provided completely
  const t = {
    title: translations.pricing?.request?.title || 'Apply for Digital Transformation',
    subtitle: translations.pricing?.request?.subtitle || 'Tell us about your business goals. We only work with projects where we can deliver 10x value.',
    name: translations.contact?.form?.name || 'Full Name',
    email: translations.contact?.form?.email || 'Work Email',
    phone: translations.contact?.form?.phone || 'Phone / WhatsApp',
    budget: locale === 'ar' ? 'تخصيص الموارد الاستثمارية' : locale === 'fr' ? 'Allocation des ressources' : 'Planned Investment Allocation',
    objective: locale === 'ar' ? 'الهدف التجاري الأساسي' : locale === 'fr' ? 'Objectif commercial principal' : 'Primary Business Goal',
    message: translations.contact?.form?.message || 'Project Details & Context',
    submit: translations.pricing?.request?.submit || 'Submit Request',
    sending: translations.contact?.form?.sending || 'Processing...',
    success: translations.pricing?.request?.success || 'Request received. Our strategist will review your goals.',
    error: translations.pricing?.request?.error || 'Submission failed. Please try again.',
    whatsapp: locale === 'ar' ? 'استشارة سريعة عبر واتساب' : locale === 'fr' ? 'Consultation via WhatsApp' : 'Quick Consultation via WhatsApp'
  }

  const budgetOptions = [
    { value: 'under-10m', label: locale === 'ar' ? 'تأسيس (أقل من 10م)' : 'Entry Level (Under 100k)' },
    { value: '10m-30m', label: locale === 'ar' ? 'توسع (10 - 30 مليون)' : 'Growth Layer (100k - 300k)' },
    { value: '30m-100m', label: locale === 'ar' ? 'أداء عالٍ (30 - 100 م)' : 'High-Performance (300k - 1M)' },
    { value: 'over-100m', label: locale === 'ar' ? 'تحول شامل (100م+)' : 'Strategic Transformation (1M+)' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          businessType: websiteType,
          budget: formData.budget,
          objective: formData.objective || `Strategic Transformation for ${websiteType}`
        })
      })

      if (!response.ok) throw new Error('Failed to submit')

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', budget: '', objective: '', message: '' })
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hello WEXO DZ. I'm interested in a strategic digital transformation for my business. Level: ${websiteType}.`)
    window.open(`https://wa.me/213550000000?text=${text}`, '_blank') // Generic placeholder number
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-gray-100 dark:border-slate-800">
      <div className="mb-10 text-center">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{t.title}</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider">
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="e.g. Yacine Mazouni"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-300 shadow-inner"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider">
              {t.phone}
            </label>
            <input
              type="tel"
              id="phone"
              required
              placeholder="05 50 00 00 00"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-300 shadow-inner"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider">
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              placeholder="yacine@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-300 shadow-inner"
            />
          </div>

          <div>
            <label htmlFor="objective" className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider">
              {t.objective}
            </label>
            <input
              type="text"
              id="objective"
              placeholder={locale === 'ar' ? 'مثل: مضاعفة المبيعات' : 'e.g. Double Digital Sales'}
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-300 shadow-inner"
            />
          </div>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider">
            {t.budget}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFormData({ ...formData, budget: opt.value })}
                className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 text-sm font-bold
                  ${formData.budget === opt.value 
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
                    : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wider">
            {t.message}
          </label>
          <textarea
            id="message"
            rows={4}
            required
            placeholder="Describe your current bottleneck and desired outcome..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-300 shadow-inner resize-none"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold shadow-xl shadow-blue-500/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.sending}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t.submit}
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={openWhatsApp}
            className="w-full h-16 rounded-2xl border-2 border-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center gap-2 font-bold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.544 3.838-2.544 6.158 0 1.29.289 2.541.854 3.669l-1.148 4.194 4.294-1.127c1.136.612 2.429.935 3.733.935 2.321 0 4.519-.903 6.16-2.544 1.64-1.64 2.544-3.838 2.544-6.158 0-2.321-.904-4.519-2.544-6.16-1.641-1.64-3.84-2.543-6.16-2.543zm5.424 10.594c-.232.653-1.341 1.189-1.841 1.258-.46.06-1.05.089-1.69-.12-1.291-.42-2.885-1.543-3.84-2.5-1.077-1.071-1.93-2.613-2.03-3.793-.1-.663.221-1.229.41-1.489.17-.233.4-.336.56-.336.161 0 .285.003.4.01.148.01.32.02.485.4.21.488.7.1.72 1.701.01.121-.01.242-.06.353-.19.42-.42.66-.63 1.05-.12.22-.25.46-.1.74.34 1.201 1.341 2.457 2.191 2.871.18.089.36.14.53.14.33 0 .548-.22.768-.45.24-.261.54-.611.838-.971.21-.261.431-.22.701-.12.271.101 1.741.821 2.041.971s.5.21.571.33c.07.12.07.7-.161 1.334z"/>
            </svg>
            {t.whatsapp}
          </button>
        </div>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center gap-3 border border-green-200 dark:border-green-800"
          >
            <Check className="w-6 h-6 flex-shrink-0" />
            <p className="font-bold">{t.success}</p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 flex items-center gap-3 border border-red-200 dark:border-red-800"
          >
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <p className="font-bold">{t.error}</p>
          </motion.div>
        )}
      </form>
    </div>
  )
}
