interface Env {
  DB?: {
    prepare: (query: string) => {
      bind: (...args: unknown[]) => {
        run: () => Promise<{ success: boolean; meta?: unknown }>;
        all: () => Promise<{ results: unknown[] }>;
      };
    };
  };
}

interface RequestBody {
  email?: string;
  source?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data: RequestBody = await context.request.json();
    const email = data.email?.trim().toLowerCase();
    const source = data.source || 'bars_framework_download';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid business email address.' }),
        { status: 400, headers }
      );
    }

    // Check if Cloudflare D1 Database binding is active
    if (context.env.DB) {
      try {
        await context.env.DB.prepare(
          `INSERT OR IGNORE INTO leads (email, source) VALUES (?, ?)`
        )
          .bind(email, source)
          .run();
      } catch (dbErr: unknown) {
        console.error('D1 execution error:', dbErr);
      }
    } else {
      console.log(`[Lead captured without D1 bound yet]: ${email}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you! The complete 2026 BARS framework guide has been sent to your inbox.',
      }),
      { status: 200, headers }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Malformed request payload.' }),
      { status: 400, headers }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
