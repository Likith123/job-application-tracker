import { getSession } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  // middleware.ts was named as proxy.ts from Next.js 16 onwards
  const { pathname } = req.nextUrl;

  const authPages = ["/", "/sign-in", "/sign-up"];
  const protectedPages = ["/dashboard", "/api/jobs", "/api/jobs/*"];

  const session = await getSession();

  if (session && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!session && protectedPages.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard",
    "/dashboard/:status",
    "/api/jobs",
    "/api/jobs/:path*",
  ],
};
