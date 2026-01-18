import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const locales = ['en', 'fr', 'ar']
  
  const routes = [
    '',
    '/portfolio',
    '/pricing',
    '/contact',
    '/services',
    '/about'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add base routes for each locale
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemapEntries
}
