// CORS Configuration - Production + Lovable preview origins
// No wildcard (*), explicit allow-list only

const ALLOWED_ORIGINS: string[] = [
  // Production
  "https://evebleu.vip",
  "https://www.evebleu.vip",
  "https://evebleu-web.web.app",
  "https://evebleu-web.firebaseapp.com",
  // Lovable preview/dev
  "https://eve-concierge-dubai.lovable.app",
  "https://wpczgwxsriezaubncuom.lovableproject.com",
];

export function getCorsHeaders(requestOrigin: string | null): Record<string, string> {
  // Allow explicitly listed origins + any *.lovable.app / *.lovableproject.com subdomain
  let origin = ALLOWED_ORIGINS[0];
  if (requestOrigin) {
    if (
      ALLOWED_ORIGINS.includes(requestOrigin) ||
      requestOrigin.endsWith(".lovable.app") ||
      requestOrigin.endsWith(".lovableproject.com")
    ) {
      origin = requestOrigin;
    }
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

export function handleCorsPreflightStrict(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    const origin = req.headers.get("Origin");
    return new Response(null, { 
      status: 204,
      headers: getCorsHeaders(origin) 
    });
  }
  return null;
}
