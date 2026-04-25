import handler from '../dist/server/server.js';

export default async function (req, res) {
  // Convert Node.js IncomingMessage → Web API Request
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const url = new URL(req.url, `${protocol}://${host}`);

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
