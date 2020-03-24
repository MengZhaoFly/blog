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

router.get('/', ctx => {
	ctx.body = 'this is 8087'
});
router.get('/getList', ctx => {
	ctx.body = {
		code: 0,
		data: [
			1, 2, 3,4,5
		]
	}
});

app.use(router.routes())
	.use(router.allowedMethods());

app.listen(8087, () => {
	console.log('服务启动，端口号为：8087');
});