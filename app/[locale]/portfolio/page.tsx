import { type Locale } from '@/lib/i18n'
import prisma from '@/lib/db'
import PortfolioClient from './PortfolioClient'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

export const dynamic = 'force-dynamic'

const translations = { en, fr, ar }

interface PortfolioPageProps {
  params: Promise<{ locale: string }>
}

async function getProjects() {
  try {
    return await prisma.portfolioProject.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params
  const t = translations[locale as Locale] || translations.en
  const projects = await getProjects()
  
  const displayProjects = projects
  
  return (
    <PortfolioClient 
      locale={locale as Locale} 
      translations={t} 
      projects={displayProjects}
    />
  )
}
