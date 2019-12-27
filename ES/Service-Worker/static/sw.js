const VERSION = '12';
const CACHE_NAME = 'service-worker-demo' + VERSION;

console.log('begin');

this.addEventListener('install', function (event) {
	console.log('安装 sw.js');
	/**
	 * 使用 CacheStorage.open(cacheName) 打开一个Cache 对象
	 */
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(
				[
					'./',
					'img/avatar_v1.jpg',
					'js/bundle.js',
				]
			);
		})
	)
});

this.addEventListener('activate', function (event) {
	console.log('激活 sw.js，可以开始处理 fetch 请求。');
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				console.log(CACHE_NAME, key)
				if (CACHE_NAME.indexOf(key) === -1) {
					/**
					 * delete() 方法查询request为key的 Cache 条目，如果找到，
					 * 则删除该 Cache 条目
					 */
					return caches.delete(key);
				}
			}))
		})
	)
});

this.addEventListener('fetch', function (event) {
	console.log(event.request);
	event.respondWith(
		caches.match(event.request)
			.then(function (resp) {
				if (resp) {
					console.log(new Date(), 'fetch ', event.request.url, '有缓存，从缓存中取');
					return resp;
				} else {
					console.log(new Date(), 'fetch ', event.request.url, '没有缓存，网络获取');
					return fetch(event.request)
						.then(function (response) {
							return caches.open(CACHE_NAME).then(function (cache) {
								cache.put(event.request, response.clone());
								return response;
							})
						})
				}
			})
	)
});
console.log('end');