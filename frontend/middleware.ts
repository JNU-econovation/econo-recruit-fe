import { NextRequest, NextResponse } from "next/server";
import { CURRENT_GENERATION } from "./src/constants";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const redirectUrl = (url: string) => {
    return NextResponse.redirect(new URL(url, request.url));
  };
  const needValidatePath = ["/admin", "/applicant", "/interview", "/kanban"];
  const isRedirectPath = needValidatePath.includes(request.nextUrl.pathname);
  if (isRedirectPath)
    return redirectUrl(`${request.nextUrl.pathname}/${CURRENT_GENERATION}`);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
