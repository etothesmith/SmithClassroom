/* Smith's Classroom service worker.
   - Pages, scripts and data: network first, so every update shows up right away;
     the cached copy is only used when the device is offline.
   - Images, sounds and fonts: cache first, refreshed in the background.
   - Only this site's own files; Firebase and other sites are never touched.
   Bump VERSION when the app shell changes. */
const VERSION = "sc-3.3.0";
const SHELL = ["./", "index.html", "content.js", "bank_plus.js", "art.js", "avatar.js", "world.js", "world.css", "app.js",
  "town/town.css", "town/items.js", "town/config.js", "town/net.js", "town/town.js", "town/civic.js", "town/careers.js", "town/jobs2.js", "town/mayor.js", "town/today.js",
  "town/world2.js", "town/pets.js", "town/houselife.js", "town/ambient.js", "town/live.js", "town/tower.js", "town/games.js", "town/economy.js", "town/farm.js", "town/justice.js", "town/travel.js", "town/notify.js", "manifest.webmanifest",
  "assets/app/icon-192.png", "assets/app/icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null)))));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "skip") self.skipWaiting(); });
const MEDIA = /\.(png|jpe?g|webp|gif|svg|mp3|ogg|wav|woff2?|ttf)$/i;
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url); if (u.origin !== self.location.origin) return;
  if (MEDIA.test(u.pathname)) {
    e.respondWith(caches.open(VERSION).then(async c => { const hit = await c.match(r);
      const net = fetch(r).then(res => { if (res && res.ok) c.put(r, res.clone()); return res; }).catch(() => hit);
      return hit || net; }));
    return;
  }
  e.respondWith(fetch(r).then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(r, copy)); } return res; })
    .catch(() => caches.match(r, {ignoreSearch:true}).then(hit => hit || caches.match("index.html"))));
});

/* tapping a Town notification brings the open tab forward (or opens the site) */
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:"window", includeUncontrolled:true}).then(list => {
    const c = list.find(w => w.url.startsWith(self.registration.scope)); return c ? c.focus() : self.clients.openWindow(self.registration.scope);
  }));
});
