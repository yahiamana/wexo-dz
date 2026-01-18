import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import { type Locale } from '@/lib/i18n'
import WebsiteTypeClient from './WebsiteTypeClient'
import { DEFAULT_WEBSITE_TYPES } from '@/lib/constants'

import en from '@/translations/en.json'
import fr from '@/translations/fr.json'
import ar from '@/translations/ar.json'

const translations = { en, fr, ar }

interface WebsiteTypePageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata({ params }: WebsiteTypePageProps) {
    const { locale, slug } = await params
    let websiteType = await prisma.websiteType.findUnique({
        where: { slug }
    })

    if (!websiteType) {
       const defaultType = (DEFAULT_WEBSITE_TYPES as any[]).find(t => t.slug === slug)
       if (defaultType) {
          websiteType = defaultType
       }
    }
    
    if (!websiteType) return {}

    // Basic meta logic
    const title = locale === 'ar' ? websiteType.titleAr : locale === 'fr' ? websiteType.titleFr : websiteType.titleEn
    return {
        title: `${title} | YourAgency`,
        description: locale === 'ar' ? websiteType.descAr : locale === 'fr' ? websiteType.descFr : websiteType.descEn
    }
}

export default async function WebsiteTypePage({ params }: WebsiteTypePageProps) {
  const { locale, slug } = await params
  const t = translations[locale as Locale] || translations.en

  // 1. Fetch the specific website type
  let websiteType = await prisma.websiteType.findUnique({
    where: { slug }
  })
  
  if (!websiteType) {
      const defaultType = (DEFAULT_WEBSITE_TYPES as any[]).find(t => t.slug === slug)
      if (defaultType) {
          websiteType = {
              ...defaultType,
              imageUrl: null,
              createdAt: new Date(),
              updatedAt: new Date(),
          }
      }
  }

  // 2. Fetch related portfolio projects (e.g. matching category or explicit type)
  // Since we don't have a direct relation yet, we can try matching by some string similarity or simply fetch all and filter, 
  // or use the 'category' field if it align with website types.
  // In the 'check_types.js' we saw 'hafouzli9 yakoul bzoz', which suggests 'websiteType' string in PortfolioProject might be arbitrary.
  // We will try to find projects where `websiteType` matches the titleEn or slug loosely, or fallback to fetching any if needed for demo.
  // For now, let's look for projects where `websiteType` contains substring of the type title or slug.
  
  // Note: Prisma string filter contains is case insensitive in Postgres usually.
  let relatedProjects: any[] = []
  
  if (websiteType) {
      // 1. Try to find specifically related projects
      // We improve matching by checking category against slug and title parts
      const titleFirstWord = websiteType.titleEn.split(' ')[0]; // e.g. "E-commerce" from "E-commerce Website"
      
      relatedProjects = await prisma.portfolioProject.findMany({
          where: {
              isVisible: true,
              OR: [
                  // Match explicit websiteType field in project
                  { websiteType: { contains: websiteType.titleEn, mode: 'insensitive' as const } },
                  { websiteType: { contains: websiteType.slug, mode: 'insensitive' as const } },
                  // Match category field in project
                  { category: { equals: websiteType.slug, mode: 'insensitive' as const } as any }, // casting as any to avoid strict union issues if needed, or better:
                  { category: { contains: websiteType.slug, mode: 'insensitive' as const } }, // Substring slug match
                  { category: { contains: titleFirstWord, mode: 'insensitive' as const } }, // Title part match
                  // Map specific common variations if needed
                  ...(websiteType.slug === 'business' ? [{ category: { contains: 'Unique', mode: 'insensitive' as const } }, { category: { contains: 'Corporate', mode: 'insensitive' as const } }] : []),
                  ...(websiteType.slug === 'one-page' ? [{ category: { contains: 'Landing', mode: 'insensitive' as const } }] : [])
              ]
          },
          take: 4,
          orderBy: { order: 'asc' }
      })
  }

  // Handle fallback if not in DB (only for critical path if user hasn't seeded DB)
  if (!websiteType) {
     return notFound()
  }

  // Handle fallback if not in DB (only for critical path if user hasn't seeded DB)
  if (!websiteType) {
     return notFound()
  }

  return (
    <WebsiteTypeClient
      locale={locale as Locale}
      translations={t}
      websiteType={websiteType}
      relatedProjects={relatedProjects}
    />
  )
}
