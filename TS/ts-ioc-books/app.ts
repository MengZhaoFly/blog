import "reflect-metadata";
import { InversifyKoaServer } from "inversify-koa-utils";
import { Container, buildProviderModule } from "./ioc/ioc";
// import { IIndex } from "./interface/IIndex";
// import TAGS from "./constant/tags";
import "./ioc/loader";
import co from "co";
import * as render from "koa-swig";
import * as serve from "koa-static";
import errorHandler from "./middleware/errorHandler";
import * as log4js from 'log4js';
import config from "./config";
console.log("🍎", config);
log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'logs/log.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
const logger = log4js.getLogger('cheese');
//基础的容器
const container = new Container();
//容器跟刚才注册机制绑定到一起 让所有的provide生效
container.load(buildProviderModule());
let server = new InversifyKoaServer(container);
server.setConfig(app => {
  app.use(serve(config.staticDir));
  //注入我们的路由机制
  app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: "memory",
    ext: 'html',
    // varControls: ["[[", "]]"],
    writeBody: false
  }));
}).setErrorConfig(app => {
  errorHandler.error(app, logger);
})
// console.log("🍌🍌🍌",container.get<IIndex>(TAGS.IndexService));
let app = server.build();
app.listen(3000, () => {
  console.log("http://localhost:3000")
})