import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyToken, getTokenFromCookies } from '@/lib/auth'

// PUT - Update website type (admin only)
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
    
    // Map simple Admin fields to multilingual DB fields
    // This allows the simplified 'PricingPage' form to update the complex 'WebsiteType' model
    const updateData = {
      titleEn: body.name,
      titleFr: body.name, // In real world we'd want specific fields
      titleAr: body.name,
      descEn: body.description,
      descFr: body.description,
      descAr: body.description,
      priceUSD: body.priceUSD,
      priceEUR: body.priceEUR,
      priceDZD: body.priceDZD,
      featuresEn: body.features,
      featuresFr: body.features,
      featuresAr: body.features,
      isPopular: body.isPopular,
      isActive: body.isActive
    }

    const type = await prisma.websiteType.update({
      where: { id },
      data: updateData,
    })
    
    return NextResponse.json(type)
  } catch (error) {
    console.error('Website type update error:', error)
    return NextResponse.json({ error: 'Failed to update website type' }, { status: 500 })
  }
}

// DELETE - Delete website type (admin only)
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
    
    await prisma.websiteType.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Website type delete error:', error)
    return NextResponse.json({ error: 'Failed to delete website type' }, { status: 500 })
  }
}
