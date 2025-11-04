import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface ScopesPageProps {
  scope: string;
  timestamp: string;
  headers: Record<string, string>;
}

export default function ScopesPage({ scope, timestamp, headers }: ScopesPageProps) {
  const router = useRouter();

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#16a34a" }}>Scopes Page Test</h1>
      
      <div style={{ marginTop: "2rem" }}>
        <h2>Middleware/Proxy Information</h2>
        <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <p><strong>Scope:</strong> <code>{scope}</code></p>
          <p><strong>Current Path:</strong> <code>{router.asPath}</code></p>
          <p><strong>Rendered At:</strong> {timestamp}</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Request Headers</h2>
        <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <pre style={{ overflow: "auto", fontSize: "0.875rem" }}>
            {JSON.stringify(headers, null, 2)}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Test Links</h2>
        <ul>
          <li><a href="/beta/another-test">Test /beta path (should use /scoped)</a></li>
          <li><a href="/regular-test">Test regular path (should use /scopes)</a></li>
          <li><a href="/api/test">Test API route (should be excluded from middleware)</a></li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#dcfce7", borderRadius: "8px" }}>
        <p><strong>✓ Middleware is working!</strong></p>
        <p>This page was accessed through the middleware proxy at <code>/scopes/{scope}</code></p>
        <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
          Note: Regular paths (non-/beta) are rewritten to /scopes/[scope]
        </p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { scope } = context.params || {};
  const headers = context.req.headers;

  // Extract relevant headers
  const relevantHeaders: Record<string, string> = {
    host: headers.host || "",
    "x-forwarded-host": headers["x-forwarded-host"] as string || "",
    "x-middleware-rewrite": headers["x-middleware-rewrite"] as string || "",
    "user-agent": headers["user-agent"] || "",
  };

  return {
    props: {
      scope: scope as string,
      timestamp: new Date().toISOString(),
      headers: relevantHeaders,
    },
  };
};

