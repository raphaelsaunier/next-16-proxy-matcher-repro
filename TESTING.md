# Middleware/Proxy Testing Guide

This guide explains how to test the middleware proxy behavior with the newly created test pages.

## Test Pages Created

1. **`/pages/scoped/[scope]/index.tsx`** - For paths starting with `/beta`
2. **`/pages/scopes/[scope]/index.tsx`** - For regular (non-beta) paths
3. **`/pages/api/test.ts`** - API route to verify middleware exclusion

## How the Middleware Works

The middleware in `src/proxy.ts`:
- Extracts scope from subdomain (based on `FALLBACK_SCOPES` mapping)
- Rewrites requests based on path:
  - Paths starting with `/beta` → `/scoped/{scope}`
  - Other paths → `/scopes/{scope}`
- Excludes `/api` routes from middleware processing

## Testing Scenarios

### 1. Test Regular Path (uses /scopes)

Visit: `http://localhost:3000/`

Expected behavior:
- Middleware determines scope from subdomain (or defaults to "default")
- Request is rewritten to `/scopes/default/`
- You should see a green-themed page showing scope information

### 2. Test Beta Path (uses /scoped)

Visit: `http://localhost:3000/beta/test`

Expected behavior:
- Middleware detects `/beta` prefix
- Request is rewritten to `/scoped/default/test`
- You should see a blue-themed page showing scope information

### 3. Test API Route (excluded from middleware)

Visit: `http://localhost:3000/api/test`

Expected behavior:
- API route is accessed directly without middleware rewriting
- Returns JSON with `middlewareExecuted: false`
- Shows all request headers and metadata

### 4. Test with Different Subdomains

If you have subdomains configured:

- `http://foo.localhost:3000/` → scope: "foo"
- `http://www.localhost:3000/` → scope: "default"

## Verifying Middleware Behavior

Each test page displays:
- ✅ Current scope extracted from subdomain
- ✅ Request headers (including middleware-specific headers)
- ✅ Current path and timestamp
- ✅ Test links to navigate between different scenarios

## Environment Setup

Make sure to set the following environment variables:
```bash
DEBUG_MIDDLEWARE=true  # Enable middleware debug logging
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000  # Or your domain
```

## Expected Console Output (when DEBUG=true)

```
host localhost:3000
process.env.NEXT_PUBLIC_ROOT_DOMAIN undefined
Rewriting / to /scopes/default
```

## Troubleshooting

- If pages return 404, ensure the middleware is properly configured
- Check that `src/middleware.ts` exists and exports the proxy
- Verify matcher configuration excludes API routes correctly
- Enable DEBUG_MIDDLEWARE to see detailed rewrite logs

