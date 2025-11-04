export default function Custom404Page() {
  return (
    <div style={{ 
      padding: "2rem", 
      fontFamily: "system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "4rem", margin: 0, color: "#dc2626" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginTop: "1rem" }}>Access Blocked</h2>
      <p style={{ color: "#666", marginTop: "1rem" }}>
        This route is restricted by the middleware.
      </p>
      <div style={{ 
        marginTop: "2rem", 
        padding: "1rem", 
        background: "#fef2f2", 
        borderRadius: "8px",
        maxWidth: "600px"
      }}>
        <p style={{ fontSize: "0.875rem", color: "#991b1b", margin: 0 }}>
          <strong>Middleware Security:</strong> Direct access to internal routes 
          (/scopes/* or /scoped/*) is blocked. The middleware detected this attempt 
          and redirected you here.
        </p>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <a 
          href="/" 
          style={{ 
            color: "#0070f3", 
            textDecoration: "none",
            padding: "0.5rem 1rem",
            border: "1px solid #0070f3",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          ← Go Home
        </a>
      </div>
    </div>
  );
}

