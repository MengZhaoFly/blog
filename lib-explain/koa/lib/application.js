const http = require('http');
const Emitter = require('events');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const compose = require('./compose');

module.exports = class Application extends Emitter {
  constructor() {
    super()
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    this.middleware.push(fn);
    return this;
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  callback(){
    // 组合中间件
    const fn = compose(this.middleware);
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      /**
       * 返回
       */
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    // context.req = 
    request.req = req;
    /**
     * context: {
     * req: 原生的 req 对象
     * get url() {
        return this.req.url;
      },
     * }
     */
    // context.res = 
    response.res = res;
    return context;
  }
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.response.res;
    res.statusCode = 404;
    // 错误处理
    const onerror = err => ctx.onerror(err);
    // 响应处理
    const handleResponse = () => respond(ctx);
    // console.log('fnMiddleware', fnMiddleware.toString());
    /**
     * 1. 中间件执行
     * 2. 处理错误
     */
     // 执行中间件数组所有函数, 并结束时调用 respond 函数
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
}
function respond(ctx) {
  const res = ctx.response.res;
  let body = ctx.body;
  res.end(body);
}