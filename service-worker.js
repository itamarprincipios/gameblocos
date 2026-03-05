// ============================================================
// SERVICE WORKER — service-worker.js
// Cacheia os assets do jogo (incluindo o modelo Vosk) para uso offline.
// ============================================================

const CACHE_NAME = "jogo-blocos-v1";
const VOSK_CACHE = "vosk-model-v1";

// Assets estáticos que sempre cacheamos no install
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/index.css",
    "/main.js",
    "/js/engine/GameEngine.js",
    "/js/engine/Block.js",
    "/js/engine/Stack.js",
    "/js/audio/AudioSystem.js",
    "/js/recognition/SpeechRecognizer.js",
    "/js/recognition/VoskWorker.js",
    "/js/evaluation/Evaluator.js",
    "/js/scoring/ScoreSystem.js",
    "/js/ui/UIManager.js",
    "/js/data/words.js",
    "/assets/sounds/correct.mp3",
    "/assets/sounds/wrong.mp3",
    "/assets/sounds/land.mp3",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME && k !== VOSK_CACHE)
                    .map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const url = event.request.url;

    // Modelo Vosk e CDN assets → cache-first (modelo é imutável por versão)
    if (url.includes("vosk") || url.includes("alphacephei")) {
        event.respondWith(
            caches.open(VOSK_CACHE).then(async cache => {
                const cached = await cache.match(event.request);
                if (cached) return cached;
                const response = await fetch(event.request);
                if (response.ok) cache.put(event.request, response.clone());
                return response;
            })
        );
        return;
    }

    // Google Fonts → stale-while-revalidate
    if (url.includes("fonts.googleapis.com") || url.includes("fonts.gstatic.com")) {
        event.respondWith(
            caches.open(CACHE_NAME).then(async cache => {
                const cached = await cache.match(event.request);
                const network = fetch(event.request)
                    .then(r => { if (r.ok) cache.put(event.request, r.clone()); return r; })
                    .catch(() => null);
                return cached || network;
            })
        );
        return;
    }

    // Assets estáticos → cache-first
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});
