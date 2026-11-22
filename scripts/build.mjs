import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { build as bundle } from 'esbuild';

rmSync('dist/art', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('public', 'dist', { recursive: true });
for(const [source,target] of [
  ['node_modules/pdfjs-dist/build/pdf.min.mjs','dist/vendor/pdfjs/pdf.mjs'],
  ['node_modules/pdfjs-dist/build/pdf.worker.min.mjs','dist/vendor/pdfjs/pdf.worker.mjs'],
  ['node_modules/pdfjs-dist/standard_fonts','dist/vendor/pdfjs/standard_fonts'],
  ['node_modules/pdfjs-dist/cmaps','dist/vendor/pdfjs/cmaps'],
  ['node_modules/tesseract.js/dist/tesseract.min.js','dist/vendor/tesseract/tesseract.min.js'],
  ['node_modules/tesseract.js/dist/worker.min.js','dist/vendor/tesseract/worker.min.js'],
  ['node_modules/tesseract.js-core','dist/vendor/tesseract-core'],
  ['node_modules/pdfjs-dist/LICENSE','dist/licenses/pdfjs.txt'],
  ['node_modules/tesseract.js/LICENSE.md','dist/licenses/tesseract.txt'],
]){mkdirSync(target.slice(0,target.lastIndexOf('/')),{recursive:true});cpSync(source,target,{recursive:true});}
await bundle({entryPoints:['src/app.ts'],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:'dist/js/app.bundle.js'});
const config={supabaseUrl:process.env.BLOOM_SUPABASE_URL||'',supabaseAnonKey:process.env.BLOOM_SUPABASE_ANON_KEY||''};
writeFileSync('dist/config.js','globalThis.BLOOM_CONFIG='+JSON.stringify(config)+';');
const files = readdirSync('dist', { recursive: true, withFileTypes: true })
  .filter(file => file.isFile() && file.name !== 'sw.js' && !file.name.startsWith('_'))
  .map(file => `${file.parentPath}/${file.name}`.replace(/^dist\//, '')).sort();
const hash = createHash('sha256');
for (const file of files) hash.update(file).update(readFileSync(`dist/${file}`));
const cache = 'bloom-preview-' + hash.digest('hex').slice(0, 16);
writeFileSync('dist/sw.js', `
const cacheName = ${JSON.stringify(cache)};
const url = path => new URL(path, self.registration.scope).href;
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match(url('index.html'))));
  } else {
    event.respondWith(
      fetch(request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(cacheName).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => caches.match(request))
    );
  }
});
`);
