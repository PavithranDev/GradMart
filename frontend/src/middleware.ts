import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Private routes that require login
const privateRoutes = [
  '/dashboard',
  '/wishlist',
  '/checkout',
  '/payment',
  '/seller',
  '/admin',
];

// Routes that logged-in users shouldn't access
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Auth.js Express backend uses 'authjs.session-token' cookie
  // Check all possible cookie names
  const sessionCookie = 
    request.cookies.get('authjs.session-token') || 
    request.cookies.get('__Secure-authjs.session-token') ||
    request.cookies.get('next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token');
    
  const isLoggedIn = !!sessionCookie;

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Not logged in trying to access private route → redirect to login
  if (isPrivateRoute && !isLoggedIn) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname + request.nextUrl.search);
    return NextResponse.redirect(redirectUrl);
  }

  // Logged in user trying to access login/register → let them through
  // (Role-based redirect is handled by the login page itself)
  // We DON'T redirect here because we don't know the role in middleware without API call
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
