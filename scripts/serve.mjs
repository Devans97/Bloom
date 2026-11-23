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
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.gz': 'application/gzip',
  '.traineddata': 'application/octet-stream'
};

const port = Number(process.env.BLOOM_PORT || 4174);

function parseMultipart(buffer, boundary) {
  const parts = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  let start = 0;
  while ((start = buffer.indexOf(boundaryBuf, start)) !== -1) {
    start += boundaryBuf.length;
    if (buffer[start] === 45 && buffer[start + 1] === 45) break;
    if (buffer[start] === 13 && buffer[start + 1] === 10) start += 2;
    const nextBoundary = buffer.indexOf(boundaryBuf, start);
    if (nextBoundary === -1) break;
    const partBuffer = buffer.slice(start, nextBoundary - 2);
    const headerEnd = partBuffer.indexOf('\r\n\r\n');
    if (headerEnd !== -1) {
      const headerStr = partBuffer.slice(0, headerEnd).toString('utf-8');
      const data = partBuffer.slice(headerEnd + 4);
      const filenameMatch = headerStr.match(/filename="([^"]+)"/);
      const nameMatch = headerStr.match(/name="([^"]+)"/);
      parts.push({
        name: nameMatch ? nameMatch[1] : '',
        filename: filenameMatch ? filenameMatch[1] : undefined,
        data
      });
    }
    start = nextBoundary;
  }
  return parts;
}

async function extractTextFromBuffer(buffer, filename = '') {
  const isPdf = /\.pdf$/i.test(filename) || (buffer.length > 4 && buffer.slice(0, 4).toString() === '%PDF');
  if (isPdf) {
    try {
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      const doc = await pdfjs.getDocument({
        data: new Uint8Array(buffer),
        isEvalSupported: false,
        enableXfa: false
      }).promise;
      const pages = [];
      const maxPages = Math.min(doc.numPages, 15);
      for (let n = 1; n <= maxPages; n++) {
        const page = await doc.getPage(n);
        const content = await page.getTextContent();
        const rows = new Map();
        for (const item of content.items) {
          if (!item.str || !item.str.trim()) continue;
          const y = Math.round(item.transform[5] / 3) * 3;
          if (!rows.has(y)) rows.set(y, []);
          rows.get(y).push({ x: item.transform[4], text: item.str });
        }
        const pageText = [...rows.entries()]
          .sort((a, b) => b[0] - a[0])
          .map(([, items]) => items.sort((a, b) => a.x - b.x).map(x => x.text).join(' '))
          .join('\n');
        pages.push(pageText);
        page.cleanup();
      }
      return pages.join('\n\n');
    } catch (e) {
      console.warn('PDF backend parser error:', e);
    }
  }

  // Treat as UTF-8 text (CSV, TSV, TXT, JSON, MD)
  return buffer.toString('utf-8');
}

createServer(async (req, res) => {
  try {
    const parsed = new URL(req.url, 'http://localhost');
    let pathname = decodeURIComponent(parsed.pathname);

    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Filename, Range'
      }).end();
      return;
    }

    // Backend Planner Analysis Endpoint
    if (req.method === 'POST' && pathname === '/api/analyze-planner') {
      const chunks = [];
      let total = 0;
      req.on('data', chunk => {
        total += chunk.length;
        if (total > 20 * 1024 * 1024) {
          req.destroy();
          res.writeHead(413, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'File exceeds 20MB' }));
          return;
        }
        chunks.push(chunk);
      });

      req.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          const contentType = req.headers['content-type'] || '';
          let text = '';
          let filename = req.headers['x-filename'] || '';

          if (contentType.includes('application/json')) {
            const body = JSON.parse(buffer.toString('utf-8'));
            text = body.text || '';
            filename = body.filename || filename;
            if (!text && body.data) {
              const fileBuffer = Buffer.from(body.data, 'base64');
              text = await extractTextFromBuffer(fileBuffer, filename);
            }
          } else if (contentType.includes('multipart/form-data')) {
            const boundaryMatch = contentType.match(/boundary=(?:["']?)([^"';]+)(?:["']?)/);
            if (boundaryMatch) {
              const boundary = boundaryMatch[1];
              const parts = parseMultipart(buffer, boundary);
              const filePart = parts.find(p => p.filename) || parts[0];
              if (filePart) {
                filename = filePart.filename || filename;
                text = await extractTextFromBuffer(filePart.data, filename);
              }
            } else {
              text = buffer.toString('utf-8');
            }
          } else {
            text = await extractTextFromBuffer(buffer, filename);
          }

          if (!text || !text.trim()) {
            res.writeHead(400, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }).end(JSON.stringify({ error: 'No readable text found in document. Please verify the file or paste planner text.' }));
            return;
          }

          const { parsePlannerText } = await import(resolve('dist/js/import-parser.js'));
          const { matchChapterCoverage, generateStudySessionsForTests } = await import(resolve('dist/js/planner-analyzer.js'));

          const candidates = parsePlannerText(text);
          for (const cand of candidates) {
            if (cand.subject) {
              cand.coverage = matchChapterCoverage(cand.source || cand.title, cand.subject);
            }
          }

          const plannedSessions = generateStudySessionsForTests(candidates);

          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          }).end(JSON.stringify({
            success: true,
            text,
            candidates,
            plannedSessions,
            summary: `Analyzed planner: identified ${candidates.length} test${candidates.length === 1 ? '' : 's'} and generated ${plannedSessions.length} tailored study sessions.`
          }));
        } catch (err) {
          console.error('Planner analysis server error:', err);
          res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }).end(JSON.stringify({ error: err instanceof Error ? err.message : 'Server could not analyze document.' }));
        }
      });
      return;
    }

    // Static asset serving with strict 404 for asset prefixes
    let target = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));

    const isExplicitAsset = pathname.startsWith('/vendor/') || pathname.startsWith('/api/') ||
                            pathname.startsWith('/art/') || pathname.startsWith('/js/') ||
                            pathname.endsWith('.css') || pathname.endsWith('.js') || pathname.endsWith('.wasm');

    if (!target.startsWith(root + sep) || !existsSync(target) || !statSync(target).isFile()) {
      if (isExplicitAsset) {
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
        return;
      }
      // SPA fallback
      target = resolve(root, 'index.html');
    }

    const ext = extname(target).toLowerCase();
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Access-Control-Allow-Origin': '*'
    });
    createReadStream(target).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`BLOOM fresh server running at: http://127.0.0.1:${port}`);
});
