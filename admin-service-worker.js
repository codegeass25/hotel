const CACHE='harborlight-admin-v4-8';
const SHELL=['./admin.html','./admin-manifest.json','./config.js','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('harborlight-admin-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(url.hostname==='hotel.mdmsportal.uk'||url.pathname.startsWith('/api/'))return;
  if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
  const networkFirst=event.request.mode==='navigate'||/\.(?:html|js)$/i.test(url.pathname);
  if(networkFirst){event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./admin.html'))));return;}
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response})));
});
