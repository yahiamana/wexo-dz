'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Waypoints, Terminal, Activity, ArrowRight } from 'lucide-react'
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
    <section className="py-24 sm:py-36 relative overflow-hidden bg-slate-950">
      {/* Infrastructure Blueprint Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-4 p-5 rounded-[2rem] bg-white/5 backdrop-blur-3xl border border-white/10 mb-12 shadow-2xl"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Terminal size={20} />
          </div>
          <span className="text-[12px] font-black uppercase tracking-wider text-blue-200">{translations.cta.readyToStart}</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.82]"
        >
          {translations.contact.title.split('?')[0]} <br />
          <span className="text-blue-600">Calibration</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed font-semibold italic"
        >
          {translations.contact.subtitle}
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button
            size="lg"
            className="h-20 px-12 rounded-3xl bg-blue-600 text-white font-black uppercase tracking-wider text-sm shadow-3xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 group"
            onClick={() => router.push(`/${locale}/contact`)}
          >
            Initialize Operational Growth
            <Waypoints className="w-5 h-5 ml-4 opacity-70 group-hover:rotate-180 transition-transform duration-700" />
          </Button>

           <Link href={`/${locale}/portfolio`}>
            <Button
              variant="outline"
              size="lg"
              className="h-20 px-12 rounded-3xl border-slate-800 text-white hover:bg-white hover:text-slate-950 font-black uppercase tracking-wider text-sm group"
            >
              Explore Assets
              <Activity className="w-5 h-5 ml-4 opacity-40 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
        </motion.div>

        {/* Status Indicators */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto opacity-40">
           {['Network Secure', 'Systems Ready', 'Capacity Available', 'Logic Verified'].map((status) => (
             <div key={status} className="flex items-center gap-2 justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{status}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  )
}
