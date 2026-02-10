import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const locales = ['en', 'fr', 'ar']
const defaultLocale = 'en'

function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]
  return locales.includes(potentialLocale) ? potentialLocale : null
}

function getPreferredLocale(request: NextRequest): string {
  // Check cookie first
  const localeCookie = request.cookies.get('locale')?.value
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie
  }
  
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => {
      const [code] = lang.trim().split(';')
      return code.split('-')[0].toLowerCase()
    })
    
    for (const lang of languages) {
      if (lang === 'ar') return 'ar'
      if (lang === 'fr') return 'fr'
      if (lang === 'en') return 'en'
    }
  }
  
  return defaultLocale
}

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip admin routes, API routes, and static files
  // Check for Admin Authentication
  if (pathname.startsWith('/admin')) {
    // Allow login page and public assets
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login') || pathname.startsWith('/_next')) {
      return NextResponse.next()
    }

    // specific check for login page to avoid redirect loops if logic fails
    if (pathname === '/admin' || pathname === '/admin/') {
       return NextResponse.redirect(new URL('/admin/login', request.url));
    }


    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Strict JWT verification
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'fallback-secret-change-in-production'
      )
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch (error) {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin-token')
      return response
    }
  }
  
  // Skip API routes, and static files (but do NOT skip admin anymore, handled above)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Check if locale is in path
  const pathnameLocale = getLocaleFromPath(pathname)
  
  if (pathnameLocale) {
    // Locale is already in path, continue
    return NextResponse.next()
  }
  
  // No locale in path, redirect to preferred locale
  const locale = getPreferredLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (like images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
