import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'
import { z } from 'zod'

const websiteTypeSchema = z.object({
  slug: z.string().min(1),
  titleEn: z.string().min(1),
  titleFr: z.string().min(1),
  titleAr: z.string().min(1),
  descEn: z.string().min(1),
  descFr: z.string().min(1),
  descAr: z.string().min(1),
  featuresEn: z.array(z.string()),
  featuresFr: z.array(z.string()),
  featuresAr: z.array(z.string()),
  priceUSD: z.number(),
  priceEUR: z.number(),
  priceDZD: z.number(),
  icon: z.string(),
  isPopular: z.boolean().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
})

import { slugify } from '@/lib/utils'

// GET - Get all website types (public)
export async function GET() {
  try {
    const types = await prisma.websiteType.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    
    // Map back to simplified structure for Admin if needed? 
    // No, Admin expects DB structure mostly, but map 'name' for display
    const mappedTypes = types.map(t => ({
      ...t,
      name: t.titleEn, // Use English title as 'name'
      description: t.descEn,
      features: t.featuresEn // Use En features
    }))
    
    return NextResponse.json(mappedTypes)
  } catch (error) {
    console.error('Pricing fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 })
  }
}

// POST - Create website type (admin only)
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
    
    // Auto-map simple fields from Admin Form to Multilingual schema
    const mappedBody = {
      slug: body.slug || slugify(body.name),
      titleEn: body.name,
      titleFr: body.name,
      titleAr: body.name,
      descEn: body.description,
      descFr: body.description,
      descAr: body.description,
      featuresEn: body.features || [],
      featuresFr: body.features || [],
      featuresAr: body.features || [],
      priceUSD: body.priceUSD,
      priceEUR: body.priceEUR,
      priceDZD: body.priceDZD,
      icon: body.icon || 'star', // Default icon
      isPopular: body.isPopular,
      isActive: body.isActive,
      order: body.order || 0
    }

    const data = websiteTypeSchema.parse(mappedBody)
    
    const type = await prisma.websiteType.create({ data })
    
    return NextResponse.json(type, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Website type creation error:', error)
    return NextResponse.json({ error: 'Failed to create website type' }, { status: 500 })
  }
}
