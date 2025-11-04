# Middleware/Proxy Testing Guide

This guide explains how to test the middleware proxy behavior with the newly created test pages.

## Test Pages Created (App Router)

### Scoped Routes (for /beta paths)
1. **`app/scoped/[scope]/page.tsx`** - Main scoped page
2. **`app/scoped/[scope]/test/page.tsx`** - Beta test route
3. **`app/scoped/[scope]/nested/deep/page.tsx`** - Deep nested beta route

### Scopes Routes (for regular paths)
4. **`app/scopes/[scope]/page.tsx`** - Main scopes page
5. **`app/scopes/[scope]/test/page.tsx`** - Regular test route
6. **`app/scopes/[scope]/about/page.tsx`** - About page
7. **`app/scopes/[scope]/products/[id]/page.tsx`** - Dynamic nested route
8. **`app/scopes/[scope]/p/pricing/page.tsx`** - Prismic pricing page
9. **`app/scopes/[scope]/p/contact/page.tsx`** - Prismic contact page

### API Routes
10. **`app/api/test/route.ts`** - API route to verify middleware exclusion
11. **`app/api/health/route.ts`** - Simple health check endpoint

## How the Middleware Works

The middleware in `proxy.ts` (Next.js 16 format):
- Extracts scope from subdomain (based on `FALLBACK_SCOPES` mapping)
- Rewrites requests based on path:
  - Paths starting with `/beta` → `/scoped/{scope}`
  - Other paths → `/scopes/{scope}`
  - Special handling for Prismic pages (`/pricing`, `/contact`) → `/scopes/{scope}/p/{page}`
- Excludes `/api` routes from middleware processing
- Blocks direct access to `/scopes/*` paths

## Testing Scenarios

### 1. Test Regular Path (uses /scopes)

Visit: `http://localhost:3000/`

Expected behavior:
- Middleware determines scope from subdomain (or defaults to "default")
- Request is rewritten to `/scopes/default`
- You should see a green-themed page showing scope information

### 2. Test Beta Path (uses /scoped)

Visit: `http://localhost:3000/beta/test`

Expected behavior:
- Middleware detects `/beta` prefix
- Request is rewritten to `/scoped/default/test`
- You should see a purple-themed page showing scope information

### 3. Test Deep Nested Beta Path

Visit: `http://localhost:3000/beta/nested/deep`

Expected behavior:
- Deeply nested path is correctly handled
- Request is rewritten to `/scoped/default/nested/deep`
- Orange-themed page confirms deep nesting works

### 4. Test Dynamic Route with Multiple Parameters

Visit: `http://localhost:3000/products/laptop`

Expected behavior:
- Multiple dynamic segments work correctly
- Request is rewritten to `/scopes/default/products/laptop`
- Red-themed page shows both scope and product ID

### 5. Test Prismic Pages (Special Handling)

Visit: `http://localhost:3000/pricing`

Expected behavior:
- Prismic pages get special `/p` prefix (only for default scope)
- Request is rewritten to `/scopes/default/p/pricing`
- Purple-themed pricing page displays

### 6. Test API Route (excluded from middleware)

Visit: `http://localhost:3000/api/test`

Expected behavior:
- API route is accessed directly without middleware rewriting
- Returns JSON with `middlewareExecuted: false`
- Shows note: "✓ Middleware correctly excluded this /api route"

### 7. Test Blocked Direct Access

Visit: `http://localhost:3000/scopes/default`

Expected behavior:
- Direct access to `/scopes/*` is blocked by middleware
- Should return 404 page
- Console shows: "Blocking direct access to /scopes/..."

### 8. Test with Different Subdomains

If you have subdomains configured:

- `http://foo.localhost:3000/` → scope: "foo"
- `http://www.localhost:3000/` → scope: "default"

You can test by updating your `/etc/hosts` file:
```
127.0.0.1 foo.localhost
127.0.0.1 www.localhost
```

## Verifying Middleware Behavior

Each test page displays:
- ✅ Current scope extracted from subdomain
- ✅ Request headers (including middleware-specific headers)
- ✅ Current path and timestamp
- ✅ Test links to navigate between different scenarios
- ✅ Color-coded pages for easy visual identification

## Environment Setup

Make sure to set the following environment variables:
```bash
# Enable middleware debug logging (already enabled in proxy.ts)
DEBUG=true

# Set your root domain
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000  # Or your domain
```

## Expected Console Output (when DEBUG=true)

```
host localhost:3000
process.env.NEXT_PUBLIC_ROOT_DOMAIN undefined
Rewriting / to /scopes/default
Rewriting /beta/test to /scoped/default/test
Rewriting /pricing to /scopes/default/p/pricing
```

## Middleware Configuration

The matcher in `proxy.ts` excludes:
- `/api` routes
- `/api2` routes  
- `/_next/` (Next.js internals)
- `/_static/` (static files)
- `/_vercel` (Vercel internals)
- `/.well-known` (well-known URIs)
- Static file patterns (images, fonts, etc.)

## Troubleshooting

- If pages return 404, ensure `proxy.ts` has the correct export configuration
- Verify matcher configuration excludes API routes correctly
- Check console for DEBUG logs to see rewrite behavior
- Ensure app directory structure matches the expected routes
- For subdomain testing, make sure DNS/hosts file is configured correctly

