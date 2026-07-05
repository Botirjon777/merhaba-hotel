import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Expose the current path so layouts/pages can build correct hreflang links.
  request.headers.set("x-pathname", request.nextUrl.pathname);
  const response = handleI18nRouting(request);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: [
    "/",
    "/(uz|ru|en)/:path*",
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
