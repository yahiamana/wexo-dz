import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyPassword, createToken, verifyToken, getTokenFromCookies } from '@/lib/auth'

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    
    const admin = await prisma.admin.findUnique({
      where: { email },
    })
    
    // Generic error for security (prevent enumeration)
    const AUTH_ERROR = 'Invalid credentials'

    if (!admin) {
      // Fake delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500))
      return NextResponse.json({ error: AUTH_ERROR }, { status: 401 })
    }
    
    // Check if account is locked
    if (admin.lockedUntil && new Date() < admin.lockedUntil) {
      return NextResponse.json({ 
        error: 'Account locked due to too many failed attempts. Try again later.' 
      }, { status: 423 })
    }

    // Check if lock expired, reset if so
    if (admin.lockedUntil && new Date() > admin.lockedUntil) {
       await prisma.admin.update({
         where: { id: admin.id },
         data: { failedAttempts: 0, lockedUntil: null }
       })
    }
    
    const isValid = await verifyPassword(password, admin.password)
    
    if (!isValid) {
      const newFailedAttempts = (admin.failedAttempts || 0) + 1
      let updateData: any = { failedAttempts: newFailedAttempts }
      
      // Lock if > 5 attempts (lock for 15 mins)
      if (newFailedAttempts >= 5) {
        updateData.lockedUntil = new Date(Date.now() + 15 * 60 * 1000)
      }
      
      await prisma.admin.update({
        where: { id: admin.id },
        data: updateData
      })
      
      return NextResponse.json({ error: AUTH_ERROR }, { status: 401 })
    }
    
    // Success: Reset failures
    await prisma.admin.update({
      where: { id: admin.id },
      data: { failedAttempts: 0, lockedUntil: null }
    })
    
    const token = await createToken({ adminId: admin.id, email: admin.email })
    
    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    })
    
    // Set HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

// GET - Verify token / Get current admin
export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromCookies(request.headers.get('cookie'))
    
    if (!token) {
      return NextResponse.json({ error: 'No token' }, { status: 401 })
    }
    
    const payload = await verifyToken(token)
    
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    
    const admin = await prisma.admin.findUnique({
      where: { id: payload.adminId },
      select: { id: true, email: true, name: true },
    })
    
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 401 })
    }
    
    return NextResponse.json({ admin })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ error: 'Auth check failed' }, { status: 500 })
  }
}

// DELETE - Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  
  return response
}
