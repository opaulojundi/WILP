const CACHE_NAME = 'fiancailles-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './IMG_20250908-WA0017.png',
  './IMG_20250908-WA0017.png',
  './script.js',
  './style.css',
  './generate-icons.php',
  './WhatsApp_Image_2025-09-08_at_17.41.44-removebg-preview.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

// Instalação do Service Worker e Cache dos arquivos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Arquivos em cache com sucesso');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Interceptação de requisições (estratégia Cache First, falling back to Network)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o cache se encontrar
        if (response) {
          return response;
        }
        // Se não, busca na rede
        return fetch(event.request).then(
          (response) => {
            // Verifica se a resposta é válida antes de cachear (para novas requisições)
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clona a resposta para o cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});
