'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Waypoints, Activity, Fingerprint, ShieldCheck, Mail, Phone, Send, Terminal } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input, { Textarea, Select } from '@/components/ui/Input'
import { type Locale } from '@/lib/i18n'

interface Category {
  id: string
  slug: string
  nameEn: string
  nameFr: string
  nameAr: string
}

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
    budget: '',
    objective: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [categories, setCategories] = useState<Category[]>([])
  
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (e) {
      console.error('Failed to fetch categories', e)
    }
  }

  const getCategoryName = (cat: Category) => {
    if (locale === 'ar') return cat.nameAr
    if (locale === 'fr') return cat.nameFr
    return cat.nameEn
  }
  
  const businessTypes = [
    { value: '', label: locale === 'ar' ? 'نوع العملية' : locale === 'fr' ? 'Type d\'Opération' : 'Operation Type' },
    ...categories.map(cat => ({ value: cat.slug, label: getCategoryName(cat) })),
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
        setFormData({ name: '', email: '', phone: '', businessType: '', budget: '', objective: '', message: '' })
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
    <div className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      {/* Strategic Audit Hero */}
      <section className="py-24 sm:py-36 relative overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[2px] w-12 bg-blue-600 dark:bg-blue-400" />
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">Strategic Audit Initialization</span>
            </div>
            
            <h1 className="text-5xl sm:text-8xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter uppercase leading-[0.85]">
              Contact <br />
              <span className="text-blue-600 dark:text-blue-400">Calibrator</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-semibold">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* The Initialization Portal */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* The Audit Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <div className="p-10 lg:p-16 rounded-[40px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-2xl">
                <div className="flex items-center gap-2 mb-12">
                   <Terminal size={14} className="text-blue-600" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Handshake Terminal</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid sm:grid-cols-2 gap-10">
                    <Input
                      id="name"
                      name="name"
                      label={t.contact.form.name}
                      placeholder="Authorized Entity Name"
                      className="h-16 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-600"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      label={t.contact.form.email}
                      placeholder="Secure Routing Address"
                      className="h-16 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-600"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-10">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      label={t.contact.form.phone}
                      placeholder="Operational Frequency (Phone)"
                      className="h-16 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-600"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Select
                      id="businessType"
                      name="businessType"
                      label={t.contact.form.business}
                      className="h-16 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-600"
                      options={businessTypes}
                      value={formData.businessType}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-10">
                    <Select
                      id="budget"
                      name="budget"
                      label={locale === 'ar' ? 'الميزانية المتوقعة' : locale === 'fr' ? 'Budget prévisionnel' : 'Capital Allocation Plan'}
                      className="h-16 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-600"
                      options={[
                        { value: '', label: locale === 'ar' ? 'نطاق الاستثمار' : 'Investment Range' },
                        { value: 'under-10m', label: locale === 'ar' ? 'أقل من 10 مليون' : '< 10M DA' },
                        { value: '10m-30m', label: locale === 'ar' ? '10 - 30 مليون' : '10M - 30M DA' },
                        { value: '30m-100m', label: locale === 'ar' ? '30 - 100 مليون' : '30M - 100M DA' },
                        { value: 'over-100m', label: locale === 'ar' ? 'أكثر من 100 مليون' : '> 100M DA' }
                      ]}
                      value={formData.budget}
                      onChange={handleChange}
                    />
                    <Input
                      id="objective"
                      name="objective"
                      label={locale === 'ar' ? 'الهدف الرئيسي' : 'Core Strategic Objective'}
                      placeholder="e.g. MarketDominance"
                      className="h-16 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-600"
                      value={formData.objective}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <Textarea
                    id="message"
                    name="message"
                    label={t.contact.form.message}
                    placeholder="Provide mission-critical details or project specifications here..."
                    className="rounded-3xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-600 p-6"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-20 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white border-none group"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? t.contact.form.sending : 'Initialize Integration'}
                      <Waypoints className="w-5 h-5 ml-4 opacity-50 group-hover:rotate-180 transition-transform duration-700" />
                    </Button>
                  </div>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-800/50 font-black uppercase tracking-widest text-xs"
                    >
                      <ShieldCheck className="w-6 h-6" />
                      <span>{t.contact.form.success}</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
            
            {/* The Intelligence Brief */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="sticky top-32 space-y-10">
                 <div className="p-10 rounded-[40px] bg-slate-950 text-white border border-slate-800 shadow-3xl">
                    <div className="flex items-center gap-2 mb-10">
                       <Activity size={14} className="text-blue-400" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact Interface</span>
                    </div>

                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-10 leading-none">Intelligence Brief</h3>
                    
                    <div className="space-y-12">
                      <div className="flex items-start gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:border-transparent">
                          <Mail className="w-5 h-5 text-blue-400 group-hover:text-white" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t.contact.info.email}</div>
                          <a href="mailto:contact@wexodz.com" className="text-lg font-bold tracking-tight hover:text-blue-400 transition-colors">
                            contact@wexodz.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:border-transparent">
                          <Phone className="w-5 h-5 text-blue-400 group-hover:text-white" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{t.contact.info.phone}</div>
                          <a href="tel:+213561020056" className="text-lg font-bold tracking-tight hover:text-blue-400 transition-colors">
                            +213 561020056
                          </a>
                        </div>
                      </div>
                    </div>
                 </div>

                 <div className="p-10 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8">
                       <Fingerprint size={60} strokeWidth={0.5} className="text-slate-100 dark:text-slate-800" />
                    </div>
                    <div className="relative z-10">
                       <h4 className="text-lg font-black uppercase tracking-tighter mb-4 text-slate-900 dark:text-white leading-none">Security Protocol</h4>
                       <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                          All communications are encrypted and routed through our secure strategic triage engine. Initial response latency: &lt; 24h.
                       </p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
