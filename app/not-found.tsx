export default function NotFound() {
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
      <h2 style={{ fontSize: "1.5rem", marginTop: "1rem" }}>Page Not Found</h2>
      <p style={{ color: "#666", marginTop: "1rem" }}>
        The page you're looking for doesn't exist or access is not allowed.
      </p>
      <div style={{ 
        marginTop: "2rem", 
        padding: "1rem", 
        background: "#fef2f2", 
        borderRadius: "8px",
        maxWidth: "600px"
      }}>
        <p style={{ fontSize: "0.875rem", color: "#991b1b", margin: 0 }}>
          <strong>Note:</strong> Direct access to internal routes (like /scopes/* or /scoped/*) 
          is blocked by the middleware. Please use the public routes instead.
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
        <a 
          href="/dashboard" 
          style={{ 
            color: "#16a34a", 
            textDecoration: "none",
            padding: "0.5rem 1rem",
            border: "1px solid #16a34a",
            borderRadius: "4px",
            display: "inline-block",
            marginLeft: "1rem"
          }}
        >
          View Test Dashboard
        </a>
      </div>
    </div>
  );
}

