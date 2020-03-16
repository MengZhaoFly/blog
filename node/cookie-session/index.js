const Koa = require('koa');
var Router = require('koa-router');
const querystring = require('querystring');
const app = new Koa();
var router = new Router();
// 内存 sessionTable  
// 数据库
let sessionTable = [];
let usetable = [
  {user: 'lihua', pwd: 'kkk', uid: 1},
  {user: 'lilei', pwd: 'aaa', uid: 2},
]
router.get('/login', (ctx, next) => {
  const qs = ctx.querystring;
  const obj = querystring.parse(qs);
  console.log(obj);
  const user = obj.user;
  const pwd = obj.pwd;
  const userObj = usetable.find(e => e.user === user && e.pwd === pwd);
  if (userObj) {
    // 一条 session 
    let row = { ...userObj, sessionId: userObj.uid };
    sessionTable.push(row);
    ctx.cookies.set('sessionId', userObj.uid , { maxAge: 1000 * 30 });
    ctx.body = {code: 200}
  } else {
    ctx.body = {code: 401}
  }
  // ctx.cookies.set('sessionId', 0001, {
  //   maxAge: 1000 * 60
  // })
  // ctx.body = { code: 0 }
});
// 保持登录状态 30 之内  true
// false
router.get('/islogin', async (ctx) => {
  // 通过 cookie
  // cookie 会自动 附加到请求头里面
  const sid = ctx.cookies.get('sessionId');
  const session = sessionTable.find(s => s.sessionId == sid);
  if (session) {
    const uid = session.uid;
    ctx.body = {
      code: 0,
      uid,
    }
  }
  else {
    ctx.body = {
      code: 1,
      msg: '未登录'
    }
  }
})
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(8080, () => {
  console.log(8080);
})