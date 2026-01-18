import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import prisma from '@/lib/db'
import { type Locale } from '@/lib/i18n'
import ProjectDetailsClient from './ProjectDetailsClient'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

async function getProject(slug: string) {
  try {
    // Try to find by slug first
    let project = await prisma.portfolioProject.findUnique({
      where: { slug },
    })
    
    // Fallback to ID if slug not found (for legacy URLs or if slug is actually an ID)
    if (!project) {
        project = await prisma.portfolioProject.findUnique({
          where: { id: slug },
        })
    }
    
    return project
  } catch {
    return null
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params
  const t = translations[locale as Locale] || translations.en
  
  const project = await getProject(slug)
  
  if (!project) {
    notFound()
  }
  
  return <ProjectDetailsClient locale={locale as Locale} translations={t} project={project} />
}
