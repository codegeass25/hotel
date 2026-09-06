const CACHE='harborlight-booking-v4-7';
const SHELL=['./','./index.html','./config.js','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('harborlight-booking-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.hostname==='hotel.mdmsportal.uk'||u.pathname.startsWith('/api/'))return;
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const networkFirst=e.request.mode==='navigate'||/\.(?:html|js)$/i.test(u.pathname);
  if(networkFirst){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(x=>x||caches.match('./index.html'))));return;}
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(x=>x.put(e.request,cp));return r})));
});
