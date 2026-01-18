import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'

// PUT - Update testimonial (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = getTokenFromCookies(request.headers.get('cookie'))
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    const { id } = await params
    const body = await request.json()
    
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: body,
    })
    
    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Testimonial update error:', error)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

// DELETE - Delete testimonial (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = getTokenFromCookies(request.headers.get('cookie'))
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    const { id } = await params
    
    await prisma.testimonial.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Testimonial delete error:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
