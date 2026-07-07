import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic middleware to protect /admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/admin')) {
    // In a real application, check for valid session token here
    const token = request.cookies.get('admin-token')?.value
    
    // For this audit, we'll implement a simple bypass flag in cookies
    // Or just let it pass if we are in development, but for security audit
    // we should enforce the presence of a token or a mock query param
    
    // If we want to strictly lock it down but still be able to preview,
    // we can use a mock token check.
    const hasAccess = request.cookies.has('mobilehub_admin_access') || process.env.NODE_ENV === 'development';
    
    if (!hasAccess) {
      // Redirect to homepage or login if unauthorized
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// Only run middleware on /admin routes
export const config = {
  matcher: ['/admin/:path*'],
}
