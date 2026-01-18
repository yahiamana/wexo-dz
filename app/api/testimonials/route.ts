import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'
import { z } from 'zod'

const testimonialSchema = z.object({
  clientName: z.string().min(1),
  profession: z.string().min(1),
  feedbackEn: z.string().min(1),
  feedbackFr: z.string().min(1),
  feedbackAr: z.string().min(1),
  rating: z.number().min(1).max(5).optional(),
  avatarUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
})

// GET - Get all testimonials (public)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

// POST - Create testimonial (admin only)
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
    const data = testimonialSchema.parse(body)
    
    const testimonial = await prisma.testimonial.create({ data })
    
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Testimonial creation error:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
