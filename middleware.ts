import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE: Middleware này hiện tại không check authentication vì auth state 
// được lưu trong localStorage (client-side only).
// Protection được xử lý bởi client-side routing trong các page components.

export function middleware(request: NextRequest) {
  // Chỉ để placeholder, không block routes
  // Client-side protection sẽ handle việc redirect
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
