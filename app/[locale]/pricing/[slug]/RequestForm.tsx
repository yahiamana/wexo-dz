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
    message: ''
  })

  // Fallback translations if not provided completely
  // Note: ideally these should come from translations prop fully
  const t = {
    title: translations.contact?.title || (locale === 'ar' ? 'اطلب هذا الموقع' : locale === 'fr' ? 'Commander ce site' : 'Request This Website'),
    subtitle: translations.contact?.subtitle || (locale === 'ar' ? 'املأ النموذج وسنتواصل معك قريباً' : locale === 'fr' ? 'Remplissez le formulaire et nous vous contacterons bientôt' : 'Fill the form and we will contact you soon'),
    name: translations.contact?.form?.name || (locale === 'ar' ? 'الاسم الكامل' : locale === 'fr' ? 'Nom complet' : 'Full Name'),
    email: translations.contact?.form?.email || (locale === 'ar' ? 'البريد الإلكتروني' : locale === 'fr' ? 'Email' : 'Email Address'),
    phone: translations.contact?.form?.phone || (locale === 'ar' ? 'رقم الهاتف' : locale === 'fr' ? 'Téléphone' : 'Phone Number'),
    message: translations.contact?.form?.message || (locale === 'ar' ? 'رسالتك' : locale === 'fr' ? 'Votre message' : 'Your Message'),
    submit: translations.contact?.form?.submit || (locale === 'ar' ? 'إرسال الطلب' : locale === 'fr' ? 'Envoyer la demande' : 'Submit Request'),
    sending: translations.contact?.form?.sending || (locale === 'ar' ? 'جاري الإرسال...' : locale === 'fr' ? 'Envoi...' : 'Sending...'),
    success: translations.contact?.form?.success || (locale === 'ar' ? 'تم استلام طلبك بنجاح!' : locale === 'fr' ? 'Demande reçue avec succès !' : 'Request received successfully!'),
    error: translations.contact?.form?.error || (locale === 'ar' ? 'حدث خطأ ما. حاول مرة أخرى.' : locale === 'fr' ? 'Une erreur est survenue. Réessayez.' : 'Something went wrong. Try again.')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          businessType: websiteType // Use website type as business type
        })
      })

      if (!response.ok) throw new Error('Failed to submit')

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-slate-800">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.name}
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.email} <span className="text-gray-400 font-normal text-xs">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.phone}
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.message}
          </label>
          <textarea
            id="message"
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all duration-200 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-4 text-base"
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

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center gap-2"
          >
            <Check className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{t.success}</p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{t.error}</p>
          </motion.div>
        )}
      </form>
    </div>
  )
}
