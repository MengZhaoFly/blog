const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
// app.use(serve('static', {
//     maxage: 365 * 24 * 60 * 60 * 1000
// }));
// app.use(serve('static'));

router.get('/getList', ctx => {
	console.log('req is here')
	ctx.body = {
		code: 0,
		data: [
			1, 2, 3
		]
	}
});

app.use(router.routes())
	.use(router.allowedMethods());

app.listen(8088, () => {
	console.log('服务启动，端口号为：8088');
});