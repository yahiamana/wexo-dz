'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Layers, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { type Locale, getLocalizedField } from '@/lib/i18n'

interface Project {
  id: string
  titleEn: string
  titleFr: string
  titleAr: string
  descEn: string
  descFr: string
  descAr: string
  contentEn?: string | null
  contentFr?: string | null
  contentAr?: string | null
  challengeEn?: string | null
  challengeFr?: string | null
  challengeAr?: string | null
  solutionEn?: string | null
  solutionFr?: string | null
  solutionAr?: string | null
  resultsEn?: string | null
  resultsFr?: string | null
  resultsAr?: string | null
  client?: string | null
  industry?: string | null
  websiteType?: string | null
  deliveryTime?: string | null
  technologies: string[]
  featuresEn: string[]
  featuresFr: string[]
  featuresAr: string[]
  imageUrl: string
  galleryImages: string[]
  liveUrl?: string | null
  category: string
}

interface ProjectDetailsClientProps {
  locale: Locale
  translations: any
  project: Project
}

export default function ProjectDetailsClient({ locale, translations, project }: ProjectDetailsClientProps) {
  const title = getLocalizedField(project, 'title', locale)
  const desc = getLocalizedField(project, 'desc', locale)
  const content = getLocalizedField(project, 'content', locale)
  const challenge = getLocalizedField(project, 'challenge', locale)
  const solution = getLocalizedField(project, 'solution', locale)
  const results = getLocalizedField(project, 'results', locale)
  
  // Helper for array fields which might be simplistic in current schema wrapper
  const features = locale === 'fr' ? project.featuresFr : locale === 'ar' ? project.featuresAr : project.featuresEn

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 pt-24 lg:pt-32">
      {/* Hero Section */}
      <div className="relative h-[60vh] lg:h-[85vh] w-full overflow-hidden bg-slate-900 flex items-end">
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={title}
            fill
            className="object-cover opacity-50 scale-105"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-32">
             <Link 
            href={`/${locale}/portfolio`}
            className="inline-flex items-center text-white/60 hover:text-white mb-6 lg:mb-10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all backdrop-blur-sm">
               <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
            </div>
            <span className="text-lg font-medium">{translations.portfolio.details?.backToProjects || 'Back to Projects'}</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="secondary" className="mb-4 lg:mb-6 bg-blue-600/20 text-blue-100 border border-blue-500/30 px-4 py-1.5 text-sm backdrop-blur-md">
              {project.category}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 lg:mb-8 max-w-5xl tracking-tight leading-none">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light">
              {desc}
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8 lg:mt-10">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-full h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/20 backdrop-blur-md transition-all font-medium">
                    {translations.portfolio?.viewLive || 'Visit Live Site'}
                    <ExternalLink className="w-5 h-5 ml-2.5 rtl:mr-2.5 rtl:ml-0" />
                  </Button>
                </a>
              )}
               <Link href={`/${locale}/contact?project=${project.id}`}>
                 <Button size="lg" className="rounded-full h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg bg-blue-600 hover:bg-blue-700 text-white border-none shadow-xl shadow-blue-900/20 font-medium">
                   {translations.portfolio?.requestSimilar || 'Start a Project'}
                 </Button>
               </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 lg:-mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-16">
            
            {/* Overview */}
            <section className="bg-white dark:bg-slate-900 p-6 md:p-8 lg:p-12 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">{translations.portfolio.details?.aboutProject || 'About the Project'}</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                {content || desc}
              </div>
            </section>
            
            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
                {challenge && (
                  <section className="relative overflow-hidden bg-slate-900 rounded-3xl p-6 md:p-10 text-white">
                     <div className="absolute top-0 right-0 p-32 bg-blue-600/30 blur-[100px] rounded-full pointer-events-none" />
                    <h3 className="relative z-10 text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                       <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm">01</span>
                      {translations.portfolio.details?.challenge || 'The Challenge'}
                    </h3>
                    <p className="relative z-10 text-slate-300 text-base md:text-lg leading-relaxed opacity-90">
                      {challenge}
                    </p>
                  </section>
                )}
                
                {solution && (
                  <section className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10">
                     <div className="absolute bottom-0 left-0 p-32 bg-green-500/5 dark:bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />
                    <h3 className="relative z-10 text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                       <span className="w-8 h-8 rounded-lg bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-sm">02</span>
                      {translations.portfolio.details?.solution || 'The Solution'}
                    </h3>
                    <p className="relative z-10 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                      {solution}
                    </p>
                  </section>
                )}
            </div>

             {/* Results */}
             {results && (
              <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 md:p-10 rounded-3xl shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                 <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
                      <span className="text-blue-200">{translations.portfolio.details?.keyResults || 'Key Results'}</span>
                    </h3>
                    <p className="text-lg md:text-2xl leading-relaxed font-medium text-white/90">
                      "{results}"
                    </p>
                 </div>
              </section>
            )}

            {/* Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <section className="space-y-8">
                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{translations.portfolio.details?.gallery || 'Project Gallery'}</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {project.galleryImages.map((img, idx) => (
                      <div key={idx} className={`relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-lg group ${idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]' : 'aspect-square'}`}>
                         <Image 
                           src={img} 
                           alt={`${title} gallery ${idx}`} 
                           fill 
                           className="object-cover transition-transform duration-700 group-hover:scale-105" 
                         />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    ))}
                 </div>
              </section>
            )}
          </div>

          {/* Sidebar Info Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-2">
                  {translations.portfolio.details?.projectInfo || 'Project Information'}
                </h3>
              
                <div className="space-y-6">
                  {project.client && (
                    <div className="group">
                      <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-2">{translations.portfolio.details?.client || 'My Client'}</span>
                      <div className="flex items-center gap-3 text-slate-900 dark:text-slate-200 font-medium">
                         <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 text-slate-500 group-hover:text-blue-600 transition-colors">
                            <User className="w-5 h-5" />
                         </div>
                         {project.client}
                      </div>
                    </div>
                  )}
                  
                  {project.industry && (
                     <div className="group">
                      <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-2">{translations.portfolio.details?.industry || 'Industry'}</span>
                      <div className="flex items-center gap-3 text-slate-900 dark:text-slate-200 font-medium">
                         <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 text-slate-500 group-hover:text-blue-600 transition-colors">
                           <Layers className="w-5 h-5" />
                         </div>
                         {project.industry}
                      </div>
                    </div>
                  )}
                  
                  {project.websiteType && (
                      <div className="group">
                      <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-2">{translations.portfolio.details?.type || 'Project Type'}</span>
                      <div className="flex items-center gap-3 text-slate-900 dark:text-slate-200 font-medium">
                         <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 text-slate-500 group-hover:text-blue-600 transition-colors">
                           <Tag className="w-5 h-5" />
                         </div>
                         {project.websiteType}
                      </div>
                    </div>
                  )}
                  
                   {project.deliveryTime && (
                      <div className="group">
                      <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-2">{translations.portfolio.details?.timeline || 'Timeline'}</span>
                      <div className="flex items-center gap-3 text-slate-900 dark:text-slate-200 font-medium">
                         <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 text-slate-500 group-hover:text-blue-600 transition-colors">
                           <Calendar className="w-5 h-5" />
                         </div>
                         {project.deliveryTime}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="my-8 h-px bg-slate-100 dark:bg-slate-800" />
                
                <div>
                  <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-4">{translations.portfolio.details?.technologies || 'Technologies'}</span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <Badge key={tech} variant="secondary" className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium">
                        {tech}
                      </Badge>
                    ))}
                    {(!project.technologies || project.technologies.length === 0) && (
                       <span className="text-sm text-slate-500 italic">{translations.portfolio.details?.notSpecified || 'Not specified'}</span>
                    )}
                  </div>
                </div>
                
                {features && features.length > 0 && (
                  <div className="mt-8">
                    <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-4">{translations.portfolio.details?.keyFeatures || 'Key Features'}</span>
                    <ul className="space-y-3">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 group">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                             <CheckCircle className="w-3 h-3" />
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* CTA Box */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/40 transform transition-transform hover:scale-[1.02] duration-300">
                 <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 blur-[60px] rounded-full pointer-events-none" />
                 <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-purple-500/20 blur-[40px] rounded-full pointer-events-none" />
                 
                  <h3 className="text-2xl font-bold mb-3 relative z-10 leading-tight">
                    {translations.portfolio.projectCTA?.title || 'Starting a new project?'}
                  </h3>
                  <p className="text-blue-100 mb-8 relative z-10 text-sm leading-relaxed opacity-90">
                    {translations.portfolio.projectCTA?.subtitle || 'We can match this level of quality for your business.'}
                  </p>
                  <Link href={`/${locale}/contact?subject=Project Inquiry - ${title}`}>
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="w-full border-none font-bold text-base h-12 shadow-lg relative z-10"
                      style={{ backgroundColor: '#ffffff', color: '#2563eb' }}
                    >
                      {translations.portfolio.projectCTA?.button || 'Get a Quote'}
                    </Button>
                  </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
