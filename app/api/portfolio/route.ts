import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  projectUrl: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  client: z.string().optional(),
  websiteType: z.string().optional(),
  features: z.array(z.string()).optional(),
  slug: z.string().optional(),
})

// GET - Get all projects (public)
export async function GET() {
  try {
    const projects = await prisma.portfolioProject.findMany({
      orderBy: { order: 'asc' },
    })
    
    // Map database fields to simpler frontend fields
    const mapped = projects.map(p => ({
      id: p.id,
      title: p.titleEn,
      description: p.descEn,
      imageUrl: p.imageUrl,
      projectUrl: p.liveUrl,
      tags: p.technologies, // Map technologies back to tags for frontend compatibility
      category: p.category,
      isFeatured: p.isFeatured,
      isActive: p.isVisible, // Map isVisible to isActive
      slug: p.slug,
      client: p.client,
      websiteType: p.websiteType,
      features: p.featuresEn,
    }))
    
    return NextResponse.json(mapped)
  } catch (error) {
    console.error('Portfolio fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
  }
}

// POST - Create project (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromCookies(request.headers.get('cookie'))
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    const body = await request.json()
    const data = projectSchema.parse(body)
    
    // Map simple fields to multilingual database columns
    const project = await prisma.portfolioProject.create({
      data: {
        slug: data.slug || (data.title.toLowerCase().replace(/ /g, '-') + '-' + Date.now()).replace(/[^a-z0-9-]/g, ''),
        titleEn: data.title,
        titleFr: data.title,
        titleAr: data.title,
        descEn: data.description,
        descFr: data.description,
        descAr: data.description,
        client: data.client || 'Client Name',
        industry: 'Industry', // Default
        websiteType: data.websiteType || data.category || 'Website',
        category: data.category || data.tags?.[0] || 'General',
        imageUrl: data.imageUrl,
        galleryImages: [],
        liveUrl: data.projectUrl || null,
        isFeatured: data.isFeatured ?? false,
        isVisible: data.isActive ?? true,
        technologies: data.tags || [],
        featuresEn: data.features || [],
        featuresFr: data.features || [],
        featuresAr: data.features || [],
      }
    })
    
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Project creation error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

