/* English First service worker.
   Cache-first so the app you installed keeps running exactly as it is, even offline.
   A new version downloads in the background and WAITS: the app asks the learner before it switches (message 'skip').
   Progress lives in localStorage and the cloud, never in this cache, so an update cannot erase it. Bump CACHE on every release. */
const CACHE='english-first-v7';
const CORE=['./','./index.html','./manifest.json','./videos.js','./levels.js','./grammar.js','./lv01.js','./lv02.js','./lv03.js','./lv04.js','./lv05.js','./lv06.js','./lv07.js','./lv08.js','./lv09.js','./lv10.js','./lv11.js','./lv12.js','./lv13.js','./lv14.js','./lv15.js','./lv16.js','./lv17.js','./lv18.js','./lv19.js','./lv20.js','./grammar2.js','./icon.png','./qr.png','./g-pastcont.jpg','./g-prescont.jpg','./g-presperf.jpg','./g-presperfs.jpg','./g-pastperfcont.jpg','./g-pastperf.jpg','./g-pastsimple.jpg','./g-pressimple.jpg','./g-future.jpg','./supabase-config.js','./logo.png','./favicon.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x.indexOf('english-first')===0).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin!==location.origin&&u.hostname!=='cdn.jsdelivr.net')return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(x=>x||fetch(r).then(res=>{if(res&&(res.status===200||res.type==='opaque')){const c=res.clone();caches.open(CACHE).then(k=>k.put(r,c)).catch(()=>{})}return res}).catch(()=>r.mode==='navigate'?caches.match('./index.html'):undefined)))});
