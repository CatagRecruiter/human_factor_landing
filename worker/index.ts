interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API Route for Leads
    if (url.pathname === '/api/leads') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      try {
        const body: { email?: string; source?: string; hp?: string } = await request.json();
        
        // Anti-spam Honeypot Check
        if (body.hp) {
          // Silent reject for bots
          return new Response(JSON.stringify({ success: true, message: "Registered." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const email = body.email?.trim().toLowerCase();
        const source = body.source || 'bars_framework_download';

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return new Response(JSON.stringify({ error: 'Invalid business email format.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // Cloudflare request metadata for IP country
        const ipCountry = (request as unknown as { cf?: { country?: string } }).cf?.country || 'Unknown';

        // Insert into Cloudflare D1
        if (env.DB) {
          await env.DB.prepare(
            `INSERT OR IGNORE INTO leads (email, source, ip_country) VALUES (?, ?, ?)`
          )
            .bind(email, source, ipCountry)
            .run();
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: "You're on the list! The BARS framework guide has been requested.",
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (err: unknown) {
        console.error('Error in /api/leads:', err);
        return new Response(JSON.stringify({ error: 'Server error processing lead.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Default: Serve frontend static assets
    return env.ASSETS.fetch(request);
  },
};
