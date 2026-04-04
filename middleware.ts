import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken, ADMIN_COOKIE } from "@/lib/utils/admin-auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes — allow /admin/login through
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    const isValid = await verifySessionToken(token)

    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url)
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("from", pathname)
      }
      return NextResponse.redirect(loginUrl)
    }
  }

  // If already logged in and visiting /admin/login, redirect to dashboard
  if (pathname === "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    if (await verifySessionToken(token)) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  // Tag admin requests so the root layout can hide the public Nav/Footer
  const response = NextResponse.next()
  if (pathname.startsWith("/admin")) {
    response.headers.set("x-is-admin", "1")
  }
  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
