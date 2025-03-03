import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isAuth = request.cookies.has("next-auth.session-token");
  console.log("middleware isAuth", isAuth);

  if (request.nextUrl.pathname.startsWith("/admin") && isAuth) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/admin") && !isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
