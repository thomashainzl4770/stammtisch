// Offline-Cache: Die App startet auch ohne Netz. Neue Versionen werden beim nächsten Öffnen geladen.
const CACHE = "stammtisch-v1";
const SHELL = ["./", "./index.html", "./firebase-config.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Eigene Dateien: zuerst Netz (immer aktuell), sonst Cache
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(m => m || caches.match("./index.html"))));
    return;
  }
  // Bibliotheken und Schriften: zuerst Cache
  if (/gstatic\.com\/firebasejs|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.href)) {
    e.respondWith(caches.match(req).then(m => m || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
  }
});
