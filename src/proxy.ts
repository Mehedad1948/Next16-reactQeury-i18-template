import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

// 1. Define routes that do NOT require authentication
const publicRoutes = ["/auth/login", "/auth/signup", "/", "/about"];

// 2. Define routes that MUST require authentication
// (Any route starting with these will be protected)
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

// 3. Initialize next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- HELPER: Handle Locale Paths ---
  // We need to check the path ignoring the locale (e.g., /en/dashboard -> /dashboard)
  // Assuming your locales are 2 characters (en, fa, etc.)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  // --- AUTHENTICATION LOGIC ---

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  if (isProtectedRoute) {
    // 1. Read the token specifically from the "session" key as requested
    const token = request.cookies.get("session")?.value;

    // 2. Verify the session
    const session = await verifySession(token);

    // 3. If invalid or missing, redirect to login
    if (!session) {
      const locale = request.cookies.get("NEXT_LOCALE")?.value || "fa"; // Default to 'fa' or your default
      const loginUrl = new URL(`/${locale}/auth/login`, request.url);
      
      // Optional: Add redirect param so you can send them back after login
      loginUrl.searchParams.set("redirect", pathWithoutLocale);
      
      return NextResponse.redirect(loginUrl);
    }
    
    // Optional: If valid, you can set headers here for the server components
    // request.headers.set('x-user-id', session.userId);
  }

  // --- INTERNATIONALIZATION LOGIC ---
  
  // If we passed the Auth check (or it was a public route),
  // we let next-intl handle the localization and response.
  return intlMiddleware(request);
}

export const config = {
  // Skip all internal Next.js paths, API routes, and static files
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
