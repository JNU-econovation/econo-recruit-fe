import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("accessToken")?.value;

  if (request.nextUrl.pathname.startsWith("/signin") && cookie)
    return NextResponse.redirect(new URL("/", request.url));

  if (request.nextUrl.pathname.startsWith("/signup") && cookie)
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}
