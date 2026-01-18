'use client'

import Link from 'next/link'
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
    common: {
      viewAll: string
    }
  }
  projects: Project[]
}

export default function PortfolioSection({ locale, translations, projects }: PortfolioSectionProps) {
  const displayProjects = projects
  
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-medium mb-6">
            {translations.portfolio.sectionBadge}
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            {translations.portfolio.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {translations.portfolio.subtitle}
          </p>
        </div>

        {/* Portfolio Grid - CLEAN 3 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <div key={project.id} className="h-full"> {/* Wrapper for height consistency */}
               <ProjectCard project={project} locale={locale} translations={translations} />
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-16 text-center">
            <Link href={`/${locale}/portfolio`}>
              <Button size="lg" variant="outline" className="min-w-[200px] border-slate-300 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 hover:bg-slate-50">
                {translations.portfolio.viewAllProjects}
              </Button>
            </Link>
        </div>
      </div>
    </section>
  )
}
