// Strict CORS Configuration - Production Only
// No wildcard (*), no dynamic fallback

const ALLOWED_ORIGINS = [
  "https://evebleu.vip",
  "https://www.evebleu.vip",
  "https://evebleu-web.web.app",
  "https://evebleu-web.firebaseapp.com",
] as const;

export function getCorsHeaders(requestOrigin: string | null): Record<string, string> {
  // Only allow explicitly listed production origins
  const origin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin as typeof ALLOWED_ORIGINS[number])
    ? requestOrigin
    : ALLOWED_ORIGINS[0]; // Default to primary production domain

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
