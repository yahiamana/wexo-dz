import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'
import { z } from 'zod'

const serviceSchema = z.object({
  icon: z.string(),
  titleEn: z.string().min(1),
  titleFr: z.string().min(1),
  titleAr: z.string().min(1),
  descEn: z.string().min(1),
  descFr: z.string().min(1),
  descAr: z.string().min(1),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
})

// GET - Get all services (public)
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })
    
    return NextResponse.json(services)
  } catch (error) {
    console.error('Services fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

// POST - Create service (admin only)
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
    const data = serviceSchema.parse(body)
    
    const service = await prisma.service.create({ data })
    
    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Service creation error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
