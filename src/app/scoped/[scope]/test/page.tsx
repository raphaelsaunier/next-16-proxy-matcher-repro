import { headers } from "next/headers";

interface TestPageProps {
  params: Promise<{ scope: string }>;
}

export default async function TestPage({ params }: TestPageProps) {
  const { scope } = await params;
  const headersList = await headers();

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#7c3aed" }}>Beta Test Page</h1>
      
      <div style={{ marginTop: "2rem", padding: "1rem", background: "#f3e8ff", borderRadius: "8px" }}>
        <p><strong>✓ Nested route test successful!</strong></p>
        <p>Path: <code>/beta/test</code></p>
        <p>Rewritten to: <code>/scoped/{scope}/test</code></p>
        <p>Scope: <code>{scope}</code></p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>This demonstrates:</h2>
        <ul>
          <li>Middleware correctly handles nested paths under /beta</li>
          <li>Dynamic scope parameter is preserved</li>
          <li>App Router rendering works correctly</li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <a href="/" style={{ color: "#0070f3" }}>← Back to home</a>
      </div>
    </div>
  );
}

