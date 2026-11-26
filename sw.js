// Kinesia: abre sem internet com a última versão vista. Sempre tenta a rede primeiro; Supabase e outros sites não passam por aqui.
const C='kinesia-v3';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.webmanifest','icon-192.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==='navigate'?caches.match('./'):Response.error()))))});
