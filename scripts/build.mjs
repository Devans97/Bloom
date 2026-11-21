import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { build as bundle } from 'esbuild';

mkdirSync('dist/js', { recursive: true });

// Copy public assets if public folder exists
try {
  cpSync('public', 'dist', { recursive: true });
} catch {
  mkdirSync('dist', { recursive: true });
}

// Bundle main application with ESBuild
await bundle({
  entryPoints: ['src/app.ts'],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  outfile: 'dist/js/app.bundle.js',
  sourcemap: true,
  minify: false
});

// Generate offline PWA service worker with asset content hashing
const files = readdirSync('dist', { recursive: true, withFileTypes: true })
  .filter(file => file.isFile() && file.name !== 'sw.js')
  .map(file => `${file.parentPath}/${file.name}`.replace(/^dist\//, ''))
  .sort();

const hash = createHash('sha256');
for (const file of files) {
  hash.update(file).update(readFileSync(`dist/${file}`));
}
const cacheName = 'bloom-v1-' + hash.digest('hex').slice(0, 12);

writeFileSync('dist/sw.js', `
const CACHE_NAME = ${JSON.stringify(cacheName)};
const url = path => new URL(path, self.registration.scope).href;
const ASSETS = ${JSON.stringify(files)}.map(url);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('bloom-') && k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(url('index.html')).then(response => response || fetch(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});
`);

console.log('BLOOM build complete: dist/ created and bundled.');
