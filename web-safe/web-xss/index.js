const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
// const serve = require('koa-static');
const app = new Koa();

app.use(bodyParser());
// app.use(serve(path.join(__dirname, './static/')));
// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))
router.get('/', async (ctx) => {
  const query = ctx.query;
  const { xss } = query;
  ctx.set('X-XSS-Protection', 0);
  function html_encode (s) {
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    return s;
  }
  await ctx.render('xss', {
    xss: xss
  });
})
router.get('/all', async (ctx) => {
  const query = ctx.query;
  const { xss } = query;
  ctx.set('X-XSS-Protection', 0);
  function attr(s) {
    return s.replace(' ', '');
  }
  function js(s) {
    var t = '';
    for (let c of s) {
      c = c.charCodeAt(0).toString(16);
      c = '\\x' + c;
      t += c;
    }
    return t
  }
  await ctx.render('all', {
    width: attr(`x onmouseover="javascript:alert('xss')"`),
    js: js(`"";alert('xss');`),
    href: encodeURIComponent(`javascript:alert(1);`),
    css: `javascript:alert(1);`
  });
})
router.get('/dom', async (ctx) => {
  await ctx.render('dom');
})
router.post('/csp-reports', async (ctx) => {
  console.log('csp-reports')
})
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(8080, () => {
  console.log('server is running 8080');
});