'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Textarea, Select } from '@/components/ui/Input'
import { type Locale } from '@/lib/i18n'

interface ContactClientProps {
  locale: Locale
  translations: {
    contact: {
      title: string
      subtitle: string
      form: {
        name: string
        email: string
        phone: string
        business: string
        message: string
        submit: string
        sending: string
        success: string
        error: string
      }
      info: {
        title: string
        email: string
        phone: string
        location: string
      }
    }
  }
}

export default function ContactClient({ locale, translations: t }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const businessTypes = [
    { value: '', label: locale === 'ar' ? 'اختر نوع العمل' : locale === 'fr' ? 'Sélectionnez le type' : 'Select business type' },
    { value: 'restaurant', label: locale === 'ar' ? 'مطعم / مقهى' : locale === 'fr' ? 'Restaurant / Café' : 'Restaurant / Café' },
    { value: 'retail', label: locale === 'ar' ? 'متجر / تجزئة' : locale === 'fr' ? 'Magasin / Commerce' : 'Retail / Shop' },
    { value: 'professional', label: locale === 'ar' ? 'محترف (طبيب، محامي)' : locale === 'fr' ? 'Professionnel (Médecin, Avocat)' : 'Professional (Doctor, Lawyer)' },
    { value: 'startup', label: locale === 'ar' ? 'شركة ناشئة' : locale === 'fr' ? 'Startup' : 'Startup' },
    { value: 'other', label: locale === 'ar' ? 'آخر' : locale === 'fr' ? 'Autre' : 'Other' },
  ]
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', businessType: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  
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
              <span>{locale === 'ar' ? 'تواصل معنا' : locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              {t.contact.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      id="name"
                      name="name"
                      label={t.contact.form.name}
                      placeholder={t.contact.form.name}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      label={t.contact.form.email}
                      placeholder={t.contact.form.email}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      label={t.contact.form.phone}
                      placeholder={t.contact.form.phone}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Select
                      id="businessType"
                      name="businessType"
                      label={t.contact.form.business}
                      options={businessTypes}
                      value={formData.businessType}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <Textarea
                    id="message"
                    name="message"
                    label={t.contact.form.message}
                    placeholder={t.contact.form.message}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>{t.contact.form.success}</span>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{t.contact.form.error}</span>
                    </motion.div>
                  )}
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    isLoading={isSubmitting}
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
                  </Button>
                </form>
              </Card>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card glass className="p-6 sm:p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t.contact.info.title}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{t.contact.info.email}</div>
                      <a href="mailto:contact@wexodz.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        contact@wexodz.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{t.contact.info.phone}</div>
                      <a href="tel:+213561020056" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        +213 561020056
                      </a>
                    </div>
                  </div>
                  
                  
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
