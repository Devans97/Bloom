import { createServer } from 'node:http';
import { createReadStream, statSync, existsSync } from 'node:fs';
import { resolve, sep, extname } from 'node:path';

const root = resolve('dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8'
};

const port = Number(process.env.BLOOM_PORT || 4174);

createServer((req, res) => {
  try {
    const parsed = new URL(req.url, 'http://localhost');
    let pathname = decodeURIComponent(parsed.pathname);
    let target = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));

    if (!target.startsWith(root + sep) || !existsSync(target) || !statSync(target).isFile()) {
      // SPA fallback
      target = resolve(root, 'index.html');
    }

    const ext = extname(target).toLowerCase();
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    createReadStream(target).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`BLOOM fresh server running at: http://127.0.0.1:${port}`);
});
