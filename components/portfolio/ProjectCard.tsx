'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { type Locale, getLocalizedField } from '@/lib/i18n'
import Badge from '@/components/ui/Badge'

interface ProjectCardProps {
  project: any // Type this properly if possible, or keep loose for now given schema flux
  locale: Locale
  translations?: any
}

export default function ProjectCard({ project, locale, translations }: ProjectCardProps) {
  const title = getLocalizedField(project, 'title', locale)
  const desc = getLocalizedField(project, 'desc', locale) // Short description
  const category = project.category
  
  return (
    <Link href={`/${locale}/portfolio/${project.slug || project.id}`} className="group block h-full">
      <article className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 transform group-hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
           {project.imageUrl ? (
             <Image
                src={project.imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
               <div className="text-slate-400 flex flex-col items-center gap-2">
                 <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-black/20 flex items-center justify-center">
                    <svg className="w-6 h-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                 </div>
                 <span className="text-xs font-medium opacity-60">No Preview</span>
               </div>
             </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-sm border-0">
               {category}
            </Badge>
          </div>
          
          {/* Hover CTA */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
             <div className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
               View Project <ArrowRight className="w-4 h-4" />
             </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
            {desc}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
             <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{project.client || 'Client Project'}</span>
             {project.websiteType && (
               <span className="text-xs text-slate-400">{project.websiteType}</span>
             )}
          </div>
        </div>
      </article>
    </Link>
  )
}
