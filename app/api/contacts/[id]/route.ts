import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'

// DELETE - Delete a contact (admin only)
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
    
    await prisma.contactMessage.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact delete error:', error)
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}

// PATCH - Mark as read (admin only)
export async function PATCH(
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
    
    const contact = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: body.isRead ?? true },
    })
    
    return NextResponse.json(contact)
  } catch (error) {
    console.error('Contact update error:', error)
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}
