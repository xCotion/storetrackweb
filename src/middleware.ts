import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

// Utility to match protected paths
const protectedPaths = [
  '/dashboard',
  '/consultant', // actual runtime path from (protected)/consultant
  // add other protected paths here
]

const isProtectedPath = (path: string) => {
  return protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  )
}

export async function middleware(request: NextRequest) {
  console.log('\n🔍 Request:', {
    url: request.url,
    path: request.nextUrl.pathname
  })
  
  // Update session first
  const response = await updateSession(request)
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.delete({
            name,
            ...options,
          })
          response.cookies.delete({
            name,
            ...options,
          })
        },
      },
    }
  )

  // Check auth status
  const { data: { session } } = await supabase.auth.getSession()
  
  // Check if current path is protected
  const isProtected = isProtectedPath(request.nextUrl.pathname)

  console.log('🔒 Auth Check:', {
    path: request.nextUrl.pathname,
    isProtected,
    hasSession: !!session,
    cookies: request.cookies.getAll().map(c => c.name)
  })

  if (isProtected && !session) {
    console.log('⛔ Access Denied - Redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log('✅ Access Granted')
  return response
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}