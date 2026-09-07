import handler from '../dist/server/server.js';

const PROXY_ROUTES = {
  '/sitemap.xml': { path: '/api/v1/sitemap.xml', contentType: 'application/xml; charset=utf-8' },
  '/robots.txt': { path: '/api/v1/robots.txt', contentType: 'text/plain; charset=utf-8' },
  '/rss.xml': { path: '/api/v1/rss.xml', contentType: 'application/rss+xml; charset=utf-8' },
  '/llms.txt': { path: '/api/v1/llms.txt', contentType: 'text/markdown; charset=utf-8' },
  '/llms-full.txt': { path: '/api/v1/llms-full.txt', contentType: 'text/markdown; charset=utf-8' },
};

export default async function (req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const url = new URL(req.url, `${protocol}://${host}`);

  // Check if request matches a CMS raw proxy route
  const proxyConfig = PROXY_ROUTES[url.pathname];
  if (proxyConfig && (req.method === 'GET' || req.method === 'HEAD')) {
    const base = process.env.BLOG_API_URL || 'https://bdablogs.vercel.app';
    const key = process.env.BLOG_API_KEY || '';

    try {
      const cmsRes = await fetch(`${base}${proxyConfig.path}`, {
        headers: key ? { Authorization: `Bearer ${key}` } : {},
      });

      if (cmsRes.ok) {
        const body = await cmsRes.text();
        res.statusCode = 200;
        res.setHeader('Content-Type', proxyConfig.contentType);
        res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
        res.end(body);
        return;
      }
    } catch (err) {
      console.error(`[CMS Proxy] Failed to proxy ${url.pathname}:`, err);
    }
  }

  // Convert Node.js IncomingMessage → Web API Request
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  const method = req.method || 'GET';
  const hasBody = method !== 'GET' && method !== 'HEAD';
  let bodyInit = undefined;
  if (hasBody) {
    bodyInit = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', reject);
    });
  }

  const request = new Request(url.toString(), {
    method,
    headers,
    body: bodyInit && bodyInit.length > 0 ? bodyInit : undefined,
    duplex: hasBody ? 'half' : undefined,
  });

  // Call the TanStack Start fetch handler
  const response = await handler.fetch(request);

  // Stream response back to Node.js
  res.statusCode = response.status;
  res.statusMessage = response.statusText || '';
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }

  if (response.body) {
    const reader = response.body.getReader();
    const write = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    };
    await write();
  } else {
    res.end();
  }
}

