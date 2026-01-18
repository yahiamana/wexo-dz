import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'

// PUT - Update service (admin only)
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
    
    const service = await prisma.service.update({
      where: { id },
      data: body,
    })
    
    return NextResponse.json(service)
  } catch (error) {
    console.error('Service update error:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

// DELETE - Delete service (admin only)
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
    
    await prisma.service.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Service delete error:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
