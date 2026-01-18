import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'

// PUT - Update project (admin only)
// PUT - Update project (admin only)
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
    
    // Map simple fields to multilingual database columns
    // We assume the body comes from our frontend form with title, description, category, etc.
    const project = await prisma.portfolioProject.update({
      where: { id },
      data: {
        titleEn: body.title,
        titleFr: body.title,
        titleAr: body.title,
        descEn: body.description,
        descFr: body.description,
        descAr: body.description,
        ...(body.slug && { slug: body.slug }),
        ...(body.client && { client: body.client }),
        ...(body.websiteType && { websiteType: body.websiteType }),
        ...(body.category && { category: body.category }),
        ...(body.imageUrl && { imageUrl: body.imageUrl }),
        ...(body.projectUrl !== undefined && { liveUrl: body.projectUrl }),
        ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
        ...(body.isActive !== undefined && { isVisible: body.isActive }),
        ...(body.tags && { technologies: body.tags }),
        ...(body.features && { featuresEn: body.features, featuresFr: body.features, featuresAr: body.features }),
        ...(body.content && { contentEn: body.content, contentFr: body.content, contentAr: body.content }),
      },
    })
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Project update error:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// DELETE - Delete project (admin only)
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
    
    await prisma.portfolioProject.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Project delete error:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
