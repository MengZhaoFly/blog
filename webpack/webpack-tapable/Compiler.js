const {
  SyncHook,
  AsyncSeriesHook
} = require('tapable');

module.exports = class Compiler {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newspeed']),
      brake: new SyncHook(),
      calculateRoutes: new AsyncSeriesHook(["source", "target", "routesList"])
    }
  }
  run() {
    this.accelerate(10)
    this.break()
    this.calculateRoutes('Async', 'hook', 'demo')
  }
  // webpack 内部 的 compiler 到了事件，就触发，就通知外面，
  // plugin 在外部监听，自然也就也已收到 通知了。
  // plugin 也就执行
  // 这就是 webpack 的插件机制了。
  accelerate(speed) {
    this.hooks.accelerate.call(speed);
  }
  break() {
    this.hooks.brake.call();
  }
  calculateRoutes() {
    this.hooks.calculateRoutes.promise(...arguments).then(() => {
    }, err => {
      console.error(err);
    });
  }
}