import { MetadataRoute } from 'next'
import prisma from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wexo-dz.vercel.app'
  const locales = ['en', 'fr', 'ar']
  
  // 1. Static Routes
  const staticRoutes = [
    '',
    '/portfolio',
    '/pricing',
    '/contact',
    '/services',
    '/about',
    '/testimonials'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add static routes
  locales.forEach(locale => {
    staticRoutes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  // 2. Dynamic Routes: Portfolio Projects
  try {
    const projects = await prisma.portfolioProject.findMany({
      where: { isVisible: true },
      select: { slug: true, updatedAt: true }
    })

    if (projects.length > 0) {
      locales.forEach(locale => {
        projects.forEach(project => {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/portfolio/${project.slug}`,
            lastModified: project.updatedAt,
            changeFrequency: 'monthly',
            priority: 0.7,
          })
        })
      })
    }
  } catch (error) {
    console.error('Sitemap: Failed to fetch projects', error)
  }

  // 3. Dynamic Routes: Website Types (Pricing Details)
  try {
      const types = await prisma.websiteType.findMany({
          where: { isActive: true },
          select: { slug: true, updatedAt: true }
      })

      if (types.length > 0) {
          locales.forEach(locale => {
              types.forEach(type => {
                  sitemapEntries.push({
                      url: `${baseUrl}/${locale}/pricing/${type.slug}`,
                      lastModified: type.updatedAt,
                      changeFrequency: 'weekly',
                      priority: 0.9,
                  })
              })
          })
      }
  } catch (error) {
      console.error('Sitemap: Failed to fetch website types', error)
  }

  return sitemapEntries
}
