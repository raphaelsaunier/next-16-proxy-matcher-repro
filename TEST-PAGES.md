# Test Pages for Middleware/Proxy

This document provides a quick reference for all test pages created to verify middleware behavior.

## 🏠 Starting Point

Visit `http://localhost:3000/dashboard` to see a comprehensive dashboard with all test scenarios.

## 📁 File Structure

```
app/
├── scoped/[scope]/              # Routes for /beta paths
│   ├── page.tsx                 # Main scoped page
│   ├── test/page.tsx            # /beta/test
│   ├── nested/deep/page.tsx     # /beta/nested/deep
│   └── layout.tsx               # Layout for scoped routes
│
├── scopes/[scope]/              # Routes for regular paths
│   ├── page.tsx                 # Main scopes page (root /)
│   ├── test/page.tsx            # /test
│   ├── about/page.tsx           # /about
│   ├── products/[id]/page.tsx   # /products/:id
│   ├── dashboard/page.tsx       # /dashboard (comprehensive test suite)
│   ├── p/
│   │   ├── pricing/page.tsx     # /pricing (Prismic)
│   │   └── contact/page.tsx     # /contact (Prismic)
│   └── layout.tsx               # Layout for scopes routes
│
└── api/                         # API routes (excluded from middleware)
    ├── test/route.ts            # GET/POST /api/test
    └── health/route.ts          # GET /api/health
```

## 🎨 Color Coding

Each test page uses a distinct color scheme for easy visual identification:

- **Blue (#0070f3)** - Scoped routes (/beta paths)
- **Purple (#7c3aed)** - Beta test pages
- **Orange (#ea580c)** - Deep nested beta pages
- **Green (#16a34a)** - Scopes routes (regular paths)
- **Cyan (#0891b2)** - About page
- **Red (#dc2626)** - Product pages
- **Purple (#9333ea)** - Prismic pages

## 🧪 Test Scenarios

### ✅ Regular Path Routing
- `GET /` → rewrites to `/scopes/default`
- `GET /test` → rewrites to `/scopes/default/test`
- `GET /about` → rewrites to `/scopes/default/about`

### ✅ Beta Path Routing
- `GET /beta/test` → rewrites to `/scoped/default/test`
- `GET /beta/nested/deep` → rewrites to `/scoped/default/nested/deep`

### ✅ Dynamic Routes
- `GET /products/laptop` → rewrites to `/scopes/default/products/laptop`
- `GET /products/phone` → rewrites to `/scopes/default/products/phone`

### ✅ Prismic Pages (Special Handling)
- `GET /pricing` → rewrites to `/scopes/default/p/pricing` (only for default scope)
- `GET /contact` → rewrites to `/scopes/default/p/contact` (only for default scope)

### ✅ API Routes (No Rewrite)
- `GET /api/test` → returns JSON, no middleware rewrite
- `GET /api/health` → returns JSON, no middleware rewrite

### ✅ Blocked Direct Access
- `GET /scopes/default` → returns 404
- `GET /scopes/foo/test` → returns 404

### ✅ Subdomain Scope Extraction
- `foo.localhost:3000` → scope: "foo"
- `www.localhost:3000` → scope: "default"
- `localhost:3000` → scope: "default" (normalized to "www")

## 🔍 Verification Points

Each page displays:
1. ✅ Current scope
2. ✅ Rewritten route
3. ✅ Request headers
4. ✅ Timestamp
5. ✅ Navigation links

## 🚀 Quick Start Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit the dashboard:
   ```
   http://localhost:3000/dashboard
   ```

3. Open browser DevTools Console to see middleware logs (DEBUG is enabled)

4. Click through the test links on the dashboard

5. Check the console for rewrite logs:
   ```
   host localhost:3000
   Rewriting / to /scopes/default
   Rewriting /beta/test to /scoped/default/test
   ```

## 📊 Expected Results

| User Requests | Middleware Rewrites To | Page Color |
|--------------|------------------------|------------|
| `/` | `/scopes/default` | Green |
| `/test` | `/scopes/default/test` | Green |
| `/beta/test` | `/scoped/default/test` | Purple |
| `/products/laptop` | `/scopes/default/products/laptop` | Red |
| `/pricing` | `/scopes/default/p/pricing` | Purple |
| `/api/test` | `/api/test` (no rewrite) | JSON |

## 🐛 Debugging Tips

1. **Check Console Logs**: With DEBUG enabled, all rewrites are logged
2. **Network Tab**: See the actual requests and responses
3. **Headers**: Each page displays relevant headers including `x-middleware-rewrite`
4. **API Routes**: Should show `middlewareExecuted: false`
5. **404s**: Direct access to `/scopes/*` should return 404

## 📝 Notes

- The root `app/page.tsx` is intentionally minimal because requests to `/` are rewritten to `/scopes/[scope]/page.tsx`
- Pages Router files in `/pages` directory are legacy and can be removed after testing
- Middleware configuration is in `proxy.ts` (Next.js 16 format)
- The matcher excludes `/api`, `/_next`, and static assets

