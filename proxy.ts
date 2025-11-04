import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SCOPE = "default";
const LOCALHOST = "localhost:3000";
const DEBUG = true;

// Fallback scopes mapping if Edge Config is not available
const FALLBACK_SCOPES = {
  www: "default",
  foo: "foo",
};

// Routes for which the global version takes precedence
const PRISMIC_PAGES = "^/(pricing|contact)/?$";

// Export for backward compatibility (will use fallback)
export const scopesBySubdomain = FALLBACK_SCOPES;

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * - /api routes
     * - /_next (Next.js internals)
     * - /_static (inside /public)
     * - static files inside /subdir
     * - all root files inside /public (e.g. /favicon.ico)
     */
    "/", // Required for i18n to work
    "/((?!api|api2|_next/|_static/|_vercel|.well-known|fonts|images|favicon|icons|img|[\\w-]+\\.\\w+).*)",
  ],
};

async function normalizeHost(req: NextRequest) {
  const host = req.headers.get("host")!;
  DEBUG && console.log("host", host);
  DEBUG &&
    console.log(
      "process.env.NEXT_PUBLIC_ROOT_DOMAIN",
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    );

  return host
    .replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    .replace(`.${LOCALHOST}`, "")
    .replace(LOCALHOST, "www");
}

export default async function proxy(req: NextRequest) {
  const { nextUrl: url } = req;

  // Skip middleware for Next.js internals
  if (url.pathname.startsWith("/__nextjs_original-stack-frame")) {
    return NextResponse.next();
  }

  const host = await normalizeHost(req);
  const scope =
    scopesBySubdomain[host as keyof typeof scopesBySubdomain] || DEFAULT_SCOPE;

  if (!scope) {
    url.pathname = `/404`;
    DEBUG && console.log(`Invalid subdomain ${host}`);
    return NextResponse.rewrite(url);
  }

  let { pathname } = url;
  if (pathname.startsWith(`/scopes`)) {
    url.pathname = `/404`;
    DEBUG && console.log(`Blocking direct access to ${pathname}`);
    return NextResponse.rewrite(url);
  }

  // Until vercel/next.js#64880 we need to distinct folders for pages and app router views
  const scopeDir = pathname.startsWith("/beta") ? "scoped" : "scopes";

  const rewrittenPathname = `/${scopeDir}/${scope}${
    pathname === "/"
      ? ""
      : pathname.match(PRISMIC_PAGES) && scope === "default"
      ? "/p" + pathname
      : pathname
  }`;
  url.pathname = rewrittenPathname;
  DEBUG && console.log(`Rewriting ${pathname} to ${rewrittenPathname}`);
  return NextResponse.rewrite(url);
}
