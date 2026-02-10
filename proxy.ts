import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for verify-email route
  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  const cookies = request.cookies.getAll();
  const hasSession = cookies.some((c) => c.name.startsWith("better-auth"));

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // // Check for session token in cookies
  // const sessionToken = request.cookies.get("better-auth.session_token");

  // //* User is not authenticated at all
  // if (!sessionToken) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Allow access if session exists
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/seller-dashboard/:path*",
    "/admin-dashboard/:path*",
    "/customer-dashboard/:path*",
  ],
};
