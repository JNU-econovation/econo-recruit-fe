import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CURRENT_GENERATION } from "@/src/constants";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("accessToken")?.value;

  //로그인이 되어있다면 signin, signup 페이지로 접근하지 못하게 막음
  if (request.nextUrl.pathname.startsWith("/signin") && cookie)
    return NextResponse.redirect(new URL("/", request.url));
  if (request.nextUrl.pathname.startsWith("/signup") && cookie)
    return NextResponse.redirect(new URL("/", request.url));

  //로그인이 되어있지 않다면 admin, applicant, interview, kanban 페이지 접근시 최근 기수 페이지로 이동
  if (request.nextUrl.pathname.endsWith("/admin") && cookie)
    return NextResponse.redirect(
      new URL(`/admin/${CURRENT_GENERATION}`, request.url)
    );
  if (request.nextUrl.pathname.endsWith("/applicant") && cookie)
    return NextResponse.redirect(
      new URL(`/applicant/${CURRENT_GENERATION}`, request.url)
    );
  if (request.nextUrl.pathname.endsWith("/interview") && cookie)
    return NextResponse.redirect(
      new URL(`/interview/${CURRENT_GENERATION}`, request.url)
    );
  if (request.nextUrl.pathname.endsWith("/kanban") && cookie)
    return NextResponse.redirect(
      new URL(`/kanban/${CURRENT_GENERATION}`, request.url)
    );
  return NextResponse.next();
}
