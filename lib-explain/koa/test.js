const Koa = require('./lib/application');
const app = new Koa();
app.use(async(ctx, next) => {
  console.log('url', ctx.request && ctx.request.url);
  console.log('method', ctx.request && ctx.request.method);
  ctx.body = '123>';
  await next();
  await next();
  console.log(1);
})
app.use(async (ctx, next) => {
  await next();
  console.log(2);
})
app.use(async (ctx) => {
  console.log(3);
})
app.listen(9999, () => {
  console.log('server is running 9999');
})