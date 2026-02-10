'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Fingerprint, Activity } from 'lucide-react'
import { type Locale, getLocalizedField } from '@/lib/i18n'
import Badge from '@/components/ui/Badge'

interface ProjectCardProps {
  project: any
  locale: Locale
  translations?: any
}

export default function ProjectCard({ project, locale, translations }: ProjectCardProps) {
  const title = getLocalizedField(project, 'title', locale)
  const desc = getLocalizedField(project, 'desc', locale)
  const category = project.category
  const localizedCategory = translations?.portfolio?.categories?.[category] || category
  const viewText = translations?.portfolio?.viewProject || 'Access Case Study'
  
  return (
    <Link href={`/${locale}/portfolio/${project.slug || project.id}`} className="group block h-full">
      <article className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200/60 dark:border-slate-800/60 hover:shadow-3xl hover:shadow-blue-500/10 transition-all duration-700 transform group-hover:-translate-y-3">
        {/* Infrastructure Preview Container */}
        <div className="relative aspect-[16/11] overflow-hidden bg-slate-50 dark:bg-slate-950">
           {project.imageUrl ? (
             <Image
                src={project.imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-90"
             />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                <Fingerprint size={60} strokeWidth={0.5} className="text-slate-300 dark:text-slate-800" />
             </div>
          )}
          
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-700" />
          
          {/* Tactical Badge Certification */}
          <div className="absolute top-6 left-6">
            <Badge className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 py-2 px-4 text-[10px] uppercase tracking-widest font-black text-blue-600 dark:text-blue-400 shadow-xl">
               {localizedCategory}
            </Badge>
          </div>
        </div>
        
        {/* Strategic Data Profile */}
        <div className="p-10 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-4">
             <Activity size={12} className="text-blue-600" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Profile 0{project.id.slice(-1) || 'X'}</span>
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tighter uppercase leading-none">
            {title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-base font-semibold leading-relaxed line-clamp-2 mb-8 flex-grow">
            {desc}
          </p>
          
          <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
             <div className="flex flex-col">
               <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1.5 leading-none">Entity</span>
               <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{project.client || 'Strategic Partner'}</span>
             </div>
             
             <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-[11px] uppercase tracking-wider group/btn">
                <span>{viewText}</span>
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center transition-all group-hover/btn:bg-blue-600 group-hover/btn:text-white">
                  <ArrowRight className="w-4 h-4" />
                </div>
             </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
