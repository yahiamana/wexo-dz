'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Waypoints, ArrowRight, Library } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProjectCard from '@/components/portfolio/ProjectCard'
import { type Locale } from '@/lib/i18n'

interface Project {
  id: string
  titleEn: string
  titleFr: string
  titleAr: string
  descEn: string
  descFr: string
  descAr: string
  category: string
  imageUrl: string
  liveUrl?: string | null
  slug?: string
}

interface PortfolioSectionProps {
  locale: Locale
  translations: {
    portfolio: {
      title: string
      subtitle: string
      viewLive: string
      viewAllProjects: string
      sectionBadge: string
      categories: Record<string, string>
    }
  }
  projects: Project[]
}

export default function PortfolioSection({ locale, translations, projects }: PortfolioSectionProps) {
  return (
    <section className="py-24 sm:py-36 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden" id="portfolio">
      {/* Structural Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header: Tactical Registry Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 lg:mb-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[2px] w-12 bg-blue-600 dark:bg-blue-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">Infrastructure Archive</span>
            </div>
            
            <h2 className="text-5xl sm:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.85] mb-8">
              Strategic <br />
              <span className="text-blue-600">Assets</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-xl">
              {translations.portfolio.subtitle}
            </p>
          </div>

          <div className="hidden md:block">
            <Link href={`/${locale}/portfolio`}>
              <Button size="lg" className="h-20 px-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white border-none transition-all duration-500 group">
                {translations.portfolio.viewAllProjects}
                <Library className="w-5 h-5 ml-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Portfolio Registry: The Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard project={project} locale={locale} translations={translations} />
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Call to Action */}
        <div className="mt-16 md:hidden">
          <Link href={`/${locale}/portfolio`} className="block">
            <Button size="lg" className="w-full h-20 rounded-2xl font-black uppercase tracking-widest text-xs">
              {translations.portfolio.viewAllProjects}
              <ArrowRight className="w-4 h-4 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
