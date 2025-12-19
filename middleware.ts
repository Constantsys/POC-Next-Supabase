import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Simple auth cookie set on successful Supabase login in the browser
    const token = request.cookies.get('token')
    const isLoggedIn = !!token

    // If NOT logged in & trying to access dashboard, redirect to login
    if (!isLoggedIn && pathname.startsWith('/dashboard')) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirectedFrom', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // If already logged in and trying to hit /login, send to dashboard
    if (isLoggedIn && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
}


