interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
  LEAD_WEBHOOK_URL?: string;
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
        const timestamp = new Date().toISOString();

        // 1. Insert into Cloudflare D1
        if (env.DB) {
          try {
            await env.DB.prepare(
              `INSERT OR IGNORE INTO leads (email, source, ip_country) VALUES (?, ?, ?)`
            )
              .bind(email, source, ipCountry)
              .run();
          } catch (dbErr) {
            console.error('D1 lead insertion warning:', dbErr);
          }
        }

        // 2. Resend Free-Tier Email Notification (3,000 free emails/mo)
        if (env.RESEND_API_KEY) {
          try {
            const recipient = env.NOTIFICATION_EMAIL || 'catalinagilsierra@gmail.com';
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'Talent Science Leads <onboarding@resend.dev>',
                to: [recipient],
                subject: `🎯 Nuevo Lead en Talent Science: ${email} [${ipCountry}]`,
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                    <div style="padding-bottom: 16px; border-bottom: 2px solid #7c3aed; margin-bottom: 20px;">
                      <span style="font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 1px;">Talent Science · Alerta de Lead</span>
                      <h2 style="margin: 6px 0 0; color: #0f172a; font-size: 20px; font-weight: 800;">Nuevo Registro de Interés</h2>
                    </div>

                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 35%;">Email:</td>
                          <td style="padding: 6px 0; color: #0f172a; font-weight: 700;"><a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Origen:</td>
                          <td style="padding: 6px 0; color: #0f172a;">${source}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">País (GeoIP):</td>
                          <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">🌍 ${ipCountry}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Fecha / Hora:</td>
                          <td style="padding: 6px 0; color: #64748b; font-size: 12px;">${timestamp}</td>
                        </tr>
                      </table>
                    </div>

                    <div style="text-align: center; margin-top: 24px;">
                      <a href="mailto:${email}?subject=Talent%20Science%20-%20Gu%C3%ADa%20BARS%20y%20Auditor%C3%ADa%20de%20Selecci%C3%B3n" 
                         style="display: inline-block; background-color: #7c3aed; color: #ffffff; padding: 10px 20px; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none;">
                        Responder al Candidato / Líder
                      </a>
                    </div>
                  </div>
                `,
              }),
            });
          } catch (resendErr) {
            console.error('Error sending Resend notification:', resendErr);
          }
        }

        // 3. Optional Generic Webhook (e.g. Free n8n / Discord / Slack)
        if (env.LEAD_WEBHOOK_URL) {
          try {
            await fetch(env.LEAD_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event: 'lead_captured',
                email,
                source,
                ipCountry,
                timestamp,
              }),
            });
          } catch (webhookErr) {
            console.error('Error dispatching lead webhook:', webhookErr);
          }
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
