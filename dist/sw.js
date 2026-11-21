
const CACHE_NAME = "bloom-v1-11bcdd2e8f65";
const url = path => new URL(path, self.registration.scope).href;
const ASSETS = ["index.html","js/academic-engine.js","js/app.bundle.js","js/app.bundle.js.map","js/app.js","js/crypto-vault.js","js/curriculum.js","js/planner-engine.js","js/storage.js","js/types.js","js/ui/academics-view.js","js/ui/icons.js","js/ui/onboarding-view.js","js/ui/planner-view.js","js/ui/study-workspace-view.js","js/ui/tests-view.js","js/ui/today-view.js","js/ui/tools-view.js","manifest.webmanifest","style.css"].map(url);

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
