'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import ProjectCard from '@/components/portfolio/ProjectCard'
import Button from '@/components/ui/Button'
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
  client?: string | null
  websiteType?: string | null
}

interface Category {
  id: string
  slug: string
  nameEn: string
  nameFr: string
  nameAr: string
}

interface PortfolioClientProps {
  locale: Locale
  translations: any
  projects: Project[]
  categories: Category[]
}

export default function PortfolioClient({ locale, translations, projects, categories = [] }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get localized category name
  const getCategoryName = (cat: Category) => {
    if (locale === 'ar') return cat.nameAr
    if (locale === 'fr') return cat.nameFr
    return cat.nameEn
  }

  // Filter projects
  const filteredProjects = projects.filter(project => {
    // Category filter - match by slug or name
    const matchesCategory = activeCategory === 'all' || 
                           project.category?.toLowerCase() === activeCategory.toLowerCase() ||
                           categories.some(c => c.slug === activeCategory && 
                             (project.category?.toLowerCase().includes(c.nameEn.toLowerCase()) ||
                              project.category?.toLowerCase().includes(c.slug.toLowerCase())))

    // Search filter
    const title = locale === 'fr' ? project.titleFr : locale === 'ar' ? project.titleAr : project.titleEn
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
       {/* Background Elements */}
       <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent" />
       </div>

      <div className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
              {translations.portfolio.title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {translations.portfolio.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center justify-center mb-16">
          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 p-1.5 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-800"
          >
            {/* "All" button */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === 'all' 
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm scale-105' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50'}
              `}
            >
              {translations.common?.all || 'All'}
            </button>
            
            {/* Dynamic categories from DB */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeCategory === category.slug 
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm scale-105' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50'}
                `}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode='popLayout'>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="h-full"
              >
                <ProjectCard project={project} locale={locale} translations={translations} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 mb-4">
               <Search className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">No projects found for this category.</p>
            <Button variant="outline" onClick={() => { setActiveCategory('all'); setSearchQuery('') }}>
              View All Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
