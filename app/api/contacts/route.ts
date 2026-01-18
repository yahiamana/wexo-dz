import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'
import { rateLimit } from '@/lib/rate-limit'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  businessType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

// POST - Create new contact message (public)
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate Limit: 5 requests per minute
    if (!rateLimit(ip, 5, 60000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const data = contactSchema.parse(body)
    
    // Sanitize input
    const cleanMessage = DOMPurify.sanitize(data.message)
    const cleanName = DOMPurify.sanitize(data.name)
    const cleanEmail = data.email ? DOMPurify.sanitize(data.email) : null
    
    const contact = await prisma.contactMessage.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: data.phone || null,
        businessType: data.businessType || null,
        message: cleanMessage,
      },
    })
    
    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }
    console.error('Contact creation error:', error)
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 })
  }
}

// GET - Get all contacts (admin only)
export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromCookies(request.headers.get('cookie'))
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Contacts fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
