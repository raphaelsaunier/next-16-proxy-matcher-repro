import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const headers = request.headers;

  // Check if middleware was executed by looking for middleware-specific headers
  const middlewareExecuted = !!(
    headers.get("x-middleware-rewrite") || headers.get("x-middleware-next")
  );

  const response = {
    message: "API route is working correctly!",
    timestamp: new Date().toISOString(),
    method: "GET",
    path: request.nextUrl.pathname,
    headers: {
      host: headers.get("host"),
      "x-forwarded-host": headers.get("x-forwarded-host"),
      "x-middleware-rewrite": headers.get("x-middleware-rewrite"),
      "x-middleware-next": headers.get("x-middleware-next"),
      "user-agent": headers.get("user-agent"),
    },
    middlewareExecuted,
    note: middlewareExecuted
      ? "⚠️ WARNING: Middleware was executed (should not happen for /api routes)"
      : "✓ Middleware correctly excluded this /api route",
  };

  return NextResponse.json(response, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json(
    {
      message: "POST request received",
      timestamp: new Date().toISOString(),
      body,
    },
    { status: 200 }
  );
}

