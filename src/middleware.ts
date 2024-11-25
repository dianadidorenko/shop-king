import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const encryptedToken = req.cookies.get("token")?.value || "";
  const { pathname, origin } = req.nextUrl;
  const isDashboardRoutes = pathname.startsWith("/dashboard");

  if (!encryptedToken) {
    if (isDashboardRoutes) return NextResponse.redirect(`${origin}/login`);
  } else {
    const decoded: any = jwtDecode(encryptedToken);

    if (isDashboardRoutes && decoded?.role !== "admin") {
      return NextResponse.redirect(`${origin}`);
    }

    if (pathname === "/login" && decoded) {
      if (isDashboardRoutes && decoded?.role !== "admin") {
        return NextResponse.redirect(`${origin}`);
      }
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }
  return NextResponse.next();
}
