'use client'

import { motion } from 'framer-motion'
import { Globe, Zap, Smartphone, Shield, Palette, Users, Check, ArrowRight, CircuitBoard, Activity, Layers, Target } from 'lucide-react'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n'
import Button from '@/components/ui/Button'

interface ServicesClientProps {
  locale: Locale
  translations: any
}

export default function ServicesClient({ locale, translations: t }: ServicesClientProps) {
  
  const systems = [
    {
      icon: Globe,
      status: 'High Available',
      title: locale === 'ar' ? 'هندسة البنية التحتية' : locale === 'fr' ? 'Architecture d\'infrastructure' : 'Infrastructure Architecture',
      desc: locale === 'ar' 
        ? 'بناء قواعد فنية متينة تقضي على التقلبات التشغيلية وتضمن استقرار الأعمال.' 
        : locale === 'fr' 
        ? 'Bases techniques à haute disponibilité éliminant la volatilité opérationnelle.'
        : 'Technical foundations that eliminate operational volatility and ensure business stability.',
    },
    {
      icon: Zap,
      status: 'Optimized',
      title: locale === 'ar' ? 'هندسة الأداء العالي' : locale === 'fr' ? 'Ingénierie de Performance' : 'Performance Engineering',
      desc: locale === 'ar'
        ? 'أنظمة ذات زمن وصول منخفض مُحسّنة لمعاملات السوق عالية الكثافة والنمو السريع.'
        : locale === 'fr'
        ? 'Systèmes à faible latence optimisés pour les transactions de marché à haute densité.'
        : 'Low-latency systems optimized for high-density market transactions and rapid scaling.',
    },
    {
      icon: Smartphone,
      status: 'Synchronized',
      title: locale === 'ar' ? 'أنظمة الجوال المتقدمة' : locale === 'fr' ? 'Systèmes Mobiles' : 'Mobile System Architecture',
      desc: locale === 'ar'
        ? 'بنية تحتية جوالة بالغة الأهمية للأعمال الرقمية التي تتطلب وصولاً مستمراً.'
        : locale === 'fr'
        ? 'Infrastructure mobile critique pour les entreprises numériques à forte croissance.'
        : 'Critical mobile infrastructure for high-growth digital businesses requiring persistent access.',
    },
    {
      icon: Shield,
      status: 'Verified',
      title: locale === 'ar' ? 'بروتوكولات الأمان' : locale === 'fr' ? 'Protocoles de Sécurité' : 'Security Protocols',
      desc: locale === 'ar'
        ? 'حماية البيانات على المستوى المؤسسي مع بروتوكولات تشفير معتمدة عالمياً.'
        : locale === 'fr'
        ? 'Protection des données au niveau entreprise avec des protocoles certifiés.'
        : 'Enterprise-grade data protection with globally certified encryption and security protocols.',
    },
    {
      icon: Palette,
      status: 'High Fidelity',
      title: locale === 'ar' ? 'التصميم الجراحي (UI/UX)' : locale === 'fr' ? 'Design Chirurgical (UI/UX)' : 'Surgical UI/UX Design',
      desc: locale === 'ar'
        ? 'تصاميم واجهة تهدف لتقليل الاحتكاك وزيادة معدلات التحويل للمستخدمين عاليي القيمة.'
        : locale === 'fr'
        ? 'Interfaces conçues pour réduire la friction et maximiser la conversion.'
        : 'Low-friction interfaces designed to maximize conversion rates for high-intent professional users.',
    },
    {
      icon: Users,
      status: 'Persistent',
      title: locale === 'ar' ? 'دعم استراتيجي مستمر' : locale === 'fr' ? 'Support Stratégique' : 'Strategic Support Log',
      desc: locale === 'ar'
        ? 'مراقبة مستمرة وتطور للأنظمة لضمان بقائها في قمة الكفاءة التشغيلية.'
        : locale === 'fr'
        ? 'Surveillance continue et évolution des systèmes pour maintenir l\'efficacité.'
        : 'Continuous monitoring and system evolution to ensure persistent operational efficiency.',
    },
  ]
  
  const engineeringCycle = [
    {
      cycle: '01',
      id: 'Strategic Intelligence',
      title: locale === 'ar' ? 'ذكاء استراتيجي' : locale === 'fr' ? 'Intelligence Stratégique' : 'Strategic Intelligence',
      desc: locale === 'ar'
        ? 'تحديد المعوقات التشغيلية الحقيقية وسيكولوجية السوق المستهدف.'
        : locale === 'fr'
        ? 'Identification des contraintes opérationnelles et de la psychologie du marché.'
        : 'Identifying operational constraints and target market psychology before any code is written.',
    },
    {
      cycle: '02',
      id: 'Logical Architecture',
      title: locale === 'ar' ? 'هندسة منطقية' : locale === 'fr' ? 'Architecture Logique' : 'Logical Architecture',
      desc: locale === 'ar'
        ? 'تصميم تدفقات البيانات والعمليات لضمان أقصى قدر من الكفاءة التلقائية.'
        : locale === 'fr'
        ? 'Conception des flux de données pour garantir une efficacité automatisée maximale.'
        : 'Designing data flows and process logic to ensure maximum automated efficiency.',
    },
    {
      cycle: '03',
      id: 'Precision Deployment',
      title: locale === 'ar' ? 'نشر دقيق' : locale === 'fr' ? 'Déploiement de Précision' : 'Precision Deployment',
      desc: locale === 'ar'
        ? 'تنفيذ الأنظمة بمعايير عالمية مع مراقبة حية للأداء والاستقرار.'
        : locale === 'fr'
        ? 'Exécution du système aux normes mondiales avec surveillance en direct.'
        : 'Executing systems to global standards with live performance monitoring and stability checks.',
    },
  ]
  
  return (
    <div className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      {/* Hero Section: The Growth OS Hero */}
      <section className="py-24 sm:py-36 relative overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[2px] w-12 bg-blue-600 dark:bg-blue-400" />
              <span className="text-[12px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">System Registry v3.0</span>
            </div>
            
            <h1 className="text-5xl sm:text-8xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter uppercase leading-[0.85]">
              Growth <br />
              <span className="text-blue-600 dark:text-blue-400">Systems</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-semibold">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Systems Catalog: The Bento Grid Registry */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-500 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="w-14 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <system.icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 dark:text-slate-700 group-hover:text-blue-600/50 transition-colors">
                    {system.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight leading-none transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {system.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  {system.desc}
                </p>
                
                <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Protocol 0{index + 1}</span>
                  <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* The Engineering Cycle: The Process Dossier */}
      <section className="py-24 sm:py-40 bg-slate-900 dark:bg-white text-white dark:text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none hidden lg:block">
          <CircuitBoard size={500} strokeWidth={0.5} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-12 bg-blue-500" />
                <span className="text-[12px] font-black uppercase tracking-widest text-blue-500">Methodology</span>
              </div>
              <h2 className="text-4xl sm:text-7xl font-black mb-10 tracking-tighter uppercase leading-[0.85]">
                The <br />
                <span className="text-blue-500">Engineering</span> <br />
                Cycle
              </h2>
              <p className="text-xl text-slate-400 dark:text-slate-500 mb-12 leading-relaxed font-semibold max-w-md">
                {t.services.howDesc}
              </p>
              
              <Link href={`/${locale}/contact`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl border-none h-16 px-10 font-black uppercase tracking-widest text-xs">
                  {t.services.cta}
                </Button>
              </Link>
            </motion.div>
            
            <div className="space-y-12">
              {engineeringCycle.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-10 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-slate-800 dark:border-slate-200 flex items-center justify-center text-xl font-black group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                      {step.cycle}
                    </div>
                    {index !== engineeringCycle.length - 1 && (
                      <div className="w-[2px] flex-1 bg-slate-800 dark:bg-slate-200 my-4" />
                    )}
                  </div>
                  <div className="pb-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 block">{step.id}</span>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-slate-400 dark:text-slate-500 font-semibold leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Structural Confirmation Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[40px] p-10 sm:p-20 relative overflow-hidden border border-slate-100 dark:border-slate-800">
             <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-2xl text-center md:text-left">
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-none">
                    Ready to <span className="text-blue-600">Architect</span> Your Stability?
                  </h2>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    We only accept 2 high-intensity infrastructure projects per quarter to ensure world-class engineering precision.
                  </p>
                </div>
                <Link href={`/${locale}/contact`}>
                  <Button className="h-20 px-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-slate-900/10">
                    Initialize Audit
                  </Button>
                </Link>
             </div>
             
             {/* Logic Visual */}
             <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
               <Layers size={300} strokeWidth={1} />
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
