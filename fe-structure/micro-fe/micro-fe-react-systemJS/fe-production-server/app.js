const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();
const cors = require('koa2-cors');
app.use(cors());
app.use(serve(__dirname + '/assets'));
app.listen(3000, () => {
  console.log('服务器启动 🍺');
});
