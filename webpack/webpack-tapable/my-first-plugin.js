const Compiler = require('./Compiler')

class MyPlugin {
  constructor() {

  }
  apply(compiler) {
    // 插件 就是监听 webpack 内部的某个事件
    // 这里 用 tap 监听
    // webpack 使用了 tapable 这个库，来管理自己打包发生时的一系列事件，并且 告知外面的 插件
    // 这样 提前监听的 插件也就执行了
    compiler.hooks.brake.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));
    compiler.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));
    compiler.hooks.calculateRoutes.tapPromise("calculateRoutes tapAsync", (source, target, routesList) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`tapPromise to ${source} ${target} ${routesList}`)
          resolve();
        }, 1000)
      });
    });
  }
}

const myPlugin = new MyPlugin();

const options = {
  plugins: [myPlugin]
}

const compiler = new Compiler();

for (const plugin of options.plugins) {
  if (typeof plugin === "function") {
    plugin.call(compiler, compiler);
  } else {
    plugin.apply(compiler);
  }
}
compiler.run();