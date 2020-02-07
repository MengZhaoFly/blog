console.log('begin');
const CACHE_NAME = 'PWA-1.0';
// work-box  service-work 的一个轮子

// service-work
const cacheList = [
  './sw-lifecycle.png',
  './bundle.js'
]
// cacheStorage
this.addEventListener('install', (event) => {
  // install -> activate
  // 等着 一个 Promise resolve 才会去到下一个阶段
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(cacheList)
    })
  )
})
// 监听请求
this.addEventListener('fetch', (event) => {
  event.respondWith(
    // 如果 缓存里面有
    caches.match(event.request)
    .then(resp => {
      if (resp) {
        console.log(event.request.url, '有缓存');
        return resp;
      }
      else {
        console.log(event.request.url, '没缓存');
        return fetch(event.request)
        .then(res => {
          // service-work 拿到请求的结果
          // 再添加到缓存里面
          return caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, res);
            return res;
          })
        })
      }
    })
  )
})
