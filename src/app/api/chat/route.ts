/**
 * Proxy /api/chat → engine server on 130.61.175.254:3001
 * Streams SSE from engine to browser, avoiding CORS issues.
 */

const ENGINE_URL = process.env.ENGINE_URL || 'http://130.61.175.254:3001';

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${ENGINE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Host: 'ai.solobank.lol',
    },
    body: JSON.stringify(body),
  });

  // Stream the SSE response through
  return new Response(res.body, {
    status: res.status,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
