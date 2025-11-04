import { headers } from "next/headers";

interface ScopedPageProps {
  params: Promise<{ scope: string }>;
}

export default async function ScopedPage({ params }: ScopedPageProps) {
  const { scope } = await params;
  const headersList = await headers();
  
  const relevantHeaders = {
    host: headersList.get("host"),
    "x-forwarded-host": headersList.get("x-forwarded-host"),
    "x-middleware-rewrite": headersList.get("x-middleware-rewrite"),
    "user-agent": headersList.get("user-agent"),
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#0070f3" }}>Scoped Page Test (App Router)</h1>
      
      <div style={{ marginTop: "2rem" }}>
        <h2>Middleware/Proxy Information</h2>
        <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <p><strong>Scope:</strong> <code>{scope}</code></p>
          <p><strong>Route:</strong> <code>/scoped/{scope}</code></p>
          <p><strong>Rendered At:</strong> {new Date().toISOString()}</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Request Headers</h2>
        <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <pre style={{ overflow: "auto", fontSize: "0.875rem" }}>
            {JSON.stringify(relevantHeaders, null, 2)}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Test Links</h2>
        <ul>
          <li><a href="/beta/test">Test /beta path (should use /scoped)</a></li>
          <li><a href="/beta/nested/deep">Test /beta nested path</a></li>
          <li><a href="/test">Test regular path (should use /scopes)</a></li>
          <li><a href="/api/test">Test API route (should be excluded)</a></li>
          <li><a href="/pricing">Test Prismic page (special handling)</a></li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#e3f2fd", borderRadius: "8px" }}>
        <p><strong>✓ Middleware is working!</strong></p>
        <p>This page was accessed through the middleware proxy at <code>/scoped/{scope}</code></p>
        <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
          Paths starting with /beta are rewritten to /scoped/[scope]
        </p>
      </div>
    </div>
  );
}

