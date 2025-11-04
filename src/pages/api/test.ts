import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  timestamp: string;
  method: string;
  path: string;
  headers: Record<string, string | string[] | undefined>;
  middlewareExecuted: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Check if middleware was executed by looking for middleware-specific headers
  const middlewareExecuted = !!(
    req.headers["x-middleware-rewrite"] ||
    req.headers["x-middleware-next"]
  );

  const response: ResponseData = {
    message: "API route is working correctly!",
    timestamp: new Date().toISOString(),
    method: req.method || "GET",
    path: req.url || "/api/test",
    headers: {
      host: req.headers.host,
      "x-forwarded-host": req.headers["x-forwarded-host"],
      "x-middleware-rewrite": req.headers["x-middleware-rewrite"],
      "x-middleware-next": req.headers["x-middleware-next"],
      "user-agent": req.headers["user-agent"],
    },
    middlewareExecuted,
  };

  res.status(200).json(response);
}

