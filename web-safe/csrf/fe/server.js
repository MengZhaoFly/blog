const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const app = new Koa();

let count = 10000;

router.get('/', async (ctx) => {
  const fs = require('fs');
  const html = fs.readFileSync('./index.html', 'utf-8')
  ctx.cookies.set('login', 'hahaha', { 'sameSite': 'lax' });
  ctx.body = html;
})
router.get('/transfer', async (ctx) => {
  const login = ctx.cookies.get('login');
  console.log('login', login);
  if (login) {
    count -= 100
    ctx.body = {
      code: 0
    };
  } else {
    ctx.body = {
      code: 404
    };
  }
})
router.get('/count', async (ctx) => {
  ctx.body = count;
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(9090, () => {
  console.log('server is running 9090');
});