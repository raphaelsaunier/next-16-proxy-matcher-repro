import { headers } from "next/headers";

interface DeepNestedPageProps {
  params: Promise<{ scope: string }>;
}

export default async function DeepNestedPage({ params }: DeepNestedPageProps) {
  const { scope } = await params;
  const headersList = await headers();

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#ea580c" }}>Deep Nested Beta Page</h1>
      
      <div style={{ marginTop: "2rem", padding: "1rem", background: "#fed7aa", borderRadius: "8px" }}>
        <p><strong>✓ Deep nested route test successful!</strong></p>
        <p>Path: <code>/beta/nested/deep</code></p>
        <p>Rewritten to: <code>/scoped/{scope}/nested/deep</code></p>
        <p>Scope: <code>{scope}</code></p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>This demonstrates:</h2>
        <ul>
          <li>Middleware correctly handles deeply nested paths</li>
          <li>Path structure is preserved after /beta prefix</li>
          <li>Complex routing scenarios work as expected</li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <a href="/" style={{ color: "#0070f3" }}>← Back to home</a>
      </div>
    </div>
  );
}

