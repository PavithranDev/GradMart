import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: Route protection is handled client-side in each layout.
// This is because our auth session cookie is set by the Express backend on localhost:4000,
// and is NOT accessible to Next.js middleware running on localhost:3000 (different origin/port).
// The backend APIs are all protected server-side and return 401/403 if unauthenticated.

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

