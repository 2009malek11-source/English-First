/* English First service worker.
   Cache-first so the app you installed keeps running exactly as it is, even offline.
   A new version downloads in the background and WAITS: the app asks the learner before it switches (message 'skip').
   Progress lives in localStorage and the cloud, never in this cache, so an update cannot erase it. Bump CACHE on every release. */
const CACHE='english-first-v6';
const CORE=['./','./index.html','./manifest.webmanifest','./videos.js','./levels.js','./grammar.js','./lv01.js','./lv02.js','./lv03.js','./lv04.js','./lv05.js','./lv06.js','./lv07.js','./lv08.js','./lv09.js','./lv10.js','./supabase-config.js','./logo.png','./favicon.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x.indexOf('english-first')===0).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin!==location.origin&&u.hostname!=='cdn.jsdelivr.net')return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(x=>x||fetch(r).then(res=>{if(res&&(res.status===200||res.type==='opaque')){const c=res.clone();caches.open(CACHE).then(k=>k.put(r,c)).catch(()=>{})}return res}).catch(()=>r.mode==='navigate'?caches.match('./index.html'):undefined)))});
