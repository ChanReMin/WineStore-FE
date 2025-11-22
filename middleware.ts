import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Các route cần bảo vệ
const protectedRoutes = ["/profile", "/orders", "/seller"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Lấy auth state từ localStorage (client-side check)
  // Note: Middleware chạy trên server, nên cần check token từ cookie hoặc header
  const authCookie = request.cookies.get("auth-storage");
  
  let isAuthenticated = false;
  if (authCookie) {
    try {
      const authData = JSON.parse(authCookie.value);
      isAuthenticated = authData?.state?.isAuthenticated || false;
    } catch (e) {
      isAuthenticated = false;
    }
  }

  // Redirect về login nếu truy cập protected route mà chưa đăng nhập
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect về home nếu đã đăng nhập mà vào trang login/register
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

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
