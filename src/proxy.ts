import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("adminToken")?.value;
  const jwtSecret = process.env.JWT_SECRET;
  const isPublicApiRoute = pathname === "/api/login";

  let hasValidToken = false;
  if (token && jwtSecret) {
    try {
      jwt.verify(token, jwtSecret);
      hasValidToken = true;
    } catch {
      hasValidToken = false;
    }
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    if (isPublicApiRoute) {
      return NextResponse.next();
    }

    if (req.method !== "GET" && !hasValidToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!hasValidToken) {
      const loginUrl = new URL("/admin/login", req.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("adminToken");
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
